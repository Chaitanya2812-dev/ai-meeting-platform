export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      background: "var(--surface)",
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12,
    }}>
      {/* Left — branding */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 22, height: 22, background: "var(--accent)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
          </svg>
        </div>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
          MeetingAI · Powered by Groq
        </span>
      </div>

      {/* Right — LinkedIn links */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Built by</span>
        <a
          href="https://www.linkedin.com/in/chaitanya-naik-82b44a2b8"
          target="_blank"
          rel="noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.78rem", fontWeight: 600, padding: "3px 8px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--bg-subtle)", transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#0077b5"; e.currentTarget.style.borderColor = "#0077b5"; e.currentTarget.style.background = "rgba(0,119,181,0.06)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-subtle)"; }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          Chaitanya
        </a>
        <span style={{ color: "var(--border-strong)", fontSize: "0.75rem" }}>·</span>
        <a
          href="https://www.linkedin.com/in/kalesujit/"
          target="_blank"
          rel="noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.78rem", fontWeight: 600, padding: "3px 8px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--bg-subtle)", transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#0077b5"; e.currentTarget.style.borderColor = "#0077b5"; e.currentTarget.style.background = "rgba(0,119,181,0.06)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-subtle)"; }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          Sujit
        </a>
      </div>
    </footer>
  );
}
