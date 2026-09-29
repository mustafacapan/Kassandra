"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

export default function SanitizationFlow({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);

  const layers = [
    {
      title: t("kie.visual.layer1"),
      done: t("kie.visual.l1done"),
      width: "100%",
      tone: "bg-[#e11d48]/10 text-[#e11d48]",
    },
    {
      title: t("kie.visual.layer2"),
      done: t("kie.visual.l2done"),
      width: "76%",
      tone: "bg-[#E8EDF2] text-[#4A5A68]",
    },
    {
      title: t("kie.visual.layer3"),
      done: t("kie.visual.l3done"),
      width: "54%",
      tone: "bg-[#10B981]/10 text-[#10B981]",
    },
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
          SanitizationFlow
        </p>

        <div className="mt-4 flex flex-col items-center gap-2">
          {layers.map((layer, i) => {
            const o = reduced ? 1 : clamp01((eff - i * 0.22) / 0.4);
            return (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                style={{ opacity: Math.max(0.2, o), width: layer.width }}
                className={`min-h-[44px] rounded-xl px-4 py-2.5 text-center ${layer.tone}`}
              >
                <p className="text-xs font-semibold text-balance">{layer.title}</p>
                <p className="mt-0.5 text-[11px] tabular-nums">{layer.done}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
