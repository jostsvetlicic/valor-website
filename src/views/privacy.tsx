import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { alternates, type Dict, type Locale } from "@/i18n";
import { LegalShell } from "@/views/legal";

const copy: Dict<{ title: string; description: string; updated: string }> = {
  en: { title: "Privacy Policy", description: "How VALOR collects, uses and protects your personal data. GDPR privacy notice for valorai.eu.", updated: "3 October 2026" },
  sl: { title: "Pravilnik o zasebnosti", description: "Kako VALOR zbira, uporablja in varuje vaše osebne podatke. Obvestilo o zasebnosti po GDPR za valorai.eu.", updated: "3. oktober 2026" },
};

export function privacyMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return {
    title: t.title,
    description: t.description,
    robots: { index: true, follow: true },
    alternates: alternates("/privacy", locale),
  };
}

function BodyEn() {
  return (
    <>
      <section>
        <h2>1. Who we are</h2>
        <p>
          VALOR is a brand of{" "}
          <strong className="text-cream">{brand.legal.entity}</strong>{" "}
          (referred to as &ldquo;we&rdquo;, &ldquo;us&rdquo; or
          &ldquo;our&rdquo;), Slovenia, European Union, the data
          controller for this website.
        </p>
        <p>
          Address: {brand.legal.address}, Slovenia
          <br />
          Registration no.: {brand.legal.registrationNo}
          <br />
          Tax no.: {brand.legal.taxNo}
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
          write. The form opens your own email app with the message ready
          to send to our inbox. It is not stored in any database operated
          by VALOR.
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
          Our booking buttons open Notion Calendar, an external scheduling
          service, in a new tab. Any data you provide there is subject to
          Notion&rsquo;s own privacy policy. We receive your name, email address and the time slot
          you select in order to prepare for and conduct the call.
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
          This site stores one functional preference in your
          browser&rsquo;s <code className="text-cream">localStorage</code>:
          whether you have acknowledged the cookie notice. It contains no
          personal data and is not sent to a third party.
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
            <strong className="text-cream">Netlify</strong>: website
            hosting and CDN (United States; covered by Standard Contractual
            Clauses)
          </li>
          <li>
            <strong className="text-cream">Meta (WhatsApp)</strong>: used
            when you choose to contact us on WhatsApp; governed by
            Meta&rsquo;s privacy policy
          </li>
          <li>
            <strong className="text-cream">Notion Calendar</strong>:
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
          outside the EEA, we ensure appropriate safeguards are in place,
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
          <li><strong className="text-cream">Access</strong>: request a copy of the personal data we hold about you</li>
          <li><strong className="text-cream">Rectification</strong>: ask us to correct inaccurate data</li>
          <li><strong className="text-cream">Erasure</strong>: ask us to delete your data (the &ldquo;right to be forgotten&rdquo;)</li>
          <li><strong className="text-cream">Restriction</strong>: ask us to restrict how we use your data</li>
          <li><strong className="text-cream">Portability</strong>: receive your data in a machine-readable format</li>
          <li><strong className="text-cream">Objection</strong>: object to processing based on legitimate interests</li>
          <li><strong className="text-cream">Withdraw consent</strong>: where processing is based on consent, you can withdraw it at any time</li>
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
    </>
  );
}

