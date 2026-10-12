import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import { verifiedCaseStudies } from "@/content/caseStudies";
import { href, type Dict, type Locale } from "@/i18n";

const copy: Dict<{ eyebrow: string; title: string; intro: string; all: string }> = {
  en: {
    eyebrow: "Case studies",
    title: "Measured, not promised.",
    intro: "Minutes per document, measured before and after on real documents.",
    all: "All case studies",
  },
  sl: {
    eyebrow: "Primeri",
    title: "Izmerjeno, ne obljubljeno.",
    intro: "Minute na dokument, izmerjene prej in potem na pravih dokumentih.",
    all: "Vsi primeri",
  },
};

/** Homepage strip of measured case studies. Renders nothing until one is verified. */
export default function CaseStudies({ locale = "en" }: { locale?: Locale }) {
  if (verifiedCaseStudies.length === 0) return null;
  const t = copy[locale];
  return (
    <Section id="case-studies" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
        <RevealGroup as="ul" stagger={0.07} className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {verifiedCaseStudies.slice(0, 3).map((s) => (
            <RevealItem as="li" key={s.slug} className="h-full">
              <CaseStudyCard study={s} locale={locale} />
            </RevealItem>
          ))}
        </RevealGroup>
        {verifiedCaseStudies.length > 3 && (
          <div className="mt-10 text-center">
            <Link href={href(locale, "/case-studies")} className="text-sm font-semibold text-gold hover:text-gold-light">
              {t.all} →
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
}
