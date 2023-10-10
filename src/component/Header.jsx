import React from "react";
import "../images/HeroImage.webp"
import "../css/header.css"

function Header() {
  return (
    <header className='overlay'>
      <div className="hero">
        <div className="info">
          <h1>Theatre Booking System</h1>
          <p className="fs-6 ">
            The theatre booking system is an online platform that allows users
            to reserve seats and purchase tickets for various performances and
            shows at the theater.{" "}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
