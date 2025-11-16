import React, { useState } from "react";
import axios from "axios";
import SevenDayForecast from "../components/SevenDayForecast";
import type { DailyForecast } from "../components/SevenDayForecast";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// ⭐ Convert 3-hour forecast → daily cards ⭐
function buildDailyFromThreeHourList(list: any[]): DailyForecast[] {
  const byDate: Record<string, any[]> = {};

  list.forEach((item) => {
    const dateStr = new Date(item.dt * 1000).toISOString().split("T")[0];
    if (!byDate[dateStr]) byDate[dateStr] = [];
    byDate[dateStr].push(item);
  });

  return Object.keys(byDate)
    .slice(0, 5) // 5 days from API
    .map((date) => {
      const items = byDate[date];

      let chosen =
        items.find((i) => new Date(i.dt * 1000).getHours() === 12) ||
        items[Math.floor(items.length / 2)];

      return {
        date,
        temp: chosen.main.temp,
        icon: chosen.weather[0].icon,
        description: chosen.weather[0].description,
      };
    });
}

const SearchWeather: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [daily, setDaily] = useState<DailyForecast[]>([]);
  const [error, setError] = useState("");

  const searchCity = async () => {
    if (!city.trim()) return;

    try {
      setError("");
      setWeather(null);
      setDaily([]);

      // Current weather
      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(currentRes.data);

      // 5-day / 3-hour forecast
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      const dailyData = buildDailyFromThreeHourList(forecastRes.data.list);
      setDaily(dailyData);
    } catch (err) {
      console.error(err);
      setError("City not found or API error.");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Search Weather</h1>

      {/* search box */}
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20
                     backdrop-blur-md w-64 outline-none placeholder:text-white/60"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={searchCity}
          className="px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600
                     font-medium shadow-md"
        >
          Search
        </button>
      </div>
      <br />

      {error && <p className="text-red-300 mb-4">{error}</p>}

      {/* current weather card */}
      {weather && (
          <div
          className="mt-12 rounded-3xl bg-gradient-to-br from-indigo-500/80 to-slate-900/90
                border border-white/20 shadow-xl p-6 max-w-md"
          >
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-xl font-semibold">{weather.name}</h2>
              <p className="text-sm text-white/70">
                {weather.sys?.country}
              </p>
            </div>

            <img
              className="w-16 h-16"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <p className="text-4xl font-bold">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="capitalize text-white/80">
              {weather.weather[0].description}
            </p>
          </div>

          <div className="flex gap-6 text-sm text-white/80 mt-3">
            <p>💧 {weather.main.humidity}%</p>
            <p>🌬 {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}

      {/* daily cards */}
      {daily.length > 0 && <SevenDayForecast days={daily} />}
    </div>
  );
};

export default SearchWeather;
