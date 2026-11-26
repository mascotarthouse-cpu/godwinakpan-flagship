import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { AskPanel } from "@/components/Search";

export const metadata: Metadata = {
  title: "Ask",
  description: "Ask anything about Godwin Akpan's work, ideas and initiatives.",
  robots: { index: false },
};

export default async function Ask({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return (
    <>
      <PageHero eyebrow="Ask" words={["Ask", "anything."]} line="Instant answers from across the site. If it isn't here, Godwin will reply himself." />
      <section className="wrap pb-28 sm:pb-40"><AskPanel initial={q ?? ""} /></section>
    </>
  );
}
