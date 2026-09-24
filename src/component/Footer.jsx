import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.jpg";
import { faFacebook, faGoogle, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <ul>
        <li>
          <NavLink to="/home/food">Foods' Court</NavLink>
        </li>
        <li>
          <NavLink to="/home/drink">Drinks' Court</NavLink>
        </li>
        <li>
          <NavLink to="/home/reserveSeats">Movies</NavLink>
        </li>
      </ul>

      <div className="icons">
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faGoogle} />
        <FontAwesomeIcon icon={faInstagram} />
      </div>
    </footer>
  );
}

export default Footer;
