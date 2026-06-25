"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Maximize2, 
  X, 
  Cpu, 
  ShieldAlert, 
  Activity, 
  Brain, 
  Database, 
  ShieldCheck, 
  Network,
  TrendingUp
} from "lucide-react";
import Header from "../../components/Header";
import Link from "next/link";

// Modules data structure with matching icons and descriptive, contextual sub-labels (3-5 words)
interface ModuleCategory {
  id: string;
  title: string;
  description: string;
  status?: string;
  color: string; // Tailwind color name for shadows/borders
  glowColor: string; // RGB/HEX for glow effects
  icon: any;
  images: { src: string; alt: string; label: string }[];
}

const MODULES_DATA: ModuleCategory[] = [
  {
    id: "auto-fix",
    title: "Auto-Fix Pipeline",
    description: "Dual-strategy automated security posture remediation running AWS SDK & Terraform HCL rollback workflows.",
    color: "fuchsia",
    glowColor: "rgba(217, 70, 239, 0.4)",
    icon: ShieldCheck,
    images: [
      { src: "/modules/for-AUTO_FİX_PİPELİNE/capture_2026-06-23_005940.png", alt: "AST-validated code review with manual approval safeguards.", label: "SECURE APPROVAL GATE" },
      { src: "/modules/for-AUTO_FİX_PİPELİNE/capture_2026-06-23_010421.png", alt: "Verifying live environment fixes with safe rollback restore points.", label: "AUTOMATED REMEDIATION & ROLLBACK" },
      { src: "/modules/for-AUTO_FİX_PİPELİNE/capture_2026-06-23_010511.png", alt: "Catching infrastructure strategy mismatches before execution failures.", label: "FAIL-SAFE POLICY ENFORCEMENT" }
    ]
  },
  {
    id: "campaigns",
    title: "Campaigns & Threat Intel Scenarios",
    description: "Consolidation of discrete alert events into MITRE ATT&CK mapped threat intelligence graphs.",
    color: "red",
    glowColor: "rgba(239, 68, 68, 0.4)",
    icon: ShieldAlert,
    images: [
      { src: "/modules/for-CAMPAİGNS/capture_2026-06-23_001428.png", alt: "Grouping isolated exploit paths into coordinated enterprise threat campaigns.", label: "ATTACK CAMPAIGN CORRELATION" },
      { src: "/modules/for-CAMPAİGNS/capture_2026-06-23_003942.png", alt: "Visualizing lateral movement nodes and identifying critical choke points.Powered by local Llama 3.", label: "ATTACK GRAPH CHOKE POINTS" },
      { src: "/modules/for-CAMPAİGNS/capture_2026-06-23_004200.png", alt: "Multi-hop alert validation dashboard and evidence summary.", label: "THREAT INTEL ATTRIBUTION" },
      { src: "/modules/for-CAMPAİGNS/capture_2026-06-23_004226.png", alt: "Correlating discovered posture flaws with real-world threat actor TTPs.", label: "THREAT PLAYBOOK VALIDATION" }
    ]
  },
  {
    id: "choke-points",
    title: "Choke Points",
    status: "Private Beta",
    description: "High-ROI mathematical centrality calculation that identifies single points of maximum security exposure.",
    color: "amber",
    glowColor: "rgba(245, 158, 11, 0.4)",
    icon: Network,
    images: [
      { src: "/modules/for-CHOKE_POİNTS/capture_2026-06-23_152545.png", alt: "Isolating identity-based convergence nodes to sever threat paths. Early-preview of our automated Choke Point Engine.", label: "IDENTITY CHOKE POINT ANALYSIS" },
      { src: "/modules/for-CHOKE_POİNTS/capture_2026-06-23_152600.png", alt: "Enforcing host-level mitigations on intersecting exploit routes. Early-preview of our automated Choke Point Engine.", label: "COMPUTE CHOKE POINT ANALYSIS" }
    ]
  },
  {
    id: "cyber-ai-analyst",
    title: "Cyber-AI Analyst",
    status: "Under Development",
    description: "Autonomous LLM reasoning engine evaluating security graphs and explaining remediation strategies.",
    color: "violet",
    glowColor: "rgba(139, 92, 246, 0.4)",
    icon: Brain,
    images: [
      { src: "/modules/for-CYBER_AI_ANALYST/capture_2026-06-23_004947.png", alt: "AI-driven attack path analysis and automated remediation. Powered by local Ollama & Llama 3.", label: "CYBER AI PATH ANALYST" },
    ]
  },
  {
    id: "dspm",
    title: "DSPM Control Center",
    description: "Content-aware sensitive resource discovery scanning S3 buckets for PII, PCI and GDPR governance drift.",
    color: "blue",
    glowColor: "rgba(59, 130, 246, 0.4)",
    icon: Database,
    images: [
      { src: "/modules/for-DSPM/capture_2026-06-23_134159.png", alt: "Tracking high-volume sensitive data discoveries across cloud storage.", label: "LARGE-SCALE POSTURE OVERVIEW" },
      { src: "/modules/for-DSPM/capture_2026-06-23_135013.png", alt: "Classifying localized financial identifiers and structural compliance data.", label: "NATIONAL IDENTIFIER INVENTORY" },
      { src: "/modules/for-DSPM/capture_2026-06-23_135202.png", alt: "Detecting exposed hardcoded credentials, secret keys, and tokens.", label: "HIGH-CRITICALITY SECRET DISCOVERY" },
      { src: "/modules/for-DSPM/capture_2026-06-23_135312.png", alt: "Identifying leaky third-party integration tokens and environment secrets.", label: "API & TOKEN POSTURE MANAGEMENT" },
      { src: "/modules/for-DSPM/capture_2026-06-23_135426.png", alt: "Scanning cross-border compliance data types like BSN and MyNumber.", label: "GLOBAL MULTI-REGIONAL FINDINGS" },
      { src: "/modules/for-DSPM/capture_2026-06-23_135448.png", alt: "Uncovering deep infrastructure secrets, API backdoors, and payment risks.", label: "FINANCIAL POSTURE DISCOVERY" }
    ]
  },
  {
    id: "ebpf",
    title: "eBPF Sensor",
    status: "Private Beta",
    description: "Kernel-level system call auditing and real-time egress network filtering at container layers.",
    color: "cyan",
    glowColor: "rgba(6, 182, 212, 0.4)",
    icon: Activity,
    images: [
      { src: "/modules/for-eBPF/capture_2026-06-23_011333.png", alt: "Configuring eBPF protection and agent deployments.", label: "TENANT SSM SCRIPT CONFIGURATION" },
      { src: "/modules/for-SURFACE_MAP/capture_2026-06-23_153409.png", alt: "Enforcing kernel socket and process access controls.", label: "EBPF AGENT DRIVEN EVENT LOGS" }
    ]
  },
  {
    id: "compliance-finops",
    title: "Compliance & FinOps Dashboard",
    description: "Translating technical security posture vulnerabilities into concrete financial exposure blast radius metrics.",
    color: "emerald",
    glowColor: "rgba(16, 185, 129, 0.4)",
    icon: TrendingUp,
    images: [
      { src: "/modules/for-FİNOPS/capture_2026-06-23_132235.png", alt: "Compliance, Historical Trends and Control Checklists", label: "Compliance Standarts Overview" },
      { src: "/modules/for-FİNOPS/capture_2026-06-23_132500.png", alt: "Monthly Cost, Savings Based on S3 Packages and Manual or Auto-Fix Repair Suggestions ", label: "FinOps Optimizer" },
      { src: "/modules/for-FİNOPS/capture_2026-06-23_132651.png", alt: "Simulating compliance policies against infrastructure states.", label: "COMPLIANCE-AS-CODE COMPILER Policy Dry-Run" }
    ]
  },
  {
    id: "surface-map",
    title: "Surface Map & APVE",
    description: "Cloud attack path visualizers (APVE) detailing vulnerabilities, credentials, and network flows.",
    color: "orange",
    glowColor: "rgba(249, 115, 22, 0.4)",
    icon: Cpu,
    images: [
      { src: "/modules/for-APVE/capture_2026-06-23_025706.png", alt: "Eliminating false positives via automated validation.", label: "ATTACK PATH VALIDATION ENGINE" },
      { src: "/modules/for-SURFACE_MAP/capture_2026-06-23_004513.png", alt: "Context-aware data risk assessment and financial impact.", label: "DSPM & BCE DATA PROTECTION" },
      { src: "/modules/for-SURFACE_MAP/capture_2026-06-23_004523.png", alt: "Context-aware data risk assessment and financial impact.", label: "DSPM & BCE DATA PROTECTION" },
      { src: "/modules/for-SURFACE_MAP/capture_2026-06-23_153238.png", alt: "Attack Path View And Kassandra's Dashboard", label: "Surface Map (Attack Path Viewer)" },
      { src: "/modules/for-SURFACE_MAP/capture_2026-06-23_153321.png", alt: "-Security findings and remediation recommendations, What-İf Simulator", label: "Surface Map (Attack Path Viewer)" }
    ]
  }
];

