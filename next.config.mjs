/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // v2 narrative sitemap: every old address forwards permanently to its new home.
    const moved = [
      { source: "/insights", destination: "/hearticles", permanent: true },
      { source: "/insights/:slug", destination: "/hearticles/:slug", permanent: true },
      { source: "/ideas", destination: "/hearticles", permanent: true },
      { source: "/ideas/:slug", destination: "/hearticles/:slug", permanent: true },
      { source: "/initiatives", destination: "/impact", permanent: true },
      { source: "/speaking-media", destination: "/stage", permanent: true },
      { source: "/speaking", destination: "/stage", permanent: true },
      { source: "/press", destination: "/stage#press", permanent: true },
    ];
    // One domain forwards to the other. Set PRIMARY_HOST in Netlify (e.g. www.godwinakpan.si).
    const primary = process.env.PRIMARY_HOST;
    if (!primary) return moved;
    const others = (process.env.ALIAS_HOSTS || "godwinakpan.si,godwinakpan.ng,www.godwinakpan.ng,godwinakpan.com,www.godwinakpan.com")
      .split(",").map((h) => h.trim()).filter((h) => h && h !== primary);
    return [...moved, ...others.map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: `https://${primary}/:path*`,
      permanent: true,
    }))];
  },
};
export default nextConfig;
