/**
 * VALOR i18n. English lives at the root (/), Slovenian under /sl. Every
 * translatable string is a `Dict` with one value per locale, kept next to the
 * component or content that uses it.
 */

export const locales = ["en", "sl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Dict<T = string> = Record<Locale, T>;

/** Locale-aware internal link: href("sl", "/process") gives "/sl/process". */
export function href(locale: Locale, path: string): string {
  if (locale === "en") return path;
  if (path === "/") return "/sl";
  if (path.startsWith("/#")) return `/sl${path.slice(1)}`;
  return `/sl${path}`;
}

export function localeFromPath(pathname: string | null | undefined): Locale {
  if (!pathname) return defaultLocale;
  return pathname === "/sl" || pathname.startsWith("/sl/") || pathname.startsWith("/sl#") ? "sl" : "en";
}

/** The same page in the other language. */
export function switchPath(pathname: string, to: Locale): string {
  const base = localeFromPath(pathname) === "sl" ? pathname.replace(/^\/sl(?=\/|$)/, "") || "/" : pathname;
  return href(to, base);
}

/** Alternates block for page metadata (hreflang). */
export function alternates(path: string, locale: Locale) {
  return {
    canonical: href(locale, path),
    languages: { en: href("en", path), sl: href("sl", path), "x-default": href("en", path) },
  };
}
