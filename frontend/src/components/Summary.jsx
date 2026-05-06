import { useState } from "react";

export default function Summary({ transcript, summary, decisions, tasks }) {
  const [activeTab, setActiveTab] = useState("summary");
  const [expandedTranscript, setExpandedTranscript] = useState(false);

  const tabs = [
    { id: "summary", label: "Summary", icon: "📝" },
    { id: "tasks", label: "Action Items", icon: "✅", count: tasks?.length },
    { id: "decisions", label: "Decisions", icon: "⚡", count: decisions?.length },
    { id: "transcript", label: "Transcript", icon: "📄" },
  ];

  return (
    <div className="glass-card overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-700/50 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2
              ${activeTab === tab.id
                ? "text-indigo-600 dark:text-indigo-400 border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-500/5"
                : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/30"
              }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.count != null && (
              <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                activeTab === tab.id 
                  ? "bg-indigo-500/20 text-indigo-300" 
                  : "bg-slate-700 text-slate-400"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-5">
        
        {/* Summary Tab */}
        {activeTab === "summary" && (
          <div className="animate-fade-in-up">
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-5 border border-indigo-500/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" x2="8" y1="13" y2="13"/>
                    <line x1="16" x2="8" y1="17" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">AI-Generated Summary</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{summary || "No summary available."}</p>
                  
                  {decisions && decisions.length > 0 && (
                    <div className="mt-6 border-t border-indigo-500/10 dark:border-indigo-500/20 pt-4">
                      <h4 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                        Key Decisions
                      </h4>
                      <ul className="space-y-2">
                        {decisions.map((d, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5"></div>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tasks / Action Items Tab */}
        {activeTab === "tasks" && (
          <div className="space-y-3 animate-fade-in-up">
            {tasks && tasks.length > 0 ? (
              tasks.map((task, idx) => (
                <div
                  key={idx}
                  className="group flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-indigo-400 dark:hover:border-indigo-500/30 transition-all duration-200"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {/* Task Number */}
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white shadow-lg shadow-indigo-500/20">
                    {idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{task.task}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {task.assignee && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-md bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20">
                          👤 {task.assignee}
                        </span>
                      )}
                      {task.deadline && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-md bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20">
                          ⏰ {task.deadline}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Completion indicator */}
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${
                    task.done
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-slate-300 dark:border-slate-600 group-hover:border-slate-400"
                  }`}>
                    {task.done && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white p-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-slate-500">No action items found in this meeting.</p>
              </div>
            )}
          </div>
        )}

        {/* Decisions Tab */}
        {activeTab === "decisions" && (
          <div className="space-y-3 animate-fade-in-up">
            {decisions && decisions.length > 0 ? (
              decisions.map((decision, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 flex-shrink-0 mt-2"></div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{decision}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-slate-500">No decisions captured.</p>
              </div>
            )}
          </div>
        )}

        {/* Transcript Tab */}
        {activeTab === "transcript" && (
          <div className="animate-fade-in-up">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50">
              <p className={`text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap ${
                !expandedTranscript ? "max-h-60 overflow-hidden relative" : ""
              }`}>
                {transcript || "No transcript available."}
                {!expandedTranscript && transcript && transcript.length > 500 && (
                  <span className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50/90 dark:from-slate-800/90 to-transparent"></span>
                )}
              </p>
              {transcript && transcript.length > 500 && (
                <button
                  id="toggle-transcript"
                  onClick={() => setExpandedTranscript(!expandedTranscript)}
                  className="mt-3 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  {expandedTranscript ? "Show less ↑" : "Show full transcript ↓"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
