import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(saved);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  return (
    <div className="flex flex-col items-center text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-white drop-shadow-md">
        Search History 📜
      </h1>
      {history.length === 0 ? (
        <p className="text-gray-100">No previous searches yet.</p>
      ) : (
        <ul className="list-disc text-gray-800 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md w-full max-w-md">
          {history.map((city) => (
            <li key={city}>{city}</li>
          ))}
        </ul>
      )}
      {history.length > 0 && (
        <button
          onClick={clearHistory}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition"
        >
          Clear History
        </button>
      )}
    </div>
  );
}
