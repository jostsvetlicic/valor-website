"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import {
  IconChat,
  IconDocument,
  IconLead,
  IconMobile,
  IconNetwork,
  IconSpark,
} from "@/components/Icons";
import type { Dict, Locale } from "@/i18n";
import { clsx } from "@/lib/clsx";

const icons = [
  IconLead,
  IconChat,
  IconDocument,
  IconNetwork,
  IconSpark,
  IconMobile,
];

const copy: Dict<{
  eyebrow: string;
  title: string;
  custom: string;
  groups: { title: string; items: string[]; example: string }[];
  example: string;
  hint: string;
}> = {
  en: {
    eyebrow: "Services",
    title: "What we build",
    custom: "And anything custom your business needs.",
    example: "In practice",
    hint: "Pick an area to see what we build there.",
    groups: [
      {
        title: "Sales and CRM",
        items: [
          "CRM and client management",
          "Sales and lead automation",
          "Lead scoring and AI prioritisation",
          "Customer tracking",
        ],
        example: "A new enquiry is scored and sent to the right salesperson with the context attached.",
      },
      {
        title: "Customer communication",
        items: [
          "Support automation",
          "Voice AI agents (inbound/outbound)",
          "Email/WhatsApp/SMS automation",
          "Scheduling of appointments and viewings",
        ],
        example: "\"Where is my delivery?\" is answered on WhatsApp with the live status, any hour.",
      },
      {
        title: "Documents and finance",
        items: [
          "Document and paperwork automation",
          "Data extraction (OCR, contracts)",
          "Payment and finance automation",
          "Dynamic pricing",
        ],
        example: "An order PDF becomes a draft sales order in your ERP, ready for a person to approve.",
      },
      {
        title: "Systems and data",
        items: [
          "Integrations between systems",
          "Data management and sync",
          "Backend and internal systems",
          "Reporting and analytics",
        ],
        example: "Your ERP, webshop and warehouse show the same stock, without anyone copying numbers.",
      },
      {
        title: "AI for teams",
        items: [
          "AI assistants and internal knowledge bases",
          "Content automation (descriptions, ads, emails)",
          "Internal process automation",
        ],
        example: "A new colleague asks how returns work and gets the answer from your own procedures.",
      },
      {
        title: "Apps and portals",
        items: [
          "Custom web and mobile apps",
          "Client and employee portals",
          "Internal business tools",
        ],
        example: "Customers check order status and download documents in their own portal.",
      },
    ],
  },
  sl: {
    eyebrow: "Storitve",
    title: "Kaj zgradimo",
    custom: "In vse, kar po meri potrebuje vaše podjetje.",
    example: "V praksi",
    hint: "Izberite področje in poglejte, kaj zgradimo.",
    groups: [
      {
        title: "Prodaja in CRM",
        items: [
          "CRM in upravljanje strank",
          "Avtomatizacija prodaje in povpraševanj",
          "Ocenjevanje povpraševanj in AI prioritizacija",
          "Spremljanje strank",
        ],
        example: "Novo povpraševanje je ocenjeno in poslano pravemu prodajalcu, skupaj s kontekstom.",
      },
      {
        title: "Komunikacija s strankami",
        items: [
          "Avtomatizacija podpore",
          "Glasovni AI agenti (dohodni/odhodni klici)",
          "Avtomatizacija e-pošte/WhatsApp/SMS",
          "Naročanje na termine in oglede",
        ],
        example: "Na vprašanje \"Kje je moja dostava?\" je na WhatsAppu odgovorjeno s trenutnim stanjem, ob vsaki uri.",
      },
      {
        title: "Dokumenti in finance",
        items: [
          "Avtomatizacija dokumentov in papirologije",
          "Zajem podatkov (OCR, pogodbe)",
          "Avtomatizacija plačil in financ",
          "Dinamično določanje cen",
        ],
        example: "PDF z naročilom postane osnutek prodajnega naloga v vašem ERP, pripravljen za potrditev.",
      },
      {
        title: "Sistemi in podatki",
        items: [
          "Povezave med sistemi",
          "Upravljanje in sinhronizacija podatkov",
          "Zaledni in interni sistemi",
          "Poročanje in analitika",
        ],
        example: "ERP, spletna trgovina in skladišče kažejo isto zalogo, ne da bi kdo prepisoval številke.",
      },
      {
        title: "AI za ekipe",
        items: [
          "AI asistenti in interne baze znanja",
          "Avtomatizacija vsebin (opisi, oglasi, e-pošta)",
          "Avtomatizacija internih procesov",
        ],
        example: "Nov sodelavec vpraša, kako potekajo vračila, in dobi odgovor iz vaših lastnih postopkov.",
      },
      {
        title: "Aplikacije in portali",
        items: [
          "Spletne in mobilne aplikacije po meri",
          "Portali za stranke in zaposlene",
          "Interna poslovna orodja",
        ],
        example: "Kupci v svojem portalu preverijo stanje naročila in prenesejo dokumente.",
      },
    ],
  },
};

const AUTO_MS = 6000;

/**
 * Services as an explorer, in the same premium language as "We make it stop":
 * a numbered list of the six areas on the left (the active one gets a gold
 * bar that fills while it auto-advances) and, on the right, a gold-edged
 * panel with the chosen area, what we build there and a concrete example.
 * On phones the areas become a swipeable row of chips above the panel.
 */
