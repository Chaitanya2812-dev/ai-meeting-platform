
export default function Navbar({ darkMode, toggleTheme }) {
  return (
    <header className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        AI Meeting Assistant
      </h1>

      <button
        onClick={toggleTheme}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
}