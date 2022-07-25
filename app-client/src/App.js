import {
  BrowserRouter as Router, Link, Route, Routes
} from "react-router-dom";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SiteContainer from "./pages/SiteContainer";
import ProductFormNew from "./components/ProductFormNew";

export default function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<SiteContainer />}>
              <Route path="" element={<Home />} />
              <Route path="events" element={<Events />} />
              <Route path="products" element={<Products />} >
                <Route path=""
                  element={
                    <Link to='/products/new'>
                      <button>Add a Product</button>
                    </Link>} />
                <Route path="new" element={<ProductFormNew />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}