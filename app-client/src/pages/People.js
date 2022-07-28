import { useEffect, useState } from "react";
import config from "../config";
import {Link,Outlet} from "react-router-dom";

export default function People() {
    const [people, setPeople] = useState([]);

  async function readPeople() {
    const url = `${config.backend_url}/people`;
    const response = await fetch(url, { method: 'GET' });
    setPeople(await response.json());
  }

  async function createPeople(attributes) {
    const url = `${config.backend_url}/people`;
    await fetch(url,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attributes)
      });
    await readPeople(); // reload people after we've saved the new one.
  }

  async function updatePeople(person_id, attributes) {
    const url = `${config.backend_url}/people/${person_id}`;
    await fetch(url,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attributes)
      });
    await readPeople(); // reload people after we've updated this new one.
  }

  async function deletePeople(person_id) {
    const url = `${config.backend_url}/people/${person_id}`;
    await fetch(url,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
    await readPeople(); // reload people after we've deleted this one.
  }

  // Load people from the server when the component renders.
  useEffect(() => {
    readPeople();
  }, []);

  return <div><h2>People</h2>
    <table className="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Is Admin?</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person, index) =>
          <tr key={index}>
            <td>{person.person_id}</td>
            <td>{person.full_name}</td>
            <td>{person.email}</td>
            <td>{person.phone_number}</td>
            <td>{person.is_admin}</td>
            <td>
              <button className="edit" title="Edit" data-toggle="tooltip" >
                <Link to={`/people/${person.person_id}/update`}>
                  <i className="material-icons">&#xE254;</i>
                </Link>
              </button>
              <button className="delete" title="Delete" data-toggle="tooltip"
                onClick={() => deletePeople(person.person_id)}>
                <i className="material-icons">&#xE872;</i>
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    <Outlet context={{ createPeople, updatePeople, people }} />
  </div>;
}