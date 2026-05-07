import { useState, useRef, useEffect } from "react";

export default function Chatbot({ onAsk }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setMessages(p => [...p, { role: "user", text: q }]);
    setInput("");
    if (textareaRef.current) { textareaRef.current.style.height = "36px"; }
    setLoading(true);
    try {
      const answer = await onAsk(q);
      setMessages(p => [...p, { role: "bot", text: answer }]);
    } catch {
      setMessages(p => [...p, { role: "bot", text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const onKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 12, borderBottom: "1px solid var(--border)", marginBottom: 12 }}>
        <div style={{ width: 28, height: 28, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg style={{ width: 14, height: 14, color: "#fff" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.875rem", color: "var(--text-primary)" }}>
          Ask about this meeting
        </span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingRight: 2 }}>
        {messages.length === 0 && (
          <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>No messages yet</p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", background: "var(--bg-subtle)", padding: "4px 10px", borderRadius: 99, border: "1px solid var(--border)" }}>
              Try: "What decisions were made?"
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "82%",
              padding: "9px 13px",
              borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
              background: m.role === "user" ? "var(--accent)" : "var(--surface-raised)",
              border: m.role === "user" ? "none" : "1px solid var(--border)",
              fontSize: "0.8125rem",
              color: m.role === "user" ? "#fff" : "var(--text-primary)",
              lineHeight: 1.6,
              boxShadow: "var(--shadow-sm)",
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "10px 14px", background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: "12px 12px 12px 3px", display: "flex", gap: 4 }}>
              {[0, 150, 300].map(d => (
                <span key={d} style={{ width: 7, height: 7, background: "var(--accent)", borderRadius: "50%", display: "inline-block", animation: "bounce 1.2s infinite ease-in-out", animationDelay: d + "ms" }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 12, padding: "8px 12px", transition: "border-color 0.15s ease" }}
          onFocus={e => e.currentTarget.style.borderColor = "var(--accent)"}
          onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}>
          <textarea ref={textareaRef} value={input}
            onChange={e => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
            onKeyDown={onKey} placeholder="Ask about the meeting..." disabled={loading} rows={1}
            style={{ flex: 1, background: "none", border: "none", outline: "none", resize: "none", fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--text-primary)", minHeight: 36, maxHeight: 120, lineHeight: 1.5, paddingTop: 6 }} />
          <button onClick={handleSend} disabled={!input.trim() || loading}
            style={{ width: 32, height: 32, flexShrink: 0, borderRadius: 8, background: !input.trim() || loading ? "var(--border)" : "var(--accent)", border: "none", cursor: !input.trim() || loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s ease" }}>
            <svg style={{ width: 14, height: 14, color: !input.trim() || loading ? "var(--text-muted)" : "#fff" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 5, textAlign: "center" }}>Shift+Enter for new line</p>
      </div>

      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }`}</style>
    </div>
  );
}
