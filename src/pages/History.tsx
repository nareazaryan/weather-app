import { useState, useEffect } from "react";

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
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Search History 📜</h1>
      {history.length === 0 ? (
        <p>No previous searches yet.</p>
      ) : (
        <ul className="list-disc">
          {history.map((city) => (
            <li key={city}>{city}</li>
          ))}
        </ul>
      )}
      {history.length > 0 && (
        <button
          onClick={clearHistory}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Clear History
        </button>
      )}
    </div>
  );
}
