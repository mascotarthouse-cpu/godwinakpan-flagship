"use client";
import { motion, useReducedMotion } from "framer-motion";

/** Headline that rises in word by word from a mask. */
export default function Kinetic({ words, className = "", as = "h1", accentLast = false, delay = 0.15 }: { words: string[]; className?: string; as?: "h1" | "h2" | "p"; accentLast?: boolean; delay?: number }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      aria-label={words.join(" ")}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ staggerChildren: 0.09, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className={`inline-block ${accentLast && i === words.length - 1 ? "text-red" : ""}`}
            variants={{ hidden: { y: "110%" }, shown: { y: "0%", transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } } }}
          >
            {w.endsWith("™") ? (<>{w.slice(0, -1)}<sup className="ml-[0.04em] align-[0.9em] text-[0.32em]">™</sup></>) : w}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
