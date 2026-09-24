import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/Navs.css";
import logo from "../images/logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navs() {
  const { user, logout } = useAuth();
  const { items, totalSeats } = useCart();
  const navigate = useNavigate();
  const cartCount = items.reduce((sum, item) => sum + item.qty, 0) + totalSeats;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar-expand-lg d-flex justify-content-between align-items-center main-nav">
      <div className="logo">
        <NavLink to="/home">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <SearchBar />

      <div className="nav-links" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto flex-sm-row flex-md-row">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/home" end>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/home/food" className="nav-link">
              Foods' Court
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/home/drink" className="nav-link">
              Drinks' Court
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/home/reserveSeats" className="nav-link">
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/home/cart" className="nav-link cart-icon">
              <FaShoppingCart size={22} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="nav-user">
        {user && <span className="nav-username">Hi, {user.name}</span>}
        <button className="btn btn-outline-accent" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navs;
