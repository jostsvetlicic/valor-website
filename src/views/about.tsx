import type { Metadata } from "next";
import Image from "next/image";
import { team } from "@/content/team";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import Sparkle from "@/components/Sparkle";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import GlobeSection from "@/components/home/GlobeSection";
import Team from "@/components/home/Team";
import { type Dict, type Locale } from "@/i18n";
import { seoMetadata } from "@/lib/seo";
import { pageNames } from "@/content/seo";

const copy: Dict<{
  eyebrow: string;
  title: [string, string];
  intro: string;
  whoEyebrow: string;
  who: [string, string, string];
  focusEyebrow: string;
  focus: string;
  focusChips: string[];
  founderRole: string;
  howEyebrow: string;
  howTitle: string;
  steps: { title: string; body: string }[];
  ctaTitle: string;
  ctaSub: string;
  cta: string;
}> = {
  en: {
    eyebrow: "About VALOR",
    title: ["We build the system", "your business runs on."],
    intro:
      "VALOR connects the tools you already use and automates the work between them, so your team spends time on clients, not on repetitive tasks.",
    whoEyebrow: "Who we are",
    who: [
      "VALOR is an AI automation company working with businesses that already have their infrastructure in place: booking systems, CRMs, inboxes, spreadsheets and team chats.",
      "Most AI tools fail because they don't know how your business actually works. We start there. We map your team, your operations and how you communicate, then build that knowledge into a system that answers, sorts and acts the way your team would.",
      "Nothing you've built gets replaced. We connect it, automate what repeats, and flag what needs a human.",
    ],
    focusEyebrow: "What we focus on",
    focus:
      "Businesses with communication- and document-heavy operations: distribution, freight forwarding, manufacturing and hospitality.",
    focusChips: ["Distribution", "Freight forwarding", "Manufacturing", "Hospitality"],
    founderRole: "Founder of VALOR",
    howEyebrow: "How we work",
    howTitle: "Three steps, one system.",
    steps: [
      { title: "Understand", body: "We map your tools, workflows and bottlenecks." },
      { title: "Build", body: "We connect your systems and create workflows tailored to your business." },
      { title: "Run", body: "The system works in the background and keeps improving with your feedback." },
    ],
    ctaTitle: "Book a 20-minute call.",
    ctaSub: "We'll show you where your team loses the most time.",
    cta: "Book a call",
  },
  sl: {
    eyebrow: "O VALOR",
    title: ["Gradimo sistem,", "na katerem deluje vaše podjetje."],
    intro:
      "VALOR poveže orodja, ki jih že uporabljate, in avtomatizira delo med njimi, da vaša ekipa čas namenja strankam, ne ponavljajočim se opravilom.",
    whoEyebrow: "Kdo smo",
    who: [
      "VALOR je podjetje za AI avtomatizacijo, ki dela s podjetji, ki že imajo vzpostavljeno infrastrukturo: sisteme za rezervacije, CRM-je, e-poštne predale, preglednice in ekipne klepete.",
      "Večina AI orodij odpove, ker ne ve, kako vaše podjetje zares deluje. Mi začnemo prav tam. Popišemo vašo ekipo, vaše poslovanje in način komuniciranja, nato to znanje vgradimo v sistem, ki odgovarja, razvršča in ukrepa tako, kot bi vaša ekipa.",
      "Ničesar, kar ste zgradili, ne zamenjamo. Povežemo, avtomatiziramo, kar se ponavlja, in označimo, kar potrebuje človeka.",
    ],
    focusEyebrow: "Na kaj se osredotočamo",
    focus:
      "Podjetja, katerih poslovanje temelji na komunikaciji in dokumentih: distribucija, špedicija, proizvodnja in gostinstvo.",
    focusChips: ["Distribucija", "Špedicija", "Proizvodnja", "Gostinstvo"],
    founderRole: "Ustanovitelj VALOR",
    howEyebrow: "Kako delamo",
    howTitle: "Trije koraki, en sistem.",
    steps: [
      { title: "Razumevanje", body: "Popišemo vaša orodja, delovne tokove in ozka grla." },
      { title: "Gradnja", body: "Povežemo vaše sisteme in ustvarimo delovne tokove, prilagojene vašemu podjetju." },
      { title: "Delovanje", body: "Sistem dela v ozadju in se izboljšuje z vašimi povratnimi informacijami." },
    ],
    ctaTitle: "Rezervirajte 20-minutni klic.",
    ctaSub: "Pokazali vam bomo, kje vaša ekipa izgubi največ časa.",
    cta: "Rezervirajte klic",
  },
};

