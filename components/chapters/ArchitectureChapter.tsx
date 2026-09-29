"use client";

import { useRef } from "react";
import {
  beatOpacity,
  useScrollChapterProgress,
} from "@/hooks/useScrollChapterProgress";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useI18n } from "@/lib/i18n";

const STEPS = ["01", "02", "03", "04"] as const;

export default function ArchitectureChapter() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLElement>(null);
  const progress = useScrollChapterProgress(containerRef);
  const reduced = usePrefersReducedMotion();
  const active = Math.min(3, Math.max(0, Math.floor(progress * 4)));

  if (reduced) {
    return (
      <section id="architecture" className="bg-[#E8EDF2] py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981] mb-4">
              {t("arch.eyebrow")}
            </p>
            <h2 className="apple-headline text-3xl md:text-5xl font-semibold text-[#1A2834]">
              {t("arch.title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            {STEPS.map((step) => (
              <div key={step} className="relative text-center md:text-left px-2 py-4">
                <p className="text-5xl font-semibold text-[#1A2834]/[0.08] mb-3">
                  {step}
                </p>
                <h3 className="text-xl font-semibold text-[#1A2834] mb-2">
                  {t(`arch.${step}`)}
                </h3>
                <p className="text-sm text-[#4A5A68]">{t(`arch.${step}d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="architecture"
      ref={containerRef}
      className="relative w-full bg-[#E8EDF2]"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 w-full">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981] mb-4">
              {t("arch.eyebrow")}
            </p>
            <h2 className="apple-headline text-3xl md:text-5xl font-semibold text-[#1A2834]">
              {t("arch.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4 md:gap-6">
            {STEPS.map((step, i) => {
              const opacity = Math.max(0.22, beatOpacity(progress, i, 4));
              const isActive = i === active;
              return (
                <div
                  key={step}
                  className="relative text-center md:text-left px-3 py-5 rounded-2xl transition-[background-color,box-shadow,transform] duration-300"
                  style={{
                    opacity,
                    background: isActive
                      ? "rgba(255,255,255,0.9)"
                      : "transparent",
                    boxShadow: isActive
                      ? "0 12px 40px rgba(43,83,114,0.10)"
                      : "none",
                    transform: `translateY(${isActive ? 0 : 8}px)`,
                  }}
                >
                  <p
                    className="text-5xl font-semibold mb-3 tabular-nums"
                    style={{
                      color: isActive
                        ? "rgba(43,83,114,0.2)"
                        : "rgba(29,29,31,0.08)",
                    }}
                  >
                    {step}
                  </p>
                  <h3 className="text-xl font-semibold text-[#1A2834] mb-2">
                    {t(`arch.${step}`)}
                  </h3>
                  <p className="text-sm text-[#4A5A68]">{t(`arch.${step}d`)}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 h-1 rounded-full bg-black/[0.06] overflow-hidden max-w-xl mx-auto">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2B5372] to-[#10B981]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
