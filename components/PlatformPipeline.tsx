"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

const STEPS = ["kre", "kie", "kge", "kee"] as const;

export default function PlatformPipeline() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-20 md:py-28 border-y border-black/[0.04]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12 md:mb-14 max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981] mb-4">
            {t("pipe.eyebrow")}
          </p>
          <h2 className="apple-headline text-3xl md:text-4xl font-semibold text-[#1A2834] mb-4">
            {t("pipe.title")}
          </h2>
          <p className="text-base md:text-lg text-[#4A5A68]">{t("pipe.body")}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 md:gap-3 relative">
          {STEPS.map((id, i) => (
            <motion.a
              key={id}
              href={`#${id}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group relative rounded-2xl bg-[#E8EDF2] border border-[rgba(43,83,114,0.10)] p-5 md:p-6 hover:bg-white hover:shadow-[var(--shadow-card-hover)] transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#2B5372]">
                  {t(`eng.${id}.code`)}
                </span>
                <span className="text-[11px] text-[#7A8A98] tabular-nums">0{i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-[#1A2834] mb-2 group-hover:text-[#2B5372] transition-colors">
                {t(`eng.${id}.name`)}
              </h3>
              <p className="text-sm text-[#4A5A68] leading-relaxed mb-4">
                {t(`pipe.${id}`)}
              </p>
              <ul className="space-y-1.5">
                {[1, 2, 3].map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-2 text-[12px] text-[#1A2834]/80"
                  >
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-[#10B981] shrink-0" />
                    {t(`pipe.${id}.f${n}`)}
                  </li>
                ))}
              </ul>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="hidden md:block absolute top-1/2 -right-2 translate-x-1/2 -translate-y-1/2 text-[#c7c7cc] text-lg z-10"
                >
                  →
                </span>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
