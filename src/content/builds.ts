/**
 * VALOR — selected builds for the strip below the hero.
 *
 * Only real projects Valor actually built. Ships EMPTY — the strip renders
 * nothing while this is empty (and while FEATURES.selectedBuilds is false).
 * Never invent a project, screenshot or client.
 *
 * Screenshot files live in /public/builds/.
 *
 * // TODO: real content required
 */

export type Build = {
  /** Project name. */
  name: string;
  /** One line describing what it is / what it does. */
  line: string;
  /** Screenshot path under /public, e.g. "/builds/project.jpg". */
  image: string;
  /** Accessible alt text for the screenshot. */
  alt: string;
  /** Optional link to the live site. */
  url?: string;
};

export const builds: Build[] = [];
