import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { theatreData as fallbackMovies } from "../TheatreData";
import { isTmdbConfigured, fetchGenreMap, fetchNowPlayingRaw, normalizeListMovie } from "../services/tmdb";

const MoviesContext = createContext(null);

export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState(fallbackMovies);
  const [loading, setLoading] = useState(isTmdbConfigured);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!isTmdbConfigured) return;
    let cancelled = false;

    (async () => {
      try {
        const [genresById, rawMovies] = await Promise.all([fetchGenreMap(), fetchNowPlayingRaw()]);
        if (cancelled) return;
        setMovies(rawMovies.map((raw) => normalizeListMovie(raw, genresById)));
        setIsLive(true);
      } catch (err) {
        if (cancelled) return;
        // Keep showing the offline demo catalogue rather than an empty page.
        setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({ movies, loading, error, isLive }),
    [movies, loading, error, isLive]
  );

  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
}

export function useMovies() {
  const ctx = useContext(MoviesContext);
  if (!ctx) throw new Error("useMovies must be used within a MoviesProvider");
  return ctx;
}
