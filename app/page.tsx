"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Cpu,
  Network,
  Terminal,
  ArrowRight,
  Play,
  Pause,
  CheckCircle,
  X,
  Briefcase,
  Shield,
  AlertTriangle,
  Radio,
  Database,
  Activity,
  Layers,
  GitBranch,
} from "lucide-react";
import ComplianceTimeline from "../components/ComplianceTimeline";
import { Crown } from "lucide-react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import DetailsModal from "../components/DetailsModal";
import { generateModuleLogs } from "../lib/logs";
import { mainModules, SCENARIO_DATA, futureModules, dataFlowModules, painPoints } from "../lib/data";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<null | any>(null);
  const [campaignsView, setCampaignsView] = useState<"campaigns" | "threat_intel">("threat_intel");
  const [simState, setSimState] = useState<"idle" | "scanning" | "synthesizing" | "choke-point" | "remediating" | "success">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(-1);
  const [moduleStatuses, setModuleStatuses] = useState<("pending" | "active" | "done")[]>([]);
  
  // Scenario Selection State
  const [selectedScenario, setSelectedScenario] = useState<"shadow_ai" | "ransomware" | "cross_account" | "insider_leak">("shadow_ai");
  const [totalRisk, setTotalRisk] = useState<number>(164108848);
  const [displayRisk, setDisplayRisk] = useState<number>(164108848);
  const [findingsCount, setFindingsCount] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const isCancelledRef = useRef<boolean>(false);
  
  const togglePause = () => {
    const next = !isPausedRef.current;
    setIsPaused(next);
    isPausedRef.current = next;
  };
  const [graphState, setGraphState] = useState<"idle" | "compromised" | "toxic" | "secured">("idle");

  const [heroIndex, setHeroIndex] = useState(0);
  const heroTexts = [
    { line1: "Turn 1,000 Cloud Alerts", line2: "Into 1 Strategic Action" },
    { line1: "Expose Hidden Attack Paths", line2: "Across Multi-Account Clouds" },
    { line1: "Transform Kernel Telemetry", line2: "Into Instant eBPF Blocks" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.6], [0.06, 0.015]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Smooth numerical count animation for totalRisk -> displayRisk
  useEffect(() => {
    let animationFrameId: number;
    const startValue = displayRisk;
    const endValue = totalRisk;
    const duration = 1500; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // Ease out quad
      const currentVal = Math.round(startValue + (endValue - startValue) * ease);
      setDisplayRisk(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [totalRisk]);

  // Automatically update totalRisk when the selected scenario changes and simulation is idle
  useEffect(() => {
    if (simState === "idle") {
      setTotalRisk(SCENARIO_DATA[selectedScenario].initialRisk);
      setDisplayRisk(SCENARIO_DATA[selectedScenario].initialRisk);
    }
  }, [selectedScenario, simState]);

  // ----- YENİ: PERFORMANCE DATA ve EXPANDED CARDS STATE -----
  

  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };
  // ----- YENİ KISIM SONU -----
const performanceData = [
  {
    id: 'bce',
    name: 'Business Context Engine',
    short: 'Broad classification and metadata enrichment across legacy environments.',
    testP95: 52.05,
    testAvg: 32.47,
    realP95: 250,
    details: {
      what: 'Detects PII (Personally Identifiable Information) in log files and database outputs. Uses regular expression pattern matching and Merkle tree-based integrity verification. Includes custom masks for AWS Account IDs (12-digit numbers), IPv4 addresses, and IAM ARN formats. Tested on a synthetic log containing 100,000 lines.',
      test: 'P95 52.05 ms, average 32.47 ms, 50 samples. Regex engine: Python `re` module, cached patterns. Merkle tree calculation based on SHA-256.',
      real: 'Actual CloudTrail logs can range in size from 1 to 10 GB. Regex matching is limited by disk I/O. Expect a P95 of 150–300 ms. Additionally, encoding issues (non-UTF-8 characters) in actual logs can cause regex errors. Merkle tree calculation requires parallel processing.'
    }
  },
  {
    id: 'dspm',
    name: 'DSPM',
    short: 'Data Security Posture Management. Sensitivity mapping core.',
    testP95: 52.65,
    testAvg: 32.91,
    realP95: 350,
    details: {
      what: 'MIME type detection, magic number parsing, followed by content-based classification. Header parsing for CSV, stream parsing for PDF (OCR disabled, regex-based). 50 files of 10 MB each, totaling 500 MB. PII detection: TCKN (11 digits), credit card PAN (verified using the Luhn algorithm).',
      test: 'P95 52.65 ms, average 32.91 ms. In-memory processing, no disk I/O.',
      real: 'Downloading a 10 MB file from S3 takes ~200–500 ms (depending on the region). PDF parsing can actually take 1–2 seconds using `PyPDF2` or `pdfplumber`. If OCR is enabled, it takes 5–10 seconds. Total time for a 500 MB file set is 30–60 seconds. P95 is 200–400 ms. Memory usage: 50 parallel files = 500 MB RAM; if the actual container limit is 1–2 GB, swap usage begins.'
    }
  },
  {
    id: 'ebpf',
    name: 'eBPF Monitor',
    short: 'Kernel-level observability for traffic flow and system calls.',
    testP95: 437.60,
    testAvg: 107.94,
    realP95: 450,
    details: {
      what: 'Kernel-level syscall interception. Intercepts system calls such as `execve`, `connect`, and `openat`. Throughput of 1,000 events per second. Events are written to Neo4j in batches of 100 using the `UNWIND` Cypher query. The node risk score is updated in real time.',
      test: 'P95 437.60 ms, average 107.94 ms. 10 batches, each with 100 events. Simulated using `asyncio.sleep`.',
      real: 'The actual eBPF program is loaded into the kernel and transferred to userspace via `perf_buffer`. This process takes 0.1–1 ms. The main latency is in the Neo4j `UNWIND` batch write. There is 5–10 ms of network latency in a cross-AZ Neo4j cluster. A batch of 100 events takes 10–20 ms. A P95 of 80–150 ms is reasonable. However, a sustained throughput of 1,000 events per second can exhaust the Neo4j connection pool (30 sessions). If the pool fills up, requests fall into the queue, and the P95 can rise to 300–500 ms.'
    }
  },
  {
    id: 'sqs',
    name: 'SQS Pipeline',
    short: 'Async message handling for high-throughput logs.',
    testP95: 405.53,
    testAvg: 80.90,
    realP95: 400,
    details: {
      what: 'This is a high-performance data integration architecture that retrieves 2,000 messages from AWS SQS cost-effectively using a smart queuing method, groups them into 20 batches, and transfers them to PostgreSQL via 50 standby database connections with minimal resource consumption and maximum speed.',
      test: ' SQS + DB latency was simulated using `asyncio.sleep`.',
      real: 'SQS `ReceiveMessage` waits 20 seconds on an empty queue (long polling). If a message is present, it returns immediately. 100 messages per chunk, with `MaxNumberOfMessages=10`, requires 10 calls. Each call takes 50–100 ms. A PostgreSQL write takes 10–20 ms. Total: 60–120 ms per chunk. P95: 200–300 ms. However, if the SQS visibility timeout (30 seconds) expires, the message is received again, resulting in duplicate processing. If the PostgreSQL connection pool (50) is full, a `QueuePool` error occurs, requiring a retry.'
    }
  },
  {
    id: 'rustcore',
    name: 'RustCore',
    short: 'High-performance logic gate for critical system checks.',
    testP95: 500,
    testAvg: 98.79,
    realP95: 500,
    details: {
      what: 'This technology is a system that calculates the shortest alternative routes on a 1,000-node network at lightning speed. The calculation results are transferred to the Python program as a single compressed package; this eliminates delays in cross-language data transfer, thereby increasing system performance and processing speed many times over.',
      test: '99ms Deterministic execution time for in-memory graph queries with 5 throttle retry behaviors.Delay injection is dominant. 100 calls, 5 throttle retries.',
      real: '500ms Fixed-rate polling and serialization boundaries.'
    }
  },
  {
    id: 'apve',
    name: 'APVE Logic',
    short: 'Advanced Policy Verification. Heavy computation layer.',
    testP95: 4968.68,
    testAvg: 1108.68,
    realP95: 5000,
    details: {
      what: 'This architecture is an intelligent traffic and load management system that protects AWS authentications with a limit of 5 requests per second and a 5-second timeout, while routing delayed transactions to a dynamically resource-shared background queue to avoid disrupting system performance.',
      test: '1108ms Stress load execution latency with multiple simulated paths.',
      real: '5000ms+ Concurrency lock delays and AWS API rate limits. Background queues are utilized to deliver the first 5 paths instantly.Real AWS IAM `SimulatePrincipalPolicy`: 200–500 ms. 10 requests = 2–5 seconds. Token Bucket: 5/second = runs out in 2 seconds. The 6th path waits 1 second. 5-second timeout = the 5th path completes at the last moment, and the 6th path times out. In reality, the timeout rate is 30–50%. However, the Borrow+Steal background queue verifies these paths later. The first 5 paths are displayed to the user immediately; the rest are processed in the background. UX: “5 paths verified, 5 paths pending” message.'
    }
  }
];
  // Node helper coordinates mapping for SVG line endpoints
  const getNodeCoords = (id: string) => {
    if (id === "prophecy") return { x: 320, y: 70 };
    if (id === "cti") return { x: 120, y: 190 };
    if (id === "runtime-agent") return { x: 320, y: 190 };
    if (id === "plugins") return { x: 520, y: 190 };
    if (id === "graph-intelligence-core") return { x: 200, y: 310 };
    if (id === "reachability") return { x: 440, y: 310 };
    if (id === "dspm") return { x: 120, y: 430 };
    if (id === "policy-intelligence") return { x: 320, y: 430 };
    if (id === "campaigns") return { x: 520, y: 430 };
    if (id === "simulation") return { x: 200, y: 550 };
    if (id === "threats") return { x: 440, y: 550 };
    if (id === "bce") return { x: 200, y: 670 };
    if (id === "auto-fix") return { x: 440, y: 670 };
    return null;
  };

  // Helper to render customized connection lines with SVG dash configurations and SECURED badges
  const renderConnectionLine = (fromId: string, toId: string, x1: number, y1: number, x2: number, y2: number) => {
    const isSuccess = simState === "success";
    const isRemediatingOrChoke = simState === "choke-point" || simState === "remediating";
    const pathMatches = SCENARIO_DATA[selectedScenario].threatPath.some(([f, t]) => f === fromId && t === toId);
    
    let strokeColor = "rgba(51, 65, 85, 0.35)";
    let strokeDash = undefined;
    let strokeWidth = "2.5";
    let className = "transition-all duration-300";
    
    if (isSuccess && pathMatches) {
      strokeColor = "rgba(148, 163, 184, 0.5)"; // broken gray wire
      strokeDash = "4,4";
    } else if (graphState === "toxic" && pathMatches && !isSuccess) {
      strokeColor = "rgba(234, 179, 8, 0.95)"; // vibrant yellow
      strokeWidth = "4.5"; // thick
      className = "transition-all duration-300 animate-pulse";
    } else if (isRemediatingOrChoke && pathMatches) {
      strokeColor = "rgba(239, 68, 68, 0.95)"; // red threat wire
    } else if (simState === "scanning") {
      const fromIdx = mainModules.findIndex(m => m.id === fromId);
      const toIdx = mainModules.findIndex(m => m.id === toId);
      if (currentModuleIndex >= toIdx && toIdx !== -1) {
        strokeColor = "rgba(139, 92, 246, 0.8)";
      } else if (currentModuleIndex >= fromIdx && fromIdx !== -1) {
        strokeColor = "rgba(99, 102, 241, 0.6)";
      }
    }
    
    return (
      <g key={`${fromId}-${toId}`}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDash}
          className={className}
        />
        {isSuccess && pathMatches && (
          <foreignObject
            x={(x1 + x2) / 2 - 25}
            y={(y1 + y2) / 2 - 12}
            width="50"
            height="24"
          >
            <div className="bg-emerald-950/90 border border-emerald-500 text-emerald-400 rounded-full px-1 py-0.5 text-[5px] font-mono font-bold flex items-center justify-center gap-0.5 shadow-md">
              <Shield className="w-1.5 h-1.5" />
              <span>SECURED</span>
            </div>
          </foreignObject>
        )}
      </g>
    );
  };

  // Simulation
  const MODULE_DELAY = 1500;

  const resetSimulator = () => {
    setSimState("idle");
    setGraphState("idle");
    setLogs([]);
    setCurrentModuleIndex(-1);
    setModuleStatuses([]);
    setTotalRisk(SCENARIO_DATA[selectedScenario].initialRisk);
    setDisplayRisk(SCENARIO_DATA[selectedScenario].initialRisk);
    setFindingsCount(0);
    setIsPaused(false);
    isPausedRef.current = false;
    isCancelledRef.current = true;
  };

  const startFullSimulation = async () => {
    resetSimulator();
    isCancelledRef.current = false;
    setSimState("scanning");
    setGraphState("idle");
    setLogs([]);
    setModuleStatuses(new Array(mainModules.length).fill("pending"));
    setCurrentModuleIndex(0);

    const activeProfile = SCENARIO_DATA[selectedScenario];
    setLogs((prev) => [...prev, `[INFO] Kassandra Engine v1.2.0 initialized. Active Scenario: ${activeProfile.name}`]);
    setLogs((prev) => [...prev, `[INFO] Starting full simulation path sweep. Threat target is ${activeProfile.chokePoint}...`]);

    for (let i = 0; i < mainModules.length; i++) {
      if (isCancelledRef.current) return;

      if (isPausedRef.current) {
        await new Promise(resolve => {
          const checkPause = setInterval(() => {
            if (isCancelledRef.current) {
              clearInterval(checkPause);
              resolve(null);
            }
            if (!isPausedRef.current) {
              clearInterval(checkPause);
              resolve(null);
            }
          }, 100);
        });
      }

      if (isCancelledRef.current) return;

      setCurrentModuleIndex(i);
      setModuleStatuses((prev) => {
        const newStatuses = [...prev];
        newStatuses[i] = "active";
        return newStatuses;
      });

      const module = mainModules[i];
      const riskReduction = Math.floor(Math.random() * 12) + 6;
      const findings = Math.floor(Math.random() * 8) + 4;

      if (isCancelledRef.current) return;
      setLogs((prev) => [...prev, `[MODULE] ${module.title} (${module.tag})`]);
      await new Promise(resolve => setTimeout(resolve, 300));

      const moduleLogs = generateModuleLogs(selectedScenario, module);
      for (const log of moduleLogs) {
        if (isCancelledRef.current) return;
        setLogs((prev) => [...prev, log]);

        // State Mapping Log Triggers
        if (
          log.includes("ALERT: Interactive bash shell") || 
          log.includes("ALERT: Identity attempting privilege escalation") || 
          log.includes("Alert: Unregistered interactive shell") || 
          log.includes("ALERT: Interactive") || 
          log.includes("Alert: Exfiltration behavior")
        ) {
          setGraphState("compromised");
        } else if (
          log.includes("TOXIC_COMBO") || 
          log.includes("Toxic Combination") || 
          log.includes("Toxic combo")
        ) {
          setGraphState("toxic");
        }

        await new Promise(resolve => setTimeout(resolve, 200));
      }

      if (isCancelledRef.current) return;
      setTotalRisk((prev) => Math.max(0, prev - (prev * riskReduction / 100)));
      setFindingsCount((prev) => prev + findings);

      setModuleStatuses((prev) => {
        const newStatuses = [...prev];
        newStatuses[i] = "done";
        return newStatuses;
      });

      await new Promise(resolve => setTimeout(resolve, MODULE_DELAY));
    }

    if (isCancelledRef.current) return;
    setLogs((prev) => [...prev, `[SUCCESS] Attack path analysis completed. Isolating primary choke point: ${activeProfile.chokePoint}...`]);
    setSimState("choke-point");
  };

  const getZoomStyle = () => {
    if (simState === "idle" || simState === "success") {
      return {
        transform: "scale(0.55) translate(0px, -40px)",
        transformOrigin: "top center",
      };
    }
    
    if (simState === "choke-point" || simState === "remediating") {
      const scale = 0.95;
      const tx = 190 - 320 * scale; 
      const ty = 240 - 580 * scale; 
      return {
        transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
        transformOrigin: "0px 0px",
      };
    }
    
    const currentMod = mainModules[currentModuleIndex]?.id;
    if (!currentMod) return { transform: "scale(0.55) translate(0px, -40px)", transformOrigin: "top center" };
    
    let cx = 320;
    let cy = 370;
    
    if (currentMod === "prophecy") { cx = 320; cy = 70; }
    else if (currentMod === "cti") { cx = 120; cy = 190; }
    else if (currentMod === "runtime-agent") { cx = 320; cy = 190; }
    else if (currentMod === "plugins") { cx = 520; cy = 190; }
    else if (currentMod === "graph-intelligence-core") { cx = 200; cy = 310; }
    else if (currentMod === "reachability") { cx = 440; cy = 310; }
    else if (currentMod === "dspm") { cx = 120; cy = 430; }
    else if (currentMod === "policy-intelligence") { cx = 320; cy = 430; }
    else if (currentMod === "campaigns") { cx = 520; cy = 430; }
    else if (currentMod === "simulation") { cx = 200; cy = 550; }
    else if (currentMod === "threats") { cx = 440; cy = 550; }
    else if (currentMod === "bce") { cx = 200; cy = 670; }
    else if (currentMod === "auto-fix") { cx = 440; cy = 670; }
    
    const scale = 1.15;
    const tx = 190 - cx * scale;
    const ty = 240 - cy * scale;
    
    return {
      transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
      transformOrigin: "0px 0px",
    };
  };

  const applyRemediation = () => {
    setSimState("remediating");
    let remediationLogs: string[] = [];
    if (selectedScenario === "shadow_ai") {
      remediationLogs = [
        "[BCE] Remediation triggered: eBPF XDP isolation + credential rotation.",
        "[IaC] Step 1: Revoking active developer credentials and locking role-choke-999 policy.",
        "[RUNTIME] Step 2: Compiling and loading eBPF XDP firewall rule on rogue container interface.",
        "[RUNTIME] Terminating container process shell (PID 14981)...",
        "[BCE] Verification scans completed. Attack path severed. Risk reduced to $0.00."
      ];
    } else if (selectedScenario === "ransomware") {
      remediationLogs = [
        "[BCE] Remediation triggered: S3 Policy Enforcement + eBPF Egress block.",
        "[IaC] Step 1: Generating 'Deny All' bucket policy for S3:bucket-3188.",
        "[AWS] Enforcing bucket policy via PutBucketPolicy API... SUCCESS.",
        "[RUNTIME] Step 2: Compiling and loading eBPF XDP firewall egress filter.",
        "[RUNTIME] Active connection to malicious repository IP terminated and container isolated.",
        "[CTI] Re-scanning S3 bucket accessibility... Public access blocked.",
        "[BCE] Verification scans completed. Exfiltration path severed. Risk reduced to $0.00."
      ];
    } else if (selectedScenario === "cross_account") {
      remediationLogs = [
        "[BCE] Remediation triggered: Cross-Account Access Revocation.",
        "[IaC] Step 1: Applying SCP level restriction across AWS Organization accounts.",
        "[AWS] Detaching overprivileged role policy and locking CreatePolicyVersion vulnerability.",
        "[CTI] Re-evaluating identity access paths... Pivot disabled.",
        "[BCE] Verification scans completed. Privilege escalation blocked. Risk reduced to $0.00."
      ];
    } else {
      remediationLogs = [
        "[BCE] Remediation triggered: Access Key Rotation & Workplace eBPF Blocking.",
        "[IaC] Step 1: Revoking active access key credentials (IAM:AccessKey-Insider-Theft) and generating updated policy.",
        "[AWS] Executing UpdateAccessKey to INACTIVE... SUCCESS.",
        "[RUNTIME] Step 2: eBPF sensor triggers local workspace firewall policy block on rogue personal IP.",
        "[RUNTIME] Egress connection from personal computer blocked via network-space hook.",
        "[BCE] Verification scans completed. Leaked credentials invalidated. Risk reduced to $0.00."
      ];
    }
    setLogs((prev) => [
      ...prev,
      ...remediationLogs
    ]);
    setTotalRisk(0);
    setTimeout(() => {
      setSimState("success");
      setGraphState("secured");
    }, 1500);
  };

  const openModal = (module: typeof mainModules[0]) => {
    setActiveModal({ ...module, isFuture: false, view: "business" });
  };

  const openFutureModal = (module: typeof futureModules[0]) => {
    setActiveModal({
      id: module.id,
      tag: module.tag,
      title: module.title,
      short: module.short,
      technical: module.technical || "This feature is currently in our development pipeline. Detailed technical architecture will be available upon release.",
      business: module.business || "Future enhancement that will extend Kassandra's capabilities.",
      icon: module.icon,
      color: module.color,
      isFuture: true,
      view: "business",
    });
  };

  const openDataFlowModal = (module: typeof dataFlowModules[0]) => {
    setActiveModal({
      id: module.id,
      tag: "DATA_FLOW",
      title: module.title,
      short: module.description,
      technical: module.description,
      business: module.description,
      icon: module.icon,
      color: module.color,
      isFuture: false,
      view: "business",
      isDataFlow: true,
    });
  };

  const closeModal = () => setActiveModal(null);

  const switchView = (view: "business" | "technical") => {
    if (activeModal) {
      setActiveModal({ ...activeModal, view });
    }
  };

  const renderMiniCard = (id: string, cx: number, cy: number) => {
    const m = mainModules.find(mod => mod.id === id);
    if (!m) return null;
    const Icon = m.icon;
    const isActive = mainModules[currentModuleIndex]?.id === id && simState === "scanning";
    
    let isChokePoint = (id === "bce" || (id === "auto-fix" && (simState === "remediating" || simState === "success"))) && (simState === "choke-point" || simState === "remediating" || simState === "success");
    let isSecured = id === "bce" && simState === "success";
    let isAutoFixSecured = id === "auto-fix" && simState === "success";
    let isAutoFixActive = id === "auto-fix" && simState === "remediating";
    
    const isCrownJewel = SCENARIO_DATA[selectedScenario].crownJewels.includes(id);
    const isExploited = (isActive || graphState === "compromised") && isCrownJewel && simState !== "success";
    
    let borderColor = "border-purple-955/20";
    let textColor = "text-slate-400";
    let iconColor = "text-slate-500";
    let bgStyle = "bg-slate-950";
    let customClass = "";
    
    if (isExploited) {
      borderColor = "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.7)] animate-pulse";
      textColor = "text-red-400 font-extrabold";
      iconColor = "text-red-500";
      bgStyle = "bg-red-950";
      customClass = "scale-105 z-20 animate-bounce";
    } else if (isActive) {
      borderColor = "border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.5)]";
      textColor = "text-white";
      iconColor = "text-yellow-400 animate-pulse";
      bgStyle = "bg-slate-900";
      customClass = "scale-105 z-20";
    } else if (isChokePoint) {
      if (simState === "success") {
        borderColor = "border-emerald-500 shadow-[0_0_35px_rgba(16,185,129,0.85)]";
        textColor = "text-emerald-400 font-black";
        iconColor = "text-emerald-400";
        bgStyle = "bg-emerald-950";
        customClass = "scale-115 z-30 ring-2 ring-emerald-500/40";
      } else {
        borderColor = "border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.85)] animate-pulse";
        textColor = "text-red-400 font-black";
        iconColor = "text-red-500";
        bgStyle = "bg-red-950";
        customClass = "scale-115 z-30 ring-2 ring-red-500/40";
      }
    } else if (isSecured || isAutoFixSecured) {
      borderColor = "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]";
      textColor = "text-emerald-400";
      iconColor = "text-emerald-400";
      bgStyle = "bg-emerald-950";
    } else if (isAutoFixActive) {
      borderColor = "border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pulse";
      textColor = "text-amber-400";
      iconColor = "text-amber-400";
      bgStyle = "bg-amber-950";
    } else if (simState === "scanning" && mainModules.findIndex(mod => mod.id === id) < currentModuleIndex) {
      borderColor = "border-purple-500/30";
      textColor = "text-slate-400";
      iconColor = "text-purple-500/70";
      bgStyle = "bg-slate-950";
    }

    const showDetails = isActive || isChokePoint || isAutoFixActive || isSecured || isAutoFixSecured;
    
    return (
      <div
        key={id}
        className={`absolute transition-all duration-700 border rounded-2xl p-3 flex flex-col justify-between w-[170px] h-[105px] backdrop-blur-xl shadow-lg cursor-pointer ${borderColor} ${bgStyle} ${customClass}`}
        style={{
          left: cx - 85, 
          top: cy - 52.5, 
        }}
        onClick={() => openModal(m)}
      >
        {showDetails ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <Icon className={`w-4 h-4 ${iconColor}`} />
                <span className={`text-[6px] font-mono font-bold tracking-widest ${isActive ? "text-yellow-300" : isChokePoint ? "text-red-400" : "text-slate-500"}`}>
                  {id === "bce" && isChokePoint ? "CHOKE_POINT" : m.tag.replace("ROADMAP_", "")}
                </span>
              </div>
              <span className={`w-1.5 h-1.5 rounded-full ${isChokePoint ? "bg-red-500 animate-ping" : isSecured ? "bg-emerald-400" : isActive ? "bg-yellow-500 animate-pulse" : "bg-slate-700"}`} />
            </div>
            <div>
              <h4 className={`text-[10px] font-black tracking-tight leading-tight line-clamp-1 truncate ${textColor}`}>
                {m.title}
              </h4>
              <p className="text-[7px] text-slate-500 mt-1 line-clamp-2 leading-normal">
                {m.short}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-purple-950/10 pt-1.5 mt-1">
              <span className="text-[6px] font-mono text-slate-500">
                {isChokePoint ? "EXPOSURE CRITICAL" : isSecured ? "MITIGATION VERIFIED" : isActive ? "INFERENCE RUNNING" : "MONITORING IDLE"}
              </span>
              <span className="text-[6px] font-mono text-purple-400">Read &rarr;</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-between h-full w-full">
            <div className="flex items-center justify-between">
              <Icon className={`w-6 h-6 ${iconColor}`} />
              <span className={`px-1.5 py-0.5 rounded text-[5px] font-mono font-bold border ${
                isSecured || isAutoFixSecured
                  ? "bg-emerald-950/40 text-emerald-400 border-emerald-500/20"
                  : simState === "scanning" && mainModules.findIndex(mod => mod.id === id) < currentModuleIndex
                  ? "bg-purple-950/40 text-purple-400 border-purple-500/20"
                  : "bg-slate-900/60 text-slate-500 border-slate-800/40"
              }`}>
                {isSecured || isAutoFixSecured ? "SECURED" : simState === "scanning" && mainModules.findIndex(mod => mod.id === id) < currentModuleIndex ? "SCANNED" : "STANDBY"}
              </span>
            </div>
            <div>
              <h4 className={`text-[10px] font-black tracking-tight leading-snug line-clamp-2 ${textColor}`}>
                {m.title}
              </h4>
            </div>
            <div className="text-[5px] font-mono text-slate-600 border-t border-purple-950/10 pt-1">
              Click to view documentation
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500/40 selection:text-purple-300 overflow-x-hidden relative antialiased subpixel-antialiased">
      {/* Background effects */}
      <motion.div
        style={{ scale: backgroundScale, opacity: backgroundOpacity }}
        className="fixed inset-0 bg-cover bg-center pointer-events-none mix-blend-lighten z-0 will-change-transform bg-slate-950"
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-24 relative z-10">
        
        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <Hero heroIndex={heroIndex} heroTexts={heroTexts} />

          <div className="lg:col-span-7">
            {/* Flowchart Layout */}
            <div className="relative w-full h-[1050px] py-4">
              {/* SVG Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minHeight: "1050px" }}>
                <line x1="50%" y1="135" x2="20%" y2="195" stroke="rgba(249, 115, 22, 0.45)" strokeWidth="2" />
                <line x1="50%" y1="135" x2="50%" y2="195" stroke="rgba(249, 115, 22, 0.45)" strokeWidth="2" />
                <line x1="50%" y1="135" x2="80%" y2="195" stroke="rgba(249, 115, 22, 0.45)" strokeWidth="2" />
                
                <line x1="20%" y1="325" x2="35%" y2="375" stroke="rgba(59, 130, 246, 0.45)" strokeWidth="2" />
                <line x1="50%" y1="325" x2="35%" y2="375" stroke="rgba(59, 130, 246, 0.45)" strokeWidth="2" />
                <line x1="50%" y1="325" x2="65%" y2="375" stroke="rgba(59, 130, 246, 0.45)" strokeWidth="2" />
                <line x1="80%" y1="325" x2="65%" y2="375" stroke="rgba(59, 130, 246, 0.45)" strokeWidth="2" />
                
                <line x1="35%" y1="505" x2="20%" y2="555" stroke="rgba(34, 197, 94, 0.45)" strokeWidth="2" />
                <line x1="35%" y1="505" x2="50%" y2="555" stroke="rgba(34, 197, 94, 0.45)" strokeWidth="2" />
                <line x1="65%" y1="505" x2="50%" y2="555" stroke="rgba(34, 197, 94, 0.45)" strokeWidth="2" />
                <line x1="65%" y1="505" x2="80%" y2="555" stroke="rgba(34, 197, 94, 0.45)" strokeWidth="2" />
                
                <line x1="20%" y1="665" x2="35%" y2="705" stroke="rgba(239, 68, 68, 0.45)" strokeWidth="2" />
                <line x1="50%" y1="665" x2="35%" y2="705" stroke="rgba(239, 68, 68, 0.45)" strokeWidth="2" />
                <line x1="50%" y1="665" x2="65%" y2="705" stroke="rgba(239, 68, 68, 0.45)" strokeWidth="2" />
                <line x1="80%" y1="665" x2="65%" y2="705" stroke="rgba(239, 68, 68, 0.45)" strokeWidth="2" />

                <line x1="35%" y1="800" x2="35%" y2="895" stroke="rgba(234, 179, 8, 0.45)" strokeWidth="2" />
                <line x1="65%" y1="800" x2="65%" y2="895" stroke="rgba(234, 179, 8, 0.45)" strokeWidth="2" />
              </svg>

              {/* Layer 1: Prophecy (Central) */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: "0px" }}>
                {(() => {
                  const m = mainModules.find(mod => mod.id === "prophecy");
                  if (!m) return null;
                  const Icon = m.icon;
                  return (
                    <motion.div
                      key={m.id}
                      whileHover={{ y: -3, borderColor: "rgba(249, 115, 22, 1)", backgroundColor: "rgba(15, 23, 42, 0.9)" }}
                      onClick={() => openModal(m)}
                      className="bg-slate-900 border-2 border-orange-500 p-3.5 hover:border-orange-400 rounded-xl backdrop-blur-md cursor-pointer transition-all flex flex-col justify-between w-64 h-36 group shadow-2xl hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <Icon className="w-4 h-4 text-orange-400" />
                          <span className="text-[8.5px] font-mono font-bold text-orange-400 tracking-widest uppercase">// {m.tag}</span>
                        </div>
                        <h3 className="font-black text-[13px] text-white mb-1.5 tracking-tight group-hover:text-orange-400 transition-colors text-center">{m.title}</h3>
                        <p className="text-[10px] text-slate-300 text-center leading-relaxed">Central coordinator for async telemetry collection and threat reasoning</p>
                      </div>
                    </motion.div>
                  );
                })()}
              </div>

              {/* Layer 2: Ingest (Discovery, eBPF, Plugins) */}
              <div className="absolute w-full grid grid-cols-3 justify-items-center z-10" style={{ top: "195px" }}>
                {(() => {
                  const modules = mainModules.filter(mod => ["cti", "runtime-agent", "plugins"].includes(mod.id));
                  return modules.map((m) => {
                    const Icon = m.icon;
                    const shortDesc = m.id === "cti" ? "Hybrid AWS API scanning with real-time CloudTrail event monitoring" 
                                   : m.id === "runtime-agent" ? "Kernel-level eBPF telemetry for runtime process monitoring"
                                   : "Extensible AWS auditing plugins for security data collection";
                    return (
                      <motion.div
                        key={m.id}
                        whileHover={{ y: -3, borderColor: "rgba(59, 130, 246, 1)", backgroundColor: "rgba(15, 23, 42, 0.9)" }}
                        onClick={() => openModal(m)}
                        className="bg-slate-900 border-2 border-blue-500/80 p-3 hover:border-blue-400 rounded-xl backdrop-blur-md cursor-pointer transition-all flex flex-col justify-between w-52 h-36 group shadow-2xl hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <Icon className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-[7.5px] font-mono font-bold text-blue-400 tracking-widest uppercase">// {m.tag}</span>
                          </div>
                          <h3 className="font-black text-xs text-white mb-1.5 tracking-tight group-hover:text-blue-400 transition-colors text-center">{m.title}</h3>
                          <p className="text-[9.5px] text-slate-300 text-center leading-relaxed">{shortDesc}</p>
                        </div>
                      </motion.div>
                    );
                  });
                })()}
              </div>

              {/* Layer 3: Graph (Graph, Reach) */}
              <div className="absolute w-full grid grid-cols-2 justify-items-center z-10 px-16" style={{ top: "375px" }}>
                {(() => {
                  const modules = mainModules.filter(mod => ["graph-intelligence-core", "reachability"].includes(mod.id));
                  return modules.map((m) => {
                    const Icon = m.icon;
                    const shortDesc = m.id === "graph-intelligence-core" ? "Rust-accelerated attack path discovery with multi-layer validation"
                                   : "4-layer attack path validation across Network, IAM, Data, and Controls";
                    return (
                      <motion.div
                        key={m.id}
                        whileHover={{ y: -3, borderColor: "rgba(34, 197, 94, 1)", backgroundColor: "rgba(15, 23, 42, 0.9)" }}
                        onClick={() => openModal(m)}
                        className="bg-slate-900 border-2 border-green-500/80 p-3 hover:border-green-400 rounded-xl backdrop-blur-md cursor-pointer transition-all flex flex-col justify-between w-52 h-36 group shadow-2xl hover:shadow-[0_0_20px_rgba(34,197,94,0.35)]"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <Icon className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-[7.5px] font-mono font-bold text-green-400 tracking-widest uppercase">// {m.tag}</span>
                          </div>
                          <h3 className="font-black text-xs text-white mb-1.5 tracking-tight group-hover:text-green-400 transition-colors text-center">{m.title}</h3>
                          <p className="text-[9.5px] text-slate-300 text-center leading-relaxed">{shortDesc}</p>
                        </div>
                      </motion.div>
                    );
                  });
                })()}
              </div>

              {/* Layer 4: DSPM/Policy/Campaign */}
              <div className="absolute w-full grid grid-cols-3 justify-items-center z-10" style={{ top: "555px" }}>
                {(() => {
                  const modules = mainModules.filter(mod => ["dspm", "policy-intelligence", "campaigns"].includes(mod.id));
                  return modules.map((m) => {
                    const Icon = m.icon;
                    const shortDesc = m.id === "dspm" ? "Content-aware data security with Go-based S3 scanning"
                                   : m.id === "policy-intelligence" ? "Local LLM-powered S3 policy analysis with zero data egress"
                                   : "Consolidates alerts into MITRE-mapped attack scenarios";
                    return (
                      <motion.div
                        key={m.id}
                        whileHover={{ y: -3, borderColor: "rgba(239, 68, 68, 1)", backgroundColor: "rgba(15, 23, 42, 0.9)" }}
                        onClick={() => openModal(m)}
                        className="bg-slate-900 border-2 border-red-500/80 p-3 hover:border-red-400 rounded-xl backdrop-blur-md cursor-pointer transition-all flex flex-col justify-between w-52 h-36 group shadow-2xl hover:shadow-[0_0_20px_rgba(239,68,68,0.35)]"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <Icon className="w-3.5 h-3.5 text-red-400" />
                            <span className="text-[7.5px] font-mono font-bold text-red-400 tracking-widest uppercase">// {m.tag}</span>
                          </div>
                          <h3 className="font-black text-xs text-white mb-1.5 tracking-tight group-hover:text-red-400 transition-colors text-center">{m.title}</h3>
                          <p className="text-[9.5px] text-slate-300 text-center leading-relaxed">{shortDesc}</p>
                        </div>
                      </motion.div>
                    );
                  });
                })()}
              </div>

              {/* Layer 5: Red Teaming/Threat Detection */}
              <div className="absolute w-full grid grid-cols-2 justify-items-center z-10 px-16" style={{ top: "705px" }}>
                {(() => {
                  const modules = mainModules.filter(mod => ["simulation", "threats"].includes(mod.id));
                  return modules.map((m) => {
                    const Icon = m.icon;
                    const shortDesc = m.id === "simulation" ? "Deep dry-run attack simulation with real AWS API evidence"
                                   : "100+ severity mappings with toxic combination detection";
                    return (
                      <motion.div
                        key={m.id}
                        whileHover={{ y: -3, borderColor: "rgba(239, 68, 68, 1)", backgroundColor: "rgba(15, 23, 42, 0.9)" }}
                        onClick={() => openModal(m)}
                        className="bg-slate-900 border-2 border-red-500/80 p-3 hover:border-red-400 rounded-xl backdrop-blur-md cursor-pointer transition-all flex flex-col justify-between w-52 h-36 group shadow-2xl hover:shadow-[0_0_20px_rgba(239,68,68,0.35)]"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <Icon className="w-3.5 h-3.5 text-red-400" />
                            <span className="text-[7.5px] font-mono font-bold text-red-400 tracking-widest uppercase">// {m.tag}</span>
                          </div>
                          <h3 className="font-black text-xs text-white mb-1.5 tracking-tight group-hover:text-red-400 transition-colors text-center">{m.title}</h3>
                          <p className="text-[9.5px] text-slate-300 text-center leading-relaxed">{shortDesc}</p>
                        </div>
                      </motion.div>
                    );
                  });
                })()}
              </div>

              {/* Layer 6: Action (BCE, Remediation) */}
              <div className="absolute w-full grid grid-cols-2 justify-items-center z-10 px-16" style={{ top: "895px" }}>
                {(() => {
                  const modules = mainModules.filter(mod => ["bce", "auto-fix"].includes(mod.id));
                  return modules.map((m) => {
                    const Icon = m.icon;
                    const shortDesc = m.id === "bce" ? "Translates technical scores into financial exposure metrics"
                                   : "Dual-strategy automated remediation with SDK and Terraform";
                    return (
                      <motion.div
                        key={m.id}
                        whileHover={{ y: -3, borderColor: "rgba(234, 179, 8, 1)", backgroundColor: "rgba(15, 23, 42, 0.9)" }}
                        onClick={() => openModal(m)}
                        className="bg-slate-900 border-2 border-yellow-500/80 p-3 hover:border-yellow-400 rounded-xl backdrop-blur-md cursor-pointer transition-all flex flex-col justify-between w-52 h-36 group shadow-2xl hover:shadow-[0_0_20px_rgba(234,179,8,0.35)]"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <Icon className="w-3.5 h-3.5 text-yellow-400" />
                            <span className="text-[7.5px] font-mono font-bold text-yellow-400 tracking-widest uppercase">// {m.tag}</span>
                          </div>
                          <h3 className="font-black text-xs text-white mb-1.5 tracking-tight group-hover:text-yellow-400 transition-colors text-center">{m.title}</h3>
                          <p className="text-[9.5px] text-slate-300 text-center leading-relaxed">{shortDesc}</p>
                        </div>
                      </motion.div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: BENTO (Pain Points & Solutions) */}
        <section className="mb-20 pt-16 border-t border-purple-950/10">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-2">// Pain points & architectural answers</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Solving Enterprise Multi-Account Cloud Exposure</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((item) => {
              const Icon = item.icon;
              
              // Dynamic borders matching item's color theme
              const borderStyles: Record<string, string> = {
                red: "border-red-500/30 hover:border-red-400/60 shadow-red-500/5",
                amber: "border-amber-500/30 hover:border-amber-400/60 shadow-amber-500/5",
                blue: "border-blue-500/30 hover:border-blue-400/60 shadow-blue-500/5",
                purple: "border-purple-500/30 hover:border-purple-400/60 shadow-purple-500/5",
                fuchsia: "border-fuchsia-500/30 hover:border-fuchsia-400/60 shadow-fuchsia-500/5",
                indigo: "border-indigo-500/30 hover:border-indigo-400/60 shadow-indigo-500/5",
              };
              const borderClass = borderStyles[item.color || "purple"] || borderStyles.purple;

              return (
                <div key={item.id} className={`bg-slate-900/40 border rounded-2xl p-6 backdrop-blur-md transition-all shadow-xl group text-left ${borderClass}`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <h3 className="font-extrabold text-white text-base tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3">{item.description}</p>
                  <p className="text-purple-400 font-mono text-[10px] font-bold">{item.solution}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: DATA FLOW (Data Flow Hierarchy) */}
        <section className="mb-20 pt-16 border-t border-purple-950/10">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-2">// DATA FLOW HIERARCHY</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Data Ingest & Analysis Pipelines</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {dataFlowModules.map((item) => {
              const Icon = item.icon;
              
              // Dynamic borders matching item's color theme
              const borderStyles: Record<string, string> = {
                purple: "border-purple-500/30 hover:border-purple-400/60 shadow-purple-500/5",
                fuchsia: "border-fuchsia-500/30 hover:border-fuchsia-400/60 shadow-fuchsia-500/5",
                indigo: "border-indigo-500/30 hover:border-indigo-400/60 shadow-indigo-500/5",
                violet: "border-violet-500/30 hover:border-violet-400/60 shadow-violet-500/5",
                blue: "border-blue-500/30 hover:border-blue-400/60 shadow-blue-500/5",
                emerald: "border-emerald-500/30 hover:border-emerald-400/60 shadow-emerald-500/5",
              };
              const borderClass = borderStyles[item.color || "purple"] || borderStyles.purple;

              return (
                <div
                  key={item.id}
                  onClick={() => openDataFlowModal(item)}
                  className={`bg-slate-900/30 border p-5 rounded-2xl transition-all shadow-md flex flex-col justify-between text-left cursor-pointer group ${borderClass}`}
                >
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-purple-950/10">
                    <Icon className="w-4 h-4 text-purple-400" />
                    <span className="text-[7.5px] font-mono font-bold text-slate-500">STAGE {item.id.replace("df-", "")}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-xs text-white mb-2 group-hover:text-purple-400 transition-colors leading-tight">{item.title}</h4>
                    <p className="text-slate-400 text-[10px] leading-relaxed font-sans font-light line-clamp-3">{item.description}</p>
                  </div>
                  <div className="text-[7.5px] font-mono text-purple-400 mt-4 pt-2 border-t border-purple-950/10 text-right">
                    Explore Technical Schema &rarr;
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: FUTURE ROADMAP */}
        <section className="mb-20 pt-16 border-t border-purple-950/10">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-2">// FUTURE ROADMAP</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Upcoming Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {futureModules.map((item) => {
              const Icon = item.icon;
              
              // Dynamic borders matching item's color theme
              const borderStyles: Record<string, string> = {
                purple: "border-purple-500/30 hover:border-purple-400/60 shadow-purple-500/5",
                fuchsia: "border-fuchsia-500/30 hover:border-fuchsia-400/60 shadow-fuchsia-500/5",
                indigo: "border-indigo-500/30 hover:border-indigo-400/60 shadow-indigo-500/5",
                violet: "border-violet-500/30 hover:border-violet-400/60 shadow-violet-500/5",
                blue: "border-blue-500/30 hover:border-blue-400/60 shadow-blue-500/5",
                emerald: "border-emerald-500/30 hover:border-emerald-400/60 shadow-emerald-500/5",
              };
              const borderClass = borderStyles[item.color || "purple"] || borderStyles.purple;

              return (
                <div
                  key={item.id}
                  onClick={() => openFutureModal(item)}
                  className={`bg-slate-900/35 border p-6 rounded-2xl transition-all shadow-xl flex flex-col justify-between text-left cursor-pointer group ${borderClass}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full text-[8px] font-mono font-bold bg-purple-950/30 text-purple-400 border border-purple-900/20 tracking-wider">
                        {item.tag}
                      </span>
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <h3 className="font-extrabold text-xl text-white mb-2 tracking-tight group-hover:text-purple-400 transition-colors">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">{item.short}</p>
                  </div>
                  <div className="text-xs font-mono text-slate-500 group-hover:text-purple-400 flex items-center space-x-1 pt-4 mt-4 border-t border-purple-950/10">
                    <span>Explore Agentic Swarm Details</span>
                    <span>→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* YENİ: PERFORMANCE BENCHMARK SECTION */}
        <section className="mb-20 pt-16 border-t border-purple-950/10">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-2">// Synthetıc and Productıon Results</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Performance Comparison: Lab vs Production</h2>
          </div>

          {/* Performance Overview Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            <div className="md:col-span-8 bg-slate-900/40 border border-purple-950/30 rounded-2xl p-5 flex flex-col justify-center relative overflow-hidden border-l-2 border-l-purple-500 backdrop-blur-md">
              <div className="absolute top-0 right-0 p-5 opacity-5">
                <Terminal className="w-24 h-24 text-purple-400" />
              </div>
              <div className="z-10">
                <h3 className="text-purple-400/60 font-mono text-[9px] uppercase tracking-[0.3em] mb-2">Total System Executıon</h3>
                <div className="flex flex-wrap gap-6 sm:gap-12">
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-400 text-glow-cyan block">11s</span>
                    <span className="text-[9px] text-purple-400/50 font-mono uppercase tracking-wider">SYNTHETIC RUNTIME</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-pink-500 text-glow-pink block">60-120s</span>
                    <span className="text-[9px] text-pink-500/50 font-mono uppercase tracking-wider">REAL-WORLD REST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-slate-900/40 border border-purple-950/30 rounded-2xl p-5 border-r-2 border-r-amber-500 backdrop-blur-md flex flex-col justify-center">
              <h3 className="text-slate-400 font-mono text-xs uppercase mb-3 tracking-widest">System Benchmark Status</h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-350">Data Sanitization Pipeline</span>
                  <span className="px-2 py-0.5 border border-emerald-500 text-emerald-400 text-[10px] font-bold">OPTIMAL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-350">eBPF Syscall Interceptor</span>
                  <span className="px-2 py-0.5 border border-amber-500 text-amber-400 text-[10px] font-bold">WARNING</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-350">Graph Routing Solver</span>
                  <span className="px-2 py-0.5 border border-purple-500 text-purple-400 text-[10px] font-bold">STABLE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Latency Distribution Chart */}
          <div className="bg-slate-900/40 border border-purple-950/30 rounded-2xl p-8 mb-8 backdrop-blur-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h3 className="font-extrabold text-lg text-white uppercase tracking-wider">Delay View</h3>
                <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mt-1">Synthetıc and Productıon</p>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 bg-cyan-400 rounded-sm inline-block shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">LAB (ms)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 bg-fuchsia-400 rounded-sm inline-block shadow-[0_0_8px_rgba(232,121,249,0.8)]" />
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">PRODUCTION (ms)</span>
                </div>
              </div>
            </div>

            {/* Bars container (Shortened slightly to h-72 with h-52 bar frames) */}
            <div className="h-72 flex items-end justify-between gap-2 sm:gap-6 px-2 overflow-x-auto">
              {performanceData.map((mod) => {
                // Use a non-linear log scale or custom math scaling for proportional bar height representation
                let testHeight = Math.max(8, Math.min(100, (Math.sqrt(mod.testP95) / Math.sqrt(5000)) * 100));
                let realHeight = Math.max(8, Math.min(100, (Math.sqrt(mod.realP95) / Math.sqrt(5000)) * 100));

                // Visually emphasize close values (like 437.60ms and 450ms) to ensure distinction
                if (Math.abs(testHeight - realHeight) < 5) {
                  if (testHeight < realHeight) {
                    testHeight = Math.max(8, testHeight - 2.5);
                    realHeight = Math.min(100, realHeight + 2.5);
                  } else if (testHeight > realHeight) {
                    testHeight = Math.min(100, testHeight + 2.5);
                    realHeight = Math.max(8, realHeight - 2.5);
                  }
                }

                return (
                  <div key={mod.id} className="flex-1 flex flex-col items-center gap-2 group min-w-[96px]">
                    <div className="w-full flex items-end justify-center gap-4 h-52 border-b border-purple-950/20 pb-1">
                      {/* Lab Bar (Vibrant Neon Cyan) */}
                      <div className="relative group/bar flex flex-col items-end justify-end h-full w-5 sm:w-7 md:w-9">
                        <div
                          className="w-full bg-gradient-to-t from-cyan-600/80 to-cyan-400 border border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.6)] rounded-t-sm overflow-hidden cursor-help hover:brightness-125 transition-all duration-300"
                          style={{ height: `${testHeight}%`, minHeight: '4px' }}
                        >
                          <div className="w-full h-full bg-cyan-450/20" />
                        </div>
                        <div className="absolute bottom-full mb-1 opacity-0 group-hover/bar:opacity-100 bg-slate-950/90 text-cyan-400 font-mono text-xs px-2 py-0.5 border border-cyan-450/40 rounded transition-opacity pointer-events-none whitespace-nowrap z-20">
                          {mod.testP95} ms
                        </div>
                      </div>
                      {/* Prod Bar (Vibrant Neon Hot-Purple/Fuchsia) */}
                      <div className="relative group/bar flex flex-col items-start justify-end h-full w-5 sm:w-7 md:w-9">
                        <div
                          className="w-full bg-gradient-to-t from-purple-600/80 to-fuchsia-400 border border-fuchsia-300 shadow-[0_0_12px_rgba(232,121,249,0.6)] rounded-t-sm overflow-hidden cursor-help hover:brightness-125 transition-all duration-300"
                          style={{ height: `${realHeight}%`, minHeight: '4px' }}
                        >
                          <div className="w-full h-full bg-fuchsia-450/20" />
                        </div>
                        <div className="absolute bottom-full mb-1 opacity-0 group-hover/bar:opacity-100 bg-slate-950/90 text-fuchsia-400 font-mono text-xs px-2 py-0.5 border border-fuchsia-450/40 rounded transition-opacity pointer-events-none whitespace-nowrap z-20">
                          {mod.realP95} ms
                        </div>
                      </div>
                    </div>
                    {/* Numbers placed directly under each matching column (with small ms suffix and extra spacing) */}
                    <div className="flex justify-center gap-4 w-full text-xs font-mono font-bold leading-none mt-1">
                      <span className="w-6 sm:w-8 md:w-10 text-center text-cyan-400">
                        {Math.round(mod.testP95)}
                        <span className="text-[9px] text-slate-500 font-normal ml-0.5 lowercase">ms</span>
                      </span>
                      <span className="w-6 sm:w-8 md:w-10 text-center text-fuchsia-400">
                        {Math.round(mod.realP95)}
                        <span className="text-[9px] text-slate-500 font-normal ml-0.5 lowercase">ms</span>
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">{mod.name.split(' ')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Engine Bento Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {performanceData.map((mod) => {
              const isExpanded = expandedCards[mod.id] || false;
              let IconComponent = Shield;
              let iconColor = "text-purple-400";
              let borderClass = "border-t-purple-500/50";
              let neonGlowClass = "shadow-[0_0_12px_rgba(168,85,247,0.15)] border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_18px_rgba(168,85,247,0.35)]";

              if (mod.id === 'bce') {
                IconComponent = Shield;
                iconColor = "text-purple-400";
                borderClass = "border-t-purple-500/50";
                neonGlowClass = "shadow-[0_0_12px_rgba(168,85,247,0.15)] border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_18px_rgba(168,85,247,0.35)]";
              } else if (mod.id === 'dspm') {
                IconComponent = Database;
                iconColor = "text-indigo-400";
                borderClass = "border-t-indigo-500/50";
                neonGlowClass = "shadow-[0_0_12px_rgba(99,102,241,0.15)] border-indigo-500/30 hover:border-indigo-400 hover:shadow-[0_0_18px_rgba(99,102,241,0.35)]";
              } else if (mod.id === 'ebpf') {
                IconComponent = Activity;
                iconColor = "text-emerald-400";
                borderClass = "border-t-emerald-500/50";
                neonGlowClass = "shadow-[0_0_12px_rgba(16,185,129,0.15)] border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_18px_rgba(16,185,129,0.35)]";
              } else if (mod.id === 'sqs') {
                IconComponent = GitBranch;
                iconColor = "text-blue-400";
                borderClass = "border-t-blue-500/50";
                neonGlowClass = "shadow-[0_0_12px_rgba(59,130,246,0.15)] border-blue-500/30 hover:border-blue-400 hover:shadow-[0_0_18px_rgba(59,130,246,0.35)]";
              } else if (mod.id === 'rustcore') {
                IconComponent = Cpu;
                iconColor = "text-purple-400";
                borderClass = "border-t-purple-500/50";
                neonGlowClass = "shadow-[0_0_12px_rgba(168,85,247,0.15)] border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_18px_rgba(168,85,247,0.35)]";
              } else if (mod.id === 'apve') {
                IconComponent = Layers;
                iconColor = "text-pink-400";
                borderClass = "border-t-pink-500/50";
                neonGlowClass = "shadow-[0_0_12px_rgba(236,72,153,0.15)] border-pink-500/30 hover:border-pink-400 hover:shadow-[0_0_18px_rgba(236,72,153,0.35)]";
              }

              return (
                <div
                  key={mod.id}
                  onClick={() => toggleCard(mod.id)}
                  className={`bg-slate-900/40 border border-t-2 ${borderClass} ${neonGlowClass} rounded-2xl p-6 backdrop-blur-md transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className={`w-5 h-5 ${iconColor}`} />
                    <h4 className="font-bold text-sm tracking-wider uppercase text-white font-mono">{mod.name}</h4>
                  </div>
                  <p className="text-xs text-slate-350 mb-4 leading-relaxed font-sans">{mod.short}</p>

                  <div className="space-y-3 font-mono text-xs border-t border-purple-950/10 pt-3">
                    <div>
                      <p className="text-[10px] text-purple-400 uppercase tracking-widest mb-1.5 font-bold">Test Results</p>
                      <ul className="space-y-1 text-slate-300">
                        <li className="flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-purple-500 rounded-full" /> {mod.details.test.split('. ')[0]}
                        </li>
                        {mod.details.test.split('. ')[1] && (
                          <li className="flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-purple-500 rounded-full" /> {mod.details.test.split('. ')[1]}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Toggleable Details */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'max-h-[500px] opacity-100 mt-4 border-t border-purple-950/10 pt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-4 font-mono text-xs">
                      <div>
                        <h5 className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1.5">Functional Scope</h5>
                        <p className="text-slate-300 leading-relaxed font-sans text-xs">{mod.details.what}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] font-bold text-pink-500 uppercase tracking-wider mb-1.5">Production Risk & Scale Factors</h5>
                        <p className="text-slate-300 leading-relaxed font-sans text-xs">{mod.details.real}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-slate-500 mt-4 border-t border-purple-950/10 pt-2 flex justify-between">
                    <span>{isExpanded ? '▼ Close Details' : '▲ Show Details'}</span>
                    <span className="text-purple-400/50">i</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Technical Debt Section */}
          <div className="w-full">
            <div className="bg-slate-900/40 border border-purple-950/30 rounded-2xl overflow-hidden backdrop-blur-md">
              <div className="px-6 py-4 bg-purple-950/20 border-b border-purple-950/20 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-pink-500" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-white font-mono">Known Technical Debt</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-4 p-4 border border-purple-950/10 bg-slate-950/20 rounded-xl hover:border-pink-500/30 transition-all duration-300">
                  <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center text-pink-500 border border-pink-500/20 flex-shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  
                  <div>
                    <p className="text-xs font-bold font-mono text-white uppercase">GIL Acquisition Delay</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">Actual: 5–15 ms; target: 1 ms. `rmp-serde` batching is required.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 border border-purple-950/10 bg-slate-950/20 rounded-xl hover:border-pink-500/30 transition-all duration-300">
                  <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center text-pink-500 border border-pink-500/20 flex-shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  
                  <div>
                    <p className="text-xs font-bold font-mono text-white uppercase">PostgreSQL DSPM write</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">50 parallel inserts will cause lock contention if the `dspm_findings` table is not indexed. A `COPY` or batch insert is required.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 border border-purple-950/10 bg-slate-950/20 rounded-xl hover:border-pink-500/30 transition-all duration-300">
                  <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center text-pink-500 border border-pink-500/20 flex-shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold font-mono text-white uppercase">Neo4j Connection Pool</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">30 sessions are insufficient for a sustained throughput of 100–200 events per second. Either the connection pool must be increased or an asynchronous driver must be used.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* SIMULATOR */}
      <section id="simulator-section" className="py-24 border-t border-purple-950/10 relative z-10">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-2">// Empirical Validation Dashboard</span>
            <h2 className="text-4xl font-black text-white tracking-tight">How Kassandra Resolves Exposure</h2>
          </div>

          {/* Scenario Selector Campaign Button Group */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-8 bg-slate-900/60 border border-purple-950/20 p-3.5 rounded-2xl backdrop-blur-sm max-w-4xl mx-auto">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest px-2">// SELECT CAMPAIGN:</span>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {(Object.keys(SCENARIO_DATA) as Array<keyof typeof SCENARIO_DATA>).map((key) => {
                const isSelected = selectedScenario === key;
                const scenario = SCENARIO_DATA[key];
                return (
                  <button
                    key={key}
                    disabled={simState === "scanning" || simState === "remediating"}
                    onClick={() => {
                      setSelectedScenario(key);
                      setSimState("idle");
                      setGraphState("idle");
                      setLogs([]);
                      setCurrentModuleIndex(-1);
                      setModuleStatuses([]);
                      setTotalRisk(scenario.initialRisk);
                      setDisplayRisk(scenario.initialRisk);
                      setFindingsCount(0);
                      setIsPaused(false);
                    }}
                    className={`px-4 py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                      isSelected
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/20"
                        : "bg-slate-950/40 border-purple-950/30 text-slate-400 hover:text-slate-200 hover:border-purple-900/40 disabled:opacity-40 disabled:cursor-not-allowed"
                    }`}
                  >
                    {scenario.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-950/40 border border-purple-950/20 rounded-2xl overflow-hidden backdrop-blur-md grid grid-cols-1 lg:grid-cols-4 min-h-[460px] shadow-2xl">
            <div className="border-r border-purple-950/10 p-6 flex flex-col justify-between bg-slate-950/20">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-purple-950/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono font-bold text-slate-300">ham_telemetry_stream</span>
                  </div>
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                </div>
                <div ref={logContainerRef} className="font-mono text-xs text-slate-400 space-y-2.5 h-[260px] overflow-y-auto pr-2">
                  {logs.length === 0 ? (
                    <div className="text-slate-600 italic">Console idle. Awaiting configuration burst execution...</div>
                  ) : (
                    logs.map((log, i) => (
                      <div
                        key={i}
                        className={
                          log.includes("[WARN]")
                            ? "text-amber-400"
                            : log.includes("[INFO]")
                            ? "text-purple-400"
                            : log.includes("[BCE]")
                            ? "text-fuchsia-400 font-bold"
                            : log.includes("SECURE")
                            ? "text-emerald-400"
                            : "text-slate-300"
                        }
                      >
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="border-t border-purple-950/10 pt-4 flex items-center justify-between gap-2">
                {simState === "idle" && (
                  <button
                    onClick={startFullSimulation}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <span>Start Simulation</span>
                  </button>
                )}
                {simState === "scanning" && (
                  <div className="flex items-center gap-2 w-full">
                    <button
                      onClick={togglePause}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-purple-950/40 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2"
                    >
                      {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      <span>{isPaused ? "Resume" : "Pause"}</span>
                    </button>
                    <button
                      onClick={resetSimulator}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-purple-950/40 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {simState === "synthesizing" && (
                  <div className="text-xs font-mono text-slate-400 animate-pulse flex items-center space-x-2 w-full justify-center">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                    <span>Synthesizing...</span>
                  </div>
                )}
                {simState === "success" && (
                  <button
                    onClick={resetSimulator}
                    className="w-full bg-slate-900 hover:bg-slate-850 text-slate-300 border border-purple-950/40 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2"
                  >
                    <span>Reset Simulation</span>
                  </button>
                )}
              </div>
            </div>

            <div className="border-r border-purple-950/10 p-6 flex flex-col justify-between bg-slate-950/10">
              <div className="flex items-center space-x-2 mb-4 border-b border-purple-950/10 pb-3">
                <Network className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-mono font-bold text-slate-300">attack_path_graph</span>
              </div>
              <div className="flex-1 w-full flex flex-col items-center justify-center min-h-[480px] h-[480px] p-2 bg-slate-950/20 rounded-xl border border-purple-950/25 relative overflow-hidden">
                {simState === "idle" ? (
                  <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 animate-pulse">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border border-purple-500/20 flex items-center justify-center bg-purple-950/10">
                        <Network className="w-8 h-8 text-purple-400/60" />
                      </div>
                      <div className="absolute -inset-1 rounded-full border border-purple-500/30 animate-ping opacity-20 pointer-events-none" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">// Awaiting Campaign Execution</h4>
                      <p className="text-[10px] text-slate-500 mt-1 max-w-[200px] leading-relaxed">
                        Start the simulation to build the real-time attack path topology.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 transition-all duration-1000 ease-in-out" style={getZoomStyle()}>
                    <div className="relative w-[640px] h-[780px] mx-auto">
                      
                      {/* Connection Lines DAG */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 640 780" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Layer 1 -> Layer 2 */}
                        {renderConnectionLine("prophecy", "cti", 320, 70, 120, 190)}
                        {renderConnectionLine("prophecy", "runtime-agent", 320, 70, 320, 190)}
                        {renderConnectionLine("prophecy", "plugins", 320, 70, 520, 190)}

                        {/* Layer 2 -> Layer 3 */}
                        {renderConnectionLine("cti", "graph-intelligence-core", 120, 190, 200, 310)}
                        {renderConnectionLine("runtime-agent", "graph-intelligence-core", 320, 190, 200, 310)}
                        {renderConnectionLine("plugins", "reachability", 520, 190, 440, 310)}

                        {/* Layer 3 -> Layer 4 */}
                        {renderConnectionLine("graph-intelligence-core", "dspm", 200, 310, 120, 430)}
                        {renderConnectionLine("graph-intelligence-core", "campaigns", 200, 310, 520, 430)}
                        {renderConnectionLine("reachability", "policy-intelligence", 440, 310, 320, 430)}
                        {renderConnectionLine("reachability", "campaigns", 440, 310, 520, 430)}

                        {/* Layer 4 -> Layer 5 */}
                        {renderConnectionLine("dspm", "simulation", 120, 430, 200, 550)}
                        {renderConnectionLine("policy-intelligence", "threats", 320, 430, 440, 550)}
                        {renderConnectionLine("campaigns", "threats", 520, 430, 440, 550)}

                        {/* Layer 5 -> Layer 6 */}
                        {renderConnectionLine("simulation", "bce", 200, 550, 200, 670)}
                        {renderConnectionLine("threats", "auto-fix", 440, 550, 440, 670)}
                        {renderConnectionLine("bce", "auto-fix", 200, 670, 440, 670)}
                      </svg>

                      {/* Nodes Absolute Layout */}
                      {/* Layer 1 */}
                      {renderMiniCard("prophecy", 320, 70)}

                      {/* Layer 2 */}
                      {renderMiniCard("cti", 120, 190)}
                      {renderMiniCard("runtime-agent", 320, 190)}
                      {renderMiniCard("plugins", 520, 190)}

                      {/* Layer 3 */}
                      {renderMiniCard("graph-intelligence-core", 200, 310)}
                      {renderMiniCard("reachability", 440, 310)}

                      {/* Layer 4 */}
                      {renderMiniCard("dspm", 120, 430)}
                      {renderMiniCard("policy-intelligence", 320, 430)}
                      {renderMiniCard("campaigns", 520, 430)}

                      {/* Layer 5 */}
                      {renderMiniCard("simulation", 200, 550)}
                      {renderMiniCard("threats", 440, 550)}

                      {/* Layer 6 */}
                      {renderMiniCard("bce", 200, 670)}
                      {renderMiniCard("auto-fix", 440, 670)}

                    </div>
                  </div>
                )}

                {(simState === "choke-point" || simState === "remediating") && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md border-2 border-red-500 rounded-xl pointer-events-none flex items-center justify-center z-40 transition-all duration-500">
                    <div className="bg-red-950/95 border-2 border-red-500 px-8 py-6 rounded-2xl text-center shadow-[0_0_50px_rgba(239,68,68,0.7)] max-w-md animate-pulse">
                      <div className="flex justify-center mb-3">
                        <AlertTriangle className="w-10 h-10 text-red-500 animate-bounce" />
                      </div>
                      <span className="text-xs font-mono text-red-400 block mb-2 tracking-widest font-black uppercase">// CRITICAL CHOKE POINT IDENTIFIED //</span>
                      <h4 className="text-base font-black text-white uppercase tracking-tight bg-red-900/40 border border-red-500/30 px-3 py-1.5 rounded-lg mb-3 break-all">{SCENARIO_DATA[selectedScenario].chokePoint}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Severing this node eliminates multiple multi-hop attack paths, fully securing a Set Union of <span className="text-red-400 font-extrabold text-sm">${SCENARIO_DATA[selectedScenario].initialRisk.toLocaleString()}</span> in exposure.
                      </p>
                    </div>
                  </div>
                )}
                {simState === "success" && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md border-2 border-emerald-500 rounded-xl pointer-events-none flex items-center justify-center z-40 transition-all duration-500">
                    <div className="bg-emerald-950/95 border-2 border-emerald-500 px-8 py-6 rounded-2xl text-center shadow-[0_0_50px_rgba(16,185,129,0.7)] max-w-md">
                      <div className="flex justify-center mb-3">
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                      </div>
                      <span className="text-xs font-mono text-emerald-400 block mb-2 tracking-widest font-black uppercase">// POSTURE REMEDIATION SUCCESSFUL //</span>
                      <h4 className="text-base font-black text-white uppercase tracking-tight bg-emerald-900/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg mb-3 break-all">{SCENARIO_DATA[selectedScenario].chokePoint}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Attack path successfully severed. Critical node protected. Risk exposure exposure blast radius mitigated to <span className="text-emerald-400 font-extrabold text-sm">$0.00</span>.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between bg-slate-950/30">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-purple-950/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-mono font-bold text-slate-200">kassandra_bce_engine</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono bg-purple-900/40 text-purple-300 border border-purple-950/30 px-2 py-0.5 rounded">FINDINGS: {findingsCount}</span>
                    <span className="text-[10px] font-mono bg-purple-900/40 text-purple-300 border border-purple-950/30 px-2 py-0.5 rounded animate-pulse">LIVE ANALYZER</span>
                  </div>
                </div>
                
                {/* Engine Live Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-5 font-mono text-xs text-slate-300">
                  <div className="bg-slate-950/40 border border-purple-950/10 p-3 rounded-lg">
                    <span className="text-slate-400 block mb-0.5 font-bold text-[9px]">// GRAPH DENSITY</span>
                    <span className="text-xs font-bold text-white">50K Nodes / 100K Edges</span>
                  </div>
                  <div className="bg-slate-950/40 border border-purple-950/10 p-3 rounded-lg">
                    <span className="text-slate-400 block mb-0.5 font-bold text-[9px]">// CALCULATIONS SPEED</span>
                    <span className="text-xs font-bold text-cyan-400">150,981 paths/sec</span>
                  </div>
                  <div className="bg-slate-950/40 border border-purple-950/10 p-3 rounded-lg">
                    <span className="text-slate-400 block mb-0.5 font-bold text-[9px]">// HEAP ALLOCATION</span>
                    <span className="text-xs font-bold text-emerald-400">2,202 KB (OOM Protected)</span>
                  </div>
                  <div className="bg-slate-950/40 border border-purple-950/10 p-3 rounded-lg">
                    <span className="text-slate-400 block mb-0.5 font-bold text-[9px]">// DECISION CONFIDENCE</span>
                    <span className="text-xs font-bold text-purple-400">94.50% Calibrated</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Exposure State Panel */}
                  <div className="bg-purple-950/10 border border-purple-900/30 rounded-xl p-4.5">
                    <div className="text-slate-400 text-[10px] font-mono uppercase tracking-wider font-bold">// DISCOVERED EXPOSURE BLAST RADIUS</div>
                    <div className="flex items-center space-x-1.5 mt-1">
                      <span className={`${(simState === "choke-point" || simState === "remediating") ? "text-red-500 font-black text-lg" : simState === "success" ? "text-emerald-400 font-black text-lg" : "text-slate-300 text-lg"}`}>$</span>
                      <span className={`text-3xl font-black ${
                        (simState === "choke-point" || simState === "remediating") ? "text-red-500 animate-pulse"
                        : simState === "success" ? "text-emerald-400"
                        : "text-white"
                      }`}>
                        {simState === "success" ? "0.00" : displayRisk.toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </span>
                    </div>
                  </div>

                  {/* Financial Risk Ledger Breakdown */}
                  <div className="bg-slate-950/60 border border-purple-950/15 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2">
                    <div className="text-slate-200 font-bold border-b border-purple-950/10 pb-1.5 uppercase tracking-wider">// Financial Risk Ledger</div>
                    <div className="flex justify-between">
                      <span>PCI-DSS Cardholder Liability:</span>
                      <span className={simState === "success" ? "text-emerald-400" : "text-red-400 font-bold"}>
                        {simState === "success" ? "$0.00" : `$${SCENARIO_DATA[selectedScenario].pciLiability.toLocaleString(undefined, {minimumFractionDigits: 2})}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>GDPR/KVKK Personal Data Fine:</span>
                      <span className={simState === "success" ? "text-emerald-400" : "text-red-400 font-bold"}>
                        {simState === "success" ? "$0.00" : `$${SCENARIO_DATA[selectedScenario].gdprFine.toLocaleString(undefined, {minimumFractionDigits: 2})}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>SLA Breach Contractual Penalty:</span>
                      <span className={simState === "success" ? "text-emerald-400" : "text-red-400 font-bold"}>
                        {simState === "success" ? "$0.00" : `$${SCENARIO_DATA[selectedScenario].slaPenalty.toLocaleString(undefined, {minimumFractionDigits: 2})}`}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1.5 border-t border-purple-950/10 text-slate-200 font-bold text-sm">
                      <span>Total Combined Risk:</span>
                      <span className={simState === "success" ? "text-emerald-400 font-extrabold" : "text-red-400 font-extrabold"}>
                        {simState === "success" ? "$0.00" : `$${SCENARIO_DATA[selectedScenario].initialRisk.toLocaleString(undefined, {minimumFractionDigits: 2})}`}
                      </span>
                    </div>
                  </div>

                  {/* Choke Point Node Banner */}
                  {(simState === "choke-point" || simState === "remediating" || simState === "success") && (
                    <div className={`p-4 rounded-xl border font-mono text-xs leading-relaxed transition-all ${
                      simState === "success" 
                        ? "bg-emerald-950/10 border-emerald-900/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                        : "bg-red-950/15 border-red-900/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)] animate-pulse"
                    }`}>
                      <div className="font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between text-xs">
                        <span>{simState === "success" ? "Remediation Successful" : "Remediation Proposal (SPR)"}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${simState === "success" ? "bg-emerald-400" : "bg-red-500"}`} />
                      </div>
                      <div>
                        <strong>Target Choke Point:</strong> <code className="bg-slate-900 px-1 py-0.5 rounded text-white">{SCENARIO_DATA[selectedScenario].chokePoint}</code>
                      </div>
                      <div className="mt-1">
                        <strong>UAEU Financial Union:</strong> ${SCENARIO_DATA[selectedScenario].initialRisk.toLocaleString(undefined, {minimumFractionDigits: 2})} (Set Union protected)
                      </div>
                      <div className="mt-1">
                        <strong>Remediation Labor Cost:</strong> ${(20 * SCENARIO_DATA[selectedScenario].roleRate / 60).toFixed(2)} (20m @ ${SCENARIO_DATA[selectedScenario].roleRate}/hr)
                      </div>
                      <div className="mt-1 text-slate-300">
                        <strong>Net ROI Return:</strong> <span className="text-emerald-400 font-bold">+99.8%</span> ($1.7M saved / $1 spent)
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-purple-950/10 pt-4 mt-4">
                {simState === "idle" && (
                  <div className="text-center text-slate-500 text-[10px] italic">
                    Start simulator to compute metrics.
                  </div>
                )}
                {simState === "scanning" && (
                  <div className="bg-purple-950/5 border border-purple-900/20 p-3 rounded-lg text-center">
                    <span className="text-[10px] font-mono text-purple-400 animate-pulse">
                      Analyzing Stage: {mainModules[currentModuleIndex]?.title || "..."}
                    </span>
                  </div>
                )}
                {simState === "choke-point" && (
                  <button
                    onClick={applyRemediation}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg hover:shadow-red-600/20 transition-all cursor-pointer"
                  >
                    <span>Execute Auto-Remediation (TF Apply)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {simState === "remediating" && (
                  <div className="w-full bg-slate-900 border border-purple-950/30 text-slate-400 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                    <span>Applying Terraform Delta...</span>
                  </div>
                )}
                {simState === "success" && (
                  <div className="bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 p-4 rounded-lg flex items-start space-x-3 backdrop-blur-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-black text-xs">Vulnerability Resolved</h4>
                      <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                        Risk reduced to $0. Safe rollbacks anchored securely in cryptographic ledgers.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <ComplianceTimeline simState={simState} logs={logs} selectedScenario={selectedScenario} isInsideGrid={true} />
          </div>
        </div>
      </section>

      <DetailsModal 
        activeModal={activeModal} 
        closeModal={closeModal} 
        campaignsView={campaignsView} 
        setCampaignsView={setCampaignsView} 
        switchView={switchView} 
      />

      <footer className="border-t border-purple-950/10 bg-slate-950/80 py-10 text-center text-xs font-mono text-slate-600 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Kassandra Platform Architecture. All rights reserved.</div>
          <div className="flex items-center space-x-2 text-slate-500 bg-purple-950/5 border border-purple-950/10 px-3 py-1 rounded-full">
            <CheckCircle className="w-4 h-4 text-purple-400" />
            <span>Kassandra's Prophecy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}