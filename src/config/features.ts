/**
 * VALOR, feature flags.
 *
 * A section behind a flag renders nothing until the real content exists.
 * Nothing is ever faked or mocked, flip a flag to true only once you have
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

  // Client logo ticker below the hero. Renders nothing while false OR while
  // content/brands.ts is empty.
  brandLogos: true,

  // "What we've built" case cards. Off until the owner confirms the built and
  // result text in content/references.ts is real and approved for publishing.
  // // TODO: real content required
  references: false,

  // /solutions client references and status badges (Nuanu, Jakarta pilot,
  // NDA work, etc.). Off until VALOR confirms it may claim each one.
  // // TODO: real content required
  solutionReferences: false,
} as const;
