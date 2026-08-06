import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so a stray lockfile elsewhere on the machine
  // doesn't confuse Turbopack's root inference.
  turbopack: {
    root: path.resolve(__dirname),
  },

  // The old /call landing page was removed in the infrastructure rebuild.
  // Keep old links alive by sending them to the homepage.
  async redirects() {
    return [
      {
        source: "/call",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
