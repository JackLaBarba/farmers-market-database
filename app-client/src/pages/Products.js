import { useEffect, useState } from "react";
import config from "../config";
import {
  Link,
  Outlet
} from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  async function readProducts() {
    const url = `${config.backend_url}/products`;
    const response = await fetch(url, { method: 'GET' });
    setProducts(await response.json());
  }

  async function createProduct(attributes) {
    const url = `${config.backend_url}/products`;
    await fetch(url,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attributes)
      });
    await readProducts(); // reload products after we've saved the new one.
  }

  async function updateProduct(product_id, attributes) {
    const url = `${config.backend_url}/products/${product_id}`;
    await fetch(url,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attributes)
      });
    await readProducts(); // reload products after we've updated this new one.
  }

  async function deleteProduct(product_id) {
    const url = `${config.backend_url}/products/${product_id}`;
    await fetch(url,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
    await readProducts(); // reload products after we've deleted this one.
  }

  // Load products from the server when the component renders.
  useEffect(() => {
    readProducts();
  }, []);

  return <div><h2>Products</h2>
    <table className="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Unit</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) =>
          <tr key={index}>
            <td>{product.product_id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.unit}</td>
            <td>
              <button className="edit" title="Edit" data-toggle="tooltip" >
                <Link to={`/products/${product.product_id}/update`}>
                  <i className="material-icons">&#xE254;</i>
                </Link>
              </button>
              <button className="delete" title="Delete" data-toggle="tooltip"
                onClick={() => deleteProduct(product.product_id)}>
                <i className="material-icons">&#xE872;</i>
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    <Outlet context={{ createProduct, updateProduct, products }} />
  </div>;
}
