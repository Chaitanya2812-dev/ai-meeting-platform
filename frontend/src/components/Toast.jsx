import { useEffect, useState } from "react";

export default function Toast({ message, type = "success", duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: "from-emerald-600 to-emerald-500 shadow-emerald-500/25",
    error: "from-red-600 to-red-500 shadow-red-500/25",
    info: "from-indigo-600 to-indigo-500 shadow-indigo-500/25",
  };

  const icons = { success: "✓", error: "✕", info: "ℹ" };

  return (
    <div className={`px-4 py-3 rounded-xl bg-gradient-to-r ${colors[type]} text-white text-sm font-medium shadow-lg flex items-center gap-2 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">{icons[type]}</span>
      {message}
    </div>
  );
}