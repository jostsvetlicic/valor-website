"use client";

import { useSyncExternalStore } from "react";

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 10_000);
  return () => window.clearInterval(id);
}

/** Current HH:MM in a given IANA time zone (e.g. "Europe/Ljubljana"). Empty on the server. */
export default function ZoneClock({ timeZone, className }: { timeZone: string; className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }),
    () => "",
  );
  return (
    <time className={className} suppressHydrationWarning>
      {time || "--:--"}
    </time>
  );
}
