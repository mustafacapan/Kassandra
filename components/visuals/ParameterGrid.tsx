"use client";

import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Building,
  Coins,
  Scale,
  Shield,
  TrendingDown,
  Users,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PARAMETERS = [
  { id: "sector", Icon: Building },
  { id: "customers", Icon: Users },
  { id: "market", Icon: TrendingDown },
  { id: "insurance", Icon: Shield },
  { id: "legal", Icon: Scale },
  { id: "simulation", Icon: Activity },
  { id: "currency", Icon: Coins },
  { id: "breach", Icon: AlertTriangle },
];

export default function ParameterGrid() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full rounded-2xl bg-white p-2 shadow-[var(--shadow-card)]"
    >
      <div className="rounded-xl bg-white px-5 py-5">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981]">
          ParameterGrid
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {PARAMETERS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
              className="group rounded-xl border border-[rgba(43,83,114,0.10)] bg-[#E8EDF2] p-4 text-center transition-[background-color,box-shadow] duration-200 hover:bg-[#2B5372] hover:shadow-[var(--shadow-card-hover)]"
            >
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white transition-colors duration-200 group-hover:bg-white/10">
                <p.Icon className="h-5 w-5 text-[#2B5372] transition-colors duration-200 group-hover:text-white" aria-hidden />
              </span>
              <p className="mb-1 text-xs font-semibold text-[#1A2834] transition-colors duration-200 group-hover:text-white">
                {t(`kee.param.${p.id}`)}
              </p>
              <p className="text-[10px] leading-tight text-[#7A8A98] transition-colors duration-200 group-hover:text-white/70">
                {t(`kee.param.${p.id}.sub`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
