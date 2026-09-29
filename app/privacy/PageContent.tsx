"use client";

import Link from "next/link";
import { I18nProvider } from "@/lib/i18n";

const H2 = "text-xl md:text-2xl font-semibold text-[#1A2834] mt-12 mb-4";
const H3 = "text-base font-semibold text-[#1A2834] mt-6 mb-2";
const P = "text-base text-[#4A5A68] leading-relaxed mb-4";
const UL = "list-disc pl-6 space-y-2 text-[#4A5A68] mb-4";
const A = "text-[#2B5372] underline underline-offset-4 hover:text-[#E07A5F] transition-colors";
const STRONG = "font-semibold text-[#1A2834]";

function PrivacyContent() {
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
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-[#7A8A98]">Last updated: January 2026</p>
        <p className="mt-4 text-base leading-relaxed text-[#4A5A68]">
          This Privacy Policy explains how Kassandra Prophecy (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
          collects, uses, and protects your personal data in compliance with the EU General Data
          Protection Regulation (GDPR) and the Turkish Personal Data Protection Law (KVKK, Law No. 6698).
        </p>

        <section>
          <h2 className={H2}>1. Who We Are (Data Controller)</h2>
          <p className={P}>The data controller responsible for your personal data is:</p>
          <ul className={UL}>
            <li><span className={STRONG}>Name:</span> Mustafa Çapan (operating as &quot;Kassandra Prophecy&quot;)</li>
            <li><span className={STRONG}>Email:</span> <a href="mailto:mustafa@kassandraprophecy.com" className={A}>mustafa@kassandraprophecy.com</a></li>
            <li><span className={STRONG}>Location:</span> Türkiye</li>
          </ul>
          <p className={P}>
            Kassandra Prophecy is currently operated as an individual developer. We are not yet a
            registered company, but we are committed to full compliance with applicable data
            protection laws.
          </p>
        </section>

        <div className="border-t border-black/[0.06] my-8" aria-hidden />

        <section>
          <h2 className={H2}>2. Data We Collect</h2>
          <h3 className={H3}>2.1 — Information you provide</h3>
          <ul className={UL}>
            <li>Full name, work email, company name, job title, company size, role, areas of interest, optional notes (via the contact form)</li>
          </ul>
          <h3 className={H3}>2.2 — Information collected automatically</h3>
          <ul className={UL}>
            <li>IP address (for security, rate limiting, and abuse prevention)</li>
            <li>Server access logs (browser type, operating system, timestamp)</li>
            <li>No analytics, tracking pixels, or advertising identifiers</li>
          </ul>
          <h3 className={H3}>2.3 — What we do NOT collect</h3>
          <ul className={UL}>
            <li>Passwords (no account system yet)</li>
            <li>Payment information</li>
            <li>Special category data (health, biometric, political, religious)</li>
            <li>Location data beyond IP-derived country</li>
          </ul>
        </section>

        <div className="border-t border-black/[0.06] my-8" aria-hidden />

        <section>
          <h2 className={H2}>3. How We Use Your Data</h2>
          <ul className={UL}>
            <li>Respond to your briefing requests</li>
            <li>Communicate about our products and services</li>
            <li>Security and spam prevention (rate limiting, honeypot)</li>
            <li>Legal compliance (record-keeping for tax or regulatory purposes, if applicable)</li>
          </ul>
          <p className={P}>We do NOT:</p>
          <ul className={UL}>
            <li>Sell your data to third parties</li>
            <li>Use your data for automated decision-making</li>
            <li>Send marketing emails without your explicit consent</li>
          </ul>
        </section>

        <div className="border-t border-black/[0.06] my-8" aria-hidden />

        <section>
          <h2 className={H2}>4. Legal Basis for Processing</h2>
          <p className={P}>Under GDPR Article 6:</p>
          <ul className={UL}>
            <li><span className={STRONG}>Consent</span> (Art. 6(1)(a)) — When you submit the contact form</li>
            <li><span className={STRONG}>Legitimate Interest</span> (Art. 6(1)(f)) — Security, fraud prevention, rate limiting</li>
            <li><span className={STRONG}>Legal Obligation</span> (Art. 6(1)(c)) — When required by law</li>
          </ul>
          <p className={P}>Under KVKK Article 5:</p>
          <ul className={UL}>
            <li><span className={STRONG}>Explicit consent</span> (açık rıza) — Contact form submission</li>
            <li><span className={STRONG}>Legitimate interest</span> (meşru menfaat) — Security measures</li>
            <li><span className={STRONG}>Legal obligation</span> — Compliance with Turkish law</li>
          </ul>
        </section>

        <div className="border-t border-black/[0.06] my-8" aria-hidden />

        <section>
          <h2 className={H2}>5. Data Sharing</h2>
          <p className={P}>We share limited data with trusted service providers:</p>
          <ul className={UL}>
            <li><span className={STRONG}>Vercel</span> (hosting, USA)</li>
            <li><span className={STRONG}>Resend</span> (email delivery, USA)</li>
            <li><span className={STRONG}>Zoho Mail</span> (email receiving, USA/India)</li>
            <li><span className={STRONG}>Namecheap</span> (domain and DNS, USA)</li>
          </ul>
          <p className={P}>
            Each provider is bound by their own data protection agreements. We do not sell, rent,
            or trade your personal data.
          </p>
        </section>

        <div className="border-t border-black/[0.06] my-8" aria-hidden />

        <section>
          <h2 className={H2}>6. Data Retention</h2>
          <ul className={UL}>
            <li>Contact form submissions: 24 months (or until business relationship ends)</li>
            <li>Server access logs: 30 days (Vercel default)</li>
            <li>Emails: 24 months</li>
          </ul>
          <p className={P}>You may request earlier deletion at any time (see Section 8).</p>
        </section>

        <div className="border-t border-black/[0.06] my-8" aria-hidden />

        <section>
          <h2 className={H2}>7. International Data Transfers</h2>
          <p className={P}>
            Your data is transferred to and processed in the United States through Vercel, Resend,
            and Zoho. These transfers are based on:
          </p>
          <ul className={UL}>
            <li><span className={STRONG}>Your explicit consent</span> (by submitting the contact form)</li>
            <li><span className={STRONG}>Standard Contractual Clauses</span> (SCCs) where applicable</li>
            <li><span className={STRONG}>Adequacy decisions</span> where recognized</li>
          </ul>
          <p className={P}>
            Under KVKK Article 9, we rely on your explicit consent for cross-border transfers. You
            may withdraw this consent at any time by contacting us, though this may limit our
            ability to respond to your request.
          </p>
        </section>

        <div className="border-t border-black/[0.06] my-8" aria-hidden />

        <section>
          <h2 className={H2}>8. Your Rights</h2>
          <p className={P}>Under GDPR, you have the right to:</p>
          <ul className={UL}>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request erasure (&quot;right to be forgotten&quot;)</li>
            <li>Restrict or object to processing</li>
            <li>Data portability</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
          <p className={P}>Under KVKK Article 11, you have the right to:</p>
          <ul className={UL}>
            <li>Learn whether your data is processed</li>
            <li>Request information about processing</li>
            <li>Request correction or deletion</li>
            <li>Object to processing</li>
            <li>Request compensation for damages</li>
          </ul>
          <p className={P}>
            To exercise any of these rights, contact:{" "}
            <a href="mailto:mustafa@kassandraprophecy.com" className={A}>mustafa@kassandraprophecy.com</a>.
            We respond within 30 days.
          </p>
        </section>

        <div className="border-t border-black/[0.06] my-8" aria-hidden />

        <section>
          <h2 className={H2}>9. Cookies and Tracking</h2>
          <p className={P}>
            We currently use only essential technical cookies required for the site to function.
            We do NOT use:
          </p>
          <ul className={UL}>
            <li>Analytics cookies</li>
            <li>Advertising cookies</li>
            <li>Third-party tracking cookies</li>
          </ul>
          <p className={P}>
            If we introduce analytics or advertising in the future, we will update this policy and
            request your consent where required.
          </p>
        </section>

        <div className="border-t border-black/[0.06] my-8" aria-hidden />

        <section>
          <h2 className={H2}>10. Security</h2>
          <p className={P}>We implement industry-standard security measures:</p>
          <ul className={UL}>
            <li>HTTPS/TLS 1.3 encryption in transit</li>
            <li>Rate limiting on form submissions</li>
            <li>Honeypot spam protection</li>
            <li>Restricted access to personal data (founder only)</li>
          </ul>
          <p className={P}>
            No system is 100% secure. If a data breach occurs, we will notify affected users and
            relevant authorities within 72 hours as required by GDPR and KVKK.
          </p>
        </section>

        <div className="border-t border-black/[0.06] my-8" aria-hidden />

        <section>
          <h2 className={H2}>11. Children&apos;s Privacy</h2>
          <p className={P}>
            Our services are not directed to individuals under 16. We do not knowingly collect
            data from children. If we become aware of such data, we will delete it promptly.
          </p>
        </section>

        <div className="border-t border-black/[0.06] my-8" aria-hidden />

        <section>
          <h2 className={H2}>12. Changes to This Policy</h2>
          <p className={P}>
            We may update this policy from time to time. Material changes will be announced on
            this page with an updated &quot;Last updated&quot; date and, where appropriate, by
            email notification.
          </p>
        </section>

        <div className="border-t border-black/[0.06] my-8" aria-hidden />

        <section>
          <h2 className={H2}>13. Contact</h2>
          <p className={P}>For any questions about this Privacy Policy or your personal data:</p>
          <ul className={UL}>
            <li>Email: <a href="mailto:mustafa@kassandraprophecy.com" className={A}>mustafa@kassandraprophecy.com</a></li>
            <li>Data Controller: Mustafa Çapan (Kassandra Prophecy)</li>
            <li>Location: Türkiye</li>
          </ul>
          <p className={P}>
            See also: <Link href="/terms" className={A}>Terms of Service</Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default function PrivacyPage() {
  return (
    <I18nProvider>
      <PrivacyContent />
    </I18nProvider>
  );
}
