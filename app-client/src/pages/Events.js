import { useEffect, useState } from "react";
import config from "../config";
import { Outlet } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterStartsAfter, setFilterStartsAfter] = useState("");
  const [filterEndsBefore, setFilterEndsBefore] = useState("");

  async function readEvents() {
    const url = `${config.backend_url}/events?${queryString}`;
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
    await readEvents(); // reload event after we've saved the new one.
  }

  // Load event from the server when the component renders.
  useEffect(() => {
    readEvents();
  }, [queryString]);

  async function onFilter(e) {
    e.preventDefault();
    let params = {}
    if (filterName !== "") {
      params["filterName"] = filterName
    }
    if (filterStartsAfter !== "") {
      params["filterStartsAfter"] = filterStartsAfter
    }
    if (filterEndsBefore !== "") {
      params["filterEndsBefore"] = filterEndsBefore
    }
    setQueryString(new URLSearchParams(params));
  }

  async function onClearFilter(e) {
    e.preventDefault();
    setFilterName("");
    setFilterStartsAfter("");
    setFilterEndsBefore("");
    setQueryString("");
  }

  return <div><h2>Events Details</h2>
    <form className="event-filter-form">
      <legend><strong>Filter</strong></legend>
      <fieldset className="fields">
        <div>
          <label>Name </label>
          <input type="text" name="name" value={filterName} onChange={e => setFilterName(e.target.value)}></input>
        </div>
        <div>
            <label> Starts after </label>
            <input type="datetime-local" name="starts_after" value={filterStartsAfter} onChange={e => setFilterStartsAfter(e.target.value)}></input>
        </div>
        <div>
            <label> Ends before </label>
            <input type="datetime-local" name="ends_before" value={filterEndsBefore} onChange={e => setFilterEndsBefore(e.target.value)}></input>
        </div>
      </fieldset>
      <button className="btn-primary" onClick={onFilter}>Filter</button>
      <button className="btn-secondary" onClick={onClearFilter}>Clear filter</button>
    </form>
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
            <td>{(new Date(event.starts_at)).toLocaleString()}</td>
            <td>{(new Date(event.ends_at)).toLocaleString()}</td>
            <td>{event.street_address}</td>
          </tr>
        )}
      </tbody>
    </table>
    <Outlet context={{ createEvent, events }} />
  </div>
}