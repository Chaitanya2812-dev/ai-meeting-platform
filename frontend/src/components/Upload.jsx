import { useState, useRef } from "react";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "mr", label: "Marathi" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
  { value: "zh", label: "Chinese" },
];

export default function Upload({ onUpload, disabled }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [language, setLanguage] = useState("en");
  const inputRef = useRef(null);

  const handleFileChange = (e) => { if (e.target.files[0]) setFile(e.target.files[0]); };

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => { if (!file) return; await onUpload(file, language); };

  const formatSize = (b) => b < 1048576 ? (b / 1024).toFixed(1) + " KB" : (b / 1048576).toFixed(1) + " MB";

  return (
    <div className="card anim-up" style={{ padding: "20px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <svg style={{ width: 16, height: 16, color: "var(--accent)", flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" x2="12" y1="3" y2="15"/>
        </svg>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--text-primary)" }}>
          Upload Meeting
        </span>
      </div>

      {/* Language */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "var(--text-muted)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Language
        </label>
        <select value={language} onChange={e => setLanguage(e.target.value)} disabled={disabled}
          style={{ width: "100%", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", fontSize: "0.8125rem", color: "var(--text-primary)", fontFamily: "var(--font-body)", outline: "none", cursor: "pointer" }}>
          {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
        </select>
      </div>

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragActive ? "var(--accent)" : file ? "var(--success)" : "var(--border-strong)"}`,
          borderRadius: 12,
          padding: "28px 20px",
          textAlign: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          background: dragActive ? "var(--accent-light)" : file ? "var(--success-light)" : "var(--bg-subtle)",
          transition: "all 0.15s ease",
        }}>
        <input ref={inputRef} type="file" accept="audio/*,video/*,.mp3,.wav,.mp4,.webm,.m4a,.ogg"
          onChange={handleFileChange} style={{ display: "none" }} />

        {file ? (
          <div>
            <div style={{ width: 36, height: 36, background: "var(--success-light)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
              <svg style={{ width: 18, height: 18, color: "var(--success)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{file.name}</p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{formatSize(file.size)}</p>
          </div>
        ) : (
          <div>
            <div style={{ width: 36, height: 36, background: "var(--border)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
              <svg style={{ width: 18, height: 18, color: "var(--text-muted)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--accent)", fontWeight: 600 }}>Click to browse</span> or drag & drop
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 3 }}>MP3, WAV, MP4, WebM, M4A, OGG</p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <button onClick={handleUpload} disabled={!file || disabled} className="btn btn-primary"
        style={{ width: "100%", marginTop: 12, height: 40, fontSize: "0.875rem" }}>
        {disabled ? (
          <><span className="spinner" /> Processing...</>
        ) : "Upload & Analyze"}
      </button>
    </div>
  );
}
