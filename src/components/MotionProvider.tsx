"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global motion settings. `reducedMotion="user"` makes Framer honour the OS
 * "reduce motion" setting everywhere: transform and layout animations are
 * suppressed (elements settle instantly) while opacity fades still play, so the
 * whole site degrades gracefully without per-component guards.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
