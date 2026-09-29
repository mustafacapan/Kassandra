"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Camera,
  CheckCircle,
  Globe,
  Layers,
  Network,
  RefreshCw,
  Shield,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import AgentlessSimulator from "@/components/showcase/AgentlessSimulator";

const STAGES = [
  { Icon: Camera, titleKey: "platform.agentless.stage1.title", bodyKey: "platform.agentless.stage1.body" },
  { Icon: Network, titleKey: "platform.agentless.stage2.title", bodyKey: "platform.agentless.stage2.body" },
  { Icon: Layers, titleKey: "platform.agentless.stage3.title", bodyKey: "platform.agentless.stage3.body" },
  { Icon: Shield, titleKey: "platform.agentless.stage4.title", bodyKey: "platform.agentless.stage4.body" },
];

const BENEFITS = [
  { Icon: Zap, titleKey: "platform.agentless.benefit1.title", bodyKey: "platform.agentless.benefit1.body" },
  { Icon: ShieldCheck, titleKey: "platform.agentless.benefit2.title", bodyKey: "platform.agentless.benefit2.body" },
  { Icon: Globe, titleKey: "platform.agentless.benefit3.title", bodyKey: "platform.agentless.benefit3.body" },
  { Icon: RefreshCw, titleKey: "platform.agentless.benefit4.title", bodyKey: "platform.agentless.benefit4.body" },
  { Icon: TrendingUp, titleKey: "platform.agentless.benefit5.title", bodyKey: "platform.agentless.benefit5.body" },
];

const GEN_ROWS = ["install", "impact", "mount", "az", "data", "second"] as const;

function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
        {eyebrow}
      </p>
      <h2 className="apple-headline text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
        {title}
      </h2>
      {body && <p className="mt-3 text-base leading-relaxed text-[#4A5A68]">{body}</p>}
    </div>
  );
}

