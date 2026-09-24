import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "../css/TrailerModal.css";

function TrailerModal({ trailerKey, title, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="trailer-modal-backdrop" onClick={onClose}>
      <div className="trailer-modal" onClick={(event) => event.stopPropagation()}>
        <button className="trailer-modal-close" onClick={onClose} aria-label="Close trailer">
          <FaTimes />
        </button>
        <div className="trailer-modal-frame">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title={`${title} trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;
