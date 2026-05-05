import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import summaryService from "../services/summaryService";
import exportService from "../services/exportService";
import Toast from "../components/Toast";

export default function Dashboard() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await summaryService.getAllMeetings();
        setMeetings(data || []);
      } catch (err) {
        setToast({ message: "Failed to load meetings", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  const handleMarkdownExport = async (meetingId) => {
    try {
      await exportService.exportMarkdown(meetingId);
      setToast({ message: "Export started", type: "success" });
      setTimeout(() => setToast(null), 3000);
    } catch {
      setToast({ message: "Export failed", type: "error" });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const filteredMeetings = useMemo(() => {
    return meetings.filter(m =>
      m.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [meetings, search]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Past Meetings</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and export your meeting summaries</p>
          </div>

          <div className="relative max-w-sm w-full">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              ⛶ ⌕
            </span>
            <input
              type="text"
              placeholder="            Search meetings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredMeetings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {filteredMeetings.map((meeting) => (
              <div key={meeting._id} className="glass-card p-5 flex flex-col transition-transform hover:-translate-y-1">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-lg mb-2 line-clamp-1">
                    {meeting.title || "Untitled Meeting"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1">
                    📅 {new Date(meeting.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex gap-4 mb-4">
                    <div className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-3 flex-1 text-center border border-slate-200 dark:border-slate-700/50">
                      <p className="text-xl font-bold text-indigo-500">{meeting.tasks?.length || 0}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Tasks</p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-3 flex-1 text-center border border-slate-200 dark:border-slate-700/50">
                      <p className="text-xl font-bold text-emerald-500">{meeting.decisions?.length || 0}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Decisions</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto pt-4 border-t border-slate-200 dark:border-slate-700/50">
                  <Link
                    to={`/?id=${meeting._id}`}
                    className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium text-center transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleMarkdownExport(meeting._id)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm transition-colors"
                    title="Export Markdown"
                  >
                    ⬇️ MD
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card">
            <h2 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">No meetings found</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {search ? "Try adjusting your search terms." : "You haven't uploaded any meetings yet."}
            </p>
            {!search && (
              <Link to="/" className="inline-block mt-4 btn-primary">
                Upload New Meeting
              </Link>
            )}
          </div>
        )}
      </main>

      <div className="fixed bottom-5 right-5 z-50">
        {toast && <Toast message={toast.message} type={toast.type} />}
      </div>
    </div>
  );
}
