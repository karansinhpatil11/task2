const PILL = {
  ok: ['Operational', 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300', 'fill-emerald-600'],
  warn: ['Degraded', 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300', 'fill-amber-600'],
  err: ['Down', 'bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-300', 'fill-red-600'],
};

export default function StatusPill({ kind }) {
  const [label, tone, dot] = PILL[kind];
  return (
    <span className={`inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-xs font-semibold ${tone}`}>
      <svg width="8" height="8" aria-hidden="true"><circle cx="4" cy="4" r="4" className={dot} /></svg>
      {label}
    </span>
  );
}
