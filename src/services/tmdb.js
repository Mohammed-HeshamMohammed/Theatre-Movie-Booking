// Thin wrapper around The Movie Database (TMDB) API v3.
// https://developer.themoviedb.org/reference/intro/getting-started
//
// Requires a free API key in REACT_APP_TMDB_API_KEY (see .env.example).
// Without one, the app falls back to the bundled demo movie data - see
// MoviesContext.

const API_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const isTmdbConfigured = Boolean(API_KEY);

export function posterUrl(path, size = "w500") {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

export function backdropUrl(path, size = "w1280") {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

async function tmdbFetch(path, params = {}) {
  const url = new URL(`${API_BASE}${path}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url.toString());
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.status_message || `TMDB request failed (${response.status})`);
  }
  return response.json();
}

function extractTrailerKey(videos) {
  const results = videos?.results || [];
  const trailer =
    results.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official) ||
    results.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    results.find((v) => v.site === "YouTube");
  return trailer ? trailer.key : null;
}

export function normalizeListMovie(raw, genresById) {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.overview,
    image: posterUrl(raw.poster_path),
    rating: typeof raw.vote_average === "number" ? Number(raw.vote_average.toFixed(1)) : null,
    genres: (raw.genre_ids || []).map((genreId) => genresById[genreId]).filter(Boolean),
    trailerKey: null,
  };
}

export async function fetchGenreMap() {
  const data = await tmdbFetch("/genre/movie/list");
  const map = {};
  (data.genres || []).forEach((genre) => {
    map[genre.id] = genre.name;
  });
  return map;
}

export async function fetchNowPlayingRaw() {
  const data = await tmdbFetch("/movie/now_playing", { page: 1 });
  return data.results || [];
}

export async function fetchMovieDetails(id) {
  const raw = await tmdbFetch(`/movie/${id}`, { append_to_response: "videos" });
  return {
    id: raw.id,
    title: raw.title,
    description: raw.overview,
    image: posterUrl(raw.poster_path),
    backdrop: backdropUrl(raw.backdrop_path, "original"),
    rating: typeof raw.vote_average === "number" ? Number(raw.vote_average.toFixed(1)) : null,
    genres: (raw.genres || []).map((genre) => genre.name),
    trailerKey: extractTrailerKey(raw.videos),
    releaseDate: raw.release_date,
  };
}
