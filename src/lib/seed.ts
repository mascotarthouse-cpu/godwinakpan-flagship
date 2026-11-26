// Built-in content. The site runs on this until a database is connected,
// and `npm run db:seed` copies it into Postgres so it can be edited in /admin.

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover: string;
  category: string;
  tags: string[];
  source: "native" | "medium";
  canonicalUrl: string;
  status: "draft" | "scheduled" | "published";
  publishAt: string;
  readMinutes: number;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  discipline: "Brand" | "M&E";
  year: string;
  summary: string;
  result: string;
  image: string;
};

/** Hearticles series. A series gets its own hub page (/hearticles/[series]) once it holds five pieces. */
export const SERIES = ["Disruptive Branding", "Disruptive Technology", "How Things Work", "Insight", "Deep Thoughts"] as const;
export const CATEGORIES = SERIES;
export const seriesSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const site = {
  name: "Godwin Akpan",
  title: "Barr. Godwin Akpan",
  url: process.env.SITE_URL || "https://www.godwinakpan.si",
  mantra: "Do. Disrupt. Dominate. Win!™",
  mantraWords: ["Do.", "Disrupt.", "Dominate.", "Win!™"],
  philosophy: "Purpose over pleasure.",
  descriptor: "Disruptive Brand Architect",
  /** Home hero line. */
  heroLine: "I build brands that breathe. Brands that breathe build lives.",
  description:
    "Barr. Godwin Akpan is a Disruptive Brand Architect and founder of Mascot Arthouse. He builds brands that breathe. Do. Disrupt. Dominate. Win!™",
  email: "godwin-akpan@outlook.com",
  phone: "+234 803 639 3737",
  location: "Uyo, Nigeria",
  medium: "thegodwinakpan",
  reelUrl: "",
  whatsapp: "https://wa.me/2348036393737", // WhatsApp chat on Let's talk
  whatsappChannel: "", // WhatsApp Channel link for Subscribe. Until set, Subscribe offers a WhatsApp message instead.
  bookingUrl: "", // Calendly or similar. Until set, Let's talk shows its own call-request calendar.
  resumeUrl: "https://drive.google.com/drive/folders/1U--sGhvPAWdS3XLlbkkv9V9lZit_jcrd", // TODO: point to a profile PDF
  replyTime: "two working days", // TODO: paste a YouTube or Vimeo link to the keynote reel in /admin → Settings
  socials: [
    { label: "Instagram", href: "https://instagram.com/thegodwinakpan" },
    { label: "LinkedIn", href: "https://linkedin.com/in/thegodwinakpan" },
    { label: "X", href: "https://x.com/thegodwinakpan" },
    { label: "Medium", href: "https://medium.com/@thegodwinakpan" },
  ],
};

// Image slots. Swap any of these from /admin → Media.
export const media: Record<string, { label: string; url: string; alt: string }> = {
  hero: { label: "Home hero (studio shot)", url: "/media/hero-standing.webp", alt: "Godwin Akpan in white, studio portrait" }, // TODO: Replace with Google Drive asset -> "Bold Coloured Studio Shot"
  portrait: { label: "Official portrait", url: "/media/portrait-official.webp", alt: "Official portrait of Godwin Akpan" },
  head: { label: "Philosophy: Head", url: "/media/profile-side.webp", alt: "Godwin Akpan in profile, looking up" },
  heart: { label: "Philosophy: Heart", url: "/media/seated-floor.webp", alt: "Godwin Akpan seated, smiling" },
  hand: { label: "Philosophy: Hand", url: "/media/seated-chair.webp", alt: "Godwin Akpan seated in an armchair" },
  reel: { label: "Keynote reel poster", url: "/media/profile-side.webp", alt: "Keynote reel" }, // TODO: Replace with keynote stage photo from Drive
  speaking: { label: "Speaking", url: "/media/seated-chair.webp", alt: "Godwin Akpan seated" },
  contact: { label: "Contact", url: "/media/seated-stool.webp", alt: "Godwin Akpan on a stool" },
};

export const institutions = [
  "Mascot Arthouse",
  "Harvard Business School Online",
  "Institute for National Transformation",
  "Pan-Atlantic University",
  "University of Cumbria",
  "FASU All Africa University Games",
  "Starcomms",
];

