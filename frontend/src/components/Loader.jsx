export default function Loader({ text = "Processing..." }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "var(--accent-light)", border: "1px solid var(--accent)", borderRadius: 10 }}>
      <div style={{ width: 16, height: 16, border: "2px solid var(--accent-light)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
      <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--accent)", fontFamily: "var(--font-body)" }}>{text}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
