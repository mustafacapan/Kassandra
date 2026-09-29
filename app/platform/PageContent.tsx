"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Brain,
  Coins,
  Network,
  Server,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ENGINES: Array<{
  key: string;
  num: string;
  href: string;
  Icon: LucideIcon;
  iconTone: string;
}> = [
  { key: "kre", num: "01", href: "/platform/kre", Icon: Network, iconTone: "text-[#2B5372]" },
  { key: "kee", num: "02", href: "/platform/kee", Icon: Coins, iconTone: "text-[#10B981]" },
  { key: "kie", num: "03", href: "/platform/kie", Icon: Brain, iconTone: "text-[#2B5372]" },
  { key: "kge", num: "04", href: "/platform/kge", Icon: ShieldCheck, iconTone: "text-[#E07A5F]" },
];

const FLOW: Array<{ key: string; Icon: LucideIcon; iconTone: string }> = [
  { key: "kre", Icon: Network, iconTone: "text-[#2B5372]" },
  { key: "kee", Icon: Coins, iconTone: "text-[#10B981]" },
  { key: "kie", Icon: Brain, iconTone: "text-[#2B5372]" },
  { key: "kge", Icon: ShieldCheck, iconTone: "text-[#E07A5F]" },
];

function PlatformContent() {
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
      {/* ── 1 · Hero ─────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 md:pt-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <Link
              href="/"
              className="mb-6 inline-block text-xs text-[#7A8A98] transition-colors duration-150 hover:text-[#2B5372]"
            >
              {t("platform.index.hero.back")}
            </Link>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
              {t("platform.index.hero.eyebrow")}
            </p>
            <h1 className="apple-headline mt-3 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-[#1A2834] md:text-6xl">
              {t("platform.index.hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#6e6e73] md:text-lg">
              {t("platform.index.hero.body")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="btn-energy">
                {t("platform.index.hero.cta1")}
              </Link>
              <a
                href="#engines"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#2B5372] transition-opacity duration-150 hover:opacity-75"
              >
                {t("platform.index.hero.cta2")}
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden rounded-3xl border border-black/[0.06] shadow-[var(--shadow-card)] lg:-rotate-2 lg:translate-y-4">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/platform/cliff-terrace.png"
                  alt={t("platform.index.hero.title")}
                  fill
                  priority
                  quality={85}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 2 · Engines ──────────────────────────────── */}
      <div id="engines" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 md:py-24">
        <motion.div {...fade(0)} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
            {t("platform.index.engines.eyebrow")}
          </p>
          <h2 className="apple-headline mt-2 text-3xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
            {t("platform.index.engines.title")}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#6e6e73]">
            {t("platform.index.engines.body")}
          </p>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {ENGINES.map((e, i) => (
            <motion.div key={e.key} {...fade(i)}>
              <Link
                href={e.href}
                className="group flex h-full flex-col rounded-3xl border border-black/[0.06] bg-white p-8 shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-10"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-xs tabular-nums text-[#7A8A98]">{e.num}</span>
                  <e.Icon className={`h-7 w-7 ${e.iconTone}`} aria-hidden />
                </span>
                <span className="mt-4 block text-xl font-semibold tracking-tight text-[#1A2834] transition-colors duration-150 group-hover:text-[#2B5372] md:text-2xl">
                  {t(`platform.index.${e.key}.name`)}
                </span>
                <span className="mt-1 block text-sm text-[#7A8A98]">
                  {t(`platform.index.${e.key}.tagline`)}
                </span>
                <span className="mt-4 block text-sm leading-relaxed text-[#4A5A68]">
                  {t(`platform.index.${e.key}.body`)}
                </span>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#2B5372] transition-colors duration-150 group-hover:text-[#E07A5F]">
                  {t(`platform.index.${e.key}.link`)}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 3 · Foundations ──────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="border-t border-black/[0.06] pt-16">
          <motion.div {...fade(0)} className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
              {t("platform.index.foundations.eyebrow")}
            </p>
            <h2 className="apple-headline mt-2 text-3xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
              {t("platform.index.foundations.title")}
            </h2>
          </motion.div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {(
              [
                { key: "agentless", href: "/platform/agentless", Icon: Server },
                { key: "simulation", href: "/platform/simulation", Icon: Activity },
              ] as Array<{ key: string; href: string; Icon: LucideIcon }>
            ).map((f, i) => (
              <motion.div key={f.key} {...fade(i)}>
                <Link
                  href={f.href}
                  className="group flex h-full flex-col rounded-3xl border border-black/[0.06] bg-[#F4F6F8] p-8 transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                >
                  <f.Icon className="h-7 w-7 text-[#2B5372]" aria-hidden />
                  <span className="mt-4 block text-xl font-semibold tracking-tight text-[#1A2834] transition-colors duration-150 group-hover:text-[#2B5372]">
                    {t(`platform.index.${f.key}.name`)}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-[#4A5A68]">
                    {t(`platform.index.${f.key}.body`)}
                  </span>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#2B5372] transition-colors duration-150 group-hover:text-[#E07A5F]">
                    {t(`platform.index.${f.key}.link`)}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4 · Flow ─────────────────────────────────── */}
      <div className="w-full bg-[#1A2834] py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div {...fade(0)} className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
              {t("platform.index.flow.eyebrow")}
            </p>
            <h2 className="apple-headline mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {t("platform.index.flow.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
              {t("platform.index.flow.body")}
            </p>
          </motion.div>
          <motion.div {...fade(1)} className="mt-14 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
            {FLOW.map((f, i) => (
              <div key={f.key} className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
                <div className="flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm">
                  <f.Icon className={`h-6 w-6 ${f.iconTone}`} aria-hidden />
                  <p className="mt-3 text-sm font-semibold text-white">{f.key.toUpperCase()}</p>
                  <p className="mt-1 text-xs text-white/60">{t(`platform.index.flow.${f.key}`)}</p>
                </div>
                {i < FLOW.length - 1 && (
                  <span className="flex items-center justify-center" aria-hidden>
                    <ArrowRight className="h-5 w-5 rotate-90 text-white/30 md:rotate-0" />
                  </span>
                )}
              </div>
            ))}
          </motion.div>
          <motion.p {...fade(2)} className="mx-auto mt-8 max-w-lg text-center text-sm leading-relaxed text-white/50">
            {t("platform.index.flow.summary")}
          </motion.p>
        </div>
      </div>

      {/* ── 5 · CTA ──────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <motion.div {...fade(0)}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
            {t("platform.index.cta.eyebrow")}
          </p>
          <h2 className="apple-headline mt-2 text-3xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
            {t("platform.index.cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#6e6e73]">
            {t("platform.index.cta.body")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-energy">
              {t("platform.index.cta.primary")}
            </Link>
            <a
              href="mailto:mustafa@kassandraprophecy.com"
              className="inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#2B5372] transition-opacity duration-150 hover:opacity-75"
            >
              {t("platform.index.cta.secondary")}
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function PlatformPage() {
  return (
    <I18nProvider>
      <PlatformContent />
    </I18nProvider>
  );
}
