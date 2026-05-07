import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Upload from "../components/Upload";
import Summary from "../components/Summary";
import Chatbot from "../components/Chatbot";
import Export from "../components/Export";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import fileService from "../services/fileService";
import chatService from "../services/chatService";
import exportService from "../services/exportService";
import summaryService from "../services/summaryService";

export default function Home() {
  const [toast, setToast] = useState(null);
  const [searchParams] = useSearchParams();
  const existingMeetingId = searchParams.get("id");

  const [meeting, setMeeting] = useState({ id: null, status: "idle", transcript: "", summary: "", decisions: [], tasks: [] });

  useEffect(() => { if (existingMeetingId) loadMeeting(existingMeetingId); }, [existingMeetingId]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadMeeting = async (id) => {
    try {
      setMeeting(p => ({ ...p, status: "loading" }));
      const data = await summaryService.getMeeting(id);
      setMeeting({ id: data._id, status: "ready", transcript: data.transcript, summary: data.summary, decisions: data.decisions || [], tasks: data.tasks || [] });
    } catch {
      setMeeting(p => ({ ...p, status: "error" }));
      showToast("Failed to load meeting", "error");
    }
  };

  const handleUpload = async (file, language) => {
    try {
      setMeeting(p => ({ ...p, status: "uploading" }));
      const data = await fileService.upload(file, "My Meeting", language);
      setMeeting({ id: data.meetingId, status: "ready", transcript: data.transcript, summary: data.summary, decisions: data.decisions || [], tasks: data.tasks || [] });
      showToast("Meeting analyzed successfully!");
    } catch (err) {
      setMeeting(p => ({ ...p, status: "error" }));
      showToast(err?.response?.data?.error || "Upload failed", "error");
    }
  };

  const handleAsk = async (q) => {
    if (!meeting.id) return "No meeting loaded.";
    return await chatService.ask(meeting.id, q);
  };

  const handleExport = async (type, emailAddress) => {
    try {
      if (type === "markdown") await exportService.exportMarkdown(meeting.id);
      else if (type === "email") await exportService.exportEmail(meeting.id, emailAddress);
      showToast(type === "email" ? "Email sent!" : "Export ready");
    } catch {
      showToast("Export failed", "error");
    }
  };

  const isProcessing = meeting.status === "uploading" || meeting.status === "loading";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 20px", display: "grid", gridTemplateColumns: "1fr", gap: 16 }}
        className="lg:grid-cols-5-auto">

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,3fr)", gap: 16, alignItems: "start" }}
          className="home-grid">

          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Upload onUpload={handleUpload} disabled={isProcessing} />
            {meeting.status === "uploading" && <Loader text="Uploading & analyzing with Groq AI..." />}
            {meeting.status === "loading"   && <Loader text="Loading meeting..." />}
            {meeting.status === "error" && (
              <div style={{ background: "var(--error-light)", border: "1px solid var(--error)", borderRadius: 10, padding: "12px 16px", fontSize: "0.8125rem", color: "var(--error)" }}>
                Something went wrong. Please try again.
              </div>
            )}
            {meeting.status === "ready" && (
              <Summary transcript={meeting.transcript} summary={meeting.summary} decisions={meeting.decisions} tasks={meeting.tasks} />
            )}
            {meeting.id && meeting.status === "ready" && <Export onExport={handleExport} />}
          </div>

          {/* Right — Chatbot */}
          <div className="card" style={{ height: "calc(100vh - 100px)", minHeight: 480, padding: "18px", display: "flex", flexDirection: "column", position: "sticky", top: 74 }}>
            {meeting.id ? (
              <Chatbot onAsk={handleAsk} />
            ) : (
              <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 12 }}>
                <div style={{ width: 56, height: 56, background: "var(--accent-light)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg style={{ width: 26, height: 26, color: "var(--accent)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" x2="12" y1="19" y2="22"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: 4 }}>
                    Upload a meeting to start
                  </p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", maxWidth: 260, lineHeight: 1.55 }}>
                    AI will transcribe, summarize, and extract action items automatically.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {toast && (
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 50 }}>
          <Toast message={toast.message} type={toast.type} />
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .home-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
