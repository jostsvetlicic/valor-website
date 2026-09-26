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
    <div className="border-y border-gold/10 py-2 md:py-0">
      <Container>
        <dl>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                "flex items-center justify-between gap-8 py-5 md:py-6",
                i < stats.length - 1 ? "border-b border-gold/10" : "",
              ].join(" ").trim()}
            >
              <dd className="shrink-0 font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-none tracking-tight text-gold">
                <CountUp target={stat.number} suffix={stat.suffix} />
              </dd>
              <dt className="text-right text-sm font-medium leading-snug text-grey sm:text-base">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}
