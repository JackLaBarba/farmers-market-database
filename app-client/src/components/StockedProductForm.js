import { useEffect, useState } from "react";
import config from "../config";

export default function StockedProductForm({ submitAction, cancelAction, stockedProduct, legend }) {
  const [vendor_id, setVendorId] = useState("Null");
  const [product_id, setProductId] = useState("Null");
  const [unit_price_cent, setUnitPriceCent] = useState(0);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (stockedProduct) {
      setVendorId(stockedProduct.vendor_id);
      setProductId(stockedProduct.product_id);
      setUnitPriceCent(stockedProduct.unit_price_cent);
    }
    readVendors();
    readProducts();
  }, [stockedProduct]);

  async function readVendors() {
    const url = `${config.backend_url}/vendors`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    setVendors(data);
    setVendorId(data[0].vendor_id);
  }

  async function readProducts() {
    const url = `${config.backend_url}/products`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    setProducts(data);
    setProductId(data[0].product_id);

  }

  const onSubmit = (e) => {
    e.preventDefault();
    submitAction({vendor_id, product_id, unit_price_cent});
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
          <label> Product </label>
            <select name="product" onChange={e => setProductId(e.target.value)} >
              {products.map((p, key) => <option value={p.product_id} key={key}>{p.name}</option> )}
            </select>
          </div>
          <div>
            <label> Price Per Unit </label>
            <input type="number" name="unit_price_cent" min="0.00" step="0.01" value={unit_price_cent / 100}  onChange={e => setUnitPriceCent(e.target.value*100)}></input>
          </div>
        </fieldset>
        <button className="btn-primary" onClick={onSubmit}>Submit</button>
        <button className="btn-secondary" onClick={onCancel}>cancel</button>
      </form>
    </div>);
}