"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Sparkle from "@/components/Sparkle";

/**
 * The centrepiece video player for the /call landing page.
 *
 * - Never autoplays. Shows the poster frame (once it actually loads) with a
 *   large gold play button, or an elegant placeholder until the real files
 *   are in place.
 * - Plays WITH sound on click. The click is a user gesture, so iOS Safari
 *   allows unmuted inline playback; `playsInline` stops iPhone forcing
 *   fullscreen, and native controls appear once playing so the guest can
 *   pause, scrub and adjust volume.
 * - Robust to missing files: a poster path is only trusted once the image
 *   successfully loads (probed below), so a not-yet-uploaded poster shows the
 *   placeholder rather than a black frame. Drop the real files in and it
 *   upgrades automatically — no code changes.
 */
export default function LandingVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [posterOk, setPosterOk] = useState(false);

  // Probe the poster so we only render it once it genuinely loads.
  useEffect(() => {
    if (!poster) {
      setPosterOk(false);
      return;
    }
    const img = new Image();
    img.onload = () => setPosterOk(true);
    img.onerror = () => setPosterOk(false);
    img.src = poster;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [poster]);

  function play() {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => setStarted(true))
      .catch(() => {
        /* file not ready yet — keep the placeholder overlay in place */
      });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-video w-full overflow-hidden rounded-[2rem] border border-gold/25 bg-charcoal shadow-[0_50px_140px_-40px_rgba(0,0,0,0.95)]"
    >
      {/* soft gold frame + ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-30 rounded-[2rem] ring-1 ring-inset ring-gold/15" />
      <div className="pointer-events-none absolute -inset-24 -z-10 bg-radial-gold opacity-70" />

      <video
        ref={videoRef}
        className="relative z-10 h-full w-full object-cover"
        poster={posterOk ? poster : undefined}
        playsInline
        preload="none"
        controls={started}
        onEnded={() => setStarted(false)}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Elegant placeholder — shown beneath the play button whenever there's
          no usable poster yet. A real poster covers this via the <video>. */}
      {!started && !posterOk && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,#1b160c_0%,#0a0a0a_75%)]">
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(color-mix(in_oklab,var(--color-gold)_6%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--color-gold)_6%,transparent)_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>
      )}

      {/* Poster / placeholder overlay with the gold play button. Sits above
          everything until the guest starts it, then is removed so the native
          controls are usable. */}
      {!started && (
        <button
          onClick={play}
          aria-label="Play video"
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-obsidian/40"
        >
          {!posterOk && (
            <Sparkle id="call-video" className="relative mb-6 h-10 w-10 opacity-30" />
          )}
          <span className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 bg-obsidian/40 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
            <span className="absolute inset-0 rounded-full bg-gold/20 blur-xl" />
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              className="relative ml-1"
            >
              <path d="M6 4l14 8-14 8V4z" fill="var(--color-gold-light)" />
            </svg>
          </span>
          {!posterOk && (
            <p className="relative mt-6 text-xs uppercase tracking-[0.28em] text-grey/70">
              Video coming soon
            </p>
          )}
        </button>
      )}
    </motion.div>
  );
}
