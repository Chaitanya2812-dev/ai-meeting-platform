import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const hideNavLinks = location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </div>
          <div>
            <Link to="/">
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                MeetingAI
              </h1>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Powered by Groq</p>
          </div>
        </div>

        {/* Navigation */}
        {!hideNavLinks && (
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
              Upload
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
              Dashboard
            </Link>
          </div>
        )}

        {/* Status / Auth */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 hidden sm:flex">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">System Online</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-700/50 transition-all text-lg"
            title="Toggle Theme"
          >
            {darkMode ? "Dark ⏾" : "☀︎ Light"}
          </button>

          {isAuthenticated && user && (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200 dark:border-slate-700/50">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Hi, {user.name?.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1.5 text-xs font-medium text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}