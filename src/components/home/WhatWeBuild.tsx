"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
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
 * Services as an explorer: the six areas on the left, the chosen one in
 * detail on the right with a concrete example. On phones the areas become a
 * swipeable row of chips above the detail card.
 */
export default function WhatWeBuild({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const [active, setActive] = useState(0);
  // Advances on its own while on screen, until the visitor picks an area.
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const group = t.groups[active];

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
  const Icon = icons[active];

  return (
    <Section id="what-we-build" tone="base" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} intro={t.hint} />

        <div ref={root}>
        <Reveal className="mt-14 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          {/* Areas */}
          <div
            role="tablist"
            aria-label={t.title}
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {t.groups.map((g, i) => {
              const GIcon = icons[i];
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
                    "group relative flex shrink-0 items-center gap-4 overflow-hidden rounded-2xl border px-4 py-3 text-left transition-[border-color,background-color] duration-300 lg:px-5 lg:py-4",
                    on ? "border-gold/70 bg-gold/[0.08]" : "border-cream/[0.08] bg-charcoal/60 hover:border-gold/40",
                  )}
                >
                  <span
                    className={clsx(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300",
                      on ? "border-gold bg-gold text-obsidian" : "border-gold/25 text-gold",
                    )}
                  >
                    <GIcon className="h-5 w-5" />
                  </span>
                  <span className={clsx("whitespace-nowrap font-display text-lg font-semibold lg:whitespace-normal", on ? "text-cream" : "text-cream/80")}>
                    {g.title}
                  </span>
                  <span aria-hidden="true" className={clsx("ml-auto hidden text-gold transition-opacity lg:block", on ? "opacity-100" : "opacity-0")}>
                    →
                  </span>
                  {on && auto && inView && (
                    <span
                      key={`progress-${active}`}
                      aria-hidden="true"
                      className="wwb-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold"
                      style={{ animationDuration: `${AUTO_MS}ms` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div
            id="wwb-panel"
            role="tabpanel"
            aria-labelledby={`wwb-tab-${active}`}
            className="relative overflow-hidden rounded-3xl border border-gold/25 bg-charcoal p-7 md:p-10"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 text-gold/[0.07] [&_svg]:h-64 [&_svg]:w-64"
            >
              <Icon />
            </span>
            <div key={active} className="enter relative" style={{ "--enter-y": "10px", "--enter-duration": "0.45s" } as React.CSSProperties}>
              <span className="font-mono text-xs text-gold">
                0{active + 1} / 0{t.groups.length}
              </span>
              <h3 className="mt-3 font-display t-subhead text-cream">{group.title}</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-cream/[0.08] bg-obsidian/60 px-4 py-3 text-[0.95rem] leading-snug text-cream">
                    <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[0.7rem] text-gold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border-l-2 border-gold bg-gold/[0.06] px-5 py-4">
                <p className="eyebrow text-[0.8rem]">{t.example}</p>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-cream">{group.example}</p>
              </div>
            </div>
          </div>
        </Reveal>
        </div>

        <Reveal as="p" className="mt-12 text-center font-display text-2xl text-gold md:text-3xl">
          {t.custom}
        </Reveal>
      </Container>
    </Section>
  );
}
