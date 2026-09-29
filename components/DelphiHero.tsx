"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useI18n } from "@/lib/i18n";

const MOTES = [
  { top: "15%", left: "22%", delay: "0s", size: 3 },
  { top: "28%", left: "68%", delay: "1.5s", size: 4 },
  { top: "45%", left: "40%", delay: "3s", size: 2 },
  { top: "60%", left: "78%", delay: "0.8s", size: 3 },
  { top: "35%", left: "12%", delay: "2.2s", size: 2 },
  { top: "70%", left: "55%", delay: "4s", size: 3 },
];

export default function DelphiHero() {
  const { t } = useI18n();
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
    <div className="relative mx-auto aspect-[21/9] min-h-[440px] w-full max-w-6xl overflow-hidden rounded-3xl md:min-h-[540px]">
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: reduced
            ? "scale(1.05)"
            : `translate(${mouse.x * -5}px, ${mouse.y * -3}px) scale(1.05)`,
        }}
      >
        <Image
          src="/lab/delphi.png"
          alt={t("promise.delphi.alt")}
          fill
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

      <div className="absolute bottom-8 left-6 z-10 max-w-md pr-6 md:bottom-12 md:left-10 md:max-w-xl">
        <p className="text-sm text-white/75 md:text-base [text-shadow:_0_1px_8px_rgba(0,0,0,0.4)]">
          {t("promise.delphi.caption")}
        </p>
      </div>
    </div>
  );
}
