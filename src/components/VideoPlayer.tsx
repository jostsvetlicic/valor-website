"use client";

import Image from "next/image";
import { useState } from "react";
import type { VideoSource } from "@/content/videos";
import { clsx } from "@/lib/clsx";

/**
 * Click-to-play video. Until the visitor presses play only our own poster
 * image is shown, so Wistia and YouTube receive nothing and the page stays
 * fast. On click the provider's player replaces the poster and starts.
 * Wistia runs with tracking off; YouTube uses its privacy-enhanced domain.
 */
function embedUrl({ provider, id }: VideoSource) {
  return provider === "wistia"
    ? `https://fast.wistia.net/embed/iframe/${id}?autoPlay=true&doNotTrack=true&playerColor=C9A84C`
    : `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

export default function VideoPlayer({
  video,
  title,
  poster,
  duration,
  size = "md",
  priority = false,
  className,
}: {
  video: VideoSource;
  title: string;
  poster: string;
  duration?: string;
  /** "lg" for a headline video, "md" for cards. */
  size?: "md" | "lg";
  priority?: boolean;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      className={clsx(
        "relative aspect-video w-full overflow-hidden bg-black ring-1 ring-gold/20",
        size === "lg" ? "rounded-[1.75rem] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]" : "rounded-2xl",
        className,
      )}
    >
      {playing ? (
        <iframe
          src={embedUrl(video)}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={title}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={poster}
            alt=""
            fill
            priority={priority}
            sizes={size === "lg" ? "(min-width: 1024px) 960px, 100vw" : "(min-width: 1024px) 480px, 100vw"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <span
            aria-hidden="true"
            className={clsx(
              "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-obsidian shadow-[0_12px_40px_-8px_rgba(201,168,76,0.8)] transition-transform duration-300 group-hover:scale-110",
              size === "lg" ? "h-20 w-20" : "h-14 w-14",
            )}
          >
            <svg viewBox="0 0 24 24" className={size === "lg" ? "ml-1 h-8 w-8" : "ml-0.5 h-6 w-6"} fill="currentColor">
              <path d="M7 4v16l13-8z" />
            </svg>
          </span>
          {duration && (
            <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 font-mono text-xs text-cream">
              {duration}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
