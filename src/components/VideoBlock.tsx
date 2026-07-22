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
      className={clsx(
        "group relative w-full overflow-hidden rounded-[2rem] border border-gold/20 bg-charcoal shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]",
        aspectClass,
      )}
    >
      {/* soft gold glow frame */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-gold/10" />
      <div className="pointer-events-none absolute -inset-24 -z-10 bg-radial-gold opacity-60" />

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
              className="absolute inset-0 flex items-center justify-center bg-obsidian/30"
            >
              <PlayButton />
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
        "relative flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-obsidian/40 backdrop-blur-sm transition-transform duration-500",
        !isStatic && "group-hover:scale-110",
        className,
      )}
    >
      <span className="absolute inset-0 rounded-full bg-gold/20 blur-xl" />
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        className="relative ml-1"
      >
        <path d="M6 4l14 8-14 8V4z" fill="var(--color-gold-light)" />
      </svg>
    </span>
  );
}
