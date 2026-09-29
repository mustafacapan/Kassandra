"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Camera,
  CheckCircle,
  GitBranch,
  KeyRound,
  Layers,
  Network,
  Search,
  Server,
  ShieldAlert,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type SimState = "idle" | "running" | "complete";
type Tab = "findings" | "cves";

const STEP_MS = 1700;
const DASH_DELAY_MS = 1500;

const STEPS = [
  { id: "iam", Icon: KeyRound },
  { id: "target", Icon: Server },
  { id: "snapshot", Icon: Camera },
  { id: "stream", Icon: Network },
  { id: "reconstruct", Icon: Layers },
  { id: "scan", Icon: Search },
  { id: "graph", Icon: GitBranch },
] as const;

const FINDINGS: Array<{
  rule: string;
  file: string;
  sev: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  masked: string;
  conf: string;
}> = [
  { rule: "EU_VAT_NUMBER", file: "/etc/manpath.config (119)", sev: "MEDIUM", masked: "MINC...IDTH", conf: "HIGH" },
  { rule: "EU_VAT_NUMBER", file: "/etc/manpath.config (120)", sev: "MEDIUM", masked: "MAXC...IDTH", conf: "HIGH" },
  { rule: "POSTGRES_URI", file: "/etc/credentials.env (1)", sev: "CRITICAL", masked: "post...5432", conf: "HIGH" },
  { rule: "IP_RANGE_PRIVATE", file: "/etc/security/access.conf (91)", sev: "LOW", masked: "192.168.x.x", conf: "HIGH" },
  { rule: "DOMAIN_NAME", file: "/etc/security/access.conf (96)", sev: "LOW", masked: "bar.org", conf: "HIGH" },
  { rule: "DOMAIN_NAME", file: "/etc/services (3)", sev: "LOW", masked: "iana.org", conf: "HIGH" },
  { rule: "GITLAB_RUNNER_REGISTRATION_TOKEN", file: "/etc/mime.types (696)", sev: "HIGH", masked: "regi...uest", conf: "HIGH" },
  { rule: "GITLAB_RUNNER_REGISTRATION_TOKEN", file: "/etc/mime.types (894)", sev: "HIGH", masked: "-reg...keep", conf: "HIGH" },
  { rule: "MAC_ADDRESS", file: "/etc/netplan/50-cloud-init.yaml (6)", sev: "LOW", masked: "0a:ff:ec:ea:de:75", conf: "HIGH" },
];

const CVES = [
  { cve: "CVE-2023-38545", pkg: "curl (unknown)", cvss: "9.8", score: "19.6/100", cat: "Standard", fix: "yum update -y curl libcurl" },
  { cve: "CVE-2022-32207", pkg: "curl (unknown)", cvss: "9.8", score: "19.6/100", cat: "Standard", fix: "yum update -y curl" },
  { cve: "CVE-2026-6653", pkg: "libxml2 (unknown)", cvss: "9.8", score: "19.6/100", cat: "Standard", fix: "yum update -y libxml2" },
];

function sevTone(sev: string) {
  if (sev === "CRITICAL") return "bg-[#E11D48]/10 text-[#E11D48]";
  if (sev === "HIGH") return "bg-orange-600/10 text-orange-600";
  if (sev === "MEDIUM") return "bg-amber-500/10 text-amber-600";
  return "bg-[#E8EDF2] text-[#7A8A98]";
}

