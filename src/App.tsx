import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LocalWeather from "./pages/LocalWeather";
import SearchWeather from "./pages/SearchWeather";
import History from "./pages/History";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-sky-300 to-indigo-400 flex flex-col items-center">
      <Router>
        <nav className="mt-6 mb-8 flex gap-8 text-white text-lg font-semibold bg-white/20 backdrop-blur-md px-8 py-3 rounded-full shadow-md">
          <Link to="/" className="hover:text-yellow-300 transition">Local</Link>
          <Link to="/search" className="hover:text-yellow-300 transition">Search</Link>
          <Link to="/history" className="hover:text-yellow-300 transition">History</Link>
        </nav>

        <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg w-full max-w-lg mb-8">
          <Routes>
            <Route path="/" element={<LocalWeather />} />
            <Route path="/search" element={<SearchWeather />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}


export default App;
