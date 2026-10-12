/**
 * VALOR in numbers. Only `verified: true` entries render; while none are
 * verified the numbers are hidden entirely. Set a stat to verified only when
 * it can be backed up if a client asks.
 * Confirmed by the owner in October 2026: 2+ years, 30 projects, and the
 * 8 client countries on 4 continents shown on the globe.
 */

import type { Dict } from "@/i18n";

export type Stat = {
  number: number;
  suffix: string;
  label: Dict;
  verified: boolean;
};

export const stats: Stat[] = [
  { number: 2, suffix: "+", label: { en: "Years building AI systems", sl: "Let gradnje AI sistemov" }, verified: true },
  { number: 30, suffix: "", label: { en: "Projects delivered", sl: "Izvedenih projektov" }, verified: true },
  { number: 8, suffix: "", label: { en: "Countries", sl: "Držav" }, verified: true },
  { number: 4, suffix: "", label: { en: "Continents", sl: "Celin" }, verified: true },
];

export const verifiedStats = stats.filter((s) => s.verified);
