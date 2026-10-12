/**
 * VALOR industries (enterprise audience: document-heavy companies in
 * Slovenia). One entry per vertical, copy per locale. Every line describes
 * what we build or how; there are no invented clients, metrics or results.
 */

import type { Dict, Locale } from "@/i18n";

export type IndustryCopy = {
  name: string;
  shortName: string;
  tagline: string;
  documents: string[];
  pains: string[];
  whatWeDo: string[];
  howWeDoIt: string[];
  outcomes: string[];
  flagship?: string;
};

export type Industry = { slug: string; copy: Dict<IndustryCopy> };

export const industries: Industry[] = [
  {
    slug: "wholesale-distribution",
    copy: {
      en: {
        name: "Wholesale and distribution",
        shortName: "Wholesale",
        tagline: "Orders arrive in every format. Your ERP needs them in one.",
        documents: [
          "Customer orders by email and PDF",
          "Order confirmations",
          "Price lists and quotes",
          "Delivery notes",
          "Supplier invoices",
          "Payment reminders",
        ],
        pains: [
          "Order lines retyped from email and PDF into the ERP.",
          "Prices and stock checked by hand before every confirmation.",
          "Customers asking where their order is, one email at a time.",
          "Supplier invoices matched to deliveries line by line.",
        ],
        whatWeDo: [
          "An agent that reads incoming orders and drafts them in your ERP.",
          "Price and stock checks, with exceptions flagged for review.",
          "Order confirmations drafted for a person to approve and send.",
          "Order status answers for customers from your ERP data.",
          "Supplier invoice matching against orders and delivery notes.",
        ],
        howWeDoIt: [
          "We start with a one-week test on your real orders and measure the minutes per order, before and after.",
          "The agent drafts, a person decides. Nothing is confirmed without approval.",
          "Every step is logged: what was read, what was drafted and who approved it.",
        ],
        outcomes: [
          "Order entry moves from typing to reviewing.",
          "Exceptions surface before the confirmation goes out.",
          "Fewer status questions answered by hand.",
        ],
        flagship:
          "An order desk where every incoming order, in any format, lands as a draft in your ERP, ready for review.",
      },
      sl: {
        name: "Veleprodaja in distribucija",
        shortName: "Veleprodaja",
        tagline: "Naročila prihajajo v vseh oblikah. Vaš ERP jih potrebuje v eni.",
        documents: [
          "Naročila kupcev po e-pošti in v PDF",
          "Potrditve naročil",
          "Ceniki in ponudbe",
          "Dobavnice",
          "Prejeti računi dobaviteljev",
          "Opomini za plačilo",
        ],
        pains: [
          "Postavke naročil se iz e-pošte in PDF ročno pretipkajo v ERP.",
          "Cene in zaloga se pred vsako potrditvijo preverjajo ročno.",
          "Kupci sprašujejo, kje je njihovo naročilo, en e-mail za drugim.",
          "Prejeti računi se z dobavami usklajujejo vrstico za vrstico.",
        ],
        whatWeDo: [
          "Agent, ki prebere prejeta naročila in jih kot osnutek pripravi v vašem ERP.",
          "Preverjanje cen in zaloge, odstopanja so označena za pregled.",
          "Osnutki potrditev naročil, ki jih oseba potrdi in pošlje.",
          "Odgovori kupcem o statusu naročila iz podatkov v ERP.",
          "Usklajevanje prejetih računov z naročili in dobavnicami.",
        ],
        howWeDoIt: [
          "Začnemo s tedenskim testom na vaših pravih naročilih in izmerimo minute na naročilo, prej in potem.",
          "Agent pripravi osnutek, odloči človek. Brez odobritve se nič ne potrdi.",
          "Vsak korak je zabeležen: kaj je bilo prebrano, kaj pripravljeno in kdo je odobril.",
        ],
        outcomes: [
          "Vnos naročil se iz tipkanja prestavi v pregledovanje.",
          "Odstopanja se pokažejo, preden gre potrditev ven.",
          "Manj vprašanj o statusu, na katera je treba odgovarjati ročno.",
        ],
        flagship:
          "Naročilni pult, kjer vsako prejeto naročilo, v kateri koli obliki, pristane kot osnutek v vašem ERP, pripravljeno za pregled.",
      },
    },
  },
  {
    slug: "freight-forwarding-customs",
    copy: {
      en: {
        name: "Freight forwarding and customs",
        shortName: "Forwarding and customs",
        tagline: "Every shipment is a stack of papers. Each one is read by hand.",
        documents: [
          "Transport orders",
          "CMR consignment notes",
          "Commercial invoices and packing lists",
          "Customs declaration data",
          "Certificates of origin",
          "Carrier invoices",
        ],
        pains: [
          "Shipment data copied from emails and PDFs into the transport system.",
          "Invoices and packing lists checked against each other line by line.",
          "Customs data assembled by hand from several documents.",
          "Customers and carriers asking for status by phone and email.",
        ],
        whatWeDo: [
          "Data extraction from transport orders, CMRs, invoices and packing lists.",
          "Cross-checks between invoice, packing list and order, with mismatches flagged.",
          "Customs data prepared from the shipment documents, for a declarant to review.",
          "Shipment status answers for customers from your system.",
          "Carrier invoice checks against the agreed rates.",
        ],
        howWeDoIt: [
          "We start with a one-week test on your real shipment files and measure the minutes per file, before and after.",
          "The agent prepares, the declarant decides. Nothing is submitted without approval.",
          "Every step is logged: what was read, what was prepared and who approved it.",
        ],
        outcomes: [
          "Declarants review prepared data instead of retyping it.",
          "Mismatches are caught before the shipment moves.",
          "Fewer status calls for the operations team.",
        ],
        flagship:
          "A document desk that reads every shipment file, checks it against itself and prepares the data your declarants need.",
      },
      sl: {
        name: "Špedicija in carinsko posredovanje",
        shortName: "Špedicija in carina",
        tagline: "Vsaka pošiljka je kup papirjev. Vsakega preberete ročno.",
        documents: [
          "Transportni nalogi",
          "Tovorni listi CMR",
          "Trgovski računi in pakirni listi",
          "Podatki za carinske deklaracije",
          "Potrdila o poreklu",
          "Računi prevoznikov",
        ],
        pains: [
          "Podatki o pošiljkah se iz e-pošte in PDF kopirajo v transportni sistem.",
          "Računi in pakirni listi se med seboj preverjajo vrstico za vrstico.",
          "Carinski podatki se ročno sestavljajo iz več dokumentov.",
          "Stranke in prevozniki sprašujejo po statusu po telefonu in e-pošti.",
        ],
        whatWeDo: [
          "Zajem podatkov iz transportnih nalogov, CMR, računov in pakirnih listov.",
          "Navzkrižno preverjanje računa, pakirnega lista in naročila, neskladja so označena.",
          "Carinski podatki, pripravljeni iz dokumentov pošiljke, ki jih pregleda deklarant.",
          "Odgovori strankam o statusu pošiljke iz vašega sistema.",
          "Preverjanje računov prevoznikov glede na dogovorjene tarife.",
        ],
        howWeDoIt: [
          "Začnemo s tedenskim testom na vaših pravih dokumentih pošiljk in izmerimo minute na pošiljko, prej in potem.",
          "Agent pripravi, deklarant odloči. Brez odobritve se nič ne odda.",
          "Vsak korak je zabeležen: kaj je bilo prebrano, kaj pripravljeno in kdo je odobril.",
        ],
        outcomes: [
          "Deklaranti pregledujejo pripravljene podatke, namesto da jih pretipkavajo.",
          "Neskladja se odkrijejo, preden se pošiljka premakne.",
          "Manj klicev o statusu za operativno ekipo.",
        ],
        flagship:
          "Dokumentni pult, ki prebere vsako pošiljko, jo preveri sama s seboj in pripravi podatke, ki jih potrebujejo vaši deklaranti.",
      },
    },
  },
  {
    slug: "manufacturing-suppliers",
    copy: {
      en: {
        name: "Metal, plastics and automotive suppliers",
        shortName: "Manufacturing suppliers",
        tagline: "Orders, schedules and certificates, all handled by hand.",
        documents: [
          "Customer orders and call-offs",
          "Delivery schedules",
          "Order confirmations",
          "Material certificates",
          "Delivery notes",
          "Invoices",
        ],
        pains: [
          "Customer orders and call-offs retyped into the ERP.",
          "Delivery schedules compared by hand every time a customer changes quantities.",
          "Material certificates searched for and attached manually.",
          "Order confirmations and delivery dates answered one by one.",
        ],
        whatWeDo: [
          "Orders and call-offs read straight into ERP drafts.",
          "Schedule change detection, with differences flagged for planners.",
          "Certificate lookup and attachment to delivery documents.",
          "Confirmation drafts with dates from your planning data.",
          "Order status answers for customers from your ERP.",
        ],
        howWeDoIt: [
          "We start with a one-week test on your real orders and schedules and measure the minutes per document, before and after.",
          "The agent drafts, a person decides. Nothing reaches the ERP or the customer without approval.",
          "Every step is logged: what was read, what changed and who approved it.",
        ],
        outcomes: [
          "Planners see what changed without comparing files by hand.",
          "Delivery documents go out complete, with the right certificates.",
          "Less time on order administration, more on production.",
        ],
        flagship:
          "An order and schedule desk that reads every customer document and shows planners only what changed.",
      },
      sl: {
        name: "Dobavitelji v kovinski, plastični in avtomobilski industriji",
        shortName: "Proizvodni dobavitelji",
        tagline: "Naročila, plani dobav in certifikati, vse ročno.",
        documents: [
          "Naročila kupcev in odpoklici",
          "Plani dobav",
          "Potrditve naročil",
          "Certifikati materialov",
          "Dobavnice",
          "Računi",
        ],
        pains: [
          "Naročila kupcev in odpoklici se ročno pretipkajo v ERP.",
          "Plani dobav se ročno primerjajo ob vsaki spremembi količin s strani kupca.",
          "Certifikati materialov se ročno iščejo in prilagajo.",
          "Na potrditve naročil in roke dobave se odgovarja enega za drugim.",
        ],
        whatWeDo: [
          "Naročila in odpoklici se preberejo neposredno v osnutke v ERP.",
          "Zaznavanje sprememb v planih dobav, razlike so označene za planerje.",
          "Iskanje certifikatov in prilaganje k dobavni dokumentaciji.",
          "Osnutki potrditev z roki iz vaših planskih podatkov.",
          "Odgovori kupcem o statusu naročila iz vašega ERP.",
        ],
        howWeDoIt: [
          "Začnemo s tedenskim testom na vaših pravih naročilih in planih ter izmerimo minute na dokument, prej in potem.",
          "Agent pripravi osnutek, odloči človek. Brez odobritve nič ne pride v ERP ali do kupca.",
          "Vsak korak je zabeležen: kaj je bilo prebrano, kaj se je spremenilo in kdo je odobril.",
        ],
        outcomes: [
          "Planerji vidijo, kaj se je spremenilo, brez ročnega primerjanja datotek.",
          "Dobavna dokumentacija gre ven popolna, s pravimi certifikati.",
          "Manj časa za administracijo naročil, več za proizvodnjo.",
        ],
        flagship:
          "Pult za naročila in plane, ki prebere vsak dokument kupca in planerjem pokaže samo, kaj se je spremenilo.",
      },
    },
  },
];

export const industrySlugs = industries.map((i) => i.slug);

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function industryCopy(industry: Industry, locale: Locale): IndustryCopy {
  return industry.copy[locale];
}
