import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css'; // Custom styles
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal'; // ✅ Updated path (from src folder)
import { useCart } from './ContextReducer'; // adjust path as needed
import Cart from '../screens/Cart'; // ✅ Keep as is if Cart.js is in src/screens


export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const isLoggedIn = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success custom-navbar">
      <div className="container-fluid px-4 py-2">
        <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">Home</Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/myOrder">My Orders</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {!isLoggedIn ? (
              <>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
              </>
            ) : (
              <>
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={() => setCartView(true)}
                  style={{ cursor: "pointer" }}
                >
                  My Cart{" "}
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>

                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}

                <div
                  className="btn bg-white text-danger mx-2"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
