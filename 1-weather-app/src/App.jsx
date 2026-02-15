import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "b8a31b72fa03462c91641150251605";

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="app1">
        <h1>🌤️ Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p className="loader">Loading...</p>}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.location.name}</h2>
          <div className="weather-items">
            <div>
              <div className="w-image">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/011/619/504/small/temperature-3d-render-icon-illustration-png.png"></img>
              </div>
              <p>Temperature: <br></br> {weather.current.temp_c}°C</p>
            </div>
            <div >
              <div  className="w-image">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/024/984/141/small/3d-weather-forecast-icon-raindrops-air-humidity-percentage-3d-illustration-png.png"></img>
              </div>
              <p>Humidity:<br></br> {weather.current.humidity}%</p>
            </div>
            <div>
              <div  className="w-image">
                <img src="https://static.vecteezy.com/system/resources/previews/024/825/193/non_2x/3d-weather-icon-day-with-rain-free-png.png"></img>
              </div>
              <p><p>Condition: <br></br>{weather.current.condition.text}</p></p>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
