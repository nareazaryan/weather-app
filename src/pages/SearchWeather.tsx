import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { fetchWeather } from "../api/weatherApi";
import type { WeatherData } from "../types/weatherTypes";

export default function SearchWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (city: string) => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      setError("");
      saveToHistory(city);
    } catch {
      setError("City not found 😢");
    }
  };

  const saveToHistory = (city: string) => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    if (!history.includes(city)) {
      history.unshift(city);
      localStorage.setItem("history", JSON.stringify(history.slice(0, 10)));
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Search Weather 🔍</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500">{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}
