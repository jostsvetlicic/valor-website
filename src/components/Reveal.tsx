"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const easeExpensive = [0.16, 1, 0.3, 1] as const;

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeExpensive },
  },
};

/**
 * A single fade-and-slide reveal that triggers once when scrolled into view.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "p" | "h2" | "h3";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: easeExpensive, delay },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * A container that staggers the reveal of its direct <RevealItem> children.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.14,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "section" | "ul" | "ol";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  hoverLift = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "span" | "p";
  /** Gently lifts the item on hover (for cards). Transform-only, GPU-friendly. */
  hoverLift?: boolean;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={baseVariants}
      whileHover={
        hoverLift
          ? { y: -6, transition: { duration: 0.4, ease: easeExpensive } }
          : undefined
      }
    >
      {children}
    </MotionTag>
  );
}
