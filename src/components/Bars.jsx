const COLORS = { ok: '#2E9E6B', warn: '#D98A1F', err: '#D9453A' };

export default function Bars({ kind }) {
  const heights = kind === 'ok' ? [14, 16, 15, 16, 16, 13, 16, 16, 15, 16] : [16, 16, 12, 16, 9, 16, 16, 7, 12, 16];
  return (
    <svg width="100" height="20" role="img" aria-label="Last 10 checks">
      {heights.map((h, i) => (
        <rect key={i} x={i * 10} y={20 - h} width="7" height={h} rx="2" fill={COLORS[kind]} />
      ))}
    </svg>
  );
}
