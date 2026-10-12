import { Container, Eyebrow } from "@/components/Container";
import { Section } from "@/components/Section";
import CtaBand from "@/components/CtaBand";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import SavingsCalculator from "@/components/SavingsCalculator";
import type { IndustryCopy } from "@/content/industries";
import type { Dict, Locale } from "@/i18n";

const labels: Dict<{
  documents: string;
  documentsTitle: string;
  broken: string;
  whatWeDo: string;
  whatWeDoTitle: string;
  how: string;
  howTitle: string;
  changes: string;
  changesTitle: string;
  flagship: string;
  ctaTitle: string;
  cta: string;
}> = {
  en: {
    documents: "Documents we handle",
    documentsTitle: "The paperwork that eats the day.",
    broken: "What's broken today",
    whatWeDo: "What we build",
    whatWeDoTitle: "The deliverables.",
    how: "How we work",
    howTitle: "Measured, approved, logged.",
    changes: "What changes",
    changesTitle: "What actually changes.",
    flagship: "Flagship build",
    ctaTitle: "Let's map where the manual work is.",
    cta: "Book a discovery call",
  },
  sl: {
    documents: "Dokumenti, ki jih obdelamo",
    documentsTitle: "Papirologija, ki požre dan.",
    broken: "Kaj danes ne deluje",
    whatWeDo: "Kaj zgradimo",
    whatWeDoTitle: "Kaj dobite.",
    how: "Kako delamo",
    howTitle: "Izmerjeno, odobreno, zabeleženo.",
    changes: "Kaj se spremeni",
    changesTitle: "Kaj se zares spremeni.",
    flagship: "Osrednja rešitev",
    ctaTitle: "Poiščimo, kje je ročno delo.",
    cta: "Rezervirajte uvodni klic",
  },
};

/** A labelled two-column block: sticky label on the left, content on the right. */
function Part({
  eyebrow,
  title,
  tone,
  children,
}: {
  eyebrow: string;
  title?: string;
  tone: "void" | "base" | "panel";
  children: React.ReactNode;
}) {
  return (
    <Section tone={tone} className="py-16 md:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>{eyebrow}</Eyebrow>
              {title && <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-cream md:text-3xl">{title}</h2>}
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">{children}</div>
        </div>
      </Container>
    </Section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <RevealGroup as="ul" stagger={0.07} className="space-y-4">
      {items.map((item) => (
        <RevealItem
          as="li"
          key={item}
          className="flex gap-4 border-t border-gold/12 pt-4 text-lg leading-relaxed text-cream first:border-t-0 first:pt-0"
        >
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
          {item}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export default function IndustryDetail({ industry, locale = "en" }: { industry: IndustryCopy; locale?: Locale }) {
  const t = labels[locale];
  return (
    <>
      {/* 1. The documents */}
      <Section tone="light" className="py-16 md:py-24">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>{t.documents}</Eyebrow>
            <h2 className="mt-3 font-display t-section text-obsidian text-balance">{t.documentsTitle}</h2>
          </Reveal>
          <RevealGroup as="ul" stagger={0.05} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industry.documents.map((doc) => (
              <RevealItem
                as="li"
                key={doc}
                className="flex items-center gap-4 rounded-2xl border border-obsidian/10 bg-white px-5 py-4 text-[0.95rem] font-medium text-obsidian shadow-[0_14px_40px_-30px_rgba(10,10,10,0.4)]"
              >
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-obsidian text-gold">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3.5Z" />
                    <path d="M14 3.5V8h4.5M8.5 12.5h7M8.5 16h4.5" />
                  </svg>
                </span>
                {doc}
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 2. What's broken today */}
      <Part tone="void" eyebrow={t.broken}>
        <RevealGroup as="ul" stagger={0.06} className="space-y-5 border-l border-[#e0795a]/40 pl-6 md:pl-8">
          {industry.pains.map((p) => (
            <RevealItem as="li" key={p} className="font-display text-xl leading-snug text-cream md:text-2xl">
              {p}
            </RevealItem>
          ))}
        </RevealGroup>
      </Part>

      {/* 3. What we build */}
      <Part tone="base" eyebrow={t.whatWeDo} title={t.whatWeDoTitle}>
        <BulletList items={industry.whatWeDo} />
      </Part>

      {/* 4. How we work */}
      <Part tone="panel" eyebrow={t.how} title={t.howTitle}>
        <RevealGroup as="ul" stagger={0.06} className="space-y-5 text-lg leading-relaxed text-grey">
          {industry.howWeDoIt.map((h) => (
            <RevealItem as="li" key={h}>
              {h}
            </RevealItem>
          ))}
        </RevealGroup>
      </Part>

      {/* 5. What changes */}
      <Part tone="base" eyebrow={t.changes} title={t.changesTitle}>
        <RevealGroup as="ul" className="space-y-4">
          {industry.outcomes.map((o) => (
            <RevealItem as="li" key={o} className="flex gap-4 text-lg leading-relaxed text-cream">
              <span className="mt-1 shrink-0 text-gold" aria-hidden="true">
                →
              </span>
              {o}
            </RevealItem>
          ))}
        </RevealGroup>
      </Part>

      {/* 6. Flagship */}
      {industry.flagship && (
        <Section tone="warm" className="py-20 md:py-28">
          <Container>
            <Reveal className="mx-auto max-w-4xl rounded-[2rem] border border-gold/25 bg-charcoal p-10 text-center md:p-14">
              <span className="eyebrow">{t.flagship}</span>
              <p className="mx-auto mt-6 max-w-3xl font-display t-subhead text-cream text-balance">{industry.flagship}</p>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* 7. What it costs today */}
      <SavingsCalculator locale={locale} />

      {/* Closing CTA */}
      <CtaBand title={t.ctaTitle} cta={t.cta} />
    </>
  );
}
