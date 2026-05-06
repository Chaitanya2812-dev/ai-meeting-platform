import { useState } from "react";

export default function Export({ onExport }) {
  const [email, setEmail] = useState('');

  const handleAction = (type) => {
    onExport(type);
  };

  const actions = [
    { type: "markdown", label: "Markdown", icon: "📄", color: "from-slate-600 to-slate-500" },
  ];

  return (
    <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Export Results</h3>
      <div className="flex gap-2 flex-wrap mb-4">
        {actions.map((a) => (
          <button key={a.type} onClick={() => handleAction(a.type)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r ${a.color} text-white text-xs font-medium hover:scale-105 transition-transform shadow-lg`}>
            <span>{a.icon}</span> {a.label}
          </button>
        ))}
      </div>
      
      <div className="flex gap-2 items-center border-t border-slate-200 dark:border-slate-700/50 pt-4">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address" 
          className="flex-1 bg-white/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors" 
        />
        <button 
          onClick={() => onExport('email', email)}
          disabled={!email}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          <span>✉️</span> Send
        </button>
      </div>
    </div>
  );
}
