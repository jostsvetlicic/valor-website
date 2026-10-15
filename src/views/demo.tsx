import type { Metadata } from "next";
import { Container } from "@/components/Container";
import PageHero from "@/components/PageHero";
import HeroDocScan from "@/components/hero/HeroDocScan";
import DocumentDemo from "@/components/demo/DocumentDemo";
import { type Dict, type Locale } from "@/i18n";
import { seoMetadata } from "@/lib/seo";
import { pageNames } from "@/content/seo";

const copy: Dict<{ metaTitle: string; metaDescription: string; eyebrow: string; title: [string, string]; intro: string }> = {
  en: {
    metaTitle: "Interactive demo",
    metaDescription:
      "Watch a VALOR agent read a sample order, shipment file or delivery schedule, draft the data and flag what needs a person.",
    eyebrow: "Interactive demo",
    title: ["Watch the agent", "handle a document."],
    intro: "Pick a sample, run the agent, and see what it drafts and what it flags for a person.",
  },
  sl: {
    metaTitle: "Interaktivni demo",
    metaDescription:
      "Poglejte, kako VALOR agent prebere vzorčno naročilo, dokumente pošiljke ali plan dobav, pripravi podatke in označi, kaj potrebuje človeka.",
    eyebrow: "Interaktivni demo",
    title: ["Poglejte, kako agent", "obdela dokument."],
    intro: "Izberite vzorec, zaženite agenta in poglejte, kaj pripravi in kaj označi za človeka.",
  },
};

export function demoMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "demo", "/demo");
}

export function DemoView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageHero
        crumbs={{ locale, items: [{ name: pageNames[locale].demo, path: "/demo" }] }}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.title[0]} <span className="text-gold">{t.title[1]}</span>
          </>
        }
        intro={t.intro}
        aside={<HeroDocScan eyebrow={locale === "sl" ? "Agent bere" : "Agent reading"} fields={locale === "sl" ? ["Stranka", "Postavke", "Rok dobave", "Skupaj"] : ["Customer", "Line items", "Delivery date", "Total"]} />}
      />
      <section className="surface-panel border-t border-cream/[0.06] py-20 md:py-28">
        <Container>
          <DocumentDemo locale={locale} />
        </Container>
      </section>
    </>
  );
}
