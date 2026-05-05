import { useState, useRef } from "react";

export default function Upload({ onUpload, disabled }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    await onUpload(file);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="glass-card p-6 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" x2="12" y1="3" y2="15"/>
        </svg>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Upload Meeting</h2>
      </div>

      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "cursor-pointer"}
          ${dragActive && !disabled
            ? "border-indigo-400 bg-indigo-500/10"
            : file
              ? "border-emerald-500/50 bg-emerald-500/5"
              : "border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="audio/*,video/*,.mp3,.wav,.mp4,.webm,.m4a,.ogg"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload-input"
        />

        {file ? (
          <div className="animate-fade-in-up">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-500 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[250px] mx-auto">{file.name}</p>
            <p className="text-xs text-slate-500 mt-1">{formatSize(file.size)}</p>
          </div>
        ) : (
          <div>
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-500 dark:text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">Click to browse</span> or drag & drop
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">MP3, WAV, MP4, WebM, M4A, OGG</p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <button
        id="upload-button"
        onClick={handleUpload}
        disabled={!file || disabled}
        className="btn-primary w-full mt-4 py-3 text-sm"
      >
        {disabled ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Processing...
          </span>
        ) : (
          "Upload & Analyze"
        )}
      </button>
    </div>
  );
}
