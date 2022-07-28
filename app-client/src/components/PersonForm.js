import { useEffect, useState } from "react";

export default function PersonForm({ submitAction, cancelAction, person, legend }) {
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [is_admin, setAdmin] = useState("");

  useEffect(() => {
    if (person) {
      setName(person.full_name);
      setEmail(person.email);
      setPhone(person.phone_number);
      setAdmin(person.is_admin);
    }
  }, [person]);

  const onSubmit = (e) => {
    e.preventDefault();
    submitAction({ full_name, email, phone_number, is_admin });
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
            <label> Full Name </label>
            <input type="text" name="name" value={full_name}  onChange={e => setName(e.target.value)}></input>
          </div>
          <div>
            <label> Email </label>
            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}></input>
          </div>
          <div>
            <label> Phone Number </label>
            <input type="text" name="contact" value={phone_number} onChange={e => setPhone(e.target.value)} />
          </div>
          <div>
            <label> Is Admin? </label>
            <input type="number" name="admin" value={is_admin} onChange={e => setAdmin(e.target.value)} />
          </div>
        </fieldset>
        <button className="btn-primary" onClick={onSubmit}>Submit</button>
        <button className="btn-secondary" onClick={onCancel}>cancel</button>
      </form>
    </div>);
}