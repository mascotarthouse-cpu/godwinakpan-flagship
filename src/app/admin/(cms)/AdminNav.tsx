"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  ["Overview", "/admin"],
  ["Insights", "/admin/posts"],
  ["Medium sync", "/admin/medium"],
  ["Work", "/admin/projects"],
  ["Media", "/admin/media"],
  ["Inquiries", "/admin/inquiries"],
  ["Settings", "/admin/settings"],
];

export default function AdminNav() {
  const p = usePathname();
  return (
    <nav className="no-scrollbar mt-4 flex gap-1 overflow-x-auto lg:mt-10 lg:flex-col">
      {items.map(([l, h]) => {
        const on = h === "/admin" ? p === h : p.startsWith(h);
        return (
          <Link key={h} href={h} className={`shrink-0 rounded-lg px-3 py-2 text-sm ${on ? "bg-eagle text-sky" : "text-graphite hover:bg-paper"}`}>{l}</Link>
        );
      })}
    </nav>
  );
}
