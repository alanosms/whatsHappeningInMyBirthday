import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const gif_loading = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif";
  const key_api = "v0XTaBOwQbptsvkOYsOIdYo7YrJn0fsDhBj8horV";
  const [startDate, setStartDate] = useState(new Date().toISOString().substring(0, 10));
  const maxDate = new Date().toISOString().substring(0, 10);
  const [result, setResult] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchEvent();
  }, [])

  const searchEvent = () => {
    setLoading(true);
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${key_api}&date=${startDate}`)
      .then(res => {
        setResult(res.data)
        setLoading(false);
      })
      .catch(error => {
        setError('An error occurred while fetching data. Please try again.');
        setLoading(false);
      });
  }
  return (
    <div className="container">
      <div className="title">
        <p>What's happening in this day?</p>
        <p>enter a date to rescue astronomical events:</p>
      </div>
      <div>
        <input type="date" className="date" min="1995-06-16" max={maxDate} value={startDate} onChange={e => setStartDate(e.target.value)} />
        <button onClick={() => searchEvent(startDate)}>Search</button>
      </div>
      <section className="containerResult">
          <div className="result">
            <a href={result.hdurl} target="_blank">
              {loading ? <img src={gif_loading} className="loading" alt='loading'/> : <img src={result.hdurl} alt="result img" />}</a>
          </div>
          <div className="explanation">
            <h1>Explanation</h1>
            {result.explanation}
          </div>
      </section>
    </div>
  );
}

export default App;
