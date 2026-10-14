import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import { Reveal } from "@/components/Reveal";
import { howItWorks } from "@/content/howItWorks";
import { href, type Locale } from "@/i18n";
import { seoMetadata } from "@/lib/seo";
import { pageNames } from "@/content/seo";

export function howItWorksMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "howItWorks", "/how-it-works");
}

export function HowItWorksView({ locale }: { locale: Locale }) {
  const t = howItWorks[locale];
  return (
    <>
      <PageHero
        crumbs={{ locale, items: [{ name: pageNames[locale].howItWorks, path: "/how-it-works" }] }}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.title[0]} <span className="text-gold">{t.title[1]}</span>
          </>
        }
        intro={t.intro}
      />

      {/* The six steps, scroll-driven */}
      <section className="surface-base border-t border-cream/[0.06] py-20 md:py-28">
        <Container>
          <HowItWorksSteps steps={t.steps} stepLabel={t.stepLabel} />
        </Container>
      </section>

      {/* What we need / what stays the same */}
      <section className="surface-light py-20 md:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: t.needTitle, items: t.need, dark: true },
              { title: t.sameTitle, items: t.same, dark: false },
            ].map((b) => (
              <Reveal
                key={b.title}
                className={
                  b.dark
                    ? "rounded-[2rem] bg-obsidian p-8 text-cream md:p-10"
                    : "rounded-[2rem] border border-obsidian/10 bg-[#fcfaf6] p-8 shadow-[0_20px_50px_-30px_rgba(10,10,10,0.35)] md:p-10"
                }
              >
                <h2 className={`font-display t-subhead ${b.dark ? "text-cream" : "text-obsidian"}`}>{b.title}</h2>
                <ul className="mt-6 space-y-4">
                  {b.items.map((item) => (
                    <li key={item} className={`flex items-start gap-3 text-lg leading-snug ${b.dark ? "text-cream" : "text-obsidian"}`}>
                      <span
                        aria-hidden="true"
                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold ${
                          b.dark ? "bg-gold text-obsidian" : "bg-obsidian text-gold"
                        }`}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Demo link */}
      <section className="surface-panel border-t border-cream/[0.06] py-16 md:py-20">
        <Container>
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="font-display t-subhead text-cream">{t.demoTitle}</h2>
              <p className="mt-3 t-lead text-grey">{t.demoText}</p>
            </div>
            <Link
              href={href(locale, "/demo")}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-[0.9375rem] font-medium text-gold transition-colors hover:bg-gold hover:text-obsidian"
            >
              {t.demoCta}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </Container>
      </section>

      <CtaBand title={t.ctaTitle} cta={t.cta} />
    </>
  );
}
