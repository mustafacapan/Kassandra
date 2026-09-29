"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code,
  Database,
  Gauge,
  KeyRound,
  Languages,
  Lock,
  Server,
  Shield,
  Swords,
  Telescope,
  type LucideIcon,
} from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import KIEDemo from "@/components/showcase/KIEDemo";

const AGENTS: Array<{ key: string; Icon: LucideIcon }> = [
  { key: "triage", Icon: Gauge },
  { key: "researcher", Icon: BookOpen },
  { key: "remediation", Icon: Code },
];

const AGENTS_AFTER: Array<{ key: string; Icon: LucideIcon }> = [
  { key: "prophecy", Icon: Telescope },
  { key: "policy", Icon: Shield },
];

const TRANSPARENCY: Array<{ key: string; Icon: LucideIcon; accent: "mint" | "blue" }> = [
  { key: "1", Icon: Lock, accent: "mint" },
  { key: "2", Icon: KeyRound, accent: "mint" },
  { key: "3", Icon: Server, accent: "mint" },
  { key: "4", Icon: CheckCircle2, accent: "mint" },
  { key: "5", Icon: Database, accent: "blue" },
  { key: "6", Icon: Languages, accent: "blue" },
];

function Arrow() {
  return (
    <span className="flex items-center justify-center" aria-hidden>
      <ChevronRight className="h-4 w-4 rotate-90 text-[#7A8A98] md:rotate-0" />
    </span>
  );
}

function AgentCard({ nameKey, roleKey, Icon }: { nameKey: string; roleKey: string; Icon: LucideIcon }) {
  const { t } = useI18n();
  return (
    <div className="flex-1 rounded-2xl border border-black/[0.06] bg-[#F4F6F8] p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
        <Icon className="h-5 w-5 text-[#2B5372]" aria-hidden />
      </span>
      <p className="mt-3 text-sm font-semibold text-[#1A2834]">{t(nameKey)}</p>
      <p className="mt-1 text-xs leading-relaxed text-[#7A8A98]">{t(roleKey)}</p>
    </div>
  );
}

