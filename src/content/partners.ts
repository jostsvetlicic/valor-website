/**
 * VALOR partner network. "featured" renders as one large card, "network" as
 * smaller cards below it. Logos live in /public/partners.
 * // TODO: real content required, replace the placeholder logo SVGs with the
 * partners' real logo files (same file names).
 */

import type { Dict } from "@/i18n";

export type PartnerTier = "featured" | "network";

export type Partner = {
  name: string;
  role: Dict;
  description: Dict;
  url: string;
  logo: string;
  tier: PartnerTier;
};

export const partners: Partner[] = [
  {
    name: "CoreUnlock",
    role: { en: "App and systems partner", sl: "Partner za aplikacije in sisteme" },
    description: {
      en: "Custom apps and platforms, built to scale.",
      sl: "Aplikacije in platforme po meri, zgrajene za rast.",
    },
    url: "https://www.coreunlock.com/",
    logo: "/partners/coreunlock.svg",
    tier: "featured",
  },
  {
    name: "InternumAI",
    role: { en: "AI agents and RPA partner", sl: "Partner za AI agente in RPA" },
    description: {
      en: "Autonomous AI agents and process automation. Ljubljana, EU and GDPR compliant.",
      sl: "Avtonomni AI agenti in avtomatizacija procesov. Ljubljana, skladno z EU in GDPR.",
    },
    url: "https://hub.internum.ai/",
    logo: "/partners/internum.svg",
    tier: "network",
  },
];
