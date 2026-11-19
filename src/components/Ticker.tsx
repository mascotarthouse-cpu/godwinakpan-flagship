export default function Ticker({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`} aria-label={items.join(", ")}>
      <div className="ticker flex w-max items-center gap-14 whitespace-nowrap" aria-hidden>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-14">
            <span className="display text-2xl sm:text-3xl">{t}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-red" />
          </span>
        ))}
      </div>
    </div>
  );
}
