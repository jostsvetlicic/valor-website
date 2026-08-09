"use client";

import { useState } from "react";
import Image from "next/image";
import { welcomeVideo, type VideoConfig } from "@/config/media";

/**
 * A video in a raised panel that reads clearly against the near-black section
 * even before it plays: an elevated surface, a hairline gold border and a soft
 * outer glow, with a large centred play button. Nothing plays until the visitor
 * clicks — no autoplay, no sound on load.
 *
 * Source is driven entirely by the passed `video` config (defaults to the
 * homepage welcome video): `mode: "mp4"` plays the local file, `mode: "loom"`
 * swaps in a Loom embed. Reused for the How-it-works walkthrough.
 */
function loomSrc(url: string) {
  if (!url) return "";
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}autoplay=1`;
}

export default function WelcomeVideo({
  video = welcomeVideo,
  label = "Play the video",
}: {
  video?: VideoConfig;
  label?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const v = video;

  return (
    <div className="relative rounded-[1.75rem] border border-gold/25 bg-charcoal p-2.5 sm:p-3">
      {/* soft outer glow so the panel lifts off the black section */}
      <div
        aria-hidden
        className="bg-radial-gold pointer-events-none absolute -inset-6 -z-10 rounded-[2.75rem] opacity-70 blur-2xl"
      />

      <div className="relative aspect-video w-full overflow-hidden rounded-[1.3rem] bg-black">
        {playing ? (
          v.mode === "loom" ? (
            <iframe
              src={loomSrc(v.loomUrl)}
              title={label}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={v.mp4}
              poster={v.poster}
              controls
              autoPlay
              playsInline
            />
          )
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={label}
            className="group absolute inset-0 flex items-center justify-center rounded-[1.3rem] bg-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {v.poster && (
              <Image
                src={v.poster}
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            )}
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
            />
            <span
              className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gold transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95"
              style={{
                boxShadow:
                  "0 0 50px -6px color-mix(in oklab, var(--color-gold) 75%, transparent)",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="ml-1"
                aria-hidden
              >
                <path d="M6 4l14 8-14 8V4z" fill="var(--color-obsidian)" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
