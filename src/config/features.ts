/**
 * VALOR — feature flags.
 *
 * A section behind a flag renders nothing until the real content exists.
 * Nothing is ever faked or mocked — flip a flag to true only once you have
 * the genuine content (real reviews, real case studies).
 */
export const FEATURES = {
  // 4.8 References & reviews. The section renders nothing while this is false.
  // Flip to true only when real reviews exist. // TODO: real content required
  reviews: false,
} as const;
