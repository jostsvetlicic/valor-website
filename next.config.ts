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
};

export default nextConfig;
