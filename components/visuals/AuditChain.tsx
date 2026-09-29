"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

const BROKEN_AT = 2;

export default function AuditChain({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);
  const reveal = clamp01(eff / 0.45);
  const snap = clamp01((eff - 0.45) / 0.55);

  const blocks = [0, 1, 2, 3, 4];

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
          {t("kge.visual.chainName")}
        </p>

        <div className="mt-4 flex items-stretch justify-between gap-1">
          {blocks.map((b, i) => {
            const o = reduced ? 1 : clamp01((reveal - i * 0.12) / 0.3);
            const broken = b === BROKEN_AT && snap > 0.5;
            const afterBreak = b > BROKEN_AT && snap > 0.5;
            const shake = broken && !reduced ? { x: [0, -3, 3, -2, 2, 0] } : {};
            return (
              <motion.div
                key={b}
                className="flex flex-1 items-center last:flex-none"
                style={{ opacity: Math.max(0.2, o) }}
                animate={shake}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div
                  className="flex h-16 flex-1 flex-col items-center justify-center rounded-xl px-1"
                  style={{
                    background: broken ? "rgba(225,29,72,0.08)" : "#E8EDF2",
                    boxShadow: broken
                      ? "0 0 0 1px rgba(225,29,72,0.35)"
                      : "0 0 0 1px rgba(43,83,114,0.10)",
                  }}
                >
                  {broken ? (
                    <span className="text-lg font-bold text-[#e11d48]">✕</span>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden opacity={afterBreak ? 0.35 : 1}>
                      <circle cx="10" cy="10" r="8" fill="none" stroke={afterBreak ? "#7A8A98" : "#10B981"} strokeWidth="1.5" />
                      <circle cx="10" cy="10" r="4.5" fill="none" stroke={afterBreak ? "#7A8A98" : "#10B981"} strokeWidth="1.5" />
                      <circle cx="10" cy="10" r="1.5" fill={afterBreak ? "#7A8A98" : "#10B981"} />
                    </svg>
                  )}
                  <span className="mt-1 text-[9px] font-semibold text-[#7A8A98] tabular-nums">
                    {t("kge.visual.block")} {b + 1}
                  </span>
                </div>
                {b < blocks.length - 1 && (
                  <span
                    className="mx-0.5 h-0.5 w-2 rounded-full"
                    style={{ background: afterBreak || (broken && snap > 0.5) ? "#e11d48" : "#10B981", opacity: afterBreak ? 0.4 : 0.8 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        <div
          className="mt-3 flex justify-center"
          style={{
            opacity: snap,
            transform: `translateY(${(1 - snap) * 8}px)`,
          }}
        >
          <span
            className={`inline-flex min-h-[44px] items-center rounded-xl px-4 py-2 text-xs font-semibold tabular-nums ${
              snap > 0.5 ? "bg-[#e11d48]/10 text-[#e11d48]" : "bg-[#10B981]/10 text-[#10B981]"
            }`}
          >
            {snap > 0.5 ? t("kge.visual.chainBroken") : t("kge.visual.chainOk")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
