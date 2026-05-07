import { useEffect, useState } from "react";

export default function Toast({ message, type = "success", duration = 3500, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); if (onClose) setTimeout(onClose, 300); }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  const styles = {
    success: { bg: "var(--success-light)", border: "var(--success)", color: "var(--success)" },
    error:   { bg: "var(--error-light)",   border: "var(--error)",   color: "var(--error)"   },
    info:    { bg: "var(--accent-light)",  border: "var(--accent)",  color: "var(--accent)"  },
  };

  const icons = { success: "✓", error: "✕", info: "ℹ" };
  const s = styles[type] || styles.info;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 16px",
      background: s.bg,
      border: `1px solid ${s.border}`,
      borderRadius: 10,
      fontSize: "0.8125rem",
      fontWeight: 500,
      color: s.color,
      fontFamily: "var(--font-body)",
      boxShadow: "var(--shadow-md)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(6px)",
      transition: "opacity 0.25s ease, transform 0.25s ease",
      minWidth: 200,
    }}>
      <span style={{ width: 18, height: 18, borderRadius: "50%", background: s.border, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, flexShrink: 0 }}>
        {icons[type]}
      </span>
      {message}
    </div>
  );
}
