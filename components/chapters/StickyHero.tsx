"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollChapterProgress } from "@/hooks/useScrollChapterProgress";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useI18n } from "@/lib/i18n";

const STATS = [
  { valueKey: "hero.stats.savings.value", labelKey: "hero.stats.savings.label", pos: "left-0 top-6", delay: "0s" },
  { valueKey: "hero.stats.bottlenecks.value", labelKey: "hero.stats.bottlenecks.label", pos: "right-0 bottom-16", delay: "1.2s" },
  { valueKey: "hero.stats.scenarios.value", labelKey: "hero.stats.scenarios.label", pos: "left-1/4 bottom-0", delay: "2.1s" },
];

export default function StickyHero() {
  const { t, locale } = useI18n();
  const containerRef = useRef<HTMLElement>(null);
  const progress = useScrollChapterProgress(containerRef, {
    lerp: 0.12,
    maxStep: 0.04,
  });
  const reduced = usePrefersReducedMotion();

  const fade = reduced ? 1 : Math.max(0, 1 - progress * 1.2);
  const scale = reduced ? 1 : 1 - progress * 0.05;
  const y = reduced ? 0 : progress * 32;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-[#F4F6F8] via-[#E8EDF2] to-[#F4F6F8]"
      style={{ height: reduced ? "auto" : "170vh" }}
    >
      <div
        className={`sticky top-0 overflow-hidden flex items-center ${
          reduced ? "min-h-[100svh] py-24" : "h-[100svh]"
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(43,83,114,0.08),transparent_50%)]"
        />

        <div
          className="relative z-10 mx-auto max-w-6xl px-6 w-full grid lg:grid-cols-12 gap-10 lg:gap-8 items-center will-change-transform pt-16"
          style={{
            opacity: fade,
            transform: `translateY(${y}px) scale(${scale})`,
          }}
        >
          <div className="text-center lg:text-left lg:col-span-7">
            <motion.p
              key={`brand-${locale}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-[#10B981] mb-5"
            >
              {t("hero.brand")}
            </motion.p>
            <motion.h1
              key={`title-${locale}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              className="apple-headline text-[2.2rem] sm:text-4xl md:text-5xl lg:text-[3.4rem] font-semibold gradient-text-ink mb-5"
            >
              {t("hero.title1")}
              <br />
              {t("hero.title2")}
            </motion.h1>
            <motion.p
              key={`sub-${locale}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="max-w-xl mx-auto lg:mx-0 text-base md:text-lg text-[#4A5A68] leading-relaxed mb-8"
            >
              {t("hero.sub")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <a href="#modules" className="btn-energy">
                {t("hero.cta")}
              </a>
              <a href="#architecture" className="btn-apple-ghost">
                {t("hero.cta2")}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
            className="relative order-first lg:order-none lg:col-span-5"
          >
            <div className="relative mx-auto h-[380px] w-full max-w-[420px] md:h-[440px]">
              <div className="float-soft absolute inset-0 flex items-center justify-center" aria-hidden>
                <svg viewBox="0 0 320 320" className="h-full w-full">
                  <circle cx="160" cy="150" r="140" fill="none" stroke="#2B5372" strokeOpacity="0.4" strokeWidth="1.5" />
                  <circle cx="160" cy="150" r="100" fill="none" stroke="#10B981" strokeWidth="1.5" />
                  <circle cx="160" cy="150" r="62" fill="none" stroke="#2B5372" strokeWidth="1.5" />
                  <circle cx="260" cy="150" r="5" fill="#2B5372" />
                  <circle cx="160" cy="50" r="5" fill="#10B981" />
                  <circle cx="98" cy="150" r="5" fill="#1A2834" />
                  <circle cx="160" cy="212" r="5" fill="#2B5372" />
                  <circle cx="160" cy="150" r="14" fill="#E07A5F" />
                </svg>
              </div>
              {STATS.map((s) => (
                <div
                  key={s.valueKey}
                  className={`float-soft absolute ${s.pos} rounded-xl border border-black/[0.06] bg-white/80 px-3 py-2 backdrop-blur-md`}
                  style={{ animationDelay: s.delay }}
                >
                  <p className="text-2xl font-semibold tabular-nums tracking-tight text-[#2B5372]">
                    {t(s.valueKey)}
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-[#7A8A98]">
                    {t(s.labelKey)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {!reduced && (
          <div
            className="absolute bottom-8 left-6 md:left-10 flex flex-col items-start gap-2 text-[#E07A5F]"
            style={{ opacity: fade }}
          >
            <span className="text-[11px] tracking-[0.2em] uppercase">
              {t("hero.scroll")}
            </span>
            <span className="text-lg scroll-hint">↓</span>
          </div>
        )}
      </div>
    </section>
  );
}
