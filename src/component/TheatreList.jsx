import React from "react";
import TheatreCard from "./TheatreCard";
import { useMovies } from "../context/MoviesContext";
import "../css/TheatreList.css";
import Title from "./Title";

function TheatreList() {
  const { movies, loading, error, isLive } = useMovies();

  return (
    <div className="m-5 mb-2">
      <Title head="Have Fun Picking 😊" />
      {loading && <p className="movies-status text-center">Loading movies…</p>}
      {error && !isLive && (
        <p className="movies-status movies-status-error text-center">
          Couldn't load live movie data ({error}). Showing the demo catalogue instead.
        </p>
      )}
      <div className="boxs container mb-3 ">
        {movies.map((item) => {
          return (
            <TheatreCard
              key={item.id}
              id={item.id}
              img={item.image}
              title={item.title}
              description={item.description}
              rating={item.rating}
              genres={item.genres}
              trailerKey={item.trailerKey}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TheatreList;
