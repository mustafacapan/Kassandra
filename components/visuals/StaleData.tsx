"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

export default function StaleData({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);
  const staleO = 1 - clamp01((eff - 0.4) / 0.1);
  const freshO = clamp01((eff - 0.6) / 0.1);
  const fresh = eff * eff * (3 - 2 * eff);
  const fill = 0.3 + 0.7 * eff;

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
          {t("kge.visual.staleName")}
        </p>

        <div
          className="mt-3 flex justify-center"
          style={{ opacity: staleO, visibility: staleO <= 0 ? "hidden" : "visible" }}
        >
          <span className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#e11d48]/10 px-4 py-2 text-xs font-semibold text-[#e11d48] tabular-nums">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <circle cx="7" cy="7" r="6" fill="none" stroke="#e11d48" strokeWidth="1.5" />
              <line x1="7" y1="4" x2="7" y2="7" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="7" y1="7" x2="9.5" y2="8.5" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {t("kge.visual.staleBadge")}
          </span>
        </div>
        <div
          className="mt-2 flex justify-center"
          style={{ opacity: freshO, visibility: freshO <= 0 ? "hidden" : "visible" }}
        >
          <span className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#10B981]/10 px-4 py-2 text-xs font-semibold text-[#10B981] tabular-nums">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <circle cx="7" cy="7" r="6" fill="none" stroke="#10B981" strokeWidth="1.5" />
              <path d="M4.5 7 L6.2 8.7 L9.5 5.3" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {t("kge.visual.freshBadge")}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-xl px-4 py-3"
              style={{
                background: fresh > 0.5 ? "#fff" : "#E8EDF2",
                boxShadow: "0 0 0 1px rgba(43,83,114,0.10)",
                opacity: 0.45 + fresh * 0.55,
            }}
            >
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: `${(82 - i * 14) * fill}%`,
                  background: fresh > 0.5 ? "#10B981" : "#7A8A98",
                  opacity: 0.35 + fresh * 0.65,
                }}
              />
              <div
                className="mt-2 h-2 rounded-full bg-[#7A8A98]"
                style={{ width: `${(58 - i * 8) * fill}%`, opacity: 0.25 + fresh * 0.4 }}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
