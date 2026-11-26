import Image from "next/image";
import Link from "next/link";
import Colons from "@/components/Colons";
import Kinetic from "@/components/Kinetic";
import Magnetic from "@/components/Magnetic";
import Parallax from "@/components/Parallax";
import PostCard from "@/components/PostCard";
import Reveal from "@/components/Reveal";
import SignupForm from "@/components/SignupForm";
import SampleTag from "@/components/SampleTag";
import Ticker from "@/components/Ticker";
import { getMedia, getPosts, getProjects, getSettings } from "@/lib/content";
import { impactNumbers, initiatives, institutions, offers, thoughts } from "@/lib/seed";

export const revalidate = 300;

const chips = [
  { label: "Hire me", href: "/work" },
  { label: "Invite me to speak", href: "/speaking" },
  { label: "Learn", href: "/hearticles" },
  { label: "Back a cause", href: "/impact" },
];

function Chapter({ n, label, title, href, cta }: { n: number; label: string; title: string; href: string; cta: string }) {
  return (
    <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <Reveal>
        <Colons label={`0${n} · ${label}`} className="mb-5 text-red" />
        <h2 className="display max-w-3xl text-h2">{title}</h2>
      </Reveal>
      <Link href={href} className="link-u shrink-0 text-sm font-semibold">{cta} <span aria-hidden>→</span></Link>
    </div>
  );
}