export const projects: Project[] = [
  // TODO: Replace each image with the project's own photography from Drive.
  { slug: "dalal-agri-resort", title: "Dalal Agri Resort", client: "Dalal Agri Resort, The Gambia", discipline: "Brand", year: "", summary: "A destination brand rooted in land, hospitality and growth.", result: "Identity, positioning and launch system.", image: "" },
  { slug: "fasu-games", title: "11th FASU Games", client: "FASU All Africa University Games", discipline: "Brand", year: "", summary: "A continental sporting event, branded to feel like Africa at its best.", result: "Event identity and visual system.", image: "" },
  { slug: "brandos", title: "BrandOS", client: "Mascot Arthouse", discipline: "Brand", year: "", summary: "An operating system for building brands with discipline.", result: "Framework, tools and training.", image: "" },
];

// `about` is the longer story on each initiative's own page (/impact/[slug]). TODO: write it.
export const initiatives = [
  { slug: "ibd", name: "Ifiok Beyond Design", short: "IBD", since: "Est. 2016", line: "A global community that mentors and upskills creatives.", cta: "Join the community", image: "/media/seated-floor.webp", about: "" },
  { slug: "the-shift", name: "THE SHIFT", short: "SHIFT", since: "Annual · Uyo", line: "A youth empowerment and leadership symposium.", cta: "Attend or partner", image: "/media/hero-standing.webp", about: "" },
  { slug: "dorathy-akpan-foundation", name: "Dorathy Akpan Foundation", short: "DAF", since: "Executive Director", line: "Charity and community impact, in her name.", cta: "Support the work", image: "/media/seated-stool.webp", about: "" },
  { slug: "rebrand-nigeria", name: "RebrandNigeria", short: "RebrandNigeria", since: "Nation branding", line: "What the next decade of Nigerian brands must get right.", cta: "Join the conversation", image: "/media/profile-side.webp", about: "" }, // TODO: confirm the one-line description
];
// TODO: Replace initiative images with event and community photos from Drive.

export const timeline = [
  { when: "Calabar", title: "Ase Ndise Ano Pencil", detail: "Early creative roots. The pencil came first." },
  { when: "2004", title: "Founded Mascot Arthouse", detail: "A brand strategy and design studio." },
  { when: "2016", title: "Founded Ifiok Beyond Design", detail: "Mentorship and upskilling for creatives." },
  { when: "Education", title: "British Project Management College", detail: "Project management." },
  { when: "Education", title: "Pan-Atlantic University", detail: "Executive education." },
  { when: "Education", title: "Institute for National Transformation", detail: "Oak Seed, Class 049." },
  { when: "Education", title: "Harvard Business School Online", detail: "Disruptive Strategy." },
  { when: "Education", title: "University of Cumbria", detail: "MBA, Media Leadership." },
];

export const roles = [
  "Founder & Chief Creative Officer, Mascot Arthouse",
  "Disruptive Brand Architect",
  "Founder, Ifiok Beyond Design",
  "Convener, THE SHIFT",
  "Executive Director, Dorathy Akpan Foundation",
];

export const topics = [
  { title: "Do. Disrupt. Dominate. Win!", line: "How bold brands are really built." },
  { title: "Purpose over pleasure", line: "Leadership that outlasts the applause." },
  { title: "Brands are built in the gaps", line: "Trust is won between the big moments." },
  { title: "Rebranding Nigeria", line: "What the next decade of African brands must get right." },
];

/** Let's talk topics, each with its own qualifying prompt. The first three match the offers on Work. */
export const intents = ["Brand transformation", "Institutional & nation branding", "Leadership & creative economy", "Speaking", "Mentorship", "Partnership", "Press"] as const;
export const intentPrompts: Record<string, string> = {
  "Brand transformation": "Your company, where it is now (launching, rebranding or scaling), and your timeline",
  "Institutional & nation branding": "Your institution, its mandate, and the story you need people to believe",
  "Leadership & creative economy": "Who it's for, a personal brand session or a masterclass, and when",
  Speaking: "Event, date, city, audience size and the topic you have in mind",
  Mentorship: "What you create, where you are now, and what you want to learn",
  Partnership: "Which initiative, and how you'd like to help",
  Press: "Outlet, deadline and what the piece is about",
};
/** Not shown in the contact picker; used by newsletter and book sign-ups so they land in /admin → Inquiries. */
export const signupIntents = ["Newsletter", "Book chapter", "Mentorship application", "Free download", "Order", "Call request"] as const;

