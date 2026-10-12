import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { welcomeFilm } from "@/config/media";
import type { Dict, Locale } from "@/i18n";

const ui: Dict<{ label: string }> = {
  en: { label: "Welcome video" },
  sl: { label: "Video dobrodošlice" },
};

/**
 * Founder welcome video. Native 16:9 player: nothing downloads until play
 * (preload="none"), no autoplay, subtitles in both languages.
 */
export default function WelcomeFilm({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  return (
    <section id="welcome" aria-label={t.label} className="border-t border-cream/[0.06] py-20 md:py-28">
      <Container>
        <Reveal className="mx-auto max-w-4xl">
          <p className="eyebrow text-center">{t.label}</p>
          <div className="mt-6 overflow-hidden rounded-3xl border border-cream/[0.1] bg-charcoal shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
            <video
              className="block aspect-video w-full bg-charcoal object-cover"
              poster={welcomeFilm.poster}
              controls
              preload="none"
              playsInline
            >
              <source src={welcomeFilm.webm} type="video/webm" />
              <source src={welcomeFilm.src} type="video/mp4" />
              <track kind="subtitles" src={welcomeFilm.subtitles.en} srcLang="en" label="English" default={locale === "en"} />
              <track kind="subtitles" src={welcomeFilm.subtitles.sl} srcLang="sl" label="Slovenščina" default={locale === "sl"} />
            </video>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-grey">
            {welcomeFilm.caption[locale]}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
