/**
 * Site search index, built from the same content the pages render, so it
 * never drifts from the site. Loaded only when the search dialog opens.
 */

import { faqCopy } from "@/content/faq";
import { industries } from "@/content/industries";
import { processStepsByLocale } from "@/content/process";
import { securityPoints } from "@/content/security";
import { solutionsByLocale } from "@/content/solutions";
import { href, type Dict, type Locale } from "@/i18n";

export type SearchKind = "page" | "industry" | "solution" | "process" | "faq" | "security";

export type SearchEntry = {
  kind: SearchKind;
  title: string;
  text: string;
  href: string;
  /** Extra words that should match but are not shown. */
  keywords?: string;
};

const pages: Dict<{ path: string; title: string; text: string; keywords?: string }[]> = {
  en: [
    { path: "/", title: "Home", text: "AI infrastructure for companies that run on manual work.", keywords: "valor start" },
    { path: "/infrastructure", title: "Infrastructure", text: "The four layers VALOR builds (interface, automation, operations and integration) and the capabilities inside each." },
    { path: "/solutions", title: "Solutions", text: "Six focused AI systems: sales, market intelligence, company knowledge, analytics, customer service and dealership performance." },
    { path: "/industries", title: "Industries", text: "Document agents for wholesale and distribution, freight forwarding and customs, and metal, plastics and automotive suppliers." },
    { path: "/process", title: "Process", text: "A free discovery call, a one-week test on your real documents, a 3 to 4 week pilot, the full ERP project and monthly support.", keywords: "price cost pilot timeline" },
    { path: "/how-it-works", title: "How it works", text: "What happens to one document: connect, read, check, draft, approve and log. From the inbox to your ERP.", keywords: "steps explain erp inbox ocr" },
    { path: "/demo", title: "Interactive demo", text: "Watch an agent read a sample order, shipment file or delivery schedule, draft the data and flag what needs a person.", keywords: "try example" },
    { path: "/security", title: "Security and data", text: "The agent drafts and a person decides, EU infrastructure, a GDPR data processing agreement, every step logged.", keywords: "gdpr privacy encryption" },
    { path: "/about", title: "About", text: "VALOR is an AI infrastructure company: the standard we hold and the way we work.", keywords: "team founder company" },
    { path: "/contact", title: "Contact", text: "Book a call, or reach us by phone, WhatsApp or email.", keywords: "email phone whatsapp book call" },
    { path: "/privacy", title: "Privacy policy", text: "How VALOR collects, uses and protects your personal data.", keywords: "gdpr cookies" },
    { path: "/terms", title: "Terms of service", text: "Projects, payments and intellectual property.", keywords: "legal contract" },
  ],
  sl: [
    { path: "/", title: "Domov", text: "AI infrastruktura za podjetja, ki še vedno delajo ročno.", keywords: "valor začetek" },
    { path: "/infrastructure", title: "Infrastruktura", text: "Štiri plasti, ki jih gradi VALOR (uporabniška, avtomatizacija, operativa in integracije), in zmožnosti v vsaki." },
    { path: "/solutions", title: "Rešitve", text: "Šest osredotočenih AI sistemov: prodaja, tržni radar, znanje podjetja, analitika, podpora strankam in uspešnost avtohiše." },
    { path: "/industries", title: "Panoge", text: "Agenti za dokumente za veleprodajo in distribucijo, špedicijo in carino ter dobavitelje v kovinski, plastični in avtomobilski industriji." },
    { path: "/process", title: "Proces", text: "Brezplačen uvodni klic, tedenski test na vaših dokumentih, 3 do 4 tedne dolg pilot, celoten projekt z ERP in mesečna podpora.", keywords: "cena strošek pilot roki" },
    { path: "/how-it-works", title: "Kako deluje", text: "Kaj se zgodi z enim dokumentom: povezava, branje, preverjanje, priprava, potrditev in beleženje. Od nabiralnika do ERP.", keywords: "koraki razlaga erp nabiralnik" },
    { path: "/demo", title: "Interaktivni demo", text: "Poglejte, kako agent prebere vzorčno naročilo, dokumente pošiljke ali plan dobav in označi, kaj potrebuje človeka.", keywords: "preizkus primer" },
    { path: "/security", title: "Varnost in podatki", text: "Agent pripravi, odloči človek, infrastruktura v EU, pogodba o obdelavi podatkov, vsak korak zabeležen.", keywords: "gdpr zasebnost šifriranje" },
    { path: "/about", title: "O nas", text: "VALOR je podjetje za AI infrastrukturo: standard, ki ga držimo, in način dela.", keywords: "ekipa ustanovitelj podjetje" },
    { path: "/contact", title: "Kontakt", text: "Rezervirajte klic ali nas dosezite po telefonu, WhatsAppu ali e-pošti.", keywords: "e-pošta telefon whatsapp klic" },
    { path: "/privacy", title: "Politika zasebnosti", text: "Kako VALOR zbira, uporablja in varuje vaše osebne podatke.", keywords: "gdpr piškotki" },
    { path: "/terms", title: "Pogoji poslovanja", text: "Projekti, plačila in intelektualna lastnina.", keywords: "pravno pogodba" },
  ],
};

export function buildSearchIndex(locale: Locale): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const p of pages[locale]) {
    entries.push({ kind: "page", title: p.title, text: p.text, href: href(locale, p.path), keywords: p.keywords });
  }

  for (const ind of industries) {
    const c = ind.copy[locale];
    entries.push({
      kind: "industry",
      title: c.name,
      text: c.tagline,
      href: href(locale, `/industries/${ind.slug}`),
      keywords: [c.shortName, ...c.documents, ...c.pains, ...c.whatWeDo].join(" "),
    });
  }

  for (const s of solutionsByLocale[locale]) {
    entries.push({
      kind: "solution",
      title: s.name,
      text: s.result.headline,
      href: `${href(locale, "/solutions")}#${s.id}`,
      keywords: [s.kicker, s.pain.headline, ...s.bestFit, ...s.automatic].join(" "),
    });
  }

  for (const step of processStepsByLocale[locale]) {
    entries.push({ kind: "process", title: step.title, text: step.line, href: href(locale, "/process"), keywords: step.body });
  }

  for (const f of faqCopy[locale].faqs) {
    entries.push({ kind: "faq", title: f.q, text: f.a, href: href(locale, "/#faq") });
  }

  for (const pt of securityPoints[locale]) {
    entries.push({ kind: "security", title: pt.title, text: pt.text, href: href(locale, "/security") });
  }

  return entries;
}

/** Lowercase and strip accents, so "sifriranje" finds "šifriranje". */
export function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/**
 * Every word of the query must appear somewhere in the entry. Matches in the
 * title score highest, then the visible text, then keywords; pages get a small
 * boost so a page beats a detail with the same name.
 */
export function search(entries: SearchEntry[], query: string, limit = 12): SearchEntry[] {
  const words = normalise(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const scored: { e: SearchEntry; score: number }[] = [];
  for (const e of entries) {
    const title = normalise(e.title);
    const text = normalise(e.text);
    const keys = normalise(e.keywords ?? "");
    let score = 0;
    let ok = true;
    for (const w of words) {
      if (title.startsWith(w)) score += 12;
      else if (title.includes(w)) score += 8;
      else if (text.includes(w)) score += 4;
      else if (keys.includes(w)) score += 2;
      else {
        ok = false;
        break;
      }
    }
    if (ok) scored.push({ e, score: score + (e.kind === "page" ? 1 : 0) });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((x) => x.e);
}