/* ---------- Final sitemap: Story · Work · Impact · Hearticles, Let's talk always in reach ---------- */

/** Three offers, one per pillar. Each "Start with" opens Let's talk with the offer chosen. Four deliverables at most. */
export const offers = [
  {
    slug: "brand-transformation",
    title: "Disruptive Brand Transformation",
    who: "Founders and companies launching, rebranding or ready to scale.",
    gets: ["Brand strategy blueprint: vision and positioning", "Naming and rebrands", "Visual identity, packaging and product architecture, with an interactive brand guide on BrandOS", "Campaigns, website strategy and creative direction to launch it"],
    start: "Start with a brand audit",
    intent: "Brand transformation",
  },
  {
    slug: "nation-branding",
    title: "Institutional, Civic and Nation Branding",
    who: "Governments, public institutions, NGOs and organisations with a public mandate.",
    gets: ["Strategic narrative and nation branding", "Reputation, PR, and corporate and internal communications", "Public-space beautification", "Fundraising strategy, archival documentation and publishing"],
    start: "Start with a strategic narrative session",
    intent: "Institutional & nation branding",
  },
  {
    slug: "leadership",
    title: "Leadership and the Creative Economy",
    who: "Leaders and public figures, and organisations growing creative teams.",
    gets: ["Personal branding for leaders", "Masterclasses and workshops"],
    start: "Start with a personal brand session",
    intent: "Leadership & creative economy",
    also: [["Free creative mentoring", "/impact/ibd"], ["Youth leadership: THE SHIFT", "/impact/the-shift"], ["The Brand Bible", "/shop/brand-bible"]],
  },
] as const;

/** Godwin's companies, shown on Work. TODO: add a one-line description and link for Brand Myspace and Ecohaven. */
export const companies = [
  { name: "Mascot Arthouse", since: "Since 2004", role: "Founder & Chief Creative Officer", line: "Brand strategy and design studio.", url: "" },
  { name: "Brand Myspace", since: "Sample", role: "", line: "Venture by Godwin Akpan. Add its one-line description.", url: "" },
  { name: "Ecohaven", since: "Sample", role: "", line: "Venture by Godwin Akpan. Add its one-line description.", url: "" },
];

/** Impact numbers for /impact, each with an "as of" date. `sample: true` shows a Sample tag until real, verified figures replace them. */
export const impactNumbers: { value: string; label: string; asOf: string; sample?: boolean }[] = [
  { value: "1,000+", label: "creatives mentored", asOf: "Nov 2026", sample: true },
  { value: "10", label: "editions of THE SHIFT", asOf: "Nov 2026", sample: true },
  { value: "5,000+", label: "young people reached", asOf: "Nov 2026", sample: true },
  { value: "20+", label: "communities served", asOf: "Nov 2026", sample: true },
];

/** Testimonials. Each one is shown once, on the page where it proves the most. Replace the samples with real ones (full name, role, photo). */
export const voices: { quote: string; name: string; role: string; photo: string; page: "story" | "work" | "speaking" | "impact"; sample?: boolean }[] = [
  { quote: "Godwin saw the brand we could become before we did, then built the system to get us there.", name: "Client name", role: "Founder, Company", photo: "", page: "work", sample: true },
  { quote: "Clear, bold and practical. Our team still uses the playbook every week.", name: "Client name", role: "Director, Organisation", photo: "", page: "work", sample: true },
  { quote: "He didn't just speak. He moved the room to act.", name: "Organiser name", role: "Event, City", photo: "", page: "speaking", sample: true },
  { quote: "A mentor who gives his time freely and expects excellence back.", name: "Mentee name", role: "Designer, Ifiok Beyond Design", photo: "", page: "impact", sample: true },
  { quote: "Purpose over pleasure isn't a slogan for him. It's how he works.", name: "Colleague name", role: "Role, Organisation", photo: "", page: "story", sample: true },
];

