import type { Metadata } from "next";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import PageHero from "@/components/PageHero";
import { legal } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for this site.",
  alternates: { canonical: "/terms" },
};

export default async function Terms() {
  const html = sanitizeHtml(await marked.parse(legal.terms));
  return (
    <>
      <PageHero eyebrow="Legal" words={["Terms."]} />
      <section className="wrap max-w-3xl pb-28 sm:pb-40"><div className="prose-g" dangerouslySetInnerHTML={{ __html: html }} /></section>
    </>
  );
}
