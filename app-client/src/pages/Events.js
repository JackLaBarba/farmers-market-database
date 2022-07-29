import { useEffect, useState } from "react";
import config from "../config";
import {Outlet} from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
    
async function readEvent() {
  const url = `${config.backend_url}/events`;
  const response = await fetch(url, { method: 'GET' });
  setEvents(await response.json());
}

async function createEvent(attributes) {
  const url = `${config.backend_url}/events`;
  await fetch(url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attributes)
    });
  await readEvent(); // reload event after we've saved the new one.
}

// Load event from the server when the component renders.
useEffect(() => {
  readEvent();
}, []);

  return <div><h2>Events Details</h2>
    <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Event Name</th>
              <th>Starts At</th>
              <th>Ends At</th>
              <th>Location Information</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) =>
              <tr key={index}>
                <td>{event.event_id}</td>
                <td>{event.name}</td>
                <td>{event.starts_at}</td>
                <td>{event.ends_at}</td>
                <td>{event.street_address}</td>
              </tr>
            )}
          </tbody>
        </table>
        <Outlet context={{ createEvent, events}} />
    </div>
}