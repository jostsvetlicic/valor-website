import { Container } from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Dict, Locale } from "@/i18n";
import type { Crumb } from "@/lib/seo";

const ui: Dict<{ eyebrow: string; updated: string; draft: string }> = {
  en: {
    eyebrow: "Legal",
    updated: "Last updated",
    draft: "Draft under legal review. The wording below may change before it is final.",
  },
  sl: {
    eyebrow: "Pravno",
    updated: "Zadnja posodobitev",
    draft: "Osnutek v pravnem pregledu. Besedilo se lahko še spremeni, preden bo dokončno.",
  },
};

/** Shared frame for the privacy and terms pages. */
export function LegalShell({
  locale,
  title,
  updated,
  crumb,
  draft = true,
  children,
}: {
  locale: Locale;
  title: string;
  updated: string;
  /** This page, for the breadcrumb trail. */
  crumb?: Crumb;
  /** Shows the "under legal review" note. */
  draft?: boolean;
  children: React.ReactNode;
}) {
  const t = ui[locale];
  return (
    <div className="pb-24 pt-40 md:pb-32 md:pt-48">
      <Container>
        <div className="mx-auto max-w-3xl">
          {crumb && <Breadcrumbs locale={locale} items={[crumb]} />}
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="mt-4 font-display t-page text-cream">{title}</h1>
          <p className="mt-4 text-sm text-grey">
            {t.updated}: {updated}
          </p>
          {/* TODO: legal review required before launch */}
          {draft && <p className="mt-6 rounded-lg border border-gold/30 bg-charcoal px-4 py-3 text-sm text-cream">{t.draft}</p>}

          <div className="divider-gold mt-10" />

          <div className="prose mt-10 space-y-10 text-grey [&_a]:text-cream [&_a]:underline [&_a:hover]:text-gold [&_h2]:mt-0 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-cream [&_p]:text-[1rem] [&_p]:leading-relaxed [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc">
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
}
