/**
 * Official partners shown in the moving strip on the homepage.
 *
 * Showing a company here says VALOR itself is their official partner, so
 * the strip stays OFF on the live site (FEATURES.officialPartners) until the
 * owner confirms VALOR's partner status in writing and supplies the official
 * partner badge or logo files under the partner's brand terms. On localhost
 * it is shown as a preview.
 * // TODO: real content required, written confirmation + official badge files
 *
 * `logoSrc`: path under /public (official files only). Until then the name is
 * shown as a text wordmark.
 */

export type OfficialPartner = {
  name: string;
  /** Small line under the name, e.g. the product. */
  detail?: string;
  logoSrc?: string;
  url?: string;
};

export const officialPartners: OfficialPartner[] = [
  { name: "Anthropic", detail: "Claude" },
  // TODO: owner, confirm the exact product/company name.
  { name: "Notetaker" },
];
