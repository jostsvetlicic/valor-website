import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import IndustryDetail from "@/components/industries/IndustryDetail";
import { brand } from "@/config/brand";
import { getIndustry, industries } from "@/content/industries";
import { alternates, href, type Dict, type Locale } from "@/i18n";

const index: Dict<{
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: [string, string];
  intro: string;
  view: string;
  otherTitle: string;
  ctaTitle: string;
  cta: string;
  otherText: string;
  otherCta: string;
}> = {
  en: {
    metaTitle: "Industries",
    metaDescription:
      "VALOR builds document agents for wholesale and distribution, freight forwarding and customs, and metal, plastics and automotive suppliers. Connected to your ERP.",
    eyebrow: "Industries",
    title: ["Built for", "document-heavy companies."],
    intro:
      "Three industries where the same data is retyped every day. The same method in each: a one-week test, a pilot, then the project connected to your ERP.",
    view: "View industry",
    otherTitle: "Other document-heavy companies",
    ctaTitle: "Not sure where your company fits? Let's look at it together.",
    cta: "Book a discovery call",
    otherText: "If your team retypes data from documents every day, the method applies to you too.",
    otherCta: "Talk to us",
  },
  sl: {
    metaTitle: "Panoge",
    metaDescription:
      "VALOR gradi agente za dokumente za veleprodajo in distribucijo, špedicijo in carino ter dobavitelje v kovinski, plastični in avtomobilski industriji. Povezane z vašim ERP.",
    eyebrow: "Panoge",
    title: ["Zgrajeno za podjetja z", "veliko dokumentov."],
    intro:
      "Tri panoge, kjer se isti podatki vsak dan pretipkavajo. Povsod ista metoda: tedenski test, pilot, nato projekt, povezan z vašim ERP.",
    view: "Poglej panogo",
    otherTitle: "Druga podjetja z veliko dokumentov",
    ctaTitle: "Niste prepričani, kam sodite? Poglejmo skupaj.",
    cta: "Rezervirajte uvodni klic",
    otherText: "Če vaša ekipa vsak dan pretipkava podatke iz dokumentov, metoda velja tudi za vas.",
    otherCta: "Pogovorimo se",
  },
};

export function industriesMetadata(locale: Locale): Metadata {
  const t = index[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternates("/industries", locale) };
}

export function IndustriesIndex({ locale }: { locale: Locale }) {
  const t = index[locale];
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
      <section className="surface-panel border-t border-cream/[0.06] py-20 md:py-28">
        <Container>
          <RevealGroup as="ul" stagger={0.08} className="grid gap-4 md:grid-cols-2">
            {industries.map(({ slug, copy }) => {
              const c = copy[locale];
              return (
                <RevealItem as="li" key={slug} hoverLift className="h-full">
                  <Link
                    href={href(locale, `/industries/${slug}`)}
                    className="group flex h-full flex-col rounded-3xl border border-cream/[0.08] bg-charcoal p-8 transition-colors duration-300 hover:border-gold/70"
                  >
                    <span className="eyebrow">{c.shortName}</span>
                    <h2 className="mt-4 font-display t-subhead text-cream">{c.name}</h2>
                    <p className="mt-3 flex-1 t-lead text-grey">{c.tagline}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                      {t.view}
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
            <RevealItem as="li" className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-dashed border-cream/20 p-8">
                <h2 className="font-display t-subhead text-cream">{t.otherTitle}</h2>
                <p className="mt-3 flex-1 t-lead text-grey">{t.otherText}</p>
                <a
                  href={brand.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold"
                >
                  {t.otherCta}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>

      <CtaBand title={t.ctaTitle} cta={t.cta} />
    </>
  );
}

const detailMeta: Dict<(short: string) => string> = {
  en: (short) =>
    `What VALOR builds for ${short.toLowerCase()}: document agents connected to your ERP, measured in a one-week test.`,
  sl: (short) => `Kaj VALOR zgradi za področje ${short.toLowerCase()}: agente za dokumente, povezane z vašim ERP, izmerjene v tedenskem testu.`,
};

export function industryMetadata(slug: string, locale: Locale): Metadata {
  const industry = getIndustry(slug);
  if (!industry) return {};
  const c = industry.copy[locale];
  return {
    title: c.name,
    description: `${c.tagline} ${detailMeta[locale](c.shortName)}`,
    alternates: alternates(`/industries/${slug}`, locale),
  };
}

export function IndustryView({ slug, locale }: { slug: string; locale: Locale }) {
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const c = industry.copy[locale];
  return (
    <>
      <PageHero eyebrow={c.name} title={c.tagline} />
      <IndustryDetail industry={c} locale={locale} />
    </>
  );
}
