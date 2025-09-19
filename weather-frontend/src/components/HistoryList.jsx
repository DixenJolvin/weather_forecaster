// HistoryList.jsx
function HistoryList({ history }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-slate-200/50 p-6 w-96 transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🕒</span>
        <h3 className="text-xl font-bold text-slate-800 drop-shadow-sm">Recent Searches</h3>
      </div>
      
      <div className="space-y-3">
        {history.map((item, index) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-slate-50/70 backdrop-blur-sm rounded-xl p-3 border border-slate-200/40 hover:bg-slate-100/70 transition-all duration-200 cursor-pointer group shadow-sm"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">🏙️</span>
              <span className="text-slate-800 font-medium group-hover:text-blue-600 transition-colors">
                {item.city}
              </span>
            </div>
            <span className="text-slate-500 text-xs">
              {new Date(item.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryList;