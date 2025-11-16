import type { WeatherData } from "../types/weatherTypes";

interface Props {
  data: WeatherData;
}

export default function WeatherCard({ data }: Props) {
  const description = data.weather?.[0]?.description ?? "No description";

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6 text-center w-full max-w-md mx-auto border border-white/40">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        {data.name}, {data.sys?.country}
      </h2>
      <p className="text-lg text-gray-500 capitalize">{description}</p>

      <div className="mt-4">
        <p className="text-6xl font-extrabold text-blue-700 drop-shadow-sm">
          {Math.round(data.main.temp)}°C
        </p>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm text-gray-800">
        {/* <span>💧 Humidity: {data.main.humidity}% </span> 
        <span>🌬️ Pressure: {data.main.pressure} hPa</span> */}
        <span style={{ display: "block" }}>💧 Humidity: {data.main.humidity}%</span>
        <span style={{ display: "block" }}>🌬️ Pressure: {data.main.pressure} hPa</span>
      </div>
    </div>
  );
}
