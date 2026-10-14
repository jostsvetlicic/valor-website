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
  // content/brands.ts is empty. Off at launch (14 Oct 2026) until each client
  // agrees to be named. // TODO: real content required, client permission
  brandLogos: false,

  // Founder welcome video on the homepage. Off at launch until the music bed
  // ("Bubbles Drop", Cosmonkey) is licensed or replaced.
  // TODO: real content required, music licence
  welcomeFilm: false,

  // "What we've built" case cards. Off until the owner confirms the built and
  // result text in content/references.ts is real and approved for publishing.
  // // TODO: real content required
  references: false,

  // /solutions client references and status badges (Nuanu, Jakarta pilot,
  // NDA work, etc.). Off until VALOR confirms it may claim each one.
  // // TODO: real content required
  solutionReferences: false,

  // Partner network block in the team section (CoreUnlock, InternumAI).
  // Off: the site presents VALOR as one team (owner's call, October 2026).
  partners: false,

  // "Official partners" moving strip on the homepage (content/officialPartners).
  // Only switch on once VALOR's partner status is confirmed in writing and the
  // official badge files are in /public. Previewed on localhost while off.
  // // TODO: real content required
  officialPartners: false,
} as const;
