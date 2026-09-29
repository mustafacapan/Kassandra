"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp01 } from "@/hooks/useScrollChapterProgress";

interface Pt {
  x: number;
  y: number;
}

const MID = { x: 210, y: 140 };
const LEFT_EDGE = 92;
const MID_LEFT = 172;
const MID_RIGHT = 248;
const RIGHT_EDGE = 328;

const WAVES = [-46, -24, -8, 8, 24, 46];

function cubic(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

function hexPoints(cx: number, cy: number, r: number, sides: number, rot: number): string {
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const a = rot + (Math.PI * 2 * i) / sides;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function hexLerp(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((s) => parseInt(a.slice(s, s + 2), 16));
  const pb = [1, 3, 5].map((s) => parseInt(b.slice(s, s + 2), 16));
  const m = pa.map((v, k) => Math.round(v + (pb[k] - v) * t));
  return `rgb(${m[0]},${m[1]},${m[2]})`;
}

export default function ChokePointFlow({ progress }: { progress: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const eff = reduced ? 1 : clamp01(progress);

  const draw = clamp01(eff / 0.3);
  const travel = eff < 0.3 ? -1 : eff < 0.6 ? 0.5 * ((eff - 0.3) / 0.3) : 0.5 + 0.5 * ((eff - 0.6) / 0.4);
  const mintMix = clamp01((eff - 0.8) / 0.2);
  const pulse = 1 + 0.06 * Math.sin(eff * Math.PI);

  const stopBlue = hexLerp("#2B5372", "#10B981", mintMix);
  const stopCopper = hexLerp("#E07A5F", "#10B981", mintMix);

  const paths = WAVES.map((w, k) => {
    const segL = {
      p0: { x: LEFT_EDGE, y: 140 },
      p1: { x: 130, y: 140 + w },
      p2: { x: 152, y: 140 + w * 0.6 },
      p3: { x: MID_LEFT, y: 140 },
    };
    const segR = {
      p0: { x: MID_RIGHT, y: 140 },
      p1: { x: 282, y: 140 - w * 0.6 },
      p2: { x: 308, y: 140 - w },
      p3: { x: RIGHT_EDGE, y: 140 },
    };
    return { segL, segR, key: k };
  });

  const pointOn = (k: number, u: number): Pt => {
    const { segL, segR } = paths[k];
    if (u <= 0.5) {
      const s = segL;
      return cubic(s.p0, s.p1, s.p2, s.p3, u * 2);
    }
    const s = segR;
    return cubic(s.p0, s.p1, s.p2, s.p3, (u - 0.5) * 2);
  };

  const dots = (k: number) => {
    if (travel < 0) return [];
    const trail = Math.max(0, travel - 0.12);
    return [travel, trail].filter((u) => u >= 0);
  };

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
          ChokePointFlow
        </p>

        <svg viewBox="0 0 420 300" className="mt-3 h-[280px] w-full md:h-[320px]" aria-hidden>
          <defs>
            <pattern id="cpfGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="#7A8A98" opacity="0.08" />
            </pattern>
            <linearGradient id="cpfFlow" gradientUnits="userSpaceOnUse" x1="60" y1="0" x2="360" y2="0">
              <stop offset="0%" stopColor="#7A8A98" stopOpacity="0.3" />
              <stop offset="45%" stopColor={stopBlue} stopOpacity="0.5" />
              <stop offset="62%" stopColor={stopCopper} stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="420" height="300" fill="url(#cpfGrid)" />

          {paths.map((p) => (
            <g key={p.key}>
              <path
                d={`M${p.segL.p0.x} ${p.segL.p0.y} C${p.segL.p1.x} ${p.segL.p1.y}, ${p.segL.p2.x} ${p.segL.p2.y}, ${p.segL.p3.x} ${p.segL.p3.y}`}
                fill="none"
                stroke="url(#cpfFlow)"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength={50}
                strokeDasharray={50}
                strokeDashoffset={50 * (1 - draw)}
              />
              <path
                d={`M${p.segR.p0.x} ${p.segR.p0.y} C${p.segR.p1.x} ${p.segR.p1.y}, ${p.segR.p2.x} ${p.segR.p2.y}, ${p.segR.p3.x} ${p.segR.p3.y}`}
                fill="none"
                stroke="url(#cpfFlow)"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength={50}
                strokeDasharray={50}
                strokeDashoffset={50 * (1 - draw)}
              />
            </g>
          ))}

          {paths.map((p, k) =>
            dots(k).map((u, j) => {
              const pt = pointOn(k, Math.min(1, u));
              const pastMid = u > 0.5;
              return (
                <circle
                  key={`${k}-${j}`}
                  cx={pt.x.toFixed(1)}
                  cy={pt.y.toFixed(1)}
                  r={j === 0 ? 3 : 2}
                  fill={pastMid ? "#10B981" : "#E07A5F"}
                  opacity={j === 0 ? 0.95 : 0.55}
                />
              );
            })
          )}

          {[50, 70, 90].map((base, k) => {
            const local = clamp01((eff - (0.6 + k * 0.05)) / 0.15);
            if (local <= 0) return null;
            return (
              <circle
                key={k}
                cx={MID.x}
                cy={MID.y}
                r={base + 25 * local}
                fill="none"
                stroke="#E07A5F"
                strokeWidth="1.5"
                opacity={[0.4, 0.25, 0.12][k] * (1 - local)}
              />
            );
          })}

          <g opacity="0.15">
            <circle cx="60" cy="140" r="34" fill="#7A8A98" />
          </g>
          <polygon
            points={hexPoints(60, 140, 30, 6, Math.PI / 6)}
            fill="#fff"
            stroke="#7A8A98"
            strokeWidth="1.5"
          />
          <g stroke="#7A8A98" strokeWidth="1.5" fill="none">
            <circle cx="60" cy="140" r="9" />
            <ellipse cx="60" cy="140" rx="4" ry="9" />
            <line x1="51" y1="140" x2="69" y2="140" />
          </g>

          <g transform={`translate(${MID.x} ${MID.y}) scale(${pulse})`} opacity={Math.max(0.3, draw)}>
            <polygon
              points={hexPoints(0, 0, 38, 8, Math.PI / 8)}
              fill="#fff"
              stroke={mintMix > 0.5 ? "#10B981" : "#E07A5F"}
              strokeWidth="2.5"
            />
            <g
              stroke={mintMix > 0.5 ? "#10B981" : "#E07A5F"}
              strokeWidth="2"
              fill="none"
            >
              <rect x="-8" y="-3" width="16" height="11" rx="2" />
              <path d="M-5 -3 V-6 A5 5 0 0 1 5 -6 V-3" />
            </g>
          </g>

          <g style={{ filter: "drop-shadow(0 0 24px rgba(16,185,129,0.15))" }}>
            <rect x="332" y="112" width="56" height="56" rx="10" fill="#fff" stroke="#10B981" strokeWidth="1.5" />
          </g>
          <g stroke="#10B981" strokeWidth="1.8" fill="none">
            <path d="M352 124 L366 132 L352 140 L352 134 L344 134 L344 130 L352 130 Z" />
            <path d="M360 146 V152 M352 150 H368" strokeLinecap="round" />
          </g>
        </svg>

        <div className="mt-2 grid grid-cols-3 text-center">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#7A8A98]">
              {t("kre.visual.source")}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E07A5F]">
              {t("kre.visual.choke")}
            </p>
            <p className="mt-0.5 font-mono text-[10px] tabular-nums text-[#7A8A98]">
              1,870 paths cut
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#7A8A98]">
              {t("kre.visual.target")}
            </p>
            <p className="mt-0.5 font-mono text-[10px] tabular-nums text-[#10B981]">
              5 assets
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
