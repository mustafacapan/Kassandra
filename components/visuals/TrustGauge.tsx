"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

const R = 54;
const C = 2 * Math.PI * R;

export default function TrustGauge({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);

  const value = Math.round(eff * 77);
  const freshW = eff * 95;
  const confW = eff * 82;
  const tone = value >= 80 ? "#10B981" : value >= 65 ? "#2B5372" : "#e11d48";

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
          {t("kge.visual.gaugeName")}
        </p>

        <div className="mt-3 flex justify-center">
          <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden>
            <circle cx="75" cy="75" r={R} fill="none" stroke="#E8EDF2" strokeWidth="12" />
            <circle
              cx="75"
              cy="75"
              r={R}
              fill="none"
              stroke={tone}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - value / 100)}
              transform="rotate(-90 75 75)"
            />
            <circle
              cx="75"
              cy="75"
              r={R}
              fill="none"
              stroke="#e11d48"
              strokeWidth="14"
              strokeDasharray={`${C * 0.025} ${C * 0.975}`}
              strokeDashoffset={-(C * 0.7875)}
              transform="rotate(-90 75 75)"
              opacity={0.9}
            />
            <text
              x="75"
              y="82"
              textAnchor="middle"
              fontSize="30"
              fontWeight="700"
              fill="#1A2834"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              %{value}
            </text>
          </svg>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-[13px] font-medium text-[#1A2834]">
                {t("kge.visual.freshness")}
              </span>
              <span className="text-xs text-[#7A8A98] tabular-nums">%95</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#E8EDF2]">
              <div className="h-full rounded-full bg-[#10B981]" style={{ width: `${Math.min(95, freshW)}%` }} />
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-[13px] font-medium text-[#1A2834]">
                {t("kge.visual.confidence")}
              </span>
              <span className="text-xs text-[#7A8A98] tabular-nums">%82</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#E8EDF2]">
              <div className="h-full rounded-full bg-[#2B5372]" style={{ width: `${Math.min(82, confW)}%` }} />
            </div>
          </div>
        </div>

        <p className="mt-3 border-t border-[rgba(43,83,114,0.10)] pt-3 text-xs leading-relaxed text-[#4A5A68] tabular-nums">
          {t("kge.visual.gauge.threshold")}
        </p>
      </div>
    </motion.div>
  );
}
