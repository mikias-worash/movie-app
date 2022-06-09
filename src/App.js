import "./App.css";
import SearchIcon from "./search.svg";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

// 5396da20
const API_URL = "https://www.omdbapi.com?apikey=5396da20";

function App() {
  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  const searchHomeMovies = async (titles) => {
    let response, data;
    let movieData = [];
    for (let i = 0; i < titles.length; i++) {
      response = await fetch(`${API_URL}&s=${titles[i]}`);
      data = await response.json();
      movieData[i] = data.Search[0];
    }

    setMovies(movieData);
  };

  useEffect(() => {
    searchHomeMovies([
      "Training day",
      "dark knight",
      "endgame",
      "The shawshank redemption",
      "Dune",
      "No way home",
      "Breaking bad",
      "Rick and Morty",
      "Friends",
    ]);
  }, []);

  return (
    <div className="app">
      <h1>Movies</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) =>
            e.keyCode === 13
              ? searchMovies(searchTerm)
              : setSearchTerm(e.target.value)
          }
        />

        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>We're Sorry, No matches found!</h2>
        </div>
      )}
    </div>
  );
}

export default App;
