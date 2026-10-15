"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const SPACING = 34;
const DRIFT_PX_PER_MS = 0.006;

/**
 * A quiet field of gold dots on a grid that drifts diagonally while a slow
 * wave of brightness moves through it. Pauses off-screen.
 */
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const gold = getComputedStyle(document.documentElement).getPropertyValue("--color-gold").trim() || "#c9a84c";
    const reduce = prefersReducedMotion();
    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Dots are grouped into a few brightness levels and each level is drawn
    // as one path: 8 fills per frame instead of one per dot.
    const LEVELS = 8;
    const paths: Path2D[] = [];
    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gold;
      for (let i = 0; i < LEVELS; i++) paths[i] = new Path2D();
      const shift = (t * DRIFT_PX_PER_MS) % SPACING;
      for (let y = -SPACING + shift; y < height + SPACING; y += SPACING) {
        const wy = Math.sin(y * 0.016 - t * 0.0003);
        for (let x = -SPACING + shift; x < width + SPACING; x += SPACING) {
          const wave = (Math.sin(x * 0.012 + t * 0.00045) + wy + 2) / 4;
          const level = Math.min(LEVELS - 1, Math.floor(wave * LEVELS));
          const r = 0.8 + 0.6 * ((level + 0.5) / LEVELS);
          const p = paths[level];
          p.moveTo(x + r, y);
          p.arc(x, y, r, 0, Math.PI * 2);
        }
      }
      for (let i = 0; i < LEVELS; i++) {
        const w = (i + 0.5) / LEVELS;
        ctx.globalAlpha = 0.06 + 0.3 * w * w;
        ctx.fill(paths[i]);
      }
    };

    // About 30 redraws a second is plenty for a slow drift and leaves the
    // rest of each frame to scrolling. Stops completely while off screen.
    let last = 0;
    const loop = (t: number) => {
      frame = requestAnimationFrame(loop);
      if (t - last < 32) return;
      last = t;
      draw(t);
    };
    const start = () => {
      if (!frame && !reduce) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(last || performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    io.observe(canvas);
    draw(performance.now());

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  );
}