/** Podcast. Sample episodes until real ones are added (audioUrl takes an MP3 link). */
export const podcast = {
  name: "The Hearticles Podcast",
  line: "Short conversations on brands that breathe, leadership and building lives.",
  sample: true,
  platforms: [["Spotify", ""], ["Apple Podcasts", ""], ["YouTube", ""]] as [string, string][],
};
export const episodes: { slug: string; n: number; title: string; summary: string; minutes: number; audioUrl: string; notes: string; sample?: boolean }[] = [
  { slug: "brands-that-breathe", n: 5, title: "Brands that breathe", summary: "What makes a brand feel alive, and why it builds lives.", minutes: 18, audioUrl: "", notes: "Sample show notes. Replace with the real episode's notes and transcript.", sample: true },
  { slug: "rebranding-nigeria", n: 4, title: "Rebranding Nigeria", summary: "What the next decade of African brands must get right.", minutes: 24, audioUrl: "", notes: "Sample show notes.", sample: true },
  { slug: "brands-are-built-in-the-gaps", n: 3, title: "Brands are built in the gaps", summary: "Trust is won between the big moments.", minutes: 15, audioUrl: "", notes: "Sample show notes.", sample: true },
  { slug: "purpose-over-pleasure", n: 2, title: "Purpose over pleasure", summary: "Leadership that outlasts the applause.", minutes: 21, audioUrl: "", notes: "Sample show notes.", sample: true },
  { slug: "do-disrupt-dominate-win", n: 1, title: "Do. Disrupt. Dominate. Win!", summary: "How bold brands are really built.", minutes: 20, audioUrl: "", notes: "Sample show notes.", sample: true },
];

/** Press releases for /press/[slug]. */
export const releases: { slug: string; date: string; title: string; body: string; sample?: boolean }[] = [
  {
    slug: "new-website",
    date: "2026-11-26",
    title: "Barr. Godwin Akpan launches his new website",
    body: "Uyo, Nigeria. Barr. Godwin Akpan, Disruptive Brand Architect and founder of Mascot Arthouse, has launched a new website bringing together his story, his work with founders, institutions and nations, his impact initiatives and Hearticles, his writing.\n\nThe site introduces three ways to work with him: Disruptive Brand Transformation; Institutional, Civic and Nation Branding; and Leadership and the Creative Economy.\n\n*Sample release. Edit before sending to the press.*",
    sample: true,
  },
];

/** Sample piece ideas shown on a series page until it holds three real pieces. */
export const seriesSamples: Record<string, string[]> = {
  "Disruptive Branding": ["Why your logo is not your brand", "The audit every brand should run once a year", "Naming a company people remember"],
  "Disruptive Technology": ["What AI changes for brand builders", "Digital trust in African markets", "Tools every creative team should master"],
  "How Things Work": ["How a rebrand actually happens", "How nation brands are built", "How a brand guide saves money"],
  Insight: ["What Nigeria's next decade needs from its brands", "Lessons from the FASU Games", "Public spaces that tell a story"],
  "Deep Thoughts": ["Purpose over pleasure", "Document it", "There is no neutral"],
};

/** Board and advisory roles for Story. Empty until added. */
export const boards: { when: string; title: string; detail: string }[] = [];

/** Deep Thoughts: one line each, with its own page and share image. */
export const thoughts = [
  { slug: "purpose-over-pleasure", text: "Purpose over pleasure." },
  { slug: "document-it", text: "You can use your story. Document it." },
  { slug: "no-neutral", text: "Your brand is either building trust or leaking it. There is no neutral." },
  { slug: "ideas-ship", text: "Ideas only count when they ship." },
  { slug: "do-disrupt", text: "Do. Disrupt. Dominate. Win!" },
];

