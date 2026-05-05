export default function Export({ onExport }) {
  const handleAction = (type) => {
    onExport(type);
  };

  const actions = [
    { type: "markdown", label: "Markdown", icon: "📄", color: "from-slate-600 to-slate-500" },
  ];

  return (
    <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Export Results</h3>
      <div className="flex gap-2 flex-wrap mb-3">
        {actions.map((a) => (
          <button key={a.type} onClick={() => handleAction(a.type)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r ${a.color} text-white text-xs font-medium hover:scale-105 transition-transform shadow-lg`}>
            <span>{a.icon}</span> {a.label}
          </button>
        ))}
      </div>
      
    </div>
  );
}
