import { useEffect, useState } from "react";

export default function ProductForm({submitAction}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    submitAction({name, description, unit});
  }

  return (
    <div>
      <div id="insert">
        <form id="addProduct">
          <legend><strong>Add Product</strong></legend>
          <fieldset className="fields">
            <div>
              <label> Name </label>
              <input type="text" name="name" onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label> Description </label>
              <textarea name="description" onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <div>
              <label> Unit </label>
              <input type="text" name="unit" onChange={e => setUnit(e.target.value)} />
            </div>
          </fieldset>
          <input className="btn" type="submit" onClick={onSubmit} />
          <input className="btn" type="button" value="cancel" />
        </form>
      </div>
    </div>);
}