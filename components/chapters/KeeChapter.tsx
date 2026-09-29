"use client";

import { motion } from "framer-motion";
import ScrollChapter from "@/components/ScrollChapter";
import ExposureGauge from "@/components/visuals/ExposureGauge";
import KvkkMatrix from "@/components/visuals/KvkkMatrix";
import LossMap from "@/components/visuals/LossMap";
import ParameterGrid from "@/components/visuals/ParameterGrid";
import RoiDuel from "@/components/visuals/RoiDuel";
import {
  beatOpacity,
  windowT,
} from "@/hooks/useScrollChapterProgress";
import { useI18n } from "@/lib/i18n";

function KeeVisual({
  progress,
}: {
  progress: number;
  activeBeat: number;
}) {
  const t1 = windowT(progress, 0.02, 0.21);
  const t2 = windowT(progress, 0.21, 0.4);
  const t3 = windowT(progress, 0.4, 0.59);
  const t4 = windowT(progress, 0.59, 0.78);
  const t5 = windowT(progress, 0.78, 0.96);

  const visuals = [
    <LossMap key="loss" progress={t1} />,
    <ExposureGauge key="gauge" progress={t2} />,
    <RoiDuel key="roi" progress={t3} />,
    <KvkkMatrix key="kvkk" progress={t4} />,
    <ParameterGrid key="params" />,
  ];

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="relative min-h-[480px]">
        {visuals.map((v, i) => {
          const opacity = beatOpacity(progress, i, 5);
          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity,
                pointerEvents: opacity > 0.45 ? "auto" : "none",
              }}
              aria-hidden={opacity < 0.2}
            >
              <div className="w-full">{v}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function KeeChapter() {
  const { t } = useI18n();

  const beats = [1, 2, 3, 4, 5].map((n) => ({
    badge: t(`kee.b${n}.badge`),
    title: t(`kee.b${n}.title`),
    body: t(`kee.b${n}.body`),
  }));

  return (
    <>
      <div className="bg-[#E8EDF2]">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-4 md:pt-32">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-3 text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981]"
          >
            {t("kee.intro.eyebrow")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ delay: 0.05, duration: 0.4, ease: "easeOut" }}
            className="apple-headline max-w-2xl text-3xl font-semibold tracking-tight text-[#1A2834] text-balance md:text-5xl"
          >
            {t("kee.intro.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-[#4A5A68] md:text-lg"
          >
            {t("kee.intro.body")}
          </motion.p>
        </div>
      </div>
      <ScrollChapter
        id="kee"
        name={t("eng.kee.name")}
        eyebrow={t("eng.kee.eyebrow")}
        beats={beats}
        surface="surface"
        heightVh={400}
        renderVisual={(progress, activeBeat) => (
          <KeeVisual progress={progress} activeBeat={activeBeat} />
        )}
      />
    </>
  );
}
