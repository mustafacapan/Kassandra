"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  Award,
  Clock,
  Coins,
  FileLock,
  Gauge,
  Layers,
  Lock,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import KGEDemo from "@/components/showcase/KGEDemo";

const PILLARS: Array<{ key: string; Icon: LucideIcon; iconTone: string }> = [
  { key: "freshness", Icon: Clock, iconTone: "text-[#2B5372]" },
  { key: "confidence", Icon: Gauge, iconTone: "text-[#10B981]" },
  { key: "trajectory", Icon: TrendingUp, iconTone: "text-[#E07A5F]" },
  { key: "integrity", Icon: Lock, iconTone: "text-[#2B5372]" },
];

const TRANSPARENCY: Array<{ key: string; Icon: LucideIcon; accent: "mint" | "blue" | "copper" | "red" }> = [
  { key: "1", Icon: Lock, accent: "blue" },
  { key: "2", Icon: Activity, accent: "mint" },
  { key: "3", Icon: TrendingUp, accent: "copper" },
  { key: "4", Icon: Award, accent: "blue" },
  { key: "5", Icon: Coins, accent: "mint" },
  { key: "6", Icon: Layers, accent: "blue" },
  { key: "7", Icon: FileLock, accent: "red" },
];

function KgeContent() {
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
            {t("platform.kge.hero.eyebrow")}
          </p>
          <h1 className="apple-headline mt-4 text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-5xl">
            {t("platform.kge.hero.title")}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4A5A68] md:text-lg">
            {t("platform.kge.hero.body")}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#audit-demo" className="btn-energy">
              {t("platform.kge.hero.cta1")}
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#2B5372] transition-opacity duration-150 hover:opacity-75"
            >
              {t("platform.kge.hero.cta2")}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── BLOK 2 · 4 sütun ──────────────────────────── */}
      <div className="mx-auto mt-16 max-w-7xl rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
        <motion.div {...fade(0)} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
            {t("platform.kge.pillars.eyebrow")}
          </p>
          <h2 className="apple-headline mt-2 text-balance text-2xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
            {t("platform.kge.pillars.title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4A5A68] md:text-base">
            {t("platform.kge.pillars.body")}
          </p>
        </motion.div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.key}
              {...fade(i)}
              className="rounded-2xl border border-black/[0.06] bg-[#F4F6F8] p-5"
            >
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                <p.Icon className={`h-5 w-5 ${p.iconTone}`} aria-hidden />
              </span>
              <p className="text-sm font-semibold text-[#1A2834]">
                {t(`platform.kge.pillar.${p.key}.title`)}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#7A8A98]">
                {t(`platform.kge.pillar.${p.key}.body`)}
              </p>
              <span className="mt-3 inline-block rounded-full bg-white px-2.5 py-0.5 font-mono text-[10px] tabular-nums text-[#2B5372]">
                {t(`platform.kge.pillar.${p.key}.badge`)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── BLOK 3 · Canlı denetim ────────────────────── */}
      <div id="audit-demo" className="mx-auto mt-12 max-w-7xl scroll-mt-24 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
        <motion.div {...fade(0)} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
            {t("platform.kge.demo.eyebrow")}
          </p>
          <h2 className="apple-headline mt-2 text-balance text-2xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
            {t("platform.kge.demo.title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4A5A68] md:text-base">
            {t("platform.kge.demo.body")}
          </p>
        </motion.div>
        <motion.div {...fade(1)}>
          <KGEDemo />
        </motion.div>
      </div>

      {/* ── BLOK 4 · Şeffaflık ────────────────────────── */}
      <div className="mx-auto mt-12 max-w-7xl rounded-3xl border border-black/[0.06] bg-gradient-to-b from-white to-[#F4F6F8] p-6 shadow-[var(--shadow-card)] md:p-8">
        <motion.div {...fade(0)} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
            {t("platform.kge.transparency.eyebrow")}
          </p>
          <h2 className="apple-headline mt-2 text-balance text-2xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
            {t("platform.kge.transparency.title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4A5A68] md:text-base">
            {t("platform.kge.transparency.body")}
          </p>
        </motion.div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {TRANSPARENCY.map((c, i) => (
            <motion.div
              key={c.key}
              {...fade(i)}
              className="rounded-2xl border border-black/[0.06] bg-white p-5"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F6F8]">
                  <c.Icon
                    className={`h-5 w-5 ${
                      c.accent === "mint"
                        ? "text-[#10B981]"
                        : c.accent === "red"
                          ? "text-[#E11D48]"
                          : c.accent === "copper"
                            ? "text-[#E07A5F]"
                            : "text-[#2B5372]"
                    }`}
                    aria-hidden
                  />
                </span>
                <span
                  className={`font-mono text-lg font-semibold tabular-nums ${
                    c.accent === "mint"
                      ? "text-[#10B981]"
                      : c.accent === "red"
                        ? "text-[#E11D48]"
                        : c.accent === "copper"
                          ? "text-[#E07A5F]"
                          : "text-[#2B5372]"
                  }`}
                >
                  {t(`platform.kge.transparency.card.${c.key}.stat`)}
                </span>
              </span>
              <p className="mt-3 text-sm font-semibold text-[#1A2834]">
                {t(`platform.kge.transparency.card.${c.key}.title`)}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#7A8A98]">
                {t(`platform.kge.transparency.card.${c.key}.body`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── BLOK 5 · CTA ──────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-4 text-center">
        <motion.div {...fade(0)} className="mt-16">
          <h2 className="apple-headline text-balance text-2xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
            {t("platform.kge.cta.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#4A5A68] md:text-base">
            {t("platform.kge.cta.body")}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-energy">
              {t("platform.kge.cta.primary")}
            </Link>
            <Link
              href="/platform/kie"
              className="inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#2B5372] transition-opacity duration-150 hover:opacity-75"
            >
              {t("platform.kge.cta.secondary")}
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function KgePlatformPage() {
  return (
    <I18nProvider>
      <KgeContent />
    </I18nProvider>
  );
}
