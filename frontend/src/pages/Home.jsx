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
  const [searchParams, setSearchParams] = useSearchParams();
  const existingMeetingId = searchParams.get("id");

  // Central meeting state
  const [meeting, setMeeting] = useState({
    id: null,
    status: "idle", // idle | uploading | ready | error
    transcript: "",
    summary: "",
    decisions: [],
    tasks: [],
  });

  // Load meeting if ID is in URL
  useEffect(() => {
    if (existingMeetingId) {
      loadMeeting(existingMeetingId);
    }
  }, [existingMeetingId]);

  const loadMeeting = async (id) => {
    try {
      setMeeting((p) => ({ ...p, status: "loading" }));
      const data = await summaryService.getMeeting(id);
      setMeeting({
        id: data._id,
        status: "ready",
        transcript: data.transcript,
        summary: data.summary,
        decisions: data.decisions || [],
        tasks: data.tasks || [],
      });
    } catch (err) {
      console.error(err);
      setMeeting((p) => ({ ...p, status: "error" }));
      setToast({ message: "Failed to load meeting", type: "error" });
      setTimeout(() => setToast(null), 4000);
    }
  };

  // Upload handler — backend does: upload -> FastAPI transcription -> Groq summary + tasks -> returns all data
  const handleUpload = async (file) => {
    try {
      setMeeting((p) => ({ ...p, status: "uploading" }));

      const data = await fileService.upload(file);
      // data = { success, meetingId, transcript, summary, decisions, tasks }

      setMeeting({
        id: data.meetingId,
        status: "ready",
        transcript: data.transcript,
        summary: data.summary,
        decisions: data.decisions || [],
        tasks: data.tasks || [],
      });

      setToast({ message: "Meeting analyzed successfully!", type: "success" });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error(err);
      setMeeting((p) => ({ ...p, status: "error" }));
      setToast({ message: err?.response?.data?.error || "Upload failed", type: "error" });
      setTimeout(() => setToast(null), 4000);
    }
  };

  // Chat handler
  const handleAsk = async (q) => {
    if (!meeting.id) return "No meeting loaded.";
    return await chatService.ask(meeting.id, q);
  };

  // Export handler
  const handleExport = async (type, emailAddress) => {
    try {
      if (type === "markdown") {
        await exportService.exportMarkdown(meeting.id);
        setToast({ message: `Markdown export started`, type: "success" });
      } else if (type === "email") {
        await exportService.exportEmail(meeting.id, emailAddress);
        setToast({ message: `Email sent successfully`, type: "success" });
      } else {
        // Fallback for Notion etc if implemented later
        if (exportService.exportData) {
          await exportService.exportData(meeting.id, type);
        }
      }
      setTimeout(() => setToast(null), 3000);
    } catch {
      setToast({ message: "Export failed", type: "error" });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const isProcessing = meeting.status === "uploading" || meeting.status === "loading";

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Panel: Upload + Summary + Export */}
        <div className="lg:col-span-2 space-y-5 overflow-y-auto h-auto lg:max-h-[85vh] pr-1 pb-6 lg:pb-0">
          <Upload onUpload={handleUpload} disabled={isProcessing} />

          {meeting.status === "uploading" && <Loader text="Uploading & analyzing with Groq AI..." />}
          {meeting.status === "loading" && <Loader text="Loading meeting details..." />}

          {meeting.status === "error" && (
            <div className="glass-card p-4 border-red-500/30 text-center">
              <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
            </div>
          )}

          {meeting.status === "ready" && (
            <Summary
              transcript={meeting.transcript}
              summary={meeting.summary}
              decisions={meeting.decisions}
              tasks={meeting.tasks}
            />
          )}

          {meeting.id && meeting.status === "ready" && <Export onExport={handleExport} />}
        </div>

        {/* Right Panel: Chatbot */}
        <div className="lg:col-span-3 h-[70vh] lg:h-[85vh] glass-card p-5 flex flex-col">
          {meeting.id ? (
            <Chatbot onAsk={handleAsk} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-5 border border-indigo-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-indigo-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-300 mb-2">Upload a meeting to get started</h2>
              <p className="text-sm text-slate-600 max-w-[280px]">
                Upload an audio or video file. AI will transcribe, summarize, and extract action items automatically.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Global Toast */}
      <div className="fixed bottom-5 left-5 right-5 sm:left-auto sm:right-5 z-50 flex justify-center sm:block">
        {toast && <Toast message={toast.message} type={toast.type} />}
      </div>
    </div>
  );
}
