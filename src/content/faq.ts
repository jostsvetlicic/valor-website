/** Homepage FAQ, both languages. Also feeds the site search. */

import type { Dict } from "@/i18n";

export type Faq = {
  q: string;
  a: string;
  link?: { label: string; path: string };
};

export const faqCopy: Dict<{
  eyebrow: string;
  title: string;
  book: string;
  askTitle: string;
  askText: string;
  faqs: Faq[];
}> = {
  en: {
    eyebrow: "FAQ",
    title: "Common questions",
    book: "Book a call →",
    askTitle: "Still have a question?",
    askText: "Ask us directly on WhatsApp or by email.",
    faqs: [
      {
        q: "What do you automate exactly?",
        a: "The document work your team does by hand: orders from email and PDF typed into the ERP, invoices, delivery notes and customs papers checked line by line, and payment reminders and status questions answered one by one. We start with the process that costs you the most.",
      },
      {
        q: "How long does setup take?",
        a: "A one-week test on your real documents, then a 3 to 4 week pilot on one process with one team. The full project, connected to your ERP, takes 6 to 8 weeks.",
      },
      {
        q: "Do I need to be technical?",
        a: "No. We handle the build, the integrations and the hosting. Your team keeps working in the tools they already know, and we walk them through anything new before launch.",
      },
      {
        q: "What platforms do you connect?",
        a: "SAP, Pantheon, Microsoft Business Central, Microsoft 365, Gmail, WhatsApp Business and any system with an API.",
      },
      {
        q: "Is our data safe?",
        a: "The agent drafts, a person decides. Data stays on EU infrastructure, a GDPR data processing agreement is signed before the pilot, and every step is logged.",
        link: { label: "More on security and data →", path: "/security" },
      },
      {
        q: "How much does it cost?",
        a: "Pilots start at 2,000 to 4,000 EUR and are credited in full to the project. Projects typically range from 10,000 to 30,000 EUR, fixed price agreed after the pilot.",
      },
      {
        q: "What happens after the system goes live?",
        a: "We monitor it from day one. With monthly support we handle maintenance, updates and improvements, and build the next process on the same base.",
      },
      {
        q: "How do I get started?",
        a: "Book a free 20-minute discovery call. We'll look at where the manual work is, what it's costing you, and what we would build to remove it.",
      },
    ],
  },
  sl: {
    eyebrow: "Vprašanja",
    title: "Pogosta vprašanja",
    book: "Rezervirajte klic →",
    askTitle: "Imate še kakšno vprašanje?",
    askText: "Vprašajte nas neposredno prek WhatsAppa ali e-pošte.",
    faqs: [
      {
        q: "Kaj točno avtomatizirate?",
        a: "Delo z dokumenti, ki ga vaša ekipa opravlja ročno: naročila iz e-pošte in PDF, vtipkana v ERP, računi, dobavnice in carinski dokumenti, preverjeni vrstico za vrstico, ter opomini za plačilo in vprašanja o statusu, odgovorjena enega za drugim. Začnemo s procesom, ki vas stane največ.",
      },
      {
        q: "Kako dolgo traja uvedba?",
        a: "Tedenski test na vaših pravih dokumentih, nato 3 do 4 tedne dolg pilot na enem procesu z eno ekipo. Celoten projekt, povezan z vašim ERP, traja 6 do 8 tednov.",
      },
      {
        q: "Ali moram biti tehnično podkovan?",
        a: "Ne. Mi poskrbimo za izvedbo, povezave in gostovanje. Vaša ekipa še naprej dela v orodjih, ki jih pozna, novosti pa ji predstavimo pred uvedbo.",
      },
      {
        q: "Katere sisteme povežete?",
        a: "SAP, Pantheon, Microsoft Business Central, Microsoft 365, Gmail, WhatsApp Business in vsak sistem z API.",
      },
      {
        q: "Ali so naši podatki varni?",
        a: "Agent pripravi osnutek, odloči človek. Podatki ostanejo na infrastrukturi v EU, pred pilotom podpišemo pogodbo o obdelavi osebnih podatkov po GDPR, vsak korak pa je zabeležen.",
        link: { label: "Več o varnosti in podatkih →", path: "/security" },
      },
      {
        q: "Koliko stane?",
        a: "Piloti se začnejo pri 2.000 do 4.000 EUR in se v celoti upoštevajo pri projektu. Projekti običajno stanejo od 10.000 do 30.000 EUR, fiksno ceno dogovorimo po pilotu.",
      },
      {
        q: "Kaj se zgodi, ko sistem zaživi?",
        a: "Spremljamo ga od prvega dne. Z mesečno podporo skrbimo za vzdrževanje, posodobitve in izboljšave ter na isti osnovi gradimo naslednji proces.",
      },
      {
        q: "Kako začnemo?",
        a: "Rezervirajte brezplačen 20-minutni uvodni klic. Pogledali bomo, kje je ročno delo, koliko vas stane in kaj bi zgradili, da ga odpravimo.",
      },
    ],
  },
};
