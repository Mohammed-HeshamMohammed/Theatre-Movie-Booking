import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaStar, FaPlay } from "react-icons/fa";
import TrailerModal from "./TrailerModal";
import "../css/TheatreCard.css";

function TheatreCard({ id, img, title, description, rating, genres, trailerKey }) {
  const [trailerOpen, setTrailerOpen] = useState(false);

  return (
    <Card className="custom-card">
      <Card.Img className="card-image" variant="top" src={img} alt={title} />
      {rating != null && (
        <span className="rating-badge">
          <FaStar /> {rating}
        </span>
      )}
      <div className="card-body">
        <Card.Title>{title}</Card.Title>
        {genres && genres.length > 0 && (
          <div className="genre-chips">
            {genres.slice(0, 3).map((genre) => (
              <span key={genre} className="genre-chip">
                {genre}
              </span>
            ))}
          </div>
        )}
        <Card.Text>{description}</Card.Text>
        <div className="card-actions">
          <NavLink to={"/home/seats/" + id} className="btn btn-primary-accent">
            Reserve Seats
          </NavLink>
          {trailerKey && (
            <button
              type="button"
              className="btn btn-outline-accent"
              onClick={() => setTrailerOpen(true)}
            >
              <FaPlay /> Trailer
            </button>
          )}
        </div>
      </div>

      {trailerOpen && (
        <TrailerModal trailerKey={trailerKey} title={title} onClose={() => setTrailerOpen(false)} />
      )}
    </Card>
  );
}

export default TheatreCard;
