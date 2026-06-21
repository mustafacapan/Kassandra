"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Zap, CheckCircle } from "lucide-react";

interface ComplianceTimelineProps {
  simState: "idle" | "scanning" | "synthesizing" | "choke-point" | "remediating" | "success";
  logs: string[];
  selectedScenario: "shadow_ai" | "ransomware" | "cross_account" | "insider_leak";
  isInsideGrid?: boolean;
}

export default function ComplianceTimeline({
  simState,
  logs,
  selectedScenario,
  isInsideGrid = false,
}: ComplianceTimelineProps) {
  const [score, setScore] = useState<number>(100);
  const [sandboxProgress, setSandboxProgress] = useState<number>(0);
  const [sandboxFinished, setSandboxFinished] = useState<boolean>(false);
  
  // Determine target score based on scenario warning triggers
  let targetScore = 100;
  const hasWarning = logs.some(
    (log) =>
      log.includes("[WARN]") ||
      log.includes("ALERT:") ||
      log.includes("Toxic Combination") ||
      log.includes("TOXIC_COMBO") ||
      log.includes("Toxic combo")
  );

  const hasRemediationStarted = simState === "remediating" || logs.some((log) => log.includes("Remediation triggered"));
  const isAutoHealed = simState === "success";

  if (isAutoHealed) {
    targetScore = 100;
  } else if (hasWarning) {
    if (selectedScenario === "shadow_ai") targetScore = 42;
    else if (selectedScenario === "ransomware") targetScore = 35;
    else if (selectedScenario === "cross_account") targetScore = 28;
    else targetScore = 30; // insider_leak
  }

  // Smooth score transition using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    const startValue = score;
    const endValue = targetScore;
    if (startValue === endValue) return;

    const duration = 1200; // ms
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // Ease out quad
      const currentVal = Math.round(startValue + (endValue - startValue) * ease);
      setScore(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetScore, score]);

  // Reset score when simulation goes back to idle
  useEffect(() => {
    if (simState === "idle") {
      setScore(100);
      setSandboxProgress(0);
      setSandboxFinished(false);
    }
  }, [simState]);

  // Sandbox progress simulation when actuation is active
  useEffect(() => {
    if (hasRemediationStarted && !isAutoHealed) {
      setSandboxProgress(0);
      setSandboxFinished(false);
      const interval = setInterval(() => {
        setSandboxProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setSandboxFinished(true);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [hasRemediationStarted, isAutoHealed]);

  // Determine timeline item active states
  const isStableActive = simState === "idle" || (!hasWarning && !isAutoHealed);
  const isDriftActive = hasWarning && !hasRemediationStarted && !isAutoHealed;
  const isActuationActive = hasRemediationStarted && !isAutoHealed;
  const isHealedActive = isAutoHealed;

  // Badges lists based on scenario
  const getBadges = () => {
    switch (selectedScenario) {
      case "shadow_ai":
        return [
          { name: "NIST AI RMF", shouldFlash: hasWarning && !isAutoHealed },
          { name: "GDPR/KVKK", shouldFlash: hasWarning && !isAutoHealed },
          { name: "ISO 42001", shouldFlash: false },
        ];
      case "ransomware":
        return [
          { name: "PCI-DSS v4.0", shouldFlash: hasWarning && !isAutoHealed },
          { name: "KVKK Md. 12", shouldFlash: hasWarning && !isAutoHealed },
          { name: "SOC 2 Type II", shouldFlash: false },
        ];
      case "cross_account":
        return [
          { name: "NIST 800-53", shouldFlash: hasWarning && !isAutoHealed },
          { name: "CIS Controls", shouldFlash: hasWarning && !isAutoHealed },
          { name: "SOC 2 CC5", shouldFlash: false },
        ];
      case "insider_leak":
        return [
          { name: "GDPR Art. 32", shouldFlash: hasWarning && !isAutoHealed },
          { name: "ISO 27001", shouldFlash: hasWarning && !isAutoHealed },
          { name: "NIST SP 800-171", shouldFlash: false },
        ];
      default:
        return [];
    }
  };

  // Drift metrics content
  const getDriftText = () => {
    switch (selectedScenario) {
      case "shadow_ai":
        return "12,400 shadow-infra nodes analyzed & 2 critical drift policies logged.";
      case "ransomware":
        return "8,600 buckets evaluated & Target S3:bucket-3188 PublicAccessBlock disabled.";
      case "cross_account":
        return "4,200 trust relations evaluated & Cross-Account Role drift detected on production-secrets.";
      case "insider_leak":
        return "14,200 credential metrics scanned & 3 critical configuration drifts tracked.";
      default:
        return "";
    }
  };

  const sandboxSuccessMsg = selectedScenario === "ransomware" 
    ? "Tarjan SCC checked: 0 deadlocks" 
    : "HCL drift sandbox validation success";

  return (
    <div className={`flex flex-col gap-5 w-full text-left font-mono ${
      isInsideGrid 
        ? "p-6 bg-slate-950/20 lg:border-l border-purple-950/10" 
        : "bg-slate-950/60 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-md shadow-2xl"
    }`}>
      {/* 1. COMPLIANCE HEALTH GAUGE */}
      <div className="bg-slate-900/60 border border-purple-950/15 rounded-xl p-5 relative overflow-hidden flex flex-col gap-4 shadow-inner">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between w-full">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">// COMPLIANCE MONITOR</span>
            <h4 className="text-xs font-black text-slate-200 uppercase tracking-tight">Compliance Health</h4>
            <p className="text-[9px] text-slate-400 font-light font-sans max-w-[160px] leading-relaxed">
              Real-time drift evaluation relative to corporate security posture baselines.
            </p>
          </div>

          {/* Health Score Counter Circle/Badge */}
          <div className="flex flex-col items-center justify-center relative">
            <motion.div
              animate={{
                scale: score === 100 ? 1 : 1.05,
                borderColor:
                  score >= 80
                    ? "rgba(16, 185, 129, 0.4)" // Emerald Green
                    : score >= 40
                    ? "rgba(245, 158, 11, 0.4)" // Amber
                    : "rgba(239, 68, 68, 0.4)", // Red
              }}
              className="w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center bg-slate-950 shadow-lg relative"
            >
              {/* Pulsing Core */}
              <motion.div
                animate={{
                  opacity: score === 100 ? 0.05 : [0.05, 0.2, 0.05],
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className={`absolute inset-0 rounded-full ${
                  score >= 80 ? "bg-emerald-500" : score >= 40 ? "bg-amber-500" : "bg-red-500"
                }`}
              />
              
              <span
                className={`text-sm font-black ${
                  score >= 80
                    ? "text-emerald-400"
                    : score >= 40
                    ? "text-amber-400"
                    : "text-red-400"
                }`}
              >
                {score}%
              </span>
              <span className="text-[6px] text-slate-500 uppercase tracking-wider font-bold">HEALTH</span>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Compliance Badges Matrix */}
        <div className="border-t border-purple-950/10 pt-3 mt-1">
          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mb-2">// STANDARD & REGULATORY COVERAGE</span>
          <div className="flex flex-wrap gap-1.5">
            {getBadges().map((badge) => (
              <span
                key={badge.name}
                className={`px-2 py-0.5 rounded text-[8px] font-mono border transition-all ${
                  badge.shouldFlash
                    ? "bg-red-950/40 border-red-500 text-red-400 animate-pulse font-bold shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                    : isAutoHealed
                    ? "bg-emerald-950/40 border-emerald-500 text-emerald-400 font-bold"
                    : "bg-slate-900 border-slate-800 text-slate-500"
                }`}
              >
                {badge.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. LOG-SYNCHRONIZED DRIFT TIMELINE */}
      <div className="space-y-4 flex-1">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">// DRIFT TIMELINE FEED</span>

        <div className="relative pl-6 border-l border-purple-500/20 space-y-5">
          {/* STATE 1: STABLE */}
          <div className="relative">
            <span className={`absolute -left-[32px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-300 ${
              isStableActive 
                ? "bg-emerald-950 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                : "bg-slate-900 border-purple-950/20 text-slate-600"
            }`}>
              <CheckCircle className="w-2.5 h-2.5" />
            </span>
            <div className={`transition-opacity duration-300 ${isStableActive ? "opacity-100" : "opacity-40"}`}>
              <h5 className={`text-[10px] font-bold ${isStableActive ? "text-emerald-400" : "text-slate-500"}`}>[STATE: STABLE]</h5>
              <p className="text-[9.5px] text-slate-400 leading-relaxed font-sans mt-0.5">
                [GitOps Verification] Infrastructure baseline fully aligned with checked-in Terraform states.
              </p>
            </div>
          </div>

          {/* STATE 2: DRIFT DETECTED */}
          <div className="relative">
            <span className={`absolute -left-[32px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-300 ${
              isDriftActive 
                ? "bg-red-950 border-red-500 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse" 
                : "bg-slate-900 border-purple-950/20 text-slate-600"
            }`}>
              <AlertTriangle className="w-2.5 h-2.5" />
            </span>
            <div className={`transition-opacity duration-300 ${isDriftActive ? "opacity-100" : "opacity-40"}`}>
              <h5 className={`text-[10px] font-bold ${isDriftActive ? "text-red-400 animate-pulse" : "text-slate-500"}`}>[STATE: DRIFT DETECTED]</h5>
              <p className="text-[9.5px] text-slate-400 leading-relaxed font-sans mt-0.5">
                [CRITICAL DRIFT] Developer console or rogue process bypassed IaC pipeline. Unauthorized runtime configuration state drift detected on target resource.
              </p>
              
              {/* Drift Magnitude Indicator (Resource counter) */}
              {isDriftActive && (
                <div className="mt-2 bg-red-950/30 border border-red-500/20 rounded p-2 text-[8px] text-red-300/90 leading-normal">
                  <span className="font-bold text-red-400 uppercase tracking-wider block mb-0.5">// DRIFT MAGNITUDE ANALYZER</span>
                  {getDriftText()}
                </div>
              )}
            </div>
          </div>

          {/* STATE 3: ACTUATION ACTIVE */}
          <div className="relative">
            <span className={`absolute -left-[32px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-300 ${
              isActuationActive 
                ? "bg-purple-950 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)] animate-pulse" 
                : "bg-slate-900 border-purple-950/20 text-slate-600"
            }`}>
              <Zap className="w-2.5 h-2.5" />
            </span>
            <div className={`transition-opacity duration-300 ${isActuationActive ? "opacity-100" : "opacity-40"}`}>
              <h5 className={`text-[10px] font-bold ${isActuationActive ? "text-purple-400" : "text-slate-500"}`}>[STATE: ACTUATION ACTIVE]</h5>
              <p className="text-[9.5px] text-slate-400 leading-relaxed font-sans mt-0.5">
                [AUTONOMOUS ACTUATION] Kassandra Engine enforcing local OPA bundle guards. Injecting automated mitigation playbooks.
              </p>

              {/* IaC Baseline Sandbox Progress Validation */}
              {isActuationActive && (
                <div className="mt-2 bg-slate-900 border border-purple-950/40 rounded p-2 text-[8px] space-y-1.5">
                  <div className="flex justify-between items-center text-slate-400 font-bold uppercase tracking-wider">
                    <span>// IaC Baseline Sandbox Validation</span>
                    <span className="text-purple-400">{sandboxProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-950 rounded overflow-hidden relative">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded" 
                      style={{ width: `${sandboxProgress}%` }}
                    />
                  </div>
                  <div className="text-[7.5px] text-slate-500 font-mono">
                    {sandboxFinished ? (
                      <span className="text-emerald-400 font-bold">✓ {sandboxSuccessMsg}</span>
                    ) : (
                      <span className="animate-pulse">Validating TF Plan config through OPA engine...</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* STATE 4: AUTO-HEALED */}
          <div className="relative">
            <span className={`absolute -left-[32px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-300 ${
              isHealedActive 
                ? "bg-emerald-950 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                : "bg-slate-900 border-purple-950/20 text-slate-600"
            }`}>
              <Shield className="w-2.5 h-2.5" />
            </span>
            <div className={`transition-opacity duration-300 ${isHealedActive ? "opacity-100" : "opacity-40"}`}>
              <h5 className={`text-[10px] font-bold ${isHealedActive ? "text-emerald-400 font-bold" : "text-slate-500"}`}>[STATE: AUTO-HEALED]</h5>
              <p className="text-[9.5px] text-slate-400 leading-relaxed font-sans mt-0.5">
                [AUTO-HEALED] Posture drifted state successfully rolled back to immutable baseline. Multi-account cloud compliance restored to 100%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
