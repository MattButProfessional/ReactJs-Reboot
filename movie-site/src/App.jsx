import "./css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Routes, Route, useParams } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./context/MovieContext";
import Movie from "./pages/Movie";

// A wrapper to extract `id` from the URL
function MovieWrapper() {
  const { id } = useParams();
  return <Movie movieId={id} />;
}

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieWrapper />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
