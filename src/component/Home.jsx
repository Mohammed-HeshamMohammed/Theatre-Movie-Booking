import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import Navs from "./Navs";
import Header from "./Header";
import { theatreData } from "../TheatreData";
import "../css/home.css";

const GENRES = [
  { name: "Action", className: "genre-action" },
  { name: "Romance", className: "genre-romance" },
  { name: "Animation", className: "genre-animation" },
  { name: "Drama", className: "genre-drama" },
];

function Home() {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <div>
      <Navs />
      {isHome && (
        <>
          <Header />

          <section className="movie-rail">
            <h2 className="section-heading">Now Showing</h2>
            <div className="rail-scroll">
              {theatreData.map((movie) => (
                <NavLink
                  to={`/home/seats/${movie.id}`}
                  key={movie.id}
                  className="rail-card"
                >
                  <img src={movie.image} alt={movie.title} />
                  <div className="rail-card-overlay">
                    <span>Reserve Seats</span>
                  </div>
                  <p className="rail-card-title">{movie.title}</p>
                </NavLink>
              ))}
            </div>
          </section>

          <section className="genre-rail">
            <h2 className="section-heading">Browse by Genre</h2>
            <div className="genre-grid">
              {GENRES.map((genre) => (
                <NavLink
                  to="/home/reserveSeats"
                  key={genre.name}
                  className={`genre-pill ${genre.className}`}
                >
                  {genre.name}
                </NavLink>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Home;
