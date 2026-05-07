import { useState } from "react";

const TABS = [
  { id: "summary",   label: "Summary",      icon: "📝" },
  { id: "tasks",     label: "Action Items", icon: "✅" },
  { id: "decisions", label: "Decisions",    icon: "⚡" },
  { id: "transcript",label: "Transcript",   icon: "📄" },
];

export default function Summary({ transcript, summary, decisions, tasks }) {
  const [activeTab, setActiveTab] = useState("summary");
  const [expandedTranscript, setExpandedTranscript] = useState(false);

  const counts = { tasks: tasks?.length, decisions: decisions?.length };

  return (
    <div className="card anim-up" style={{ overflow: "hidden", animationDelay: "0.08s" }}>
      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", overflowX: "auto" }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "10px 14px",
              fontSize: "0.78rem", fontWeight: 500,
              color: activeTab === tab.id ? "var(--accent)" : "var(--text-muted)",
              borderBottom: `2px solid ${activeTab === tab.id ? "var(--accent)" : "transparent"}`,
              background: "none", border: "none",
              borderBottom: `2px solid ${activeTab === tab.id ? "var(--accent)" : "transparent"}`,
              cursor: "pointer", whiteSpace: "nowrap",
              fontFamily: "var(--font-body)",
              transition: "color 0.15s ease",
              marginBottom: -1,
            }}>
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {counts[tab.id] != null && (
              <span style={{
                fontSize: "0.65rem", fontWeight: 700, padding: "1px 6px", borderRadius: 99,
                background: activeTab === tab.id ? "var(--accent-light)" : "var(--bg-subtle)",
                color: activeTab === tab.id ? "var(--accent)" : "var(--text-muted)",
                border: `1px solid ${activeTab === tab.id ? "var(--accent)" : "var(--border)"}`,
              }}>
                {counts[tab.id]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "18px" }}>

        {activeTab === "summary" && (
          <div className="anim-in">
            <div style={{ background: "var(--accent-light)", border: "1px solid var(--accent)", borderRadius: 10, padding: "14px 16px", opacity: 0.9 }}>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-primary)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {summary || "No summary available."}
              </p>
            </div>
            {decisions?.length > 0 && (
              <div style={{ marginTop: 14 }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                  Key Decisions
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {decisions.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, marginTop: 6 }} />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="anim-in" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tasks?.length > 0 ? tasks.map((task, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#fff" }}>{i + 1}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.5 }}>{task.task}</p>
                  <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                    {task.assignee && (
                      <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 99, background: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--accent)", fontWeight: 500 }}>
                        👤 {task.assignee}
                      </span>
                    )}
                    {task.deadline && (
                      <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 99, background: "var(--warning-light, #fffbeb)", color: "var(--warning, #d97706)", border: "1px solid var(--warning, #d97706)", fontWeight: 500 }}>
                        ⏰ {task.deadline}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )) : (
              <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.8125rem", padding: "24px 0" }}>No action items found.</p>
            )}
          </div>
        )}

        {activeTab === "decisions" && (
          <div className="anim-in" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {decisions?.length > 0 ? decisions.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--warning, #d97706)", flexShrink: 0, marginTop: 5 }} />
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>{d}</p>
              </div>
            )) : (
              <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.8125rem", padding: "24px 0" }}>No decisions captured.</p>
            )}
          </div>
        )}

        {activeTab === "transcript" && (
          <div className="anim-in">
            <div style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px" }}>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.75, whiteSpace: "pre-wrap", maxHeight: expandedTranscript ? "none" : 200, overflow: "hidden", position: "relative" }}>
                {transcript || "No transcript available."}
              </p>
            </div>
            {transcript?.length > 500 && (
              <button onClick={() => setExpandedTranscript(!expandedTranscript)}
                style={{ marginTop: 8, fontSize: "0.75rem", fontWeight: 600, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)" }}>
                {expandedTranscript ? "Show less ↑" : "Show full transcript ↓"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
