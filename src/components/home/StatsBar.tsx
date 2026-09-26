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
  const inView = useInView(ref, { once: true, amount: 0.5 });

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
    <div className="py-16 md:py-20">
      <Container>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-3 text-center"
            >
              <dd
                className="font-display font-medium leading-none tracking-tight text-gold"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                <CountUp target={stat.number} suffix={stat.suffix} />
              </dd>
              <dt className="text-sm font-medium leading-snug text-grey">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}
