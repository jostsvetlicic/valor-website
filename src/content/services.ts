/**
 * /services hub and /services/business-automation copy. Built from what the
 * site already states (services, FAQ, process, security); no client claims.
 */

import type { Dict } from "@/i18n";

export const servicesHub: Dict<{
  eyebrow: string;
  title: [string, string];
  intro: string;
  pagesEyebrow: string;
  pagesTitle: string;
  pages: { title: string; text: string; path: string; cta: string }[];
  ctaTitle: string;
  cta: string;
}> = {
  en: {
    eyebrow: "Services",
    title: ["AI automation services", "for companies that run on documents."],
    intro:
      "VALOR is an AI automation agency from Slovenia. We automate business processes, build AI CRM systems and connect the tools you already use, starting with the one process that costs you the most time.",
    pagesEyebrow: "Go deeper",
    pagesTitle: "Where to start",
    pages: [
      {
        title: "Business process automation",
        text: "Orders, invoices, customs papers and customer replies handled by AI agents, connected to your ERP and approved by your team.",
        path: "/services/business-automation",
        cta: "Business process automation",
      },
      {
        title: "AI automation by industry",
        text: "Document agents for wholesale and distribution, freight forwarding and customs, and metal, plastics and automotive suppliers.",
        path: "/industries",
        cta: "See the industries",
      },
      {
        title: "Focused AI solutions",
        text: "Six AI systems for sales, market intelligence, company knowledge, analytics, customer service and dealer performance.",
        path: "/solutions",
        cta: "See the AI solutions",
      },
      {
        title: "How it works",
        text: "What happens to one document, from the inbox to your ERP: connect, read, check, draft, approve and log.",
        path: "/how-it-works",
        cta: "How AI document automation works",
      },
    ],
    ctaTitle: "Tell us which process hurts most.",
    cta: "Book a discovery call",
  },
  sl: {
    eyebrow: "Storitve",
    title: ["Storitve AI avtomatizacije", "za podjetja, ki delajo z dokumenti."],
    intro:
      "VALOR je AI agencija iz Slovenije. Avtomatiziramo poslovne procese, razvijamo AI CRM sisteme in povezujemo orodja, ki jih že uporabljate, začenši s procesom, ki vam vzame največ časa.",
    pagesEyebrow: "Več o tem",
    pagesTitle: "Kje začeti",
    pages: [
      {
        title: "Avtomatizacija poslovnih procesov",
        text: "Naročila, računi, carinski dokumenti in odgovori strankam, ki jih obdelajo AI agenti, povezani z vašim ERP, potrdi pa vaša ekipa.",
        path: "/services/business-automation",
        cta: "Avtomatizacija poslovnih procesov",
      },
      {
        title: "AI avtomatizacija po panogah",
        text: "Agenti za dokumente za veleprodajo in distribucijo, špedicijo in carino ter dobavitelje v kovinski, plastični in avtomobilski industriji.",
        path: "/industries",
        cta: "Poglejte panoge",
      },
      {
        title: "Osredotočene AI rešitve",
        text: "Šest AI sistemov za prodajo, tržno analizo, znanje podjetja, analitiko, podporo strankam in uspešnost avtohiše.",
        path: "/solutions",
        cta: "Poglejte AI rešitve",
      },
      {
        title: "Kako deluje",
        text: "Kaj se zgodi z enim dokumentom, od nabiralnika do ERP: povezava, branje, preverjanje, priprava, potrditev in beleženje.",
        path: "/how-it-works",
        cta: "Kako deluje AI avtomatizacija dokumentov",
      },
    ],
    ctaTitle: "Povejte nam, kateri proces najbolj boli.",
    cta: "Rezervirajte uvodni klic",
  },
};

