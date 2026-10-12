/**
 * VALOR, the process. One sequence, shared by the homepage "How we work"
 * section and the /process timeline. Keep the Terms of Service (section 2)
 * in step with any change here.
 */

import type { Dict } from "@/i18n";

export type ProcessStep = {
  number: string;
  title: string;
  /** Short line for the homepage. */
  line: string;
  /** Fuller detail for the /process timeline. */
  body: string;
};

const en: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery call",
    line: "Free, 20 minutes.",
    body: "A free 20-minute call to find where the manual work is and what it costs you.",
  },
  {
    number: "02",
    title: "One-week test",
    line: "On your real documents.",
    body: "We test on your real documents and measure the minutes each task takes, before and after.",
  },
  {
    number: "03",
    title: "Pilot",
    line: "One process, one team, 3 to 4 weeks.",
    body: "One process, one team, 3 to 4 weeks. The pilot price is credited to the project.",
  },
  {
    number: "04",
    title: "Project",
    line: "Connected to your ERP, 6 to 8 weeks.",
    body: "The system is connected to your ERP and rolled out to your team in 6 to 8 weeks.",
  },
  {
    number: "05",
    title: "Support and expansion",
    line: "Monthly, next process on the same base.",
    body: "Monthly support, and the next process built on the same base.",
  },
];

const sl: ProcessStep[] = [
  {
    number: "01",
    title: "Uvodni klic",
    line: "Brezplačno, 20 minut.",
    body: "Brezplačen 20-minutni klic, na katerem poiščemo, kje je ročno delo in koliko vas stane.",
  },
  {
    number: "02",
    title: "Tedenski test",
    line: "Na vaših pravih dokumentih.",
    body: "Testiramo na vaših pravih dokumentih in izmerimo, koliko minut traja posamezno opravilo, prej in potem.",
  },
  {
    number: "03",
    title: "Pilot",
    line: "En proces, ena ekipa, 3 do 4 tedne.",
    body: "En proces, ena ekipa, 3 do 4 tedne. Cena pilota se v celoti upošteva pri projektu.",
  },
  {
    number: "04",
    title: "Projekt",
    line: "Povezan z vašim ERP, 6 do 8 tednov.",
    body: "Sistem povežemo z vašim ERP in ga v 6 do 8 tednih uvedemo v vašo ekipo.",
  },
  {
    number: "05",
    title: "Podpora in širitev",
    line: "Mesečno, naslednji proces na isti osnovi.",
    body: "Mesečna podpora in naslednji proces, zgrajen na isti osnovi.",
  },
];

export const processStepsByLocale: Dict<ProcessStep[]> = { en, sl };

/** English steps, kept for callers that are not locale-aware. */
export const processSteps = en;
