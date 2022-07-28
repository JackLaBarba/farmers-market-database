// import { useEffect, useState } from "react";
// import config from "../config";
// import {Outlet} from "react-router-dom";

export default function Vendors() {
    //     const [vendors, setVendors] = useState([]);
    
    //   async function readVendor() {
    //     const url = `${config.backend_url}/vendors`;
    //     const response = await fetch(url, { method: 'GET' });
    //     setVendors(await response.json());
    //   }
    
    //   async function createVendor(attributes) {
    //     const url = `${config.backend_url}/vendors`;
    //     await fetch(url,
    //       {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(attributes)
    //       });
    //     await readVendor(); // reload people after we've saved the new one.
    //   }
    
    //   // Load people from the server when the component renders.
    //   useEffect(() => {
    //     readVendor();
    //   }, []);
    
      return <div><h2>Vendor Details <br/> Coming Soon...</h2>
        {/* <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Business Name</th>
              <th>Website</th>
              <th>Phone Number</th>
              <th>Contact Person</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) =>
              <tr key={index}>
                <td>{vendor.vendor_id}</td>
                <td>{vendor.business_name}</td>
                <td>{vendor.website_url}</td>
                <td>{vendor.people_id}</td>
              </tr>
            )}
          </tbody>
        </table>
        <Outlet context={{ createVendor, vendors}} /> */}
      </div>;
    }