"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useScrollChapterProgress(
  containerRef: RefObject<HTMLElement | null>,
  options?: { lerp?: number; maxStep?: number }
) {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const lerp = options?.lerp ?? 0.08;
  const maxStep = options?.maxStep ?? 0.02;

  useEffect(() => {
    const read = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        targetRef.current = 0;
        return;
      }
      const raw = -rect.top / total;
      targetRef.current = Math.min(1, Math.max(0, raw));
    };

    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    read();
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [containerRef]);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const diff = targetRef.current - currentRef.current;

      if (reduced) {
        currentRef.current = targetRef.current;
        setProgress(currentRef.current);
      } else if (Math.abs(diff) > 0.005) {
        let step = diff * lerp;
        if (step > maxStep) step = maxStep;
        if (step < -maxStep) step = -maxStep;
        currentRef.current += step;
        setProgress(currentRef.current);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [lerp, maxStep, reduced]);

  return progress;
}

/** Map global 0–1 progress into per-beat local t and opacity.
 * Tight window: fully visible inside its own beat, quick smoothstep
 * crossfade (≈0.03 progress) at edges, zero elsewhere — no ghosting. */
export function beatOpacity(
  progress: number,
  index: number,
  count: number,
  _pad = 0.04
): number {
  const span = 1 / count;
  const start = index * span;
  const local = (progress - start) / span;
  if (local < 0 || local > 1) return 0;
  const e = 0.12;
  const smooth = (t: number) => {
    const x = clamp01(t);
    return x * x * (3 - 2 * x);
  };
  const fadeIn = index === 0 ? 1 : smooth(local / e);
  const fadeOut = index === count - 1 ? 1 : 1 - smooth((local - (1 - e)) / e);
  return fadeIn * fadeOut;
}

export function beatIndex(progress: number, count: number): number {
  return Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
}

export function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/** Smoothstep within a progress window. */
export function windowT(progress: number, start: number, end: number) {
  if (end <= start) return progress >= end ? 1 : 0;
  return clamp01((progress - start) / (end - start));
}
