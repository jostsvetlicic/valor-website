import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import VideoPlayer from "@/components/VideoPlayer";
import { partnerCaseStudies, videoPartner } from "@/content/videos";
import type { Dict, Locale } from "@/i18n";

const copy: Dict<{ eyebrow: string; title: string; intro: string; by: string; more: string }> = {
  en: {
    eyebrow: "Case studies",
    title: "Results from our build partner.",
    intro: `Two projects by ${videoPartner.name} and his team at ${videoPartner.company}, who build with VALOR. The figures are theirs.`,
    by: `Case study by ${videoPartner.name} · ${videoPartner.company}`,
    more: `More on ${videoPartner.name}'s YouTube channel`,
  },
  sl: {
    eyebrow: "Primeri",
    title: "Rezultati našega partnerja za razvoj.",
    intro: `Dva projekta, ki ju je izvedel ${videoPartner.name} s svojo ekipo pri ${videoPartner.company}, s katero VALOR gradi sisteme. Številke so njihove. Videi so v angleščini.`,
    by: `Primer: ${videoPartner.name} · ${videoPartner.company}`,
    more: `Več na YouTube kanalu, ki ga vodi ${videoPartner.name}`,
  },
};

/**
 * Matteo Caruso's case studies (his projects, shown credited to him, never as
 * VALOR's own work). Sits in the proof chapter after the globe.
 */
export default function PartnerCases({ locale = "en", eyebrow }: { locale?: Locale; eyebrow?: string }) {
  const t = copy[locale];
  return (
    <Section id="partner-cases" tone="panel" className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow ?? t.eyebrow} title={t.title} intro={t.intro} />
        <RevealGroup as="ul" stagger={0.1} className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          {partnerCaseStudies.map((c) => (
            <RevealItem as="li" key={c.id} className="flex flex-col rounded-[1.75rem] border border-gold/15 bg-charcoal p-4 md:p-5">
              <VideoPlayer video={c} title={c.title[locale]} poster={c.poster} />
              <div className="px-2 pb-2 pt-5">
                <p className="eyebrow text-[0.7rem]">{t.by}</p>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-cream">{c.title[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-grey">{c.summary[locale]}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-10 text-center">
          <a
            href={videoPartner.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-area group inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-colors hover:text-gold-light"
          >
            {t.more}
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
          </a>
        </p>
      </Container>
    </Section>
  );
}
