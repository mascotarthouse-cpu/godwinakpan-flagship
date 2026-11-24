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

export const CATEGORIES = ["Disruptive Strategy", "Brand Architecture", "Leadership", "M&E & Governance", "Sparks"] as const;
/** A post in this category is a Spark: a short thought (280 characters or less), shown as a quote card. */
export const SPARK = "Sparks";

export const site = {
  name: "Godwin Akpan",
  title: "Barr. Godwin Akpan",
  url: process.env.SITE_URL || "https://www.godwinakpan.si",
  mantra: "Do. Disrupt. Dominate. Win!™",
  mantraWords: ["Do.", "Disrupt.", "Dominate.", "Win!™"],
  philosophy: "Purpose over pleasure.",
  descriptor: "Disruptive brand strategist",
  description:
    "Barr. Godwin Akpan is a disruptive brand strategist, M&E consultant and founder of Mascot Arthouse. Do. Disrupt. Dominate. Win!™",
  email: "disrupt@godwinakpan.si",
  cvUrl: "", // TODO: upload the public profile / CV PDF and paste its link here (shows a Download CV button on /about)
  phone: "+234 803 639 3737",
  location: "Uyo, Nigeria",
  medium: "thegodwinakpan",
  reelUrl: "", // TODO: paste a YouTube or Vimeo link to the keynote reel in /admin → Settings
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

export const pillars = [
  { key: "head", word: "Head", line: "See further than the brief.", sub: "Strategy starts with the real problem." },
  { key: "heart", word: "Heart", line: "Purpose over pleasure.", sub: "Serve first. The rest follows." },
  { key: "hand", word: "Hand", line: "Then build it. Boldly.", sub: "Ideas only count when they ship." },
];

export const ventures = [
  { title: "Mascot Arthouse", kicker: "Since 2004", line: "Brand strategy and design studio.", href: "/about#ventures", tone: "dark" as const },
  { title: "Monitoring & Evaluation", kicker: "Public sector", line: "Oversight for infrastructure that has to work.", href: "/work?d=M%26E", tone: "light" as const },
  { title: "Brand Architecture", kicker: "Advisory", line: "Clear positions for bold institutions.", href: "/contact?intent=Brand%20Advisory", tone: "red" as const },
];

export const projects: Project[] = [
  // TODO: Replace each image with the project's own photography from Drive.
  { slug: "dalal-agri-resort", title: "Dalal Agri Resort", client: "Dalal Agri Resort, The Gambia", discipline: "Brand", year: "", summary: "A destination brand rooted in land, hospitality and growth.", result: "Identity, positioning and launch system.", image: "" },
  { slug: "fasu-games", title: "11th FASU Games", client: "FASU All Africa University Games", discipline: "Brand", year: "", summary: "A continental sporting event, branded to feel like Africa at its best.", result: "Event identity and visual system.", image: "" },
  { slug: "brandos", title: "BrandOS", client: "Mascot Arthouse", discipline: "Brand", year: "", summary: "An operating system for building brands with discipline.", result: "Framework, tools and training.", image: "" },
  { slug: "infrastructure-oversight", title: "Infrastructure oversight", client: "Public sector", discipline: "M&E", year: "", summary: "Independent monitoring of critical civil works, from plan to handover.", result: "Add the project, scope and outcome in /admin.", image: "" },
  { slug: "programme-evaluation", title: "Programme evaluation", client: "Non-profit", discipline: "M&E", year: "", summary: "Measuring what changed, and what it cost to change it.", result: "Add the project, scope and outcome in /admin.", image: "" },
];

// `about` is the longer story on each initiative's own page (/impact/[slug]). TODO: write it.
export const initiatives = [
  { slug: "ibd", name: "Ifiok Beyond Design", short: "IBD", since: "Est. 2016", line: "A global community that mentors and upskills creatives.", cta: "Join the community", image: "/media/seated-floor.webp", about: "" },
  { slug: "the-shift", name: "THE SHIFT", short: "SHIFT", since: "Annual · Uyo", line: "A youth empowerment and leadership symposium.", cta: "Attend or partner", image: "/media/hero-standing.webp", about: "" },
  { slug: "dorathy-akpan-foundation", name: "Dorathy Akpan Foundation", short: "DAF", since: "Executive Director", line: "Charity and community impact, in her name.", cta: "Support the work", image: "/media/seated-stool.webp", about: "" },
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
  "Disruptive Brand Strategist",
  "Monitoring & Evaluation Consultant",
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

export const intents = ["Brand Advisory", "M&E Consulting", "Speaking Invitation", "Mentorship", "Partnership", "Media/Press"] as const;
/** Not shown in the contact picker; used by newsletter and book sign-ups so they land in /admin → Inquiries. */
export const signupIntents = ["Newsletter", "Book chapter"] as const;

/* ---------- v3 unified sitemap: Head (Ideas) · Heart (Impact) · Hand (Work) ---------- */

/** The three doors. The sticky philosophy story links each word to its page. */
export const doors = { head: "/hearticles", heart: "/impact", hand: "/work" } as const;

/** Work keeps two practices. Ventures (his own companies) live on About. */
export const practices = [
  { key: "Brand", title: "Brand strategy", line: "Clear positions for bold institutions.", includes: ["Brand audits", "Positioning and brand architecture", "Identity systems with Mascot Arthouse"] },
  { key: "M&E", title: "Monitoring & Evaluation", line: "Oversight for infrastructure and programmes that have to work.", includes: ["Independent monitoring of civil works", "Programme evaluation", "Reporting boards and funders can act on"] },
];

/** The usual first step into a brand engagement. */
export const entryOffer = {
  title: "Start with a brand audit.",
  line: "Find where your brand builds trust and where it leaks it. Most engagements begin here.",
};

/** Godwin's own companies, shown on /about#ventures. */
export const companies = [
  { name: "Mascot Arthouse", since: "Since 2004", role: "Founder & Chief Creative Officer", line: "Brand strategy and design studio.", url: "", hire: "/contact?intent=Brand%20Advisory&about=Mascot%20Arthouse" }, // TODO: add the Mascot Arthouse website
  { name: "Ecohaven", since: "Agro & stays", role: "Founder", line: "An agro business, and an Airbnb apartment to stay in.", url: "", hire: "" }, // TODO: add the Ecohaven website or Airbnb listing link
];

/** Board and advisory roles for /about. Empty until added. */
export const boards: { when: string; title: string; detail: string }[] = [];

/** The book. TODO: replace every field with the real title, cover, blurb and Selar or Paystack link. */
export const book = {
  title: "Your book title",
  promise: "One line on what a reader will be able to do after reading it.",
  cover: "",
  about:
    "Describe the book in two or three short paragraphs: who it is for, the problem it solves, and what makes it different.\n\n*Placeholder. Replace it in `src/lib/seed.ts` (book).*",
  buyUrl: "",
  buyLabel: "Buy the book",
};

/** Draft legal copy for /legal. Review before launch, including what Nigeria's Data Protection Act requires. */
export const legal = {
  privacy:
    "This site collects only what you send through its forms: your name, email address, organisation and message when you get in touch, and your email address when you subscribe or ask for the book's first chapter. It is used to reply to you and to send what you asked for, and is never sold.\n\nMessages are stored in the site's database and may be forwarded by email. To have your details corrected or deleted, email the address on the Contact page.\n\n*Draft. Review before launch, including what Nigeria's Data Protection Act requires.*",
  terms:
    "Everything on this site, including essays, photographs and the Godwin Akpan identity, belongs to Barr. Godwin Akpan unless stated otherwise. You may share links and short quotes with credit. Ask before reusing anything else.\n\n*Draft. Review before launch.*",
};

export const posts: Post[] = [
  {
    slug: "you-can-use-your-story",
    title: "You can use your story. Document it.",
    excerpt: "Your brand is not hiding in a future success. It is in what you are living through right now.",
    category: "Brand Architecture",
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
    category: "Disruptive Strategy",
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
    category: "Leadership",
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

/**
 * Talks given at events. A QR code on stage can point to /stage?from=<slug>: the page then opens
 * with that talk's slides and a booking button. TODO: add each engagement as it happens.
 */
export const engagements: { slug: string; event: string; talk: string; date: string; slidesUrl: string }[] = [];

/** Upcoming events for /impact (and each initiative page when `initiative` matches its slug). Past dates hide themselves. */
export const events: { title: string; date: string; place: string; initiative?: string; url?: string }[] = [];

/** Client words shown under a case study, keyed by project slug. TODO: add real, approved quotes. */
export const testimonials: Record<string, { quote: string; name: string; role: string }> = {};
