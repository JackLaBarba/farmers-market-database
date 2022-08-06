import {
  BrowserRouter as Router, Link, Route, Routes
} from "react-router-dom";
//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//Pages
import Home from "./pages/Home";
import People from "./pages/People";
import Vendors from "./pages/Vendors";
import Products from "./pages/Products";
import StockedProducts from "./pages/StockedProducts";
import Locations from "./pages/Locations";
import Events from "./pages/Events";
import VendorsAtEvents from "./pages/VendorsAtEvents";
//Components
import SiteContainer from "./components/SiteContainer";
import ProductFormNew from "./components/ProductFormNew";
import ProductFormUpdate from "./components/ProductFormUpdate";
import PersonFormNew from "./components/PersonFormNew";
import PersonFormUpdate from "./components/PersonFormUpdate";
import VendorFormNew from "./components/VendorFormNew";
import StockedProductFormNew from "./components/StockedProductFormNew";

export default function App() {
  return (
    <div>
      <div>
        <Router>
          <Container className="logo_container">
            <Row>
              <Col>
                <a className="navbar-brand" href="/"><img src={require("./logo.jpg")} alt="logo" className="logo" /></a>
              </Col>
              <Col xs={10}>
                <h2 className="header_title">FARMERS MARKET DATABASE</h2>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col><SiteContainer /></Col>
              <Col xs={9}>
                <Row>
                  <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="people" element={<People />}>
                      <Route path="" element={<Link to='/people/new'><button>Add a Person</button></Link>} />
                      <Route path="new" element={<PersonFormNew />} />
                      <Route path=":person_id/update" element={<PersonFormUpdate />} />
                    </Route>

                    <Route path="vendors" element={<Vendors />} >
                      <Route path="" element={<Link to='/vendors/new'><button>Add a Vendor</button></Link>} />
                      <Route path="new" element={<VendorFormNew />} />
                    </Route>

                    <Route path="products" element={<Products />} >
                      <Route path="" element={<Link to='/products/new'><button>Add a Product</button></Link>} />
                      <Route path="new" element={<ProductFormNew />} />
                      <Route path=":product_id/update" element={<ProductFormUpdate />} />
                    </Route>

                    <Route path="stocked_products" element={<StockedProducts />} >
                      <Route path="" element={<Link to='/stocked_products/new'><button>Add a Stocked Product</button></Link>} />
                      <Route path="new" element={<StockedProductFormNew />} />
                    </Route>

                    <Route path="locations" element={<Locations />} />
                    <Route path="events" element={<Events />} />
                    <Route path="vendors_at_events" element={<VendorsAtEvents />} />
                  </Routes>
                </Row>
                <Row>
                  {/* <div>
                  <footer><p>© 2022 Portland Farmers Market</p></footer>
                </div> */}
                </Row>
              </Col>
            </Row>
          </Container>
        </Router>
      </div>
    </div>

  );
}