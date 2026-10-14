import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { type Dict, type Locale } from "@/i18n";
import { LegalShell } from "@/views/legal";
import { pageNames } from "@/content/seo";
import { seoMetadata } from "@/lib/seo";

const copy: Dict<{ title: string; description: string; updated: string }> = {
  en: { title: "Terms of Service", description: "Terms and conditions governing projects, payments and intellectual property for work carried out by VALOR.", updated: "5 October 2026" },
  sl: { title: "Pogoji poslovanja", description: "Pogoji, ki urejajo projekte, plačila in intelektualno lastnino pri delu, ki ga izvaja VALOR.", updated: "5. oktober 2026" },
};

export function termsMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "terms", "/terms");
}

function BodyEn() {
  return (
    <>
      <section>
        <h2>1. Who these terms apply to</h2>
        <p>
          These terms govern the relationship between{" "}
          <strong className="text-cream">{brand.legal.entity}</strong>,
          trading as VALOR (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;), Slovenia, European Union, and any person or
          organisation
          (&ldquo;you&rdquo;, &ldquo;the client&rdquo;) that engages
          Valor to carry out a project or provide monthly support.
        </p>
        <p>
          By booking a discovery call, accepting a project quote, or
          instructing us to begin work, you accept these terms. Where a
          signed project agreement exists, that agreement takes precedence
          over these terms in the event of any conflict.
        </p>
      </section>

      <section>
        <h2>2. How a project works</h2>
        <p>Every engagement follows the same five-step process:</p>
        <ul>
          <li>
            <strong className="text-cream">Discovery call</strong>:
            a free 20-minute call to understand where the manual work is
            and what it costs.
          </li>
          <li>
            <strong className="text-cream">One-week test</strong>: we
            test on your real documents and measure the minutes each task
            takes, before and after.
          </li>
          <li>
            <strong className="text-cream">Pilot</strong>: one process,
            one team, 3 to 4 weeks, at a fixed price agreed in writing.
            The pilot price is credited in full to the project.
          </li>
          <li>
            <strong className="text-cream">Project</strong>: the system
            is connected to your ERP and rolled out in 6 to 8 weeks, at a
            fixed price agreed after the pilot. Significant changes to
            scope are agreed in writing and priced separately before work
            on them begins.
          </li>
          <li>
            <strong className="text-cream">Support and expansion</strong>:
            optional monthly support, and the next process built on the
            same base.
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
            Build invoices are issued at agreed milestones and payable
            within 14 days of issue.
          </li>
          <li>
            Monthly support fees are invoiced monthly in advance.
          </li>
          <li>
            Late payment may result in work being paused until the
            outstanding balance is cleared.
          </li>
        </ul>
        <p>
          VALOR is not registered for VAT in Slovenia, so no VAT is
          charged on its invoices (Article 94(1) of the Slovenian VAT Act,
          ZDDV-1).
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
          We treat all information you share with us (business data,
          processes, financials, internal systems) as confidential. We
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
          liability to you in connection with any project, whether in
          contract, tort or otherwise, is limited to the total fees paid
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
          <strong className="text-cream">{brand.legal.entity}</strong><br />
          {brand.legal.address}<br />
          Slovenia, European Union<br />
          Registration no.: {brand.legal.registrationNo}<br />
          Tax no.: {brand.legal.taxNo} (not registered for VAT)<br />
          <a href={`mailto:${brand.email}`}>{brand.email}</a><br />
          <a href={brand.whatsappUrl}>{brand.phoneDisplay}</a>
        </p>
      </section>
    </>
  );
}

