import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/Navs.css";
import logo from "../images/logo.jpg";
import { FaShoppingCart, FaRegMoon, FaSun } from "react-icons/fa";
import SearchBar from "./SearchBar";
function Navs() {
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    const body = document.body;
    const navLinks = document.querySelectorAll(".nav-link");
    const logoImage = document.querySelector(".logo img");
    const footer = document.querySelector(".footer");
  
    if (nightMode) {
      // Night mode styles
      body.style.backgroundColor = "#000";
      navLinks.forEach(link => {
        link.style.color = "#fff";
      });
      if (logoImage) logoImage.style.filter = "invert(1)";
      if (footer) {
        footer.style.backgroundColor = "#000";
        footer.style.color = "#fff";
      }
    } else {
      // Day mode styles
      body.style.backgroundColor = "#fff";
      navLinks.forEach(link => {
        link.style.color = "#000";
      });
      if (logoImage) logoImage.style.filter = "invert(0)";
      if (footer) {
        footer.style.backgroundColor = "#fff";
        footer.style.color = "#000";
      }
    }
  }, [nightMode]);
  
  function toggleNightMode() {
    setNightMode(!nightMode);
  }





  
  return (
    <nav className="navbar-expand-lg d-flex justify-content-between align-items-center text-dark">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <SearchBar/>

      <div className="nav-links" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto text-dark flex-sm-row flex-md-row">
          <li>
            <div className="night-mode-toggle" onClick={toggleNightMode}>
              {nightMode ? (
                <FaSun size={30} className="night-mode-icon text-white" />
              ) : (
                <FaRegMoon size={30} className="night-mode-icon text-dark" />
              )}
            </div>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to="/home" exact>
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
            <div className="cart-icon">
              <NavLink to="/home/cart" className="nav-link">
                <FaShoppingCart size={30} />
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
  
      <div className="form">
        <form className="form-inline my-2 my-lg-0">
          <button className="btn btn-danger mx-3">
            <NavLink className="text-white" to="/">
              Logout
            </NavLink>
          </button>
        </form>
      </div>
    </nav>
  );
  
}

export default Navs;
