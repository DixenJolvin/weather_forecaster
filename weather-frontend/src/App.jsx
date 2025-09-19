// App.jsx
import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import HistoryList from "./components/HistoryList";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    try {
      // Fetch weather from backend
      const res = await axios.get(`http://localhost:5000/api/weather/${city}`);
      setWeather(res.data);

      // Fetch last 5 searches
      const historyRes = await axios.get("http://localhost:5000/api/history");
      setHistory(historyRes.data);
    } catch (err) {
      alert("City not found!");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-sky-200/30 to-blue-300/30 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-200/30 to-teal-300/30 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-rose-200/30 to-pink-300/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 drop-shadow-sm animate-pulse">
            🌤️ Weather Forecast
          </h1>
          <p className="text-slate-700 text-lg font-medium">Get real-time weather information for any city</p>
        </div>

        {/* Search Input */}
        <div className="flex gap-3 mb-8 w-full max-w-md">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-6 py-4 rounded-2xl bg-white/80 backdrop-blur-lg border border-slate-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-slate-800 placeholder-slate-500 text-lg transition-all duration-300 hover:bg-white/90 shadow-lg"
              disabled={loading}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <span className="text-slate-500">🔍</span>
            </div>
          </div>
          <button
            onClick={getWeather}
            disabled={loading || !city.trim()}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl shadow-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              "Get Weather"
            )}
          </button>
        </div>

        {/* Weather Card and History */}
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          {weather && <WeatherCard data={weather} />}
          {history.length > 0 && <HistoryList history={history} />}
        </div>

        {/* Empty State */}
        {!weather && !loading && (
          <div className="text-center mt-12">
            <div className="text-6xl mb-4 opacity-60">🌍</div>
            <p className="text-slate-600 text-lg font-medium">Enter a city name to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;