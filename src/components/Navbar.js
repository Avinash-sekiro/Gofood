import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navsstyle.css";
import Pop from "./Pop";
import { Link, useNavigate } from 'react-router-dom';
import { BsPersonCircle } from "react-icons/bs";
import { NavDropdown } from 'react-bootstrap';

export default function Navbars() {
  const navs = useNavigate();

  const logout = () => {
    localStorage.removeItem("authToken");
    navs('/login');
  }

  return (
    <div id='q'>
      <Navbar collapseOnSelect expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className='fs-2' href="#home">GoFood</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#ca2">Features</Nav.Link>
              <Nav.Link href="#ca4">Menu</Nav.Link>
              <Link to="/order" className='text-decoration-none nav-link'>Order</Link>
              <Nav.Link><Pop/></Nav.Link>
            </Nav>
            <Nav>
              <div>
                {!localStorage.getItem("authToken") ? (
                  <div>
                    <Link to="/login" className='btn btn-outline-light bg-white text-success mx-2'>Login</Link>
                    <Link to="/createuser" className='btn btn-outline-light bg-white text-success mx-2'>Signup</Link>
                  </div>
                ) : (
                  <div className='fs-3'>
                    <NavDropdown title={<BsPersonCircle />} id="navbarScrollingDropdown">
                      <NavDropdown.Item>{localStorage.getItem("Emails") || 'Guest'}</NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to="/myorder" className='text-decoration-none text-dark'>My order</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  </div>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
