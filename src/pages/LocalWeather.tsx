import { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import { fetchWeather } from "../api/weatherApi";
import type { WeatherData } from "../types/weatherTypes";

export default function LocalWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
      },
      () => setError("Unable to get location")
    );
  }, []);

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Local Weather 🌤️</h1>
      {error && <p className="text-red-500">{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}
