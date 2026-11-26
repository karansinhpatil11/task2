import { btnGhost, muted } from './ui.js';

export default function ErrorBanner({ message, seconds, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-3 rounded-lg border border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950 pl-4 pr-2 py-2"
    >
      <svg width="20" height="20" aria-hidden="true" className="stroke-red-700 dark:stroke-red-400 fill-none" strokeWidth="2">
        <path d="M10 2l9 16H1z" strokeLinejoin="round" />
        <path d="M10 8v4M10 14.5v.5" />
      </svg>
      <p className="flex-1 min-w-[200px] text-sm">
        <strong>Connection problem.</strong>{' '}
        <span className={muted}>{message}. Retrying in {seconds}s.</span>
      </p>
      <button onClick={onRetry} className={btnGhost}>Retry now</button>
    </div>
  );
}