export default function WhatWeBuild({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const [active, setActive] = useState(0);
  // Advances on its own while on screen, until the visitor picks an area.
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const group = t.groups[active];
  const Icon = icons[active];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % t.groups.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [auto, inView, active, t.groups.length]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <Section id="what-we-build" tone="base" className="py-24 md:py-36">
      {/* A soft gold light behind the panel side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/3 -z-10 h-[40rem] w-[40rem] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(201,168,76,0.16), transparent)" }}
      />
      <Container>
        {/* Split header */}
        <Reveal className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="mt-4 font-display t-statement text-cream">
              {t.title}
              <span className="text-gold">.</span>
            </h2>
          </div>
          <p className="max-w-md t-lead text-grey lg:justify-self-end lg:text-right">{t.hint}</p>
        </Reveal>

        <div ref={root} className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* Areas */}
          <div
            role="tablist"
            aria-label={t.title}
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:block lg:overflow-visible lg:border-t lg:border-cream/[0.08] lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {t.groups.map((g, i) => {
              const on = i === active;
              return (
                <button
                  key={g.title}
                  type="button"
                  role="tab"
                  id={`wwb-tab-${i}`}
                  aria-selected={on}
                  aria-controls="wwb-panel"
                  onClick={() => pick(i)}
                  onMouseEnter={() => pick(i)}
                  className={clsx(
                    "group relative flex shrink-0 items-center gap-4 rounded-full border px-4 py-2.5 text-left transition-colors duration-300",
                    "lg:w-full lg:rounded-none lg:border-0 lg:border-b lg:border-cream/[0.08] lg:py-5 lg:pl-6 lg:pr-2",
                    on ? "border-gold/60 bg-gold/[0.08] lg:bg-transparent" : "border-cream/[0.1] hover:border-gold/40",
                  )}
                >
                  {/* Gold bar on the left (desktop): fills while auto-advancing, solid once picked */}
                  <span aria-hidden="true" className="absolute inset-y-3 left-0 hidden w-0.5 overflow-hidden rounded-full bg-cream/[0.08] lg:block">
                    {on && (
                      <span
                        key={`bar-${active}-${auto && inView}`}
                        className={clsx("absolute inset-0 origin-top bg-gold", auto && inView && "wwb-progress-y")}
                        style={auto && inView ? { animationDuration: `${AUTO_MS}ms` } : undefined}
                      />
                    )}
                  </span>
                  <span
                    className={clsx(
                      "font-mono text-xs tabular-nums transition-colors duration-300 lg:text-sm",
                      on ? "text-gold" : "text-grey group-hover:text-cream",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={clsx(
                      "whitespace-nowrap font-display text-base font-semibold transition-colors duration-300 lg:text-2xl",
                      on ? "text-cream" : "text-cream/60 group-hover:text-cream",
                    )}
                  >
                    {g.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "ml-auto hidden text-xl text-gold transition-[opacity,transform] duration-300 lg:block",
                      on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                    )}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail: gold-edged panel */}
          <div className="rounded-[2rem] bg-gradient-to-br from-gold/60 via-gold/10 to-gold/[0.04] p-px shadow-[0_40px_120px_-40px_rgba(201,168,76,0.35)]">
            <div
              id="wwb-panel"
              role="tabpanel"
              aria-labelledby={`wwb-tab-${active}`}
              className="relative h-full overflow-hidden rounded-[calc(2rem-1px)] p-7 md:p-10"
              style={{
                background:
                  "radial-gradient(90% 70% at 100% 0%, rgba(201,168,76,0.14) 0%, transparent 60%), linear-gradient(160deg, #17130b 0%, #111 55%, #0d0d0d 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 -right-10 text-gold/[0.06] [&_svg]:h-72 [&_svg]:w-72"
              >
                <Icon />
              </span>
              <div key={active} className="enter relative" style={{ "--enter-y": "10px", "--enter-duration": "0.45s" } as React.CSSProperties}>
                <div className="flex items-center justify-between">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/50 bg-[#15110a] text-gold shadow-[0_0_40px_-10px_rgba(201,168,76,0.7)]">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="font-mono text-sm text-grey">
                    <span className="text-gold">{String(active + 1).padStart(2, "0")}</span> / {String(t.groups.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-display t-section text-cream">{group.title}</h3>
                <ul className="mt-7 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-snug text-cream">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-[0.65rem] font-bold text-obsidian"
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <figure className="mt-9 border-t border-gold/20 pt-7">
                  <figcaption className="eyebrow text-[0.8rem]">{t.example}</figcaption>
                  <blockquote className="relative mt-3 pl-7 font-display text-xl leading-snug text-cream md:text-2xl">
                    <span aria-hidden="true" className="absolute -top-1 left-0 font-display text-4xl leading-none text-gold">
                      “
                    </span>
                    {group.example}
                  </blockquote>
                </figure>
              </div>
            </div>
          </div>
        </div>

        <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="font-display text-2xl text-cream md:text-3xl">
            {t.custom.split(" ").slice(0, -3).join(" ")}{" "}
            <span className="text-gold">{t.custom.split(" ").slice(-3).join(" ")}</span>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
