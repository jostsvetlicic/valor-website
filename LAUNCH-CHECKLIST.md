# VALOR website: launch checklist

Everything below needs a decision, a file or information from Jošt. The code is
ready for each item; most are a one-line change in the file named.

Last updated: 14 October 2026 (launch day).

**Hidden at launch, switch on in `src/config/features.ts` when ready:** welcome video (`welcomeFilm`, needs the music licence), client names strip (`brandLogos`, needs each client's OK), official partners strip (`officialPartners`, needs written partner status). Terms VAT sentence fixed for a non-VAT-registered business.

---

## 1. Blockers (do not publish without these)

| # | What | Why | Where it goes |
|---|------|-----|---------------|
| 1 | **Welcome video music licence.** "Bubbles Drop" by Cosmonkey was downloaded from YouTube. Clear the licence, or pick a licensed track and re-render. | Publishing unlicensed music can get the video or site taken down. | Re-render in `~/Documents/Valor/Content/video-projects/valor-welcome-enterprise`, then replace `public/video/welcome.mp4` and `welcome.webm`. TODO note in `src/config/media.ts`. |
| 2 | **Permission from the 8 clients** in the "Trusted by" bar (Archimede HK, Infraslim, Alma Dom, Fort Vega, Adriatic Estates, Marea Charter, Dubrovnik Explore, Agroinspekt). | They are now shown publicly by name. | `src/content/brands.ts`: set `verified: false` on anyone who says no. |
| 3 | **Client logo files** (SVG, or transparent PNG about 80 px tall). | The bar shows names as text until logos exist. | Put files in `public/brands/`, set `logoSrc` in `src/content/brands.ts`. |
| 4 | **Legal review** of privacy policy and terms, both languages. Note: the terms say "prices exclude VAT, added where applicable", which does not fit a business not registered for VAT. The privacy policy does not yet name your email provider. Since 15 Oct the privacy policy no longer names the company in section 1; it names VALOR as controller and links to the imprint for the legal details (owner's wish). Ask the reviewer to confirm this meets GDPR Art. 13 (identity of the controller). | Legal compliance. Both pages show "Draft under legal review" until then. | `src/views/privacy.tsx`, `src/views/terms.tsx`. Remove the draft note in `src/views/legal.tsx` when done. |
| 5 | **Security promises are real.** The security page now states: data kept only while you work together, access only for the founder and project developers, TLS 1.2+ in transit and AES-256 at rest, AWS Frankfurt, Claude via Amazon Bedrock in EU regions. | These are public commitments. Every client system must actually be built this way. | `src/content/security.ts` if anything changes. |
| 6 | ~~Contact form delivery~~ **Done 15 Oct**: the form posts to Formspree (`https://formspree.io/f/mjygpyla`), which emails the owner. Still to do: (a) send one real test message from the live site and confirm it arrives; (b) in Formspree, check the notification email address and turn on spam filtering; (c) sign Formspree's data processing agreement and confirm how it covers transfers to the US, then add that to privacy policy section 6 (Formspree is already named as a processor). | Lost leads; GDPR processor paperwork. | `brand.formEndpoint` in `src/config/brand.ts`, `src/components/ContactForm.tsx`. |
| 7 | **Email set-up for info@valorai.eu** (SPF, DKIM, DMARC records at the domain). | So replies do not land in spam. | Your domain/email provider settings. |
| 8 | **Plausible account.** The Plausible script is already in the site (production only, cookie-free, counts "Book a call" clicks as outbound links) and the privacy policy mentions it. Create the site `valorai.eu` at plausible.io (about 9 EUR a month). | Until the site exists in Plausible, nothing is recorded. | plausible.io; code in `src/components/Analytics.tsx`. |
| 8b | **Official partners strip** (Anthropic / Claude, Notetaker, more later). Built and visible on localhost only. To show it live: written confirmation that VALOR itself is an official partner, plus the official badge/logo files and their brand terms. Then set `officialPartners: true`. | Showing a partner logo without that status misrepresents VALOR and can break the partner's trademark terms. | `src/content/officialPartners.ts`, logos in `public/partners/`, flag in `src/config/features.ts`. |
| 8c | **Contact email is temporarily jost.svetlicic@gmail.com** (owner's call, 15 Oct). Switch back to info@valorai.eu once that mailbox is set up (item 7). It is set in one place and used across the footer, contact page, FAQ and structured data. | A personal address on a company site; fine for now. | `email` in `src/config/brand.ts`. |
| 8d | **"Partners and platforms we work with" strip** under the homepage hero: Anthropic, Claude, n8n, Wise, ChatGPT, moving left to right (owner's choice of wording, 15 Oct). Logos from Simple Icons (CC0). Deliberately not "Official partners": Misha's Anthropic status is personal, and using Wise for invoices makes VALOR a customer. EU consumer law bans implying an approval or relationship that does not exist. Switch to "Official partners" only with written confirmation from each company. | Misleading partner claims and trademark complaints. | `src/content/techStack.ts`, `src/components/home/TechStrip.tsx`, logos in `public/tech/`. |
| 8a | **Confirm the host is Vercel.** The privacy policy now names Vercel (it said Netlify before). | The processor list must be correct. | `src/views/privacy.tsx`. |

## 2. Content that builds the most trust

| # | What | Where it goes |
|---|------|---------------|
| 9 | **One real case study**: client (or anonymised description), the process, minutes per document before and after, monthly volume, timeline. The section and page stay hidden until one exists. First candidate: Nas House once live, with a real number (for example team size on guest messages before and after). Also add a one-line mention on the About page then. | `src/content/caseStudies.ts`, set `verified: true`. |
| 10 | ~~Founder photo~~ **Done 13 Oct**: headshot in the team section, portrait on About. Founder social links still needed (LinkedIn, Instagram, other). | `socials` in `src/content/team.ts`. |
| 11a | **Jošt's LinkedIn**: slot ready; paste the URL into `FOUNDER_LINKEDIN` in `src/content/team.ts` and the icon appears under his name and in Google's structured data. | `src/content/team.ts` |
| 11 | ~~Developer photos and links~~ **Done 14 Oct**: Mikhail Onchukov and Nikita Antimonov with photos and LinkedIn. Still open: Jošt's own social links (LinkedIn, work email, Instagram). | `socials` in `src/content/team.ts`. |
| 12 | ~~Partner logos~~ Partners are no longer shown (owner's call, 13 Oct: VALOR presents as one team). Turn back on with `FEATURES.partners` if ever needed. | `src/config/features.ts`. |
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

## 3b. Security (account settings only you can change)

The code side is done (security headers, content policy, secret scanning on every commit, weekly GitHub checks, Dependabot, updated dependencies). These need your accounts:

| # | What | Where |
|---|------|-------|
| S1 | **Two-factor authentication** on GitHub, Vercel, your domain registrar and info@valorai.eu. Most site takeovers start with a stolen password, not code. | Each account's security settings |
| S2 | **GitHub secret scanning + push protection** (free): GitHub blocks a push that contains a key. | GitHub repo, Settings, Code security |
| S3 | **Vercel Firewall rate limit** (e.g. 300 requests per minute per IP) and Attack Challenge Mode if you're ever flooded. The site has no forms or APIs that post to a server, so this protects bandwidth and the image optimiser. | Vercel project, Firewall |
| S4 | **Branch protection on `main`**: require the "Security" check to pass before merging. | GitHub repo, Settings, Branches |
| S5 | **Delete the stray git reference** `.git/refs/remotes/origin/main 2` (a duplicate file macOS or iCloud created; it breaks `git log --all`). Or tell me and I'll move it out. | Finder or terminal |
| S6 | **Later, if the site ever gets logins, a CMS or a contact API:** add authentication, password hashing (argon2/bcrypt), rate limiting on those endpoints, and database access rules. None of these exist today, so there is nothing to protect yet. | Code, when the feature is built |

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
- 15 Oct: Instagram changed to @thevalor.ai; the VALOR star replaces the generic sparkle everywhere and appears large on page heroes (desktop); search redesigned (quick links, grouped results, highlighted matches, phone layout); responsive pass at 320, 375, 430, 768, 1024, 1280 and 1440 px (no sideways scrolling, no overlapping text, bigger touch zones for small links, side guide only from 1440 px).
- 15 Oct (later): motion plays for everyone, including the OS "reduce motion" setting (owner's call; switch in `src/lib/motion.ts`, CSS rules in git history ce0370e): Lenis smooth scroll always on, reveals, headings and counters replay every time they scroll into view. Page heroes use the homepage's moving dot field (big star removed) with a card per page (founder portrait on About, who you talk to plus Ljubljana and Bali clocks on Contact). About rebuilt (statement, steps, globe, team); Contact rebuilt (channel cards, steps after booking, FAQ). Closing banners use the travelling-light booking button.
- 15 Oct (positioning): the whole site now follows the About page: "We build the system your business runs on." Homepage hero, brand tagline and description, share image, Who we help, Services hero and the Google titles and descriptions were aligned; the industry pages are unchanged. Booking link is now the discovery-call page.
- 15 Oct (smoothness and heroes): Lenis now runs on GSAP's ticker with lerp smoothing; removed the costly effects while scrolling (nav backdrop blur, per-word blur in ScrollReveal, layout-animated light on step lines); dot field batched and capped at 30 redraws a second. Stats always show their real number (count-up replays on entry). FAQ starts closed. Footer button has the travelling light. Every subpage hero has its own animated card (orbit on Services and Infrastructure, steps on Process and How it works, checks on Security, Business automation and each industry, card stack on Industries, document scan on Demo). Re-run Lighthouse before launch.
- Lighthouse (mobile, production build): performance 91 to 97, accessibility 100, best practices 100, SEO 100 on all pages tested.
