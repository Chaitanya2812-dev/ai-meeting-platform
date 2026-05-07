import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const hideNavLinks = location.pathname === "/login" || location.pathname === "/register";

  return (
    <header style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div style={{ background: "var(--accent)" }}
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
            MeetingAI
          </span>
        </Link>

        {/* Center Nav */}
        {!hideNavLinks && (
          <nav className="hidden md:flex items-center gap-1">
            {[{ to: "/", label: "Upload" }, { to: "/dashboard", label: "Dashboard" }].map(({ to, label }) => (
              <Link key={to} to={to}
                style={{
                  color: location.pathname === to ? "var(--accent)" : "var(--text-secondary)",
                  background: location.pathname === to ? "var(--accent-light)" : "transparent",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  padding: "5px 12px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={e => { if (location.pathname !== to) e.currentTarget.style.background = "var(--bg-subtle)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseLeave={e => { if (location.pathname !== to) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; } }}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Online dot */}
          <div className="hidden sm:flex items-center gap-1.5 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" style={{ boxShadow: "0 0 0 2px rgba(34,197,94,0.25)" }}></span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>Online</span>
          </div>

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="btn btn-ghost"
            style={{ padding: "5px 10px", fontSize: "0.75rem", fontWeight: 500, color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
            {darkMode ? (
              <><svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>Light</>
            ) : (
              <><svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>Dark</>
            )}
          </button>

          {isAuthenticated && user && (
            <div className="flex items-center gap-2 pl-3" style={{ borderLeft: "1px solid var(--border)" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--accent)", fontFamily: "var(--font-display)" }}>
                  {user.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text-secondary)" }} className="hidden sm:block">
                {user.name?.split(" ")[0]}
              </span>
              <button onClick={logout} className="btn btn-ghost"
                style={{ padding: "4px 10px", fontSize: "0.75rem", color: "var(--error)", border: "1px solid var(--border)" }}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
