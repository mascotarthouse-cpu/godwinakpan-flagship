import type { ReactNode } from "react";
export const input = "w-full rounded-xl border border-eagle/15 bg-sky px-4 py-3 outline-none focus:border-red";
export const label = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-ash";
export function Title({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <h1 className="display text-3xl sm:text-4xl">{children}</h1>
      {action}
    </div>
  );
}
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-eagle/10 bg-sky p-5 sm:p-6 ${className}`}>{children}</div>;
}
export function Saved({ show, text = "Saved." }: { show?: string; text?: string }) {
  return show ? <p className="mb-6 rounded-xl bg-growth/10 px-4 py-3 text-sm font-medium text-growth">{text}</p> : null;
}
