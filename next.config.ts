import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so a stray lockfile elsewhere on the machine
  // doesn't confuse Turbopack's root inference.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
