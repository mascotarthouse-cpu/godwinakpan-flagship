import Image from "next/image";
import Link from "next/link";
import Colons from "@/components/Colons";
import Kinetic from "@/components/Kinetic";
import Magnetic from "@/components/Magnetic";
import NewsletterBlock from "@/components/NewsletterBlock";
import Parallax from "@/components/Parallax";
import PostCard from "@/components/PostCard";
import Reel from "@/components/Reel";
import Reveal from "@/components/Reveal";
import Showcase from "@/components/Showcase";
import StickyStory from "@/components/StickyStory";
import Ticker from "@/components/Ticker";
import { getMedia, getPosts, getSettings } from "@/lib/content";
import { doors, institutions, pillars, ventures } from "@/lib/seed";

export const revalidate = 300;

export default async function Home() {
  const [s, m, posts] = await Promise.all([getSettings(), getMedia(), getPosts()]);
  const years = new Date().getFullYear() - 2004;

  return (
    <>
      {/* Hero: asymmetric split. Studio shot right, kinetic mantra left. */}
      <section className="relative min-h-[100svh] overflow-hidden bg-sky">
        <div className="wrap grid min-h-[100svh] items-end gap-10 pb-10 pt-28 lg:grid-cols-12 lg:items-center lg:pb-0 lg:pt-20">
          <div className="relative z-10 lg:col-span-7">
            <Colons label={s.descriptor} className="mb-8 text-red" />
            <Kinetic words={s.mantraWords} accentLast className="display text-hero leading-[0.92] [&>span]:mr-[0.02em]" />
            <Reveal delay={0.7}>
              <p className="mt-8 max-w-md text-xl text-ash">{s.philosophy}</p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Magnetic><Link href="/contact" className="btn-dark">Work with Godwin <span aria-hidden>→</span></Link></Magnetic>
                <Link href="/about" className="link-u text-sm font-semibold">Meet Godwin</Link>
              </div>
            </Reveal>
          </div>
          <div className="relative -mx-4 h-[62svh] sm:mx-0 lg:col-span-5 lg:h-[86svh]">
            {/* TODO: Replace with Google Drive asset -> "Bold Coloured Studio Shot" (swap in /admin → Media → hero) */}
            <Parallax src={m.hero.url} alt={m.hero.alt} priority sizes="(min-width:1024px) 40vw, 100vw" position="center 30%" className="h-full w-full sm:rounded-[28px]" />
          </div>
        </div>
        <p className="eyebrow absolute bottom-6 right-6 hidden text-ash lg:block">Scroll</p>
      </section>

      {/* Authority strip */}
      <section className="border-y border-eagle/10 bg-sky py-10" aria-label="Credentials and institutions">
        <Ticker items={institutions} />
      </section>

      {/* Proof: plain facts only */}
      <section className="wrap grid gap-12 py-28 sm:py-40 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Colons label="Since 2004" className="mb-6 text-red" />
          <h2 className="display text-h2">Brands. Systems.<br />People.</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:col-span-6 lg:col-start-7">
          {[
            [`${years}`, "years building brands"],
            ["2004", "Mascot Arthouse founded"],
            ["2016", "Ifiok Beyond Design founded"],
            ["4", "ventures and initiatives"],
          ].map(([v, l], i) => (
            <Reveal key={l} delay={i * 0.08}>
              <p className="display text-[clamp(3rem,6vw,5.5rem)] leading-none">{v}</p>
              <p className="mt-3 text-ash">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The ::: scroll stage. Each word opens its door: Head → Ideas, Heart → Impact, Hand → Work. */}
      <StickyStory beats={pillars.map((p) => ({ ...p, img: m[p.key], href: doors[p.key as keyof typeof doors], door: { head: "Ideas", heart: "Impact", hand: "Work" }[p.key] }))} />

      <Showcase title="Where the work lives." cards={ventures} />

      <Reel url={s.reelUrl} poster={m.reel.url} alt={m.reel.alt} />

      {/* Latest thinking */}
      <section className="wrap py-28 sm:py-40">
        <div className="mb-14 flex items-end justify-between gap-6">
          <Reveal>
            <Colons label="Latest Hearticles" className="mb-5 text-red" />
            <h2 className="display text-h2">Ideas.</h2>
          </Reveal>
          <Link href="/ideas" className="link-u text-sm font-semibold">All ideas</Link>
        </div>
        <div className="grid gap-12 md:grid-cols-3 md:gap-6">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}><PostCard p={p} /></Reveal>
          ))}
        </div>
      </section>

      <NewsletterBlock />

      {/* Closing */}
      <section className="relative overflow-hidden bg-sky">
        <div className="wrap grid items-center gap-10 pb-28 sm:pb-40 lg:grid-cols-12">
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full bg-eagle lg:col-span-4">
            <Image src={m.portrait.url} alt={m.portrait.alt} fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Kinetic as="h2" words={["Let's", "build", "what's", "next."]} className="display text-mega" />
            <Reveal delay={0.4}>
              <div className="mt-10"><Magnetic><Link href="/contact" className="btn-dark">Start a conversation <span aria-hidden>→</span></Link></Magnetic></div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
