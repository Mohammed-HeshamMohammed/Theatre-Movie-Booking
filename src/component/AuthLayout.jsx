import React from "react";
import { theatreData } from "../TheatreData";
import logo from "../images/logo.jpg";
import "../css/auth.css";

// Repeat the poster set so the grid tiles fully regardless of viewport size.
const POSTER_WALL = Array.from({ length: 40 }, (_, i) => theatreData[i % theatreData.length]);

function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-poster-wall" aria-hidden="true">
        {POSTER_WALL.map((movie, index) => (
          <img key={`${movie.id}-${index}`} src={movie.image} alt="" />
        ))}
      </div>

      <div className="auth-content">
        <img src={logo} alt="CineStream" className="auth-brand-logo" />
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
