// WeatherCard.jsx
function WeatherCard({ data }) {
  // Weather icons mapping
  const weatherIcons = {
    "clear sky": "☀️",
    "few clouds": "🌤️",
    "scattered clouds": "⛅",
    "broken clouds": "☁️",
    "shower rain": "🌦️",
    "rain": "🌧️",
    "thunderstorm": "⛈️",
    "snow": "❄️",
    "mist": "🌫️",
    "partly cloudy": "🌤️",
    "overcast clouds": "☁️"
  };

  const getWeatherIcon = (description) => {
    return weatherIcons[description.toLowerCase()] || "🌤️";
  };

  const getTemperatureColor = (temp) => {
    if (temp < 0) return "text-cyan-600";
    if (temp < 10) return "text-sky-600";
    if (temp < 20) return "text-emerald-600";
    if (temp < 30) return "text-amber-600";
    return "text-rose-600";
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-lg rounded-3xl shadow-xl border border-blue-200/30 p-8 w-96 text-center mb-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-sky-300/20 to-blue-300/20 rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full translate-x-12 translate-y-12 animate-pulse delay-1000"></div>
      
      <div className="relative z-10">
        {/* Location */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-lg">📍</span>
          <h2 className="text-2xl font-bold text-slate-800 drop-shadow-sm">
            {data.name}, {data.sys.country}
          </h2>
        </div>

        {/* Weather Icon and Temperature */}
        <div className="flex flex-col items-center mb-6">
          <div className="text-6xl mb-4 animate-bounce">
            {getWeatherIcon(data.weather[0].description)}
          </div>
          <p className={`text-5xl font-bold mb-2 drop-shadow-sm ${getTemperatureColor(data.main.temp)}`}>
            {Math.round(data.main.temp)}°C
          </p>
          <p className="text-lg capitalize text-slate-700 font-medium tracking-wide">
            {data.weather[0].description}
          </p>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-blue-200/40 shadow-sm">
            <p className="text-slate-600 text-xs uppercase tracking-wider font-medium">Feels Like</p>
            <p className="text-slate-800 font-bold text-lg">{Math.round(data.main.feels_like)}°C</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-blue-200/40 shadow-sm">
            <p className="text-slate-600 text-xs uppercase tracking-wider font-medium">Humidity</p>
            <p className="text-slate-800 font-bold text-lg">{data.main.humidity}%</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-blue-200/40 shadow-sm">
            <p className="text-slate-600 text-xs uppercase tracking-wider font-medium">Wind</p>
            <p className="text-slate-800 font-bold text-lg">{data.wind.speed} m/s</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-blue-200/40 shadow-sm">
            <p className="text-slate-600 text-xs uppercase tracking-wider font-medium">Pressure</p>
            <p className="text-slate-800 font-bold text-lg">{data.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;