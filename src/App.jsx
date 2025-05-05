import { useState, useRef } from "react";
import "./App.css";
import WeatherInformations from "./components/WeatherInformations/WeatherInformations";
import WeatherInformations5Days from "./components/WeatherInformations5Days/WeatherInformations5Days";

function App() {
  const [weather, setWeather] = useState();
  const [weather5Days, setWeather5Days] = useState();
  const [error, setError] = useState("");

  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value.trim();
    const key = "cec3be60896cae8b668a43cb5a38fefd";

    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      const response = await fetch(url);
      const response5Days = await fetch(url5Days);

      if (!response.ok || !response5Days.ok) {
        throw new Error("Erro ao buscar dados.");
      }

      const data = await response.json();
      const data5Days = await response5Days.json();

      setWeather(data);
      setWeather5Days(data5Days);
      setError("");
    } catch (err) {
      setError("Cidade não encontrada. Tente novamente.");
      setWeather(null);
      setWeather5Days(null);
    }

    inputRef.current.value = ""; 
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      searchCity();
    }
  }

  return (
    <div className="container">
      <h1>Weather Hub</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Digite o nome para a cidade"
        onKeyDown={handleKeyDown}
      />
      <button onClick={searchCity}>Buscar</button>
      {weather && <WeatherInformations weather={weather} />}
      {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
