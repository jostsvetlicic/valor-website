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
      { source: "/how-it-works", destination: "/process", permanent: true },
      { source: "/services", destination: "/infrastructure", permanent: true },
      { source: "/results", destination: "/", permanent: true },
    ];
  },

  // Cache-Control headers for static assets.
  // - _next/static: content-hashed filenames, safe to cache for 1 year.
  // - /brand/: logo PNGs served from /public — fingerprinted via Next.js
  //   Image at runtime; raw public files get a generous cache.
  // - /video/: large MP4 — revalidate infrequently.
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
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
