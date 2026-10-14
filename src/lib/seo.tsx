import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { seo, type PageSeo, type SeoKey } from "@/content/seo";
import { alternates, href, type Locale } from "@/i18n";

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "VALOR, AI automation agency" };

export function fullTitle(page: PageSeo): string {
  return page.absolute ? page.title : `${page.title} | VALOR`;
}

/**
 * Complete metadata for one page: unique title and description, canonical,
 * en/sl alternates, and Open Graph + Twitter tags that repeat the page's own
 * title and description (Next replaces, not merges, a parent's openGraph).
 */
export function pageMetadata(locale: Locale, path: string, page: PageSeo): Metadata {
  const title = fullTitle(page);
  return {
    title: page.absolute ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: alternates(path, locale),
    openGraph: {
      type: "website",
      siteName: "VALOR",
      url: `${brand.url}${href(locale, path) === "/" ? "" : href(locale, path)}`,
      title,
      description: page.description,
      locale: locale === "sl" ? "sl_SI" : "en_GB",
      alternateLocale: locale === "sl" ? ["en_GB"] : ["sl_SI"],
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [OG_IMAGE.url],
    },
  };
}

/** Shorthand for pages listed in content/seo.ts. */
export function seoMetadata(locale: Locale, key: SeoKey, path: string): Metadata {
  return pageMetadata(locale, path, seo[locale][key]);
}

/* ---------------------------------------------------------------- */
/*  JSON-LD                                                         */
/* ---------------------------------------------------------------- */

export type Crumb = { name: string; path: string };

/** BreadcrumbList: Home, then each crumb, all as absolute URLs. */
export function breadcrumbSchema(locale: Locale, crumbs: Crumb[]) {
  const home: Crumb = { name: locale === "sl" ? "Domov" : "Home", path: "/" };
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [home, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${brand.url}${href(locale, c.path) === "/" ? "" : href(locale, c.path)}`,
    })),
  };
}

/** Service schema for a service or industry page. */
export function serviceSchema(locale: Locale, opts: { name: string; description: string; path: string; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: `${brand.url}${href(locale, opts.path)}`,
    inLanguage: locale,
    provider: { "@type": "Organization", "@id": `${brand.url}/#organization`, name: "VALOR" },
    areaServed: [
      { "@type": "Country", name: "Slovenia" },
      { "@type": "Place", name: "European Union" },
    ],
  };
}

/**
 * JSON for an inline <script>: "<" is escaped so no value can ever close the
 * script tag early (defence against injected markup, XSS).
 */
export function safeJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Renders one or more JSON-LD objects. */
export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(d) }} />
      ))}
    </>
  );
}
