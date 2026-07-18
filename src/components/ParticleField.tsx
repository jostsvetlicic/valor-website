"use client";

import { useEffect, useRef } from "react";

/**
 * A faint drifting gold particle field on a canvas. Deliberately light —
 * a few dozen slow motes with soft twinkle, no heavy 3D. Pauses off-screen
 * and respects reduced-motion.
 */
export default function ParticleField({
  className,
  density = 0.00009,
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

      const count = Math.max(28, Math.min(90, Math.floor(width * height * density)));
      particles = Array.from({ length: count }, () => {
        const base = Math.random() * 0.5 + 0.1;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.6 + 0.4,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          base,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.015 + 0.004,
        };
      });
    }

    let raf = 0;
    let running = true;

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
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(224, 192, 112, ${alpha})`;
        ctx!.shadowColor = "rgba(201, 162, 75, 0.6)";
        ctx!.shadowBlur = 8;
        ctx!.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    }

    build();
    if (prefersReduced) {
      draw(); // one static frame
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => build();
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !prefersReduced;
        if (running) raf = requestAnimationFrame(draw);
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
