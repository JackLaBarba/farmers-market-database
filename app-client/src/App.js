import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SiteContainer from "./pages/SiteContainer";

export default function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<SiteContainer />}>
              <Route path="" element={<Home />} />
              <Route path="events" element={<Events />} />
              <Route path="products" element={<Products />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}