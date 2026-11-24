import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Random Deep Thoughts: one idea a week from Barr. Godwin Akpan. Two minutes to read.",
  alternates: { canonical: "/newsletter" },
};

export default function Newsletter() {
  return (
    <>
      <PageHero eyebrow="Head · Newsletter" words={["Random", "Deep", "Thoughts."]} line="One idea a week. Two minutes to read. No noise." />
      <section className="wrap pb-28 sm:pb-40">
        <SignupForm intent="Newsletter" />
        <p className="mt-10 text-ash">Want to see what you&apos;d get? <Link href="/hearticles" className="link-u text-eagle">Read the latest Hearticles</Link>.</p>
      </section>
    </>
  );
}
