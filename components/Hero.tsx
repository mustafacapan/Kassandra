import { motion } from "framer-motion";
import { Terminal, Play, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  heroIndex: number;
  heroTexts: Array<{ line1: string; line2: string }>;
}

export default function Hero({ heroIndex, heroTexts }: HeroProps) {
  return (
    <div className="lg:col-span-5 flex flex-col text-left lg:sticky lg:top-32 antialiased">
      <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6 tracking-widest uppercase w-fit">
        <Terminal className="w-3.5 h-3.5" />
        <span>// NEXT-GEN CNAPP FRAMEWORK</span>
      </span>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-white text-shadow-sm min-h-[140px] md:min-h-[120px] relative overflow-hidden flex flex-col justify-center">
        <motion.div
          key={heroIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full"
        >
          {heroTexts[heroIndex].line1} <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            {heroTexts[heroIndex].line2}
          </span>
        </motion.div>
      </h1>

      <p className="text-slate-300 text-base leading-relaxed font-light mb-8 max-w-lg">
        Kassandra Prophecy is an enterprise-grade CNAPP platform designed to map complex, multi-account cloud infrastructures into real-time directed graphs. By executing sub-millisecond path analysis and identifying tactical choke points, it isolates critical exposure and eliminates alert fatigue.
      </p>

      <div className="flex flex-col gap-3.5 mb-8 w-fit">
        <a
          href="#simulator-section"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs px-6 py-4 rounded-xl transition-all shadow-xl shadow-indigo-600/10 flex items-center justify-center space-x-2 group w-full"
        >
          <span>Launch Live Threat Simulator</span>
          <Play className="w-3.5 h-3.5 text-indigo-400" />
        </a>
        <Link
          href="/pictures"
          className="bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white border border-purple-900/30 hover:border-purple-500/40 font-bold text-xs px-6 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 w-full group shadow-md"
        >
          <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
          <span>View Platform Pictures / Sandbox</span>
        </Link>
      </div>

      <div className="border-t border-purple-955/25 pt-6 space-y-4 text-xs font-mono text-slate-400">
        <div className="flex items-start space-x-3">
          <span className="text-purple-400 font-bold bg-purple-950/40 border border-purple-900/30 px-2 py-0.5 rounded text-[10px] min-w-[90px] text-center">// SYSTEM</span>
          <span className="leading-relaxed text-slate-300 font-bold">Consolidates alerting noise loops by 95% using multi-hop graph pruning.</span>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] min-w-[90px] text-center">// METRICS</span>
          <span className="leading-relaxed text-slate-300 font-bold">Quantifies total asset exposure in monetary terms based on active compliance liability.</span>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded text-[10px] min-w-[90px] text-center">// STREAM</span>
          <span className="leading-relaxed text-slate-300 font-bold">Processes continuous AWS CloudTrail and eBPF events with sub-second ingestion latency (GCP/Azure integration in beta).</span>
        </div>
      </div>
    </div>
  );
}
