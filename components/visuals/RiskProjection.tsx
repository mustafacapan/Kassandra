"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

const TARGETS = [45, 68, 82];
const BASE = 28;

export default function RiskProjection({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);

  const cols = [
    { label: t("kge.visual.d30"), target: TARGETS[0] },
    { label: t("kge.visual.d60"), target: TARGETS[1] },
    { label: t("kge.visual.d90"), target: TARGETS[2] },
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
          {t("kge.visual.projName")}
        </p>

        <div className="relative mt-4">
          <div
            className="absolute left-0 right-0 border-t-2 border-dashed border-[#e11d48]"
            style={{ bottom: "80%" }}
            aria-hidden
          >
            <span className="absolute -top-5 right-0 text-[10px] font-semibold text-[#e11d48] tabular-nums">
              {t("kge.visual.threshold")}
            </span>
          </div>

          <div className="grid h-44 grid-cols-3 items-end gap-3 border-b border-[rgba(43,83,114,0.10)] pb-0">
            {cols.map((col, i) => {
              const v = BASE + (col.target - BASE) * (reduced ? 1 : clamp01((eff - i * 0.15) / 0.5));
              const hot = v >= 80;
              return (
                <motion.div
                  key={col.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                  className="flex h-full flex-col items-center justify-end"
                >
                  <span
                    className={`mb-1 flex items-center gap-1 text-sm font-semibold tabular-nums ${hot ? "text-[#e11d48]" : "text-[#1A2834]"}`}
                  >
                    {Math.round(v)}
                    {hot &&
                      (reduced ? (
                        <span aria-hidden className="text-[#e11d48]">↑</span>
                      ) : (
                        <motion.span
                          aria-hidden
                          className="inline-block text-[#e11d48]"
                          animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                        >
                          ↑
                        </motion.span>
                      ))}
                  </span>
                  <div
                    className={`w-full rounded-t-xl ${hot ? "bg-[#e11d48]/80" : "bg-gradient-to-t from-[#10B981] to-[#2B5372]"}`}
                    style={{ height: `${v}%` }}
                  />
                  <span className="mt-2 text-[11px] font-medium text-[#7A8A98] tabular-nums">
                    {col.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
