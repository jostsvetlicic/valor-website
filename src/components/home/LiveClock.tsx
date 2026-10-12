"use client";

import { useSyncExternalStore } from "react";

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

const format = () =>
  new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

/** Ticking HH:MM:SS in the visitor's local time. Empty on the server. */
export default function LiveClock({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, format, () => "");
  return (
    <time className={className} suppressHydrationWarning>
      {time}
    </time>
  );
}
