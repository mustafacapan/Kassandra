"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

const ROWS = [
  { key: "kee.loss.legal", pct: 18.1, amount: "$630K" },
  { key: "kee.loss.operational", pct: 34.2, amount: "$1.19M" },
  { key: "kee.loss.churn", pct: 19.2, amount: "$668K" },
  { key: "kee.loss.market", pct: 8.5, amount: "$296K" },
  { key: "kee.loss.insurance", pct: 5.0, amount: "$174K" },
  { key: "kee.loss.ransom", pct: 15.0, amount: "$522K" },
];

export default function LossMap({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);

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
          LossMap
        </p>
        <p className="apple-headline mt-2 text-4xl font-semibold tracking-tight text-[#1A2834] tabular-nums text-balance">
          $3.48M
        </p>
        <p className="mt-1 text-xs text-[#7A8A98]">{t("kee.loss.total")}</p>

        <div className="mt-5 space-y-3">
          {ROWS.map((row, i) => {
            const fill = reduced ? 1 : clamp01((eff - i * 0.09) / 0.45);
            const width = Math.max(2, row.pct * fill);
            return (
              <motion.div
                key={row.key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
              >
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-medium text-[#1A2834]">
                    {t(row.key)}
                  </span>
                  <span className="text-xs text-[#7A8A98] tabular-nums">
                    {row.amount} · {row.pct.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#E8EDF2]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#2B5372]"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-4 border-t border-[rgba(43,83,114,0.10)] pt-3 text-xs italic leading-relaxed text-[#7A8A98]">
          {t("kee.loss.caption")}
        </p>
      </div>
    </motion.div>
  );
}
