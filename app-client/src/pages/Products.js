import { useEffect, useState } from "react";
import config from "../config";

import ProductForm from "../components/ProductForm";

export default function Products() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const url = `${config.backend_url}/products`;
    const response = await fetch(url, { method: 'GET' });
    setProducts(await response.json());
  }

  async function saveProduct(attributes) {
    const url = `${config.backend_url}/products`;
    await fetch(url, 
      { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(attributes) 
      });
    await fetchProducts(); // reload products after we've saved the new one.
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
                <button className="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></button>
                <button className="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    <ProductForm submitAction={saveProduct}/>
    
  </div>;
}
