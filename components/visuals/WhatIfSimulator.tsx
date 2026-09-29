"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

const BEFORE = 78.4;
const AFTER = 24.1;

export default function WhatIfSimulator({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);
  const risk = BEFORE - eff * (BEFORE - AFTER);
  const barW = (risk / 100) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full rounded-2xl bg-white p-2 shadow-[var(--shadow-card)]"
    >
      <div className="rounded-xl bg-white px-5 py-5">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981]">
          WhatIfSimulator
        </p>

        <div className="mt-3 min-h-[44px] rounded-xl bg-[#E8EDF2] px-3 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7A8A98]">
            {t("kre.visual.fix")}
          </p>
          <p className="text-sm font-medium text-[#1A2834] text-balance">
            {t("kre.visual.fixName")}
          </p>
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-xs text-[#4A5A68]">{t("kre.visual.before")}</span>
          <p className="apple-headline text-5xl font-semibold tracking-tight text-[#1A2834] tabular-nums text-balance">
            %{risk.toFixed(1)}
          </p>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#E8EDF2]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#e11d48] to-[#2B5372]"
            style={{ width: `${Math.max(4, barW)}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-[#7A8A98] tabular-nums">%78.4 → %24.1</span>
          <span className="font-semibold text-[#10B981] tabular-nums">
            {t("kre.visual.delta")}: Δ %69.26
          </span>
        </div>
      </div>
    </motion.div>
  );
}
