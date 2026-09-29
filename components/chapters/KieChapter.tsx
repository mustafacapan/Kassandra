"use client";

import { motion } from "framer-motion";
import ScrollChapter from "@/components/ScrollChapter";
import ExecutiveStory from "@/components/visuals/ExecutiveStory";
import LeakRisk from "@/components/visuals/LeakRisk";
import ProviderChoice from "@/components/visuals/ProviderChoice";
import SanitizationFlow from "@/components/visuals/SanitizationFlow";
import {
  beatOpacity,
  windowT,
} from "@/hooks/useScrollChapterProgress";
import { useI18n } from "@/lib/i18n";

function KieVisual({
  progress,
}: {
  progress: number;
  activeBeat: number;
}) {
  const t1 = windowT(progress, 0.02, 0.28);
  const t2 = windowT(progress, 0.25, 0.52);
  const t3 = windowT(progress, 0.5, 0.76);
  const t4 = windowT(progress, 0.74, 0.96);

  const visuals = [
    <LeakRisk key="leak" progress={t1} />,
    <SanitizationFlow key="flow" progress={t2} />,
    <ExecutiveStory key="story" progress={t3} />,
    <ProviderChoice key="provider" progress={t4} />,
  ];

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="relative min-h-[480px]">
        {visuals.map((v, i) => {
          const opacity = beatOpacity(progress, i, 4);
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

export default function KieChapter() {
  const { t } = useI18n();

  const beats = [1, 2, 3, 4].map((n) => ({
    badge: t(`kie.b${n}.badge`),
    title: t(`kie.b${n}.title`),
    body: t(`kie.b${n}.body`),
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
            {t("kie.eyebrow")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ delay: 0.05, duration: 0.4, ease: "easeOut" }}
            className="apple-headline max-w-2xl text-3xl font-semibold tracking-tight text-[#1A2834] text-balance md:text-5xl"
          >
            {t("kie.intro.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-[#4A5A68] md:text-lg"
          >
            {t("kie.intro.body")}
          </motion.p>
        </div>
      </div>
      <ScrollChapter
        id="kie"
        name={t("eng.kie.name")}
        eyebrow={t("eng.kie.eyebrow")}
        beats={beats}
        surface="surface"
        heightVh={400}
        renderVisual={(progress, activeBeat) => (
          <KieVisual progress={progress} activeBeat={activeBeat} />
        )}
      />
    </>
  );
}
