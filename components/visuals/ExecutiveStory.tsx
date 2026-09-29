"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

export default function ExecutiveStory({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);
  const arrow = clamp01(eff / 0.4);
  const card = reduced ? 1 : clamp01((eff - 0.35) / 0.5);

  const nodes = [t("kie.visual.n1"), t("kie.visual.n2"), t("kie.visual.n3")];

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
          ExecutiveStory
        </p>

        <div className="mt-4 grid grid-cols-[1fr_auto_1.4fr] items-center gap-2">
          <div className="space-y-1.5" style={{ opacity: 0.4 }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7A8A98]">
              {t("kie.visual.nodes")}
            </p>
            {nodes.map((n) => (
              <div
                key={n}
                className="rounded-lg bg-[#E8EDF2] px-2 py-1.5 text-[11px] font-medium text-[#4A5A68]"
              >
                {n}
              </div>
            ))}
          </div>

          <div className="flex justify-center" aria-hidden>
            <svg width="28" height="40" viewBox="0 0 28 40" className="overflow-visible">
              <line
                x1="4"
                y1="20"
                x2="24"
                y2="20"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="20"
                strokeDashoffset={20 * (1 - arrow)}
              />
              <path
                d="M18 14 L24 20 L18 26"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                opacity={arrow}
              />
            </svg>
          </div>

          <div
            className="rounded-xl bg-gradient-to-r from-[#2B5372]/[0.06] to-[#10B981]/[0.06] px-4 py-4"
            style={{
              opacity: Math.max(0.15, card),
              transform: `translateY(${(1 - card) * 10}px)`,
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#2B5372]">
              {t("kie.visual.report")}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-[#4A5A68]">
              {t("kie.visual.r1")}
            </p>
            <p className="apple-headline mt-2 text-xl font-semibold leading-snug tracking-tight text-[#10B981] text-balance">
              {t("kie.visual.money")}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-[#4A5A68]">
              {t("kie.visual.r2")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
