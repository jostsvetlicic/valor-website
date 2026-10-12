/**
 * Case studies with minutes measured before and after (from one-week tests
 * and pilots). Only `verified: true` entries render; while none are verified
 * the homepage section is hidden and /case-studies returns 404.
 * // TODO: real content required, add measured case studies.
 *
 * Example shape (do not publish invented numbers):
 * {
 *   slug: "distributor-orders",
 *   verified: true,
 *   industry: { en: "Wholesale and distribution", sl: "Veleprodaja in distribucija" },
 *   client: { en: "Building materials distributor, Slovenia", sl: "Distributer gradbenega materiala, Slovenija" },
 *   documents: { en: "Customer orders by email and PDF", sl: "Naročila kupcev po e-pošti in v PDF" },
 *   challenge: { en: "...", sl: "..." },
 *   built: { en: "...", sl: "..." },
 *   minutesBefore: 0,
 *   minutesAfter: 0,
 *   volume: { perMonth: 0, unit: { en: "orders", sl: "naročil" } },
 *   timeline: { en: "Pilot in 4 weeks", sl: "Pilot v 4 tednih" },
 * }
 */

import type { Dict } from "@/i18n";

export type CaseStudy = {
  slug: string;
  verified: boolean;
  industry: Dict;
  client: Dict;
  documents: Dict;
  challenge: Dict;
  built: Dict;
  /** Minutes per document by hand, measured. */
  minutesBefore: number;
  /** Minutes per document with the agent, measured. */
  minutesAfter: number;
  volume?: { perMonth: number; unit: Dict };
  timeline?: Dict;
};

export const caseStudies: CaseStudy[] = [];

export const verifiedCaseStudies = caseStudies.filter((c) => c.verified);
