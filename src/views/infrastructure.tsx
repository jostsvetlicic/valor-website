import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Infrastructure from "@/components/home/Infrastructure";
import CapabilityGrid from "@/components/home/CapabilityGrid";
import CtaBand from "@/components/CtaBand";
import { alternates, type Dict, type Locale } from "@/i18n";

const copy: Dict<{
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: [string, string];
  intro: string;
  ctaTitle: string;
  cta: string;
}> = {
  en: {
    metaTitle: "Infrastructure",
    metaDescription:
      "The four layers VALOR builds (interface, automation, operations and integration) and the concrete capabilities inside each. The system your company runs on.",
    eyebrow: "Infrastructure",
    title: ["The system your company", "runs on."],
    intro:
      "Four layers, built to work as one, from the public product your customers touch, down to the systems it quietly connects.",
    ctaTitle: "Let's map where the manual work is.",
    cta: "Book a call",
  },
  sl: {
    metaTitle: "Infrastruktura",
    metaDescription:
      "Štiri plasti, ki jih gradi VALOR (uporabniška, avtomatizacija, operativa in integracije), ter konkretne zmožnosti v vsaki. Sistem, na katerem deluje vaše podjetje.",
    eyebrow: "Infrastruktura",
    title: ["Sistem, na katerem", "deluje vaše podjetje."],
    intro:
      "Štiri plasti, zgrajene, da delujejo kot ena, od javnega dela, ki se ga dotaknejo stranke, do sistemov, ki jih tiho povezuje.",
    ctaTitle: "Poiščimo, kje je ročno delo.",
    cta: "Rezervirajte klic",
  },
};

export function infrastructureMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternates("/infrastructure", locale) };
}

export function InfrastructureView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={
          <>
            {t.title[0]} <span className="text-gold">{t.title[1]}</span>
          </>
        }
        intro={t.intro}
      />
      <Infrastructure locale={locale} />
      <CapabilityGrid locale={locale} />
      <CtaBand title={t.ctaTitle} cta={t.cta} />
    </>
  );
}
