"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  DollarSign,
  Flame,
  Puzzle,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const BARS = 60;
const P50_POS = "75%";
const VAR_POS = "86.67%";

function barClass(i: number) {
  if (i < 45) return "bg-gradient-to-t from-[#2B5372]/40 to-[#2B5372]/80";
  if (i < 52) return "bg-gradient-to-t from-[#E07A5F]/40 to-[#E07A5F]/80";
  return "bg-gradient-to-t from-[#E11D48]/40 to-[#E11D48]/80";
}

export default function SimulationResultsMid() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  const heights = useMemo(
    () =>
      Array.from({ length: BARS }, (_, i) => {
        const h = 100 * (0.08 + 0.82 * Math.exp(-Math.pow((i - 27) / 13, 2)));
        return Math.max(2, Math.round(h));
      }),
    []
  );

  const fade = (i: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-6%" } as const,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  });

  return (
    <div className="mx-auto mt-12 max-w-7xl rounded-3xl border border-[rgba(43,83,114,0.10)] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
      <motion.div {...fade(0)}>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2B5372]/10">
              <BarChart3 className="h-6 w-6 text-[#2B5372]" aria-hidden />
            </span>
            <span>
              <span className="apple-headline block text-xl font-semibold tracking-tight text-[#1A2834] md:text-2xl">
                {t("platform.simulation.mc.title")}
              </span>
              <span className="mt-1 block text-xs text-[#7A8A98]">
                {t("platform.simulation.mc.sub")}
              </span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {["10K", "50K", "100K", "500K", "1M"].map((r) => (
              <span
                key={r}
                className={`rounded px-2 py-0.5 font-mono text-[10px] tabular-nums ${
                  r === "100K" ? "bg-[#10B981] text-white" : "bg-[#F4F6F8] text-[#7A8A98]"
                }`}
              >
                {r}
              </span>
            ))}
            <span className="rounded bg-[#10B981]/10 px-2 py-0.5 text-[10px] font-semibold text-[#10B981]">
              {t("platform.simulation.mc.confidence")}
            </span>
            <span className="rounded bg-[#E8EDF2] px-2 py-0.5 text-[10px] font-semibold tabular-nums text-[#1A2834]">
              {t("platform.simulation.mc.iterations")}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div {...fade(1)} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2B5372]/10">
            <DollarSign className="h-4 w-4 text-[#2B5372]" aria-hidden />
          </span>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#7A8A98]">
            {t("platform.simulation.mc.kpi.ale.label")}
          </p>
          <p className="mt-1 text-4xl font-semibold tabular-nums text-[#1A2834]">$40.30M</p>
          <p className="mt-1 text-[10px] text-[#7A8A98]">
            {t("platform.simulation.mc.kpi.ale.sub")}
          </p>
          <div className="mt-3 flex h-1 overflow-hidden rounded-full bg-[#F4F6F8]" aria-hidden="true">
            <span className="h-full bg-[#10B981]" style={{ width: "29%" }} />
            <span className="h-full bg-[#2B5372]" style={{ width: "36%" }} />
            <span className="h-full bg-[#E11D48]" style={{ width: "35%" }} />
          </div>
          <p className="mt-1.5 font-mono text-[9px] tabular-nums text-[#7A8A98]">
            P10: $18.34M · P50: $40.89M · P99: $63.31M
          </p>
        </div>

        <div className="rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E11D48]/10">
            <Flame className="h-4 w-4 text-[#E11D48]" aria-hidden />
          </span>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#7A8A98]">
            {t("platform.simulation.mc.kpi.evt.label")}
          </p>
          <p className="mt-1 text-4xl font-semibold tabular-nums text-[#E11D48]">$68.58M</p>
          <p className="mt-1 text-[10px] text-[#7A8A98]">
            {t("platform.simulation.mc.kpi.evt.sub")}
          </p>
          <p className="mt-2 font-mono text-xs tabular-nums text-[#7A8A98]">
            {t("platform.simulation.mc.kpi.evt.tvar")}{" "}
            <span className="rounded bg-[#E8EDF2] px-1.5 py-0.5 text-[10px]">
              {t("platform.simulation.mc.kpi.evt.chip")}
            </span>
          </p>
        </div>

        <div className="rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E07A5F]/10">
            <span className="text-base font-bold text-[#E07A5F]" aria-hidden>%</span>
          </span>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#7A8A98]">
            {t("platform.simulation.mc.kpi.prob.label")}
          </p>
          <p className="mt-1 text-4xl font-semibold tabular-nums text-[#E07A5F]">%96.0</p>
          <p className="mt-1 text-[10px] text-[#7A8A98]">
            {t("platform.simulation.mc.kpi.prob.sub")}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-1">
            {[">$1M", ">$5M", ">$10M"].map((b) => (
              <div key={b} className="rounded bg-[#F4F6F8] px-2 py-1 text-center">
                <p className="text-xs font-semibold tabular-nums text-[#1A2834]">%96</p>
                <p className="text-[9px] tabular-nums text-[#7A8A98]">{b}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10B981]/10">
            <Sparkles className="h-4 w-4 text-[#10B981]" aria-hidden />
          </span>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#7A8A98]">
            {t("platform.simulation.mc.kpi.save.label")}
          </p>
          <p className="mt-1 text-4xl font-semibold tabular-nums text-[#10B981]">$33.63M</p>
          <p className="mt-1 text-[10px] text-[#7A8A98]">
            {t("platform.simulation.mc.kpi.save.sub")}
          </p>
          <p className="mt-2 font-mono text-xs tabular-nums text-[#7A8A98]">
            {t("platform.simulation.mc.kpi.save.ideal")}{" "}
            <span className="rounded bg-[#10B981]/10 px-1.5 py-0.5 text-[10px]">
              {t("platform.simulation.mc.kpi.save.chip")}
            </span>
          </p>
        </div>
      </motion.div>

      <motion.div {...fade(2)} className="mt-6 rounded-2xl border border-[rgba(43,83,114,0.10)] bg-[#F4F6F8] p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A2834]">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2B5372]/10">
              <Puzzle className="h-4 w-4 text-[#2B5372]" aria-hidden />
            </span>
            {t("platform.simulation.mc.fit.title")}
          </p>
          <p className="text-[10px] text-[#7A8A98]">{t("platform.simulation.mc.fit.sub")}</p>
          <span className="w-fit rounded bg-[#10B981]/10 px-2 py-0.5 text-[10px] font-semibold text-[#10B981]">
            {t("platform.simulation.mc.fit.chip")}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { k: "c1", tone: "text-[#E11D48]", chip: "WORST-CASE", chipTone: "bg-[#E11D48]/10 text-[#E11D48]", value: "$41.08M" },
            { k: "c2", tone: "text-[#2B5372]", chip: t("platform.simulation.mc.fit.c2chip"), chipTone: "bg-[#10B981]/10 text-[#10B981]", value: "$40.30M" },
            { k: "c3", tone: "text-[#E11D48]", chip: t("platform.simulation.mc.fit.c3chip"), chipTone: "bg-[#E11D48]/10 text-[#E11D48]", value: "$68.58M" },
          ].map((c) => (
            <div key={c.k} className="rounded-xl border border-[rgba(43,83,114,0.10)] bg-white p-4">
              <p className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase text-[#7A8A98]">
                {t(`platform.simulation.mc.fit.${c.k}.title`)}
                <span className={`rounded px-1.5 py-0.5 text-[9px] ${c.chipTone}`}>
                  {c.k === "c1" ? "WORST-CASE" : c.chip}
                </span>
              </p>
              <p className={`mt-2 text-2xl font-semibold tabular-nums ${c.tone}`}>{c.value}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#4A5A68]">
                {t(`platform.simulation.mc.fit.${c.k}.body`)}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fade(3)} className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-black/[0.06] bg-gradient-to-b from-white to-[#F4F6F8]/50 p-5 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1A2834]">
                {t("platform.simulation.mc.curve.title")}
              </p>
              <p className="mt-1 text-[10px] text-[#7A8A98]">
                {t("platform.simulation.mc.curve.sub")}
              </p>
            </div>
            <div className="flex gap-3 text-[10px] font-semibold tabular-nums">
              <span className="flex items-center gap-1.5 text-[#4A5A68]">
                <span className="h-2 w-2 rounded-full bg-[#2B5372]" aria-hidden />
                {t("platform.simulation.mc.curve.p50")}
              </span>
              <span className="flex items-center gap-1.5 text-[#E11D48]">
                <span className="h-2 w-2 rounded-full bg-[#E11D48]" aria-hidden />
                {t("platform.simulation.mc.curve.var")}
              </span>
            </div>
          </div>
          <div className="relative mt-4 px-2 pt-10">
            <div className="flex h-64 w-full items-end gap-[2px] md:h-72" aria-hidden="true">
              {heights.map((h, i) =>
                reduced ? (
                  <span
                    key={i}
                    className={`flex-1 rounded-t-sm ${barClass(i)}`}
                    style={{ height: `${h}%` }}
                  />
                ) : (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true, margin: "-6%" }}
                    transition={{ delay: i * 0.008, duration: 0.4, ease: "easeOut" }}
                    className={`flex-1 origin-bottom rounded-t-sm ${barClass(i)}`}
                    style={{ height: `${h}%` }}
                  />
                )
              )}
              <span
                className="absolute inset-y-10 border-l border-dashed border-[#1A2834]/40"
                style={{ left: P50_POS }}
              />
              <span
                className="absolute inset-y-10 border-l border-dashed border-[#E11D48]"
                style={{ left: VAR_POS }}
              />
            </div>
            <span className="absolute top-0 -translate-x-1/2 rounded-full border border-[#1A2834]/20 bg-white px-2 py-0.5 font-mono text-[10px] tabular-nums text-[#1A2834]" style={{ left: P50_POS }}>
              P50 · $40.89M
            </span>
            <span className="absolute top-0 -translate-x-1/2 rounded-full bg-[#E11D48] px-2 py-0.5 font-mono text-[10px] tabular-nums text-white" style={{ left: VAR_POS }}>
              VaR 99% · $68.58M
            </span>
            <div className="mt-4 flex justify-between font-mono text-[10px] tabular-nums">
              <span className="text-[#7A8A98]">$18.34M</span>
              <span className="text-[#7A8A98]">$40.89M (P50)</span>
              <span className="font-semibold text-[#E11D48]">$68.58M+ (VaR 99%)</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#1A2834]">
            {t("platform.simulation.mc.cost.title")}
          </p>
          <div className="mt-4 space-y-4">
            {[
              { k: "i1", amount: "$38.92M", pct: "(%96.6)", w: 96, fill: "bg-[#10B981]" },
              { k: "i2", amount: "$1.12M", pct: "(%2.8)", w: 2.8, fill: "bg-[#2B5372]" },
              { k: "i3", amount: "$158.1K", pct: "(%0.4)", w: 2, fill: "bg-[#E11D48]" },
              { k: "i4", amount: "$113.0K", pct: "(%0.3)", w: 2, fill: "bg-[#E07A5F]" },
            ].map((c) => (
              <div key={c.k}>
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <span className="text-xs text-[#4A5A68]">{t(`platform.simulation.mc.cost.${c.k}`)}</span>
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-[#1A2834]">
                    {c.amount} <span className="text-[10px] font-normal text-[#7A8A98]">{c.pct}</span>
                  </span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-[#F4F6F8]">
                  <div className={`h-full rounded-full ${c.fill}`} style={{ width: `${c.w}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-[#10B981]/20 bg-[#10B981]/[0.04] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#10B981]">
              {t("platform.simulation.mc.kvkk.title")}
            </p>
            <p className="mt-2 text-sm font-semibold tabular-nums text-[#1A2834]">
              <span className="font-normal text-[#4A5A68]">{t("platform.simulation.mc.kvkk.range")}: </span>
              256K TL — 17.09M TL
            </p>
            <p className="mt-1 text-sm font-semibold tabular-nums text-[#E11D48]">
              <span className="font-normal text-[#4A5A68]">{t("platform.simulation.mc.kvkk.exposure")}: </span>
              7.31M TL ($158.1K)
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[t("platform.simulation.mc.kvkk.verbis"), t("platform.simulation.mc.kvkk.crossborder"), t("platform.simulation.mc.kvkk.repeat")].map((chip) => (
                <span key={chip} className="rounded-full bg-[#E8EDF2] px-2.5 py-0.5 text-[10px] font-semibold text-[#1A2834]">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
