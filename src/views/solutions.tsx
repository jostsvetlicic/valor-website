import type { Metadata } from "next";
import { Container } from "@/components/Container";
import HeroParticles from "@/components/home/HeroParticles";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { BookCallButton } from "@/components/Button";
import { FEATURES } from "@/config/features";
import {
  readingGuideByLocale,
  sampleLeadByLocale,
  solutionsByLocale,
  type SampleLead,
  type Solution,
} from "@/content/solutions";
import { type Dict, type Locale } from "@/i18n";
import { breadcrumbSchema, JsonLd, seoMetadata } from "@/lib/seo";
import { pageNames } from "@/content/seo";

type Ui = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  h1: [string, string];
  intro: string;
  note: string;
  mapAria: string;
  map: { data: string; dataSub: string; layer: string; layerSub: string; auto: string; autoSub: string; decide: string; decideSub: string };
  indexAria: string;
  shortNames: Record<string, string>;
  guideEyebrow: string;
  guideTitle: string;
  sampleTitle: string;
  sampleNote: string;
  fitScore: string;
  pain: string;
  result: string;
  options: string;
  automatic: string;
  approve: string;
  bestFit: string;
  inAction: string;
  closingTitle: [string, string];
  closingText: string;
  cta: string;
  disclaimer: string;
};

const ui: Dict<Ui> = {
  en: {
    metaTitle: "Solutions",
    metaDescription:
      "Six focused AI systems: sales, market intelligence, company knowledge, analytics, customer service and dealership performance. One painful workflow first, a result before we go further.",
    kicker: "Practical AI to accelerate your business",
    h1: ["Less manual work.", "More time for creation of the added value."],
    intro:
      "VALOR builds focused AI systems around the specific places where a business loses time, clients, or control. We start with one problem. We show a measurable result before expanding.",
    note: "One painful workflow first. A result before we go further.",
    mapAria:
      "Your data and channels flow into the VALOR intelligence layer, which runs routine work automatically while you keep the decisions.",
    map: {
      data: "Your data and channels",
      dataSub: "CRM · documents · email · WhatsApp",
      layer: "VALOR intelligence layer",
      layerSub: "One verified context for every workflow",
      auto: "Runs automatically",
      autoSub: "Routine tasks handled",
      decide: "You decide",
      decideSub: "Your oversight",
    },
    indexAria: "Solutions",
    shortNames: {
      sales: "Sales Engine",
      market: "Market Intel",
      brain: "Company Brain",
      analytics: "Analytics",
      service: "AI Service",
      dealer: "Dealer 360",
    },
    guideEyebrow: "How to read this",
    guideTitle: "Every solution answers four questions.",
    sampleTitle: "Sample lead: what the salesperson receives",
    sampleNote: "Illustrative example, not a real company.",
    fitScore: "fit score",
    pain: "Pain",
    result: "Result",
    options: "Options in daily use",
    automatic: "Fully automatic",
    approve: "You approve",
    bestFit: "Best fit",
    inAction: "See it in action",
    closingTitle: ["Start with the workflow that", "hurts most."],
    closingText:
      "We map the current process, connect the systems already in use, and launch a controlled first scope. Safe routine work becomes automatic; important decisions stay with the people who own them.",
    cta: "Book a discovery call",
    disclaimer: "Illustrative options are not presented as completed client scope.",
  },
  sl: {
    metaTitle: "Rešitve",
    metaDescription:
      "Šest osredotočenih AI sistemov: prodaja, tržni radar, znanje podjetja, analitika, podpora strankam in uspešnost avtohiše. Najprej en boleč postopek, rezultat, preden gremo naprej.",
    kicker: "Praktični AI za pospeševanje vašega poslovanja",
    h1: ["Manj ročnega dela.", "Več časa za ustvarjanje dodane vrednosti."],
    intro:
      "VALOR gradi osredotočene AI sisteme za tista mesta, kjer podjetje izgublja čas, stranke ali nadzor. Začnemo z enim problemom. Preden razširimo, pokažemo izmerljiv rezultat.",
    note: "Najprej en boleč postopek. Izmerljiv rezultat, preden gremo naprej.",
    mapAria:
      "Vaši podatki in kanali tečejo v inteligentni sloj VALOR, ki rutinsko delo opravi samodejno, odločitve pa ostanejo pri vas.",
    map: {
      data: "Vaši podatki in kanali",
      dataSub: "CRM · dokumenti · e-pošta · WhatsApp",
      layer: "Inteligentni sloj VALOR",
      layerSub: "En preverjen kontekst za vsak postopek",
      auto: "Teče samodejno",
      autoSub: "Rutinsko urejeno",
      decide: "Vi odločate",
      decideSub: "Vaš nadzor",
    },
    indexAria: "Rešitve",
    shortNames: {
      sales: "Prodajni motor",
      market: "Tržni radar",
      brain: "Možgani podjetja",
      analytics: "Analitika",
      service: "Podpora strankam",
      dealer: "Avtohiša 360",
    },
    guideEyebrow: "Kako brati to stran",
    guideTitle: "Vsaka rešitev odgovori na štiri vprašanja.",
    sampleTitle: "Vzorčni lead: kaj dobi prodajalec",
    sampleNote: "Ponazoritveni primer, ne resnično podjetje.",
    fitScore: "ujemanje",
    pain: "Bolečina",
    result: "Rezultat",
    options: "Opcije v vsakodnevni uporabi",
    automatic: "Popolnoma samodejno",
    approve: "Vi odobrite",
    bestFit: "Najbolj primerno za",
    inAction: "Kako deluje v praksi",
    closingTitle: ["Začnemo s postopkom, ki", "boli najbolj."],
    closingText:
      "Preslikamo obstoječi proces, povežemo sisteme, ki jih že uporabljate, in zaženemo nadzorovan prvi obseg. Varno rutinsko delo postane samodejno; pomembne odločitve ostanejo pri ljudeh, ki so zanje odgovorni.",
    cta: "Rezervirajte uvodni klic",
    disclaimer: "Ponazoritvene opcije niso predstavljene kot zaključen obseg dela za stranke.",
  },
};

