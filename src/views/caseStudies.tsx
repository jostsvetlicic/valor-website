import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import PageHero from "@/components/PageHero";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import { verifiedCaseStudies } from "@/content/caseStudies";
import { type Dict, type Locale } from "@/i18n";
import { seoMetadata } from "@/lib/seo";
import { pageNames } from "@/content/seo";

const copy: Dict<{ title: string; description: string; eyebrow: string; heading: [string, string]; intro: string }> = {
  en: {
    title: "Case studies",
    description: "Measured results from VALOR projects: minutes per document before and after.",
    eyebrow: "Case studies",
    heading: ["Measured,", "not promised."],
    intro: "Every number on this page was measured on real documents, before and after.",
  },
  sl: {
    title: "Primeri",
    description: "Izmerjeni rezultati projektov VALOR: minute na dokument prej in potem.",
    eyebrow: "Primeri",
    heading: ["Izmerjeno,", "ne obljubljeno."],
    intro: "Vsaka številka na tej strani je izmerjena na pravih dokumentih, prej in potem.",
  },
};

export function caseStudiesMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "caseStudies", "/case-studies");
}

export function CaseStudiesView({ locale }: { locale: Locale }) {
  if (verifiedCaseStudies.length === 0) notFound();
  const t = copy[locale];
  return (
    <>
      <PageHero
        crumbs={{ locale, items: [{ name: pageNames[locale].caseStudies, path: "/case-studies" }] }}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.heading[0]} <span className="text-gold">{t.heading[1]}</span>
          </>
        }
        intro={t.intro}
      />
      <section className="pb-24 md:pb-32">
        <Container>
          <RevealGroup as="ul" stagger={0.07} className="grid gap-4 md:grid-cols-2">
            {verifiedCaseStudies.map((s) => (
              <RevealItem as="li" key={s.slug} className="h-full">
                <CaseStudyCard study={s} locale={locale} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
