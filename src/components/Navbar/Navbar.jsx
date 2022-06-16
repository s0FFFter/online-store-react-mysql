import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <NavLink className="navbar-brand" to="/home">
        Ecommerce
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin">
              Admin Panel
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/user">
              {/* {loggedIn ? "User Panel" : "Log In / Sing Up"} */}
              <i
                className="fa fa-user px-2"
                aria-hidden="true"
                style={{ fontSize: "1.3rem" }}
              />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-item nav-link" to="/cart">
              <i
                className="fa fa-shopping-cart px-2"
                aria-hidden="true"
                style={{ fontSize: "1.3rem" }}
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