export function solutionsMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "solutions", "/solutions");
}

/* Hairline grid: 1px gaps over a line colour, cells paint their own fill. */
const GRID = "grid gap-px border border-cream/10 bg-cream/10";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Bullets({ items, dot }: { items: string[]; dot: string }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[0.95rem] leading-relaxed text-cream">
          <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          {t}
        </li>
      ))}
    </ul>
  );
}

function SampleLeadCard({ lead: sampleLead, t }: { lead: SampleLead; t: Ui }) {
  return (
    <Reveal className="mt-px border border-cream/10 bg-charcoal p-6 md:p-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
        <div className="max-w-2xl">
          <Label>{t.sampleTitle}</Label>
          <p className="mt-3 text-sm leading-relaxed text-grey">{sampleLead.intro}</p>
          <p className="mt-2 text-xs text-grey">{t.sampleNote}</p>
        </div>
        <span className="shrink-0 font-display text-4xl font-semibold text-gold">
          {sampleLead.score}% <span className="text-base text-grey">{t.fitScore}</span>
        </span>
      </div>
      <dl className={`mt-6 ${GRID} sm:grid-cols-2 lg:grid-cols-3`}>
        {sampleLead.fields.map((f) => (
          <div key={f.key} className="bg-obsidian p-4">
            <dt className="text-xs text-grey">{f.key}</dt>
            <dd className={`mt-1 text-sm ${f.ok ? "text-emerald-400" : "text-cream"}`}>{f.value}</dd>
          </div>
        ))}
        <div className="bg-obsidian p-4 sm:col-span-2 lg:col-span-3">
          <dt className="text-xs text-grey">{sampleLead.signalKey}</dt>
          <dd className="mt-1 text-sm text-cream">{sampleLead.signal}</dd>
        </div>
      </dl>
      <div className="mt-5 flex items-center gap-4">
        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream/10">
          <span className="block h-full rounded-full bg-gold" style={{ width: `${sampleLead.score}%` }} />
        </span>
        <span className="font-mono text-xs text-grey">{sampleLead.score} / 100</span>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-grey">{sampleLead.caption}</p>
    </Reveal>
  );
}

