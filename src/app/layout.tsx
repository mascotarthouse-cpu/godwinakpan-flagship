import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Chrome from "@/components/Chrome";
import { getSettings } from "@/lib/content";
import { site } from "@/lib/seed";

// Display: Area Normal when licensed (add @font-face for "Area Normal" and put it first in --f-display).
const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--f-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--f-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.title} · ${site.mantra}`, template: `%s · Godwin Akpan` },
  description: site.description,
  openGraph: { type: "website", siteName: "Godwin Akpan", images: ["/og.png"], locale: "en_NG" },
  twitter: { card: "summary_large_image", creator: "@thegodwinakpan", images: ["/og.png"] },
  icons: { icon: "/media/favicon.svg" },
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } },
};

export const viewport: Viewport = { themeColor: "#000000" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Godwin Akpan",
    honorificPrefix: "Barr.",
    jobTitle: "Disruptive Brand Strategist",
    url: s.url,
    image: `${s.url}/media/portrait-official.webp`,
    worksFor: { "@type": "Organization", name: "Mascot Arthouse" },
    address: { "@type": "PostalAddress", addressLocality: "Uyo", addressCountry: "NG" },
    sameAs: s.socials.map((x) => x.href),
  };
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-eagle focus:px-4 focus:py-2 focus:text-sky">Skip to content</a>
        <SmoothScroll />
        <Cursor />
        <Header socials={s.socials} />
        <main id="main">{children}</main>
        <Chrome><Footer s={s} /></Chrome>
      </body>
    </html>
  );
}
