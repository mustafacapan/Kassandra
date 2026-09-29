"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SimulationConfig from "@/components/showcase/SimulationConfig";
import SimulationResultsMid from "@/components/showcase/SimulationResultsMid";

function SimulationContent() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const fade = reduced ? { opacity: 0 } : { opacity: 0, y: 14 };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F4F6F8] to-[#E8EDF2] text-[#1A2834]">
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
            {t("platform.simulation.hero.eyebrow")}
          </p>
          <h1 className="apple-headline text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-5xl">
            {t("platform.simulation.hero.title")}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4A5A68] md:text-lg">
            {t("platform.simulation.hero.body")}
          </p>
          <div
            role="button"
            tabIndex={0}
            aria-disabled={revealed}
            onClick={() => setRevealed(true)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !revealed) {
                e.preventDefault();
                setRevealed(true);
              }
            }}
            className={`btn-energy mt-6 inline-flex text-lg active:scale-[0.96] ${
              revealed ? "pointer-events-none opacity-70" : "cursor-pointer"
            }`}
          >
            {t("platform.simulation.hero.cta")}
          </div>
          <p className="mt-3 text-xs text-[#7A8A98]">
            {t("platform.simulation.hero.note")}
          </p>
        </motion.div>
      </div>

      {revealed && (
        <>
          <SimulationConfig />
          <SimulationResultsMid />
          {/* Faz 2C buraya gelecek */}
        </>
      )}

      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h2 className="apple-headline text-balance text-2xl font-semibold tracking-tight text-[#1A2834] md:text-3xl">
          {t("platform.simulation.cta.title")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[#4A5A68]">
          {t("platform.simulation.cta.body")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-energy active:scale-[0.96]">
            {t("platform.simulation.cta.primary")} →
          </Link>
          <Link
            href="/platform/agentless"
            className="inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#2B5372] transition-opacity duration-150 hover:opacity-75"
          >
            {t("platform.simulation.cta.secondary")} →
          </Link>
        </div>
      </div>

      <div id="simulation-results" className="sr-only">
        Results dashboard coming in Phase 2
      </div>
    </main>
  );
}

export default function SimulationPage() {
  return (
    <I18nProvider>
      <SimulationContent />
    </I18nProvider>
  );
}
