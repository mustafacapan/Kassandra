"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SIZE_OPTIONS = [
  { value: "50-200", labelKey: "contact.form.size.option.50-200" },
  { value: "200-1000", labelKey: "contact.form.size.option.200-1000" },
  { value: "1000-5000", labelKey: "contact.form.size.option.1000-5000" },
  { value: "5000+", labelKey: "contact.form.size.option.5000plus" },
];
const ROLE_OPTIONS = [
  { value: "CISO", labelKey: "contact.form.role.option.ciso" },
  { value: "CFO", labelKey: "contact.form.role.option.cfo" },
  { value: "Security Lead", labelKey: "contact.form.role.option.security_lead" },
  { value: "IT Manager", labelKey: "contact.form.role.option.it_manager" },
  { value: "Other", labelKey: "contact.form.role.option.other" },
];
const INTERESTS = ["KRE", "KEE", "KIE", "KGE"];
const BULLETS = [1, 2, 3, 4] as const;

const inputCls =
  "w-full rounded-xl bg-[#E8EDF2] border border-[rgba(43,83,114,0.10)] px-4 py-3 text-sm text-[#1A2834] outline-none focus:border-[#2B5372]/50 focus:ring-2 focus:ring-[#2B5372]/15 transition-[border-color,box-shadow] placeholder:text-[#7A8A98]";
const labelCls =
  "mb-2 block text-xs font-semibold uppercase tracking-wider text-[#4A5A68]";

function englishValidity(t: (k: string) => string) {
  return {
    onInvalid: (e: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const el = e.target as HTMLInputElement;
      if (el.validity.valueMissing) {
        el.setCustomValidity(t("contact.form.error.required"));
      } else if (el.validity.typeMismatch) {
        el.setCustomValidity(t("contact.form.error.email"));
      }
    },
    onInput: (e: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      (e.target as HTMLInputElement).setCustomValidity("");
    },
  };
}

function ContactForm() {
  const { t } = useI18n();
  const router = useRouter();
  const [interest, setInterest] = useState<string[]>([]);
  const [interestErr, setInterestErr] = useState(false);
  const [submitErr, setSubmitErr] = useState(false);
  const [sending, setSending] = useState(false);
  const v = englishValidity(t);

  const toggleInterest = (k: string) => {
    setInterest((prev) => {
      const next = prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k];
      if (next.length > 0) setInterestErr(false);
      return next;
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitErr(false);
    const data = new FormData(e.currentTarget);
    if (data.get("website")) {
      router.push("/contact/thank-you");
      return;
    }
    if (interest.length === 0) {
      setInterestErr(true);
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          title: data.get("title"),
          size: data.get("size"),
          role: data.get("role"),
          interest,
          notes: data.get("notes"),
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      router.push("/contact/thank-you");
    } catch {
      setSubmitErr(true);
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-6 shadow-[var(--shadow-card)] md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>{t("contact.form.name")}</label>
          <input id="cf-name" name="name" type="text" required placeholder="Jane Doe" autoComplete="name" className={inputCls} onInvalid={v.onInvalid} onInput={v.onInput} />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>{t("contact.form.email")}</label>
          <input id="cf-email" name="email" type="email" required placeholder="jane@company.com" autoComplete="email" className={inputCls} onInvalid={v.onInvalid} onInput={v.onInput} />
        </div>
        <div>
          <label htmlFor="cf-company" className={labelCls}>{t("contact.form.company")}</label>
          <input id="cf-company" name="company" type="text" required placeholder="Acme Corp" autoComplete="organization" className={inputCls} onInvalid={v.onInvalid} onInput={v.onInput} />
        </div>
        <div>
          <label htmlFor="cf-title" className={labelCls}>{t("contact.form.title")}</label>
          <input id="cf-title" name="title" type="text" required placeholder="CISO" autoComplete="organization-title" className={inputCls} onInvalid={v.onInvalid} onInput={v.onInput} />
        </div>
        <div>
          <label htmlFor="cf-size" className={labelCls}>{t("contact.form.size")}</label>
          <select id="cf-size" name="size" required defaultValue="" className={inputCls} onInvalid={v.onInvalid} onInput={v.onInput}>
            <option value="" disabled>—</option>
            {SIZE_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{t(s.labelKey)}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-role" className={labelCls}>{t("contact.form.role")}</label>
          <select id="cf-role" name="role" required defaultValue="" className={inputCls} onInvalid={v.onInvalid} onInput={v.onInput}>
            <option value="" disabled>—</option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r.value} value={r.value}>{t(r.labelKey)}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className={labelCls}>{t("contact.form.interest")}</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((k) => (
            <label
              key={k}
              className={`inline-flex min-h-[44px] cursor-pointer items-center rounded-xl border px-4 py-2 text-sm font-semibold transition-colors duration-150 active:scale-[0.96] ${
                interest.includes(k)
                  ? "border-[#2B5372] bg-[#2B5372]/10 text-[#2B5372]"
                  : "border-[rgba(43,83,114,0.10)] bg-[#E8EDF2] text-[#4A5A68]"
              }`}
            >
              <input
                type="checkbox"
                checked={interest.includes(k)}
                onChange={() => toggleInterest(k)}
                className="mr-2 h-4 w-4 accent-[#2B5372]"
              />
              {k}
            </label>
          ))}
        </div>
        {interestErr && (
          <p role="alert" className="mt-2 text-xs font-medium text-[#E11D48]">
            {t("contact.form.error.interest")}
          </p>
        )}
      </fieldset>

      <div className="mt-5">
        <label htmlFor="cf-notes" className={labelCls}>{t("contact.form.notes")}</label>
        <textarea id="cf-notes" name="notes" rows={3} className={`${inputCls} resize-y`} />
      </div>

      <label className="mt-5 flex items-start gap-3">
        <input type="checkbox" required name="consent" className="mt-0.5 h-4 w-4 shrink-0 accent-[#2B5372]" />
        <span className="text-xs leading-relaxed text-[#7A8A98]">
          {t("contact.form.consent.before")}
          <Link href="/privacy" className="text-[#2B5372] underline underline-offset-4 transition-colors duration-150 hover:text-[#E07A5F]">
            {t("contact.form.consent.link")}
          </Link>
          {t("contact.form.consent.after")}
        </span>
      </label>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />

      {submitErr && (
        <p role="alert" className="mt-4 rounded-xl bg-[#E11D48]/10 px-4 py-3 text-sm font-medium text-[#E11D48]">
          {t("contact.form.error.generic")}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="btn-energy mt-6 w-full active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
      >
        {sending ? t("contact.form.submitting") : t("contact.form.submit")}
      </button>
    </form>
  );
}

function ContactContent() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const fade = reduced ? { opacity: 0 } : { opacity: 0, y: 14 };

  return (
    <main className="min-h-screen bg-[#F4F6F8] text-[#1A2834]">
      <div className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
        <motion.div
          initial={fade}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
              {t("contact.eyebrow")}
            </p>
            <h1 className="apple-headline text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-5xl">
              {t("contact.title")}
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#4A5A68]">
              {t("contact.body")}
            </p>
            <ul className="mt-8 space-y-4">
              {BULLETS.map((n, i) => (
                <motion.li
                  key={n}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: "easeOut" }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" aria-hidden />
                  <span className="text-[15px] leading-relaxed text-[#1A2834]">
                    {t(`contact.bullet.${n}`)}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </motion.div>
        <div className="pb-20" />
      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <I18nProvider>
      <ContactContent />
    </I18nProvider>
  );
}
