/**
 * /how-it-works: what happens to one document, from the inbox to the ERP.
 * Kept consistent with /security and /process; no client claims or metrics.
 */

import type { Dict } from "@/i18n";

export type HowStep = {
  title: string;
  text: string;
  /** Short lines shown in the step's visual. */
  detail: string[];
};

export const howItWorks: Dict<{
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: [string, string];
  intro: string;
  stepLabel: string;
  steps: HowStep[];
  needTitle: string;
  need: string[];
  sameTitle: string;
  same: string[];
  demoTitle: string;
  demoText: string;
  demoCta: string;
  ctaTitle: string;
  cta: string;
}> = {
  en: {
    metaTitle: "How it works",
    metaDescription:
      "What happens to one document with VALOR: connect, read, check, draft, approve and log. Step by step, from the inbox to your ERP.",
    eyebrow: "How it works",
    title: ["From inbox to ERP,", "step by step."],
    intro: "What happens to one order, invoice or delivery note once a VALOR agent is in place. Scroll through the six steps.",
    stepLabel: "Step",
    steps: [
      {
        title: "Connect",
        text: "We connect the agent to the inbox where documents arrive and to your ERP, through its API or a test environment first. Your team keeps working in the tools it already uses.",
        detail: ["Shared inbox, e.g. orders@", "ERP: SAP, Pantheon, Business Central or any system with an API", "Test environment before production"],
      },
      {
        title: "Read",
        text: "When an email arrives, the agent reads the message and every attachment: PDF, scan, Excel or plain text. It understands the document, not just the characters on it.",
        detail: ["Email body and attachments", "PDF, scans, Excel, Word", "Slovenian, English, German and more"],
      },
      {
        title: "Check",
        text: "The extracted data is checked against what your systems already know: customers, item codes, price lists, stock and your own rules. Anything that does not match is flagged.",
        detail: ["Customer and item codes matched", "Prices and quantities compared", "Your business rules applied"],
      },
      {
        title: "Draft",
        text: "The agent prepares the result where your team works: a draft order in the ERP, prepared customs data, or a reply in the inbox. Nothing is final yet.",
        detail: ["Draft sales order in the ERP", "Prepared data for the declarant", "Reply drafted, not sent"],
      },
      {
        title: "Approve",
        text: "A person on your team reviews the draft, with every flag explained, and approves it or corrects it. Only then is anything booked or sent.",
        detail: ["Flags explained in plain language", "Approve or correct in one place", "Nothing leaves without a person"],
      },
      {
        title: "Log and improve",
        text: "Every step is logged: what was read, what was drafted, what changed and who approved it. Corrections become rules, so the same exception is handled better next time.",
        detail: ["Full audit trail", "Corrections become rules", "Minutes per document measured"],
      },
    ],
    needTitle: "What we need from you",
    need: [
      "A sample of real documents for the one-week test",
      "Access to one inbox and a test environment of your ERP",
      "One person who knows the process and can answer questions",
    ],
    sameTitle: "What stays the same",
    same: [
      "Your ERP, inbox and tools stay where they are",
      "Your team decides; the agent prepares",
      "Your data stays on EU infrastructure",
    ],
    demoTitle: "See it on a sample document",
    demoText: "The interactive demo runs these steps on a fictional order, shipment file or delivery schedule.",
    demoCta: "Open the demo",
    ctaTitle: "Let's run it on your documents.",
    cta: "Book a discovery call",
  },
  sl: {
    metaTitle: "Kako deluje",
    metaDescription:
      "Kaj se z VALOR zgodi z enim dokumentom: povezava, branje, preverjanje, priprava, potrditev in beleženje. Korak za korakom, od nabiralnika do ERP.",
    eyebrow: "Kako deluje",
    title: ["Od nabiralnika do ERP,", "korak za korakom."],
    intro: "Kaj se zgodi z enim naročilom, računom ali dobavnico, ko deluje agent VALOR. Pomaknite se skozi šest korakov.",
    stepLabel: "Korak",
    steps: [
      {
        title: "Povezava",
        text: "Agenta povežemo z nabiralnikom, v katerega prihajajo dokumenti, in z vašim ERP, prek API ali najprej s testnim okoljem. Vaša ekipa še naprej dela v orodjih, ki jih pozna.",
        detail: ["Skupni nabiralnik, npr. narocila@", "ERP: SAP, Pantheon, Business Central ali kateri koli sistem z API", "Testno okolje pred produkcijo"],
      },
      {
        title: "Branje",
        text: "Ko prispe e-pošta, agent prebere sporočilo in vse priloge: PDF, sken, Excel ali navadno besedilo. Dokument razume, ne le znakov na njem.",
        detail: ["Besedilo e-pošte in priloge", "PDF, skeni, Excel, Word", "Slovenščina, angleščina, nemščina in drugi jeziki"],
      },
      {
        title: "Preverjanje",
        text: "Zajeti podatki se preverijo glede na to, kar vaši sistemi že vedo: kupce, šifre artiklov, cenike, zalogo in vaša pravila. Kar se ne ujema, je označeno.",
        detail: ["Ujemanje šifer kupcev in artiklov", "Primerjava cen in količin", "Upoštevana vaša poslovna pravila"],
      },
      {
        title: "Priprava",
        text: "Agent pripravi rezultat tam, kjer dela vaša ekipa: osnutek naročila v ERP, pripravljene carinske podatke ali odgovor v nabiralniku. Nič še ni dokončno.",
        detail: ["Osnutek prodajnega naloga v ERP", "Pripravljeni podatki za deklaranta", "Pripravljen odgovor, ne poslan"],
      },
      {
        title: "Potrditev",
        text: "Oseba iz vaše ekipe pregleda osnutek, z razloženimi opozorili, in ga potrdi ali popravi. Šele nato se karkoli knjiži ali pošlje.",
        detail: ["Opozorila razložena v navadnem jeziku", "Potrditev ali popravek na enem mestu", "Brez človeka nič ne odide"],
      },
      {
        title: "Beleženje in izboljšave",
        text: "Vsak korak je zabeležen: kaj je bilo prebrano, kaj pripravljeno, kaj spremenjeno in kdo je potrdil. Popravki postanejo pravila, zato je ista izjema naslednjič obravnavana bolje.",
        detail: ["Celotna revizijska sled", "Popravki postanejo pravila", "Izmerjene minute na dokument"],
      },
    ],
    needTitle: "Kaj potrebujemo od vas",
    need: [
      "Vzorec pravih dokumentov za tedenski test",
      "Dostop do enega nabiralnika in testnega okolja vašega ERP",
      "Eno osebo, ki pozna proces in odgovori na vprašanja",
    ],
    sameTitle: "Kaj ostane enako",
    same: [
      "Vaš ERP, nabiralnik in orodja ostanejo, kjer so",
      "Odloča vaša ekipa; agent pripravi",
      "Vaši podatki ostanejo na infrastrukturi v EU",
    ],
    demoTitle: "Poglejte na vzorčnem dokumentu",
    demoText: "Interaktivni demo izvede te korake na izmišljenem naročilu, dokumentih pošiljke ali planu dobav.",
    demoCta: "Odprite demo",
    ctaTitle: "Preizkusimo na vaših dokumentih.",
    cta: "Rezervirajte uvodni klic",
  },
};
