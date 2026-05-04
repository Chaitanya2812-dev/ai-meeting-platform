export default function Summary({ transcript, summary, tasks }) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Meeting Summary</h2>
      <p className="mb-4">{summary}</p>

      <h3 className="text-lg font-semibold mb-2">Action Items</h3>
      <ul className="space-y-2">
        {tasks.map((task, idx) => (
          <li key={idx} className="flex items-center justify-between bg-white p-2 rounded shadow">
            <span>{task.text}</span>
            <span className="text-sm text-gray-600">
              👤 {task.assignee} | ⏰ {task.deadline}
            </span>
          </li>
        ))}
      </ul>

      <details className="mt-4">
        <summary className="cursor-pointer text-blue-600">View Transcript</summary>
        <p className="mt-2 text-sm text-gray-700">{transcript}</p>
      </details>
    </div>
  );
}
