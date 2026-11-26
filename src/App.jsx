import { useState } from 'react';
import { useApiStatus } from './hooks/useApiStatus.js';
import { useToasts } from './hooks/useToasts.js';
import { summarize } from './lib/summary.js';
import { EndpointTable, EndpointTableSkeleton } from './components/EndpointTable.jsx';
import Stat from './components/Stat.jsx';
import Panel from './components/Panel.jsx';
import ErrorBanner from './components/ErrorBanner.jsx';
import Toasts from './components/Toasts.jsx';
import { btn, btnGhost, btnPrimary, card, muted } from './components/ui.js';

const SCENARIOS = [['ok', 'Success'], ['error', 'Error'], ['empty', 'Empty']];

const ErrorIcon = () => (
  <svg width="56" height="56" aria-hidden="true">
    <circle cx="28" cy="28" r="27" className="fill-red-100 dark:fill-red-950" />
    <path d="M28 16v16M28 38v2" className="stroke-red-700 dark:stroke-red-400" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
const EmptyIcon = () => (
  <svg width="120" height="80" aria-hidden="true">
    <rect x="10" y="10" width="100" height="60" rx="8" className="fill-blue-100 dark:fill-blue-950" />
    <rect x="24" y="26" width="40" height="8" rx="4" className="fill-blue-300 dark:fill-blue-800" />
    <rect x="24" y="44" width="72" height="8" rx="4" className="fill-blue-200 dark:fill-blue-900" />
    <circle cx="96" cy="30" r="5" className="fill-blue-700" />
  </svg>
);

export default function App() {
  const [scenario, setScenario] = useState('ok'); // demo only: remove when using a real API
  const { toasts, push, dismiss } = useToasts();

  const api = useApiStatus({
    scenario,
    onRefreshed: () => push('ok', 'Status updated just now'),
    onFailed: () => push('err', 'Couldn’t refresh status'),
  });

  const { phase, data, busy, hasData, updated, countdown, error, reload } = api;
  const loading = phase === 'loading';
  const empty = phase === 'empty';
  const { down, degraded, avg, overall, incidents } = summarize(data || []);

  const subtitle = loading
    ? 'Checking 5 endpoints…'
    : phase === 'refreshing'
    ? 'Refreshing…'
    : updated
    ? `Last checked ${updated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : 'Nothing to check yet';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
      {/* Demo controls */}
      <div className={`${card} p-3 flex flex-wrap items-center gap-3`}>
        <span className={`text-xs font-semibold uppercase tracking-wide ${muted}`}>Demo scenario</span>
        <div role="group" aria-label="Demo scenario" className="flex gap-2">
          {SCENARIOS.map(([key, label]) => (
            <button
              key={key}
              aria-pressed={scenario === key}
              onClick={() => setScenario(key)}
              className={`${btn} ${scenario === key ? 'bg-blue-700 text-white' : 'border border-slate-300 dark:border-slate-700'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">API status</h1>
          <p role="status" className={`mt-1 text-sm ${muted}`}>{subtitle}</p>
        </div>
        <button className={btnGhost} disabled={busy} onClick={reload}>
          {busy ? 'Checking…' : 'Refresh'}
        </button>
      </header>

      {phase === 'error' && hasData && (
        <ErrorBanner message="Showing the last data we have" seconds={countdown} onRetry={reload} />
      )}

      <main aria-busy={busy} className="flex flex-col gap-6">
        {phase === 'error' && !hasData && (
          <>
            <ErrorBanner message="Status service unreachable" seconds={countdown} onRetry={reload} />
            <Panel
              icon={<ErrorIcon />}
              title="We couldn’t load API status"
              body={`The status service didn’t respond. Your endpoints may be fine. ${error}`}
            >
              <button className={btnPrimary} onClick={reload}>Try again</button>
            </Panel>
          </>
        )}

        {(loading || hasData || empty) && (
          <section aria-label="Summary" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat loading={loading} label="Overall status" value={empty ? '–' : overall.label} tone={empty ? muted : overall.tone} sub={empty ? 'No data' : `${down} down, ${degraded} degraded`} />
            <Stat loading={loading} label="Avg latency" value={empty ? '–' : `${avg} ms`} sub={empty ? 'No data' : 'Across live endpoints'} />
            <Stat loading={loading} label="Error rate" value={empty ? '–' : '0.8%'} sub={empty ? 'No data' : 'Last hour'} />
            <Stat loading={loading} label="Open incidents" value={empty ? '–' : incidents} sub={empty ? 'No data' : 'Since 09:12'} />
          </section>
        )}

        {loading && <EndpointTableSkeleton />}
        {hasData && !loading && <EndpointTable data={data} stale={phase === 'error'} />}

        {empty && (
          <Panel
            icon={<EmptyIcon />}
            title="No endpoints monitored yet"
            body="Add an endpoint to start tracking uptime, latency and errors. The first check runs within a minute."
          >
            <button className={btnPrimary} onClick={() => push('ok', 'Add-endpoint flow would open here')}>Add endpoint</button>
            <button className={btnGhost} onClick={() => push('ok', 'Import flow would open here')}>Import from OpenAPI</button>
          </Panel>
        )}
      </main>

      <Toasts items={toasts} onDismiss={dismiss} />
    </div>
  );
}
