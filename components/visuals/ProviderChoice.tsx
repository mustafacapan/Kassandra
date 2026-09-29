"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

export default function ProviderChoice({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);

  const cols = [
    {
      title: t("kie.visual.localAi"),
      sub: t("kie.visual.localSub"),
      badge: t("kie.visual.default"),
      dot: "bg-[#10B981]",
      cardTone: "bg-gradient-to-r from-[#2B5372]/[0.06] to-[#10B981]/[0.06]",
      badgeTone: "bg-[#10B981] text-white",
    },
    {
      title: t("kie.visual.cloudAi"),
      sub: t("kie.visual.cloudSub"),
      badge: t("kie.visual.ready"),
      dot: "bg-[#7A8A98]",
      cardTone: "bg-[#E8EDF2]",
      badgeTone: "bg-[#E8EDF2] text-[#1A2834]",
    },
    {
      title: t("kie.visual.offline"),
      sub: t("kie.visual.offSub"),
      badge: t("kie.visual.works"),
      dot: "bg-[#10B981]",
      cardTone: "bg-[#E8EDF2]",
      badgeTone: "bg-[#10B981]/10 text-[#10B981]",
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
          ProviderChoice
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {cols.map((col, i) => {
            const o = reduced ? 1 : clamp01((eff - i * 0.18) / 0.4);
            return (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                style={{ opacity: Math.max(0.2, o) }}
                className={`flex min-h-[120px] flex-col items-center rounded-xl px-2 py-3 text-center ${col.cardTone}`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${col.dot}`} />
                <p className="mt-2 text-xs font-semibold text-[#1A2834] text-balance">
                  {col.title}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-[#4A5A68] text-balance">
                  {col.sub}
                </p>
                <span
                  className={`mt-auto rounded-full px-2.5 py-1 text-[10px] font-semibold tabular-nums ${col.badgeTone}`}
                >
                  {col.badge}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
