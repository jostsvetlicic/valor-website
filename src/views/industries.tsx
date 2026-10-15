import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import PageHero from "@/components/PageHero";
import HeroStack from "@/components/hero/HeroStack";
import HeroSequence from "@/components/hero/HeroSequence";
import { IconBoat, IconBuilding, IconCog } from "@/components/Icons";
import CtaBand from "@/components/CtaBand";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import IndustryDetail from "@/components/industries/IndustryDetail";
import { brand } from "@/config/brand";
import { getIndustry, industries } from "@/content/industries";
import { href, type Dict, type Locale } from "@/i18n";
import { JsonLd, pageMetadata, seoMetadata, serviceSchema } from "@/lib/seo";
import { pageNames } from "@/content/seo";

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
    title: ["Built for businesses that run on", "messages and documents."],
    intro:
      "Three industries where the same data is retyped every day. The same method in each: a one-week test, a pilot, then the project connected to your ERP.",
    view: "View industry",
    otherTitle: "Hospitality and other businesses",
    ctaTitle: "Not sure where your company fits? Let's look at it together.",
    cta: "Book a discovery call",
    otherText: "If your team answers the same messages or retypes data from documents every day, the method applies to you too.",
    otherCta: "Talk to us",
  },
  sl: {
    metaTitle: "Panoge",
    metaDescription:
      "VALOR gradi agente za dokumente za veleprodajo in distribucijo, špedicijo in carino ter dobavitelje v kovinski, plastični in avtomobilski industriji. Povezane z vašim ERP.",
    eyebrow: "Panoge",
    title: ["Za podjetja, ki delajo s", "sporočili in dokumenti."],
    intro:
      "Tri panoge, kjer se isti podatki vsak dan pretipkavajo. Povsod ista metoda: tedenski test, pilot, nato projekt, povezan z vašim ERP.",
    view: "Poglej panogo",
    otherTitle: "Gostinstvo in druga podjetja",
    ctaTitle: "Niste prepričani, kam sodite? Poglejmo skupaj.",
    cta: "Rezervirajte uvodni klic",
    otherText: "Če vaša ekipa vsak dan odgovarja na ista sporočila ali pretipkava podatke iz dokumentov, metoda velja tudi za vas.",
    otherCta: "Pogovorimo se",
  },
};

export function industriesMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "industries", "/industries");
}

export function IndustriesIndex({ locale }: { locale: Locale }) {
  const t = index[locale];
  return (
    <>
      <PageHero
        crumbs={{ locale, items: [{ name: pageNames[locale].industries, path: "/industries" }] }}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.title[0]} <span className="text-gold">{t.title[1]}</span>
          </>
        }
        intro={t.intro}
        aside={
          <HeroStack
            cards={industries.map((ind, i) => {
              const ic = ind.copy[locale];
              const Icon = [IconBuilding, IconBoat, IconCog][i] ?? IconBuilding;
              return { kicker: `${locale === "sl" ? "Panoga" : "Industry"} 0${i + 1}`, title: ic.name, text: ic.tagline, icon: <Icon className="h-5 w-5" /> };
            })}
          />
        }
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

const industryTitle: Dict<(short: string) => string> = {
  en: (short) => `AI Automation for ${short.replace(/\b(?!and\b|for\b)\w/g, (c) => c.toUpperCase())}`,
  sl: (short) => `AI avtomatizacija: ${short}`,
};
const industrySuffix: Dict<string> = {
  en: "VALOR builds document agents connected to your ERP.",
  sl: "VALOR gradi agente za dokumente, povezane z vašim ERP.",
};

export function industryMetadata(slug: string, locale: Locale): Metadata {
  const industry = getIndustry(slug);
  if (!industry) return {};
  const c = industry.copy[locale];
  return pageMetadata(locale, `/industries/${slug}`, {
    title: industryTitle[locale](c.shortName),
    description: `${c.tagline} ${industrySuffix[locale]}`,
  });
}

export function IndustryView({ slug, locale }: { slug: string; locale: Locale }) {
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const c = industry.copy[locale];
  return (
    <>
      <PageHero
        eyebrow={c.name}
        title={c.tagline}
        aside={<HeroSequence eyebrow={locale === "sl" ? "Kaj avtomatiziramo" : "What we automate"} items={c.whatWeDo.slice(0, 5)} mode="checks" />}
        crumbs={{
          locale,
          items: [
            { name: pageNames[locale].industries, path: "/industries" },
            { name: c.shortName, path: `/industries/${slug}` },
          ],
        }}
      />
      <JsonLd
        data={serviceSchema(locale, {
          name: c.name,
          description: c.tagline,
          path: `/industries/${slug}`,
          serviceType: locale === "sl" ? "Avtomatizacija dokumentov z AI" : "AI document automation",
        })}
      />
      <IndustryDetail industry={c} locale={locale} />
    </>
  );
}
