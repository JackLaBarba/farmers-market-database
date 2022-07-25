import { useEffect, useState } from "react";

export default function ProductForm({ submitAction, cancelAction, product, legend }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setUnit(product.unit);
    }
  }, [product]);

  const onSubmit = (e) => {
    e.preventDefault();
    submitAction({ name, description, unit });
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
            <label> Description </label>
            <textarea name="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
          </div>
          <div>
            <label> Unit </label>
            <input type="text" name="unit" value={unit} onChange={e => setUnit(e.target.value)} />
          </div>
        </fieldset>
        <button className="btn-primary" onClick={onSubmit}>Submit</button>
        <button className="btn-secondary" onClick={onCancel}>cancel</button>
      </form>
    </div>);
}