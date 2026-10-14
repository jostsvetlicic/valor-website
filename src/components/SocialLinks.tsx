import type { Social } from "@/content/team";
import { clsx } from "@/lib/clsx";

const labels: Record<Social["type"], string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  email: "Email",
};

function Icon({ type }: { type: Social["type"] }) {
  if (type === "linkedin")
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75v5.7h-4v-5.05c0-1.2-.02-2.75-1.7-2.75-1.7 0-1.95 1.3-1.95 2.66v5.14h-4v-11Z" />
      </svg>
    );
  if (type === "instagram")
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

/** Round icon links for a person's profiles; renders nothing without links. */
export default function SocialLinks({ socials, name, className }: { socials?: Social[]; name: string; className?: string }) {
  if (!socials || socials.length === 0) return null;
  return (
    <ul className={clsx("flex flex-wrap gap-2", className)}>
      {socials.map((s) => {
        const href = s.type === "email" && !s.url.startsWith("mailto:") ? `mailto:${s.url}` : s.url;
        const external = s.type !== "email";
        return (
          <li key={s.type + s.url}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
              aria-label={`${name}: ${labels[s.type]}`}
              title={labels[s.type]}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:border-gold hover:bg-gold hover:text-obsidian"
            >
              <Icon type={s.type} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
