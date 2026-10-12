"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { TextLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import WelcomeVideo from "@/components/home/WelcomeVideo";
import { walkthroughVideo } from "@/config/media";
import { processStepsByLocale } from "@/content/process";
import { href, type Dict, type Locale } from "@/i18n";

type Labels = {
  you: string;
  callLabel: string;
  nodes: [string, string, string, string];
  pilot: string;
  measured: string;
  minutes: string;
  before: string;
  after: string;
  realDocs: string;
  chips: [string, string, string];
  eyebrow: string;
  title: string;
  full: string;
  prev: string;
  next: string;
  aria: string;
  walkthrough: string;
};

const ui: Dict<Labels> = {
  en: {
    you: "You",
    callLabel: "Discovery call",
    nodes: ["Email", "ERP", "Documents", "Your team"],
    pilot: "Pilot on one process",
    measured: "✓ Results measured",
    minutes: "Minutes per task, measured",
    before: "Before",
    after: "After",
    realDocs: "On your real documents",
    chips: ["Update shipped", "New automation", "Monthly check"],
    eyebrow: "How we work",
    title: "From first call to a running system",
    full: "The full process",
    prev: "Previous step",
    next: "Next step",
    aria: "Our five-step process",
    walkthrough: "Play the walkthrough",
  },
  sl: {
    you: "Vi",
    callLabel: "Uvodni klic",
    nodes: ["E-pošta", "ERP", "Dokumenti", "Vaša ekipa"],
    pilot: "Pilot na enem procesu",
    measured: "✓ Rezultati izmerjeni",
    minutes: "Minute na opravilo, izmerjene",
    before: "Prej",
    after: "Potem",
    realDocs: "Na vaših pravih dokumentih",
    chips: ["Posodobitev uvedena", "Nova avtomatizacija", "Mesečni pregled"],
    eyebrow: "Kako delamo",
    title: "Od prvega klica do delujočega sistema",
    full: "Celoten proces",
    prev: "Prejšnji korak",
    next: "Naslednji korak",
    aria: "Naš proces v petih korakih",
    walkthrough: "Predvajaj predstavitev",
  },
};
import { clsx } from "@/lib/clsx";

/* ---------- one small looping visual per stage (CSS: .pv-* in globals) ---------- */

function CallVisual({ t }: { t: Labels }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 font-display text-sm text-gold">
          V
        </span>
        <span className="flex h-8 items-center gap-1" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <span
              key={i}
              className="pv-eq block h-full w-1 rounded-full bg-gold"
              style={{ animationDelay: `${i * 0.11}s` }}
            />
          ))}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/30 text-xs text-cream">
          {t.you}
        </span>
      </div>
      <span className="pv-call-timer font-mono text-xs tabular-nums text-grey" data-label={t.callLabel} />
    </div>
  );
}

