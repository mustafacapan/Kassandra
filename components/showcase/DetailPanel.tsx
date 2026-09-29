"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  GitBranch,
  Globe,
  Loader2,
  Shield,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type {
  ChokepointDetail,
  ChokepointRow,
} from "@/components/showcase/data/chokepoints";

function fmtM(v: number) {
  return `+$${v.toFixed(2)}M`;
}

function fmtM1(v: number) {
  return `+$${v.toFixed(1)}M`;
}

function fmtMixed(amountM: number) {
  if (amountM >= 1) return `+$${amountM.toFixed(2)}M`;
  return `+$${(amountM * 1000).toFixed(1)}K`;
}

type SimulationState = "idle" | "running" | "applied";

const RISK_FACTOR = 43.2 / 140.3;
const MC_FACTOR = 17 / 12;

function q1(n: number) {
  return Math.round(n * 10) / 10;
}

function q2(n: number) {
  return Math.round(n * 100) / 100;
}

function SectionTitle({ dot, children }: { dot: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1A2834]">
      <span className="h-2 w-2 rounded-full" style={{ background: dot }} aria-hidden />
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div
      aria-hidden
      className="my-8 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent"
    />
  );
}

function FadeIn({ delay, children }: { delay: number; children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function MetricCard({
  icon: Icon,
  iconTone,
  label,
  value,
  tone,
  extra,
  sub,
  glow,
  valueClass,
  pulse,
}: {
  icon: typeof Activity;
  iconTone: string;
  label: string;
  value: string;
  tone: string;
  extra?: React.ReactNode;
  sub?: string;
  glow?: boolean;
  valueClass?: string;
  pulse?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <div
      className={`rounded-xl bg-gradient-to-br from-[#E8EDF2] to-white p-5 shadow-[0_0_0_1px_rgba(43,83,114,0.10)] transition-shadow duration-300 ${
        glow ? "shadow-[0_0_0_1px_rgba(43,83,114,0.10),0_0_24px_rgba(16,185,129,0.15)]" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] uppercase tracking-wider text-[#7A8A98]">
          {label}
        </p>
        <Icon className={`h-4 w-4 ${iconTone}`} aria-hidden />
      </div>
      <motion.p
        animate={pulse && !reduced ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`mt-2 text-3xl font-semibold tabular-nums ${tone} ${valueClass ?? ""}`}
      >
        {value}{" "}
        {extra}
      </motion.p>
      {sub && <p className="mt-1 text-xs text-[#7A8A98]">{sub}</p>}
    </div>
  );
}

function FlowConnector({ active }: { active: boolean }) {
  const style = {
    backgroundImage:
      "repeating-linear-gradient(90deg, #7A8A98 0 4px, transparent 4px 8px)",
    backgroundSize: "8px 2px",
    backgroundRepeat: "repeat-x",
    backgroundPosition: "0 center",
  } as const;
  if (!active) {
    return <div aria-hidden className="h-[2px] flex-1" style={style} />;
  }
  return (
    <motion.div
      aria-hidden
      className="h-[2px] flex-1"
      style={style}
      initial={{ backgroundPositionX: "0px" }}
      animate={{ backgroundPositionX: "-8px" }}
      transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default function DetailPanel({
  row,
  detail,
  onClose,
}: {
  row: ChokepointRow | null;
  detail: ChokepointDetail | null;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const open = row !== null && detail !== null;
  const flow = mounted && !reduced;

  const [sim, setSim] = useState<SimulationState>("idle");
  const [bannerOpen, setBannerOpen] = useState(true);
  const [simT, setSimT] = useState(0);
  const simTRef = useRef(0);

  useEffect(() => {
    setSim("idle");
    setBannerOpen(true);
    simTRef.current = 0;
    setSimT(0);
  }, [row?.rank]);

  useEffect(() => {
    if (!open) return;
    if (sim === "running") {
      const c = animate(simTRef.current, 1, {
        duration: reduced ? 0.3 : 3,
        ease: "easeOut",
        onUpdate: (v) => {
          simTRef.current = v;
          setSimT(v);
        },
        onComplete: () => setSim("applied"),
      });
      return () => c.stop();
    }
    if (sim === "idle" && simTRef.current > 0) {
      const c = animate(simTRef.current, 0, {
        duration: reduced ? 0.3 : 1.5,
        ease: "easeOut",
        onUpdate: (v) => {
          simTRef.current = v;
          setSimT(v);
        },
      });
      return () => c.stop();
    }
  }, [sim, open, reduced]);

  const handleApply = () => {
    setBannerOpen(true);
    setSim("running");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const critCount =
    detail?.vulnerabilities.filter((v) => v.severity === "CRITICAL").length ?? 0;
  const highCount =
    detail?.vulnerabilities.filter((v) => v.severity === "HIGH").length ?? 0;
  const medCount =
    detail?.vulnerabilities.filter((v) => v.severity === "MEDIUM").length ?? 0;

  function sevTone(sev: string) {
    if (sev === "CRITICAL") return "bg-[#e11d48]/10 text-[#e11d48]";
    if (sev === "MEDIUM") return "bg-[#2B5372]/10 text-[#2B5372]";
    return "bg-[#4A5A68]/10 text-[#4A5A68]";
  }

  function sevStrip(sev: string) {
    if (sev === "CRITICAL") return "bg-[#e11d48]";
    if (sev === "MEDIUM") return "bg-[#2B5372]";
    return "bg-[#4A5A68]";
  }

  const bandMax = detail ? detail.monteCarlo.p95 * MC_FACTOR * 1.15 : 1;
  const bandPos = (v: number) => `${Math.min(100, (v / bandMax) * 100)}%`;

  const riskFrom = detail?.metrics.cpis ?? 0;
  const riskNow = riskFrom + (q1(riskFrom * RISK_FACTOR) - riskFrom) * simT;
  const riskTone =
    simT < 0.02
      ? "text-[#e11d48]"
      : simT < 0.5
        ? "text-[#e11d48]"
        : simT < 0.85
          ? "text-[#4A5A68]"
          : "text-[#10B981]";
  const simActive = sim !== "idle" || simT > 0;
  const colorDur = reduced ? "duration-300" : "duration-1000";

  const saveTo = detail?.metrics.savingsM ?? 0;
  const saveNow = saveTo * simT;
  const saveDisplay = sim === "running" ? saveNow : saveTo;
  const saveSub =
    sim === "running"
      ? t("platform.kre.detail.metrics.savingsCalculating")
      : sim === "applied"
        ? t("platform.kre.table.verified")
        : t("platform.kre.detail.metrics.savingsPotential");

  const mc = (idle: number) => q2(idle + (q2(idle * MC_FACTOR) - idle) * simT);
  const mcP10 = detail ? mc(detail.monteCarlo.p10) : 0;
  const mcP50 = detail ? mc(detail.monteCarlo.p50) : 0;
  const mcP95 = detail ? mc(detail.monteCarlo.p95) : 0;
  const remediated = sim === "applied";

  return (
    <AnimatePresence>
      {open && row && detail && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
            className="fixed inset-0 z-40 bg-[#1A2834]/20"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={row.nodeId}
            initial={reduced ? { opacity: 0 } : { x: "100%", opacity: 1 }}
            animate={reduced ? { opacity: 1 } : { x: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { x: "100%", opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col border-l border-[rgba(43,83,114,0.10)] bg-white shadow-[-24px_0_60px_rgba(0,0,0,0.08)] md:w-[720px]"
          >
            <div className="sticky top-0 border-b border-black/[0.04] bg-white/80 px-6 py-5 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 truncate font-mono text-lg font-semibold text-[#1A2834]">
                    {row.sla.level === "CRITICAL" && (
                      <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
                        {flow && (
                          <motion.span
                            className="absolute inset-0 rounded-full bg-[#e11d48]"
                            animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                        <span className="relative h-2.5 w-2.5 rounded-full bg-[#e11d48]" />
                      </span>
                    )}
                    <span className="truncate">{row.nodeId}</span>
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-[#E8EDF2] px-2.5 py-1 text-[11px] font-bold tabular-nums text-[#1A2834]">
                      RANK #{row.rank}
                    </span>
                    <span className="rounded-lg border border-[#e11d48]/30 bg-[#e11d48]/10 px-2.5 py-1 text-[11px] font-bold text-[#e11d48]">
                      {row.sla.level} {t("platform.kre.detail.severityWord")}
                    </span>
                    {row.tags.includes("alt") && (
                      <span className="rounded-lg border border-[#e11d48]/30 px-2.5 py-1 text-[11px] text-[#e11d48]">
                        {t("platform.kre.table.tag.alt")}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t("platform.kre.detail.close")}
                  className="shrink-0 rounded-lg p-2 text-[#4A5A68] transition-colors duration-150 hover:bg-[#E8EDF2] active:scale-[0.96]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {sim === "applied" && bannerOpen && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: reduced ? 0.2 : 0.3, ease: "easeOut" }}
                className="border-b border-[#10B981]/20 bg-gradient-to-r from-[#10B981]/10 via-[#10B981]/5 to-transparent px-6 py-3"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#10B981]" aria-hidden />
                  <p className="text-sm font-semibold text-[#10B981]">
                    {t("platform.kre.sim.successBanner")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setBannerOpen(false)}
                    aria-label={t("platform.kre.detail.close")}
                    className="ml-auto shrink-0 rounded-lg p-1.5 text-[#10B981] transition-colors duration-150 hover:bg-[#10B981]/10 active:scale-[0.96]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <FadeIn delay={0.1}>
              <div className="relative mb-6 overflow-hidden rounded-2xl border border-[rgba(43,83,114,0.10)] bg-gradient-to-br from-[#10B981]/[0.10] via-[#2B5372]/[0.04] to-transparent p-6 md:p-8">
                <TrendingUp
                  aria-hidden
                  className="absolute right-6 top-6 h-6 w-6 text-[#10B981]"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4A5A68]">
                  {t("platform.kre.detail.hero.label")}
                </p>
                <p
                  className="apple-headline mt-2 text-7xl font-semibold tabular-nums tracking-tight text-[#10B981]"
                  style={{ textShadow: "0 2px 24px rgba(16,185,129,0.25)" }}
                >
                  {fmtM(detail.metrics.savingsM)}
                </p>
                <div className="my-3 h-px bg-gradient-to-r from-[#10B981]/20 via-black/[0.06] to-transparent" aria-hidden />
                <p className="text-sm text-[#4A5A68]">
                  {detail.metrics.crownJewels} Crown Jewel ·{" "}
                  {detail.metrics.pathsCut.toLocaleString("en-US")}{" "}
                  {t("platform.kre.detail.hero.summaryPaths")}
                </p>
              </div>
              </FadeIn>

              <FadeIn delay={0.15}>
              <div
                className="mb-2 rounded-2xl border border-[rgba(43,83,114,0.10)] px-4 py-5"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex w-16 shrink-0 flex-col items-center gap-1.5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#7A8A98] bg-[#E8EDF2]">
                      <Globe className="h-5 w-5 text-[#4A5A68]" aria-hidden />
                    </span>
                    <span className="text-[10px] font-semibold text-[#4A5A68]">
                      {t("platform.kre.detail.path.internet")}
                    </span>
                  </div>

                  <FlowConnector active={flow} />

                  <div className="flex w-28 shrink-0 flex-col items-center gap-1.5">
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#e11d48] bg-[#e11d48]/10">
                      {flow && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 rounded-full border-2 border-[#e11d48]"
                          animate={{ scale: [1, 1.35], opacity: [0.8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                      <AlertTriangle className="h-5 w-5 text-[#e11d48]" aria-hidden />
                    </span>
                    <span className="max-w-full truncate font-mono text-[10px] text-[#1A2834]">
                      {row.nodeId}
                    </span>
                  </div>

                  <FlowConnector active={flow} />

                  <div className="flex w-16 shrink-0 flex-col items-center gap-1.5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#10B981] bg-[#10B981]/10">
                      <Shield className="h-5 w-5 text-[#10B981]" aria-hidden />
                    </span>
                    <span className="text-center text-[10px] font-semibold tabular-nums text-[#10B981]">
                      {detail.metrics.crownJewels} Crown Jewel
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-col items-center gap-1">
                  <span className="text-lg font-bold leading-none text-[#e11d48]" aria-hidden>
                    ↓
                  </span>
                  <p className="text-center text-[11px] font-semibold tabular-nums text-[#e11d48]">
                    {detail.metrics.pathsCut.toLocaleString("en-US")}{" "}
                    {t("platform.kre.detail.path.cutLabel")}
                  </p>
                </div>
              </div>
              </FadeIn>

              <FadeIn delay={0.2}>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <MetricCard
                  icon={GitBranch}
                  iconTone="text-[#1A2834]"
                  label={t("platform.kre.detail.metrics.paths")}
                  value={detail.metrics.pathsCut.toLocaleString("en-US")}
                  tone="text-[#1A2834]"
                  sub={t("platform.kre.detail.metrics.pathsSub")}
                />
                <MetricCard
                  icon={Activity}
                  iconTone={simActive ? "text-[#10B981]" : "text-[#e11d48]"}
                  label={t("platform.kre.detail.metrics.cpis")}
                  value={riskNow.toFixed(1)}
                  tone={riskTone}
                  glow={simActive}
                  pulse={sim === "applied"}
                  valueClass={`transition-colors ${colorDur}`}
                  extra={
                    <>
                      <span className="rounded-md bg-[#E8EDF2] px-2 py-0.5 align-middle text-[11px] font-semibold text-[#7A8A98]">
                        {detail.metrics.cpisBase} {t("platform.kre.detail.metrics.base")}
                      </span>
                      {sim === "applied" && (
                        <span className="ml-1 rounded-md bg-[#10B981]/10 px-2 py-0.5 align-middle text-[11px] font-semibold text-[#10B981]">
                          ↓ {t("platform.kre.sim.riskReduction")}
                        </span>
                      )}
                    </>
                  }
                />
                <MetricCard
                  icon={Shield}
                  iconTone="text-[#1A2834]"
                  label={t("platform.kre.detail.metrics.crowns")}
                  value={String(detail.metrics.crownJewels)}
                  tone="text-[#1A2834]"
                  sub={t("platform.kre.detail.metrics.crownsSub")}
                />
                <MetricCard
                  icon={DollarSign}
                  iconTone="text-[#10B981]"
                  label={t("platform.kre.detail.metrics.savings")}
                  value={fmtM(saveDisplay)}
                  tone="text-[#10B981]"
                  glow={simActive}
                  pulse={sim === "applied"}
                  valueClass={`transition-colors ${colorDur}`}
                  sub={saveSub}
                />
              </div>
              </FadeIn>

              <Divider />

              <FadeIn delay={0.25}>
              <div>
                <SectionTitle dot="#2B5372">
                  {t("platform.kre.detail.mc.title")}{" "}
                  <span className="rounded-full bg-[#E8EDF2] px-3 py-1 text-[11px] font-semibold normal-case tabular-nums tracking-normal text-[#1A2834]">
                    {t("platform.kre.detail.mc.iterations")}
                  </span>
                </SectionTitle>
                <p className="mt-2 text-sm leading-relaxed text-[#4A5A68]">
                  {t("platform.kre.detail.mc.desc")}
                </p>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {[
                    {
                      label: t("platform.kre.detail.mc.p10"),
                      value: fmtM(mcP10),
                      tone: "bg-[#E8EDF2] text-[#4A5A68]",
                      strip: "bg-[#7A8A98]",
                      badge: null as string | null,
                      Icon: TrendingDown,
                    },
                    {
                      label: t("platform.kre.detail.mc.p50"),
                      value: fmtM(mcP50),
                      tone: "bg-[#10B981]/10 text-[#10B981]",
                      strip: "bg-[#10B981]",
                      badge: t("platform.kre.detail.mc.median"),
                      Icon: TrendingUp,
                    },
                    {
                      label: t("platform.kre.detail.mc.p95"),
                      value: fmtM(mcP95),
                      tone: "bg-[#e11d48]/10 text-[#e11d48]",
                      strip: "bg-[#e11d48]",
                      badge: t("platform.kre.detail.mc.conf95"),
                      Icon: TrendingUp,
                    },
                  ].map((c) => (
                    <div key={c.label} className={`rounded-xl p-4 ${c.tone}`}>
                      <span className={`mb-2 block h-1 rounded-full ${c.strip}`} aria-hidden />
                      <p className="text-[11px] font-semibold uppercase tracking-wider">
                        {c.label}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-2xl font-semibold tabular-nums">
                        {c.value}
                        <c.Icon className="h-4 w-4" aria-hidden />
                      </p>
                      {c.badge && (
                        <span className="mt-2 inline-block rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-semibold">
                          {c.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="relative mt-6 h-2 rounded-full bg-[#E8EDF2]" aria-hidden>
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#7A8A98] via-[#10B981] to-[#e11d48]"
                    style={{ width: bandPos(detail.monteCarlo.p95) }}
                    animate={{ width: bandPos(mcP95) }}
                    transition={{ duration: reduced ? 0.3 : 1.2, ease: "easeOut" }}
                  />
                  {[mcP10, mcP50, mcP95].map((v, i) => {
                    const idle = [
                      detail.monteCarlo.p10,
                      detail.monteCarlo.p50,
                      detail.monteCarlo.p95,
                    ][i];
                    return (
                      <motion.span
                        key={idle}
                        className="absolute top-1/2 h-4 w-4 rounded-full border-2 border-white bg-[#1A2834] shadow-[0_0_0_1px_rgba(43,83,114,0.10)]"
                        style={{ left: bandPos(idle), x: "-50%", y: "-50%" }}
                        animate={{ left: bandPos(v) }}
                        transition={{ duration: reduced ? 0.3 : 1.2, ease: "easeOut" }}
                      />
                    );
                  })}
                </div>
                <div className="relative mt-1 h-4 text-[10px] tabular-nums text-[#7A8A98]" aria-hidden>
                  {[mcP10, mcP50, mcP95].map((v, i) => {
                    const idle = [
                      detail.monteCarlo.p10,
                      detail.monteCarlo.p50,
                      detail.monteCarlo.p95,
                    ][i];
                    return (
                      <motion.span
                        key={idle}
                        className="absolute"
                        style={{ left: bandPos(idle), x: "-50%" }}
                        animate={{ left: bandPos(v) }}
                        transition={{ duration: reduced ? 0.3 : 1.2, ease: "easeOut" }}
                      >
                        {fmtM(v)}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
              </FadeIn>

              <Divider />

              <FadeIn delay={0.3}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <SectionTitle dot="#10B981">
                    {t("platform.kre.detail.cost.title")}
                  </SectionTitle>
                  <div className="mt-3 space-y-1">
                    {detail.costBreakdown.map((c) => (
                      <div
                        key={c.labelKey}
                        className="rounded-lg px-2 py-1.5 transition-colors duration-150 hover:bg-white"
                      >
                        <div className="mb-1 flex items-baseline justify-between gap-2">
                          <span className="text-[13px] font-medium text-[#1A2834]">
                            {t(c.labelKey)}
                          </span>
                          <span className="shrink-0 text-2xl font-semibold tabular-nums text-[#10B981]">
                            {c.pct}%
                          </span>
                        </div>
                        <div className="mb-1 text-xs font-semibold tabular-nums text-[#10B981]">
                          {fmtMixed(c.amountM)}
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-[#E8EDF2]">
                          <div
                            className={`h-full rounded-full ${c.highlight ? "bg-gradient-to-r from-[#10B981] to-[#2B5372]" : "bg-[#7A8A98]"}`}
                            style={{ width: `${Math.max(2, c.pct)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle dot="#10B981">
                    {t("platform.kre.detail.crowns.title")}
                  </SectionTitle>
                  <div className="mt-3 space-y-2">
                    {detail.crownJewelAssets.map((a) => (
                      <div
                        key={a.name}
                        className="rounded-lg bg-[#E8EDF2] px-3 py-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate font-mono text-xs text-[#1A2834]">
                            {a.name}
                          </span>
                          <span className="shrink-0 text-[11px] font-semibold tabular-nums text-[#10B981]">
                            {fmtM1(a.amount)} · {a.pct.toFixed(1)}%
                          </span>
                        </div>
                        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#2B5372]"
                            style={{ width: `${Math.max(2, a.pct)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </FadeIn>

              <Divider />

              <FadeIn delay={0.35}>
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <SectionTitle dot="#e11d48">
                    {t("platform.kre.detail.vuln.title")}
                  </SectionTitle>
                  <span className="rounded-full bg-[#E8EDF2] px-3 py-1 text-[11px] font-semibold tabular-nums text-[#1A2834]">
                    {detail.vulnerabilities.length} {t("platform.kre.detail.vuln.findings")} · {critCount}{" "}
                    {t("platform.kre.detail.vuln.crit")} · {highCount}{" "}
                    {t("platform.kre.detail.vuln.high")} · {medCount}{" "}
                    {t("platform.kre.detail.vuln.med")}
                  </span>
                </div>
                <div className="mt-3 max-h-[320px] overflow-y-auto pr-1">
                  {detail.vulnerabilities.map((v, i) => (
                    <motion.div
                      key={v.id}
                      animate={remediated && !reduced ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
                      className={`relative mb-2 overflow-hidden rounded-lg border p-3 pl-5 transition-colors hover:scale-[1.005] ${
                        remediated
                          ? "border-[#10B981]/20 bg-[#10B981]/[0.04]"
                          : "border-[rgba(43,83,114,0.10)] bg-white"
                      }`}
                      style={{ transitionDuration: reduced ? "300ms" : "1000ms", transitionDelay: remediated ? `${i * 0.15}s` : "0s", transitionProperty: "background-color, border-color, transform" }}
                    >
                      <span
                        aria-hidden
                        className={`absolute bottom-0 left-0 top-0 w-1 transition-colors ${remediated ? "bg-[#10B981]" : sevStrip(v.severity)}`}
                        style={{ transitionDuration: reduced ? "300ms" : "1000ms", transitionDelay: remediated ? `${i * 0.15}s` : "0s" }}
                      />
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-bold transition-colors ${
                            remediated ? "bg-[#E8EDF2] text-[#7A8A98]" : sevTone(v.severity)
                          }`}
                          style={{ transitionDuration: reduced ? "300ms" : "1000ms", transitionDelay: remediated ? `${i * 0.15}s` : "0s" }}
                        >
                          {v.severity}
                        </span>
                        <span className="font-mono text-sm text-[#1A2834]">
                          {v.id}
                        </span>
                        <span className="rounded-full bg-[#E8EDF2] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#7A8A98]">
                          {v.category}
                        </span>
                        {remediated ? (
                          <span className="ml-auto shrink-0 rounded-full bg-[#10B981]/10 px-2 py-0.5 text-[10px] font-semibold text-[#10B981]">
                            {t("platform.kre.sim.remediated")}
                          </span>
                        ) : (
                          <span className="ml-auto shrink-0 text-[10px] tabular-nums text-[#7A8A98]">
                            {v.daysAgo} {t("platform.kre.detail.vuln.daysAgo")}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#4A5A68]">
                        {t(v.descKey)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
              </FadeIn>
            </div>

            <div className="sticky bottom-0 flex flex-col gap-3 border-t border-[rgba(43,83,114,0.10)] bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p
                aria-live="polite"
                className={`text-xs ${sim === "applied" ? "font-medium text-[#10B981]" : "text-[#7A8A98]"}`}
              >
                {sim === "applied"
                  ? `${t("platform.kre.sim.appliedNote")} · 3 ${t("platform.kre.sim.appliedAgo")}`
                  : t(
                      row.sla.level === "CRITICAL"
                        ? "platform.kre.detail.sla.critical"
                        : row.sla.level === "MEDIUM"
                          ? "platform.kre.detail.sla.medium"
                          : "platform.kre.detail.sla.low"
                    )}
              </p>
              {sim === "applied" ? (
                <button
                  type="button"
                  onClick={() => setSim("idle")}
                  className="inline-flex min-h-[44px] items-center rounded-xl border border-black/[0.12] bg-white px-5 py-2.5 text-sm font-semibold text-[#1A2834] transition-colors duration-150 hover:bg-[#E8EDF2] active:scale-[0.96]"
                >
                  {t("platform.kre.sim.resetButton")}
                </button>
              ) : sim === "running" ? (
                <button
                  type="button"
                  disabled
                  aria-busy="true"
                  className="btn-energy inline-flex min-h-[44px] cursor-wait items-center opacity-80"
                  style={{ fontSize: 15 }}
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  {t("platform.kre.sim.applyingButton")}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleApply}
                  className="btn-energy inline-flex min-h-[44px] items-center active:scale-[0.96]"
                  style={{ fontSize: 15 }}
                >
                  {t("platform.kre.sim.applyButton")}
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
