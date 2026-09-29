"use client";

import { motion } from "framer-motion";
import { ChevronDown, Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  MAX_CPIS,
  chokepointRows,
  templateKey,
  type ChokepointRow,
  type ChokepointTag,
} from "@/components/showcase/data/chokepoints";

function formatSavings(v: number) {
  return `$${(v / 1000).toFixed(1)}K`;
}

function cpisTone(level: ChokepointRow["sla"]["level"]) {
  if (level === "CRITICAL") return "text-[#e11d48]";
  if (level === "MEDIUM") return "text-[#1A2834]";
  return "text-[#7A8A98]";
}

function cpisFill(level: ChokepointRow["sla"]["level"]) {
  if (level === "CRITICAL") return "bg-[#e11d48]";
  if (level === "MEDIUM") return "bg-[#1A2834]";
  return "bg-[#7A8A98]";
}

function slaTone(level: ChokepointRow["sla"]["level"]) {
  if (level === "CRITICAL")
    return "border-[#e11d48]/30 bg-[#e11d48]/10 text-[#e11d48]";
  if (level === "MEDIUM")
    return "border-[#4A5A68]/20 bg-[#4A5A68]/10 text-[#4A5A68]";
  return "border-[#4A5A68]/15 bg-[#4A5A68]/5 text-[#7A8A98]";
}

const TAG_TONE: Record<ChokepointTag, string> = {
  strict: "bg-[#E8EDF2] text-[#4A5A68]",
  alt: "bg-[#e11d48]/10 text-[#e11d48]",
  kev: "bg-[#e11d48]/10 font-bold text-[#e11d48]",
};

export default function RankingTable({
  selectedRank,
  onSelect,
}: {
  selectedRank: string | null;
  onSelect: (rank: string) => void;
}) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  const tagLabel = (tag: ChokepointTag) =>
    t(`platform.kre.table.tag.${tag}`);

  const cols =
    "grid-cols-[44px_minmax(220px,1.5fr)_110px_minmax(120px,1fr)_110px_minmax(120px,1fr)_110px]";

  return (
    <motion.section
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-label={t("platform.kre.title")}
      className="rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
    >
      <div className="flex flex-col gap-3 px-5 pb-4 pt-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold text-[#1A2834]">
            {t("platform.kre.title")}
          </p>
          <span className="rounded-full bg-[#E8EDF2] px-3 py-1 text-[11px] font-semibold tabular-nums text-[#1A2834]">
            {t("platform.kre.table.count")}
          </span>
        </div>
        <div
          aria-disabled="true"
          className="inline-flex min-h-[44px] items-center justify-between gap-3 self-start rounded-xl bg-[#E8EDF2] px-4 py-2.5 md:self-auto"
        >
          <span className="text-sm font-medium text-[#1A2834]">
            {t("platform.kre.table.filter")}
          </span>
          <ChevronDown className="h-4 w-4 text-[#7A8A98]" />
        </div>
      </div>

      <div className="overflow-x-auto px-2 pb-2">
        <div className="min-w-[960px]">
          <div className={`grid ${cols} items-center gap-3 px-3 pb-2`}>
            {[
              t("platform.kre.table.col.rank"),
              t("platform.kre.table.col.node"),
              t("platform.kre.table.col.sla"),
              t("platform.kre.table.col.cpis"),
              t("platform.kre.table.col.paths"),
              t("platform.kre.table.col.savings"),
              t("platform.kre.table.col.action"),
            ].map((h) => (
              <p
                key={h}
                className="text-[10px] font-semibold uppercase tracking-wider text-[#7A8A98]"
              >
                {h}
              </p>
            ))}
          </div>

          {chokepointRows.map((row, i) => {
            const selected = selectedRank === row.rank;
            return (
            <motion.button
              key={row.rank}
              type="button"
              onClick={() => onSelect(row.rank)}
              aria-pressed={selected}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ delay: i * 0.03, duration: 0.4, ease: "easeOut" }}
              className={`group relative grid ${cols} w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition-colors duration-150 hover:bg-[#E8EDF2] ${
                selected ? "bg-[#E8EDF2]" : ""
              } ${
                i < chokepointRows.length - 1 ? "border-b border-black/[0.04]" : ""
              }`}
            >
              {(row.highlighted || selected) && (
                <span
                  aria-hidden
                  className="absolute bottom-2 left-0 top-2 w-1 rounded-full bg-[#10B981] transition-transform duration-200 group-hover:scale-y-110"
                />
              )}

              <span className="font-mono text-xs tabular-nums text-[#7A8A98]">
                {row.rank}
              </span>

              <div className="min-w-0">
                <p className="truncate font-mono text-sm text-[#1A2834]">
                  {row.nodeId}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-[#E8EDF2] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#7A8A98]">
                    {t(`platform.kre.types.${templateKey(row.type)}`)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#4A5A68]">
                    <Shield className="h-3 w-3" />
                    {row.crownJewels} Crown Jewel
                  </span>
                  {row.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-2 py-0.5 text-[10px] ${TAG_TONE[tag]}`}
                    >
                      {tagLabel(tag)}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span
                  className={`inline-block rounded-lg border px-2.5 py-1 text-[11px] font-bold tabular-nums ${slaTone(row.sla.level)}`}
                >
                  {row.sla.level}
                </span>
                <p className="mt-1 text-[11px] tabular-nums text-[#7A8A98]">
                  {row.sla.value}
                  {row.sla.unit}
                </p>
              </div>

              <div>
                <p className={`text-2xl font-semibold tabular-nums ${cpisTone(row.sla.level)}`}>
                  {row.cpis.toFixed(1)}
                </p>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#E8EDF2]">
                  <div
                    className={`h-full rounded-full ${cpisFill(row.sla.level)}`}
                    style={{ width: `${Math.min(100, (row.cpis / MAX_CPIS) * 100)}%` }}
                  />
                </div>
              </div>

              <p className="text-sm tabular-nums text-[#1A2834]">
                {row.pathsCut.toLocaleString("en-US")}{" "}
                <span className="text-[11px] font-normal text-[#7A8A98]">
                  {t("platform.kre.table.pathsUnit")}
                </span>
              </p>

              <div>
                <p className="text-sm font-semibold tabular-nums text-[#10B981]">
                  {formatSavings(row.savings)}
                </p>
                {row.savingsVerified && (
                  <p className="mt-1 text-[11px] font-medium text-[#10B981]">
                    {t("platform.kre.table.verified")}
                  </p>
                )}
              </div>

              <div>
                <span
                  aria-disabled="true"
                  className="inline-block rounded-lg bg-[#E8EDF2] px-4 py-2 text-xs font-semibold text-[#1A2834] transition-colors duration-150 hover:bg-[#1A2834] hover:text-white"
                >
                  {t("platform.kre.table.inspect").replace(" →", "")}{" "}
                  <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </motion.button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
