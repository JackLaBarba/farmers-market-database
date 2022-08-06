import { useEffect, useState } from "react";
import config from "../config";
import {Outlet} from "react-router-dom";

export default function StockedProducts() {
    const [stocked_products, setStocks] = useState([]);
    
async function readStock() {
  const url = `${config.backend_url}/stocked_products`;
  const response = await fetch(url, { method: 'GET' });
  setStocks(await response.json());
}

async function createStockedProduct(attributes) {
  const url = `${config.backend_url}/stocked_products`;
  await fetch(url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attributes)
    });
  await readStock(); // reload Stocked Products after we've saved the new one.
}

// Load Stocked Products from the server when the component renders.
useEffect(() => {
  readStock();
}, []);
return <div><h2>Stocked Products Details</h2>
 <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vendor Name</th>
              <th>Product Name</th>
              <th>Unit</th>
              <th>Price per Unit</th>
            </tr>
          </thead>
          <tbody>
            {stocked_products.map((stock, index) =>
              <tr key={index}>
                <td>{stock.stocked_product_id}</td>
                <td>{stock.business_name}</td>
                <td>{stock.name}</td>
                <td>{stock.unit}</td>
                <td>$ {(stock.unit_price_cent/100).toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>
        <Outlet context={{ createStockedProduct, stocked_products}} />
    </div>;
}