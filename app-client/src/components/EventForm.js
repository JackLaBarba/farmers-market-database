import { useEffect, useState } from "react";
import config from "../config";

export default function EventForm({ submitAction, cancelAction, event, legend }) {
  const [name, setName] = useState("");
  const [starts_at, setStartsAt] = useState("");
  const [ends_at, setEndsAt] = useState("");
  const [location_id, setLocationId] = useState("Null");
  const [locations, setLocations] = useState([]);



  useEffect(() => {
    if (event) {
      setName(event.name);
      setStartsAt(event.starts_at);
      setEndsAt(event.ends_at);
      setLocationId(event.location_id);
    }
    readLocations();
  }, [event]);

  async function readLocations() {
    const url = `${config.backend_url}/locations`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    setLocations(data);
    setLocationId(data[0].location_id)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    submitAction({ name, starts_at, ends_at, location_id});
  }

  const onCancel = (e) => {
    e.preventDefault();
    cancelAction();
  }

  return (
    <div>
      <form>
        <legend><strong>{legend}</strong></legend>
        <fieldset className="fields">
          <div>
            <label> Name </label>
            <input type="text" name="name" value={name}  onChange={e => setName(e.target.value)}></input>
          </div>
          <div>
            <label> Starts at </label>
            <input type="datetime-local" name="starts_at" value={starts_at} onChange={e => setStartsAt(e.target.value)}></input>
          </div>
          <div>
            <label> Ends at </label>
            <input type="datetime-local" name="ends_at" value={ends_at} onChange={e => setEndsAt(e.target.value)}></input>
          </div>
          <div>
            <label> Location </label>
            <select name="location" onChange={e => setLocationId(e.target.value)} >
              {locations.map((l, key) => <option value={l.location_id} key={key}>{l.name}</option> )}
            </select>
          </div>
        </fieldset>
        <button className="btn-primary" onClick={onSubmit}>Submit</button>
        <button className="btn-secondary" onClick={onCancel}>cancel</button>
      </form>
    </div>);
}