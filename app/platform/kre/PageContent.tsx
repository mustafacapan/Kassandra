"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  chokepointDetails,
  chokepointRows,
  severityCounts,
  tenantGrade,
} from "@/components/showcase/data/chokepoints";
import DetailPanel from "@/components/showcase/DetailPanel";
import RankingTable from "@/components/showcase/RankingTable";

function KreHero() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-6xl px-6 pt-24 md:pt-32"
    >
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
          {t("platform.kre.eyebrow")}
        </p>
        <h1 className="apple-headline text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-5xl">
          {t("platform.kre.title")}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4A5A68]">
          {t("platform.kre.subtitle")}
        </p>
      </div>
    </motion.div>
  );
}

function GradeCard() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  const severities = [
    {
      value: severityCounts.crit,
      label: t("platform.kre.severity.crit"),
      tone: "bg-[#e11d48]/10 text-[#e11d48]",
    },
    {
      value: severityCounts.high,
      label: t("platform.kre.severity.high"),
      tone: "bg-[#E8EDF2] text-[#7A8A98]",
    },
    {
      value: severityCounts.med,
      label: t("platform.kre.severity.med"),
      tone: "bg-[#E8EDF2] text-[#1A2834]",
    },
    {
      value: severityCounts.low,
      label: t("platform.kre.severity.low"),
      tone: "bg-[#10B981]/10 text-[#10B981]",
    },
  ];

  return (
    <div className="card-accent-top relative rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]">
      <div className="rounded-xl bg-white px-5 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="apple-headline text-6xl font-semibold tabular-nums tracking-tight text-[#1A2834]">
              {tenantGrade.toFixed(1)}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7A8A98]">
              {t("platform.kre.grade.label")}
            </p>
          </div>
          <span className="rounded-xl border border-[#e11d48]/30 bg-[#e11d48]/10 px-4 py-2 text-lg font-bold tabular-nums text-[#e11d48]">
            {t("platform.kre.grade.badge")}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {severities.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              className={`rounded-xl p-4 text-center ${s.tone}`}
            >
              <p className="text-3xl font-semibold tabular-nums">{s.value}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DemoBadge() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-6">
      <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(43,83,114,0.10)] bg-[#E8EDF2] px-3 py-1.5 text-xs text-[#7A8A98]">
        <Lock className="h-3.5 w-3.5" />
        {t("platform.kre.demoBadge")}
      </span>
    </div>
  );
}

function KreDashboard() {
  const [selectedRank, setSelectedRank] = useState<string | null>(null);
  const selectedRow =
    chokepointRows.find((r) => r.rank === selectedRank) ?? null;

  return (
    <main className="min-h-screen bg-[#F4F6F8] text-[#1A2834]">
      <KreHero />
      <DemoBadge />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <GradeCard />
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <RankingTable selectedRank={selectedRank} onSelect={setSelectedRank} />
      </div>
      <DetailPanel
        row={selectedRow}
        detail={selectedRow ? chokepointDetails[selectedRow.rank] : null}
        onClose={() => setSelectedRank(null)}
      />
    </main>
  );
}

export default function KrePlatformPage() {
  return (
    <I18nProvider>
      <KreDashboard />
    </I18nProvider>
  );
}
