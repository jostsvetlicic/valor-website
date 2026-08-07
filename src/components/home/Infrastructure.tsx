"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Eyebrow } from "@/components/Container";
import { Section } from "@/components/Section";
import { clsx } from "@/lib/clsx";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The infrastructure stack — the core section. Four layers, top to bottom,
 * from the public product down to the systems it connects. Each layer is a
 * real <button> (aria-expanded) in a single-open accordion: clicking a layer
 * expands its detail and dims the others. The layers reveal on scroll as the
 * section enters view.
 *
 * The expand is a CSS `grid-template-rows` animation (0fr -> 1fr) with the
 * detail fading in via opacity, so only the panel's own subtree reflows once —
 * no per-frame layout thrash — and the global reduced-motion rule collapses it
 * to an instant open.
 */
const LAYERS = [
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

export default function Infrastructure() {
  const [active, setActive] = useState(0);

  return (
    <Section id="infrastructure" tone="base" edges glow className="py-24 md:py-36">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>The stack</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.0] tracking-tight text-cream text-balance">
            Four layers. <span className="text-gold">One system.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-grey text-pretty">
            Most companies buy these piecemeal, from different vendors, then
            spend their days bridging the gaps by hand. We build all four — so
            they work as one.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-3 md:mt-20 md:gap-4">
          {LAYERS.map((layer, i) => {
            const isActive = active === i;
            const panelId = `layer-panel-${layer.id}`;
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease, delay: i * 0.07 }}
              >
                <div
                  className={clsx(
                    "overflow-hidden rounded-[1.5rem] border transition-colors duration-300",
                    isActive
                      ? "border-gold/35 bg-charcoal/70"
                      : "border-gold/12 bg-charcoal/30",
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
                      <span className="block font-display text-xl font-medium text-cream md:text-2xl">
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
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
