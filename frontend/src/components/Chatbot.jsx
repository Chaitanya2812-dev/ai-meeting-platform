import { useState } from "react";

export default function Chatbot({ onAsk }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;
    const response = await onAsk(input);
    setMessages([...messages, { role: "user", text: input }, { role: "bot", text: response }]);
    setInput("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4">Chat with Meeting</h2>
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded ${msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Ask a question..."
        />
        <button onClick={handleSend} className="ml-2 bg-blue-600 text-white px-4 py-1 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
