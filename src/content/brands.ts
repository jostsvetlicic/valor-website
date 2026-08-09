/**
 * VALOR — client / brand logos for the BrandLogoBar below the hero.
 *
 * Ships EMPTY. The bar renders nothing while this is empty (and while
 * FEATURES.brandLogos is false). Never add a placeholder, grey box, sample SVG
 * or invented company — an empty array means the strip renders nothing.
 *
 * Logo files live in /public/brands/. See the README note in the component for
 * the exact format and dimensions to supply.
 *
 * // TODO: real content required
 */

export type Brand = {
  /** Company name (used for the alt fallback and the optional link title). */
  name: string;
  /** Path under /public, e.g. "/brands/acme.svg". */
  logoSrc: string;
  /** Accessible alt text, e.g. "Acme". */
  alt: string;
  /** Optional link to the client's site. */
  url?: string;
};

export const brands: Brand[] = [];
