import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { industrySlugs } from "@/content/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/infrastructure",
    "/industries",
    ...industrySlugs.map((slug) => `/industries/${slug}`),
    "/process",
    "/about",
    "/contact",
  ];
  const now = new Date();
  return routes.map((route) => ({
    url: `${brand.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
