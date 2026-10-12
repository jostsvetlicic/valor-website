/**
 * Security and data points shown on /security (and in the site search).
 * Retention and access were confirmed by the owner (October 2026).
 * Encryption and the processing stack are the owner-approved setup, so every
 * client system must be built this way. Change the copy here if it changes.
 */

import type { Dict } from "@/i18n";

export type SecurityPoint = { title: string; text: string };

export const securityPoints: Dict<SecurityPoint[]> = {
  en: [
    {
      title: "The agent drafts, a person decides",
      text: "Every draft order, document check or reply is prepared by the agent and approved by a person on your team before anything is sent or posted.",
    },
    {
      title: "EU infrastructure",
      text: "Your data is processed and stored on infrastructure in the European Union.",
    },
    {
      title: "GDPR data processing agreement",
      text: "We sign a GDPR data processing agreement with you before the pilot starts, so responsibilities are clear from day one.",
    },
    {
      title: "Every step is logged",
      text: "What was read, what was drafted, what changed and who approved it. Every action can be traced.",
    },
    {
      title: "A test before any commitment",
      text: "The one-week test runs on a sample of your real documents, so you see how your data is handled before you commit to anything.",
    },
    {
      title: "Kept only while we work together",
      text: "We keep your data only for as long as we work with you. When the work ends, we delete it from our systems.",
    },
    {
      title: "Access only for the people on your project",
      text: "Only the founder and the developers working on your project can access your data, each with a personal account. Access is removed as soon as it is no longer needed.",
    },
    {
      title: "Encrypted in transit and at rest",
      text: "Data is encrypted in transit with TLS 1.2 or higher and at rest with AES-256.",
    },
    {
      title: "Who processes your data",
      text: "Your systems run on Amazon Web Services in the EU (Frankfurt). The AI models are Anthropic's Claude, used through Amazon Bedrock in EU regions, which does not use your data to train models. The full list of sub-processors is part of the data processing agreement.",
    },
  ],
  sl: [
    {
      title: "Agent pripravi, odloči človek",
      text: "Vsak osnutek naročila, preverjanje dokumenta ali odgovor pripravi agent, potrdi pa ga oseba iz vaše ekipe, preden se karkoli pošlje ali knjiži.",
    },
    {
      title: "Infrastruktura v EU",
      text: "Vaši podatki se obdelujejo in hranijo na infrastrukturi v Evropski uniji.",
    },
    {
      title: "Pogodba o obdelavi osebnih podatkov",
      text: "Pred začetkom pilota z vami podpišemo pogodbo o obdelavi osebnih podatkov po GDPR, da so odgovornosti jasne od prvega dne.",
    },
    {
      title: "Vsak korak je zabeležen",
      text: "Kaj je bilo prebrano, kaj pripravljeno, kaj spremenjeno in kdo je odobril. Vsako dejanje je mogoče izslediti.",
    },
    {
      title: "Najprej test, nato odločitev",
      text: "Tedenski test poteka na vzorcu vaših pravih dokumentov, zato vidite, kako ravnamo z vašimi podatki, preden se za karkoli zavežete.",
    },
    {
      title: "Hranimo jih le, dokler sodelujemo",
      text: "Vaše podatke hranimo le, dokler sodelujemo z vami. Ko se sodelovanje konča, jih izbrišemo iz naših sistemov.",
    },
    {
      title: "Dostop samo za ljudi na vašem projektu",
      text: "Do vaših podatkov lahko dostopajo le ustanovitelj in razvijalci, ki delajo na vašem projektu, vsak z osebnim računom. Dostop odvzamemo takoj, ko ni več potreben.",
    },
    {
      title: "Šifrirano med prenosom in v hrambi",
      text: "Podatki so med prenosom šifrirani s TLS 1.2 ali novejšim, v hrambi pa z AES-256.",
    },
    {
      title: "Kdo obdeluje vaše podatke",
      text: "Vaši sistemi tečejo na Amazon Web Services v EU (Frankfurt). AI modeli so Claude podjetja Anthropic, ki jih uporabljamo prek storitve Amazon Bedrock v regijah EU, ta pa vaših podatkov ne uporablja za učenje modelov. Celoten seznam podobdelovalcev je del pogodbe o obdelavi podatkov.",
    },
  ],
};
