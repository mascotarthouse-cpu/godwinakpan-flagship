/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // Final sitemap: every older address forwards permanently to its new home.
    const moved = [
      ["/about", "/story"],
      ["/ideas", "/hearticles"],
      ["/ideas/:slug", "/hearticles/:slug"],
      ["/insights", "/hearticles"],
      ["/insights/:slug", "/hearticles/:slug"],
      ["/initiatives", "/impact"],
      ["/speaking-media", "/speaking"],
      ["/newsletter", "/subscribe"],
      ["/legal", "/privacy"],
      ["/book", "/shop/brand-bible"],
      ["/mentorship", "/impact/ibd#apply"],
    ].map(([source, destination]) => ({ source, destination, permanent: true }));
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
