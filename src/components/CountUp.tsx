"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  animate,
  useMotionValueEvent,
} from "framer-motion";

/**
 * Counts from `from` up to `to` when scrolled into view.
 * Supports a numeric range rendered as "a to b".
 */
export default function CountUp({
  to,
  toEnd,
  from = 0,
  duration = 2,
  className,
}: {
  to: number;
  toEnd?: number;
  from?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const mv = useMotionValue(from);
  const mvEnd = useMotionValue(from);
  const [display, setDisplay] = useState(from);
  const [displayEnd, setDisplayEnd] = useState(from);

  useMotionValueEvent(mv, "change", (v) => setDisplay(Math.round(v)));
  useMotionValueEvent(mvEnd, "change", (v) => setDisplayEnd(Math.round(v)));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] });
    let controlsEnd: ReturnType<typeof animate> | undefined;
    if (toEnd !== undefined) {
      controlsEnd = animate(mvEnd, toEnd, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
    }
    return () => {
      controls.stop();
      controlsEnd?.stop();
    };
  }, [inView, to, toEnd, duration, mv, mvEnd]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}
      {toEnd !== undefined && ` to ${displayEnd.toLocaleString()}`}
    </span>
  );
}