function KieContent() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const fade = (i: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-6%" } as const,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  });

  return (
    <main className="min-h-screen bg-[#F4F6F8] text-[#1A2834]">
      {/* ── BLOK 1 · Hero ─────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <Link
            href="/"
            className="mb-6 inline-block text-sm font-semibold text-[#2B5372] transition-colors duration-150 hover:text-[#1E3F58]"
          >
            {t("platform.back")}
          </Link>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
            {t("platform.kie.hero.eyebrow")}
          </p>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1.5 text-xs font-semibold text-[#10B981]">
            {!reduced && (
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
              </span>
            )}
            {reduced && <span className="h-2 w-2 rounded-full bg-[#10B981]" aria-hidden />}
            <Lock className="h-3.5 w-3.5" aria-hidden />
            {t("platform.kie.hero.badge")}
          </span>
          <h1 className="apple-headline mt-4 text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-5xl">
            {t("platform.kie.hero.title")}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4A5A68] md:text-lg">
            {t("platform.kie.hero.body")}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#live-demo" className="btn-energy">
              {t("platform.kie.hero.cta1")}
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#2B5372] transition-opacity duration-150 hover:opacity-75"
            >
              {t("platform.kie.hero.cta2")}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── BLOK 2 · 5 ajan ───────────────────────────── */}
      <div className="mx-auto mt-16 max-w-7xl rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
        <motion.div {...fade(0)} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
            {t("platform.kie.architecture.eyebrow")}
          </p>
          <h2 className="apple-headline mt-2 text-balance text-2xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
            {t("platform.kie.architecture.title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4A5A68] md:text-base">
            {t("platform.kie.architecture.body")}
          </p>
        </motion.div>
        <motion.div {...fade(1)} className="mt-6 flex flex-col items-stretch gap-3 md:flex-row">
          {AGENTS.map((a) => (
            <AgentCard key={a.key} nameKey={`platform.kie.agent.${a.key}.name`} roleKey={`platform.kie.agent.${a.key}.role`} Icon={a.Icon} />
          ))}
          <Arrow />
          <div className="w-full rounded-2xl border border-[#E07A5F]/20 bg-[#E07A5F]/[0.06] p-4 md:max-w-[160px] md:flex-1">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
              <Swords className="h-5 w-5 text-[#E07A5F]" aria-hidden />
            </span>
            <p className="mt-3 text-sm font-semibold text-[#1A2834]">{t("platform.kie.adversarial.name")}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#7A8A98]">{t("platform.kie.adversarial.role")}</p>
            <span className="mt-2 inline-block rounded-full bg-[#E07A5F]/10 px-2 py-0.5 text-[10px] font-semibold text-[#E07A5F]">
              {t("platform.kie.adversarial.badge")}
            </span>
          </div>
          <Arrow />
          {AGENTS_AFTER.map((a) => (
            <AgentCard key={a.key} nameKey={`platform.kie.agent.${a.key}.name`} roleKey={`platform.kie.agent.${a.key}.role`} Icon={a.Icon} />
          ))}
        </motion.div>
      </div>

      {/* ── BLOK 3 · Canlı demo ───────────────────────── */}
      <div id="live-demo" className="mx-auto mt-12 max-w-7xl scroll-mt-24 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
        <motion.div {...fade(0)} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
            {t("platform.kie.demo.eyebrow")}
          </p>
          <h2 className="apple-headline mt-2 text-balance text-2xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
            {t("platform.kie.demo.title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4A5A68] md:text-base">
            {t("platform.kie.demo.body")}
          </p>
        </motion.div>
        <motion.div {...fade(1)}>
          <KIEDemo />
        </motion.div>
      </div>

      {/* ── BLOK 4 · Şeffaflık ────────────────────────── */}
      <div className="mx-auto mt-12 max-w-7xl rounded-3xl border border-black/[0.06] bg-gradient-to-b from-white to-[#F4F6F8] p-6 shadow-[var(--shadow-card)] md:p-8">
        <motion.div {...fade(0)} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
            {t("platform.kie.transparency.eyebrow")}
          </p>
          <h2 className="apple-headline mt-2 text-balance text-2xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
            {t("platform.kie.transparency.title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4A5A68] md:text-base">
            {t("platform.kie.transparency.body")}
          </p>
        </motion.div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TRANSPARENCY.map((c, i) => (
            <motion.div
              key={c.key}
              {...fade(i)}
              className="rounded-2xl border border-black/[0.06] bg-white p-5"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F6F8]">
                  <c.Icon className={`h-5 w-5 ${c.accent === "mint" ? "text-[#10B981]" : "text-[#2B5372]"}`} aria-hidden />
                </span>
                <span className={`font-mono text-lg font-semibold tabular-nums ${c.accent === "mint" ? "text-[#10B981]" : "text-[#2B5372]"}`}>
                  {t(`platform.kie.transparency.card.${c.key}.stat`)}
                </span>
              </span>
              <p className="mt-3 text-sm font-semibold text-[#1A2834]">
                {t(`platform.kie.transparency.card.${c.key}.title`)}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#7A8A98]">
                {t(`platform.kie.transparency.card.${c.key}.body`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── BLOK 5 · CTA ──────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-4 text-center">
        <motion.div {...fade(0)} className="mt-16">
          <h2 className="apple-headline text-balance text-2xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
            {t("platform.kie.cta.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#4A5A68] md:text-base">
            {t("platform.kie.cta.body")}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-energy">
              {t("platform.kie.cta.primary")}
            </Link>
            <Link
              href="/platform/kre"
              className="inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#2B5372] transition-opacity duration-150 hover:opacity-75"
            >
              {t("platform.kie.cta.secondary")}
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function KiePlatformPage() {
  return (
    <I18nProvider>
      <KieContent />
    </I18nProvider>
  );
}
