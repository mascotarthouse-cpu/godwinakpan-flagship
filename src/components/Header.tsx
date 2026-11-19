"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Colons from "./Colons";
import Magnetic from "./Magnetic";

const primary = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/initiatives", label: "Initiatives" },
  { href: "/speaking-media", label: "Speaking" },
  { href: "/insights", label: "Insights" },
];
const everything = [{ href: "/", label: "Home" }, ...primary, { href: "/contact", label: "Contact" }];
const ecosystem = [
  { href: "/work?d=Brand", label: "Mascot Arthouse" },
  { href: "/initiatives#ibd", label: "Ifiok Beyond Design" },
  { href: "/initiatives#the-shift", label: "THE SHIFT" },
  { href: "/initiatives#dorathy-akpan-foundation", label: "Dorathy Akpan Foundation" },
];

export default function Header({ socials }: { socials: { label: string; href: string }[] }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    let last = 0;
    const on = () => {
      const y = scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > last);
      last = y;
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const l = (window as unknown as { lenis?: { stop(): void; start(): void } }).lenis;
    if (open) l?.stop(); else l?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (path.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-expo ${hidden && !open ? "-translate-y-full" : ""} ${
          scrolled && !open ? "bg-sky/80 text-eagle backdrop-blur-xl" : open ? "text-sky" : "text-eagle mix-blend-normal"
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6 sm:h-20">
          <Link href="/" className="display flex items-center gap-2.5 text-[1.05rem]" aria-label="Godwin Akpan, home">
            <Colons className={open ? "text-red" : "text-red"} />
            <span>Godwin Akpan</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm lg:flex" aria-label="Primary">
            {primary.map((l) => (
              <Link key={l.href} href={l.href} className={`link-u ${path.startsWith(l.href) ? "bg-[length:100%_1px]" : ""}`}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Magnetic>
                <Link href="/contact" className={open ? "btn-light" : "btn-dark"}>
                  Work with Godwin
                </Link>
              </Magnetic>
            </div>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className={`h-0.5 w-6 bg-current transition-transform duration-500 ease-expo ${open ? "translate-y-1 rotate-45" : ""}`} />
              <span className={`h-0.5 w-6 bg-current transition-transform duration-500 ease-expo ${open ? "-translate-y-1 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto bg-obsidian text-sky"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="wrap grid min-h-full gap-14 pb-12 pt-28 lg:grid-cols-12">
              <nav className="lg:col-span-7" aria-label="All pages">
                <ul>
                  {everything.map((l, i) => (
                    <motion.li key={l.href} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                      <Link href={l.href} className="display group flex items-baseline gap-4 py-1 text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] text-sky/90 transition-colors hover:text-sky">
                        <span className="text-sm font-medium text-red">{String(i + 1).padStart(2, "0")}</span>
                        <span className="transition-transform duration-500 ease-expo group-hover:translate-x-3">{l.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <motion.div className="flex flex-col justify-end gap-12 lg:col-span-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <div>
                  <Colons label="Ecosystem" className="mb-5 text-slate" />
                  <ul className="space-y-2 text-lg">
                    {ecosystem.map((e) => (
                      <li key={e.label}><Link href={e.href} className="link-u">{e.label}</Link></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Colons label="Follow" className="mb-5 text-slate" />
                  <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {socials.map((s) => (
                      <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="link-u">{s.label}</a></li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact" className="btn-light w-fit sm:hidden">Work with Godwin</Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
