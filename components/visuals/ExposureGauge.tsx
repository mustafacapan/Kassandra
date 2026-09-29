"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

const START = 3480000;
const END = 412000;
const TVAR = 23450000;

function fmt(v: number) {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(2)}M`;
  return `$${Math.round(v / 1000)}K`;
}

export default function ExposureGauge({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);
  const value = START - eff * (START - END);
  const alePos = (START / TVAR) * 100;
  const idealPos = (END / TVAR) * 100;

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
          ExposureGauge
        </p>
        <p className="apple-headline mt-2 text-5xl font-semibold tracking-tight text-[#1A2834] tabular-nums text-balance">
          {fmt(value)}
        </p>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-[#4A5A68]">{t("kee.gauge.current")}: $3.48M</span>
          <span className="font-semibold text-[#10B981] tabular-nums">
            {t("kee.gauge.ideal")}: $412K
          </span>
        </div>

        <div className="relative mt-6 h-2.5 overflow-visible rounded-full bg-[#E8EDF2]">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#10B981] to-[#2B5372]"
            style={{ width: `${Math.max(4, alePos - (alePos - idealPos) * eff)}%` }}
          />
          <div
            className="absolute inset-y-0 right-0 rounded-full bg-[#e11d48]/15"
            style={{ left: `${alePos}%` }}
          />
          <span
            className="absolute -top-1 h-4 w-1 rounded-full bg-[#e11d48]"
            style={{ left: `calc(${alePos}% - 2px)` }}
            title="$23.45M"
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="text-[#7A8A98] tabular-nums">$0</span>
          <span className="font-semibold text-[#e11d48] tabular-nums">
            {t("kee.gauge.tvar")}: $23.45M
          </span>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[#4A5A68]">
          {t("kee.gauge.scenarios")}
        </p>

        <p className="mt-2 border-t border-[rgba(43,83,114,0.10)] pt-3 text-xs italic leading-relaxed text-[#7A8A98]">
          {t("kee.gauge.caption")}
        </p>
      </div>
    </motion.div>
  );
}
