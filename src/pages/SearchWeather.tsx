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
      if (data.cod && data.cod !== 200) {
        setError(data.message || "City not found");
        setWeather(null);
        return;
      }
      setWeather(data);
      setError("");
      saveToHistory(city);
    } catch {
      setError("Network error");
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
    <div className="flex flex-col items-center text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-white drop-shadow-md">
        Search Weather 🔍
      </h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="mt-4 w-full max-w-md">
          <WeatherCard data={weather} />
        </div>
      )}
    </div>
  );
}
