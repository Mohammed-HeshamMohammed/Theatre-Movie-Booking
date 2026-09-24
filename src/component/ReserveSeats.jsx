import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useParams } from "react-router-dom";
import { theatreData } from "../TheatreData";
import { useCart } from "../context/CartContext";
import "../css/reserveSeats.css";

const TOTAL_SEATS = 30;

function ReserveSeats() {
  const { id } = useParams();
  const { seatsByMovie, toggleSeat, seatPrice } = useCart();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const movie = theatreData.find((item) => String(item.id) === id);
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
      {movie && <h2 className="seats-movie-title">{movie.title}</h2>}
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
    </div>
  );
}

export default ReserveSeats;