function SolutionSection({ s, t, lead, tone }: { s: Solution; t: Ui; lead: SampleLead; tone: string }) {
  const ref = FEATURES.solutionReferences ? s.reference : undefined;
  return (
    <section id={s.id} className={`${tone} border-t border-cream/10 py-20 md:py-28`}>
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Label>{s.kicker}</Label>
            <h2 className="mt-3 font-display t-section text-cream">
              {s.name}
            </h2>
          </div>
          {ref && (
            <span className="w-fit whitespace-nowrap rounded-sm border border-gold/40 px-3.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold">
              {ref.status}
            </span>
          )}
        </Reveal>
        {(ref?.text || s.summary) && (
          <Reveal as="p" className="mt-5 max-w-3xl text-[0.95rem] leading-relaxed text-grey">
            {ref?.text ?? s.summary}
          </Reveal>
        )}

        {/* Pain / Result */}
        <RevealGroup className={`mt-10 ${GRID} md:grid-cols-2`}>
          <RevealItem as="div" className="bg-charcoal p-7 md:p-9">
            <Label>{t.pain}</Label>
            <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-cream md:text-2xl">{s.pain.headline}</h3>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-grey">{s.pain.body}</p>
          </RevealItem>
          <RevealItem as="div" className="border-l-2 border-gold bg-obsidian p-7 md:p-9">
            <Label>{t.result}</Label>
            <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-cream md:text-2xl">{s.result.headline}</h3>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-grey">{s.result.body}</p>
          </RevealItem>
        </RevealGroup>

        {s.id === "sales" && <SampleLeadCard lead={lead} t={t} />}

        {/* Flow */}
        <RevealGroup as="ol" stagger={0.08} className={`mt-px ${GRID} sm:grid-cols-2 lg:grid-cols-4`}>
          {s.steps.map((step, i) => (
            <RevealItem as="li" key={step.title} className="bg-charcoal p-5 md:p-6">
              <p className="font-display text-base text-gold">
                {i + 1} · {step.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cream">{step.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Savings / Options */}
        <Reveal className={`mt-px ${GRID} lg:grid-cols-[0.76fr_1.24fr]`}>
          <div className="bg-charcoal p-7 md:p-9">
            <Label>{ref?.savingsLabel ?? s.savingsLabel}</Label>
            <Bullets items={s.savings} dot="bg-gold" />
            <p className="mt-6 border-t border-cream/10 pt-4 text-xs leading-relaxed text-grey">
              {ref?.note ? `${ref.note} ` : ""}
              {s.savingsNote}
            </p>
          </div>
          <div className="bg-charcoal p-7 md:p-9">
            <Label>{t.options}</Label>
            <div className="mt-2 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="mt-4 flex items-center gap-2 text-sm font-medium text-cream">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400" />
                  {t.automatic}
                </p>
                <Bullets items={s.automatic} dot="bg-emerald-400/70" />
              </div>
              <div>
                <p className="mt-4 flex items-center gap-2 text-sm font-medium text-cream">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
                  {t.approve}
                </p>
                <Bullets items={s.approve} dot="bg-gold/70" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Best fit */}
        <Reveal className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.16em] text-cream">{t.bestFit}</span>
          {s.bestFit.map((c) => (
            <span key={c} className="rounded-sm border border-cream/15 px-3 py-1.5 text-xs text-grey">
              {c}
            </span>
          ))}
        </Reveal>

        {/* Before → after */}
        <Reveal className="mt-8">
          <Label>{t.inAction}</Label>
          <div className={`mt-3 ${GRID} md:grid-cols-[1fr_auto_1fr]`}>
            <p className="bg-charcoal p-5 text-[0.95rem] leading-relaxed text-grey">{s.before}</p>
            <p aria-hidden="true" className="hidden items-center bg-charcoal px-4 text-xl text-gold md:flex">
              →
            </p>
            <p className="bg-obsidian p-5 font-display text-lg leading-snug text-gold">{s.after}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function SolutionsView({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  const solutions = solutionsByLocale[locale];
  const readingGuide = readingGuideByLocale[locale];
  const lead = sampleLeadByLocale[locale];
  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ name: pageNames[locale].solutions, path: "/solutions" }])} />

      {/* Hero */}
      <section className="surface-warm relative isolate overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
        <HeroParticles />
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[34rem] w-[60rem] max-w-[160vw] -translate-x-1/2 bg-radial-gold opacity-80" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="enter">
              <Label>{t.kicker}</Label>
              <h1 className="mt-5 font-display t-page text-cream">
                {t.h1[0]}
                <br />
                <span className="text-gold">{t.h1[1]}</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-grey">
                {t.intro}
              </p>
              <p className="mt-6 border-l-2 border-gold pl-4 text-sm font-medium text-cream">
                {t.note}
              </p>
            </div>

            {/* System map */}
            <div
              className="enter grid gap-3 rounded border border-cream/10 bg-charcoal p-6 md:p-7"
              style={{ "--enter-delay": "150ms" } as React.CSSProperties}
              aria-label={t.mapAria}
              role="img"
            >
              <div className="rounded-sm border border-cream/10 bg-obsidian p-4">
                <p className="text-sm font-medium text-cream">{t.map.data}</p>
                <p className="mt-1 text-xs text-grey">{t.map.dataSub}</p>
              </div>
              <p aria-hidden="true" className="text-center text-gold">↓</p>
              <div className="rounded-sm border border-gold bg-gold/15 p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">{t.map.layer}</p>
                <p className="mt-2 font-display text-xl text-cream">{t.map.layerSub}</p>
              </div>
              <p aria-hidden="true" className="text-center text-gold">↓</p>
              <div className={`${GRID} grid-cols-2`}>
                <div className="bg-obsidian p-4">
                  <p className="text-sm font-medium text-cream">{t.map.auto}</p>
                  <p className="mt-1 text-xs text-grey">{t.map.autoSub}</p>
                </div>
                <div className="bg-obsidian p-4">
                  <p className="text-sm font-medium text-cream">{t.map.decide}</p>
                  <p className="mt-1 text-xs text-grey">{t.map.decideSub}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Solution index, sticky under the main nav */}
      <nav aria-label={t.indexAria} className="sticky top-[4.75rem] z-40 border-y border-cream/10 bg-obsidian/95 backdrop-blur">
        <Container>
          <ul className="-mx-2 flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {solutions.map((s, i) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className="block rounded-sm px-3 py-2 text-sm text-grey transition-colors hover:bg-cream/5 hover:text-gold"
                >
                  <span className="mr-1.5 font-mono text-xs text-gold">0{i + 1}</span>
                  {t.shortNames[s.id] ?? s.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {/* How to read this */}
      <section className="surface-light py-20 md:py-28">
        <Container>
          <Reveal>
            <Label>{t.guideEyebrow}</Label>
            <h2 className="mt-3 font-display t-section text-obsidian">
              {t.guideTitle}
            </h2>
          </Reveal>
          <RevealGroup stagger={0.07} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {readingGuide.map((g, i) => (
              <RevealItem
                key={g.title}
                className="rounded-3xl border border-obsidian/10 bg-[#fcfaf6] p-6 shadow-[0_20px_50px_-34px_rgba(10,10,10,0.4)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-obsidian font-mono text-xs font-semibold text-gold">
                  0{i + 1}
                </span>
                <p className="mt-4 font-display text-xl font-semibold text-obsidian">{g.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-obsidian/70">{g.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {solutions.map((s, i) => (
        <SolutionSection key={s.id} s={s} t={t} lead={lead} tone={i % 2 === 0 ? "surface-void" : "surface-base"} />
      ))}

      {/* Closing */}
      <section className="surface-warm border-t border-gold/20 py-24 md:py-32">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display t-statement text-cream">
              {t.closingTitle[0]} <span className="text-gold">{t.closingTitle[1]}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-grey">
              {t.closingText}
            </p>
            <div className="mt-10 flex justify-center">
              <BookCallButton label={t.cta} />
            </div>
            <p className="mx-auto mt-10 max-w-xl text-xs leading-relaxed text-grey">
              {t.disclaimer}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
