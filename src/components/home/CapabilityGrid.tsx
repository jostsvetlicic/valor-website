import { Container, Eyebrow } from "@/components/Container";
import { Section } from "@/components/Section";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import type { Dict, Locale } from "@/i18n";

/** Concrete capabilities, one line each. Expand as more become obviously true. */
const capabilitiesEn = [
  { title: "Instant inquiry response", detail: "24/7, across web, email and WhatsApp." },
  { title: "Listing & inventory sync", detail: "Updated once, everywhere, automatically." },
  { title: "Document & contract generation", detail: "Drafted, filled and sent on their own." },
  { title: "Booking & viewing scheduling", detail: "Tied to the right calendars." },
  { title: "Payment collection & reconciliation", detail: "Collected on the spot, reconciled automatically." },
  { title: "Client portal", detail: "Full history, self-service." },
  { title: "Internal admin panel", detail: "The one that replaces the spreadsheets." },
  { title: "Reporting & forecasting", detail: "Dashboards that stay current." },
  { title: "Multilingual sales frontend", detail: "Built to convert, in every language." },
  { title: "Product & vehicle configurator", detail: "See it before you order it." },
  { title: "Mobile app", detail: "Per-user login and service history." },
  { title: "Data migration", detail: "Off the legacy systems, cleaned up." },
  { title: "Lead scoring & routing", detail: "The right lead to the right person." },
  { title: "Automated follow-up", detail: "Sequences that never let an enquiry go cold." },
];

const capabilitiesSl = [
  { title: "Takojšen odziv na povpraševanja", detail: "24/7, na spletu, po e-pošti in WhatsAppu." },
  { title: "Sinhronizacija ponudbe in zalog", detail: "Posodobljeno enkrat, povsod, samodejno." },
  { title: "Priprava dokumentov in pogodb", detail: "Pripravljeno, izpolnjeno in poslano samo od sebe." },
  { title: "Rezervacije in ogledi", detail: "Povezano s pravimi koledarji." },
  { title: "Pobiranje in usklajevanje plačil", detail: "Plačano takoj, usklajeno samodejno." },
  { title: "Portal za stranke", detail: "Celotna zgodovina, samopostrežno." },
  { title: "Interni administrativni panel", detail: "Tisti, ki nadomesti preglednice." },
  { title: "Poročanje in napovedovanje", detail: "Nadzorne plošče, ki so vedno ažurne." },
  { title: "Večjezični prodajni vmesnik", detail: "Zgrajen za prodajo, v vsakem jeziku." },
  { title: "Konfigurator izdelkov in vozil", detail: "Poglejte, preden naročite." },
  { title: "Mobilna aplikacija", detail: "Osebna prijava in zgodovina servisov." },
  { title: "Selitev podatkov", detail: "Iz starih sistemov, očiščeno." },
  { title: "Ocenjevanje in usmerjanje povpraševanj", detail: "Pravo povpraševanje pravi osebi." },
  { title: "Samodejno sledenje", detail: "Zaporedja, ki nobenemu povpraševanju ne pustijo, da se ohladi." },
];

const ui: Dict<{ eyebrow: string; title: string; intro: string; items: typeof capabilitiesEn }> = {
  en: {
    eyebrow: "What's possible",
    title: "A concrete list of what we build.",
    intro: "Pick the ones that map to your operation. Most businesses need six or seven of them, working as one system.",
    items: capabilitiesEn,
  },
  sl: {
    eyebrow: "Kaj je mogoče",
    title: "Konkreten seznam tega, kar zgradimo.",
    intro: "Izberite tiste, ki ustrezajo vašemu poslovanju. Večina podjetij jih potrebuje šest ali sedem, ki delujejo kot en sistem.",
    items: capabilitiesSl,
  },
};

export default function CapabilityGrid({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  return (
    <Section tone="panel" className="py-24 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display t-section text-cream text-balance">
            {t.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-grey text-pretty">
            Pick the ones that map to your operation. Most businesses need six
            or seven of them, working as one system.
          </p>
        </div>

        <RevealGroup
          stagger={0.04}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.items.map((c, i) => (
            <RevealItem
              key={i}
              className="group rounded-2xl border border-cream/[0.08] bg-charcoal p-6 transition-[translate,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-gold/35 motion-reduce:hover:translate-y-0"
            >
              <h3 className="font-display text-lg font-semibold text-cream">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-grey">{c.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
