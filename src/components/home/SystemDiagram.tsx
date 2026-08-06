"use client";

import { useEffect, useRef } from "react";
import { clsx } from "@/lib/clsx";

/**
 * The hero's ambient system diagram: a loose network of gold nodes and the
 * lines between them, representing disconnected systems becoming connected.
 * On load the nodes fade in and the edges draw themselves along their length;
 * afterwards the nodes breathe very slowly.
 *
 * All motion is pure CSS (see globals.css `.sys-diagram`) so it runs off the
 * main thread. An IntersectionObserver flips `data-onscreen` to pause every
 * animation while the hero is scrolled out of view, and the global
 * reduced-motion rule collapses the durations to leave it fully drawn and
 * still.
 */

// Node positions in a 1200x760 viewBox. r = radius.
const NODES: { x: number; y: number; r: number }[] = [
  { x: 120, y: 140, r: 5 },
  { x: 320, y: 230, r: 6 },
  { x: 240, y: 470, r: 5 },
  { x: 520, y: 120, r: 5 },
  { x: 620, y: 340, r: 7 },
  { x: 470, y: 580, r: 5 },
  { x: 820, y: 210, r: 6 },
  { x: 970, y: 430, r: 6 },
  { x: 760, y: 560, r: 5 },
  { x: 1080, y: 180, r: 5 },
  { x: 1060, y: 610, r: 5 },
  { x: 180, y: 650, r: 5 },
];

// Edges as pairs of node indices — a connected mesh with a couple of hubs.
const EDGES: [number, number][] = [
  [0, 1], [1, 3], [1, 2], [3, 4], [2, 4], [2, 11], [4, 5], [5, 8],
  [4, 6], [6, 7], [7, 9], [7, 10], [8, 7], [6, 9], [4, 8], [11, 5], [3, 6],
];

type CSSVars = React.CSSProperties & Record<string, string | number>;

export default function SystemDiagram({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) =>
        el.setAttribute("data-onscreen", entry.isIntersecting ? "true" : "false"),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      data-onscreen="true"
      className={clsx("sys-diagram", className)}
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      {EDGES.map(([a, b], i) => {
        const n1 = NODES[a];
        const n2 = NODES[b];
        const len = Math.round(Math.hypot(n2.x - n1.x, n2.y - n1.y));
        return (
          <line
            key={`e${i}`}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            style={{ "--len": len, "--d": `${0.35 + i * 0.05}s` } as CSSVars}
          />
        );
      })}
      {NODES.map((n, i) => (
        <circle
          key={`n${i}`}
          cx={n.x}
          cy={n.y}
          r={n.r}
          style={{ "--d": `${i * 0.05}s` } as CSSVars}
        />
      ))}
    </svg>
  );
}
