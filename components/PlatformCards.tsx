"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, Filter, FlaskConical, Landmark, Radar } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const CARDS = [
  {
    key: "kre",
    href: "/platform/kre",
    Icon: Filter,
    badge: "KRE",
  },
  {
    key: "kie",
    href: "/platform/kie",
    Icon: Brain,
    badge: "KIE",
  },
  {
    key: "kge",
    href: "/platform/kge",
    Icon: Landmark,
    badge: "KGE",
  },
  {
    key: "agentless",
    href: "/platform/agentless",
    Icon: Radar,
    badge: "BLOCK",
  },
  {
    key: "simulation",
    href: "/platform/simulation",
    Icon: FlaskConical,
    badge: "KEE",
  },
] as const;

export default function PlatformCards() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  return (
    <section className="bg-gradient-to-b from-[#F4F6F8] to-[#E8EDF2] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-3 text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981]"
          >
            {t("platform.cards.eyebrow")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ delay: 0.05, duration: 0.4, ease: "easeOut" }}
            className="apple-headline text-3xl font-semibold tracking-tight text-[#1A2834] text-balance md:text-5xl"
          >
            {t("platform.cards.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            className="mt-4 text-base leading-relaxed text-[#4A5A68] md:text-lg"
          >
            {t("platform.cards.body")}
          </motion.p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.key}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
            >
              <Link
                href={card.href}
                className="group relative flex h-full flex-col rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-8 card-accent-top shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] active:scale-[0.96]"
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10B981]/10">
                    <card.Icon className="h-5 w-5 text-[#10B981]" aria-hidden />
                  </span>
                  <span className="rounded-md bg-[#F4F6F8] px-2 py-1 font-mono text-[10px] font-semibold tracking-[0.12em] text-[#7A8A98]">
                    {card.badge}
                  </span>
                </span>
                <span className="apple-headline mt-5 block text-xl font-semibold tracking-tight text-[#1A2834] text-balance">
                  {t(`platform.cards.${card.key}.title`)}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-[#4A5A68]">
                  {t(`platform.cards.${card.key}.body`)}
                </span>
                <span className="mt-auto pt-5 text-sm font-semibold text-[#2B5372]">
                  {t(`platform.cards.${card.key}.link`)}{" "}
                  <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
