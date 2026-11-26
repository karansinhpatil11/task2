import Skeleton from './Skeleton.jsx';
import { card, muted } from './ui.js';

export default function Stat({ label, value, sub, loading, tone = '' }) {
  return (
    <div className={`${card} p-5 flex flex-col gap-2.5`}>
      <span className={`text-[13px] ${muted}`}>{label}</span>
      {loading ? <Skeleton className="h-8 w-28" /> : <span className={`text-3xl font-bold ${tone}`}>{value}</span>}
      {loading ? <Skeleton className="h-3 w-20" /> : <span className={`text-[13px] ${muted}`}>{sub}</span>}
    </div>
  );
}
