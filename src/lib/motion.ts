/**
 * Site-wide motion policy. The site's motion is gentle (fades, short rises,
 * slow loops), and the owner wants it to play for every visitor, including
 * those with the OS "reduce motion" setting (decision of 15 Oct 2026). Every
 * script asks this helper instead of reading the media query itself, so
 * switching HONOR_REDUCED_MOTION to true restores the reduced behaviour in
 * the scripts (the CSS rules for it are in git history, commit ce0370e).
 */
export const HONOR_REDUCED_MOTION = false;

export function prefersReducedMotion(): boolean {
  return (
    HONOR_REDUCED_MOTION &&
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
