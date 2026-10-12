"use client";

import { useState } from "react";
import { Container, Eyebrow } from "@/components/Container";
import { Section } from "@/components/Section";
import { clsx } from "@/lib/clsx";
import { Reveal } from "@/components/Reveal";
import type { Dict, Locale } from "@/i18n";


/**
 * The infrastructure stack, the core section. Four layers, top to bottom,
 * from the public product down to the systems it connects. Each layer is a
 * real <button> (aria-expanded) in a single-open accordion: clicking a layer
 * expands its detail and dims the others. The layers reveal on scroll as the
 * section enters view.
 *
 * The expand is a CSS `grid-template-rows` animation (0fr -> 1fr) with the
 * detail fading in via opacity, so only the panel's own subtree reflows once,
 * no per-frame layout thrash, and the global reduced-motion rule collapses it
 * to an instant open.
 */
const LAYERS_EN = [
  {
    id: "interface",
    index: "01",
    name: "Interface layer",
    summary: "The public-facing product your customers actually touch.",
    detail: [
      "Websites and web apps built to sell and convert",
      "Customer portals and self-service areas",
      "Product and vehicle configurators",
      "Mobile apps with per-user login",
      "Multilingual, fast, and structured for SEO",
    ],
  },
  {
    id: "automation",
    index: "02",
    name: "Automation layer",
    summary: "The work that used to be done by hand, running on its own.",
    detail: [
      "Inquiry handling and instant response, 24/7",
      "Document and contract generation",
      "Follow-up sequences and reminders",
      "Booking, viewing and scheduling flows",
      "Routing across email, web and WhatsApp",
    ],
  },
  {
    id: "operations",
    index: "03",
    name: "Operations layer",
    summary: "The internal system your team runs the business on.",
    detail: [
      "Admin panels and CRM",
      "Inventory and listing management",
      "Deal pipelines and commissions",
      "Reporting and forecasting",
      "Role-based access and permissions",
    ],
  },
  {
    id: "integration",
    index: "04",
    name: "Integration layer",
    summary: "The connective tissue between the systems you already run.",
    detail: [
      "ERP, accounting and payment providers",
      "Listing portals and banking rails",
      "Legacy databases and internal tools",
      "Data migration and cleanup",
      "One source of truth across all of them",
    ],
  },
];

const LAYERS_SL: typeof LAYERS_EN = [
  {
    id: "interface",
    index: "01",
    name: "Uporabniška plast",
    summary: "Javni del izdelka, ki se ga stranke dejansko dotaknejo.",
    detail: [
      "Spletne strani in spletne aplikacije, zgrajene za prodajo",
      "Portali za stranke in samopostrežni deli",
      "Konfiguratorji izdelkov in vozil",
      "Mobilne aplikacije z osebno prijavo",
      "Večjezično, hitro in pripravljeno za SEO",
    ],
  },
  {
    id: "automation",
    index: "02",
    name: "Plast avtomatizacije",
    summary: "Delo, ki se je včasih opravljalo ročno, zdaj teče samo.",
    detail: [
      "Obdelava povpraševanj in takojšen odziv, 24/7",
      "Priprava dokumentov in pogodb",
      "Zaporedja opomnikov in sledenja",
      "Rezervacije, ogledi in urniki",
      "Usmerjanje prek e-pošte, spleta in WhatsAppa",
    ],
  },
  {
    id: "operations",
    index: "03",
    name: "Operativna plast",
    summary: "Interni sistem, na katerem vaša ekipa vodi podjetje.",
    detail: [
      "Administrativni paneli in CRM",
      "Upravljanje zalog in ponudbe",
      "Prodajni lijaki in provizije",
      "Poročanje in napovedovanje",
      "Dostop in pravice glede na vlogo",
    ],
  },
  {
    id: "integration",
    index: "04",
    name: "Integracijska plast",
    summary: "Povezovalno tkivo med sistemi, ki jih že uporabljate.",
    detail: [
      "ERP, računovodstvo in ponudniki plačil",
      "Portali z oglasi in bančne povezave",
      "Stare baze podatkov in interna orodja",
      "Selitev in čiščenje podatkov",
      "En vir resnice za vse",
    ],
  },
];

const LAYERS: Dict<typeof LAYERS_EN> = { en: LAYERS_EN, sl: LAYERS_SL };

const ui: Dict<{ eyebrow: string; title: string; gold: string; intro: string }> = {
  en: {
    eyebrow: "The stack",
    title: "Four layers.",
    gold: "One system.",
    intro:
      "Most companies buy these piecemeal, from different vendors, then spend their days bridging the gaps by hand. We build all four, so they work as one.",
  },
  sl: {
    eyebrow: "Zgradba",
    title: "Štiri plasti.",
    gold: "En sistem.",
    intro:
      "Večina podjetij jih kupuje po kosih, od različnih ponudnikov, nato pa dneve preživi z ročnim krpanjem vrzeli. Mi zgradimo vse štiri, da delujejo kot eno.",
  },
};

function PlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Infrastructure({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  const [active, setActive] = useState(0);

  return (
    <Section id="infrastructure" tone="base" edges glow className="py-24 md:py-36">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display t-section text-cream text-balance">
            {t.title} <span className="text-gold">{t.gold}</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-grey text-pretty">
            Most companies buy these piecemeal, from different vendors, then
            spend their days bridging the gaps by hand. We build all four, so
            they work as one.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-3 md:mt-20 md:gap-4">
          {LAYERS[locale].map((layer, i) => {
            const isActive = active === i;
            const panelId = `layer-panel-${layer.id}`;
            return (
              <Reveal key={layer.id} delay={i * 0.07}>
                <div
                  className={clsx(
                    "overflow-hidden rounded-[1.5rem] border backdrop-blur-xl backdrop-saturate-[160%] transition-[border-color,background-color,box-shadow] duration-300",
                    isActive
                      ? "border-gold/30 bg-charcoal/65 shadow-[0_0_0_1px_rgba(201,162,75,0.08),0_12px_40px_-12px_rgba(0,0,0,0.6)]"
                      : "border-white/[0.07] bg-charcoal/25",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    className={clsx(
                      "flex w-full items-center gap-5 px-6 py-6 text-left transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold md:gap-8 md:px-9 md:py-7",
                      isActive ? "opacity-100" : "opacity-55 hover:opacity-90",
                    )}
                  >
                    <span
                      className={clsx(
                        "font-display text-2xl tabular-nums transition-colors duration-300 md:text-3xl",
                        isActive ? "text-gold" : "text-grey",
                      )}
                    >
                      {layer.index}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-xl font-semibold text-cream md:text-2xl">
                        {layer.name}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-grey md:text-base">
                        {layer.summary}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "shrink-0 text-gold transition-transform duration-300",
                        isActive ? "rotate-45" : "rotate-0",
                      )}
                    >
                      <PlusIcon />
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={clsx(
                          "px-6 pb-7 transition-opacity duration-300 md:px-9 md:pb-9",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      >
                        <ul className="grid gap-x-10 gap-y-3 border-t border-gold/12 pt-6 sm:grid-cols-2">
                          {layer.detail.map((d) => (
                            <li
                              key={d}
                              className="flex gap-3 text-[0.98rem] leading-relaxed text-cream/85"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
