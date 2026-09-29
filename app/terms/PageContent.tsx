"use client";

import Link from "next/link";
import { I18nProvider } from "@/lib/i18n";

const H2 = "text-xl md:text-2xl font-semibold text-[#1A2834] mt-12 mb-4";
const H3 = "text-base font-semibold text-[#1A2834] mt-6 mb-2";
const P = "text-base text-[#4A5A68] leading-relaxed mb-4";
const UL = "list-disc pl-6 space-y-2 text-[#4A5A68] mb-4";
const A = "text-[#2B5372] underline underline-offset-4 hover:text-[#E07A5F] transition-colors";
const STRONG = "font-semibold text-[#1A2834]";
const DIV = "border-t border-black/[0.06] my-8";

function TermsContent() {
  return (
    <main className="bg-[#F4F6F8] text-[#1A2834]">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-[#2B5372] transition-colors duration-150 hover:text-[#1E3F58]"
        >
          ← Back to home
        </Link>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
          Legal
        </p>
        <h1 className="apple-headline text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-[#7A8A98]">Last updated: January 2026</p>
        <p className="mt-4 text-base leading-relaxed text-[#4A5A68]">
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of the
          Kassandra Prophecy website at kassandraprophecy.com (&quot;Site&quot;). By accessing
          or using the Site, you agree to be bound by these Terms.
        </p>

        <section>
          <h2 className={H2}>1. Acceptance of Terms</h2>
          <p className={P}>
            By accessing this Site, you confirm that you are at least 16 years old and
            have the legal capacity to enter into this agreement. If you do not agree
            with these Terms, please do not use the Site.
          </p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>2. About the Service</h2>
          <p className={P}>
            Kassandra Prophecy provides information about cyber risk quantification
            and related enterprise security solutions. The Site currently serves as an
            informational platform and demonstration request portal. Commercial
            services may be introduced in the future.
          </p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>3. Use of the Site</h2>
          <h3 className={H3}>3.1 — Permitted</h3>
          <p className={P}>
            You may browse the Site, submit briefing requests, and use the Site for
            lawful purposes only.
          </p>
          <h3 className={H3}>3.2 — Prohibited</h3>
          <p className={P}>You agree NOT to:</p>
          <ul className={UL}>
            <li>Attempt unauthorized access to any part of the Site</li>
            <li>Use automated systems (bots, scrapers) without prior written permission</li>
            <li>Submit false, misleading, or malicious information</li>
            <li>Interfere with the security, integrity, or performance of the Site</li>
            <li>Use the Site for any unlawful purpose or to violate any applicable law</li>
          </ul>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>4. Intellectual Property</h2>
          <p className={P}>
            All content on this Site — including text, design, code, graphics, logos,
            and data visualizations — is owned by Mustafa Çapan (Kassandra Prophecy)
            and protected by international copyright and intellectual property laws.
          </p>
          <p className={P}>
            You may NOT reproduce, distribute, modify, or create derivative works from
            any content without prior written permission.
          </p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>5. Briefing Requests</h2>
          <p className={P}>
            Submitting a briefing request does not create a client relationship or
            binding contract. We reserve the right to accept or decline any request at
            our sole discretion. Any commercial engagement will be governed by a
            separate written agreement.
          </p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>6. Third-Party Links and Services</h2>
          <p className={P}>
            The Site may reference third-party services (e.g., Vercel, Resend, Zoho).
            We are not responsible for the content, policies, or practices of third
            parties. Your use of third-party services is at your own risk.
          </p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>7. Disclaimers</h2>
          <p className={P}>
            The Site and its content are provided <span className={STRONG}>&quot;AS IS&quot;</span> and{" "}
            <span className={STRONG}>&quot;AS AVAILABLE&quot;</span> without
            warranties of any kind, express or implied.
          </p>
          <p className={P}>We do not warrant that:</p>
          <ul className={UL}>
            <li>The Site will be uninterrupted, secure, or error-free</li>
            <li>Information on the Site is accurate, complete, or current</li>
            <li>Any specific results will be obtained from using the Site</li>
          </ul>
          <p className={P}>
            No information on this Site constitutes legal, financial, or professional
            advice. Always consult qualified professionals before making business decisions.
          </p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>8. Limitation of Liability</h2>
          <p className={P}>
            To the maximum extent permitted by law, Mustafa Çapan (Kassandra Prophecy)
            shall not be liable for any indirect, incidental, special, consequential,
            or punitive damages arising from:
          </p>
          <ul className={UL}>
            <li>Your use of, or inability to use, the Site</li>
            <li>Reliance on any information provided on the Site</li>
            <li>Unauthorized access to or alteration of your submissions</li>
          </ul>
          <p className={P}>
            Our total liability for any claim shall not exceed <span className={STRONG}>$100 USD</span>.
          </p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>9. Privacy</h2>
          <p className={P}>
            Your use of the Site is also governed by our{" "}
            <Link href="/privacy" className={A}>Privacy Policy</Link> and{" "}
            <Link href="/kvkk" className={A}>KVKK Aydınlatma Metni</Link>. Please review
            them to understand how we handle your personal data.
          </p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>10. Changes to Terms</h2>
          <p className={P}>
            We may modify these Terms at any time. Material changes will be posted on
            this page with an updated &quot;Last updated&quot; date. Continued use of the Site
            after changes constitutes acceptance of the revised Terms.
          </p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>11. Governing Law and Contact</h2>
          <p className={P}>
            These Terms are governed by the laws of the Republic of Türkiye. Any
            disputes shall be resolved in the courts of Istanbul, Türkiye.
          </p>
          <p className={P}>For questions about these Terms:</p>
          <ul className={UL}>
            <li>Email: <a href="mailto:mustafa@kassandraprophecy.com" className={A}>mustafa@kassandraprophecy.com</a></li>
            <li>Provider: Mustafa Çapan (Kassandra Prophecy)</li>
            <li>Location: Türkiye</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export default function TermsPage() {
  return (
    <I18nProvider>
      <TermsContent />
    </I18nProvider>
  );
}
