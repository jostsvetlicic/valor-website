/**
 * VALOR — feature flags.
 *
 * A section behind a flag renders nothing until the real content exists.
 * Nothing is ever faked or mocked — flip a flag to true only once you have
 * the genuine content (real reviews, real project screenshots, real logos).
 */
export const FEATURES = {
  // References & reviews. Renders nothing while false.
  // Flip to true only when real reviews exist. // TODO: real content required
  reviews: false,

  // "Selected builds" strip below the hero (real project screenshots).
  // Renders nothing while false OR while content/builds.ts is empty.
  // // TODO: real content required
  selectedBuilds: false,

  // Brand / client logo bar below the hero. Renders nothing while false OR
  // while content/brands.ts is empty. // TODO: real content required
  brandLogos: false,
} as const;
