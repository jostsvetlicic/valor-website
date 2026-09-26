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

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = 50;
    const tick = () => {
      frame++;
      setCount(Math.round(target * (frame / total)));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);

  return count;
}

function StatItem({
  number,
  suffix,
  label,
  active,
}: {
  number: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const count = useCountUp(number, active);
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span
        className="font-display font-medium leading-none tracking-tight text-gold"
        style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
      >
        {count}{suffix}
      </span>
      <span className="text-sm font-medium leading-snug text-grey">
        {label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  // Observe the whole section — much more reliable than a tiny span
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0 });

  return (
    <div ref={sectionRef} className="py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-y-0">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} active={inView} />
          ))}
        </div>
      </Container>
    </div>
  );
}
