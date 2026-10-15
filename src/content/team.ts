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

/** A profile link. For email use a work address (name@valorai.eu). */
export type Social = { type: "linkedin" | "instagram" | "email"; url: string };

export type TeamMember = {
  name: Dict;
  title: Dict;
  description?: Dict;
  location?: string;
  /** Square headshot (team section). */
  photo?: string;
  /** Portrait (About page founder feature). */
  portrait?: string;
  /** Profile links, shown as round icons; nothing shows while empty. */
  socials?: Social[];
  placeholder?: boolean;
};

/**
 * Size of the development team, as stated by the owner (October 2026):
 * 6 developers, 2 of them core. Shown under the team cards.
 */
export const devTeam = { total: 6, core: 2 };

/**
 * Jošt's LinkedIn profile. The icon appears under his name (team cards on
 * the homepage and About) and in Google's structured data as soon as this is
 * filled in; while empty, nothing shows.
 * // TODO: real content required, owner sends the URL once LinkedIn confirms the profile.
 */
export const FOUNDER_LINKEDIN = "";

export const team: TeamMember[] = [
  {
    name: { en: "Jošt Svetličič", sl: "Jošt Svetličič" },
    title: { en: "Founder", sl: "Ustanovitelj" },
    description: { en: "Strategy, sales, system design", sl: "Strategija, prodaja, zasnova sistemov" },
    location: "Ljubljana · Bali",
    photo: "/team/jost-svetlicic-headshot.webp",
    portrait: "/team/jost-svetlicic-portrait.webp",
    socials: FOUNDER_LINKEDIN ? [{ type: "linkedin", url: FOUNDER_LINKEDIN }] : [],
  },
  // The two core developers, based in Bali.
  {
    name: { en: "Mikhail Onchukov", sl: "Mikhail Onchukov" },
    // Customer side of AI (as described by Misha, October 2026).
    title: { en: "Customer AI developer", sl: "Razvijalec AI za stranke" },
    description: {
      en: "Customer journeys, lead generation, sales and marketing AI, design",
      sl: "Poti strank, pridobivanje strank, AI za prodajo in marketing, oblikovanje",
    },
    location: "Bali",
    photo: "/team/misha.webp",
    socials: [{ type: "linkedin", url: "https://www.linkedin.com/in/mikhail-onchukov-9434b369" }],
  },
  {
    name: { en: "Nikita Antimonov", sl: "Nikita Antimonov" },
    // Technical core of AI (as described by Misha, October 2026).
    title: { en: "AI architect", sl: "AI arhitekt" },
    description: {
      en: "AI architecture, integrations, databases, KYC data",
      sl: "AI arhitektura, integracije, podatkovne baze, KYC podatki",
    },
    location: "Bali",
    photo: "/team/nikita.webp",
    socials: [{ type: "linkedin", url: "https://www.linkedin.com/in/nikita-antimonov-88989424a" }],
  },
];
