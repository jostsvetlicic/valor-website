import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Valor collects, uses and protects your personal data. GDPR-compliant privacy notice for valorai.eu.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const updated = "27 September 2026";

  return (
    <div className="pb-24 pt-40 md:pb-32 md:pt-48">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-tight tracking-tight text-cream">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-grey">Last updated: {updated}</p>

          <div className="divider-gold mt-10" />

          {/* Body */}
          <div className="prose mt-10 space-y-10 text-grey [&_a]:text-cream [&_a]:underline [&_a:hover]:text-gold [&_h2]:mt-0 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-cream [&_p]:text-[1rem] [&_p]:leading-relaxed [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc">

            <section>
              <h2>1. Who we are</h2>
              <p>
                This website is operated by <strong className="text-cream">Valor</strong> (referred to
                as &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;), a
                company based in Slovenia, European Union. We build AI
                infrastructure, automation and custom software for
                operationally heavy businesses.
              </p>
              <p>
                <strong className="text-cream">Contact:</strong><br />
                Email: <a href={`mailto:${brand.email}`}>{brand.email}</a><br />
                Phone / WhatsApp:{" "}
                <a href={brand.phoneHref}>{brand.phoneDisplay}</a>
              </p>
            </section>

            <section>
              <h2>2. What data we collect and why</h2>
              <p>
                We collect only the data you voluntarily give us. There is no
                automatic tracking, no analytics platform and no advertising
                network connected to this site.
              </p>

              <h3 className="mt-6 text-base font-semibold text-cream">
                Contact form
              </h3>
              <p>
                When you fill in the contact form on this site, we collect your
                name, email address, company name (optional) and the message you
                write. This data is transmitted directly to our WhatsApp or
                email inbox — it is not stored in any database operated by
                Valor.
              </p>
              <ul>
                <li><strong className="text-cream">Purpose:</strong> responding to your enquiry</li>
                <li><strong className="text-cream">Legal basis:</strong> your consent (Art. 6(1)(a) GDPR) and our legitimate interest in communicating with prospective clients (Art. 6(1)(f) GDPR)</li>
                <li><strong className="text-cream">Retention:</strong> messages are kept only as long as they are needed to respond and follow up, and no longer than 12 months unless a business relationship begins</li>
              </ul>

              <h3 className="mt-6 text-base font-semibold text-cream">
                Booking calendar
              </h3>
              <p>
                The &ldquo;Book a call&rdquo; button links to an external
                scheduling service (Notion Calendar). Any data you provide there
                is subject to that service&rsquo;s own privacy policy. Valor
                receives your name, email address and the time slot you select
                in order to prepare for and conduct the call.
              </p>

              <h3 className="mt-6 text-base font-semibold text-cream">
                Server logs
              </h3>
              <p>
                Our hosting provider (Netlify) automatically records standard
                server log data including IP address, browser type, pages
                visited and the date/time of requests. This data is used solely
                for security and availability monitoring and is retained
                according to Netlify&rsquo;s own data retention policy.
              </p>
            </section>

            <section>
              <h2>3. Cookies</h2>
              <p>
                This site uses a single functional cookie stored in your
                browser&rsquo;s <code className="text-cream">localStorage</code> to
                remember whether you have acknowledged the cookie notice. It
                contains no personal data and is never sent to a third party.
              </p>
              <p>
                We do not use analytics cookies, advertising cookies or any
                cookies that track your behaviour across other websites.
              </p>
            </section>

            <section>
              <h2>4. Who we share data with</h2>
              <p>
                We do not sell, rent or trade your personal data. We use the
                following processors to operate the site:
              </p>
              <ul>
                <li>
                  <strong className="text-cream">Netlify</strong> — website
                  hosting and CDN (United States; covered by Standard Contractual
                  Clauses)
                </li>
                <li>
                  <strong className="text-cream">Meta (WhatsApp)</strong> — used
                  to receive contact form submissions until our email inbox is
                  live; governed by Meta&rsquo;s privacy policy
                </li>
                <li>
                  <strong className="text-cream">Notion Calendar</strong> —
                  external booking scheduler; governed by Notion&rsquo;s privacy
                  policy
                </li>
              </ul>
              <p>
                All processors are bound by data processing agreements and are
                required to protect your data to at least the standard required
                by the GDPR.
              </p>
            </section>

            <section>
              <h2>5. International transfers</h2>
              <p>
                Some of the processors listed above are based outside the
                European Economic Area (EEA). Where personal data is transferred
                outside the EEA, we ensure appropriate safeguards are in place —
                typically Standard Contractual Clauses approved by the European
                Commission.
              </p>
            </section>

            <section>
              <h2>6. Your rights under GDPR</h2>
              <p>
                If you are in the European Union, you have the following rights
                regarding your personal data:
              </p>
              <ul>
                <li><strong className="text-cream">Access</strong> — request a copy of the personal data we hold about you</li>
                <li><strong className="text-cream">Rectification</strong> — ask us to correct inaccurate data</li>
                <li><strong className="text-cream">Erasure</strong> — ask us to delete your data (the &ldquo;right to be forgotten&rdquo;)</li>
                <li><strong className="text-cream">Restriction</strong> — ask us to restrict how we use your data</li>
                <li><strong className="text-cream">Portability</strong> — receive your data in a machine-readable format</li>
                <li><strong className="text-cream">Objection</strong> — object to processing based on legitimate interests</li>
                <li><strong className="text-cream">Withdraw consent</strong> — where processing is based on consent, you can withdraw it at any time</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a href={`mailto:${brand.email}`}>{brand.email}</a> or by
                WhatsApp at{" "}
                <a href={brand.whatsappUrl}>{brand.phoneDisplay}</a>. We will
                respond within 30 days. You also have the right to lodge a
                complaint with the Slovenian Information Commissioner
                (Informacijski pooblaščenec,{" "}
                <a
                  href="https://www.ip-rs.si"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ip-rs.si
                </a>
                ).
              </p>
            </section>

            <section>
              <h2>7. Data security</h2>
              <p>
                We take reasonable technical and organisational measures to
                protect your data against unauthorised access, loss or
                disclosure. The site is served over HTTPS at all times. Contact
                form data is transmitted to our messaging inbox and not stored
                in an internet-accessible database.
              </p>
            </section>

            <section>
              <h2>8. Children&rsquo;s privacy</h2>
              <p>
                This site is not directed at children under the age of 16. We
                do not knowingly collect data from children. If you believe a
                child has submitted data to us, please contact us so we can
                delete it.
              </p>
            </section>

            <section>
              <h2>9. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The &ldquo;Last
                updated&rdquo; date at the top of this page shows when it was
                last revised. Continued use of the site after a change
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2>10. Contact</h2>
              <p>
                For any privacy-related questions or requests, reach us at:
              </p>
              <p>
                <strong className="text-cream">Valor</strong><br />
                Slovenia, European Union<br />
                <a href={`mailto:${brand.email}`}>{brand.email}</a><br />
                <a href={brand.whatsappUrl}>{brand.phoneDisplay}</a>
              </p>
            </section>

          </div>
        </div>
      </Container>
    </div>
  );
}
