import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { industrySlugs } from "@/content/industries";
import { verifiedCaseStudies } from "@/content/caseStudies";

/** Pages that exist in both languages. */
const shared = [
  "",
  "/infrastructure",
  "/industries",
  ...industrySlugs.map((slug) => `/industries/${slug}`),
  "/process",
  "/how-it-works",
  "/demo",
  "/security",
  "/about",
  "/contact",
  "/solutions",
  "/privacy",
  "/terms",
  ...(verifiedCaseStudies.length > 0 ? ["/case-studies"] : []),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...shared,
    ...shared.map((route) => `/sl${route}`),
  ];
  const now = new Date();
  return routes.map((route) => ({
    url: `${brand.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" || route === "/sl" ? 1 : /\/(privacy|terms)$/.test(route) ? 0.3 : 0.7,
  }));
}
