/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // One domain forwards to the other. Set PRIMARY_HOST in Netlify (e.g. www.godwinakpan.si).
    const primary = process.env.PRIMARY_HOST;
    if (!primary) return [];
    const others = (process.env.ALIAS_HOSTS || "godwinakpan.si,godwinakpan.ng,www.godwinakpan.ng,godwinakpan.com,www.godwinakpan.com")
      .split(",").map((h) => h.trim()).filter((h) => h && h !== primary);
    return others.map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: `https://${primary}/:path*`,
      permanent: true,
    }));
  },
};
export default nextConfig;
