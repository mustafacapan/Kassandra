"use client";

import { useRef, type ReactNode } from "react";
import {
  beatOpacity,
  useScrollChapterProgress,
} from "@/hooks/useScrollChapterProgress";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export interface ChapterBeat {
  badge: string;
  title: string;
  body: string;
}

interface ScrollChapterProps {
  id: string;
  eyebrow: string;
  name: string;
  beats: ChapterBeat[];
  heightVh?: number;
  surface?: "white" | "surface";
  renderVisual: (progress: number, activeBeat: number) => ReactNode;
}

export default function ScrollChapter({
  id,
  eyebrow,
  name,
  beats,
  heightVh = 380,
  surface = "white",
  renderVisual,
}: ScrollChapterProps) {
  const containerRef = useRef<HTMLElement>(null);
  const progress = useScrollChapterProgress(containerRef);
  const reduced = usePrefersReducedMotion();
  const count = beats.length;
  const activeBeat = Math.min(
    count - 1,
    Math.max(0, Math.floor(progress * count + 0.001))
  );

  const bg = surface === "surface" ? "bg-[#E8EDF2]" : "bg-white";

  return (
    <section
      id={id}
      ref={containerRef}
      className={`relative w-full ${bg}`}
      style={{ height: reduced ? "auto" : `${heightVh}vh` }}
    >
      {reduced ? (
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981] mb-3">
            {name} · {eyebrow}
          </p>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-10">
              {beats.map((b, i) => (
                <div key={i}>
                  <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#7A8A98] mb-2">
                    {b.badge}
                  </p>
                  <h3 className="apple-headline text-2xl md:text-3xl font-semibold text-[#1A2834] mb-3">
                    {b.title}
                  </h3>
                  <p className="text-[15px] text-[#4A5A68] leading-relaxed max-w-md">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="sticky top-24">{renderVisual(1, count - 1)}</div>
          </div>
        </div>
      ) : (
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div className="mx-auto max-w-6xl px-6 w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative min-h-[220px] md:min-h-[280px] order-2 lg:order-1">
              {beats.map((b, i) => {
                const opacity = beatOpacity(progress, i, count);
                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{
                      opacity,
                      pointerEvents: opacity > 0.45 ? "auto" : "none",
                    }}
                    aria-hidden={opacity < 0.2}
                  >
                    <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981] mb-3">
                      {name} · {eyebrow}
                    </p>
                    <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#7A8A98] mb-3">
                      {b.badge}
                    </p>
                    <h3 className="apple-headline text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-[#1A2834] mb-4 leading-[1.1]">
                      {b.title}
                    </h3>
                    <p className="text-base md:text-lg text-[#4A5A68] leading-relaxed max-w-md">
                      {b.body}
                    </p>
                  </div>
                );
              })}

              <div className="absolute bottom-0 left-0 flex gap-1.5">
                {beats.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 rounded-full transition-[width,background-color] duration-300"
                    style={{
                      width: i === activeBeat ? 22 : 8,
                      background:
                        i === activeBeat ? "#2B5372" : "rgba(0,0,0,0.12)",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 flex items-center justify-center">
              {renderVisual(progress, activeBeat)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
