import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { pageNames } from "@/content/seo";
import type { Dict, Locale } from "@/i18n";
import { seoMetadata } from "@/lib/seo";
import { LegalShell } from "@/views/legal";

/**
 * Imprint (impresum). Company data from the AJPES business register
 * (bizi.si, checked October 2026).
 */

export function imprintMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "imprint", "/imprint");
}

const REGISTERED_NAME = "R2 RAČUNALNIŠKE REŠITVE, PROJEKTIRANJE IN SVETOVANJE SEBASTJAN SVETLIČIČ S.P.";

const copy: Dict<{
  title: string;
  updated: string;
  intro: string;
  rows: [string, string][];
  contact: string;
  email: string;
  phone: string;
  source: string;
}> = {
  en: {
    title: "Imprint",
    updated: "13 October 2026",
    intro: "VALOR is a brand of the following company.",
    rows: [
      ["Registered name", REGISTERED_NAME],
      ["Trading as", "VALOR"],
      ["Legal form", "Sole proprietor (samostojni podjetnik posameznik)"],
      ["Address", `${brand.legal.address}, Slovenia`],
      ["Registration number", brand.legal.registrationNo],
      ["Tax number", `${brand.legal.taxNo} (not registered for VAT)`],
      ["Registry", "AJPES, Nova Gorica branch, registered 1 September 2000"],
      ["Main activity", "K62.100 Computer programming"],
    ],
    contact: "Contact",
    email: "Email",
    phone: "Phone",
    source: "Source: AJPES business register.",
  },
  sl: {
    title: "Impresum",
    updated: "13. oktober 2026",
    intro: "VALOR je blagovna znamka naslednjega podjetja.",
    rows: [
      ["Polno ime", REGISTERED_NAME],
      ["Blagovna znamka", "VALOR"],
      ["Pravnoorganizacijska oblika", "Samostojni podjetnik posameznik"],
      ["Naslov", `${brand.legal.address}, Slovenija`],
      ["Matična številka", brand.legal.registrationNo],
      ["Davčna številka", `${brand.legal.taxNo} (ni zavezanec za DDV)`],
      ["Registrski organ", "AJPES, izpostava Nova Gorica, vpis 1. 9. 2000"],
      ["Glavna dejavnost", "K62.100 Računalniško programiranje"],
    ],
    contact: "Kontakt",
    email: "E-pošta",
    phone: "Telefon",
    source: "Vir: Poslovni register AJPES.",
  },
};

export function ImprintView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <LegalShell
      locale={locale}
      title={t.title}
      updated={t.updated}
      draft={false}
      crumb={{ name: pageNames[locale].imprint, path: "/imprint" }}
    >
      <section>
        <p>{t.intro}</p>
        <dl className="mt-6 divide-y divide-cream/[0.08] border-y border-cream/[0.08]">
          {t.rows.map(([k, v]) => (
            <div key={k} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
              <dt className="text-sm text-grey">{k}</dt>
              <dd className="text-cream">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section>
        <h2>{t.contact}</h2>
        <p>
          {t.email}: <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <br />
          {t.phone}: <a href={brand.phoneHref}>{brand.phoneDisplay}</a>
        </p>
        <p className="text-sm">{t.source}</p>
      </section>
    </LegalShell>
  );
}
