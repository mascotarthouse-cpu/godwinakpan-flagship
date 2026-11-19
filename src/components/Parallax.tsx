"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/** Image that scales down gently as it scrolls through the viewport. */
export default function Parallax({ src, alt, className = "", priority = false, sizes = "100vw", position = "center" }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string; position?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.18, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "4%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
      </motion.div>
    </div>
  );
}
