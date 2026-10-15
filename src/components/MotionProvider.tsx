"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { HONOR_REDUCED_MOTION } from "@/lib/motion";

/**
 * Global motion settings. Framer plays the full motion for everyone (see
 * lib/motion.ts); with HONOR_REDUCED_MOTION it would follow the OS "reduce
 * motion" setting again ("user").
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion={HONOR_REDUCED_MOTION ? "user" : "never"}>{children}</MotionConfig>;
}
