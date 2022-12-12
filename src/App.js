import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovie] = useState([]);
  function fetchMovieHandler() {
    fetch("https://swapi.dev/api/films/")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const transformedMovies = data.results.map((movieData) => {
          return {
            //changing data name of API
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovie(transformedMovies);
      })
      .catch();
  }
  function closeMoive() {
    setMovie([]);
  }
  return (
    <>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
        <button onClick={closeMoive}>Close Movie</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </>
  );
}

export default App;
