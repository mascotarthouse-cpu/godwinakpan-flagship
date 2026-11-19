import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import WorkGrid from "@/components/WorkGrid";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Brand strategy and design from Mascot Arthouse, and monitoring and evaluation for public sector and infrastructure.",
  alternates: { canonical: "/work" },
};
export const revalidate = 300;

export default async function Work({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  const [{ d }, projects] = await Promise.all([searchParams, getProjects()]);
  return (
    <>
      <PageHero eyebrow="Ventures & consulting" words={["Work", "that", "moves."]} line="Brand strategy and design. Monitoring and evaluation. Same discipline: name the real problem, then deliver." />
      <WorkGrid projects={projects} initial={d === "Brand" || d === "M&E" ? d : "All"} />
      <section className="wrap py-28 text-center sm:py-40">
        <p className="display text-h2">Your project next?</p>
        <Link href="/contact" className="btn-dark mt-8">Start a conversation <span aria-hidden>→</span></Link>
      </section>
    </>
  );
}
