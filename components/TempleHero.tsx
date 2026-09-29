"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const MOTES = [
  { top: "15%", left: "22%", delay: "0s", size: 3 },
  { top: "28%", left: "68%", delay: "1.5s", size: 4 },
  { top: "45%", left: "40%", delay: "3s", size: 2 },
  { top: "60%", left: "78%", delay: "0.8s", size: 3 },
  { top: "35%", left: "12%", delay: "2.2s", size: 2 },
  { top: "70%", left: "55%", delay: "4s", size: 3 },
];

export default function TempleHero() {
  const reduced = usePrefersReducedMotion();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [reduced]);

  return (
    <section className="mx-4 md:mx-6 mb-8 md:mb-12">
      <div className="relative mx-auto aspect-[21/9] min-h-[440px] w-full max-w-6xl mt-16 md:mt-20 overflow-hidden rounded-3xl md:min-h-[540px]">
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: reduced
            ? "scale(1.05)"
            : `translate(${mouse.x * -5}px, ${mouse.y * -3}px) scale(1.05)`,
        }}
      >
        <Image
          src="/lab/temple-hero.png"
          alt="Ancient Greek temple on a hill overlooking the sea"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#FFF4D6]/15 via-transparent to-transparent" />

      {!reduced && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {MOTES.map((p, i) => (
            <span
              key={i}
              className="float-soft absolute rounded-full bg-[#FFF4D6]"
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                opacity: 0.6,
                animationDelay: p.delay,
                boxShadow: "0 0 8px rgba(255,244,214,0.6)",
              }}
            />
          ))}
        </div>
      )}

      <div
        className="absolute left-4 right-4 top-6 z-10 mx-auto flex max-w-[calc(100%-2rem)] flex-col items-center gap-2 rounded-3xl border border-white/15 bg-white/[0.08] px-6 py-3 backdrop-blur-md md:left-1/2 md:right-auto md:top-10 md:max-w-2xl md:-translate-x-1/2 md:flex-row md:gap-6 md:rounded-full md:px-8 md:py-4"
        style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 [text-shadow:_0_1px_6px_rgba(0,0,0,0.4)]">
          KASSANDRA PROPHECY
        </p>
        <span aria-hidden className="h-px w-8 bg-white/20 md:h-4 md:w-px" />
        <a
          href="#modules"
          className="group inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-white/90 transition-colors duration-150 hover:text-[#FFF4D6] [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)]"
        >
          <span className="bg-gradient-to-r from-current to-current bg-left-bottom bg-no-repeat transition-[background-size] duration-300 [background-size:0%_1px] group-hover:[background-size:100%_1px]">
            Explore the platform
          </span>
          <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      <div className="absolute bottom-8 left-6 z-10 max-w-md pr-6 md:bottom-12 md:left-10 md:max-w-xl">
        <p className="text-sm text-white/75 md:text-base [text-shadow:_0_1px_8px_rgba(0,0,0,0.4)]">
          From ancient Greece to today, foresight hasn&apos;t changed. Only the tools have.
        </p>
      </div>
      </div>
    </section>
  );
}
