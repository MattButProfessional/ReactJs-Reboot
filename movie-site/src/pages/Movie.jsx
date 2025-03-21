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
      <h1 className="DetailH1">{movie.title}</h1>
      <div className="Container-Two">
        <img
          className="DetailImg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="Info-Container">
          <h2 className="DetailH2">Overview</h2>
          <p className="DetailParagraph">{movie.overview}</p>
          <h2 className="DetailH2">Release Date</h2>
          <p className="DetailParagraph">{movie.release_date?.split("-")[0]}</p>
          <h2 className="DetailH2">Genres</h2>
          <ul className="genres">
            {movie.genres.map((genre) => (
              <li className="DetailList" key={genre.id}>
                {genre.name}
              </li>
            ))}
          </ul>
          <h2 className="DetailH2">Budget</h2>
          <p className="DetailParagraph">
            {movie.budget === 0
              ? "N/A"
              : new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(movie.budget)}
          </p>
          <h2 className="DetailH2">Run Time</h2>
          <p className="DetailParagraph">{movie.runtime} min</p>
        </div>
      </div>
    </div>
  );
}

export default Movie;
