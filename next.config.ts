import type { NextConfig } from "next";
import path from "node:path";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy: only this site's own files may run or load, plus
 * Plausible (cookie-free analytics). Inline scripts stay allowed because
 * Next.js streams page data in inline <script> tags on static pages (a nonce
 * would force every page to render on each request). Dev adds what hot
 * reload needs ('unsafe-eval', websockets).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://plausible.io${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self' https://plausible.io https://formspree.io${isDev ? " ws: wss:" : ""}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  isDev ? "frame-src 'self'" : "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto: https://formspree.io",
  // Production: never framed (clickjacking). Dev: the site may frame itself,
  // for local layout testing tools.
  isDev ? "frame-ancestors 'self'" : "frame-ancestors 'none'",
  "manifest-src 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

/** Security headers sent with every response. */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // HTTPS only, for two years, including subdomains (production only: it
  // would pin localhost to HTTPS in the browser).
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: isDev ? "SAMEORIGIN" : "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework, and never ship browser source maps
  // (they would expose the original source code).
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

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
      { source: "/:path*", headers: securityHeaders },
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
