import "../css/MovieCard.css";
import { useMovieContext } from "../context/MovieContext";
// functional component - takes a movie as a prop
function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  // event handling
  function onFavoriteClick(e) {
    e.preventDefault();
    console.log("favoriting");
    if (favorite) {
      removeFromFavorites(movie.id);
      console.log("Removed");
    } else {
      addToFavorites(movie);
      console.log("Added");
    }
  }
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ❤️
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_data}</p>
      </div>
    </div>
  );
}

export default MovieCard;
