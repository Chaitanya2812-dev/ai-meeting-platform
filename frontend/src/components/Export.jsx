import { useState } from "react";

export default function Export({ onExport }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleEmail = async () => {
    if (!email) return;
    setSending(true);
    await onExport("email", email);
    setSending(false);
  };

  return (
    <div className="card anim-up" style={{ padding: "16px 20px", animationDelay: "0.16s" }}>
      <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
        Export Results
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Markdown */}
        <button onClick={() => onExport("markdown")} className="btn btn-secondary"
          style={{ justifyContent: "flex-start", gap: 8, padding: "9px 14px", fontSize: "0.8125rem" }}>
          <svg style={{ width: 14, height: 14, color: "var(--text-muted)", flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          Download Markdown
        </button>

        {/* Email */}
        <div style={{ display: "flex", gap: 8 }}>
          <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Send to email..." style={{ flex: 1, height: 38, padding: "0 12px", fontSize: "0.8125rem" }} />
          <button onClick={handleEmail} disabled={!email || sending} className="btn btn-primary"
            style={{ height: 38, padding: "0 14px", fontSize: "0.8125rem", flexShrink: 0 }}>
            {sending ? <span className="spinner" /> : (
              <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
