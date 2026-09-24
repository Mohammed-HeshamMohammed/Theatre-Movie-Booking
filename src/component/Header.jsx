import React from "react";
import { NavLink } from "react-router-dom";
import "../images/HeroImage.webp";
import "../css/header.css";

function Header() {
  return (
    <header className="overlay">
      <div className="hero">
        <div className="info">
          <span className="hero-tag">Now Showing</span>
          <h1>Theatre Booking System</h1>
          <p className="fs-6">
            Reserve seats and grab your favorite snacks for the latest blockbusters, all in
            one place.
          </p>
          <NavLink to="/home/reserveSeats" className="btn btn-primary-accent hero-cta">
            Browse Movies
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
