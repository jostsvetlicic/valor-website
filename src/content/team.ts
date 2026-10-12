/**
 * VALOR core team (partners live in content/partners.ts). Cards show only
 * filled-in fields; nothing is
 * guessed. Add `photo` (path under /public) to replace the initials circle.
 *
 * `placeholder: true` entries are hidden on the site. Replace each with the
 * real name, role and photo, then remove the flag to show it.
 * Earlier mentions, still to be confirmed: Robson (lead developer) and
 * Nikita (developer).
 * // TODO: real content required, developer names and photos.
 */

import type { Dict } from "@/i18n";

export type TeamMember = {
  name: Dict;
  title: Dict;
  description?: Dict;
  location?: string;
  photo?: string;
  placeholder?: boolean;
};

export const team: TeamMember[] = [
  {
    name: { en: "Jošt Svetličič", sl: "Jošt Svetličič" },
    title: { en: "Founder", sl: "Ustanovitelj" },
    description: { en: "Strategy, sales, system design", sl: "Strategija, prodaja, zasnova sistemov" },
    location: "Ljubljana · Bali",
  },
  { name: { en: "Name to be added", sl: "Ime bo dodano" }, title: { en: "Developer", sl: "Razvijalec" }, placeholder: true },
  { name: { en: "Name to be added", sl: "Ime bo dodano" }, title: { en: "Developer", sl: "Razvijalec" }, placeholder: true },
];
