import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import GlobeCanvas from "@/components/home/GlobeCanvas";
import { verifiedStats as stats } from "@/content/stats";
import type { Dict, Locale } from "@/i18n";

const line: Dict = {
  en: "From Bali to Hong Kong, Croatia to South Africa. We build systems for businesses that refuse to stay manual.",
  sl: "Od Balija do Hongkonga, od Hrvaške do Južne Afrike. Gradimo sisteme za podjetja, ki nočejo ostati pri ročnem delu.",
};

/** Credibility moment: where VALOR works, next to the numbers. */
export default function GlobeSection({ locale = "en" }: { locale?: Locale }) {
  return (
    <Section id="reach" tone="void" className="py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <GlobeCanvas locale={locale} className="mx-auto aspect-square w-full max-w-[34rem]" />

          <div>
            {stats.length > 0 && (
              <RevealGroup
                as="ul"
                stagger={0.08}
                className="grid grid-cols-2 gap-x-6 gap-y-10"
              >
                {stats.map((s) => (
                  <RevealItem
                    as="li"
                    key={s.label.en}
                    className="border-t border-gold/25 pt-5"
                  >
                    <span className="block font-display t-stat text-gold">
                      <CountUp number={s.number} suffix={s.suffix} />
                      <span className="sr-only">{`${s.number}${s.suffix}`}</span>
                    </span>
                    <span className="mt-3 block text-sm font-medium text-cream md:text-base">
                      {s.label[locale]}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
            <Reveal
              as="p"
              delay={0.2}
              className={
                stats.length > 0
                  ? "mt-12 max-w-lg font-display text-xl leading-snug text-cream md:text-2xl"
                  : "max-w-lg font-display t-subhead text-cream"
              }
            >
              {line[locale]}
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
