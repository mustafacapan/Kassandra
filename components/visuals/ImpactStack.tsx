"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

export default function ImpactStack({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);

  const rows = [
    { key: "kre.visual.s1", value: "10.000", hot: false },
    { key: "kre.visual.s2", value: "3", hot: false },
    { key: "kre.visual.s3", value: "1", hot: false },
    { key: "kre.visual.s4", value: "%90", hot: true },
  ];

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
          ImpactStack
        </p>

        <div className="mt-4 space-y-2">
          {rows.map((row, i) => {
            const o = reduced ? 1 : clamp01((eff - i * 0.15) / 0.4);
            return (
              <motion.div
                key={row.key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                style={{ opacity: Math.max(0.2, o) }}
                className={`flex min-h-[44px] items-center justify-between rounded-xl px-4 py-2.5 ${
                  row.hot ? "bg-gradient-to-r from-[#2B5372]/[0.06] to-[#10B981]/[0.06]" : "bg-[#E8EDF2]"
                }`}
              >
                <span className="text-sm font-medium text-[#1A2834] text-balance">
                  {t(row.key)}
                </span>
                <span
                  className={`text-lg font-semibold tabular-nums ${
                    row.hot ? "text-[#10B981]" : "text-[#1A2834]"
                  }`}
                >
                  {row.value}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
