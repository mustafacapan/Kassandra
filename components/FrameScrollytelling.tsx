"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ShieldAlert, DollarSign, TrendingUp, Cpu } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const TOTAL_FRAMES = 100;

interface TextOverlay {
  id: number;
  badgeKey: string;
  textKey: string;
  highlightKey: string;
  icon: typeof ShieldAlert;
  startProgress: number;
  endProgress: number;
}

const TEXT_OVERLAYS: TextOverlay[] = [
  {
    id: 1,
    badgeKey: "frame.b1",
    textKey: "frame.t1",
    highlightKey: "frame.h1",
    icon: ShieldAlert,
    startProgress: 0.05,
    endProgress: 0.25,
  },
  {
    id: 2,
    badgeKey: "frame.b2",
    textKey: "frame.t2",
    highlightKey: "frame.h2",
    icon: DollarSign,
    startProgress: 0.28,
    endProgress: 0.48,
  },
  {
    id: 3,
    badgeKey: "frame.b3",
    textKey: "frame.t3",
    highlightKey: "frame.h3",
    icon: TrendingUp,
    startProgress: 0.51,
    endProgress: 0.71,
  },
  {
    id: 4,
    badgeKey: "frame.b4",
    textKey: "frame.t4",
    highlightKey: "frame.h4",
    icon: Cpu,
    startProgress: 0.74,
    endProgress: 0.94,
  },
];

export default function FrameScrollytelling() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/frames/frame_${frameNum}.jpg`;

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) setIsPreloaded(true);
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) setIsPreloaded(true);
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    if (canvas.width !== windowWidth * dpr || canvas.height !== windowHeight * dpr) {
      canvas.width = windowWidth * dpr;
      canvas.height = windowHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const scale = Math.max(windowWidth / imgWidth, windowHeight / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const offsetX = (windowWidth - drawWidth) / 2;
    const offsetY = (windowHeight - drawHeight) / 2;

    ctx.clearRect(0, 0, windowWidth, windowHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    const gradient = ctx.createRadialGradient(
      windowWidth / 2,
      windowHeight / 2,
      Math.min(windowWidth, windowHeight) * 0.35,
      windowWidth / 2,
      windowHeight / 2,
      Math.max(windowWidth, windowHeight) * 0.85
    );
    gradient.addColorStop(0, "rgba(29, 29, 31, 0.10)");
    gradient.addColorStop(1, "rgba(29, 29, 31, 0.35)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, windowWidth, windowHeight);

    ctx.restore();
  };

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      if (totalScrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableHeight;
      targetProgressRef.current = Math.min(1, Math.max(0, rawProgress));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isPreloaded) return;

    let animFrameId: number;
    const lerpFactor = 0.05;
    const MAX_STEP_PER_TICK = 0.0035;

    const renderLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;

      if (Math.abs(diff) > 0.0001) {
        let step = diff * lerpFactor;
        if (step > MAX_STEP_PER_TICK) step = MAX_STEP_PER_TICK;
        if (step < -MAX_STEP_PER_TICK) step = -MAX_STEP_PER_TICK;

        currentProgressRef.current += step;
        const p = currentProgressRef.current;
        setScrollProgress(p);

        const frameIdx = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(p * (TOTAL_FRAMES - 1)))
        );

        if (imagesRef.current.length > 0) {
          renderFrame(frameIdx);
        }
      }

      animFrameId = requestAnimationFrame(renderLoop);
    };

    renderFrame(0);
    animFrameId = requestAnimationFrame(renderLoop);

    return () => cancelAnimationFrame(animFrameId);
  }, [isPreloaded]);

  const getOverlayStyle = (overlay: TextOverlay) => {
    const { startProgress, endProgress } = overlay;
    if (scrollProgress < startProgress || scrollProgress > endProgress) {
      return {
        opacity: 0,
        pointerEvents: "none" as const,
      };
    }

    const duration = endProgress - startProgress;
    const localT = (scrollProgress - startProgress) / duration;

    let opacity = 0;
    if (localT < 0.18) {
      opacity = localT / 0.18;
    } else if (localT < 0.82) {
      opacity = 1;
    } else {
      opacity = (1 - localT) / 0.18;
    }

    return {
      opacity,
      pointerEvents: opacity > 0.5 ? ("auto" as const) : ("none" as const),
    };
  };

  const loadingPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-surface"
      style={{ height: "900vh" }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-10 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isPreloaded ? 1 : 0.15 }}
        />

        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(29,29,31,0.06), transparent 40%)' }}
        />

        {!isPreloaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#E8EDF2]/95 backdrop-blur-md px-6">
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full border-2 border-black/10 border-t-[#2B5372] animate-spin" />
              <div className="absolute text-[11px] font-semibold tabular-nums text-[#1A2834]">
                {loadingPercentage}%
              </div>
            </div>
            <div className="text-xs font-semibold tracking-[0.2em] text-[#1A2834] uppercase mb-2">
              {t("frame.loading")}
            </div>
            <div className="w-56 h-1 bg-black/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2B5372] transition-[width] duration-150"
                style={{ width: `${loadingPercentage}%` }}
              />
            </div>
            <p className="text-[11px] tabular-nums text-[#7A8A98] mt-3">
              {loadedCount} / {TOTAL_FRAMES} {t("frame.frames")}
            </p>
          </div>
        )}

        {isPreloaded && (
          <div className="relative z-20 max-w-4xl mx-auto px-6 w-full flex items-center justify-center">
            {TEXT_OVERLAYS.map((overlay) => {
              const overlayStyle = getOverlayStyle(overlay);
              const Icon = overlay.icon;
              const text = t(overlay.textKey);
              const highlight = t(overlay.highlightKey);

              return (
                <div
                  key={overlay.id}
                  className="absolute w-full flex flex-col items-center text-center px-4"
                  style={{
                    opacity: overlayStyle.opacity,
                    pointerEvents: overlayStyle.pointerEvents,
                  }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[rgba(43,83,114,0.10)] text-[#4A5A68] text-[11px] font-semibold tracking-[0.16em] uppercase mb-6 backdrop-blur-xl">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t(overlay.badgeKey)}</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#1A2834] text-balance leading-[1.1] max-w-3xl">
                    {text.split(highlight).map((part, idx, arr) => (
                      <span key={idx}>
                        {part}
                        {idx < arr.length - 1 && (
                          <span className="text-[#10B981]">{highlight}</span>
                        )}
                      </span>
                    ))}
                  </h2>
                </div>
              );
            })}
          </div>
        )}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[10px] tracking-[0.22em] text-[#E07A5F] uppercase">
            {t("frame.keep")}
          </span>
          <div className="text-[#E07A5F] scroll-hint">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
