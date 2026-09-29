"use client";

import { useRef } from "react";
import {
  beatOpacity,
  useScrollChapterProgress,
} from "@/hooks/useScrollChapterProgress";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useI18n } from "@/lib/i18n";

export default function ProblemChapter() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLElement>(null);
  const progress = useScrollChapterProgress(containerRef);
  const reduced = usePrefersReducedMotion();
  const beats = [1, 2, 3] as const;
  const active = Math.min(2, Math.max(0, Math.floor(progress * 3)));

  if (reduced) {
    return (
      <section id="problem" className="bg-[#F4F6F8] py-20 md:py-28 border-b border-black/[0.04]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981] mb-4">
              {t("problem.eyebrow")}
            </p>
            <h2 className="apple-headline text-3xl md:text-4xl font-semibold text-[#1A2834] mb-4">
              {t("problem.title")}
            </h2>
            <p className="text-lg text-[#4A5A68]">{t("problem.body")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {beats.map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-[#E8EDF2] border border-[rgba(43,83,114,0.10)] p-6 h-full"
              >
                <h3 className="text-lg font-semibold text-[#1A2834] mb-2">
                  {t(`problem.p${n}.title`)}
                </h3>
                <p className="text-sm text-[#4A5A68] leading-relaxed">
                  {t(`problem.p${n}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="problem"
      ref={containerRef}
      className="relative w-full bg-white"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 w-full text-center">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981] mb-4">
            {t("problem.eyebrow")}
          </p>
          <h2 className="apple-headline text-3xl md:text-5xl font-semibold text-[#1A2834] mb-4">
            {t("problem.title")}
          </h2>
          <p className="text-lg text-[#4A5A68] mb-14 max-w-2xl mx-auto">
            {t("problem.body")}
          </p>

          <div className="relative min-h-[160px] md:min-h-[180px]">
            {beats.map((n, i) => {
              const opacity = beatOpacity(progress, i, 3);
              return (
                <div
                  key={n}
                  className="absolute inset-0 flex flex-col items-center justify-center px-4"
                  style={{
                    opacity,
                    pointerEvents: opacity > 0.4 ? "auto" : "none",
                  }}
                >
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7A8A98] mb-3">
                    0{n}
                  </p>
                  <h3 className="apple-headline text-2xl md:text-4xl font-semibold text-[#1A2834] mb-3">
                    {t(`problem.p${n}.title`)}
                  </h3>
                  <p className="text-base md:text-lg text-[#4A5A68] max-w-xl leading-relaxed">
                    {t(`problem.p${n}.body`)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-1.5 mt-12">
            {beats.map((n, i) => (
              <span
                key={n}
                className="h-1 rounded-full transition-[width,background-color] duration-300"
                style={{
                  width: i === active ? 22 : 8,
                  background: i === active ? "#2B5372" : "rgba(0,0,0,0.12)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
