import { useEffect, useState } from "react";
import config from "../config";

export default function Products() {
  const [products, setProducts] = useState([]);
  
  async function fetchProducts() {
    const url = `${config.backend_url}products`;
    const response = await fetch(url, { method: 'GET' });
    setProducts(await response.json());
  }

  // Load products from the server when the component renders.
  useEffect(() => {
    fetchProducts();
  }, []);

  return <div><h2>Products</h2>
    <table className="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Unit</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) =>
          <tr key={index}>
            <td>{product.product_id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.unit}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>;
}
