import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import summaryService from "../services/summaryService";
import exportService from "../services/exportService";
import Toast from "../components/Toast";

function EditableTitle({ id, initialTitle, onRenamed,onError }) {
  const [editing, setEditing] = useState(false);
const [value, setValue] = useState(initialTitle);
const [saving, setSaving] = useState(false);
const inputRef = useRef(null);

// Sync value when parent prop updates (e.g. after rename)
useEffect(() => { setValue(initialTitle); }, [initialTitle]);

useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);
  const save = async () => {
    const trimmed = value.trim();
    if (!trimmed || trimmed === initialTitle) { setValue(initialTitle); setEditing(false); return; }
    setSaving(true);
    try {
      await summaryService.renameMeeting(id, trimmed);
      onRenamed(id, trimmed);
    } catch (err) {
      setValue(initialTitle);
      onError?.(err?.response?.data?.error || "Failed to rename meeting");
    }
    setSaving(false);
    setEditing(false);
  };
  const onKey = (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") { setValue(initialTitle); setEditing(false); }
  };

  if (editing) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <input ref={inputRef} value={value} onChange={e => setValue(e.target.value)}
          onBlur={save} onKeyDown={onKey} disabled={saving}
          style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9375rem",
            color: "var(--text-primary)", background: "var(--bg-subtle)",
            border: "1.5px solid var(--accent)", borderRadius: 6, padding: "3px 8px", outline: "none" }} />
        {saving && <div style={{ width: 14, height: 14, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--text-primary)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
        {value || "Untitled Meeting"}
      </h3>
      <button onClick={() => setEditing(true)} title="Rename"
        style={{ flexShrink: 0, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", borderRadius: 5, opacity: 0.45, transition: "opacity 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.opacity = 1}
        onMouseLeave={e => e.currentTarget.style.opacity = 0.45}>
        <svg style={{ width: 13, height: 13, color: "var(--text-muted)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      </button>
    </div>
  );
}

function DeleteButton({ id, onDeleted,onError }) {
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
  setDeleting(true);
  console.log("Deleting meeting id:", id); // ← add this
  try {
    await summaryService.deleteMeeting(id);
    onDeleted(id);
  } catch (err) {
    setDeleting(false);
    setConfirm(false);
    onError?.(err?.response?.data?.error || "Failed to delete meeting");
  }
};

  if (confirm) {
    return (
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: "0.72rem", color: "var(--error, #dc2626)", fontWeight: 500 }}>Delete?</span>
        <button onClick={handleDelete} disabled={deleting}
          style={{ height: 28, padding: "0 10px", background: "var(--error, #dc2626)", color: "#fff", border: "none", borderRadius: 6, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 4 }}>
          {deleting ? <div style={{ width: 11, height: 11, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> : "Yes"}
        </button>
        <button onClick={() => setConfirm(false)}
          style={{ height: 28, padding: "0 10px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6, fontSize: "0.75rem", fontWeight: 500, color: "var(--text-secondary)", cursor: "pointer", fontFamily: "var(--font-body)" }}>
          No
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirm(true)} title="Delete meeting"
      style={{ height: 34, width: 34, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", transition: "all 0.15s ease", flexShrink: 0 }}
      onMouseEnter={e => { e.currentTarget.style.background = "var(--error-light, #fef2f2)"; e.currentTarget.style.borderColor = "var(--error, #dc2626)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
      <svg style={{ width: 14, height: 14, color: "var(--error, #dc2626)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
        <path d="M10 11v6"/><path d="M14 11v6"/>
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
      </svg>
    </button>
  );
}

export default function Dashboard() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    summaryService.getAllMeetings()
      .then(data => setMeetings(data || []))
      .catch(() => showToast("Failed to load meetings", "error"))
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

  const handleRenamed = (id, newTitle) => {
    setMeetings(prev => prev.map(m => m._id === id ? { ...m, title: newTitle } : m));
    showToast("Meeting renamed");
  };

  const handleDeleted = (id) => {
    setMeetings(prev => prev.filter(m => m._id !== id));
    showToast("Meeting deleted");
  };

  const filtered = useMemo(() =>
    meetings.filter(m => m.title?.toLowerCase().includes(search.toLowerCase())),
    [meetings, search]
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: 1100, margin: "0 auto", padding: "28px 20px", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
              Past Meetings
            </h1>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              {meetings.length} meeting{meetings.length !== 1 ? "s" : ""} recorded
            </p>
          </div>
          <div style={{ position: "relative", width: 260, flexShrink: 0 }}>
            <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "var(--text-muted)", pointerEvents: "none" }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input className="input" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search meetings..." style={{ paddingLeft: 32, height: 36, fontSize: "0.8125rem" }} />
          </div>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
            <div style={{ width: 28, height: 28, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
          </div>
        ) : filtered.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
            {filtered.map((m, i) => (
              <div key={m._id} className="card anim-up"
                style={{ padding: "18px", display: "flex", flexDirection: "column", gap: 12, animationDelay: `${i * 0.04}s` }}>

                <div>
                  <EditableTitle id={m._id} initialTitle={m.title || "Untitled Meeting"} onRenamed={handleRenamed} onError={(msg) => showToast(msg, "error")} />
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                    <svg style={{ width: 11, height: 11 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {new Date(m.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { label: "Tasks",     count: m.tasks?.length     || 0, color: "var(--accent)"  },
                    { label: "Decisions", count: m.decisions?.length || 0, color: "var(--success)" },
                  ].map(stat => (
                    <div key={stat.label} style={{ flex: 1, background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 800, color: stat.color }}>{stat.count}</p>
                      <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8, paddingTop: 10, borderTop: "1px solid var(--border)", alignItems: "center" }}>
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
<DeleteButton id={m._id} onDeleted={handleDeleted} onError={(msg) => showToast(msg, "error")} />
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

      <Footer />

      {toast && (
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 50 }}>
          <Toast message={toast.message} type={toast.type} />
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
