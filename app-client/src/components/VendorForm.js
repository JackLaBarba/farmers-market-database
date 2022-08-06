import { useEffect, useState } from "react";
import config from "../config";

export default function VendorForm({ submitAction, cancelAction, vendor, legend }) {
  const [businessName, setBusinessName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [contactPersonId, setContactPersonId] = useState("Null");
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (vendor) {
      setBusinessName(vendor.business_name);
      setWebsiteUrl(vendor.website);
      setContactPersonId(vendor.person_id);
    }
    readPeople();
  }, [vendor]);

  async function readPeople() {
    const url = `${config.backend_url}/people`;
    const response = await fetch(url, { method: 'GET' });
    setPeople(await response.json());
  }

  const onSubmit = (e) => {
    e.preventDefault();
    submitAction({ business_name: businessName, website_url: websiteUrl, person_id: contactPersonId });
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
            <label> Business Name </label>
            <input type="text" name="businessName" value={businessName}  onChange={e => setBusinessName(e.target.value)}></input>
          </div>
          <div>
            <label> Website </label>
            <input type="text" name="website" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)}></input>
          </div>
          <div>
            <label> Contact Person </label>
            <select name="contact" onChange={e => setContactPersonId(e.target.value)} >
              <option value="Null">-none-</option>
              {people.map((p, key) => <option value={p.person_id} key={key}>{p.full_name}</option> )}
            </select>
          </div>
        </fieldset>
        <button className="btn-primary" onClick={onSubmit}>Submit</button>
        <button className="btn-secondary" onClick={onCancel}>cancel</button>
      </form>
    </div>);
}