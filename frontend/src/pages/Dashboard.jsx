import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import summaryService from "../services/summaryService";
import exportService from "../services/exportService";
import Toast from "../components/Toast";

export default function Dashboard() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    summaryService.getAllMeetings()
      .then(data => setMeetings(data || []))
      .catch(() => setToast({ message: "Failed to load meetings", type: "error" }))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleExport = async (id) => {
    try { await exportService.exportMarkdown(id); showToast("Export ready"); }
    catch { showToast("Export failed", "error"); }
  };

  const filtered = useMemo(() =>
    meetings.filter(m => m.title?.toLowerCase().includes(search.toLowerCase())),
    [meetings, search]
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
              Past Meetings
            </h1>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              {meetings.length} meeting{meetings.length !== 1 ? "s" : ""} recorded
            </p>
          </div>

          {/* Search */}
          <div style={{ position: "relative", width: 260, flexShrink: 0 }}>
            <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "var(--text-muted)", pointerEvents: "none" }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input className="input" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search meetings..."
              style={{ paddingLeft: 32, height: 36, fontSize: "0.8125rem" }} />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
            <div style={{ width: 28, height: 28, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : filtered.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
            {filtered.map((m, i) => (
              <div key={m._id} className="card anim-up"
                style={{ padding: "18px", display: "flex", flexDirection: "column", gap: 12, animationDelay: `${i * 0.04}s` }}>

                {/* Title + date */}
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--text-primary)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {m.title || "Untitled Meeting"}
                  </h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                    <svg style={{ width: 11, height: 11 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {new Date(m.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>

                {/* Stats */}
                <div style={{ display: "flex", gap: 8 }}>
                  {[{ label: "Tasks", count: m.tasks?.length || 0, color: "var(--accent)" }, { label: "Decisions", count: m.decisions?.length || 0, color: "var(--success)" }].map(stat => (
                    <div key={stat.label} style={{ flex: 1, background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 800, color: stat.color }}>{stat.count}</p>
                      <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 8, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                  <Link to={`/?id=${m._id}`}
                    style={{ flex: 1, height: 34, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--accent-light)", color: "var(--accent)", borderRadius: 8, fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", border: "1px solid var(--accent)", transition: "all 0.15s ease" }}>
                    View
                  </Link>
                  <button onClick={() => handleExport(m._id)}
                    style={{ height: 34, padding: "0 12px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s ease", fontFamily: "var(--font-body)" }}>
                    <svg style={{ width: 13, height: 13 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    MD
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: "48px 24px", textAlign: "center" }}>
            <div style={{ width: 44, height: 44, background: "var(--bg-subtle)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <svg style={{ width: 20, height: 20, color: "var(--text-muted)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: 6 }}>
              {search ? "No results found" : "No meetings yet"}
            </p>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: 18 }}>
              {search ? "Try different search terms" : "Upload your first meeting to get started"}
            </p>
            {!search && (
              <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", background: "var(--accent)", color: "#fff", borderRadius: 8, fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none" }}>
                Upload Meeting
              </Link>
            )}
          </div>
        )}
      </main>

      {toast && (
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 50 }}>
          <Toast message={toast.message} type={toast.type} />
        </div>
      )}
    </div>
  );
}
