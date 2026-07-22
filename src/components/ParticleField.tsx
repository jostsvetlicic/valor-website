"use client";

import { useEffect, useRef } from "react";

/**
 * A faint drifting gold particle field on a canvas. Deliberately light —
 * a few dozen slow motes with a soft glow. The glow is baked ONCE into an
 * offscreen sprite and blitted with drawImage each frame, so there is no
 * per-particle `shadowBlur` (which is a costly Gaussian blur per fill and
 * was previously saturating the main thread). A single guarded RAF loop
 * runs only while the field is both on-screen and the tab is visible, and
 * it respects reduced-motion.
 */
export default function ParticleField({
  className,
  density = 0.00007,
}: {
  className?: string;
  density?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Read the active accent from CSS variables so particles follow the
    // palette. Parse the resolved value (hex or rgb) into an [r,g,b] tuple.
    function readRGB(varName: string, fallback: [number, number, number]) {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      if (raw.startsWith("#")) {
        let h = raw.slice(1);
        if (h.length === 3) h = h.split("").map((c) => c + c).join("");
        const n = parseInt(h, 16);
        if (!Number.isNaN(n) && h.length === 6) {
          return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as [
            number,
            number,
            number,
          ];
        }
      }
      const m = raw.match(/(\d+),\s*(\d+),\s*(\d+)/);
      if (m) return [+m[1], +m[2], +m[3]] as [number, number, number];
      return fallback;
    }

    const fill = readRGB("--color-gold-light", [224, 192, 112]);
    const glow = readRGB("--color-gold", [201, 162, 75]);

    // Pre-render a soft round glow sprite ONCE. Each particle is drawn by
    // blitting this sprite (cheap, GPU-composited) instead of stroking a
    // blurred arc every frame.
    const SPRITE = 32; // sprite canvas size in device-independent px
    const sprite = document.createElement("canvas");
    sprite.width = SPRITE;
    sprite.height = SPRITE;
    const sctx = sprite.getContext("2d");
    if (sctx) {
      const c = SPRITE / 2;
      const grad = sctx.createRadialGradient(c, c, 0, c, c, c);
      grad.addColorStop(0, `rgba(${fill[0]}, ${fill[1]}, ${fill[2]}, 1)`);
      grad.addColorStop(0.35, `rgba(${fill[0]}, ${fill[1]}, ${fill[2]}, 0.55)`);
      grad.addColorStop(1, `rgba(${glow[0]}, ${glow[1]}, ${glow[2]}, 0)`);
      sctx.fillStyle = grad;
      sctx.beginPath();
      sctx.arc(c, c, c, 0, Math.PI * 2);
      sctx.fill();
    }

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      base: number;
      phase: number;
      speed: number;
    };
    let particles: P[] = [];

    function build() {
      const parent = canvas!.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fewer particles, capped harder on small screens for mobile headroom.
      const cap = width < 640 ? 40 : 70;
      const count = Math.max(
        20,
        Math.min(cap, Math.floor(width * height * density)),
      );
      particles = Array.from({ length: count }, () => {
        const base = Math.random() * 0.5 + 0.1;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.6 + 0.5,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          base,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.015 + 0.004,
        };
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.speed;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const twinkle = p.base + Math.sin(p.phase) * 0.25;
        const alpha = Math.max(0, Math.min(1, twinkle));
        // Sprite drawn ~4x the core radius so the soft halo reads as a glow.
        const s = p.r * 4;
        ctx!.globalAlpha = alpha;
        ctx!.drawImage(sprite, p.x - s, p.y - s, s * 2, s * 2);
      }
      ctx!.globalAlpha = 1;
    }

    // Single guarded RAF loop — never more than one in flight.
    let rafId = 0;
    let running = false;
    let onScreen = true;
    let visible = !document.hidden;

    function loop() {
      draw();
      rafId = requestAnimationFrame(loop);
    }
    function start() {
      if (running || prefersReduced) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }
    function sync() {
      if (onScreen && visible) start();
      else stop();
    }

    build();
    if (prefersReduced) {
      draw(); // one static frame
    } else {
      start();
    }

    const onResize = () => build();
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      visible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
