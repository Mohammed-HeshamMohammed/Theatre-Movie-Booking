import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/Navs.css";
import logo from "../images/logo.jpg";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";

function Navs() {
  const { user, logout } = useAuth();
  const { items, totalSeats } = useCart();
  const { toggleMobileSidebar } = useUI();
  const navigate = useNavigate();
  const cartCount = items.reduce((sum, item) => sum + item.qty, 0) + totalSeats;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar-expand-lg d-flex justify-content-between align-items-center main-nav">
      <div className="nav-left">
        <button
          className="sidebar-toggle-btn"
          onClick={toggleMobileSidebar}
          aria-label="Toggle menu"
        >
          <FaBars size={20} />
        </button>
        <div className="logo">
          <NavLink to="/home">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
      </div>

      <SearchBar />

      <div className="nav-user">
        <NavLink to="/home/cart" className="nav-link cart-icon">
          <FaShoppingCart size={22} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </NavLink>
        {user && <span className="nav-username">Hi, {user.name}</span>}
        <button className="btn btn-outline-accent" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navs;
