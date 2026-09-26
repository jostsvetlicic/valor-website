import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions governing projects, payments and intellectual property for work carried out by Valor.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const updated = "27 September 2026";

  return (
    <div className="pb-24 pt-40 md:pb-32 md:pt-48">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-tight tracking-tight text-cream">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-grey">Last updated: {updated}</p>

          <div className="divider-gold mt-10" />

          <div className="prose mt-10 space-y-10 text-grey [&_a]:text-cream [&_a]:underline [&_a:hover]:text-gold [&_h2]:mt-0 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-cream [&_p]:text-[1rem] [&_p]:leading-relaxed [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc">

            <section>
              <h2>1. Who these terms apply to</h2>
              <p>
                These terms govern the relationship between{" "}
                <strong className="text-cream">Valor</strong> (&ldquo;we&rdquo;,
                &ldquo;us&rdquo;, &ldquo;our&rdquo;), a company registered in
                Slovenia, European Union, and any person or organisation
                (&ldquo;you&rdquo;, &ldquo;the client&rdquo;) that engages
                Valor to carry out a project or retainer.
              </p>
              <p>
                By booking a discovery call, signing a blueprint proposal, or
                instructing us to begin work, you accept these terms. Where a
                signed project agreement exists, that agreement takes precedence
                over these terms in the event of any conflict.
              </p>
            </section>

            <section>
              <h2>2. How a project works</h2>
              <p>Every engagement follows the same four-step process:</p>
              <ul>
                <li>
                  <strong className="text-cream">Discovery call</strong> —
                  a free call to understand your operation and identify where
                  the work is.
                </li>
                <li>
                  <strong className="text-cream">Blueprint</strong> —
                  a paid, fixed-scope technical document you own: full system
                  map, architecture, feature scope and fixed project price. The
                  blueprint fee is non-refundable once delivered.
                </li>
                <li>
                  <strong className="text-cream">Build</strong> —
                  the agreed scope, delivered in working increments.
                  Significant changes to scope are agreed in writing and priced
                  separately before work begins.
                </li>
                <li>
                  <strong className="text-cream">Launch &amp; run</strong> —
                  deployment, team training and optional ongoing retainer for
                  monitoring, iteration and new automation.
                </li>
              </ul>
            </section>

            <section>
              <h2>3. Payments</h2>
              <p>
                Payment terms, milestone schedule and amounts are set out in
                the project agreement or proposal. Unless stated otherwise:
              </p>
              <ul>
                <li>
                  The blueprint fee is invoiced upfront and due before blueprint
                  work begins.
                </li>
                <li>
                  Build invoices are issued at agreed milestones and payable
                  within 14 days of issue.
                </li>
                <li>
                  Retainer fees are invoiced monthly in advance.
                </li>
                <li>
                  Late payment may result in work being paused until the
                  outstanding balance is cleared.
                </li>
              </ul>
              <p>
                All prices are exclusive of VAT, which is added where
                applicable under Slovenian and EU law.
              </p>
            </section>

            <section>
              <h2>4. Intellectual property</h2>
              <p>
                On receipt of full payment for a project:
              </p>
              <ul>
                <li>
                  <strong className="text-cream">You own</strong> the custom
                  code, designs, content and deliverables we produce
                  specifically for your project.
                </li>
                <li>
                  <strong className="text-cream">We retain</strong> ownership
                  of our pre-existing tools, internal frameworks, libraries and
                  general know-how, which may be used in your project under a
                  perpetual, royalty-free licence granted to you for the purpose
                  of running the deliverables.
                </li>
                <li>
                  Third-party open-source software included in the project is
                  subject to its own licences, details of which we will provide
                  on request.
                </li>
              </ul>
              <p>
                We may reference the project (name, description, anonymised
                results) in our portfolio unless you ask us in writing not to.
              </p>
            </section>

            <section>
              <h2>5. Confidentiality</h2>
              <p>
                We treat all information you share with us — business data,
                processes, financials, internal systems — as confidential. We
                will not disclose it to third parties without your consent,
                except where required by law or to subcontractors who are bound
                by equivalent confidentiality obligations.
              </p>
              <p>
                You agree to treat any unpublished Valor methodologies,
                pricing, and technical approaches shared with you as
                confidential.
              </p>
            </section>

            <section>
              <h2>6. What we need from you</h2>
              <p>
                Timely delivery of projects depends on your input. You agree to:
              </p>
              <ul>
                <li>
                  Provide access, content, credentials and feedback within
                  agreed timeframes.
                </li>
                <li>
                  Designate a primary contact with authority to approve
                  decisions.
                </li>
                <li>
                  Review and approve deliverables within 7 working days of
                  submission, after which they are deemed accepted.
                </li>
              </ul>
              <p>
                Delays caused by late client input may extend timelines and, if
                significant, may incur additional costs which will be agreed in
                writing before being applied.
              </p>
            </section>

            <section>
              <h2>7. Warranties and limitation of liability</h2>
              <p>
                We take quality seriously and stand behind our work. We warrant
                that deliverables will conform to the agreed specification at
                the time of handover.
              </p>
              <p>
                To the fullest extent permitted by applicable law, our total
                liability to you in connection with any project — whether in
                contract, tort or otherwise — is limited to the total fees paid
                by you to us for that specific project in the 12 months
                preceding the claim.
              </p>
              <p>
                We are not liable for indirect, consequential or incidental
                losses, loss of profit, loss of data, or business interruption,
                even if advised of the possibility of such losses.
              </p>
            </section>

            <section>
              <h2>8. Termination</h2>
              <p>
                Either party may terminate an engagement with 30 days&rsquo;
                written notice. On termination:
              </p>
              <ul>
                <li>
                  You pay for all work completed up to the termination date.
                </li>
                <li>
                  We deliver all completed work and, where reasonably possible,
                  partially completed work in its current state.
                </li>
                <li>
                  The blueprint fee is non-refundable in all cases.
                </li>
              </ul>
            </section>

            <section>
              <h2>9. Governing law</h2>
              <p>
                These terms are governed by the law of the Republic of
                Slovenia. Any dispute that cannot be resolved by mutual
                agreement will be subject to the exclusive jurisdiction of the
                courts of Ljubljana, Slovenia.
              </p>
            </section>

            <section>
              <h2>10. Changes to these terms</h2>
              <p>
                We may update these terms from time to time. Changes take
                effect when posted to this page. Ongoing projects are governed
                by the terms in place when the project agreement was signed.
              </p>
            </section>

            <section>
              <h2>11. Contact</h2>
              <p>
                For any questions about these terms:
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