function BodySl() {
  return (
    <>
      <section>
        <h2>1. Kdo smo</h2>
        <p>
          VALOR je blagovna znamka podjetja{" "}
          <strong className="text-cream">{brand.legal.entity}</strong>{" "}
          (v nadaljevanju &bdquo;mi&ldquo;), Slovenija, Evropska unija, ki je
          upravljavec osebnih podatkov za to spletno stran.
        </p>
        <p>
          Naslov: {brand.legal.address}, Slovenija
          <br />
          Matična številka: {brand.legal.registrationNo}
          <br />
          Davčna številka: {brand.legal.taxNo}
        </p>
        <p>
          <strong className="text-cream">Kontakt:</strong><br />
          E-pošta: <a href={`mailto:${brand.email}`}>{brand.email}</a><br />
          Telefon / WhatsApp:{" "}
          <a href={brand.phoneHref}>{brand.phoneDisplay}</a>
        </p>
      </section>

      <section>
        <h2>2. Katere podatke zbiramo in zakaj</h2>
        <p>
          Zbiramo samo podatke, ki nam jih posredujete sami. Na stran ni
          povezano samodejno sledenje, analitična platforma ali oglaševalsko
          omrežje.
        </p>

        <h3 className="mt-6 text-base font-semibold text-cream">
          Kontaktni obrazec
        </h3>
        <p>
          Ko izpolnite kontaktni obrazec na tej strani, zberemo vaše ime,
          e-naslov, ime podjetja (neobvezno) in sporočilo, ki ga napišete. Ti
          Obrazec odpre vaš poštni program s sporočilom, pripravljenim za
          pošiljanje v naš nabiralnik. Ne shranjujemo ga v nobeni podatkovni
          bazi, ki bi jo upravljal VALOR.
        </p>
        <ul>
          <li><strong className="text-cream">Namen:</strong> odgovor na vaše povpraševanje</li>
          <li><strong className="text-cream">Pravna podlaga:</strong> vaša privolitev (člen 6(1)(a) GDPR) in naš zakoniti interes za komunikacijo s potencialnimi strankami (člen 6(1)(f) GDPR)</li>
          <li><strong className="text-cream">Hramba:</strong> sporočila hranimo le, dokler jih potrebujemo za odgovor in nadaljnjo komunikacijo, in ne dlje kot 12 mesecev, razen če se začne poslovno sodelovanje</li>
        </ul>

        <h3 className="mt-6 text-base font-semibold text-cream">
          Koledar za rezervacije
        </h3>
        <p>
          Gumbi za rezervacijo v novem zavihku odprejo Notion Calendar, zunanjo
          storitev za načrtovanje sestankov. Za podatke, ki jih tam vnesete,
          velja pravilnik o zasebnosti podjetja Notion. Prejmemo
          vaše ime, e-naslov in izbrani termin, da se lahko pripravimo na klic
          in ga izvedemo.
        </p>

        <h3 className="mt-6 text-base font-semibold text-cream">
          Strežniški dnevniki
        </h3>
        <p>
          Naš ponudnik gostovanja (Netlify) samodejno beleži standardne
          strežniške podatke, vključno z IP naslovom, vrsto brskalnika,
          obiskanimi stranmi ter datumom in časom zahtev. Ti podatki se
          uporabljajo izključno za spremljanje varnosti in razpoložljivosti in
          se hranijo v skladu s pravili hrambe podjetja Netlify.
        </p>
      </section>

      <section>
        <h2>3. Piškotki</h2>
        <p>
          Ta stran v <code className="text-cream">localStorage</code> vašega
          brskalnika shrani eno funkcionalno nastavitev: ali ste potrdili
          obvestilo o piškotkih. Ne vsebuje osebnih podatkov in se ne pošilja
          tretjim osebam.
        </p>
        <p>
          Ne uporabljamo analitičnih ali oglaševalskih piškotkov niti piškotkov,
          ki bi sledili vašemu vedenju na drugih spletnih straneh.
        </p>
      </section>

      <section>
        <h2>4. S kom delimo podatke</h2>
        <p>
          Vaših osebnih podatkov ne prodajamo, ne oddajamo in ne izmenjujemo.
          Za delovanje strani uporabljamo naslednje obdelovalce:
        </p>
        <ul>
          <li>
            <strong className="text-cream">Netlify</strong>: gostovanje spletne
            strani in CDN (Združene države Amerike; zajeto s standardnimi
            pogodbenimi klavzulami)
          </li>
          <li>
            <strong className="text-cream">Meta (WhatsApp)</strong>: kadar nas
            kontaktirate prek WhatsAppa; velja pravilnik o zasebnosti podjetja
            Meta
          </li>
          <li>
            <strong className="text-cream">Notion Calendar</strong>: zunanji
            koledar za rezervacije; velja pravilnik o zasebnosti podjetja Notion
          </li>
        </ul>
        <p>
          Vse obdelovalce zavezujejo pogodbe o obdelavi podatkov, po katerih
          morajo vaše podatke varovati vsaj v obsegu, ki ga zahteva GDPR.
        </p>
      </section>

      <section>
        <h2>5. Prenosi v tretje države</h2>
        <p>
          Nekateri od zgoraj navedenih obdelovalcev imajo sedež zunaj Evropskega
          gospodarskega prostora (EGP). Kadar se osebni podatki prenašajo zunaj
          EGP, zagotovimo ustrezne zaščitne ukrepe, običajno standardne
          pogodbene klavzule, ki jih je odobrila Evropska komisija.
        </p>
      </section>

      <section>
        <h2>6. Vaše pravice po GDPR</h2>
        <p>
          Če ste v Evropski uniji, imate glede svojih osebnih podatkov naslednje
          pravice:
        </p>
        <ul>
          <li><strong className="text-cream">Dostop</strong>: zahtevate kopijo osebnih podatkov, ki jih hranimo o vas</li>
          <li><strong className="text-cream">Popravek</strong>: zahtevate popravek netočnih podatkov</li>
          <li><strong className="text-cream">Izbris</strong>: zahtevate izbris svojih podatkov (&bdquo;pravica do pozabe&ldquo;)</li>
          <li><strong className="text-cream">Omejitev</strong>: zahtevate omejitev uporabe svojih podatkov</li>
          <li><strong className="text-cream">Prenosljivost</strong>: prejmete svoje podatke v strojno berljivi obliki</li>
          <li><strong className="text-cream">Ugovor</strong>: ugovarjate obdelavi na podlagi zakonitega interesa</li>
          <li><strong className="text-cream">Preklic privolitve</strong>: kadar obdelava temelji na privolitvi, jo lahko kadarkoli prekličete</li>
        </ul>
        <p>
          Za uveljavljanje teh pravic nam pišite na{" "}
          <a href={`mailto:${brand.email}`}>{brand.email}</a> ali prek
          WhatsAppa na{" "}
          <a href={brand.whatsappUrl}>{brand.phoneDisplay}</a>. Odgovorili bomo
          v 30 dneh. Pritožbo lahko vložite tudi pri Informacijskem
          pooblaščencu Republike Slovenije (
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
        <h2>7. Varnost podatkov</h2>
        <p>
          Izvajamo razumne tehnične in organizacijske ukrepe za zaščito vaših
          podatkov pred nepooblaščenim dostopom, izgubo ali razkritjem. Stran se
          vedno streže prek HTTPS. Podatki iz kontaktnega obrazca se pošljejo v
          naš nabiralnik sporočil in se ne shranjujejo v podatkovni bazi,
          dostopni prek interneta.
        </p>
      </section>

      <section>
        <h2>8. Zasebnost otrok</h2>
        <p>
          Ta stran ni namenjena otrokom, mlajšim od 16 let. Podatkov otrok
          zavestno ne zbiramo. Če menite, da nam je otrok posredoval podatke,
          nas kontaktirajte, da jih izbrišemo.
        </p>
      </section>

      <section>
        <h2>9. Spremembe pravilnika</h2>
        <p>
          Ta pravilnik lahko občasno posodobimo. Datum &bdquo;Zadnja
          posodobitev&ldquo; na vrhu strani pove, kdaj je bil nazadnje
          spremenjen. Z nadaljnjo uporabo strani po spremembi sprejmete
          posodobljeni pravilnik.
        </p>
      </section>

      <section>
        <h2>10. Kontakt</h2>
        <p>
          Za vsa vprašanja in zahteve glede zasebnosti nas dosežete na:
        </p>
        <p>
          <strong className="text-cream">VALOR</strong><br />
          Slovenija, Evropska unija<br />
          <a href={`mailto:${brand.email}`}>{brand.email}</a><br />
          <a href={brand.whatsappUrl}>{brand.phoneDisplay}</a>
        </p>
      </section>
    </>
  );
}

export function PrivacyView({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  return (
    <LegalShell locale={locale} title={t.title} updated={t.updated}>
      {locale === "sl" ? <BodySl /> : <BodyEn />}
    </LegalShell>
  );
}
