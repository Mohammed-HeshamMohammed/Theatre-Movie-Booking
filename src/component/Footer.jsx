import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.jpg";
import { faFacebook, faGoogle, faInstagram } from "@fortawesome/fontawesome-free-brands";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/Footer.css';

function Footer() {
  return (
    <footer className="navbar-expand-lg d-flex justify-content-around text-dark">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto text-dark flex-sm-row flex-md-row">
          <li className="nav-item text-white">
            <NavLink to="/home/food" className="nav-link">
              Foods' Court
            </NavLink>
          </li>
          <li className="nav-item text-white">
            <NavLink to="/home/drink" className="nav-link">
              Drinks' Court
            </NavLink>
          </li>
          <li className="nav-item text-white">
            <NavLink to="/home/reserveSeats" className="nav-link">
              Movies
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="icons text-white">
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faGoogle} />
        <FontAwesomeIcon icon={faInstagram} />
      </div>
    </footer>
  );
}

export default Footer;
