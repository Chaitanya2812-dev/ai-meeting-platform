import { useState } from "react";
import Upload from "../components/Upload";
import Summary from "../components/Summary";
import Chatbot from "../components/Chatbot";
import Export from "../components/Export";
import fileService from "../services/fileService";
import summaryService from "../services/summaryService";
import chatService from "../services/chatService";
import exportService from "../services/exportService";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
    const [toast, setToast] = useState(null);
    const { darkMode, toggleTheme } = useTheme();

  // Central state
  const [meeting, setMeeting] = useState({
    id: null,
    status: "idle", // idle | uploading | processing | ready | error
    transcript: "",
    summary: "",
    tasks: [],
  });

  //  Upload handler
  const handleUpload = async (file) => {
    try {
      setMeeting((prev) => ({ ...prev, status: "uploading" }));

      const data = await fileService.upload(file);

      setMeeting({
        id: data.meetingId,
        status: "processing",
        transcript: "",
        summary: "",
        tasks: [],
      });

      pollMeeting(data.meetingId);
    } catch (err) {
      console.error(err);
      setMeeting((prev) => ({ ...prev, status: "error" }));
    }
  };

  //  Polling
  const pollMeeting = async (id) => {
    try {
      const res = await summaryService.getSummary(id);

      if (res.status === "processing") {
        setTimeout(() => pollMeeting(id), 3000);
      } else {
        setMeeting({
          id,
          status: "ready",
          transcript: res.transcript,
          summary: res.summary,
          tasks: res.tasks,
        });
      }
    } catch (err) {
      console.error(err);
      setMeeting((prev) => ({ ...prev, status: "error" }));
    }
  };

  //  Chat
  const handleAsk = async (q) => {
    if (!meeting.id) return;
    return await chatService.ask(meeting.id, q);
  };

      //  Export
    const handleExport = async (type) => {
    try {
        await exportService.exportData(meeting.id, type);
        setToast({ message: `Exported via ${type}`, type: "success" });

        setTimeout(() => setToast(null), 3000);
    } catch {
        setToast({ message: "Export failed", type: "error" });
    }
    };

  return (
    <div className="min-h-screen">
      
      {/* Navbar */}
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-5 gap-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">

        {/* left: Upload + Summary + Export */}
        <div className="lg:col-span-2 space-y-6 overflow-y-auto max-h-[80vh] pr-2">
          
          <Upload onUpload={handleUpload} />

          {/* Status */}
          {meeting.status === "uploading" && (
            <Loader text="Uploading file..." />
          )}

          {meeting.status === "processing" && (
            <p className="text-center text-black-500">
                <Loader text="Transcribing & generating summary..." />
            </p>
          )}

          {meeting.status === "ready" && (
            <Summary
              transcript={meeting.transcript}
              summary={meeting.summary}
              tasks={meeting.tasks}
            />
          )}

          {meeting.status === "error" && (
            <p className="text-red-500 text-center">
              Something went wrong. Please try again.
            </p>
          )}

          {meeting.id && <Export onExport={handleExport} />}
        </div>

        {/* right: Chat (Primary) */}
        <div className="lg:col-span-3 h-[80vh] bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex flex-col">
          
          {meeting.id ? (
            <Chatbot onAsk={handleAsk} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 text-center">
              <h2 className="text-lg font-semibold mb-2">
                Start by uploading a meeting
              </h2>
              <p className="text-sm">
                Then ask questions, get insights, and extract action items.
              </p>
            </div>
          )}

        </div>

      </main>

        {/*  TOAST GOES HERE (GLOBAL LEVEL) */}
        <div className="fixed bottom-5 right-5">
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>

    </div>
  );
}

