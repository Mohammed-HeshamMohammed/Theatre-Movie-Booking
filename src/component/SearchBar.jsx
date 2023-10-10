import React, { useState } from "react";
import { theatreData } from "../TheatreData"; // Adjust the path based on your actual file structure
import "../css/SearchBar.css"; // Adjust the path based on your actual file structure

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter movies based on the search term
    const filteredMovies = theatreData.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );

    // Update the suggestions
    setSuggestions(filteredMovies);
  };

  return (
    <div className="search-container ">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for movies..."
        className="search-input"
      />

      {/* Suggestions dropdown */}
      {searchTerm && (
        <div className={`suggestions-dropdown ${suggestions.length > 0 ? "show" : ""}`}>
          {suggestions.map((movie) => (
            <div key={movie.id} className="suggestion-item">
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
