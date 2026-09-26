"use client";

import { motion } from "framer-motion";

// template.tsx re-mounts on every route change (unlike layout.tsx which
// persists), so Framer Motion gets a fresh key each time — the enter
// animation runs on every navigation without needing AnimatePresence.
export default function PageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
