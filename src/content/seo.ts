/**
 * Search titles and descriptions for every page, both languages, in one
 * place. Titles stay within 60 characters including " | VALOR"; descriptions
 * within 155.
 *
 * Target keywords, used where they read naturally: AI automation agency,
 * business process automation, AI CRM development, AI agencija Slovenija,
 * document and ERP automation.
 */

import type { Dict } from "@/i18n";

export type PageSeo = {
  /** Page part of the title; " | VALOR" is appended unless `absolute`. */
  title: string;
  description: string;
  absolute?: boolean;
};

export type SeoKey =
  | "home"
  | "services"
  | "businessAutomation"
  | "infrastructure"
  | "solutions"
  | "industries"
  | "process"
  | "howItWorks"
  | "demo"
  | "security"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "imprint"
  | "caseStudies";

export const seo: Dict<Record<SeoKey, PageSeo>> = {
  en: {
    home: {
      title: "VALOR | AI Automation Agency for Document-Heavy Companies",
      absolute: true,
      description:
        "VALOR is an AI automation agency from Slovenia. We automate orders, invoices and documents, connected to your ERP, and a person approves every step.",
    },
    services: {
      title: "AI Automation Services and AI CRM Development",
      description:
        "Business process automation, AI CRM development, document automation and integrations. What VALOR builds, from email and PDF to your ERP.",
    },
    businessAutomation: {
      title: "Business Process Automation with AI",
      description:
        "AI business process automation for orders, invoices, customs papers and replies, connected to SAP, Pantheon or Business Central and approved by your team.",
    },
    infrastructure: {
      title: "AI Infrastructure and Systems Integration",
      description:
        "The four layers VALOR builds: interface, automation, operations and integration, and the capabilities inside each. The system your company runs on.",
    },
    solutions: {
      title: "AI Solutions for Sales, Knowledge and Analytics",
      description:
        "Six focused AI systems: sales engine, market radar, company knowledge, analytics, customer service and dealer performance. One workflow first.",
    },
    industries: {
      title: "AI Automation for Distribution and Manufacturing",
      description:
        "Document agents for wholesale and distribution, freight forwarding and customs, and metal, plastics and automotive suppliers. Connected to your ERP.",
    },
    process: {
      title: "How an AI Automation Project Runs, Step by Step",
      description:
        "A free discovery call, a one-week test on your real documents, a 3 to 4 week pilot, the full ERP project and support. The pilot price is credited.",
    },
    howItWorks: {
      title: "How AI Document Automation Works",
      description:
        "What happens to one document with VALOR: connect, read, check, draft, approve and log. Step by step, from the inbox to your ERP.",
    },
    demo: {
      title: "Interactive Demo: an AI Agent Reads an Order",
      description:
        "Watch a VALOR agent read a sample order, shipment file or delivery schedule, draft the data and flag what needs a person.",
    },
    security: {
      title: "Security and Data: GDPR, EU Hosting, Audit Trail",
      description:
        "How VALOR handles your data: the agent drafts and a person decides, EU infrastructure, a GDPR data processing agreement and every step logged.",
    },
    about: {
      title: "About VALOR, AI Automation Agency in Slovenia",
      description:
        "VALOR is an AI automation agency founded by Jošt Svetličič. How we work, the standard we hold and the systems we build for document-heavy companies.",
    },
    contact: {
      title: "Contact VALOR and Book a Discovery Call",
      description:
        "Book a free 20-minute discovery call with VALOR, or reach us by email, phone or WhatsApp. AI automation for companies that run on manual work.",
    },
    privacy: {
      title: "Privacy Policy",
      description: "How VALOR collects, uses and protects your personal data. GDPR privacy notice for valorai.eu.",
    },
    terms: {
      title: "Terms of Service",
      description: "Terms governing projects, payments and intellectual property for work carried out by VALOR.",
    },
    imprint: {
      title: "Imprint and Company Details",
      description:
        "Legal details of VALOR: R2 Računalniške Rešitve, Sebastjan Svetličič s.p., Godovič, Slovenia. Registration and tax numbers and contact.",
    },
    caseStudies: {
      title: "Case Studies: AI Automation Results",
      description:
        "Measured results from VALOR projects: the minutes each document took before and after, the volume and the timeline, for each process automated.",
    },
  },
  sl: {
    home: {
      title: "VALOR | AI agencija v Sloveniji za avtomatizacijo",
      absolute: true,
      description:
        "VALOR je AI agencija iz Slovenije. Avtomatiziramo naročila, račune in dokumente, povezane z vašim ERP, vsak korak pa še vedno potrdi človek.",
    },
    services: {
      title: "AI storitve in razvoj AI CRM sistemov",
      description:
        "Avtomatizacija poslovnih procesov, razvoj AI CRM, avtomatizacija dokumentov in povezave sistemov. Kaj VALOR zgradi, od e-pošte in PDF do ERP.",
    },
    businessAutomation: {
      title: "Avtomatizacija poslovnih procesov z AI",
      description:
        "AI avtomatizacija naročil, računov, carinskih dokumentov in odgovorov. Povezano s SAP, Pantheon ali Business Central, potrdi pa vaša ekipa.",
    },
    infrastructure: {
      title: "AI infrastruktura: vmesnik, avtomatizacija, povezave",
      description:
        "Štiri plasti, ki jih gradi VALOR: uporabniška, avtomatizacija, operativa in integracije, ter zmožnosti v vsaki. Sistem, na katerem deluje podjetje.",
    },
    solutions: {
      title: "AI rešitve za prodajo, znanje in analitiko",
      description:
        "Šest osredotočenih AI sistemov: prodajni motor, tržni radar, znanje podjetja, analitika, podpora strankam in uspešnost avtohiše.",
    },
    industries: {
      title: "AI avtomatizacija za distribucijo in proizvodnjo",
      description:
        "Agenti za dokumente za veleprodajo, špedicijo in carino ter dobavitelje v kovinski, plastični in avtomobilski industriji. Povezani z vašim ERP.",
    },
    process: {
      title: "Kako poteka projekt AI avtomatizacije",
      description:
        "Brezplačen uvodni klic, tedenski test na vaših dokumentih, 3 do 4 tedne dolg pilot, celoten projekt z ERP in podpora. Pilot se upošteva v ceni.",
    },
    howItWorks: {
      title: "Kako deluje AI avtomatizacija dokumentov",
      description:
        "Kaj se z VALOR zgodi z enim dokumentom: povezava, branje, preverjanje, priprava, potrditev in beleženje. Od nabiralnika do ERP.",
    },
    demo: {
      title: "Interaktivni demo: AI agent prebere naročilo",
      description:
        "Poglejte, kako agent VALOR prebere vzorčno naročilo, dokumente pošiljke ali plan dobav, pripravi podatke in označi, kaj potrebuje človeka.",
    },
    security: {
      title: "Varnost in podatki: GDPR, gostovanje v EU",
      description:
        "Kako VALOR ravna s podatki: agent pripravi, odloči človek, infrastruktura v EU, pogodba o obdelavi po GDPR in vsak korak zabeležen.",
    },
    about: {
      title: "O nas: VALOR, AI agencija iz Slovenije",
      description:
        "VALOR je AI agencija, ki jo je ustanovil Jošt Svetličič. Kako delamo, standard, ki ga držimo, in sistemi, ki jih gradimo za podjetja z dokumenti.",
    },
    contact: {
      title: "Kontakt in rezervacija uvodnega klica",
      description:
        "Rezervirajte brezplačen 20-minutni uvodni klic z VALOR ali nam pišite po e-pošti, telefonu ali WhatsAppu. AI avtomatizacija za ročno delo.",
    },
    privacy: {
      title: "Politika zasebnosti",
      description: "Kako VALOR zbira, uporablja in varuje vaše osebne podatke. Obvestilo o zasebnosti po GDPR za valorai.eu.",
    },
    terms: {
      title: "Pogoji poslovanja",
      description: "Pogoji, ki urejajo projekte, plačila in intelektualno lastnino pri delu, ki ga izvaja VALOR.",
    },
    imprint: {
      title: "Impresum in podatki o podjetju",
      description:
        "Pravni podatki o VALOR: R2 Računalniške Rešitve, Sebastjan Svetličič s.p., Godovič. Matična in davčna številka ter kontakt.",
    },
    caseStudies: {
      title: "Primeri: rezultati AI avtomatizacije",
      description:
        "Izmerjeni rezultati projektov VALOR: minute na dokument pred in po, obseg in časovnica za vsak avtomatiziran proces.",
    },
  },
};

/** Short page names for breadcrumbs. */
export const pageNames: Dict<Record<SeoKey, string>> = {
  en: {
    home: "Home",
    services: "Services",
    businessAutomation: "Business process automation",
    infrastructure: "Infrastructure",
    solutions: "Solutions",
    industries: "Industries",
    process: "Process",
    howItWorks: "How it works",
    demo: "Interactive demo",
    security: "Security and data",
    about: "About",
    contact: "Contact",
    privacy: "Privacy policy",
    terms: "Terms of service",
    imprint: "Imprint",
    caseStudies: "Case studies",
  },
  sl: {
    home: "Domov",
    services: "Storitve",
    businessAutomation: "Avtomatizacija poslovnih procesov",
    infrastructure: "Infrastruktura",
    solutions: "Rešitve",
    industries: "Panoge",
    process: "Proces",
    howItWorks: "Kako deluje",
    demo: "Interaktivni demo",
    security: "Varnost in podatki",
    about: "O nas",
    contact: "Kontakt",
    privacy: "Politika zasebnosti",
    terms: "Pogoji poslovanja",
    imprint: "Impresum",
    caseStudies: "Primeri",
  },
};
