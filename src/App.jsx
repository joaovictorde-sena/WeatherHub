import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import WeatherInformations from "./components/WeatherInformations/WeatherInformations";
import WeatherInformations5Days from "./components/WeatherInformations5Days/WeatherInformations5Days";

function App() {
  const [weather, setWeather] = useState();
  const [weather5Days, setWeather5Days] = useState();
  const [error, setError] = useState("");

  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value;
    const key = "cec3be60896cae8b668a43cb5a38fefd";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      const apiInfo = await axios.get(url);
      const apiInfo5Days = await axios.get(url5Days);

      setWeather(apiInfo.data);
      setWeather5Days(apiInfo5Days.data);
      setError("");
    } catch (err) {
      setError("Cidade não encontrada. Tente novamente.");
      setWeather(null);
      setWeather5Days(null);
    }
  }

  return (
    <div className="container">
      <h1>Weather Hub</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Digite o nome para a cidade"
      />
      <button onClick={searchCity}>Buscar</button>
      {weather && <WeatherInformations weather={weather} />}
      {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
      {error && <p className="error-message">{error}</p>} 
    </div>
  );
}

export default App;
