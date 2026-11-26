export default function Skeleton({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse motion-reduce:animate-none ${className}`}
    />
  );
}
