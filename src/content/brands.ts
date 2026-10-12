/**
 * VALOR, client / brand logos for the BrandLogoBar below the hero.
 *
 * Real clients only, never an invented company. Names were supplied by the
 * owner; until a logo file exists the ticker shows the name as a wordmark.
 *
 * Only entries with `verified: true` render, and the whole strip is hidden
 * while none are verified. Set `verified: true` once the client has agreed
 * to be named on the site.
 *
 * Logo files live in /public/brands/ (SVG preferred, or a transparent PNG
 * ~80px tall). Set `logoSrc` to swap a wordmark for the real logo.
 *
 * // TODO: real content required, logo files for each client
 */

export type Brand = {
  /** Company name (used for the alt fallback and the optional link title). */
  name: string;
  /** Path under /public, e.g. "/brands/acme.svg". Omit to show the name. */
  logoSrc?: string;
  /** Optional link to the client's site. */
  url?: string;
  /** Client confirmed and agreed to be shown publicly. */
  verified: boolean;
};

// Client names supplied by the owner, shown at the owner's request (October 2026).
export const brands: Brand[] = [
  { name: "Archimede HK", verified: true },
  { name: "Infraslim", verified: true },
  { name: "Alma Dom", verified: true },
  { name: "Fort Vega", verified: true },
  { name: "Adriatic Estates", verified: true },
  { name: "Marea Charter", verified: true },
  { name: "Dubrovnik Explore", verified: true },
  { name: "Agroinspekt", verified: true },
];

export const verifiedBrands = brands.filter((b) => b.verified);
