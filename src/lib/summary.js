export function summarize(data = []) {
  const down = data.filter((e) => e.kind === 'err').length;
  const degraded = data.filter((e) => e.kind === 'warn').length;
  const live = data.filter((e) => e.lat);
  const avg = live.length ? Math.round(live.reduce((a, e) => a + e.lat, 0) / live.length) : 0;
  const overall = down
    ? { label: 'Partial outage', tone: 'text-red-700 dark:text-red-400' }
    : degraded
    ? { label: 'Degraded', tone: 'text-amber-700 dark:text-amber-400' }
    : { label: 'All operational', tone: 'text-emerald-700 dark:text-emerald-400' };
  return { down, degraded, avg, overall, incidents: down + degraded };
}
