import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { industrySlugs } from "@/content/industries";
import { verifiedCaseStudies } from "@/content/caseStudies";

/** Pages that exist in both languages. */
const shared = [
  "",
  "/services",
  "/services/business-automation",
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
  "/imprint",
  ...(verifiedCaseStudies.length > 0 ? ["/case-studies"] : []),
];

const priority = (route: string) =>
  route === "" ? 1 : /^\/(services|industries)/.test(route) ? 0.8 : /\/(privacy|terms|imprint)$/.test(route) ? 0.3 : 0.7;

/**
 * When the site content last changed. Google only trusts lastmod when it is
 * accurate, so this is a fixed date, not the build time: bump it whenever
 * page content changes.
 */
const SITE_UPDATED = new Date("2026-11-12");

/** Every page in both languages, each entry listing its en/sl alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return shared.flatMap((route) => {
    const en = `${brand.url}${route}`;
    const sl = `${brand.url}/sl${route}`;
    const alternates = { languages: { en, sl, "x-default": en } };
    return [en, sl].map((url) => ({
      url,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: priority(route),
      alternates,
    }));
  });
}
