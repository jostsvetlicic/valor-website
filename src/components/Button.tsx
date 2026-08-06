"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { clsx } from "@/lib/clsx";

type Variant = "gold" | "ghost";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-pill px-8 py-4 text-sm font-semibold tracking-wide transition-colors duration-300 will-change-transform";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-obsidian hover:bg-gold-light shadow-[0_10px_40px_-12px_color-mix(in_oklab,var(--color-gold)_70%,transparent)]",
  ghost:
    "border border-gold/40 text-cream hover:border-gold hover:text-gold bg-transparent",
};

/**
 * A magnetic button that softly follows the cursor and carries a gold glow.
 * Renders as a Next <Link> for internal hrefs and an <a> for external ones.
 */
export function MagneticButton({
  children,
  href,
  variant = "gold",
  external,
  className,
  onClick,
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const glowOpacity = useMotionValue(0);
  const glow = useSpring(glowOpacity, { stiffness: 160, damping: 20 });
  const glowScale = useTransform(glow, [0, 1], [0.6, 1]);

  function handleMove(e: React.MouseEvent) {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.28);
    y.set(relY * 0.28);
  }

  function handleEnter() {
    glowOpacity.set(1);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
    glowOpacity.set(0);
  }

  const content = (
    <>
      {variant === "gold" && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-4 -z-10 rounded-pill bg-gold/40 blur-2xl"
          style={{ opacity: glow, scale: glowScale }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  const motionProps = {
    ref,
    onMouseMove: handleMove,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    onClick,
    style: { x: sx, y: sy },
    // Instant, subtle press feedback so the button feels like it's listening.
    whileTap: { scale: 0.97 },
    className: clsx(base, variants[variant], className),
  };

  if (external) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.a {...motionProps} href={href}>
      {content}
    </motion.a>
  );
}

/**
 * The site-wide "Book a call" CTA. It links straight to the external booking
 * calendar (`brand.bookingUrl`) and opens in a new tab. This is the single
 * conversion action across the whole site.
 */
import { brand } from "@/config/brand";

export function BookCallButton({
  variant = "gold",
  className,
  label = "Book a call",
  href = brand.bookingUrl,
  external = true,
}: {
  variant?: Variant;
  className?: string;
  label?: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <MagneticButton
      href={href}
      external={external}
      variant={variant}
      className={className}
    >
      {label}
    </MagneticButton>
  );
}

/** Plain text link with an animated gold underline. */
export function TextLink({
  href,
  children,
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = clsx(
    "group inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-colors hover:text-gold-light",
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
