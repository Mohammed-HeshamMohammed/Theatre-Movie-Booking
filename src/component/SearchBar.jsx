import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { theatreData } from "../TheatreData";
import "../css/SearchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredMovies = theatreData.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredMovies);
  };

  const handleSelect = (movie) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/home/seats/${movie.id}`);
  };

  const handleBlur = () => {
    // Delay so a click on a suggestion registers before the list unmounts.
    setTimeout(() => setSuggestions([]), 150);
  };

  return (
    <div className="search-container" ref={containerRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="Search for movies..."
        className="search-input"
      />

      {searchTerm && suggestions.length > 0 && (
        <div className="suggestions-dropdown show">
          {suggestions.map((movie) => (
            <div
              key={movie.id}
              className="suggestion-item"
              onMouseDown={() => handleSelect(movie)}
            >
              <img src={movie.image} alt={movie.title} className="movie-image" />
              <span className="movie-title">{movie.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
