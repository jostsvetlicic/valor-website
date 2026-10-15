import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import PageHero from "@/components/PageHero";
import HeroOrbit from "@/components/hero/HeroOrbit";
import HeroSequence from "@/components/hero/HeroSequence";
import { IconAssistant, IconChat, IconDocument, IconLead, IconMobile, IconNetwork } from "@/components/Icons";
import type { Dict } from "@/i18n";
import CtaBand from "@/components/CtaBand";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import WhatWeBuild from "@/components/home/WhatWeBuild";
import { faqCopy } from "@/content/faq";
import { processStepsByLocale } from "@/content/process";
import { pageNames, seo } from "@/content/seo";
import { businessAutomation, servicesHub } from "@/content/services";
import { href, type Locale } from "@/i18n";
import { JsonLd, seoMetadata, serviceSchema } from "@/lib/seo";

export function servicesMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "services", "/services");
}

export function businessAutomationMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "businessAutomation", "/services/business-automation");
}

function Arrow() {
  return (
    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
      →
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  /services                                                          */
/* ------------------------------------------------------------------ */

const orbitIcon = "h-5 w-5";
/** The service areas (as on the homepage service explorer) circling the VALOR star. */
const serviceOrbit: Dict<{ label: string; icon: React.ReactNode }[]> = {
  en: [
    { label: "Sales and CRM", icon: <IconLead className={orbitIcon} /> },
    { label: "Customer communication", icon: <IconChat className={orbitIcon} /> },
    { label: "Documents and finance", icon: <IconDocument className={orbitIcon} /> },
    { label: "Systems and data", icon: <IconNetwork className={orbitIcon} /> },
    { label: "AI for teams", icon: <IconAssistant className={orbitIcon} /> },
    { label: "Apps and portals", icon: <IconMobile className={orbitIcon} /> },
  ],
  sl: [
    { label: "Prodaja in CRM", icon: <IconLead className={orbitIcon} /> },
    { label: "Komunikacija s strankami", icon: <IconChat className={orbitIcon} /> },
    { label: "Dokumenti in finance", icon: <IconDocument className={orbitIcon} /> },
    { label: "Sistemi in podatki", icon: <IconNetwork className={orbitIcon} /> },
    { label: "AI za ekipe", icon: <IconAssistant className={orbitIcon} /> },
    { label: "Aplikacije in portali", icon: <IconMobile className={orbitIcon} /> },
  ],
};

export function ServicesView({ locale }: { locale: Locale }) {
  const t = servicesHub[locale];
  return (
    <>
      <PageHero
        crumbs={{ locale, items: [{ name: pageNames[locale].services, path: "/services" }] }}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.title[0]} <span className="text-gold">{t.title[1]}</span>
          </>
        }
        intro={t.intro}
        aside={<HeroOrbit items={serviceOrbit[locale]} />}
      />

      <WhatWeBuild locale={locale} />

      <section className="surface-light py-20 md:py-28">
        <Container>
          <SectionHeading light eyebrow={t.pagesEyebrow} title={t.pagesTitle} />
          <RevealGroup as="ul" stagger={0.08} className="mt-12 grid gap-4 md:grid-cols-2">
            {t.pages.map((p) => (
              <RevealItem as="li" key={p.path} hoverLift className="h-full">
                <Link
                  href={href(locale, p.path)}
                  className="group flex h-full flex-col rounded-3xl border border-obsidian/10 bg-[#fcfaf6] p-8 shadow-[0_20px_50px_-30px_rgba(10,10,10,0.35)] transition-colors duration-300 hover:border-[#b08a2e]"
                >
                  <h3 className="font-display text-2xl font-semibold text-obsidian">{p.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-obsidian/70">{p.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-obsidian group-hover:text-[#7a5d12]">
                    {p.cta}
                    <Arrow />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CtaBand title={t.ctaTitle} cta={t.cta} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  /services/business-automation                                      */
/* ------------------------------------------------------------------ */

/** FAQ entries shown on this page (timeline, platforms, data, cost). */
const FAQ_PICK = [1, 3, 4, 5];

export function BusinessAutomationView({ locale }: { locale: Locale }) {
  const t = businessAutomation[locale];
  const steps = processStepsByLocale[locale];
  const faqs = FAQ_PICK.map((i) => faqCopy[locale].faqs[i]).filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  return (
    <>
      <PageHero
        crumbs={{
          locale,
          items: [
            { name: pageNames[locale].services, path: "/services" },
            { name: pageNames[locale].businessAutomation, path: "/services/business-automation" },
          ],
        }}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.title[0]} <span className="text-gold">{t.title[1]}</span>
          </>
        }
        intro={t.intro}
        aside={<HeroSequence eyebrow={locale === "sl" ? "Kaj avtomatiziramo" : "What we automate"} items={t.automate.map((a) => a.title)} mode="checks" />}
      />
      <JsonLd
        data={[
          serviceSchema(locale, {
            name: pageNames[locale].businessAutomation,
            description: seo[locale].businessAutomation.description,
            path: "/services/business-automation",
            serviceType: locale === "sl" ? "Avtomatizacija poslovnih procesov" : "Business process automation",
          }),
          faqSchema,
        ]}
      />

      {/* What we automate */}
      <section className="surface-base border-t border-cream/[0.06] py-20 md:py-28">
        <Container>
          <SectionHeading align="left" eyebrow={t.eyebrow} title={t.automateTitle} />
          <RevealGroup as="ul" stagger={0.06} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.automate.map((a, i) => (
              <RevealItem as="li" key={a.title} hoverLift className="rounded-3xl border border-cream/[0.08] bg-charcoal p-7 hover:border-gold/60">
                <span className="font-mono text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-cream">{a.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-grey">{a.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* AI CRM development */}
      <section className="surface-warm border-t border-cream/[0.06] py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow">{t.crmEyebrow}</p>
              <h2 className="mt-3 font-display t-section text-cream">{t.crmTitle}</h2>
              <p className="mt-5 max-w-xl t-lead text-grey">{t.crmIntro}</p>
            </Reveal>
            <Reveal className="rounded-[2rem] border border-gold/30 bg-[#15110a]/80 p-8 md:p-10">
              <ul className="space-y-4">
                {t.crm.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-lg leading-snug text-cream">
                    <span aria-hidden="true" className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-[0.65rem] font-bold text-obsidian">
                      ✓
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Systems + process */}
      <section className="surface-panel border-t border-cream/[0.06] py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="font-display t-subhead text-cream">{t.systemsTitle}</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {t.systems.map((s) => (
                  <li key={s} className="rounded-full border border-cream/15 bg-charcoal px-4 py-2 text-sm text-cream">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-grey">{t.systemsNote}</p>
            </Reveal>
            <Reveal>
              <h2 className="font-display t-subhead text-cream">{t.processTitle}</h2>
              <ol className="mt-6 space-y-3">
                {steps.map((s) => (
                  <li key={s.number} className="flex gap-4 border-b border-cream/[0.08] pb-3 last:border-0">
                    <span className="font-mono text-sm text-gold">{s.number}</span>
                    <span>
                      <span className="block font-semibold text-cream">{s.title}</span>
                      <span className="block text-sm text-grey">{s.line}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <Link href={href(locale, "/process")} className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                {t.processLink}
                <Arrow />
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ + related */}
      <section className="surface-light py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display t-section text-obsidian">{t.faqTitle}</h2>
              <dl className="mt-8 divide-y divide-obsidian/10 border-y border-obsidian/10">
                {faqs.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="text-lg font-semibold text-obsidian">{f.q}</dt>
                    <dd className="mt-2 text-[0.95rem] leading-relaxed text-obsidian/75">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal className="lg:pt-2">
              <h2 className="eyebrow">{t.relatedTitle}</h2>
              <ul className="mt-5 space-y-1">
                {t.related.map((r) => (
                  <li key={r.path}>
                    <Link
                      href={href(locale, r.path)}
                      className="group flex items-center justify-between gap-3 border-b border-obsidian/10 py-3 font-medium text-obsidian transition-colors hover:text-[#7a5d12]"
                    >
                      {r.label}
                      <Arrow />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand title={t.ctaTitle} cta={t.cta} />
    </>
  );
}
