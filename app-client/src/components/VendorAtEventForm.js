import { useEffect, useState } from "react";
import config from "../config";

export default function VendorAtEventForm({ submitAction, cancelAction, vendorAtEvent, legend }) {
  const [vendor_id, setVendorId] = useState("Null");
  const [event_id, setEventId] = useState("Null");
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (vendorAtEvent) {
      setVendorId(vendorAtEvent.vendor_id);
      setEventId(vendorAtEvent.event_id);
    }
    readVendors();
    readEvents();
  }, [vendorAtEvent]);

  async function readVendors() {
    const url = `${config.backend_url}/vendors`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    setVendors(data);
    setVendorId(data[0].vendor_id);
  }

  async function readEvents() {
    const url = `${config.backend_url}/events`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    setEvents(data);
    setEventId(data[0].event_id);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    submitAction({vendor_id, event_id});
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
            <label> Vendor </label>
            <select name="vendor" onChange={e => setVendorId(e.target.value)} >
              {vendors.map((v, key) => <option value={v.vendor_id} key={key}>{v.business_name}</option> )}
            </select>
          </div>
          <div>
          <label> Event </label>
            <select name="event" onChange={e => setEventId(e.target.value)} >
              {events.map((e, key) => <option value={e.event_id} key={key}>{e.name}</option> )}
            </select>
          </div>
        </fieldset>
        <button className="btn-primary" onClick={onSubmit}>Submit</button>
        <button className="btn-secondary" onClick={onCancel}>cancel</button>
      </form>
    </div>);
}