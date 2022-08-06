import { useEffect, useState } from "react";
import config from "../config";
import {Outlet} from "react-router-dom";

export default function VendorsAtEvents() {
  const [vendors_at_events, setEventVendors] = useState([]);
    
async function readEventVendor() {
  const url = `${config.backend_url}/vendors_at_events`;
  const response = await fetch(url, { method: 'GET' });
  setEventVendors(await response.json());
}

async function createVendorAtEvent(attributes) {
  const url = `${config.backend_url}/vendors_at_events`;
  await fetch(url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attributes)
    });
  await readEventVendor(); // reload  Vendors at Events after we've saved the new one.
}

// Load Vendors at Events from the server when the component renders.
useEffect(() => {
  readEventVendor();
}, []);
    return <div><h2>Vendors At Events</h2>
<table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vendor Name</th>
              <th>Event Name</th>
            </tr>
          </thead>
          <tbody>
            {vendors_at_events.map((vendor_at_event, index) =>
              <tr key={index}>
                <td>{vendor_at_event.vendor_at_event_id}</td>
                <td>{vendor_at_event.business_name}</td>
                <td>{vendor_at_event.name}</td>
              </tr>
            )}
          </tbody>
        </table>
        <Outlet context={{ createVendorAtEvent, vendors_at_events}} />
    </div>;
  }