function BodySl() {
  return (
    <>
      <section>
        <h2>1. Za koga veljajo ti pogoji</h2>
        <p>
          Ti pogoji urejajo razmerje med podjetjem{" "}
          <strong className="text-cream">{brand.legal.entity}</strong>, ki
          posluje pod znamko VALOR (v nadaljevanju &bdquo;mi&ldquo;), Slovenija,
          Evropska unija, in vsako osebo ali organizacijo (v nadaljevanju
          &bdquo;vi&ldquo; ali &bdquo;naročnik&ldquo;), ki VALOR naroči izvedbo
          projekta ali mesečno podporo.
        </p>
        <p>
          Z rezervacijo uvodnega klica, sprejemom ponudbe za projekt ali
          naročilom, da začnemo z delom, sprejmete te pogoje. Če obstaja
          podpisana pogodba o projektu, ima ob morebitnem neskladju prednost
          pogodba.
        </p>
      </section>

      <section>
        <h2>2. Kako poteka projekt</h2>
        <p>Vsako sodelovanje poteka po istem postopku v petih korakih:</p>
        <ul>
          <li>
            <strong className="text-cream">Uvodni klic</strong>: brezplačen
            20-minutni klic, da razumemo, kje je ročno delo in koliko stane.
          </li>
          <li>
            <strong className="text-cream">Tedenski test</strong>: testiramo
            na vaših pravih dokumentih in izmerimo minute, ki jih vsaka naloga
            vzame prej in potem.
          </li>
          <li>
            <strong className="text-cream">Pilot</strong>: en proces, ena
            ekipa, 3 do 4 tedne, po fiksni ceni, dogovorjeni pisno. Cena pilota
            se v celoti upošteva pri projektu.
          </li>
          <li>
            <strong className="text-cream">Projekt</strong>: sistem povežemo z
            vašim ERP in ga uvedemo v 6 do 8 tednih, po fiksni ceni, dogovorjeni
            po pilotu. Večje spremembe obsega se dogovorijo pisno in ovrednotijo
            ločeno, preden se delo na njih začne.
          </li>
          <li>
            <strong className="text-cream">Podpora in širitev</strong>:
            neobvezna mesečna podpora in naslednji proces, zgrajen na isti
            osnovi.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Plačila</h2>
        <p>
          Plačilni pogoji, terminski načrt mejnikov in zneski so določeni v
          pogodbi o projektu ali ponudbi. Če ni drugače dogovorjeno:
        </p>
        <ul>
          <li>
            Računi za izvedbo se izdajo ob dogovorjenih mejnikih in so plačljivi
            v 14 dneh od izdaje.
          </li>
          <li>Mesečna podpora se zaračunava mesečno vnaprej.</li>
          <li>
            Ob zamudi s plačilom lahko delo začasno ustavimo, dokler odprti
            znesek ni poravnan.
          </li>
        </ul>
        <p>
          VALOR ni zavezanec za DDV, zato DDV na računih ni obračunan
          (1. odstavek 94. člena ZDDV-1).
        </p>
      </section>

      <section>
        <h2>4. Intelektualna lastnina</h2>
        <p>Po prejemu celotnega plačila za projekt:</p>
        <ul>
          <li>
            <strong className="text-cream">Vi ste lastnik</strong> kode,
            oblikovanja, vsebine in drugih izdelkov, ki jih izdelamo posebej za
            vaš projekt.
          </li>
          <li>
            <strong className="text-cream">Mi obdržimo</strong> lastništvo nad
            obstoječimi orodji, internimi ogrodji, knjižnicami in splošnim
            znanjem, ki jih lahko uporabimo v vašem projektu. Za namen delovanja
            izdelkov vam podelimo trajno, brezplačno licenco.
          </li>
          <li>
            Za odprtokodno programsko opremo tretjih oseb, vključeno v projekt,
            veljajo njene lastne licence. Podrobnosti posredujemo na zahtevo.
          </li>
        </ul>
        <p>
          Projekt (ime, opis, anonimizirane rezultate) lahko navedemo v svojem
          portfelju, razen če nas pisno prosite, naj tega ne storimo.
        </p>
      </section>

      <section>
        <h2>5. Zaupnost</h2>
        <p>
          Vse informacije, ki jih delite z nami (poslovne podatke, procese,
          finance, interne sisteme), obravnavamo kot zaupne. Tretjim osebam jih
          ne razkrijemo brez vašega soglasja, razen kadar to zahteva zakon, ali
          podizvajalcem, ki jih zavezujejo enakovredne obveznosti zaupnosti.
        </p>
        <p>
          Strinjate se, da boste neobjavljene metodologije, cene in tehnične
          pristope VALOR, ki jih delimo z vami, obravnavali kot zaupne.
        </p>
      </section>

      <section>
        <h2>6. Kaj potrebujemo od vas</h2>
        <p>Pravočasna izvedba projektov je odvisna od vašega sodelovanja. Strinjate se, da boste:</p>
        <ul>
          <li>
            V dogovorjenih rokih zagotovili dostope, vsebine, prijavne podatke in
            povratne informacije.
          </li>
          <li>Določili glavno kontaktno osebo s pooblastilom za odločanje.</li>
          <li>
            Izdelke pregledali in odobrili v 7 delovnih dneh od predaje, sicer
            se štejejo za sprejete.
          </li>
        </ul>
        <p>
          Zamude zaradi poznega sodelovanja naročnika lahko podaljšajo roke in,
          če so večje, povzročijo dodatne stroške, ki se pred obračunom
          dogovorijo pisno.
        </p>
      </section>

      <section>
        <h2>7. Jamstva in omejitev odgovornosti</h2>
        <p>
          Kakovost jemljemo resno in stojimo za svojim delom. Jamčimo, da bodo
          izdelki ob predaji ustrezali dogovorjeni specifikaciji.
        </p>
        <p>
          V največjem obsegu, ki ga dovoljuje veljavna zakonodaja, je naša
          skupna odgovornost do vas v zvezi s katerimkoli projektom, pogodbena,
          odškodninska ali drugačna, omejena na skupni znesek, ki ste nam ga
          plačali za ta projekt v 12 mesecih pred zahtevkom.
        </p>
        <p>
          Ne odgovarjamo za posredno, posledično ali naključno škodo, izgubljeni
          dobiček, izgubo podatkov ali prekinitev poslovanja, tudi če smo bili
          na možnost takšne škode opozorjeni.
        </p>
      </section>

      <section>
        <h2>8. Prekinitev</h2>
        <p>
          Vsaka stranka lahko sodelovanje prekine s 30-dnevnim pisnim
          odpovednim rokom. Ob prekinitvi:
        </p>
        <ul>
          <li>Plačate vse delo, opravljeno do datuma prekinitve.</li>
          <li>
            Predamo vse dokončano delo in, kjer je to razumno mogoče, tudi
            nedokončano delo v trenutnem stanju.
          </li>
        </ul>
      </section>

      <section>
        <h2>9. Veljavno pravo</h2>
        <p>
          Za te pogoje velja pravo Republike Slovenije. Za spore, ki jih ni
          mogoče rešiti sporazumno, je izključno pristojno sodišče v Ljubljani.
        </p>
      </section>

      <section>
        <h2>10. Spremembe pogojev</h2>
        <p>
          Te pogoje lahko občasno posodobimo. Spremembe začnejo veljati z
          objavo na tej strani. Za tekoče projekte veljajo pogoji, ki so veljali
          ob podpisu pogodbe o projektu.
        </p>
      </section>

      <section>
        <h2>11. Kontakt</h2>
        <p>Za vprašanja o teh pogojih:</p>
        <p>
          <strong className="text-cream">{brand.legal.entity}</strong><br />
          {brand.legal.address}<br />
          Slovenija, Evropska unija<br />
          Matična številka: {brand.legal.registrationNo}<br />
          Davčna številka: {brand.legal.taxNo} (ni zavezanec za DDV)<br />
          <a href={`mailto:${brand.email}`}>{brand.email}</a><br />
          <a href={brand.whatsappUrl}>{brand.phoneDisplay}</a>
        </p>
      </section>
    </>
  );
}

export function TermsView({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  return (
    <LegalShell locale={locale} title={t.title} updated={t.updated} crumb={{ name: pageNames[locale].terms, path: "/terms" }}>
      {locale === "sl" ? <BodySl /> : <BodyEn />}
    </LegalShell>
  );
}
