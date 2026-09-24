import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FaStar, FaPlay } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import { useMovies } from "../context/MoviesContext";
import { fetchMovieDetails, isTmdbConfigured } from "../services/tmdb";
import { useCart } from "../context/CartContext";
import TrailerModal from "./TrailerModal";
import "../css/reserveSeats.css";

const TOTAL_SEATS = 30;

function ReserveSeats() {
  const { id } = useParams();
  const { movies } = useMovies();
  const { seatsByMovie, toggleSeat, seatPrice } = useCart();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const listMovie = useMemo(() => movies.find((item) => String(item.id) === id), [movies, id]);
  const [movie, setMovie] = useState(listMovie);

  useEffect(() => {
    setMovie(listMovie);
  }, [listMovie]);

  useEffect(() => {
    if (!isTmdbConfigured || !id) return;
    let cancelled = false;
    fetchMovieDetails(id)
      .then((details) => {
        if (!cancelled) setMovie(details);
      })
      .catch(() => {
        // Keep whatever movie data we already have (list item or nothing).
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const bookedSeats = useMemo(() => seatsByMovie[id] || [], [seatsByMovie, id]);
  const seats = useMemo(
    () => Array.from({ length: TOTAL_SEATS }, (_, index) => index + 1),
    []
  );

  const handleSeatClick = (seatId) => {
    const wasBooked = bookedSeats.includes(seatId);
    toggleSeat(id, seatId);
    if (!wasBooked) {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 4000);
    }
  };

  return (
    <div className="theatre-container">
      {movie && (
        <div className="seats-movie-header">
          <h2 className="seats-movie-title">{movie.title}</h2>
          <div className="seats-movie-meta">
            {movie.rating != null && (
              <span className="seats-rating-badge">
                <FaStar /> {movie.rating}
              </span>
            )}
            {movie.genres &&
              movie.genres.map((genre) => (
                <span key={genre} className="genre-chip">
                  {genre}
                </span>
              ))}
            {movie.trailerKey && (
              <button
                type="button"
                className="btn btn-outline-accent btn-sm"
                onClick={() => setTrailerOpen(true)}
              >
                <FaPlay /> Watch Trailer
              </button>
            )}
          </div>
        </div>
      )}

      <div className="info d-flex justify-content-center mt-3 gap-4">
        <div>
          booked
          <FontAwesomeIcon className="booked mx-2 " icon={faCouch} />
        </div>
        <div>
          not booked
          <FontAwesomeIcon className="mx-2" icon={faCouch} />
        </div>
      </div>
      <div className="screen"></div>

      <div className="row">
        {seats.map((seatId) => (
          <div
            key={seatId}
            className={`seat${bookedSeats.includes(seatId) ? " booked" : ""}`}
            onClick={() => handleSeatClick(seatId)}
          >
            <FontAwesomeIcon icon={faCouch} />
          </div>
        ))}
      </div>

      <NavLink to="/home/cart">
        <button className="btn btn-primary-accent go-to-cart">
          Go to Cart
          <FontAwesomeIcon icon={faShoppingCart} className="ms-2" />
        </button>
      </NavLink>

      {showSuccessMessage && (
        <div className="success-message-container">
          <div className="success-message">
            Seat added! {bookedSeats.length} seat(s) selected ($
            {bookedSeats.length * seatPrice})
          </div>
        </div>
      )}

      {trailerOpen && movie?.trailerKey && (
        <TrailerModal
          trailerKey={movie.trailerKey}
          title={movie.title}
          onClose={() => setTrailerOpen(false)}
        />
      )}
    </div>
  );
}

export default ReserveSeats;