function AgentlessContent() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const fade = reduced ? { opacity: 0 } : { opacity: 0, y: 14 };

  return (
    <main className="min-h-screen bg-[#F4F6F8] text-[#1A2834]">
      <div className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
        <motion.div
          initial={fade}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <Link
            href="/"
            className="mb-6 inline-block text-sm font-semibold text-[#2B5372] transition-colors duration-150 hover:text-[#1E3F58]"
          >
            {t("platform.back")}
          </Link>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
            {t("platform.agentless.eyebrow")}
          </p>
          <h1 className="apple-headline text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-5xl">
            {t("platform.agentless.title")}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4A5A68] md:text-lg">
            {t("platform.agentless.body")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-energy active:scale-[0.96]">
              {t("platform.agentless.cta.primary")} →
            </Link>
            <a
              href="#benchmark"
              className="inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#2B5372] transition-opacity duration-150 hover:opacity-75"
            >
              {t("platform.agentless.cta.secondary")} ↓
            </a>
          </div>
        </motion.div>
      </div>

      <section className="bg-[#F4F6F8] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AgentlessSimulator />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <SectionHead
          eyebrow={t("platform.agentless.how.eyebrow")}
          title={t("platform.agentless.how.title")}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s, i) => (
            <motion.div
              key={s.titleKey}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              className="rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-6 shadow-[var(--shadow-card)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10B981]/10">
                <s.Icon className="h-5 w-5 text-[#10B981]" aria-hidden />
              </span>
              <p className="apple-headline mt-4 text-lg font-semibold tracking-tight text-[#1A2834]">
                {t(s.titleKey)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#4A5A68]">{t(s.bodyKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#E8EDF2] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead
            eyebrow={t("platform.agentless.problem.eyebrow")}
            title={t("platform.agentless.problem.title")}
            body={t("platform.agentless.problem.body")}
          />
          <div className="overflow-x-auto rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#E8EDF2]">
                  <th className="px-4 py-3" />
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#4A5A68]">
                    {t("platform.agentless.problem.col1")}
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#4A5A68]">
                    {t("platform.agentless.problem.col2")}
                  </th>
                  <th className="bg-[#10B981]/10 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#10B981]">
                    {t("platform.agentless.problem.col3")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {GEN_ROWS.map((r) => (
                  <tr key={r} className="border-t border-[rgba(43,83,114,0.10)]">
                    <td className="px-4 py-3 font-semibold text-[#1A2834]">
                      {t(`platform.agentless.problem.row.${r}`)}
                    </td>
                    <td className="px-4 py-3 text-[#4A5A68]">{t(`platform.agentless.problem.cell.${r}.c1`)}</td>
                    <td className="px-4 py-3 text-[#4A5A68]">{t(`platform.agentless.problem.cell.${r}.c2`)}</td>
                    <td className="bg-[#10B981]/[0.06] px-4 py-3 font-semibold text-[#1A2834]">
                      <span className="mr-1.5 inline-block text-[#10B981]" aria-hidden>✓</span>
                      {t(`platform.agentless.problem.cell.${r}.c3`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <SectionHead
          eyebrow={t("platform.agentless.why.eyebrow")}
          title={t("platform.agentless.why.title")}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.titleKey}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              className="flex gap-4 rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-6 shadow-[var(--shadow-card)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10B981]/10">
                <b.Icon className="h-5 w-5 text-[#10B981]" aria-hidden />
              </span>
              <span>
                <span className="block text-base font-semibold text-[#1A2834]">
                  {t(b.titleKey)}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-[#4A5A68]">
                  {t(b.bodyKey)}
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="benchmark" className="bg-[#E8EDF2] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead
            eyebrow={t("platform.agentless.proof.eyebrow")}
            title={t("platform.agentless.proof.title")}
            body={t("platform.agentless.proof.body")}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "100 GB", label: t("platform.agentless.proof.metric1") },
              { value: "50 GB", label: t("platform.agentless.proof.metric2") },
              { value: "< 30 min", label: t("platform.agentless.proof.metric3") },
              { value: "Zero", label: t("platform.agentless.proof.metric4") },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-6 shadow-[var(--shadow-card)]"
              >
                <p className="text-4xl font-semibold tabular-nums tracking-tight text-[#2B5372] md:text-5xl">
                  {m.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-[#7A8A98]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: "51 min", k: "platform.agentless.proof.t1" },
              { v: "50 sec", k: "platform.agentless.proof.t2" },
              { v: "26 min", k: "platform.agentless.proof.t3" },
              { v: "25 sec", k: "platform.agentless.proof.t4" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-xl bg-white/70 px-4 py-3 text-center shadow-[0_0_0_1px_rgba(43,83,114,0.10)]"
              >
                <p className="text-lg font-semibold tabular-nums text-[#1A2834]">{s.v}</p>
                <p className="text-[11px] uppercase text-[#7A8A98]">{t(s.k)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl border border-[#10B981]/20 bg-[#10B981]/[0.04] p-6 md:grid-cols-3">
            <div className="text-center">
              <p className="text-2xl font-semibold tabular-nums text-[#1A2834]">47 + 100</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-[#7A8A98]">
                {t("platform.agentless.proof.findings")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold tabular-nums text-[#1A2834]">0 / 0</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-[#7A8A98]">
                {t("platform.agentless.proof.integrity")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold tabular-nums text-[#10B981]">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-[#7A8A98]">
                {t("platform.agentless.proof.accuracy")}
              </p>
            </div>
          </div>

          <ul className="mx-auto mt-8 max-w-2xl space-y-2 text-sm text-[#4A5A68]">
            {t("platform.agentless.proof.dataset")
              .split("|")
              .map((line: string) => (
                <li key={line} className="flex gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" aria-hidden />
                  <span>{line.trim()}</span>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
        <h2 className="apple-headline mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
          {t("platform.agentless.finalCta.title")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[#4A5A68]">
          {t("platform.agentless.finalCta.body")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-energy active:scale-[0.96]">
            {t("platform.agentless.finalCta.primary")} →
          </Link>
          <Link
            href="/blog/anatomy-of-agentless"
            className="inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#2B5372] transition-opacity duration-150 hover:opacity-75"
          >
            {t("platform.agentless.finalCta.secondary")} →
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function AgentlessPage() {
  return (
    <I18nProvider>
      <AgentlessContent />
    </I18nProvider>
  );
}
