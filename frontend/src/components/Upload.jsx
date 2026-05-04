import { useState } from "react";

export default function Upload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    await onUpload(file);
    setLoading(false);
  };

  return (
    <div className="p-6 border rounded-lg bg-gray shadow-md">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
