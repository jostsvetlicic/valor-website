"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Sparkle from "./Sparkle";
import { clsx } from "@/lib/clsx";

/**
 * A styled video block. If `src` is provided it renders a real <video>;
 * otherwise it shows an elegant placeholder player with a gold play control.
 *
 * Drop your video file at the path documented in each usage and pass its
 * public path (e.g. "/video/welcome.mp4") as `src`.
 */
export default function VideoBlock({
  src,
  poster,
  label,
  aspect = "video",
  id,
}: {
  src?: string;
  poster?: string;
  label?: string;
  aspect?: "video" | "wide";
  id?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  const aspectClass = aspect === "wide" ? "aspect-[21/9]" : "aspect-video";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full"
    >
      {/* soft gold glow spilling out from behind the framed panel, so the      */}
      {/* video area reads as a defined, lifted object against a dark section.  */}
      <div className="pointer-events-none absolute -inset-8 -z-10 bg-radial-gold opacity-70 blur-2xl md:-inset-16" />

      {/* the LIGHTER framed panel — a warm matte border around the video so    */}
      {/* the player is clearly delineated from the black section even before   */}
      {/* it plays.                                                             */}
      <div className="rounded-[2.25rem] border border-gold/25 bg-[color-mix(in_oklab,var(--color-charcoal)_82%,var(--color-gold)_18%)] p-2 shadow-[0_0_70px_-18px_color-mix(in_oklab,var(--color-gold)_45%,transparent),0_40px_120px_-40px_rgba(0,0,0,0.9)] sm:p-3">
        <div
          className={clsx(
            "relative w-full overflow-hidden rounded-[1.6rem] bg-charcoal ring-1 ring-inset ring-gold/15",
            aspectClass,
          )}
        >
          {src ? (
            <>
              <video
                id={id}
                ref={videoRef}
                className="h-full w-full object-cover"
                poster={poster}
                playsInline
                preload="none"
                controls={playing}
                onClick={toggle}
                onEnded={() => setPlaying(false)}
              >
                <source src={src} type="video/mp4" />
              </video>
              {!playing && (
                <button
                  onClick={toggle}
                  aria-label="Play video"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-obsidian)_45%,transparent)_0%,transparent_65%)]"
                >
                  <PlayButton />
                  {label && (
                    <span className="text-[0.7rem] uppercase tracking-[0.32em] text-cream/80">
                      {label}
                    </span>
                  )}
                </button>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,#1b160c_0%,#0a0a0a_75%)]">
              <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(color-mix(in_oklab,var(--color-gold)_6%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--color-gold)_6%,transparent)_1px,transparent_1px)] [background-size:44px_44px]" />
              <Sparkle
                id={`video-${id ?? "ph"}`}
                className="h-10 w-10 opacity-30"
              />
              <PlayButton className="mt-6" static />
              <p className="mt-6 text-xs uppercase tracking-[0.28em] text-grey/70">
                {label ?? "Video coming soon"}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PlayButton({
  className,
  static: isStatic,
}: {
  className?: string;
  static?: boolean;
}) {
  return (
    <span
      className={clsx(
        "relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold/70 bg-obsidian/55 shadow-[0_0_50px_-6px_color-mix(in_oklab,var(--color-gold)_65%,transparent)] backdrop-blur-sm transition-transform duration-500",
        !isStatic && "group-hover:scale-110",
        className,
      )}
    >
      <span className="absolute inset-0 rounded-full bg-gold/25 blur-xl" />
      <span className="absolute -inset-1.5 rounded-full border border-gold/25" />
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        className="relative ml-1.5"
      >
        <path d="M6 4l14 8-14 8V4z" fill="var(--color-gold-light)" />
      </svg>
    </span>
  );
}
