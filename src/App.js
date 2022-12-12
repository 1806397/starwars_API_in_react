import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovie] = useState([]);
  async function fetchMovieHandler() {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

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
