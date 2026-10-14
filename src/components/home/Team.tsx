import Image from "next/image";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { devTeam, team } from "@/content/team";
import SocialLinks from "@/components/SocialLinks";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { partners, type Partner } from "@/content/partners";
import { FEATURES } from "@/config/features";
import type { Dict, Locale } from "@/i18n";

const ui: Dict<{
  eyebrow: string;
  title: string;
  intro: string;
  core: string;
  devTitle: string;
  devText: (total: number, core: number) => string;
  featured: string;
  network: string;
  placeholder: string;
  visit: string;
  newTab: string;
  logo: string;
}> = {
  en: {
    eyebrow: "Team",
    title: "The team behind your system",
    intro: "One team from the first call to a running system. Jošt leads strategy and the client relationship, Mikhail builds the customer side of the AI, and Nikita builds the systems underneath it.",
    core: "VALOR core team",
    devTitle: "Development team",
    devText: (total, core) => `${total} developers, ${core} of them core developers on every build.`,
    featured: "Featured partner",
    network: "Partner network",
    placeholder: "Placeholder",
    visit: "Visit",
    newTab: "(opens in a new tab)",
    logo: "logo",
  },
  sl: {
    eyebrow: "Ekipa",
    title: "Ekipa za vašim sistemom",
    intro: "Ena ekipa od prvega klica do delujočega sistema. Jošt vodi strategijo in odnos s stranko, Mikhail gradi del AI, ki ga vidijo stranke, Nikita pa sisteme v ozadju.",
    core: "Jedrna ekipa VALOR",
    devTitle: "Razvojna ekipa",
    devText: (total, core) => `${total} razvijalcev, od tega ${core} jedrna na vsakem projektu.`,
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
  const featured = FEATURES.partners ? partners.filter((p) => p.tier === "featured") : [];
  const network = FEATURES.partners ? partners.filter((p) => p.tier === "network") : [];

  return (
    <Section id="team" tone="panel" className="py-24 md:py-32">
      <Container>
        <SectionHeading align="left" eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

        {/* 1. Core team */}
        <Reveal className="mt-14">
          <GroupLabel>{t.core}</GroupLabel>
        </Reveal>
        <RevealGroup as="ul" stagger={0.08} className="mt-5 grid gap-4 md:grid-cols-3">
          {members.map((m, i) => {
            return (
              <RevealItem as="li" key={`${m.name.en}-${i}`} className="h-full">
                {/* React Bits SpotlightCard: a soft gold light follows the pointer. */}
                <SpotlightCard
                  spotlightColor="#C9A84C"
                  intensity={0.22}
                  spotlightSize={260}
                  borderGlow={0.9}
                  className="group flex h-full flex-col items-center text-center"
                  style={
                    {
                      "--spotlight-card-surface": "#15120c",
                      "--spotlight-card-border": "rgba(201,168,76,0.38)",
                      "--spotlight-card-shadow": "0 30px 80px -40px rgba(201,168,76,0.45)",
                    } as React.CSSProperties
                  }
                >
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name[locale]}
                    width={128}
                    height={128}
                    className="h-28 w-28 rounded-full object-cover ring-2 ring-gold/40 ring-offset-4 ring-offset-charcoal transition-shadow duration-300 group-hover:ring-gold"
                  />
                ) : (
                  // Initials until a photo is added in content/team.ts.
                  <span
                    aria-hidden="true"
                    className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#2a2416] to-[#151515] font-display text-3xl font-semibold text-gold ring-2 ring-gold/25 ring-offset-4 ring-offset-charcoal transition-shadow duration-300 group-hover:ring-gold"
                  >
                    {initials(m.name[locale])}
                  </span>
                )}
                <h3 className="mt-6 font-display text-2xl font-medium text-cream transition-colors duration-300 group-hover:text-gold">
                  {m.name[locale]}
                </h3>
                <p className="mt-1 text-sm font-medium text-gold">{m.title[locale]}</p>
                {m.description && <p className="mt-3 text-sm leading-relaxed text-grey">{m.description[locale]}</p>}
                {m.location && <p className="mt-2 text-xs uppercase tracking-[0.14em] text-grey">{m.location}</p>}
                <SocialLinks socials={m.socials} name={m.name[locale]} className="mt-5 justify-center" />
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* The wider development team */}
        <Reveal className="mt-4">
          <div className="flex flex-col items-start gap-5 rounded-3xl border border-cream/[0.08] bg-charcoal px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-medium text-cream">{t.devTitle}</h3>
              <p className="mt-1 text-[0.95rem] text-grey">{t.devText(devTeam.total, devTeam.core)}</p>
            </div>
            <div className="flex -space-x-3" aria-hidden="true">
              {Array.from({ length: devTeam.total }).map((_, k) => (
                <span
                  key={k}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-charcoal font-mono text-[0.65rem] ${
                    k < devTeam.core ? "bg-gold text-obsidian" : "bg-[#2a2a2a] text-cream/70"
                  }`}
                >
                  {"</>"}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

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
