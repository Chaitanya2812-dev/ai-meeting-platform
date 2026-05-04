export default function Export({ onExport }) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow flex space-x-4">
      <button
        onClick={() => onExport("email")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Export to Email
      </button>
      <button
        onClick={() => onExport("notion")}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Export to Notion
      </button>
      <button
        onClick={() => onExport("markdown")}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Download Markdown
      </button>
    </div>
  );
}
