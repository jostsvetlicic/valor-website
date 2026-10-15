import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Container } from "@/components/Container";
import PageHero from "@/components/PageHero";
import HeroSequence from "@/components/hero/HeroSequence";
import { processStepsByLocale } from "@/content/process";
import CtaBand from "@/components/CtaBand";
import { type Dict, type Locale } from "@/i18n";
import { seoMetadata } from "@/lib/seo";
import { pageNames } from "@/content/seo";

const ProcessTimeline = dynamic(() => import("@/components/process/ProcessTimeline"));

const copy: Dict<{
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: [string, string];
  intro: string;
  ctaTitle: string;
  ctaSub: string;
  cta: string;
}> = {
  en: {
    metaTitle: "Process",
    metaDescription:
      "How a VALOR project runs: a free discovery call, a one-week test on your real documents, a 3 to 4 week pilot, the full ERP project and monthly support. The pilot price is credited to the project.",
    eyebrow: "Process",
    title: ["How a project", "actually runs."],
    intro:
      "Five steps, from a free 20-minute call to a system connected to your ERP. Each step is measured, and the pilot price is credited to the project.",
    ctaTitle: "Start with a call.",
    ctaSub: "Twenty minutes to find where the manual work is and what it costs.",
    cta: "Book a call",
  },
  sl: {
    metaTitle: "Proces",
    metaDescription:
      "Kako poteka projekt VALOR: brezplačen uvodni klic, tedenski test na vaših pravih dokumentih, 3 do 4 tedne dolg pilot, celoten projekt z ERP in mesečna podpora. Cena pilota se upošteva pri projektu.",
    eyebrow: "Proces",
    title: ["Kako projekt", "zares poteka."],
    intro:
      "Pet korakov, od brezplačnega 20-minutnega klica do sistema, povezanega z vašim ERP. Vsak korak je izmerjen, cena pilota pa se upošteva pri projektu.",
    ctaTitle: "Začnite s klicem.",
    ctaSub: "Dvajset minut, da poiščemo, kje je ročno delo in koliko vas stane.",
    cta: "Rezervirajte klic",
  },
};

export function processMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "process", "/process");
}

export function ProcessView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageHero
        crumbs={{ locale, items: [{ name: pageNames[locale].process, path: "/process" }] }}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.title[0]} <span className="text-gold">{t.title[1]}</span>
          </>
        }
        intro={t.intro}
        aside={<HeroSequence eyebrow={locale === "sl" ? "Od prvega klica do delujočega sistema" : "From first call to a running system"} items={processStepsByLocale[locale].map((s) => s.title)} />}
      />
      <section className="surface-panel border-t border-cream/[0.06] py-20 md:py-28">
        <Container>
          <ProcessTimeline locale={locale} />
        </Container>
      </section>
      <CtaBand title={t.ctaTitle} sub={t.ctaSub} cta={t.cta} />
    </>
  );
}
