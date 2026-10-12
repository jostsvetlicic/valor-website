"use client";

import { useEffect, useRef } from "react";

const SPACING = 34;
const DRIFT_PX_PER_MS = 0.006;

/**
 * A quiet field of gold dots on a grid that drifts diagonally while a slow
 * wave of brightness moves through it. Pauses off-screen; drawn once, static,
 * under prefers-reduced-motion.
 */
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const gold = getComputedStyle(document.documentElement).getPropertyValue("--color-gold").trim() || "#c9a84c";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gold;
      const shift = (t * DRIFT_PX_PER_MS) % SPACING;
      for (let y = -SPACING + shift; y < height + SPACING; y += SPACING) {
        for (let x = -SPACING + shift; x < width + SPACING; x += SPACING) {
          const wave =
            (Math.sin(x * 0.012 + t * 0.00045) + Math.sin(y * 0.016 - t * 0.0003) + 2) / 4;
          ctx.globalAlpha = 0.06 + 0.3 * wave * wave;
          ctx.beginPath();
          ctx.arc(x, y, 0.8 + 0.6 * wave, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      frame = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    if (reduce) draw(0);
    else frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
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
