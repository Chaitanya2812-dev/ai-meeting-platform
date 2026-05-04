import { useState } from "react";

export default function Chatbot({ onAsk }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await onAsk(input);
      const botMessage = { role: "bot", text: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error fetching response." },
      ]);
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4">Chat with Meeting</h2>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-100 ml-auto text-right"
                : "bg-gray-100 mr-auto text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="p-2 rounded bg-gray-200 text-sm text-gray-600">
            Thinking...
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Ask a question..."
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
