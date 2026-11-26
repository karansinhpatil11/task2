export default function Toasts({ items, onDismiss }) {
  return (
    <div
      aria-live="polite"
      className="fixed right-4 bottom-4 left-4 sm:left-auto z-50 flex flex-col gap-2 items-end"
      style={{ paddingBottom: 'env(safe-area-inset-bottom,0px)' }}
    >
      {items.map((t) => (
        <div
          key={t.id}
          role="status"
          className="flex items-center gap-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg shadow-xl pl-4 pr-2 min-h-12 text-sm max-w-md"
        >
          <span aria-hidden="true" className={`w-2.5 h-2.5 rounded-full ${t.kind === 'err' ? 'bg-red-500' : 'bg-emerald-500'}`} />
          <span className="py-2">{t.msg}</span>
          <button onClick={() => onDismiss(t.id)} className="h-11 px-3 font-semibold underline">
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}
