import type { WeatherData } from "../types/weatherTypes";

interface Props {
  data: WeatherData;
}

export default function WeatherCard({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 text-center">
      <h2 className="text-2xl font-semibold mb-2">
        {data.name}, {data.sys.country}
      </h2>
      <p className="text-lg">{data.weather[0].description}</p>
      <p className="text-4xl font-bold mt-2">{Math.round(data.main.temp)}°C</p>
      <p className="text-sm text-gray-500 mt-1">
        Humidity: {data.main.humidity}%
      </p>
    </div>
  );
}
