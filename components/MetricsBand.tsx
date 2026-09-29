"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";

function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  const formatted =
    decimals > 0
      ? n.toFixed(decimals)
      : Math.round(n).toLocaleString("en-US");

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

const METRICS = [
  { key: "m1", value: 69.26, decimals: 1, suffix: "%", prefix: "" },
  { key: "m2", value: 100000, decimals: 0, suffix: "", prefix: "" },
  { key: "m3", value: 12, decimals: 0, suffix: "", prefix: "" },
  { key: "m4", value: 0, decimals: 0, suffix: "", prefix: "" },
  { key: "m5", value: 3.48, decimals: 2, suffix: "M", prefix: "$" },
  { key: "m6", value: 90, decimals: 0, suffix: "", prefix: "" },
] as const;

export default function MetricsBand() {
  const { t } = useI18n();

  return (
    <section className="bg-[#E8EDF2] py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981] mb-4">
            {t("metrics.eyebrow")}
          </p>
          <h2 className="apple-headline text-3xl md:text-4xl font-semibold text-[#1A2834] mb-4">
            {t("metrics.title")}
          </h2>
          <p className="text-base text-[#4A5A68]">{t("metrics.body")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="rounded-2xl bg-white border border-[rgba(43,83,114,0.10)] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              <p className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1A2834] mb-2">
                <CountUp
                  value={m.value}
                  decimals={m.decimals}
                  prefix={m.prefix}
                  suffix={m.suffix}
                />
              </p>
              <p className="text-sm font-semibold text-[#1A2834] mb-1">
                {t(`metrics.${m.key}.label`)}
              </p>
              <p className="text-xs text-[#7A8A98] leading-relaxed">
                {t(`metrics.${m.key}.hint`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
