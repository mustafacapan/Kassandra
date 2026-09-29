"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

const DOTS = 110;
const W = 840;
const H = 440;
const FOCI = [
  { x: 300, y: 140 },
  { x: 540, y: 220 },
  { x: 400, y: 320 },
];

function seed(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function hexLerp(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((s) => parseInt(a.slice(s, s + 2), 16));
  const pb = [1, 3, 5].map((s) => parseInt(b.slice(s, s + 2), 16));
  const m = pa.map((v, k) => Math.round(v + (pb[k] - v) * t));
  return `rgb(${m[0]},${m[1]},${m[2]})`;
}

function stageColor(eff: number): { color: string; alpha: number } {
  if (eff < 0.3) {
    const t = eff / 0.3;
    return { color: hexLerp("#7A8A98", "#2B5372", t), alpha: 0.3 + 0.3 * t };
  }
  if (eff < 0.6) {
    const t = (eff - 0.3) / 0.3;
    return { color: hexLerp("#2B5372", "#E07A5F", t), alpha: 0.6 + 0.3 * t };
  }
  if (eff < 0.75) {
    return { color: "#E07A5F", alpha: 0.9 };
  }
  return { color: "#10B981", alpha: 0.9 };
}

function zoomOf(eff: number) {
  if (eff < 0.4) return 1 + (0.02 * eff) / 0.4;
  if (eff < 0.75) return 1.02 + (0.03 * (eff - 0.4)) / 0.35;
  if (eff < 0.85) return 1.05 + (0.01 * (eff - 0.75)) / 0.1;
  return 1.06;
}

function burstOf(eff: number, from: number, to: number, maxR: number) {
  if (eff <= from || eff >= to) return null;
  const t = (eff - from) / (to - from);
  return { r: maxR * t, alpha: 1 - t };
}

export default function AlarmNoise({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eff = reduced ? 1 : clamp01(progress);

  const dots = useMemo(
    () =>
      Array.from({ length: DOTS }, (_, i) => {
        const sx = 40 + seed(i, 1) * 760;
        const sy = 30 + seed(i, 2) * 380;
        const f = FOCI[i % 3];
        const jx = (seed(i, 3) - 0.5) * 72;
        const jy = (seed(i, 4) - 0.5) * 72;
        const q = (n: number) => Math.round(n * 10) / 10;
        return {
          sx: q(sx),
          sy: q(sy),
          fx: q(f.x + jx),
          fy: q(f.y + jy),
          r: q(3.2 + seed(i, 5) * 3.6),
        };
      }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ease = eff * eff * (3 - 2 * eff);
    const { color, alpha } = stageColor(eff);
    const zoom = zoomOf(eff);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (reduced) {
      ctx.clearRect(0, 0, W, H);
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fillRect(0, 0, W, H);
    }
    ctx.translate(W / 2, H / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-W / 2, -H / 2);

    for (const d of dots) {
      const x = d.sx + (d.fx - d.sx) * ease;
      const y = d.sy + (d.fy - d.sy) * ease;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, d.r, 0, Math.PI * 2);
      ctx.fill();

      const small = burstOf(eff, 0.6, 0.75, 16);
      if (small) {
        ctx.globalAlpha = small.alpha * 0.5;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, d.r + small.r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    const big = burstOf(eff, 0.75, 0.85, 80);
    for (const f of FOCI) {
      ctx.globalAlpha = Math.max(0.2, ease) * 0.15;
      ctx.fillStyle = "#e11d48";
      ctx.beginPath();
      ctx.arc(f.x, f.y, 14 + ease * 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = Math.max(0.2, ease);
      ctx.fillStyle = "#e11d48";
      ctx.beginPath();
      ctx.arc(f.x, f.y, 14, 0, Math.PI * 2);
      ctx.fill();
      if (big) {
        ctx.globalAlpha = big.alpha * 0.6;
        ctx.strokeStyle = "#E07A5F";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(f.x, f.y, 14 + big.r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, [dots, eff, reduced]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full rounded-2xl bg-white p-2 shadow-[var(--shadow-card)]"
    >
      <div className="rounded-xl bg-white px-5 py-5">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981]">
          AlarmNoise
        </p>
        <div className="mt-2 flex items-baseline justify-between">
          <p className="apple-headline text-4xl font-semibold tracking-tight text-[#1A2834] tabular-nums text-balance">
            10.000
          </p>
          <p className="text-sm font-semibold text-[#e11d48] tabular-nums">
            → 3
          </p>
        </div>
        <p className="mt-1 text-xs text-[#7A8A98]">
          {t("kre.visual.noise")} → {t("kre.visual.focus")}
        </p>

        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="mt-4 h-auto w-full"
          aria-hidden
        />
      </div>
    </motion.div>
  );
}
