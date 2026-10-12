import type { CaseStudy } from "@/content/caseStudies";
import type { Dict, Locale } from "@/i18n";

const labels: Dict<{
  perDoc: string;
  less: string;
  documents: string;
  challenge: string;
  built: string;
  saved: (hours: string) => string;
}> = {
  en: {
    perDoc: "minutes per document",
    less: "less time",
    documents: "Documents",
    challenge: "Challenge",
    built: "What we built",
    saved: (h) => `About ${h} hours saved per month at this volume.`,
  },
  sl: {
    perDoc: "minut na dokument",
    less: "manj časa",
    documents: "Dokumenti",
    challenge: "Izziv",
    built: "Kaj smo zgradili",
    saved: (h) => `Pri tem obsegu približno ${h} ur prihranka na mesec.`,
  },
};

/** One measured case study. Derived figures come only from measured inputs. */
export default function CaseStudyCard({ study, locale }: { study: CaseStudy; locale: Locale }) {
  const t = labels[locale];
  const tag = locale === "sl" ? "sl-SI" : "en-GB";
  const num = new Intl.NumberFormat(tag, { maximumFractionDigits: 1 });
  const reduction = study.minutesBefore > 0 ? 1 - study.minutesAfter / study.minutesBefore : 0;
  const hoursSaved = study.volume
    ? ((study.minutesBefore - study.minutesAfter) * study.volume.perMonth) / 60
    : null;

  return (
    <article className="flex h-full flex-col rounded-3xl border border-cream/[0.08] bg-charcoal p-7 md:p-9">
      <p className="eyebrow">{study.industry[locale]}</p>
      <h3 className="mt-3 font-display t-subhead text-cream">{study.client[locale]}</h3>

      <div className="mt-7 flex items-end gap-3">
        <span className="font-display t-stat text-grey line-through decoration-[#e0795a]/60">
          {num.format(study.minutesBefore)}
        </span>
        <span aria-hidden="true" className="pb-2 text-gold">
          →
        </span>
        <span className="font-display t-stat text-gold">{num.format(study.minutesAfter)}</span>
      </div>
      <p className="mt-2 text-sm text-grey">
        {t.perDoc}
        {reduction > 0 && (
          <>
            {" · "}
            <span className="font-semibold text-cream">
              {Math.round(reduction * 100)}% {t.less}
            </span>
          </>
        )}
      </p>

      <dl className="mt-7 space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-grey">{t.documents}</dt>
          <dd className="mt-1 text-cream">{study.documents[locale]}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-grey">{t.challenge}</dt>
          <dd className="mt-1 text-cream">{study.challenge[locale]}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-grey">{t.built}</dt>
          <dd className="mt-1 text-cream">{study.built[locale]}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-7 text-sm text-grey">
        {hoursSaved !== null && hoursSaved > 0 && <p>{t.saved(num.format(hoursSaved))}</p>}
        {study.timeline && <p className="mt-1">{study.timeline[locale]}</p>}
      </div>
    </article>
  );
}
