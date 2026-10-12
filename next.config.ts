import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so a stray lockfile elsewhere on the machine
  // doesn't confuse Turbopack's root inference.
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Pages removed in the infrastructure rebuild. Keep old links (and any
  // search-indexed URLs) alive by redirecting to their nearest replacement.
  async redirects() {
    return [
      { source: "/call", destination: "/", permanent: true },
      { source: "/services", destination: "/infrastructure", permanent: true },
      { source: "/results", destination: "/", permanent: true },
      // Retired verticals from the pre-enterprise site.
      ...["real-estate", "automotive", "hospitality", "finance", "enterprise", "other"].map((slug) => ({
        source: `/industries/${slug}`,
        destination: "/industries",
        permanent: true,
      })),
    ];
  },

  // Cache-Control headers for public assets. /_next/static is deliberately
  // absent: Next already marks hashed production chunks immutable, and an
  // override also applies in dev, where chunk names are stable — browsers then
  // keep serving stale JS/CSS after edits.
  // - /brand/: logo PNGs served from /public — fingerprinted via Next.js
  //   Image at runtime; raw public files get a generous cache.
  // - /video/: large MP4 — revalidate infrequently.
  async headers() {
    // Dev only: an earlier config served dev chunks as immutable for a year, and
    // browsers that cached them keep showing old code. This makes full page
    // loads in dev tell the browser to drop its cache for this origin.
    const devCacheReset =
      process.env.NODE_ENV === "development"
        ? [
            {
              source: "/:path*",
              has: [{ type: "header" as const, key: "accept", value: ".*text/html.*" }],
              headers: [{ key: "Clear-Site-Data", value: '"cache"' }],
            },
          ]
        : [];

    return [
      ...devCacheReset,
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/video/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
