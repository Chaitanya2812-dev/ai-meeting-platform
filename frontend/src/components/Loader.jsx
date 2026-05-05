export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 animate-spin"></div>
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 font-medium">{text}</p>
    </div>
  );
}