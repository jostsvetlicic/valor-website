/**
 * Videos from the pre-call set made with Matteo Caruso (CoreUnlock), VALOR's
 * build partner (https://valor-coreunlock.vercel.app). The videos are hosted
 * on Wistia and on Matteo's YouTube channel; posters are copies in
 * /public/video so nothing loads from those services until someone presses
 * play. Summaries follow what is said in each video (Wistia transcripts).
 *
 * The two case studies are Matteo's projects ("the AI app we built him" on
 * his channel). They are always shown credited to him, never as VALOR's own
 * work (owner's decision, November 2026). The figures are his claims.
 */

import type { Dict } from "@/i18n";

export type VideoSource = { provider: "wistia" | "youtube"; id: string };

export type Video = VideoSource & {
  title: Dict;
  /** Running time as shown on the card, e.g. "0:34". */
  duration: string;
  poster: string;
};

export const videoPartner = {
  name: "Matteo Caruso",
  company: "CoreUnlock",
  youtube: "https://www.youtube.com/@aixmatteo",
};

/** "Watch this before the call": Matteo introduces himself and the call (5:53). */
export const preCallVideo: Video = {
  provider: "wistia",
  id: "9t53wknbrv",
  duration: "5:53",
  poster: "/video/precall-welcome.jpg",
  title: {
    en: "Before your call: who you will talk to and how the call works",
    sl: "Pred klicem: s kom se boste pogovarjali in kako poteka klic",
  },
};

/** Four short answers to the questions owners ask most before a call. */
export const quickAnswers: (Video & { answer: Dict })[] = [
  {
    provider: "wistia",
    id: "5ggtut7899",
    duration: "0:34",
    poster: "/video/qa-whatsapp.jpg",
    title: { en: "WhatsApp works. Why change?", sl: "WhatsApp deluje. Zakaj spreminjati?" },
    answer: {
      en: "It works because someone holds it together by hand. We move tasks and updates to one place where nothing gets missed.",
      sl: "Deluje, ker ga nekdo ročno drži skupaj. Naloge in novosti preselimo na eno mesto, kjer se nič ne izgubi.",
    },
  },
  {
    provider: "wistia",
    id: "pehfgmud4u",
    duration: "0:14",
    poster: "/video/qa-pms.jpg",
    title: {
      en: "Will this replace my PMS or booking channels?",
      sl: "Bo to zamenjalo moj PMS ali rezervacijske kanale?",
    },
    answer: {
      en: "No. Your PMS, channel manager and booking platforms stay. We connect them so everything is in one place.",
      sl: "Ne. PMS, upravitelj kanalov in rezervacijske platforme ostanejo. Povežemo jih, da je vse na enem mestu.",
    },
  },
  {
    provider: "wistia",
    id: "ypqnq88ksy",
    duration: "0:27",
    poster: "/video/qa-cost.jpg",
    title: { en: "How much does it cost?", sl: "Koliko stane?" },
    answer: {
      en: "Every build is different, so there is no price list. You get a fixed price agreed upfront, with no surprise fees.",
      sl: "Vsak sistem je drugačen, zato ni cenika. Dobite fiksno ceno, dogovorjeno vnaprej, brez presenečenj.",
    },
  },
  {
    provider: "wistia",
    id: "vy7y53pwia",
    duration: "0:23",
    poster: "/video/qa-custom.jpg",
    title: { en: "Why custom and not off-the-shelf?", sl: "Zakaj po meri in ne že narejeno orodje?" },
    answer: {
      en: "Off-the-shelf tools make you work their way. We build around how you already run things, so the AI sees the full picture.",
      sl: "Že narejena orodja vas prisilijo v svoj način dela. Mi gradimo okoli tega, kako že delate, zato AI vidi celotno sliko.",
    },
  },
];

/** Matteo's case studies, shown credited to him. */
export const partnerCaseStudies: (Video & { person: string; summary: Dict })[] = [
  {
    provider: "youtube",
    id: "Vy3D4zADPX4",
    duration: "",
    poster: "/video/case-jayden.jpg",
    person: "Jayden",
    title: {
      en: "Jayden: $10k a month saved with a custom AI app",
      sl: "Jayden: 10.000 $ prihranka na mesec s prilagojeno AI aplikacijo",
    },
    summary: {
      en: "A rental property business in Hawaii. Bookings, guest messages, team tasks and owner reports moved into one place.",
      sl: "Podjetje za oddajo nepremičnin na Havajih. Rezervacije, sporočila gostov, naloge ekipe in poročila lastnikom na enem mestu.",
    },
  },
  {
    provider: "youtube",
    id: "ppkEZcWc0Ck",
    duration: "",
    poster: "/video/case-riley.jpg",
    person: "Riley",
    title: {
      en: "Riley: the app she presented to 1,300+ people in Las Vegas",
      sl: "Riley: aplikacija, ki jo je predstavila več kot 1.300 ljudem v Las Vegasu",
    },
    summary: {
      en: "How a custom app saved Riley's business, and the app she went on to present on stage in Las Vegas.",
      sl: "Kako je aplikacija po meri rešila Rileyjino podjetje in jo je nato predstavila na odru v Las Vegasu.",
    },
  },
];