export default function AgentlessSimulator() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<SimState>("idle");
  const [activeStep, setActiveStep] = useState(-1);
  const [tab, setTab] = useState<Tab>("findings");
  const [showDash, setShowDash] = useState(false);
  const timersRef = useRef<number[]>([]);
  const startedRef = useRef(false);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    startedRef.current = false;
  };

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
    STEPS.forEach((_, i) => {
      timers.push(window.setTimeout(() => setActiveStep(i), STEP_MS * (i + 1)));
    });
    timers.push(window.setTimeout(() => setState("complete"), STEP_MS * STEPS.length + 600));
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      startedRef.current = false;
    };
  }, [state, reduced]);

  useEffect(() => {
    if (state !== "complete") return;
    if (reduced) {
      setShowDash(true);
      return;
    }
    const id = window.setTimeout(() => setShowDash(true), reduced ? 0 : DASH_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [state, reduced]);

  useEffect(() => () => clearTimers(), []);

  const runAgain = () => {
    clearTimers();
    setState("idle");
    setActiveStep(-1);
    setTab("findings");
    setShowDash(false);
  };

  return (
    <div>
      {state === "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center py-10 text-center"
        >
          <button
            type="button"
            onClick={() => setState("running")}
            className="btn-energy px-8 py-4 text-lg active:scale-[0.96]"
          >
            {t("platform.agentless.sim.start")}
          </button>
          <p className="mt-4 text-xs uppercase tracking-wider text-[#7A8A98]">
            {t("platform.agentless.sim.sub")}
          </p>
        </motion.div>
      )}

      {state !== "idle" && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto max-w-4xl rounded-3xl border border-[rgba(43,83,114,0.10)] bg-white/60 p-6 backdrop-blur-sm md:p-8"
        >
          <div className="flex flex-col gap-3">
            {STEPS.map((s, i) => {
              const done = i < activeStep || state === "complete";
              const active = i === activeStep && state === "running";
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-4 rounded-xl border border-[rgba(43,83,114,0.10)] bg-white p-4 transition-opacity duration-300"
                  style={{ opacity: done ? 0.7 : active ? 1 : 0.3 }}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      done ? "bg-[#10B981]/10" : "bg-[#E8EDF2]"
                    }`}
                  >
                    {done ? (
                      <CheckCircle className="h-4 w-4 text-[#10B981]" aria-hidden />
                    ) : (
                      <s.Icon
                        className={`h-4 w-4 ${active ? "animate-pulse text-[#10B981]" : "text-[#7A8A98]"}`}
                        aria-hidden
                      />
                    )}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#1A2834]">
                      {t(`platform.agentless.step.${s.id}.title`)}
                    </span>
                    <span className="block font-mono text-xs text-[#7A8A98]">
                      {t(`platform.agentless.step.${s.id}.body`)}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {state === "complete" && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto mt-6 flex max-w-4xl items-center gap-3 rounded-2xl border border-[#10B981]/20 bg-[#10B981]/[0.08] px-6 py-4"
        >
          <CheckCircle className="h-5 w-5 shrink-0 text-[#10B981]" aria-hidden />
          <p className="text-sm font-semibold tabular-nums text-[#10B981]">
            {t("platform.agentless.sim.completeBar")}
          </p>
        </motion.div>
      )}

      {state === "complete" && showDash && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto mt-12 max-w-5xl"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { value: "3", label: t("platform.agentless.dash.m1"), Icon: Server, tone: "text-[#2B5372]" },
              { value: "46", label: t("platform.agentless.dash.m2"), Icon: AlertTriangle, tone: "text-amber-500" },
              { value: "100", label: t("platform.agentless.dash.m3"), Icon: ShieldAlert, tone: "text-[#E11D48]" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-5 shadow-[var(--shadow-card)]"
              >
                <m.Icon className={`h-5 w-5 ${m.tone}`} aria-hidden />
                <p className="mt-2 text-3xl font-semibold tabular-nums text-[#1A2834]">
                  {m.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[#7A8A98]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {(["findings", "cves"] as const).map((k) => {
              const on = tab === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  aria-pressed={on}
                  className={`min-h-[44px] rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-150 active:scale-[0.96] ${
                    on
                      ? k === "cves"
                        ? "bg-[#E11D48] text-white"
                        : "bg-[#E8EDF2] text-[#1A2834]"
                      : "bg-white text-[#7A8A98] shadow-[0_0_0_1px_rgba(43,83,114,0.10)]"
                  }`}
                >
                  {t(`platform.agentless.dash.tab.${k}`)}
                </button>
              );
            })}
          </div>

          {tab === "findings" ? (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#E8EDF2]">
                    {["rule", "file", "severity", "masked", "confidence"].map((c) => (
                      <th key={c} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#4A5A68]">
                        {t(`platform.agentless.findings.col.${c}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FINDINGS.map((f) => (
                    <tr key={`${f.rule}-${f.file}`} className="border-t border-[rgba(43,83,114,0.10)] transition-colors duration-150 hover:bg-[#F4F6F8]">
                      <td className="px-4 py-3 font-mono text-xs text-[#1A2834]">{f.rule}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[#4A5A68]">{f.file}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${sevTone(f.sev)}`}>
                          {f.sev}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-[#4A5A68]">{f.masked}</td>
                      <td className="px-4 py-3 text-xs font-semibold tabular-nums text-[#4A5A68]">{f.conf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-4">
              <div className="rounded-2xl border-2 border-[#E11D48] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E11D48]">
                  {t("platform.agentless.cves.topTitle")}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-[#1A2834]">
                  <span>{t("platform.agentless.cves.top.package")}: curl</span>
                  <span>{t("platform.agentless.cves.top.cveid")}: CVE-2023-38545</span>
                  <span>{t("platform.agentless.cves.top.cvss")}: 9.8/10</span>
                  <span>{t("platform.agentless.cves.top.catalog")}: Standard Vulnerability</span>
                </div>
                <p className="mt-2 font-mono text-xs text-[#4A5A68]">
                  {t("platform.agentless.cves.top.remediation")}: yum update -y curl libcurl
                </p>
              </div>
              <p className="mt-3 text-right text-[11px] tabular-nums text-[#7A8A98]">
                {t("platform.agentless.cves.page")}
              </p>
              <div className="mt-2 overflow-x-auto rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-[#E8EDF2]">
                      {["package", "cve", "cvss", "score", "catalog", "remediation"].map((c) => (
                        <th key={c} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#4A5A68]">
                          {t(`platform.agentless.cves.col.${c}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CVES.map((c) => (
                      <tr key={c.cve} className="border-t border-[rgba(43,83,114,0.10)] transition-colors duration-150 hover:bg-[#F4F6F8]">
                        <td className="px-4 py-3 font-mono text-xs text-[#1A2834]">{c.pkg}</td>
                        <td className="px-4 py-3 font-mono text-xs font-semibold text-[#E11D48]">{c.cve}</td>
                        <td className="px-4 py-3 text-xs font-bold tabular-nums text-[#1A2834]">{c.cvss}</td>
                        <td className="px-4 py-3 text-xs tabular-nums text-[#4A5A68]">{c.score}</td>
                        <td className="px-4 py-3 text-xs text-[#4A5A68]">{c.cat}</td>
                        <td className="px-4 py-3 font-mono text-xs text-[#4A5A68]">{c.fix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={runAgain}
              className="text-sm text-[#7A8A98] underline underline-offset-4 transition-colors duration-150 hover:text-[#2B5372]"
            >
              {t("platform.agentless.sim.rerun")}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
