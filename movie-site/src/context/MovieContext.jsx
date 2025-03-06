import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

// Custom hook to access the context
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const favs = JSON.parse(localStorage.getItem("movieFavorites"));
  const [favorites, setFavorites] = useState(favs ? favs : []);

  // load favorites from localStorage when app loads
  useEffect(() => {
    const storedFavs = localStorage.getItem("movieFavorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  // every time favorites changes, execute the function
  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // function to add a movie to favorites
  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites?.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
