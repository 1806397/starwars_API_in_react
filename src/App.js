import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function fetchMovieHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong.\n Please try again later");
      }
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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && (
          <p>No movies found...</p>
        )}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </>
  );
}

export default App;
