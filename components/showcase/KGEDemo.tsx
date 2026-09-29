"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Award,
  Check,
  Clock,
  Gauge,
  ShieldAlert,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type DemoState = "idle" | "running" | "complete";

const STEP_MS = [900, 900, 1000, 1200, 1400, 900];

interface Step {
  id: string;
  Icon: LucideIcon;
  tone: "blue" | "mint" | "copper" | "red";
  cardTone?: "copper" | "red";
  titleKey: string;
  bodyKey: string;
}

const STEPS: Step[] = [
  { id: "freshness", Icon: Clock, tone: "blue", titleKey: "platform.kge.demo.step.1.title", bodyKey: "platform.kge.demo.step.1.body" },
  { id: "confidence", Icon: Gauge, tone: "mint", titleKey: "platform.kge.demo.step.2.title", bodyKey: "platform.kge.demo.step.2.body" },
  { id: "trend", Icon: Activity, tone: "blue", titleKey: "platform.kge.demo.step.3.title", bodyKey: "platform.kge.demo.step.3.body" },
  { id: "forecast", Icon: TrendingUp, tone: "copper", cardTone: "copper", titleKey: "platform.kge.demo.step.4.title", bodyKey: "platform.kge.demo.step.4.body" },
  { id: "ledger", Icon: ShieldAlert, tone: "red", cardTone: "red", titleKey: "platform.kge.demo.step.5.title", bodyKey: "platform.kge.demo.step.5.body" },
  { id: "gci", Icon: Award, tone: "mint", titleKey: "platform.kge.demo.step.6.title", bodyKey: "platform.kge.demo.step.6.body" },
];

const METRICS = [
  { value: "91.7%", labelKey: "platform.kge.demo.metric.1.label", tone: "" },
  { value: "+0.48/day", labelKey: "platform.kge.demo.metric.2.label", tone: "" },
  { value: "Day 60", labelKey: "platform.kge.demo.metric.3.label", tone: "" },
  { value: "CHAIN BROKEN", labelKey: "platform.kge.demo.metric.4.label", tone: "text-[#E11D48]" },
];

const TONE: Record<Step["tone"], string> = {
  blue: "bg-[#2B5372]/10 text-[#2B5372]",
  mint: "bg-[#10B981]/10 text-[#10B981]",
  copper: "bg-[#E07A5F]/10 text-[#E07A5F]",
  red: "bg-[#E11D48]/10 text-[#E11D48]",
};

export default function KGEDemo() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<DemoState>("idle");
  const [activeStep, setActiveStep] = useState(-1);
  const timersRef = useRef<number[]>([]);
  const startedRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (state !== "running") return;
    if (reduced) {
      setActiveStep(STEPS.length - 1);
      setState("complete");
      return;
    }
    if (startedRef.current) return;
    startedRef.current = true;
    const timers: number[] = [];
    timersRef.current = timers;
    let acc = 0;
    STEPS.forEach((_, i) => {
      acc += STEP_MS[i];
      timers.push(
        window.setTimeout(() => {
          if (mountedRef.current) setActiveStep(i);
        }, acc)
      );
    });
    timers.push(
      window.setTimeout(() => {
        if (mountedRef.current) setState("complete");
      }, acc + 600)
    );
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      startedRef.current = false;
    };
  }, [state, reduced]);

  const start = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    startedRef.current = false;
    setActiveStep(-1);
    setState("running");
  };

  const runAgain = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    startedRef.current = false;
    setActiveStep(-1);
    setState("idle");
  };

  return (
    <div>
      {state === "idle" && (
        <div className="py-8 text-center">
          <button type="button" onClick={start} className="btn-energy px-8 py-4 text-lg">
            {t("platform.kge.demo.startButton")}
          </button>
          <p className="mx-auto mt-4 max-w-xl font-mono text-xs tabular-nums leading-relaxed text-[#7A8A98]">
            {t("platform.kge.demo.context")}
          </p>
        </div>
      )}

      {state !== "idle" && (
        <div className="mt-6 flex flex-col gap-3">
          {STEPS.map((step, i) => {
            const status = state === "complete" || i < activeStep ? "done" : i === activeStep ? "active" : "pending";
            return (
              <motion.div
                key={step.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: status === "pending" ? 0.45 : 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex items-start gap-4 rounded-xl border p-4 ${
                  step.cardTone === "copper"
                    ? "border-[#E07A5F]/20 bg-[#E07A5F]/[0.06]"
                    : step.cardTone === "red"
                      ? "border-[#E11D48]/20 bg-[#E11D48]/[0.04]"
                      : "border-black/[0.06] bg-[#F4F6F8]"
                }`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${TONE[step.tone]}`}>
                  <step.Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[#1A2834]">{t(step.titleKey)}</span>
                  <span className="mt-1 block font-mono text-xs tabular-nums leading-relaxed text-[#7A8A98]">
                    {t(step.bodyKey)}
                  </span>
                </span>
                <span className="flex shrink-0 items-center" aria-hidden>
                  {status === "done" && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981]/10">
                      <Check className="h-3 w-3 text-[#10B981]" />
                    </span>
                  )}
                  {status === "active" && !reduced && (
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-[#10B981]" />
                    </span>
                  )}
                  {status === "pending" && <span className="h-3 w-3 rounded-full bg-[#E8EDF2]" />}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      {state === "complete" && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-4 rounded-2xl border border-[#10B981]/20 bg-gradient-to-b from-[#10B981]/[0.04] to-[#E07A5F]/[0.04] p-6"
        >
          <p className="text-sm font-semibold text-[#1A2834]">{t("platform.kge.demo.complete.title")}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.labelKey} className="rounded-xl bg-white px-4 py-3 text-center shadow-[0_0_0_1px_rgba(43,83,114,0.10)]">
                <p className={`text-xl font-semibold tabular-nums text-[#1A2834] ${m.tone}`}>{m.value}</p>
                <p className="mt-1 text-[11px] leading-snug text-[#7A8A98]">{t(m.labelKey)}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-mono text-[11px] tabular-nums text-[#7A8A98]">
            {t("platform.kge.demo.complianceLine")}
          </p>
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={runAgain}
              className="text-sm font-semibold text-[#2B5372] underline underline-offset-4 transition-opacity duration-150 hover:opacity-75"
            >
              {t("platform.kge.demo.runAgain")}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
