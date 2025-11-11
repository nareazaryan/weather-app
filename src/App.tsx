import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LocalWeather from "./pages/LocalWeather";
import SearchWeather from "./pages/SearchWeather";
import History from "./pages/History";
import "./index.css";

function App() {
  return (
    <Router>
      <nav className="flex justify-center gap-6 p-4 bg-blue-600 text-white font-semibold text-lg shadow-md">
        <Link to="/">Local</Link>
        <Link to="/search">Search</Link>
        <Link to="/history">History</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LocalWeather />} />
        <Route path="/search" element={<SearchWeather />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
