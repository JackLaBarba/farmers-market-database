import { useEffect, useState } from "react";

export default function LocationForm({ submitAction, cancelAction, location, legend }) {
  const [name, setName] = useState("");
  const [street_address, setStreetAddress] = useState("");
  const [has_parking, setHasParking] = useState(0);
  const [contact_information, setContactInformation] = useState("");

  useEffect(() => {
    if (location) {
      setName(location.name);
      setStreetAddress(location.street_address);
      setHasParking(location.has_parking);
      setContactInformation(location.contact_information);
    }
  }, [location]);

  const onSubmit = (e) => {
    e.preventDefault();
    submitAction({ name, street_address, has_parking, contact_information });
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
            <label> Street Address </label>
            <input type="text" name="street_address" value={street_address}  onChange={e => setStreetAddress(e.target.value)}></input>
          </div>
          <div>
            <label> Has Parking? </label>
            <input type="checkbox" name="has_parking" checked={has_parking === 1} onChange={e => setHasParking((has_parking+1)%2)} />
          </div>
          <div>
            <label> Contact Information </label>
            <input type="text" name="contact_information" value={contact_information}  onChange={e => setContactInformation(e.target.value)}></input>
          </div>
        </fieldset>
        <button className="btn-primary" onClick={onSubmit}>Submit</button>
        <button className="btn-secondary" onClick={onCancel}>cancel</button>
      </form>
    </div>);
}