export const businessAutomation: Dict<{
  eyebrow: string;
  title: [string, string];
  intro: string;
  automateTitle: string;
  automate: { title: string; text: string }[];
  crmEyebrow: string;
  crmTitle: string;
  crmIntro: string;
  crm: string[];
  systemsTitle: string;
  systems: string[];
  systemsNote: string;
  processTitle: string;
  processLink: string;
  faqTitle: string;
  relatedTitle: string;
  related: { label: string; path: string }[];
  ctaTitle: string;
  cta: string;
}> = {
  en: {
    eyebrow: "Business process automation",
    title: ["Business process automation", "with AI agents."],
    intro:
      "As an AI automation agency, VALOR takes the document work your team does by hand and gives it to AI agents: reading orders and invoices, checking them against your data, drafting the result in your ERP and preparing replies. A person on your team approves every step.",
    automateTitle: "What we automate",
    automate: [
      { title: "Order entry", text: "Orders from email and PDF drafted as sales orders in your ERP, with exceptions flagged." },
      { title: "Invoice and delivery note checks", text: "Documents compared line by line against orders, price lists and receipts." },
      { title: "Customs and shipping documents", text: "Data from invoices and packing lists prepared for the declarant, with mismatches flagged." },
      { title: "Customer replies", text: "Status questions and payment reminders answered with live data, drafted for approval." },
      { title: "Delivery schedule changes", text: "Call-offs and schedule updates compared with the plan, changes highlighted for the planner." },
      { title: "Reporting", text: "Recurring reports prepared from connected data instead of exported spreadsheets." },
    ],
    crmEyebrow: "AI CRM development",
    crmTitle: "A CRM that updates itself.",
    crmIntro:
      "We build AI CRM systems or connect AI to the one you already have, so enquiries are captured, scored and followed up without anyone copying data between tools.",
    crm: [
      "Enquiries from email, WhatsApp and the web captured automatically",
      "Lead scoring and AI prioritisation",
      "Follow-ups drafted and scheduled",
      "Customer history kept in one place",
    ],
    systemsTitle: "Systems we connect",
    systems: ["SAP", "Pantheon", "Microsoft Business Central", "Microsoft 365", "Gmail", "WhatsApp Business"],
    systemsNote: "And any system with an API.",
    processTitle: "How a project runs",
    processLink: "The full process, step by step",
    faqTitle: "Common questions",
    relatedTitle: "Related",
    related: [
      { label: "How AI document automation works", path: "/how-it-works" },
      { label: "AI automation for wholesale and distribution", path: "/industries/wholesale-distribution" },
      { label: "AI automation for freight forwarding and customs", path: "/industries/freight-forwarding-customs" },
      { label: "AI automation for manufacturing suppliers", path: "/industries/manufacturing-suppliers" },
      { label: "Security and data handling", path: "/security" },
      { label: "Try the interactive demo", path: "/demo" },
    ],
    ctaTitle: "Start with one process. Measure the minutes.",
    cta: "Book a discovery call",
  },
  sl: {
    eyebrow: "Avtomatizacija poslovnih procesov",
    title: ["Avtomatizacija poslovnih procesov", "z AI agenti."],
    intro:
      "Kot AI agencija iz Slovenije VALOR delo z dokumenti, ki ga vaša ekipa opravlja ročno, preda AI agentom: branje naročil in računov, preverjanje glede na vaše podatke, pripravo rezultata v ERP in pripravo odgovorov. Vsak korak potrdi oseba iz vaše ekipe.",
    automateTitle: "Kaj avtomatiziramo",
    automate: [
      { title: "Vnos naročil", text: "Naročila iz e-pošte in PDF pripravljena kot prodajni nalogi v ERP, z označenimi odstopanji." },
      { title: "Preverjanje računov in dobavnic", text: "Dokumenti primerjani vrstico za vrstico z naročili, ceniki in prevzemi." },
      { title: "Carinski in odpremni dokumenti", text: "Podatki iz računov in pakirnih listov pripravljeni za deklaranta, z označenimi neskladji." },
      { title: "Odgovori strankam", text: "Vprašanja o stanju in opomini za plačilo, odgovorjeni z živimi podatki in pripravljeni za potrditev." },
      { title: "Spremembe plana dobav", text: "Odpoklici in posodobitve plana primerjani s planom, spremembe označene za planerja." },
      { title: "Poročanje", text: "Ponavljajoča se poročila iz povezanih podatkov namesto iz izvoženih preglednic." },
    ],
    crmEyebrow: "Razvoj AI CRM",
    crmTitle: "CRM, ki se posodablja sam.",
    crmIntro:
      "Razvijamo AI CRM sisteme ali AI povežemo z vašim obstoječim, da so povpraševanja zajeta, ocenjena in obravnavana, ne da bi kdo prepisoval podatke med orodji.",
    crm: [
      "Povpraševanja iz e-pošte, WhatsAppa in spleta zajeta samodejno",
      "Ocenjevanje povpraševanj in AI prioritizacija",
      "Pripravljena in načrtovana sledeča sporočila",
      "Zgodovina strank na enem mestu",
    ],
    systemsTitle: "Sistemi, ki jih povežemo",
    systems: ["SAP", "Pantheon", "Microsoft Business Central", "Microsoft 365", "Gmail", "WhatsApp Business"],
    systemsNote: "In vsak sistem z API.",
    processTitle: "Kako poteka projekt",
    processLink: "Celoten proces, korak za korakom",
    faqTitle: "Pogosta vprašanja",
    relatedTitle: "Povezano",
    related: [
      { label: "Kako deluje AI avtomatizacija dokumentov", path: "/how-it-works" },
      { label: "AI avtomatizacija za veleprodajo in distribucijo", path: "/industries/wholesale-distribution" },
      { label: "AI avtomatizacija za špedicijo in carino", path: "/industries/freight-forwarding-customs" },
      { label: "AI avtomatizacija za proizvodne dobavitelje", path: "/industries/manufacturing-suppliers" },
      { label: "Varnost in ravnanje s podatki", path: "/security" },
      { label: "Preizkusite interaktivni demo", path: "/demo" },
    ],
    ctaTitle: "Začnite z enim procesom. Izmerite minute.",
    cta: "Rezervirajte uvodni klic",
  },
};
