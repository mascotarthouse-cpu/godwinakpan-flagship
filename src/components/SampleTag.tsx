/** Marks placeholder content until the real thing replaces it. */
export default function SampleTag({ className = "" }: { className?: string }) {
  return <span className={`inline-block rounded-full border border-dashed border-current px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-[0.14em] opacity-60 ${className}`}>Sample</span>;
}