function ScopeVisual({ t }: { t: Labels }) {
  const nodes = [
    { x: 42, y: 28, label: t.nodes[0] },
    { x: 198, y: 28, label: t.nodes[1] },
    { x: 42, y: 112, label: t.nodes[2] },
    { x: 198, y: 112, label: t.nodes[3] },
  ];
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" aria-hidden="true">
      {nodes.map((n, i) => (
        <line
          key={n.label}
          className="pv-draw"
          style={{ animationDelay: `${i * 0.35}s` }}
          x1="120"
          y1="70"
          x2={n.x}
          y2={n.y}
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          pathLength={1}
        />
      ))}
      <rect
        x="92"
        y="56"
        width="56"
        height="28"
        rx="8"
        fill="var(--color-obsidian)"
        stroke="var(--color-gold)"
      />
      <text
        x="120"
        y="74"
        textAnchor="middle"
        fontSize="10"
        fill="var(--color-gold)"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
      >
        VALOR
      </text>
      {nodes.map((n) => (
        <g key={`${n.label}-node`}>
          <rect
            x={n.x - 32}
            y={n.y - 11}
            width="64"
            height="22"
            rx="6"
            fill="var(--color-charcoal)"
            stroke="rgba(245,240,232,.25)"
          />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fontSize="9"
            fill="var(--color-cream)"
            fontFamily="Inter, sans-serif"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function BuildVisual({ t }: { t: Labels }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-6">
      {[72, 54, 88, 40].map((w, i) => (
        <span key={i} className="block h-2 rounded-full bg-cream/10">
          <span
            className="pv-grow block h-full origin-left rounded-full bg-gold/70"
            style={{ width: `${w}%`, animationDelay: `${i * 0.4}s` }}
          />
        </span>
      ))}
      <span className="mt-3 flex items-center justify-between gap-3 text-[0.7rem]">
        <span className="text-grey">{t.pilot}</span>
        <span className="pv-pass font-medium text-emerald-400">
          {t.measured}
        </span>
      </span>
    </div>
  );
}

function TestVisual({ t }: { t: Labels }) {
  return (
    <div className="flex h-full flex-col justify-center gap-4 px-6">
      <p className="text-[0.7rem] uppercase tracking-[0.14em] text-grey">{t.minutes}</p>
      {[
        { label: t.before, width: 92, color: "bg-[#e0795a]/70" },
        { label: t.after, width: 22, color: "bg-gold" },
      ].map((bar, i) => (
        <div key={bar.label} className="flex items-center gap-3">
          <span className="w-12 shrink-0 text-xs text-cream">{bar.label}</span>
          <span className="block h-2.5 flex-1 rounded-full bg-cream/10">
            <span
              className={`pv-grow block h-full origin-left rounded-full ${bar.color}`}
              style={{ width: `${bar.width}%`, animationDelay: `${i * 0.6}s` }}
            />
          </span>
        </div>
      ))}
      <p className="text-[0.7rem] text-grey">{t.realDocs}</p>
    </div>
  );
}

function SupportVisual({ t }: { t: Labels }) {
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-6">
      <svg viewBox="0 0 220 50" className="h-12 w-full" aria-hidden="true">
        <polyline
          className="pv-pulse"
          pathLength={1}
          points="0,25 40,25 52,10 64,40 76,25 120,25 132,12 144,38 156,25 220,25"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
        />
      </svg>
      <div className="flex flex-wrap gap-2 text-[0.68rem]">
        {t.chips.map((c, i) => (
          <span
            key={c}
            className="pv-chip rounded-full border border-emerald-400/40 px-2.5 py-1 text-emerald-400"
            style={{ animationDelay: `${i * 0.9}s` }}
          >
            ✓ {c}
          </span>
        ))}
      </div>
    </div>
  );
}

// One visual per step: call, one-week test, pilot, ERP project, support.
const visuals = [
  CallVisual,
  TestVisual,
  BuildVisual,
  ScopeVisual,
  SupportVisual,
];

/**
 * Five steps as a horizontal carousel: drag (mouse), swipe/scroll (touch,
 * trackpad), or use the tabs and arrows. Only the active step's visual animates.
 * Without JS it is still a native, snap-scrolling row.
 */
export default function ProcessTeaser({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  const steps = processStepsByLocale[locale];
  const scrollerRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const goTo = (i: number) => {
    const scroller = scrollerRef.current;
    const card = scroller?.children[
      Math.max(0, Math.min(steps.length - 1, i))
    ] as HTMLElement | undefined;
    if (!scroller || !card) return;
    scroller.scrollTo({
      left: card.offsetLeft - scroller.offsetLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      const x = scroller.scrollLeft;
      let best = 0;
      let bestDist = Infinity;
      Array.from(scroller.children).slice(0, steps.length).forEach((c, i) => {
        const d = Math.abs(
          (c as HTMLElement).offsetLeft - scroller.offsetLeft - x,
        );
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [steps.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !scrollerRef.current) return;
    drag.current = {
      x: e.clientX,
      left: scrollerRef.current.scrollLeft,
      moved: false,
    };
    scrollerRef.current.style.scrollSnapType = "none";
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const scroller = scrollerRef.current;
    if (!d || !scroller) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    scroller.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const scroller = scrollerRef.current;
    const d = drag.current;
    if (!d || !scroller) return;
    drag.current = null;
    scroller.style.scrollSnapType = "";
    if (d.moved) goTo(active);
  };

  const arrow =
    "flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-30";

  return (
    <Section id="how-we-work" className="motion-keep py-24 md:py-32">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            eyebrow={t.eyebrow}
            title={t.title}
          />
          <TextLink href={href(locale, "/process")}>{t.full}</TextLink>
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center gap-2">
          {steps.map((s, i) => (
            <button
              key={s.number}
              type="button"
              onClick={() => goTo(i)}
              aria-current={active === i ? "step" : undefined}
              className={clsx(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
                active === i
                  ? "border-gold bg-gold text-obsidian"
                  : "border-cream/15 text-cream hover:border-gold/60 hover:text-gold",
              )}
            >
              <span className="mr-1.5 tabular-nums opacity-70">{i + 1}</span>
              {s.title}
            </button>
          ))}
          <span className="ml-auto hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label={t.prev}
              className={arrow}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === steps.length - 1}
              aria-label={t.next}
              className={arrow}
            >
              →
            </button>
          </span>
        </Reveal>
      </Container>

      {/* Bleeds off the right edge so the next card peeks in. */}
      <div className="mx-auto mt-8 max-w-7xl pl-6 md:pl-10">
        <ol
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          aria-label={t.aria}
          className="flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        >
          {steps.map((s, i) => {
            const Visual = visuals[i];
            return (
              <li
                key={s.number}
                data-active={active === i}
                className={clsx(
                  "pv w-[85%] shrink-0 snap-start select-none rounded-3xl border bg-charcoal p-5 transition-colors duration-300 sm:w-[60%] lg:w-[40%]",
                  active === i ? "border-gold/60" : "border-cream/[0.08]",
                )}
              >
                <div className="h-44 overflow-hidden rounded-xl border border-cream/[0.06] bg-obsidian">
                  <Visual t={t} />
                </div>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-display text-lg text-gold tabular-nums">
                    {s.number}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-cream">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-3 text-base leading-relaxed text-grey">
                  {s.body}
                </p>
              </li>
            );
          })}
          {/* Spacer: room for the last card to scroll to the front. */}
          <li
            aria-hidden="true"
            className="w-[calc(15%-1rem)] shrink-0 sm:w-[calc(40%-1rem)] lg:w-[calc(60%-1rem)]"
          />
        </ol>
      </div>

      {/* Loom walkthrough slot, hidden until a URL is set in config/media.ts. */}
      {walkthroughVideo.loomUrl && (
        <Container>
          <div className="mx-auto mt-16 max-w-4xl md:mt-20">
            <WelcomeVideo
              video={walkthroughVideo}
              label={t.walkthrough}
            />
            {walkthroughVideo.caption && (
              <p className="mt-5 text-center text-sm leading-relaxed text-grey">
                {walkthroughVideo.caption}
              </p>
            )}
          </div>
        </Container>
      )}
    </Section>
  );
}