/** Home tells the whole story in six chapters, in menu order. The menu tells the story; Home sells it. */
export default async function Home() {
  const [s, m, posts, projects] = await Promise.all([getSettings(), getMedia(), getPosts(), getProjects()]);
  const years = new Date().getFullYear() - 2004;
  const latest = posts.find((p) => p.category !== "Deep Thoughts");
  const thought = thoughts[0];
  const caseStudy = projects[0];
  const cause = initiatives[0];
  const ld = { "@context": "https://schema.org", "@type": "WebSite", name: "Godwin Akpan", url: s.url, potentialAction: { "@type": "SearchAction", target: `${s.url}/ask?q={query}`, "query-input": "required name=query" } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      {/* 1 · Hook */}
      <section className="relative min-h-[100svh] overflow-hidden bg-sky">
        <div className="wrap grid min-h-[100svh] items-end gap-10 pb-10 pt-28 lg:grid-cols-12 lg:items-center lg:pb-0 lg:pt-20">
          <div className="relative z-10 lg:col-span-7">
            <Colons label={s.descriptor} className="mb-8 text-red" />
            <h1 className="sr-only">Godwin Akpan, Disruptive Brand Architect</h1>
            <Kinetic words={s.heroLine.split(" ")} accentLast className="display text-hero leading-[0.92] [&>span]:mr-[0.02em]" />
            <Reveal delay={0.7}>
              <nav aria-label="What brings you here" className="mt-10 flex flex-wrap gap-2">
                {chips.map((c, i) => (
                  i === 0
                    ? <Magnetic key={c.href}><Link href={c.href} className="btn-dark">{c.label} <span aria-hidden>→</span></Link></Magnetic>
                    : <Link key={c.href} href={c.href} className="btn border border-eagle/15 hover:border-eagle">{c.label}</Link>
                ))}
              </nav>
              <p className="eyebrow mt-10 text-ash">{s.mantra}</p>
            </Reveal>
          </div>
          <div className="relative -mx-4 h-[62svh] sm:mx-0 lg:col-span-5 lg:h-[86svh]">
            {/* TODO: Replace with Google Drive asset -> "Bold Coloured Studio Shot" (swap in /admin → Media → hero) */}
            <Parallax src={m.hero.url} alt={m.hero.alt} priority sizes="(min-width:1024px) 40vw, 100vw" position="center 30%" className="h-full w-full sm:rounded-[28px]" />
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-y border-eagle/10 bg-sky py-10" aria-label="Proof">
        <div className="wrap mb-8 flex items-baseline gap-4">
          <span className="display text-[clamp(2.5rem,5vw,4rem)] leading-none">{years}</span>
          <span className="text-ash">years building brands, since Mascot Arthouse in 2004.</span>
        </div>
        <Ticker items={institutions} />
      </section>

      {/* 2 · Story */}
      <section className="wrap grid items-center gap-12 py-28 sm:py-40 lg:grid-cols-12">
        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full bg-eagle lg:col-span-4">
          <Image src={m.portrait.url} alt={m.portrait.alt} fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover" />
        </div>
        <Reveal className="lg:col-span-7 lg:col-start-6">
          <Colons label="01 · Story" className="mb-6 text-red" />
          <p className="display text-h2">It started with a pencil in Calabar. <span className="text-ash">Two decades later, he builds brands to build lives.</span></p>
          <Link href="/story" className="link-u mt-10 inline-block text-sm font-semibold">Read the story <span aria-hidden>→</span></Link>
        </Reveal>
      </section>

      {/* 3 · Work */}
      <section className="bg-obsidian py-28 text-sky sm:py-40">
        <div className="wrap">
          <Chapter n={2} label="Work" title="Three ways to work together." href="/work" cta="See the work" />
          <ul className="border-t border-sky/10">
            {offers.map((o, i) => (
              <li key={o.slug}>
                <Link href={`/work#${o.slug}`} className="group grid gap-2 border-b border-sky/10 py-8 sm:grid-cols-12 sm:items-baseline">
                  <span className="text-sm text-red sm:col-span-1">0{i + 1}</span>
                  <span className="display text-h3 transition-transform duration-700 ease-expo group-hover:translate-x-2 sm:col-span-6">{o.title}</span>
                  <span className="text-sky/60 sm:col-span-5">{o.who}</span>
                </Link>
              </li>
            ))}
          </ul>
          {caseStudy && (
            <Link href={`/work/${caseStudy.slug}`} className="group mt-16 flex flex-col justify-between gap-6 rounded-[28px] bg-sky/5 p-8 sm:flex-row sm:items-end sm:p-12">
              <div>
                <p className="eyebrow text-sky/50">Case study · {caseStudy.client}</p>
                <p className="display mt-4 text-h2 transition-colors group-hover:text-red">{caseStudy.title}</p>
                <p className="mt-3 max-w-lg text-sky/60">{caseStudy.summary}</p>
              </div>
              <span className="text-sm font-semibold">Read the case <span aria-hidden>→</span></span>
            </Link>
          )}
        </div>
      </section>

      {/* 4 · Impact */}
      <section className="wrap py-28 sm:py-40">
        <Chapter n={3} label="Impact" title="Building people, not just brands." href="/impact" cta="See the impact" />
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <Link href={`/impact/${cause.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[28px] bg-paper lg:col-span-6">
            <Image src={cause.image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-1000 ease-expo group-hover:scale-105" />
          </Link>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            {impactNumbers[0] && (
              <p className="mb-8"><span className="display block text-[clamp(3rem,6vw,5rem)] leading-none">{impactNumbers[0].value}</span><span className="text-ash">{impactNumbers[0].label} · as of {impactNumbers[0].asOf}</span> {impactNumbers[0].sample && <SampleTag className="ml-1" />}</p>
            )}
            <p className="eyebrow text-ash">{cause.since}</p>
            <h3 className="display mt-3 text-h3">{cause.name}</h3>
            <p className="mt-4 text-xl text-ash">{cause.line}</p>
            <Link href={`/impact/${cause.slug}`} className="btn-dark mt-8">{cause.cta} <span aria-hidden>→</span></Link>
          </Reveal>
        </div>
      </section>

      {/* 5 · Hearticles */}
      <section className="bg-paper py-28 sm:py-40">
        <div className="wrap">
          <Chapter n={4} label="Hearticles" title="Articles with a heart." href="/hearticles" cta="All Hearticles" />
          <div className="grid gap-6 lg:grid-cols-12">
            {latest && <div className="lg:col-span-7"><PostCard p={latest} big /></div>}
            {thought && (
              <Link href={`/hearticles/deep-thoughts/${thought.slug}`} className="group flex aspect-[4/5] flex-col justify-between rounded-[28px] bg-eagle p-8 text-sky lg:col-span-4 lg:col-start-9 lg:aspect-auto">
                <Colons label="Deep Thought" className="text-red" />
                <p className="display text-h2 leading-tight transition-colors group-hover:text-red">{thought.text}</p>
                <span className="text-sm text-sky/60">Swipe more on Hearticles →</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 6 · Let's talk */}
      <section className="relative overflow-hidden bg-sky">
        <div className="wrap grid gap-16 py-28 sm:py-40 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Colons label="05 · Let's talk" className="mb-6 text-red" />
            <Kinetic as="h2" words={["Let's", "build", "what's", "next."]} className="display text-mega" />
            <Reveal delay={0.4}>
              <div className="mt-10"><Magnetic><Link href="/contact" className="btn-dark">Let&apos;s talk <span aria-hidden>→</span></Link></Magnetic></div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4 text-ash">Or get the next Hearticle first</p>
            <SignupForm intent="Newsletter" />
          </div>
        </div>
      </section>
    </>
  );
}
