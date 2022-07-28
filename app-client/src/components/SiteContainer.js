import {Link,Outlet} from "react-router-dom";

export default function SiteContainer() {
  return (
    <div>
      <nav class="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/people">People</Link>
          </li>
          <li>
            <Link to="/vendors">Vendors</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/stocked_products">Stocked Products</Link>
          </li>
          <li>
            <Link to="/locations">Locations</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/vendors_at_events">Vendors at Events</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}