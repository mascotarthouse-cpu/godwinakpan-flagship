import Image from "next/image";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import ContactFlow from "@/components/ContactFlow";
import Kinetic from "@/components/Kinetic";
import { getMedia, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Brand advisory, M&E consulting, speaking invitations and press. Start a conversation with Godwin Akpan.",
  alternates: { canonical: "/contact" },
};
export const revalidate = 300;

export default async function Contact({ searchParams }: { searchParams: Promise<{ intent?: string; about?: string }> }) {
  const [{ intent, about }, s, m] = await Promise.all([searchParams, getSettings(), getMedia()]);
  return (
    <section className="wrap grid gap-14 pb-28 pt-32 sm:pt-44 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <Colons label="Advisory · Speaking · Collaborations" className="mb-8 text-red" />
        <Kinetic words={["Let's", "talk."]} className="display text-hero" />
        <ContactFlow initialIntent={intent} about={about} />
      </div>
      <aside className="lg:col-span-5 lg:col-start-8">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-paper">
          <Image src={m.contact.url} alt={m.contact.alt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
        </div>
        <div className="mt-8 space-y-1 text-lg">
          <a href={`mailto:${s.email}`} className="link-u block w-fit break-all">{s.email}</a>
          <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="link-u block w-fit">{s.phone}</a>
          <p className="text-ash">{s.location}</p>
        </div>
      </aside>
    </section>
  );
}
