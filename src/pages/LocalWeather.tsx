import { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import type { WeatherData } from "../types/weatherTypes";

export default function LocalWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );
          const data = await res.json();
          if (data.cod === 200) setWeather(data);
          else setError(data.message || "Failed to fetch weather");
        } catch {
          setError("Network error");
        }
      },
      () => setError("Unable to get your location 😢")
    );
  }, []);

  return (
    <div className="flex flex-col items-center text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-white drop-shadow-md">
        Local Weather 🌤️
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="mt-4 w-full max-w-md">
          <WeatherCard data={weather} />
        </div>
      )}
    </div>
  );
}
