import "../css/Home.css";
import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Home() {
  // useState hook
  const [searchQuery, setSearchQuery] = useState("");
  const movies = [
    {
      title: "Shrek",
      release_Data: "2000",
      url: "https://placehold.co/400x600",
    },
    {
      title: "Shrek 2",
      release_Data: "2004",
      url: "https://placehold.co/400x600",
    },
    {
      title: "Shrek 5",
      release_Data: "2026",
      url: "https://placehold.co/400x600",
    },
  ];

  // event handler
  const handleSearch = (e) => {
    e.preventDefault(); // prevents the form from actually submitting
    alert(searchQuery);
    setSearchQuery("");
  };
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <div className="movies-grid">
        {/* use a map to map all movies to MovieCards */}
        {movies.map((movie, idx) => (
          <MovieCard movie={movie} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default Home;