export type Product = { slug: string; kind: "Free" | "Books" | "Courses" | "Tools" | "Merch"; title: string; promise: string; cover: string; about: string; buyUrl: string; buyLabel: string; price: string };
/** Shop. Chips with no products stay hidden. Free items unlock with an email. */
export const products: Product[] = [
  {
    slug: "brand-bible",
    kind: "Books",
    title: "The Brand Bible", // TODO: confirm the title, cover, blurb, price and buy link
    promise: "The playbook for building a brand people trust.",
    cover: "",
    about:
      "Describe the book in two or three short paragraphs: who it is for, the problem it solves, and what makes it different.\n\n*Placeholder. Replace it in `src/lib/seed.ts` (products).*",
    buyUrl: "",
    buyLabel: "Buy the book",
    price: "₦15,000", // Sample price. TODO: confirm
  },
];
/** Kept for older imports. */
export const book = products[0];

/** Draft legal copy for /legal. Review before launch, including what Nigeria's Data Protection Act requires. */
export const legal = {
  privacy:
    "This site collects only what you send through its forms: your name, email address, organisation and message when you get in touch or apply for mentorship, and your email address when you subscribe or unlock a free download. It is used to reply to you and to send what you asked for, and is never sold.\n\nMessages are stored in the site's database and may be forwarded by email. You can ask for your details to be corrected or deleted at any time by emailing the address on the Let's talk page. We handle personal data in line with Nigeria's Data Protection Act 2023 and, for visitors in Europe, the GDPR.\n\nHearts you give to Hearticles are remembered only in your own browser. Questions you type into Ask Ifiok are sent to our AI provider to write the answer, are not stored by this site, and should not include personal or sensitive details.\n\n*Draft. Have it reviewed before launch.*",
  terms:
    "Everything on this site, including essays, photographs and the Godwin Akpan identity, belongs to Barr. Godwin Akpan unless stated otherwise. You may share links and short quotes with credit. Ask before reusing anything else.\n\n*Draft. Review before launch.*",
};

export const posts: Post[] = [
  {
    slug: "you-can-use-your-story",
    title: "You can use your story. Document it.",
    excerpt: "Your brand is not hiding in a future success. It is in what you are living through right now.",
    category: "Disruptive Branding",
    tags: ["Personal branding"],
    cover: "/media/seated-floor.webp",
    source: "native",
    canonicalUrl: "",
    status: "published",
    publishAt: "2026-11-16T09:00:00Z",
    readMinutes: 2,
    body: `Most people wait to build a brand until they have something impressive to show. That is backwards.

The people we follow are rarely the ones with perfect results. They are the ones who let us watch the process: the false starts, the late nights, the small wins nobody else noticed.

## Document, don't perform

You do not need to invent content. You need to record what you are already doing:

- The problem you solved this week, and how.
- The mistake you made, and what it taught you.
- The question a client asked that you could not stop thinking about.

> You can use your story. Document it.

Start today. One honest post, one useful takeaway.`,
  },
  {
    slug: "brands-are-built-in-the-gaps",
    title: "Brands are built in the gaps.",
    excerpt: "Trust is not won at the launch. It is won between the big moments, in the places nobody designs for.",
    category: "Disruptive Branding",
    tags: ["Brand strategy"],
    cover: "/media/profile-side.webp",
    source: "native",
    canonicalUrl: "",
    status: "published",
    publishAt: "2026-11-15T09:00:00Z",
    readMinutes: 2,
    body: `Everyone designs the launch. The logo reveal, the campaign, the big announcement.

But your brand is decided in the gaps: the reply to a customer's complaint at 11pm, the invoice, the way your team answers the phone, the post you share when nothing is happening.

## Audit the gaps

Pick three moments your customers go through that you have never designed on purpose. For each one, ask: does this build trust, or leak it?

Your brand is either building trust or leaking it. There is no neutral.`,
  },
  {
    slug: "purpose-over-pleasure",
    title: "Purpose over pleasure.",
    excerpt: "The easy choice feels good today. The right one compounds.",
    category: "Insight",
    tags: ["Leadership"],
    cover: "/media/seated-chair.webp",
    source: "native",
    canonicalUrl: "",
    status: "published",
    publishAt: "2026-11-14T09:00:00Z",
    readMinutes: 1,
    body: `Pleasure asks what feels good now. Purpose asks what will still matter in ten years.

## Choose the compounding option

Every leader faces the same daily trade: comfort today, or progress that compounds. Pick the one your future self will thank you for.

*Placeholder essay. Edit or replace it in /admin.*`,
  },
];
