import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Navs from "./Navs";
import Header from "./Header";
import { useMovies } from "../context/MoviesContext";
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
  const { movies, loading, error, isLive } = useMovies();

  return (
    <div>
      <Navs />
      {isHome && (
        <>
          <Header />

          <section className="movie-rail">
            <h2 className="section-heading">Now Showing</h2>
            {loading && <p className="movies-status">Loading movies…</p>}
            {error && !isLive && (
              <p className="movies-status movies-status-error">
                Couldn't load live movie data ({error}). Showing the demo catalogue instead.
              </p>
            )}
            <div className="rail-scroll">
              {movies.map((movie) => (
                <NavLink
                  to={`/home/seats/${movie.id}`}
                  key={movie.id}
                  className="rail-card"
                >
                  <img src={movie.image} alt={movie.title} />
                  {movie.rating != null && (
                    <span className="rating-badge rail-rating-badge">
                      <FaStar /> {movie.rating}
                    </span>
                  )}
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
