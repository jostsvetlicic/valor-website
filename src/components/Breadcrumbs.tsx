import Link from "next/link";
import { href, type Locale } from "@/i18n";
import { breadcrumbSchema, JsonLd, type Crumb } from "@/lib/seo";

/**
 * Visible breadcrumb trail plus its BreadcrumbList JSON-LD. The last crumb is
 * the current page (not a link).
 */
export default function Breadcrumbs({ locale, items }: { locale: Locale; items: Crumb[] }) {
  const home = locale === "sl" ? "Domov" : "Home";
  return (
    <>
      <nav aria-label={locale === "sl" ? "Drobtinice" : "Breadcrumb"} className="mb-6">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-3 text-sm text-grey">
          <li>
            <Link href={href(locale, "/")} className="tap-area -my-1.5 inline-block py-1.5 transition-colors hover:text-gold">
              {home}
            </Link>
          </li>
          {items.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-cream/30">
                /
              </span>
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-cream">
                  {c.name}
                </span>
              ) : (
                <Link href={href(locale, c.path)} className="tap-area -my-1.5 inline-block py-1.5 transition-colors hover:text-gold">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(locale, items)} />
    </>
  );
}
