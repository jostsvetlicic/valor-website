import Image from "next/image";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { team } from "@/content/team";
import { partners, type Partner } from "@/content/partners";
import type { Dict, Locale } from "@/i18n";

const ui: Dict<{
  eyebrow: string;
  title: string;
  intro: string;
  core: string;
  featured: string;
  network: string;
  placeholder: string;
  visit: string;
  newTab: string;
  logo: string;
}> = {
  en: {
    eyebrow: "Team and partners",
    title: "The team behind your system",
    intro: "VALOR leads strategy, design and delivery. For every project we bring in the right specialists from our partner network.",
    core: "VALOR core team",
    featured: "Featured partner",
    network: "Partner network",
    placeholder: "Placeholder",
    visit: "Visit",
    newTab: "(opens in a new tab)",
    logo: "logo",
  },
  sl: {
    eyebrow: "Ekipa in partnerji",
    title: "Ekipa za vašim sistemom",
    intro: "VALOR vodi strategijo, zasnovo in izvedbo. Za vsak projekt vključimo prave strokovnjake iz naše partnerske mreže.",
    core: "Jedrna ekipa VALOR",
    featured: "Izpostavljeni partner",
    network: "Partnerska mreža",
    placeholder: "Začasno",
    visit: "Obiščite",
    newTab: "(odpre se v novem zavihku)",
    logo: "logotip",
  },
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function GroupLabel({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function PartnerLogo({ partner, className, word }: { partner: Partner; className: string; word: string }) {
  // Plain <img>: partner logos are SVGs of arbitrary aspect ratio.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={partner.logo} alt={`${partner.name} ${word}`} width={200} height={48} className={className} />;
}

function Arrow() {
  return (
    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
      →
    </span>
  );
}

/** Core team, then the featured partner, then the wider partner network. */
export default function Team({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  // Placeholder cards stay hidden until real names exist (content/team.ts).
  const members = team.filter((m) => !m.placeholder);
  const featured = partners.filter((p) => p.tier === "featured");
  const network = partners.filter((p) => p.tier === "network");

  return (
    <Section id="team" tone="panel" className="py-24 md:py-32">
      <Container>
        <SectionHeading align="left" eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

        {/* 1. Core team */}
        <Reveal className="mt-14">
          <GroupLabel>{t.core}</GroupLabel>
        </Reveal>
        <RevealGroup
          as="ul"
          stagger={0.08}
          className={members.length > 1 ? "mt-5 grid gap-4 md:grid-cols-2" : "mt-5 grid max-w-2xl gap-4"}
        >
          {members.map((m, i) => (
            <RevealItem
              as="li"
              key={`${m.name.en}-${i}`}
              className={
                m.placeholder
                  ? "flex items-start gap-5 rounded-3xl border border-dashed border-cream/20 bg-charcoal/50 p-6"
                  : i === 0
                    ? "group flex flex-col items-start gap-6 rounded-3xl border border-gold/30 bg-gradient-to-br from-[#1b170e] to-charcoal p-8 transition-colors duration-300 hover:border-gold md:row-span-2 md:p-10 [&>span:first-child]:h-24 [&>span:first-child]:w-24 [&>span:first-child]:text-3xl [&_h3]:text-3xl"
                    : "group flex items-start gap-5 rounded-3xl border border-cream/[0.08] bg-charcoal p-6 transition-colors duration-300 hover:border-gold/70"
              }
            >
              {m.photo ? (
                <Image
                  src={m.photo}
                  alt={m.name[locale]}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-cream/10 transition-shadow duration-300 group-hover:ring-gold"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] font-display text-lg text-cream/80 ring-1 ring-cream/10 transition-[box-shadow,color] duration-300 group-hover:text-gold group-hover:ring-gold"
                >
                  {m.placeholder ? "?" : initials(m.name[locale])}
                </span>
              )}
              <div className="min-w-0">
                <h3
                  className={
                    m.placeholder
                      ? "font-display text-xl font-medium text-grey"
                      : "font-display text-xl font-medium text-cream transition-colors duration-300 group-hover:text-gold"
                  }
                >
                  {m.name[locale]}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-gold">{m.title[locale]}</p>
                {m.placeholder && (
                  <span className="mt-3 inline-block rounded-full border border-cream/20 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-grey">
                    {t.placeholder}
                  </span>
                )}
                {m.description && <p className="mt-3 text-sm leading-relaxed text-grey">{m.description[locale]}</p>}
                {m.location && <p className="mt-2 text-xs uppercase tracking-[0.14em] text-grey">{m.location}</p>}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* 2. Featured partner */}
        {featured.length > 0 && (
          <>
            <Reveal className="mt-16">
              <GroupLabel>{t.featured}</GroupLabel>
            </Reveal>
            {featured.map((p) => (
              <Reveal key={p.name} className="mt-5">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-8 rounded-3xl border border-gold/30 bg-charcoal p-8 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-gold md:grid-cols-[0.9fr_1.1fr] md:items-center md:p-12"
                >
                  <div>
                    <div className="flex h-16 items-center">
                      <PartnerLogo word={t.logo} partner={p} className="max-h-12 w-auto max-w-[16rem]" />
                    </div>
                    <span className="mt-6 inline-block rounded-full border border-gold/40 px-3 py-1 text-xs font-medium text-gold">
                      {p.role[locale]}
                    </span>
                  </div>
                  <div>
                    <p className="font-display t-subhead text-cream">
                      {p.description[locale]}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                      {t.visit} {p.name}
                      <Arrow />
                      <span className="sr-only">{t.newTab}</span>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </>
        )}

        {/* 3. Partner network */}
        {network.length > 0 && (
          <>
            <Reveal className="mt-16">
              <GroupLabel>{t.network}</GroupLabel>
            </Reveal>
            <RevealGroup as="ul" stagger={0.08} className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {network.map((p) => (
                <RevealItem as="li" key={p.name} className="h-full">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-3xl border border-cream/[0.08] bg-charcoal p-6 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-gold/70"
                  >
                    <div className="flex h-10 items-center">
                      <PartnerLogo word={t.logo} partner={p} className="max-h-8 w-auto max-w-[11rem]" />
                    </div>
                    <p className="mt-5 text-sm font-medium text-gold">{p.role[locale]}</p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-grey">{p.description[locale]}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cream transition-colors group-hover:text-gold">
                      {t.visit} {p.name}
                      <Arrow />
                      <span className="sr-only">{t.newTab}</span>
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </>
        )}
      </Container>
    </Section>
  );
}
