import {
  Link,
  Outlet
} from "react-router-dom";

export default function SiteContainer() {
  return (
    <div>
      <h2>Farmers Market Database</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}