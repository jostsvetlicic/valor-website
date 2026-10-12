"use client";

import { useEffect, useRef, useState } from "react";
import { IconDocument, IconNetwork, IconShield, IconSpark, IconWorkflow, IconCog } from "@/components/Icons";
import type { HowStep } from "@/content/howItWorks";
import { clsx } from "@/lib/clsx";

const icons = [IconNetwork, IconDocument, IconCog, IconWorkflow, IconShield, IconSpark];

/**
 * Scroll-driven explainer: the step texts scroll on the right while a sticky
 * card on the left shows the step in the middle of the screen. On phones the
 * card sits inside each step instead.
 */
export default function HowItWorksSteps({ steps, stepLabel }: { steps: HowStep[]; stepLabel: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
      {/* Sticky visual (desktop) */}
      <div className="hidden lg:block">
        <div className="sticky top-32">
          <StepCard step={steps[active]} index={active} total={steps.length} stepLabel={stepLabel} />
          <ol className="mt-6 flex gap-2" aria-hidden="true">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className={clsx(
                  "h-1 flex-1 rounded-full transition-colors duration-500",
                  i < active ? "bg-gold/60" : i === active ? "bg-gold" : "bg-cream/10",
                )}
              />
            ))}
          </ol>
        </div>
      </div>

      {/* Step texts */}
      <ol className="space-y-6 lg:space-y-0">
        {steps.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className="lg:flex lg:min-h-[70vh] lg:items-center"
          >
            <div
              className={clsx(
                "rounded-3xl border p-7 transition-[border-color,background-color,opacity] duration-500 md:p-9 lg:border-0 lg:bg-transparent lg:p-0",
                i === active ? "border-gold/40 bg-charcoal lg:opacity-100" : "border-cream/[0.08] bg-charcoal/60 lg:opacity-40",
              )}
            >
              <span className="font-mono text-sm text-gold">
                {stepLabel} {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-display t-section text-cream">{s.title}</h2>
              <p className="mt-5 max-w-xl t-lead text-grey">{s.text}</p>
              <div className="mt-6 lg:hidden">
                <StepCard step={s} index={i} total={steps.length} stepLabel={stepLabel} compact />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StepCard({
  step,
  index,
  total,
  stepLabel,
  compact = false,
}: {
  step: HowStep;
  index: number;
  total: number;
  stepLabel: string;
  compact?: boolean;
}) {
  const Icon = icons[index] ?? IconSpark;
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[2rem] border border-gold/25",
        compact ? "bg-obsidian p-6" : "bg-gradient-to-br from-[#1b170e] to-charcoal p-10",
      )}
    >
      {!compact && (
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-6 -right-2 font-display text-[11rem] font-semibold leading-none text-gold/[0.06]">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <div key={index} className="enter relative" style={{ "--enter-y": "10px", "--enter-duration": "0.4s" } as React.CSSProperties}>
        {!compact && (
          <div className="flex items-center justify-between">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-obsidian">
              <Icon className="h-6 w-6" />
            </span>
            <span className="font-mono text-xs text-grey">
              {stepLabel} {index + 1} / {total}
            </span>
          </div>
        )}
        {!compact && <p className="mt-8 font-display t-subhead text-cream">{step.title}</p>}
        <ul className={clsx("space-y-3", !compact && "mt-6")}>
          {step.detail.map((d) => (
            <li key={d} className="flex items-start gap-3 text-[0.95rem] leading-snug text-cream">
              <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[0.7rem] text-gold">
                ✓
              </span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
