/** The ::: mark — Head, Heart, Hand. */
export default function Colons({ className = "", label, w = 22 }: { className?: string; label?: string; w?: number }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} aria-hidden={!label}>
      <svg width={w} height={(w * 14) / 22} viewBox="0 0 22 14" fill="currentColor" aria-hidden>
        {[0, 8, 16].map((x) => (
          <g key={x}>
            <rect x={x} y="0" width="4" height="4" rx="2" />
            <rect x={x} y="10" width="4" height="4" rx="2" />
          </g>
        ))}
      </svg>
      {label && <span className="eyebrow">{label}</span>}
    </span>
  );
}
