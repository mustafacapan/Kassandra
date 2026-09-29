"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, DollarSign, Target } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const CARDS = [
  { Icon: DollarSign, titleKey: "platform.kee.card1.title", bodyKey: "platform.kee.card1.body" },
  { Icon: Activity, titleKey: "platform.kee.card2.title", bodyKey: "platform.kee.card2.body" },
  { Icon: Target, titleKey: "platform.kee.card3.title", bodyKey: "platform.kee.card3.body" },
];

function KeeContent() {
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
          className="max-w-2xl"
        >
          <Link
            href="/"
            className="mb-6 inline-block text-sm font-semibold text-[#2B5372] transition-colors duration-150 hover:text-[#1E3F58]"
          >
            {t("platform.back")}
          </Link>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
            {t("platform.kee.eyebrow")}
          </p>
          <h1 className="apple-headline text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-5xl">
            {t("platform.kee.title")}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4A5A68] md:text-lg">
            {t("platform.kee.sub")}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.titleKey}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              className="rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-8 shadow-[var(--shadow-card)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10B981]/10">
                <c.Icon className="h-5 w-5 text-[#10B981]" aria-hidden />
              </span>
              <p className="apple-headline mt-5 text-xl font-semibold tracking-tight text-[#1A2834] text-balance">
                {t(c.titleKey)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#4A5A68]">
                {t(c.bodyKey)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-12 rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-8 shadow-[var(--shadow-card)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1A2834]">
            {t("platform.kee.teaser.title")}
          </p>
          <svg viewBox="0 0 400 160" className="mt-4 h-40 w-full" aria-hidden>
            <rect x="60" y="96" width="44" height="40" rx="8" fill="#2B5372" opacity="0.35" />
            <rect x="128" y="66" width="44" height="70" rx="8" fill="#2B5372" opacity="0.6" />
            <rect x="196" y="36" width="44" height="100" rx="8" fill="#10B981" opacity="0.7" />
            <rect x="264" y="80" width="44" height="56" rx="8" fill="#2B5372" opacity="0.35" />
            <line x1="40" y1="136" x2="360" y2="136" stroke="#7A8A98" strokeWidth="1.5" />
            <circle cx="218" cy="36" r="5" fill="#10B981" />
          </svg>
          <p className="mt-4 text-sm leading-relaxed text-[#4A5A68]">
            {t("platform.kee.teaser.body")}
          </p>
          <Link
            href="/platform/kre"
            className="mt-5 inline-flex min-h-[44px] items-center rounded-xl bg-[#2B5372] px-6 py-3 text-sm font-semibold text-white transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-[#1E3F58] active:scale-[0.96]"
          >
            {t("platform.kee.teaser.button")}
          </Link>
        </motion.div>

        <div className="flex flex-col items-start gap-3 py-16 sm:flex-row sm:items-center">
          <a href="#" className="btn-energy">
            {t("platform.kee.cta.demo")}
          </a>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#2B5372] transition-opacity duration-150 hover:opacity-75"
          >
            {t("platform.kee.cta.home")}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function KeePlatformPage() {
  return (
    <I18nProvider>
      <KeeContent />
    </I18nProvider>
  );
}
