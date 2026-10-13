# VALOR website: launch checklist

Everything below needs a decision, a file or information from Jošt. The code is
ready for each item; most are a one-line change in the file named.

Last updated: 13 October 2026.

---

## 1. Blockers (do not publish without these)

| # | What | Why | Where it goes |
|---|------|-----|---------------|
| 1 | **Welcome video music licence.** "Bubbles Drop" by Cosmonkey was downloaded from YouTube. Clear the licence, or pick a licensed track and re-render. | Publishing unlicensed music can get the video or site taken down. | Re-render in `~/Documents/Valor/Content/video-projects/valor-welcome-enterprise`, then replace `public/video/welcome.mp4` and `welcome.webm`. TODO note in `src/config/media.ts`. |
| 2 | **Permission from the 8 clients** in the "Trusted by" bar (Archimede HK, Infraslim, Alma Dom, Fort Vega, Adriatic Estates, Marea Charter, Dubrovnik Explore, Agroinspekt). | They are now shown publicly by name. | `src/content/brands.ts`: set `verified: false` on anyone who says no. |
| 3 | **Client logo files** (SVG, or transparent PNG about 80 px tall). | The bar shows names as text until logos exist. | Put files in `public/brands/`, set `logoSrc` in `src/content/brands.ts`. |
| 4 | **Legal review** of privacy policy and terms, both languages. Note: the terms say "prices exclude VAT, added where applicable", which does not fit a business not registered for VAT. The privacy policy does not yet name your email provider. | Legal compliance. Both pages show "Draft under legal review" until then. | `src/views/privacy.tsx`, `src/views/terms.tsx`. Remove the draft note in `src/views/legal.tsx` when done. |
| 5 | **Security promises are real.** The security page now states: data kept only while you work together, access only for the founder and project developers, TLS 1.2+ in transit and AES-256 at rest, AWS Frankfurt, Claude via Amazon Bedrock in EU regions. | These are public commitments. Every client system must actually be built this way. | `src/content/security.ts` if anything changes. |
| 6 | **Contact form delivery.** The form currently opens the visitor's own email app (many people will not send). Choose a form service (for example Formspree or Resend) so messages land in info@valorai.eu directly. | Lost leads. | Needs an account and an API key from you; then `src/components/ContactForm.tsx`. |
| 7 | **Email set-up for info@valorai.eu** (SPF, DKIM, DMARC records at the domain). | So replies do not land in spam. | Your domain/email provider settings. |
| 8 | **Plausible account.** The Plausible script is already in the site (production only, cookie-free, counts "Book a call" clicks as outbound links) and the privacy policy mentions it. Create the site `valorai.eu` at plausible.io (about 9 EUR a month). | Until the site exists in Plausible, nothing is recorded. | plausible.io; code in `src/components/Analytics.tsx`. |
| 8a | **Confirm the host is Vercel.** The privacy policy now names Vercel (it said Netlify before). | The processor list must be correct. | `src/views/privacy.tsx`. |

## 2. Content that builds the most trust

| # | What | Where it goes |
|---|------|---------------|
| 9 | **One real case study**: client (or anonymised description), the process, minutes per document before and after, monthly volume, timeline. The section and page stay hidden until one exists. | `src/content/caseStudies.ts`, set `verified: true`. |
| 10 | **Founder photo** (square, at least 600 x 600 px). Replaces the "JS" monogram on the About page and in the team section. | `public/team/`, then `photo` in `src/content/team.ts`. |
| 11 | **Developer names, roles and photos.** Their cards are hidden until filled in (earlier mentions: Robson, lead developer; Nikita, developer). | `src/content/team.ts`, remove `placeholder: true`. |
| 12 | **Partner logo files** for CoreUnlock and InternumAI (the current ones are placeholders). | Replace `public/partners/coreunlock.svg` and `internum.svg` (same names). |
| 13 | **Which solution references may be shown**: Nuanu Creative City, the Jakarta pilot, the automotive distributor (NDA), the multi-entity finance group, and whether "Fable Labs" may be named. All hidden now. | `src/config/features.ts`: `solutionReferences: true` once confirmed; text in `src/content/solutions.ts`. |
| 14 | **Demo video**: a 60 to 90 second screen recording of a real agent run (Loom link or MP4). The slot appears on the homepage once it has a source. | `src/config/media.ts`, `demoVideo`. |
| 15 | **LinkedIn company page URL** (and any other profiles). | `src/config/brand.ts`, footer and structured data. |
| 16 | **Native-speaker proofread of the Slovenian text**, especially the homepage, solutions, industries, how it works, privacy and terms. | Copy lives next to each component (`sl:` blocks) and in `src/content/`. |
| 17 | **Stats check.** Now shown: 2+ years, 30 projects delivered, 8 countries, 4 continents (the 8 client countries on the globe). Confirm they stay accurate. | `src/content/stats.ts`. |

## 3. Before going live (technical, with you)

| # | What |
|---|------|
| 18 | Review the branch `rebuild/infrastructure-site` and merge it yourself (I never deploy). |
| 19 | A preview deploy to check on your own phone (iPhone Safari and Android) before the domain switches. |
| 20 | **Google Search Console**: add the property `https://valorai.eu`, choose the "HTML tag" method, copy only the `content` value into the Vercel environment variable `GOOGLE_SITE_VERIFICATION`, redeploy, click Verify, then submit `https://valorai.eu/sitemap.xml`. One property also covers the `/sl` pages. |
| 20a | **Google Business Profile**: create it for VALOR at Godovič 99E (or as a service-area business without a public address), category "Software company" or "Business management consultant", link https://valorai.eu, add the logo (`public/brand/valor-logo-512.png`). |
| 20b | **LinkedIn company page**: create it, then send me the URL; I add it to the footer and to the Organization structured data (`sameAs` in `src/app/layout.tsx`). |
| 20c | **Bing Webmaster Tools** (optional): import from Search Console in one click. |
| 21 | Decide whether to keep the old Calendly component (`src/components/home/BookingCalendar.tsx`, no longer used; Notion booking cannot be embedded). Safe to remove once you are happy. |

## 4. Later (not needed for launch)

- Short articles in Slovenian for search traffic (for example order automation for an ERP).
- Long-form videos and a references page once case studies exist.
- Industry-specific imagery and real product screenshots.

---

## Done in the October rounds (for reference)

- English and Slovenian everywhere, with an EN/SL switch, `/sl/...` pages and a language-aware 404.
- Industries rebuilt for distribution, forwarding and customs, and manufacturing suppliers; old pages redirect.
- Savings calculator (rolling numbers), interactive demo, security page, how it works page, case study framework.
- Homepage restructured into numbered chapters with a side guide; distinct sections and cream sections matching the nav.
- Interactive inbox (Today / With VALOR), service explorer (auto-advances), "Is this you?" check, scroll-driven explainer.
- Site search (Cmd/Ctrl+K) across pages, industries, solutions, process, FAQ and security, accent-insensitive.
- Company details from AJPES in the footer, legal pages and Google structured data.
- Animations keep running gently when the Mac "Reduce motion" setting is on.
- SEO pass (13 Oct): unique titles (max 60) and descriptions (max 155) for every page in both languages, per-page Open Graph and Twitter tags, canonical and hreflang on every page, sitemap with language alternates, Organization, WebSite, Service, FAQPage and BreadcrumbList structured data, visible breadcrumbs, square favicon set, /services hub, /services/business-automation, /imprint, founder section on About, Plausible, Search Console tag ready.
- Lighthouse (mobile, production build): performance 91 to 97, accessibility 100, best practices 100, SEO 100 on all pages tested.
