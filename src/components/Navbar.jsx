import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = user?.role ?? null;
  const isLoggedIn = !!role;

  const handleLogout = () => {
    logout();
    // navigate('/');
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top border-bottom">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
            src="/assets/img/logo.PNG"
            height={32}
            alt="TurfBook Logo"
            className="me-2"
          />
          Turf<span className="text-primary">Book</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMain"
          aria-controls="navMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMain">
          <ul className="navbar-nav me-auto">
            {/* 👇 show these only for logged-in CUSTOMER */}
            {(!isLoggedIn) && (
              <>
                <li className="nav-item">
                  <a href="#features" className="nav-link">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#about" className="nav-link">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#contact" className="nav-link">
                    Contact
                  </a>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <NavDropdown title="Register" id="nav-dropdown">
                  <NavDropdown.Item href="/register-customer">
                    As Player
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/register-owner">
                    As Owner
                  </NavDropdown.Item>
                </NavDropdown>
                <li className="nav-item">
                  <a href="/login" className="nav-link">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/admin-login" className="nav-link">
                    Admin Login
                  </a>
                </li>
              </>
            ) : role === "admin" ? (
              <>
                <li className="nav-item">
                  <a href="/admin-dashboard" className="nav-link">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/admin-owners" className="nav-link">
                    Owners
                  </a>
                </li>
                <Button variant="outline-danger" onClick={handleLogout} className="ms-2">
                  Logout
                </Button>
              </>
            ) : role === "owner" ? (
              <>
                <li className="nav-item">
                  <a href="/owner-dashboard" className="nav-link">
                    Dashboard
                  </a>
                </li>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a href="/customer-history" className="nav-link">
                    My Bookings
                  </a>
                </li>
                <Button variant="outline-danger" onClick={handleLogout} className="ms-2">
                  Logout
                </Button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
