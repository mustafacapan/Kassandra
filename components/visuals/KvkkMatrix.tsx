"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

const CELLS = Array.from({ length: 12 }, (_, i) => ({
  title: `kee.kvkk.p${i + 1}`,
  detail: `kee.kvkk.d${i + 1}`,
}));

export default function KvkkMatrix({ progress }: { progress: number }) {
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
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981]">
            KvkkMatrix
          </p>
          <span className="rounded-full bg-[#E8EDF2] px-3 py-1 text-[11px] font-semibold text-[#1A2834] tabular-nums">
            {t("kee.kvkk.count")} · 2026
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CELLS.map((cell, i) => {
            const o = reduced ? 1 : clamp01((eff - i * 0.05) / 0.3);
            return (
              <motion.div
                key={cell.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                style={{ opacity: Math.max(0.25, o) }}
                title={t(cell.detail)}
                className="group min-h-[44px] cursor-default rounded-xl bg-[#E8EDF2] px-3 py-2.5 transition-[transform,box-shadow] duration-150 ease-out hover:shadow-[0_0_0_1px_rgba(43,83,114,0.25),0_4px_12px_rgba(43,83,114,0.10)] active:scale-[0.96]"
              >
                <p className="text-xs font-semibold leading-snug text-[#1A2834] text-balance">
                  {t(cell.title)}
                </p>
                <p className="mt-0.5 hidden text-[11px] leading-snug text-[#4A5A68] group-hover:block">
                  {t(cell.detail)}
                </p>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[#4A5A68]">
          {t("kee.kvkk.hint")}
        </p>

        <p className="mt-2 border-t border-[rgba(43,83,114,0.10)] pt-3 text-xs italic leading-relaxed text-[#7A8A98]">
          {t("kee.kvkk.caption")}
        </p>
      </div>
    </motion.div>
  );
}
