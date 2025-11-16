import React from "react";

export type DailyForecast = {
  date: string;
  temp: number;
  icon: string;
  description: string;
};

type Props = {
  days: DailyForecast[];
};

const SevenDayForecast: React.FC<Props> = ({ days }) => {
  if (!days || days.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Daily Forecast
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {days.map((day) => {
          const d = new Date(day.date);
          const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
          const dayNum = d.getDate();

          return (
            <div
              key={day.date}
              className="min-w-[130px] rounded-2xl bg-gradient-to-b from-indigo-500/70 to-slate-900/80
                         border border-white/10 shadow-lg p-4 text-center text-white backdrop-blur-md"
            >
              <p className="font-semibold text-sm mb-1">
                {weekday} {dayNum}
              </p>

              <img
                className="w-14 h-14 mx-auto"
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
              />

              <p className="text-lg font-bold mt-1">
                {Math.round(day.temp)}°C
              </p>

              <p className="text-xs capitalize opacity-80 mt-1">
                {day.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SevenDayForecast;
