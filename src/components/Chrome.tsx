"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
/** Hides public chrome (footer) inside /admin. */
export default function Chrome({ children }: { children: ReactNode }) {
  return usePathname().startsWith("/admin") ? null : <>{children}</>;
}
