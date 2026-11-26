import Link from "next/link";
import Colons from "./Colons";

// The story order every room page follows: Story, Work, Impact, Hearticles, Let's talk.
const order = [
  { href: "/story", label: "Story" },
  { href: "/work", label: "Work" },
  { href: "/impact", label: "Impact" },
  { href: "/hearticles", label: "Hearticles" },
  { href: "/contact", label: "Let's talk" },
];

export default function NextChapter({ from }: { from: string }) {
  const i = order.findIndex((o) => o.href === from);
  const next = order[i + 1];
  if (!next) return null;
  return (
    <section className="border-t border-eagle/10">
      <Link href={next.href} className="wrap group flex flex-col gap-4 py-20 sm:py-28">
        <Colons label="Next chapter" className="text-red" />
        <span className="display flex items-baseline gap-4 text-mega transition-transform duration-700 ease-expo group-hover:translate-x-3">
          {next.label} <span aria-hidden className="text-red">→</span>
        </span>
      </Link>
    </section>
  );
}
