import type { Metadata } from "next";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import PageHero from "@/components/PageHero";
import { legal } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this site handles your personal data.",
  alternates: { canonical: "/privacy" },
};

export default async function Privacy() {
  const html = sanitizeHtml(await marked.parse(legal.privacy));
  return (
    <>
      <PageHero eyebrow="Legal" words={["Privacy."]} />
      <section className="wrap max-w-3xl pb-28 sm:pb-40"><div className="prose-g" dangerouslySetInnerHTML={{ __html: html }} /></section>
    </>
  );
}
