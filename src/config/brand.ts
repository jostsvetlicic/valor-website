import type { Dict } from "@/i18n";

/**
 * VALOR, Central brand configuration.
 * Change anything here (contact details, links, social, copy) and it updates
 * everywhere across the site. This is the single source of truth.
 */

/* ------------------------------------------------------------------ */
/*  PALETTES                                                           */
/*                                                                    */
/*  To preview a different palette, change ONE line, `ACTIVE_PALETTE` */
/*  below, to any of: "gold" | "champagne" | "bone" | "sage"         */
/*  | "terracotta". Everything (including the canvas particle field    */
/*  and the SVG sparkle) re-tints from these values automatically.     */
/* ------------------------------------------------------------------ */
export type PaletteName =
  | "gold"
  | "champagne"
  | "bone"
  | "sage"
  | "terracotta";

export type Palette = {
  /** primary accent */
  gold: string;
  /** brighter accent used for highlights, hover, gradients, particles */
  goldLight: string;
  /** page background */
  obsidian: string;
  /** raised surfaces (cards, glass) */
  charcoal: string;
  /** body/heading text */
  cream: string;
  /** muted text */
  grey: string;
};

export const palettes: Record<PaletteName, Palette> = {
  // The original VALOR champagne-gold.
  gold: {
    gold: "#C9A84C",
    goldLight: "#DDBF6A",
    obsidian: "#0A0A0A", // base
    charcoal: "#141414", // elevated surface (cards)
    cream: "#F5F0E8", // text
    grey: "rgba(245, 240, 232, 0.8)", // muted text (min 0.7 for contrast)
  },
  // 1. Champagne, soft warm ivory-gold on obsidian.
  champagne: {
    gold: "#E8D9B5",
    goldLight: "#F2E8CE",
    obsidian: "#0A0A0A",
    charcoal: "#14110D",
    cream: "#F5F1E8",
    grey: "#BDBDBD",
  },
  // 2. Bone, near-white warm neutral on obsidian.
  bone: {
    gold: "#F2EDE4",
    goldLight: "#FAF7F1",
    obsidian: "#0A0A0A",
    charcoal: "#141210",
    cream: "#F5F1E8",
    grey: "#BDBDBD",
  },
  // 3. Sage green, muted botanical accent on deep green-black.
  sage: {
    gold: "#A3B18A",
    goldLight: "#BEC9A8",
    obsidian: "#101512",
    charcoal: "#18201B",
    cream: "#F5F1E8",
    grey: "#BDBDBD",
  },
  // 4. Terracotta, warm clay accent on warm near-black.
  terracotta: {
    gold: "#C97D5D",
    goldLight: "#E0997A",
    obsidian: "#14110D",
    charcoal: "#1E1712",
    cream: "#F5F1E8",
    grey: "#BDBDBD",
  },
};

/* >>> ONE-LINE SWITCH: change this to preview a palette. <<< */
/* "gold" = the specified champagne gold #C9A24B accent. */
export const ACTIVE_PALETTE: PaletteName = "gold";

export const activePalette: Palette = palettes[ACTIVE_PALETTE];

export const brand = {
  name: "Valor",
  legalName: "Valor",
  domain: "valorai.eu",
  url: "https://valorai.eu",
  tagline: "AI infrastructure for companies that run on manual work.",
  description:
    "We connect your systems, automate your processes and build the AI tools your team uses every day. Enterprise-grade, built step by step.",

  // Slovenian versions of the tagline and description (the English ones above
  // stay the defaults used by metadata and the share image).
  taglineSl: "AI infrastruktura za podjetja, ki še vedno delajo ročno.",
  descriptionSl:
    "Povežemo vaše sisteme, avtomatiziramo procese in zgradimo AI orodja, ki jih vaša ekipa uporablja vsak dan. Na ravni velikih podjetij, korak za korakom.",

  // The legal entity behind VALOR, shown in the footer and legal pages.
  // Source: AJPES business register (via bizi.si).
  legal: {
    entity: "R2 Računalniške Rešitve, Sebastjan Svetličič s.p.",
    address: "Godovič 99E, 5275 Godovič",
    country: { en: "Slovenia", sl: "Slovenija" },
    registrationNo: "1345966000",
    taxNo: "99870991",
    // Not registered for VAT ("ni zavezanec za DDV").
    vatRegistered: false,
  },

  // The single site-wide "Book a call" destination, the Notion booking
  // calendar. Every CTA links straight here and opens in a new tab. Notion
  // does not allow the page to be embedded, so it is never iframed.
  bookingUrl: "https://calendar.notion.so/meet/jostsvetlicic/normal-meeting",

  // Contact
  phoneDisplay: "+386 69 636 766",
  phoneHref: "tel:+38669636766",
  whatsappUrl: "https://wa.me/38669636766",

  // Instagram
  instagramHandle: "@ai_valor",
  instagramUrl: "https://instagram.com/ai_valor",

  email: "info@valorai.eu",
  emailIsPlaceholder: false,

  // Brand palette, driven by ACTIVE_PALETTE above. At runtime these are
  // injected as CSS variables (see PaletteVars) so every colour follows.
  colors: activePalette,
};

export const nav: { label: Dict; href: string }[] = [
  { label: { en: "Infrastructure", sl: "Infrastruktura" }, href: "/infrastructure" },
  { label: { en: "Solutions", sl: "Rešitve" }, href: "/solutions" },
  { label: { en: "Industries", sl: "Panoge" }, href: "/industries" },
  { label: { en: "Process", sl: "Proces" }, href: "/process" },
  { label: { en: "About", sl: "O nas" }, href: "/about" },
  { label: { en: "Contact", sl: "Kontakt" }, href: "/contact" },
];

export type NavItem = (typeof nav)[number];
