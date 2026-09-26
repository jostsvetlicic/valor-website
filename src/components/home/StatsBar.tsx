"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Container } from "@/components/Container";

const stats = [
  { number: 2,  suffix: "+", label: "Years building AI systems" },
  { number: 20, suffix: "+", label: "Projects delivered" },
  { number: 8,  suffix: "+", label: "Countries" },
  { number: 4,  suffix: "",  label: "Continents" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView) return;
    const duration = 900;
    const steps = Math.max(target, 20);
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(Math.round((target * step) / steps));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} aria-label={`${target}${suffix}`}>
      {count}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <div className="border-y border-gold/10 bg-charcoal/30 py-10 md:py-12">
      <Container>
        <dl className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative flex flex-col items-center gap-2 px-4 text-center md:px-6"
            >
              {/*
                Dividers: show after items 0, 1, 2 (not after the last).
                On mobile (2-col), item 1 sits at the right edge of the row —
                hide its divider so it doesn't float in empty space.
              */}
              {i < stats.length - 1 && (
                <span
                  aria-hidden="true"
                  className={[
                    "pointer-events-none absolute right-0 top-1/2 h-10 w-px -translate-y-1/2 bg-gold/15",
                    i === 1 ? "hidden md:block" : "",
                  ].join(" ").trim()}
                />
              )}

              <dt className="order-2 text-sm font-medium leading-snug text-grey">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-[clamp(2.4rem,5vw,3.4rem)] font-medium leading-none tracking-tight text-gold">
                <CountUp target={stat.number} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}
