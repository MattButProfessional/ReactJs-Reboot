import { getMovie } from "../services/api";
import { useState, useEffect } from "react";
import "../css/Movie.css";

function Movie({ movieId }) {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      if (!movieId) return; // Prevents unnecessary fetches
      setLoading(true);
      setError(null);
      try {
        const movieData = await getMovie(movieId);
        setMovie(movieData);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError("Failed to load movie.");
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [movieId]); // Runs whenever `movieId` changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="Container">
      <h1>{movie.title}</h1>
      <div className="Container-Two">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="Info-Container">
          <h2>Release Date</h2>
          <p>{movie.release_date?.split("-")[0]}</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
      <code>{JSON.stringify(movie, null, 2)}</code>
    </div>
  );
}

export default Movie;
