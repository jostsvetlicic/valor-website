import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import PageHero from "@/components/PageHero";
import HeroSequence from "@/components/hero/HeroSequence";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { BookCallButton } from "@/components/Button";
import { brand } from "@/config/brand";
import { href, type Dict, type Locale } from "@/i18n";
import { securityPoints } from "@/content/security";
import { seoMetadata } from "@/lib/seo";
import { pageNames } from "@/content/seo";

/**
 * Security and data. Retention and access were confirmed by the owner
 * (October 2026). Encryption and the processing stack (AWS in the EU,
 * Claude via Amazon Bedrock in EU regions) are the owner-approved setup,
 * so every client system must be built this way. The points themselves
 * live in content/security.ts.
 */

const copy: Dict<{
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: [string, string];
  intro: string;
  ctaTitle: string;
  ctaText: string;
  cta: string;
  privacy: string;
}> = {
  en: {
    metaTitle: "Security and data",
    metaDescription:
      "How VALOR handles your documents and data: the agent drafts and a person decides, EU infrastructure, a GDPR data processing agreement before the pilot, and every step logged.",
    eyebrow: "Security and data",
    title: ["Your data", "stays yours."],
    intro: "How VALOR handles your documents and data, in plain language.",
    ctaTitle: "Questions from your IT or compliance team?",
    ctaText: "We are happy to answer them on a short call or in writing.",
    cta: "Book a discovery call",
    privacy: "Read the privacy policy",
  },
  sl: {
    metaTitle: "Varnost in podatki",
    metaDescription:
      "Kako VALOR ravna z vašimi dokumenti in podatki: agent pripravi, odloči človek, infrastruktura v EU, pogodba o obdelavi podatkov pred pilotom in vsak korak zabeležen.",
    eyebrow: "Varnost in podatki",
    title: ["Vaši podatki", "ostanejo vaši."],
    intro: "Kako VALOR ravna z vašimi dokumenti in podatki, preprosto povedano.",
    ctaTitle: "Vprašanja vaše IT ali pravne službe?",
    ctaText: "Z veseljem odgovorimo nanje na kratkem klicu ali v pisni obliki.",
    cta: "Rezervirajte uvodni klic",
    privacy: "Preberite politiko zasebnosti",
  },
};

export function securityMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "security", "/security");
}

export function SecurityView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageHero
        crumbs={{ locale, items: [{ name: pageNames[locale].security, path: "/security" }] }}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.title[0]} <span className="text-gold">{t.title[1]}</span>
          </>
        }
        intro={t.intro}
        aside={<HeroSequence eyebrow={locale === "sl" ? "Naše zaveze" : "Our commitments"} items={securityPoints[locale].slice(0, 5).map((p) => p.title)} mode="checks" />}
      />

      <section className="surface-light py-20 md:py-28">
        <Container>
          <RevealGroup as="ol" stagger={0.07} className="grid gap-4 md:grid-cols-2">
            {securityPoints[locale].map((p, i) => (
              <RevealItem
                as="li"
                key={p.title}
                className={`rounded-3xl p-7 md:p-9 ${
                  i === 0
                    ? "bg-obsidian text-cream md:col-span-2"
                    : "border border-obsidian/10 bg-[#fcfaf6] shadow-[0_20px_50px_-34px_rgba(10,10,10,0.4)]"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                    i === 0 ? "bg-gold text-obsidian" : "bg-obsidian text-gold"
                  }`}
                >
                  0{i + 1}
                </span>
                <h2 className={`mt-5 font-display t-subhead ${i === 0 ? "text-cream" : "text-obsidian"}`}>{p.title}</h2>
                <p className={`mt-3 max-w-2xl t-lead ${i === 0 ? "text-grey" : "text-obsidian/70"}`}>{p.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
          <div
            className="mx-auto max-w-4xl rounded-[2rem] border border-gold/25 px-6 py-16 text-center md:px-12"
            style={{
              background:
                "radial-gradient(90% 120% at 50% 0%, rgba(201,168,76,0.32) 0%, rgba(201,168,76,0.08) 45%, transparent 75%), linear-gradient(160deg, #2a2110 0%, #17130b 50%, #0f0d09 100%)",
            }}
          >
            <h2 className="font-display t-section text-cream text-balance">{t.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl t-lead text-grey">{t.ctaText}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <BookCallButton href={brand.bookingUrl} label={t.cta} />
              <Link href={href(locale, "/privacy")} className="text-sm font-medium text-cream underline-offset-4 hover:text-gold hover:underline">
                {t.privacy}
              </Link>
            </div>
          </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
