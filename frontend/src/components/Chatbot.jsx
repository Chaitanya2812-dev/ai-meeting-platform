import { useState, useRef, useEffect } from "react";

export default function Chatbot({ onAsk }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setMessages((p) => [...p, { role: "user", text: input }]);
    setInput("");
    setLoading(true);
    try {
      const answer = await onAsk(input);
      setMessages((p) => [...p, { role: "bot", text: answer }]);
    } catch {
      setMessages((p) => [...p, { role: "bot", text: " Error. Try again." }]);
    }
    setLoading(false);
  };

  const onKey = (e) => { 
    if (e.key === "Enter" && !e.shiftKey) { 
      e.preventDefault(); 
      handleSend(); 
    } 
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-700/50 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">💬</div>
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Chat with Meeting</h2>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm">
            <p>No messages yet.</p>
            <p className="text-xs mt-1 text-slate-600">Try: "What decisions were made?"</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-4 py-2.5 text-sm rounded-2xl ${
              m.role === "user"
                ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-br-md shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 rounded-bl-md"
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
              <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/50">
        <div className="flex items-end gap-2 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/50 px-4 py-2 focus-within:border-indigo-500/50">
          <textarea 
            id="chat-input" 
            aria-label="Chat input message"
            value={input} 
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }} 
            onKeyDown={onKey}
            className="flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-200 placeholder-slate-500 outline-none resize-none py-1.5 max-h-32 min-h-[36px]" 
            placeholder="Ask about the meeting... (Shift+Enter for new line)" 
            disabled={loading} 
            rows={1}
          />
          <button 
            id="chat-send" 
            aria-label="Send message"
            onClick={handleSend} 
            disabled={!input.trim() || loading}
            className="w-9 h-9 flex-shrink-0 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 flex items-center justify-center text-white disabled:opacity-30 mb-0.5"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
