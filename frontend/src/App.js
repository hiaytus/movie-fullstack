import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8080/`)
      .then(res => res.json())
      .then(data => setMovies(data))
  }, [])

  return (
    <div className="App">
      <h2>hello</h2>
      <ul>
      {movies.map((movie, index) => {
        return <li key={index}> {movie.title} </li>
      })}
      </ul>
    </div>
  );
}

export default App;
