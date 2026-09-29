"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function ThanksContent() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  return (
    <main className="flex min-h-screen items-center bg-[#F4F6F8] text-[#1A2834]">
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-2xl px-6 py-24 text-center"
      >
        <CheckCircle className="mx-auto h-12 w-12 text-[#10B981]" aria-hidden />
        <h1 className="apple-headline mt-6 text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-5xl">
          {t("thanks.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#4A5A68]">
          {t("thanks.body")}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-[rgba(43,83,114,0.15)] bg-white px-6 py-3 text-sm font-semibold text-[#1A2834] transition-colors duration-150 hover:bg-[#E8EDF2] active:scale-[0.96]"
          >
            {t("thanks.back")}
          </Link>
          <Link
            href="/platform/kre"
            className="inline-flex min-h-[44px] items-center rounded-xl bg-[#2B5372] px-6 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#1E3F58] active:scale-[0.96]"
          >
            {t("thanks.explore")}
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

export default function ThanksPage() {
  return (
    <I18nProvider>
      <ThanksContent />
    </I18nProvider>
  );
}
