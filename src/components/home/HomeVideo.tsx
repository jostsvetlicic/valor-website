import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import WelcomeVideo from "@/components/home/WelcomeVideo";
import type { VideoConfig } from "@/config/media";

/** A labelled video slot. Shows a placeholder frame until the config has a source. */
export default function HomeVideo({
  label,
  video,
  id,
}: {
  label: string;
  video: VideoConfig;
  id?: string;
}) {
  const hasSource = video.mode === "loom" ? !!video.loomUrl : !!video.mp4;

  return (
    <section id={id} className="border-t border-cream/[0.06] py-16 md:py-20">
      <Container>
        <Reveal className="mx-auto max-w-4xl">
          <p className="eyebrow text-center">{label}</p>
          <div className="mt-6">
            {hasSource ? (
              <WelcomeVideo video={video} label={`Play: ${label}`} />
            ) : (
              <div className="rounded-[1.75rem] border border-gold/25 bg-charcoal p-2.5 sm:p-3">
                <div
                  role="img"
                  aria-label={`${label}, video coming soon`}
                  className="flex aspect-video w-full items-center justify-center rounded-[1.3rem] bg-obsidian"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 text-gold md:h-20 md:w-20">
                    <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" aria-hidden="true">
                      <path d="M6 4l14 8-14 8V4z" fill="currentColor" />
                    </svg>
                  </span>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
