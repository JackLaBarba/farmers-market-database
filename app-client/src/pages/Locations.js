import { useEffect, useState } from "react";
import config from "../config";
import {Outlet, Link} from "react-router-dom";

export default function Locations() {
     const [locations, setLocations] = useState([]);
  
    async function readLocation() {
      const url = `${config.backend_url}/locations`;
      const response = await fetch(url, { method: 'GET' });
      setLocations(await response.json());
    }
  
    async function createLocation(attributes) {
      const url = `${config.backend_url}/locations`;
      await fetch(url,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(attributes)
        });
      await readLocation(); // reload locations after we've saved the new one.
    }
  
    // Load locations from the server when the component renders.
    useEffect(() => {
      readLocation();
    }, []);
  
     return <div><h2>Location Details</h2>
  
       <table className="table table-striped table-hover table-bordered">
         <thead>
           <tr>
             <th>ID</th>
             <th>Name</th>
             <th>Street Address</th>
             <th>Has Parking?</th>
             <th>Contact Information</th>
           </tr>
         </thead>
         <tbody>
           {locations.map((location, index) =>
             <tr key={index}>
               <td>{location.location_id}</td>
               <td>{location.name}</td>
               <td>{location.street_address}</td>
               <td>{location.has_parking ? "Yes" : "No"}</td>
               <td>{location.contact_information}</td>
             </tr>
           )}
         </tbody>
       </table>
       <Outlet context={{ createLocation}} />
  
    </div>;
  }