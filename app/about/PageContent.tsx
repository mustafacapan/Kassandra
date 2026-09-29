"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Lock,
  Mail,
  Sigma,
  type LucideIcon,
} from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function AboutContent() {
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
      <section className="relative h-[100svh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: reduced ? 1 : 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduced ? 0 : 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/about/about.png"
            alt={t("about.hero.title")}
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2834]/30 via-transparent to-[#1A2834]/60" />
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.2, duration: 0.5, ease: "easeOut" }}
          className="absolute bottom-16 left-6 md:left-16"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-white/70">
            {t("about.hero.eyebrow")}
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold text-white md:text-5xl">
            {t("about.hero.title")}
          </h1>
          <p className="mt-3 max-w-lg text-base text-white/80">
            {t("about.hero.body")}
          </p>
        </motion.div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-white">
          <span className="text-[11px] font-medium tracking-wide text-white/80">
            {t("about.hero.scroll")}
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" aria-hidden />
        </div>
      </section>

      {/* ── 2 · Founder ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <motion.div {...fade(0)} className="lg:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B5372]">
              {t("about.founder.eyebrow")}
            </p>
            <h2 className="apple-headline mt-2 text-3xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
              {t("about.founder.name")}
            </h2>
            <p className="mt-1 text-sm text-[#7A8A98]">{t("about.founder.role")}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#4A5A68] md:text-lg">
              {t("about.founder.bio")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="https://linkedin.com/in/mustafacapan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#2B5372] transition-colors duration-150 hover:text-[#E07A5F]"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden />
                linkedin.com/in/mustafacapan
              </a>
              <a
                href="https://github.com/mustafacapan/Kassandra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#2B5372] transition-colors duration-150 hover:text-[#E07A5F]"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden />
                github.com/mustafacapan/Kassandra
              </a>
            </div>
          </motion.div>
          <motion.div {...fade(1)} className="flex lg:col-span-5">
            <span className="hidden w-px self-stretch bg-black/[0.06] lg:block" aria-hidden />
            <p className="text-lg italic leading-relaxed text-[#7A8A98] lg:pl-8">
              &ldquo;{t("about.founder.quote")}&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 3 · Origin ───────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/about/cliff-terrace.png"
            alt=""
            fill
            quality={85}
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2834]/60 via-[#1A2834]/45 to-[#1A2834]/60" />
        <motion.div
          {...fade(0)}
          className="relative mx-auto max-w-3xl px-6 pb-32 pt-24 text-center md:pb-44 md:pt-28"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            {t("about.origin.eyebrow")}
          </p>
          <h2 className="apple-headline mt-2 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {t("about.origin.title")}
          </h2>
          <div className="mt-8">
            {[t("about.origin.p1"), t("about.origin.p2"), t("about.origin.p3")].map((p) => (
              <p key={p.slice(0, 24)} className="mb-5 text-base leading-relaxed text-white/85 [text-shadow:_0_1px_8px_rgba(0,0,0,0.4)] md:text-lg">
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 4 · Why Kassandra ────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <motion.div {...fade(0)}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B5372]">
            {t("about.why.eyebrow")}
          </p>
          <h2 className="apple-headline mt-3 text-3xl font-semibold leading-[1.1] tracking-tight text-[#1A2834] md:text-5xl">
            {t("about.why.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#6e6e73] md:text-lg">
            {t("about.why.bodyA")}{" "}
            <span className="font-semibold text-[#2B5372]">{t("about.why.highlight")}</span>
            {t("about.why.bodyB")}
          </p>
        </motion.div>
      </section>

      {/* ── 5 · Mission ──────────────────────────────── */}
      <section className="w-full bg-[#1A2834] py-32 md:py-40">
        <motion.div {...fade(0)} className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
            {t("about.mission.eyebrow")}
          </p>
          <h2 className="mx-auto mt-3 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
            {t("about.mission.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {t("about.mission.body")}
          </p>
        </motion.div>
      </section>

      {/* ── 6 · Principles ───────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <motion.div {...fade(0)} className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B5372]">
            {t("about.principles.eyebrow")}
          </p>
          <h2 className="apple-headline mt-2 text-3xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
            {t("about.principles.title")}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {(
            [
              { key: "p1", Icon: Sigma, iconTone: "text-[#2B5372]" },
              { key: "p2", Icon: Lock, iconTone: "text-[#2B5372]" },
            ] as Array<{ key: string; Icon: LucideIcon; iconTone: string }>
          ).map((c, i) => (
            <motion.div
              key={c.key}
              {...fade(i)}
              className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[var(--shadow-card)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F6F8]">
                <c.Icon className={`h-5 w-5 ${c.iconTone}`} aria-hidden />
              </span>
              <p className="mt-4 text-lg font-semibold tracking-tight text-[#1A2834]">
                {t(`about.principles.${c.key}.title`)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#4A5A68]">
                {t(`about.principles.${c.key}.body`)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 7 · Building ─────────────────────────────── */}
      <section className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
          <motion.div {...fade(0)}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B5372]">
              {t("about.building.eyebrow")}
            </p>
            <h2 className="apple-headline mt-2 text-3xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
              {t("about.building.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#4A5A68] md:text-lg">
              {t("about.building.body")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#7A8A98]">
              {t("about.building.vision")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 8 · Contact ──────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <motion.div {...fade(0)} className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B5372]">
            {t("about.contact.eyebrow")}
          </p>
          <h2 className="apple-headline mt-2 text-3xl font-semibold tracking-tight text-[#1A2834] md:text-4xl">
            {t("about.contact.title")}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {(
            [
              { key: "briefing", Icon: Calendar, href: "/contact", external: false },
              { key: "mail", Icon: Mail, href: "mailto:mustafa@kassandraprophecy.com", external: false },
              { key: "linkedin", Icon: Briefcase, href: "https://linkedin.com/in/mustafacapan", external: true },
            ] as Array<{ key: string; Icon: LucideIcon; href: string; external: boolean }>
          ).map((c, i) => (
            <motion.div key={c.key} {...fade(i)}>
              {c.external ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F6F8]">
                    <c.Icon className="h-5 w-5 text-[#2B5372]" aria-hidden />
                  </span>
                  <p className="mt-4 text-sm font-semibold text-[#1A2834]">
                    {t(`about.contact.${c.key}.title`)}
                  </p>
                  <p className="mt-1 break-all text-xs leading-relaxed text-[#7A8A98]">
                    {t(`about.contact.${c.key}.body`)}
                  </p>
                </a>
              ) : (
                <Link
                  href={c.href}
                  className="block h-full rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F6F8]">
                    <c.Icon className="h-5 w-5 text-[#2B5372]" aria-hidden />
                  </span>
                  <p className="mt-4 text-sm font-semibold text-[#1A2834]">
                    {t(`about.contact.${c.key}.title`)}
                  </p>
                  <p className="mt-1 break-all text-xs leading-relaxed text-[#7A8A98]">
                    {t(`about.contact.${c.key}.body`)}
                  </p>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#2B5372] transition-opacity duration-150 hover:opacity-75"
          >
            {t("thanks.back")}
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function AboutPage() {
  return (
    <I18nProvider>
      <AboutContent />
    </I18nProvider>
  );
}
