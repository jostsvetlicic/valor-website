import type { Metadata } from "next";
import Image from "next/image";
import { team } from "@/content/team";
import SocialLinks from "@/components/SocialLinks";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import Sparkle from "@/components/Sparkle";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { type Dict, type Locale } from "@/i18n";
import { seoMetadata } from "@/lib/seo";
import { pageNames } from "@/content/seo";

const copy: Dict<{
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: [string, string];
  intro: string;
  paragraphs: [string, string, string];
  quote: string;
  standardEyebrow: string;
  standardTitle: string;
  principles: { title: string; body: string }[];
  founderEyebrow: string;
  founderRole: string;
  founderText: string;
  founderFocus: string;
  visionEyebrow: string;
  visionTitle: string;
  visionText: string;
  ctaTitle: string;
  cta: string;
}> = {
  en: {
    metaTitle: "About",
    metaDescription:
      "VALOR is an AI infrastructure company. The standard we hold, the way we work, and the bigger vision: building the systems the best businesses of the next decade will run on.",
    eyebrow: "About VALOR",
    title: ["We build the infrastructure,", "not the buzzwords."],
    intro:
      "VALOR is an AI automation agency from Slovenia that builds AI infrastructure: the software a business actually runs on: the frontend that sells, the automation behind it, the operations system your team works in, and the layer that connects the tools you already use.",
    paragraphs: [
      "Most companies do not have a software problem. They have a dozen tools that do not talk to each other, work typed in by hand twice, and no single, current view of how the operation is running.",
      "So we build the whole path instead of a single tool, from the interface a customer touches, to the automation that answers and follows up, to the operations system the team lives in, to the integration layer that ties the existing systems together. One system, not ten disconnected ones.",
      "The standard we hold is simple: if it is not faster, clearer, and genuinely less work for a real person on a real Tuesday, it is not finished.",
    ],
    quote:
      "“We're not building websites. We're building the infrastructure the best companies of the next decade will run on.”",
    standardEyebrow: "The standard",
    standardTitle: "The principles we don't bend on.",
    principles: [
      {
        title: "Start where the manual work is",
        body: "We map the manual work first and rank it by cost. Then we automate the most expensive process, prove it, and move to the next. No eighteen-month rebuild before anything works.",
      },
      {
        title: "One source of truth",
        body: "Everything reads from the same place: the public product, the operations panel, the integrations. Nothing gets typed in twice, and no one argues about which number is right.",
      },
      {
        title: "Build on what you already run",
        body: "We don't rip out your core systems. We build the layer on top of them that people actually use, and integrate through the interfaces they already expose.",
      },
    ],
    founderEyebrow: "Founder",
    founderRole: "Founder of VALOR",
    founderText:
      "Jošt leads strategy, sales and system design, and is your first contact on every project. He works side by side with the VALOR development team on every build.",
    founderFocus: "Strategy · Sales · System design",
    visionEyebrow: "The bigger vision",
    visionTitle: "The infrastructure of tomorrow, built today.",
    visionText:
      "The same intelligence that answers a customer in seconds will quietly run the businesses of the next decade. We intend to build it, carefully, and for the people who care about how their business actually works.",
    ctaTitle: "Let's build yours.",
    cta: "Book a call",
  },
  sl: {
    metaTitle: "O nas",
    metaDescription:
      "VALOR je podjetje za AI infrastrukturo. Standard, ki ga držimo, način dela in večja vizija: sistemi, na katerih bodo delovala najboljša podjetja naslednjega desetletja.",
    eyebrow: "O VALOR",
    title: ["Gradimo infrastrukturo,", "ne modnih besed."],
    intro:
      "VALOR je AI agencija iz Slovenije, ki gradi AI infrastrukturo: programsko opremo, na kateri podjetje zares deluje: spletni vmesnik, ki prodaja, avtomatizacijo v ozadju, operativni sistem, v katerem dela vaša ekipa, in plast, ki poveže orodja, ki jih že uporabljate.",
    paragraphs: [
      "Večina podjetij nima težave s programsko opremo. Ima ducat orodij, ki se med seboj ne pogovarjajo, delo, ki se ročno vnaša dvakrat, in nobenega enotnega, ažurnega pogleda na to, kako poslovanje teče.",
      "Zato namesto enega orodja zgradimo celotno pot: od vmesnika, ki se ga dotakne stranka, prek avtomatizacije, ki odgovarja in sledi, do operativnega sistema, v katerem živi ekipa, in integracijske plasti, ki poveže obstoječe sisteme. En sistem, ne deset nepovezanih.",
      "Naš standard je preprost: če ni hitreje, jasneje in resnično manj dela za resnično osebo na povsem običajen torek, ni dokončano.",
    ],
    quote:
      "„Ne gradimo spletnih strani. Gradimo infrastrukturo, na kateri bodo delovala najboljša podjetja naslednjega desetletja.“",
    standardEyebrow: "Standard",
    standardTitle: "Načela, pri katerih ne popuščamo.",
    principles: [
      {
        title: "Začnemo tam, kjer je ročno delo",
        body: "Najprej popišemo ročno delo in ga razvrstimo po strošku. Nato avtomatiziramo najdražji proces, dokažemo rezultat in gremo na naslednjega. Brez osemnajstmesečne prenove, preden karkoli deluje.",
      },
      {
        title: "En vir resnice",
        body: "Vse bere iz istega mesta: javni del, operativni panel, integracije. Nič se ne vnaša dvakrat in nihče se ne prepira, katera številka je prava.",
      },
      {
        title: "Gradimo na tem, kar že uporabljate",
        body: "Vaših osrednjih sistemov ne izruvamo. Nad njimi zgradimo plast, ki jo ljudje dejansko uporabljajo, in se povežemo prek vmesnikov, ki jih že ponujajo.",
      },
    ],
    founderEyebrow: "Ustanovitelj",
    founderRole: "Ustanovitelj VALOR",
    founderText:
      "Jošt vodi strategijo, prodajo in zasnovo sistemov ter je vaš prvi kontakt pri vsakem projektu. Pri vsakem projektu dela z ramo ob rami z razvojno ekipo VALOR.",
    founderFocus: "Strategija · Prodaja · Zasnova sistemov",
    visionEyebrow: "Večja vizija",
    visionTitle: "Infrastruktura jutrišnjega dne, zgrajena danes.",
    visionText:
      "Ista inteligenca, ki stranki odgovori v nekaj sekundah, bo tiho vodila podjetja naslednjega desetletja. Nameravamo jo zgraditi, skrbno, za ljudi, ki jim je mar, kako njihovo podjetje zares deluje.",
    ctaTitle: "Zgradimo vašega.",
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
      />

      <Section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-20">
            <Reveal className="space-y-6 text-lg leading-relaxed text-grey">
              <p>{t.paragraphs[0]}</p>
              <p>{t.paragraphs[1]}</p>
              <p className="text-cream">{t.paragraphs[2]}</p>
            </Reveal>
            <Reveal
              delay={0.1}
              className="relative flex flex-col justify-center overflow-hidden rounded-[2rem] border border-gold/20 bg-charcoal p-10"
            >
              <Sparkle id="about" className="h-10 w-10" />
              <p className="mt-6 font-display text-2xl italic leading-snug text-cream">{t.quote}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Founder */}
      <Section tone="panel" className="py-20 md:py-28">
        <Container>
          <Reveal className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14">
            {founder?.portrait ? (
              <Image
                src={founder.portrait}
                alt={founder.name[locale]}
                width={360}
                height={504}
                sizes="(min-width: 768px) 288px, 224px"
                className="h-[19rem] w-56 rounded-[2rem] object-cover ring-1 ring-gold/30 md:h-[25rem] md:w-72"
              />
            ) : (
              // Fallback monogram if no portrait is set in content/team.ts
              <div
                aria-hidden="true"
                className="flex h-56 w-56 items-center justify-center rounded-[2rem] border border-gold/30 bg-gradient-to-br from-[#1b170e] to-charcoal font-display text-6xl font-semibold text-gold md:h-72 md:w-72"
              >
                JS
              </div>
            )}
            <div>
              <p className="eyebrow">{t.founderEyebrow}</p>
              <h2 className="mt-3 font-display t-section text-cream">Jošt Svetličič</h2>
              <p className="mt-2 text-lg font-medium text-gold">{t.founderRole}</p>
              <p className="mt-5 max-w-2xl t-lead text-grey">{t.founderText}</p>
              <p className="mt-5 text-sm uppercase tracking-[0.14em] text-grey">
                {t.founderFocus}
                {founder?.location ? ` · ${founder.location}` : ""}
              </p>
              {founder && <SocialLinks socials={founder.socials} name={founder.name[locale]} className="mt-6" />}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="light" className="py-20 md:py-28">
        <Container>
          <SectionHeading light eyebrow={t.standardEyebrow} title={t.standardTitle} />
          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {t.principles.map((p, i) => (
              <RevealItem
                key={p.title}
                hoverLift
                className="rounded-3xl border border-obsidian/10 bg-[#fcfaf6] p-8 shadow-[0_20px_50px_-30px_rgba(10,10,10,0.35)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-obsidian">
                  <Sparkle id={`prin-${i}`} className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-obsidian">{p.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-obsidian/70">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="panel" className="py-20 md:py-28">
        <Container>
          <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-gold/20 bg-charcoal p-12 text-center md:p-16">
            <span className="eyebrow">{t.visionEyebrow}</span>
            <h2 className="mt-5 font-display t-section text-cream">{t.visionTitle}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-grey">{t.visionText}</p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand title={t.ctaTitle} cta={t.cta} />
    </>
  );
}
