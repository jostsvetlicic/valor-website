import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/how-it-works", "/results", "/about", "/contact"];
  const now = new Date();
  return routes.map((route) => ({
    url: `${brand.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
