"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const CARDS = [
  { id: "cpis", engine: "KRE" },
  { id: "tds", engine: "KRE" },
  { id: "sanit", engine: "KIE" },
  { id: "airgap", engine: "KIE" },
  { id: "gci", engine: "KGE" },
  { id: "crq", engine: "KEE" },
] as const;

export default function CapabilityGrid() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12 md:mb-14 max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981] mb-4">
            {t("cap.eyebrow")}
          </p>
          <h2 className="apple-headline text-3xl md:text-4xl font-semibold text-[#1A2834] mb-4">
            {t("cap.title")}
          </h2>
          <p className="text-base md:text-lg text-[#4A5A68]">{t("cap.body")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-2xl border border-[rgba(43,83,114,0.10)] bg-[#E8EDF2] p-6 md:p-7 hover:bg-white hover:shadow-[var(--shadow-card-hover)] transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase px-2 py-0.5 rounded-full bg-white border border-[rgba(43,83,114,0.10)] text-[#2B5372]">
                  {c.engine}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#1A2834] mb-2">
                {t(`cap.${c.id}.title`)}
              </h3>
              <p className="text-sm text-[#4A5A68] leading-relaxed mb-4">
                {t(`cap.${c.id}.body`)}
              </p>
              <p className="text-[12px] font-mono text-[#7A8A98] leading-relaxed border-t border-black/[0.05] pt-3">
                {t(`cap.${c.id}.formula`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
