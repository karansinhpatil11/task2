import Skeleton from './Skeleton.jsx';
import StatusPill from './StatusPill.jsx';
import Bars from './Bars.jsx';
import { card, muted } from './ui.js';

const HEADERS = ['Endpoint', 'Status', 'Latency', 'Uptime 90d', 'Last 10 checks'];

function Shell({ children }) {
  return (
    <section aria-label="Endpoints" className={`${card} overflow-x-auto`}>
      <table className="w-full min-w-[720px] text-left">
        <thead>
          <tr className={`text-xs ${muted} h-11`}>
            {HEADERS.map((h) => (
              <th key={h} scope="col" className="px-5 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </section>
  );
}

const rowBorder = 'border-t border-slate-200 dark:border-slate-800';

export function EndpointTable({ data, stale }) {
  return (
    <Shell>
      {data.map((e) => (
        <tr key={e.id} className={`${rowBorder} ${stale ? 'opacity-60' : ''}`}>
          <td className="px-5 py-3">
            <div className="font-semibold text-sm">{e.name}</div>
            <div className={`text-xs font-mono ${muted}`}>{e.path}</div>
          </td>
          <td className="px-5"><StatusPill kind={e.kind} /></td>
          <td className="px-5 text-sm">{e.lat ? `${e.lat} ms` : 'Timeout'}</td>
          <td className="px-5 text-sm">{e.up}%</td>
          <td className="px-5"><Bars kind={e.kind} /></td>
        </tr>
      ))}
    </Shell>
  );
}

export function EndpointTableSkeleton({ rows = 5 }) {
  return (
    <Shell>
      {Array.from({ length: rows }, (_, i) => (
        <tr key={i} className={`${rowBorder} h-16`}>
          <td className="px-5"><Skeleton className="h-3 w-2/3 mb-2" /><Skeleton className="h-2.5 w-1/3" /></td>
          <td className="px-5"><Skeleton className="h-6 w-24 rounded-full" /></td>
          <td className="px-5"><Skeleton className="h-3 w-12" /></td>
          <td className="px-5"><Skeleton className="h-3 w-14" /></td>
          <td className="px-5"><Skeleton className="h-5 w-24" /></td>
        </tr>
      ))}
    </Shell>
  );
}
