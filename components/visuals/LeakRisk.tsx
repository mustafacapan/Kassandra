"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

export default function LeakRisk({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);
  const slide = clamp01(eff / 0.5);
  const block = clamp01((eff - 0.5) / 0.5);

  const chips = [
    t("kie.visual.chipIp"),
    t("kie.visual.chipKey"),
    t("kie.visual.chipData"),
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
          LeakRisk
        </p>

        <div className="relative mt-4 overflow-hidden rounded-xl bg-[#E8EDF2] px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-2">
              {chips.map((chip, i) => (
                <div
                  key={chip}
                  className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-[#1A2834] shadow-[0_0_0_1px_rgba(43,83,114,0.10)]"
                  style={{
                    transform: `translateX(${slide * (30 + i * 12)}px)`,
                    opacity: Math.max(0.15, 1 - block * 0.85),
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>

            <div
              className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_rgba(43,83,114,0.10)]"
              style={{ opacity: Math.max(0.3, 1 - block * 0.4) }}
            >
              <span className="text-[10px] font-semibold text-[#7A8A98]">
                {t("kie.visual.cloud")}
              </span>
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: block }}
                aria-hidden={block < 0.2}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e11d48]/10">
                  <span className="text-2xl font-bold text-[#e11d48]">⊘</span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div
          className="mt-3 flex justify-center"
          style={{ opacity: block }}
        >
          <span className="inline-flex min-h-[44px] items-center rounded-xl bg-[#e11d48]/10 px-4 py-2 text-xs font-semibold text-[#e11d48] tabular-nums">
            {t("kie.visual.blocked")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