export function aboutMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "about", "/about");
}

export function AboutView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const founder = team.find((m) => m.title.en === "Founder");
  return (
    <>
      <PageHero
        crumbs={{ locale, items: [{ name: pageNames[locale].about, path: "/about" }] }}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.title[0]} <span className="text-gold">{t.title[1]}</span>
          </>
        }
        intro={t.intro}
        aside={
          founder?.portrait && (
            // The founder, as the face of the company: portrait with name and role.
            <figure className="relative mx-auto w-full max-w-[15rem] sm:max-w-[18rem] lg:ml-auto lg:max-w-[20rem]">
              <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(201,168,76,0.28),transparent)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-gold/30">
                <Image
                  src={founder.portrait}
                  alt={founder.name[locale]}
                  width={360}
                  height={504}
                  priority
                  sizes="(min-width: 1024px) 320px, 80vw"
                  className="aspect-[5/7] w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-6 pt-20">
                  <span className="block font-display text-2xl font-semibold text-cream">{founder.name[locale]}</span>
                  <span className="mt-1 block text-sm font-medium text-gold">{t.founderRole}</span>
                  {founder.location && (
                    <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-cream/70">{founder.location}</span>
                  )}
                </figcaption>
              </div>
            </figure>
          )
        }
      />

      {/* Who we are, next to what we focus on */}
      <Section tone="base" className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-20">
            <Reveal>
              <p className="eyebrow">{t.whoEyebrow}</p>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-grey">
                <p>{t.who[0]}</p>
                <p>{t.who[1]}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <SpotlightCard
                className="relative flex h-full flex-col justify-center overflow-hidden rounded-[2rem] border border-gold/20 bg-charcoal p-8 md:p-10"
                spotlightColor="rgba(201, 168, 76, 0.18)"
              >
                <Sparkle className="h-10 w-8" />
                <p className="eyebrow mt-6">{t.focusEyebrow}</p>
                <p className="mt-4 font-display text-xl leading-snug text-cream md:text-2xl">{t.focus}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {t.focusChips.map((c) => (
                    <li key={c} className="rounded-full border border-gold/30 bg-gold/[0.06] px-3 py-1 text-sm text-cream/90">
                      {c}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          </div>

          {/* The promise, lighting up word by word as it scrolls past. */}
          <div className="mx-auto mt-20 max-w-4xl text-center md:mt-28">
            <Sparkle className="mx-auto h-9 w-7" />
            <ScrollReveal className="mt-6 font-display text-2xl leading-snug text-cream md:text-4xl md:leading-tight">
              {t.who[2]}
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* How we work: three steps joined by a line with a travelling light. */}
      <Section tone="panel" className="py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow={t.howEyebrow} title={t.howTitle} />
          <div className="motion-keep relative mx-auto mt-16 max-w-5xl">
            <span aria-hidden="true" className="flow-line absolute left-[16.5%] right-[16.5%] top-8 hidden h-px bg-gold/30 md:block" />
            <RevealGroup as="ol" stagger={0.12} className="relative grid gap-6 md:grid-cols-3 md:gap-8">
              {t.steps.map((step, i) => (
                <RevealItem as="li" key={step.title} className="flex flex-col items-center text-center">
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/50 bg-[#15110a] font-mono text-xl font-semibold text-gold shadow-[0_0_40px_-10px_rgba(201,168,76,0.6)]">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-cream">{step.title}</h3>
                  <p className="mt-2 max-w-xs leading-relaxed text-grey">{step.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* Where we have worked: the globe and the verified numbers. */}
      <GlobeSection locale={locale} />

      {/* The people: founder and core developers, with photos and links. */}
      <Team locale={locale} />

      <CtaBand title={t.ctaTitle} sub={t.ctaSub} cta={t.cta} />
    </>
  );
}
