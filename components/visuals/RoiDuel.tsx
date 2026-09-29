"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

export default function RoiDuel({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);
  const savedW = 12 + eff * 88;
  const costW = Math.max(6, eff * 8);

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
          RoiDuel
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-[13px] font-medium text-[#1A2834]">
                {t("kee.roi.cost")}
              </span>
              <span className="text-sm font-semibold text-[#1A2834] tabular-nums">
                $15K
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[#E8EDF2]">
              <motion.div
                className="h-full rounded-full bg-[#7A8A98]"
                style={{ width: `${costW}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-[13px] font-medium text-[#1A2834]">
                {t("kee.roi.saved")}
              </span>
              <span className="text-sm font-semibold text-[#10B981] tabular-nums">
                $2.41M
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[#E8EDF2]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#2B5372]"
                style={{ width: `${savedW}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        <div className="relative mt-5 border-t border-dashed border-[rgba(43,83,114,0.10)] pt-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex min-h-[44px] items-center rounded-xl bg-[#E8EDF2] px-3 py-2 text-xs font-semibold text-[#10B981] active:scale-[0.96]">
              {t("kee.roi.payback")}
            </span>
            <span className="text-sm font-semibold text-[#10B981] tabular-nums text-balance">
              {t("kee.roi.net")}
            </span>
          </div>
        </div>

        <p className="mt-3 border-t border-[rgba(43,83,114,0.10)] pt-3 text-xs italic leading-relaxed text-[#7A8A98]">
          {t("kee.roi.caption")}
        </p>
      </div>
    </motion.div>
  );
}