export default function PicturesPage() {
  const [selectedModule, setSelectedModule] = useState<ModuleCategory | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; label: string } | null>(null);

  // Glow shadows and border colors for Category Cards in standing (non-hover) and hover states
  const getBorderClass = (color: string) => {
    const borders: Record<string, string> = {
      fuchsia: "border-fuchsia-500/30 hover:border-fuchsia-400/80 hover:shadow-[0_0_35px_rgba(217,70,239,0.3)] shadow-[0_0_15px_rgba(217,70,239,0.08)]",
      red: "border-red-500/30 hover:border-red-400/80 hover:shadow-[0_0_35px_rgba(239,68,68,0.3)] shadow-[0_0_15px_rgba(239,68,68,0.08)]",
      amber: "border-amber-500/30 hover:border-amber-400/80 hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] shadow-[0_0_15px_rgba(245,158,11,0.08)]",
      violet: "border-violet-500/30 hover:border-violet-400/80 hover:shadow-[0_0_35px_rgba(139,92,246,0.3)] shadow-[0_0_15px_rgba(139,92,246,0.08)]",
      blue: "border-blue-500/30 hover:border-blue-400/80 hover:shadow-[0_0_35px_rgba(59,130,246,0.3)] shadow-[0_0_15px_rgba(59,130,246,0.08)]",
      cyan: "border-cyan-500/30 hover:border-cyan-400/80 hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] shadow-[0_0_15px_rgba(6,182,212,0.08)]",
      emerald: "border-emerald-500/30 hover:border-emerald-400/80 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] shadow-[0_0_15px_rgba(16,185,129,0.08)]",
      orange: "border-orange-500/30 hover:border-orange-400/80 hover:shadow-[0_0_35px_rgba(249,115,22,0.3)] shadow-[0_0_15px_rgba(249,115,22,0.08)]",
    };
    return borders[color] || borders.purple;
  };

  // Styled borders & glow classes for Modal Images (Phase 2 contents)
  const getModalImageBorderClass = (color: string) => {
    const borders: Record<string, string> = {
      fuchsia: "border-fuchsia-500/20 hover:border-fuchsia-400/60 shadow-[0_0_20px_rgba(217,70,239,0.15)]",
      red: "border-red-500/20 hover:border-red-400/60 shadow-[0_0_20px_rgba(239,68,68,0.15)]",
      amber: "border-amber-500/20 hover:border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.15)]",
      violet: "border-violet-500/20 hover:border-violet-400/60 shadow-[0_0_20px_rgba(139,92,246,0.15)]",
      blue: "border-blue-500/20 hover:border-blue-400/60 shadow-[0_0_20px_rgba(59,130,246,0.15)]",
      cyan: "border-cyan-500/20 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.15)]",
      emerald: "border-emerald-500/20 hover:border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
      orange: "border-orange-500/20 hover:border-orange-400/60 shadow-[0_0_20px_rgba(249,115,22,0.15)]",
    };
    return borders[color] || borders.purple;
  };

  const getTextColor = (color: string) => {
    const texts: Record<string, string> = {
      fuchsia: "text-fuchsia-400",
      red: "text-red-400",
      amber: "text-amber-400",
      violet: "text-violet-400",
      blue: "text-blue-400",
      cyan: "text-cyan-400",
      emerald: "text-emerald-400",
      orange: "text-orange-400",
    };
    return texts[color] || "text-purple-400";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden selection:bg-purple-500/40 selection:text-purple-300">
      {/* Decorative Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none z-0" />
      
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 text-xs font-mono text-slate-500 hover:text-purple-400 transition-colors group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-2">// KASSANDRA SECURE CONSOLES</span>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">Module Screenshots & Telemetry Screens</h1>
          <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-xs font-light leading-relaxed">
            Live views, runtime state machines, and DSPM analysis dashboards captured directly from running environments.
          </p>
        </div>

        {/* Categories Grid (Phase 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES_DATA.map((module) => {
            const Icon = module.icon;
            const borderClass = getBorderClass(module.color);
            const textClass = getTextColor(module.color);
            
            return (
              <motion.div
                key={module.id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedModule(module)}
                className={`bg-slate-900/40 border p-6 rounded-2xl transition-all flex flex-col justify-between text-left cursor-pointer group ${borderClass}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-slate-950/60 border border-slate-800 ${textClass}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {module.status && (
                      <span className="px-2.5 py-0.5 rounded-full text-[8.5px] font-mono font-bold bg-amber-950/30 text-amber-400 border border-amber-900/25 tracking-wider animate-pulse">
                        {module.status}
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-lg text-white mb-2 group-hover:text-white/90 transition-colors leading-tight">
                    {module.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
                    {module.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-purple-950/10 font-mono text-[10px]">
                  <span className="text-slate-500">{module.images.length} Captures Available</span>
                  <span className={`${textClass} font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1`}>
                    Browse Gallery &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Informational Compliance Footer Disclaimer - Centered & Corrected */}
        <div className="mt-20 max-w-4xl mx-auto p-8 rounded-2xl bg-slate-900/60 border-2 border-purple-500/40 text-center shadow-[0_0_25px_rgba(168,85,247,0.15)] backdrop-blur-md">
          <p className="text-xs font-mono text-slate-200 leading-relaxed max-w-3xl mx-auto">
            <strong className="text-purple-400 uppercase tracking-wider block mb-2 font-black">// Disclaimer & Sanitization Framework //</strong>
            The environments displayed below represent simulated global corporate infrastructures.
            In accordance with strict compliance frameworks (including GDPR, KVKK, and PCI-DSS), all sensitive operational vectors, resource names (kassandra-mock-*, etc...),
            and identities have been sanitized and replaced with dummy variables to demonstrate Kassandra's enterprise posture management without compromising infrastructure security.
          </p>
        </div>
      </main>

      {/* Modal - Module Content (Phase 2) */}
      <AnimatePresence>
        {selectedModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModule(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900/95 border border-purple-900/40 rounded-3xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col relative overflow-hidden backdrop-blur-xl z-10"
            >
              {/* Header */}
              <div className="p-6 border-b border-purple-955/10 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest block mb-1">
                    // MODULE DOCUMENTATION GALLERY
                  </span>
                  <h2 className="text-xl font-black text-white">{selectedModule.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="p-2 rounded-lg bg-slate-950/40 border border-purple-955/20 hover:border-purple-800 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable grid area for Screenshots */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedModule.images.map((img, index) => {
                    const borderClass = getModalImageBorderClass(selectedModule.color);
                    const textClass = getTextColor(selectedModule.color);
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={`group cursor-pointer bg-slate-955/40 border rounded-xl overflow-hidden transition-all relative shadow-lg ${borderClass}`}
                        onClick={() => setLightboxImage(img)}
                      >
                        {/* Image aspect-ratio with 15% blur as requested */}
                        <div className="aspect-[16/10] w-full bg-slate-950 relative overflow-hidden flex items-center justify-center">
                          <img 
                            src={img.src} 
                            alt={img.alt} 
                            className="object-cover w-full h-full filter blur-[1.5px] group-hover:blur-none transition-all duration-500 group-hover:scale-103" 
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-30 group-hover:opacity-0 transition-opacity" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                            <div className="p-2 rounded-full bg-slate-900/80 border border-purple-500/30 text-purple-400 shadow-md">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                        {/* Contextual description labels (3-5 words) */}
                        <div className="p-3 border-t border-purple-955/10 bg-slate-905/60 flex flex-col justify-between h-14">
                          <span className={`font-mono text-[9px] font-bold uppercase ${textClass}`}>
                            {img.label}
                          </span>
                          <span className="text-[7.5px] font-mono text-slate-500 truncate">
                            {img.alt}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer warning */}
              <div className="p-4 border-t border-purple-955/10 bg-slate-950/40 font-mono text-[8px] text-slate-500 text-center">
                All visualized resources and account variables (e.g. AWS credentials) shown above are fully simulated mock parameters.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox - Phase 3 */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm"
            />

            {/* Lightbox container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center justify-center z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 border border-purple-500/30 text-slate-400 hover:text-slate-200 transition-colors shadow-2xl hover:scale-105"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Large Image */}
              <div className="bg-slate-900 border border-purple-500/20 p-2 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.15)] max-w-full max-h-[85vh] overflow-hidden flex flex-col justify-center items-center">
                <img 
                  src={lightboxImage.src} 
                  alt={lightboxImage.alt} 
                  className="max-w-full max-h-[75vh] object-contain rounded-lg"
                />
                <div className="mt-3.5 px-4 pb-1 text-center font-mono text-xs text-slate-400 max-w-xl">
                  {lightboxImage.alt}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
