"use client";

import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  Check,
  ChevronDown,
  Clock,
  Coins,
  DollarSign,
  FileCheck,
  FileText,
  Heart,
  Shield,
  Sliders,
  TrendingDown,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  CHURN_SLIDER,
  CURRENCY_USD_KEY,
  DEFENSE_SLIDER,
  DOWNTIME_SLIDER,
  FINANCIAL_FIELDS,
  KVKK_COMPLIANCE,
  KVKK_GAPS,
  KVKK_SCALE,
  MARKET_CAP_FIELD,
  MC_INFO,
  MC_TIERS,
  OVERRIDE_FIELDS,
  RANSOM_SLIDER,
  SECTOR_VALUE_KEY,
  STOCK_SLIDER,
  type SimField,
  type SimSlider,
} from "@/components/showcase/simulation-data";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  DollarSign,
  Users,
  Heart,
  Shield,
  TrendingDown,
  Clock,
  BarChart3,
  Sliders,
  FileCheck,
  FileText,
  AlertTriangle,
  CheckSquare: Check,
  Activity,
  Coins,
};

const SECTIONS = [
  { id: "s1", icon: "Building2", rules: 1, tone: "blue" },
  { id: "s2", icon: "DollarSign", rules: 6, tone: "mint" },
  { id: "s3", icon: "BarChart3", rules: 3, tone: "copper" },
  { id: "s4", icon: "Sliders", rules: 5, tone: "copper" },
  { id: "s5", icon: "FileCheck", rules: 18, tone: "mint" },
  { id: "s6", icon: "Activity", rules: 0, tone: "blue" },
  { id: "s7", icon: "Coins", rules: 0, tone: "copper" },
] as const;

type Tone = "blue" | "mint" | "copper";

const TONE: Record<Tone, { bg: string; text: string; solid: string }> = {
  blue: { bg: "bg-[#2B5372]/10", text: "text-[#2B5372]", solid: "bg-[#2B5372]" },
  mint: { bg: "bg-[#10B981]/10", text: "text-[#10B981]", solid: "bg-[#10B981]" },
  copper: { bg: "bg-[#E07A5F]/10", text: "text-[#E07A5F]", solid: "bg-[#E07A5F]" },
};

function Toggle({ tone = "teal" }: { tone?: "teal" | "orange" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none flex h-6 w-11 shrink-0 cursor-default items-center rounded-full px-1 ${
        tone === "orange" ? "justify-end bg-[#E07A5F]" : "justify-end bg-[#10B981]"
      }`}
    >
      <span className="h-4 w-4 rounded-full bg-white" />
    </span>
  );
}

function SectionShell({
  index,
  icon,
  rules,
  tone,
  span,
  title,
  body,
  toggleTone,
  children,
}: {
  index: number;
  icon: string;
  rules: number;
  tone: Tone;
  span?: boolean;
  title: string;
  body?: string;
  toggleTone?: "teal" | "orange";
  children: React.ReactNode;
}) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const Icon = ICONS[icon] ?? Activity;
  const tc = TONE[tone];
  return (
    <motion.section
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      aria-label={title}
      className={`rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-5 md:p-6 ${span ? "lg:col-span-2" : ""}`}
    >
      <span className={`mb-4 block h-1 w-12 rounded-full ${tc.solid}`} aria-hidden="true" />
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tc.bg}`}>
          <Icon className={`h-5 w-5 ${tc.text}`} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-semibold text-[#1A2834]">{title}</span>
          <span className="mt-1 flex flex-wrap items-center gap-2">
            {rules > 0 && (
              <span className="rounded-full bg-[#E8EDF2] px-2.5 py-0.5 text-[11px] font-semibold tabular-nums text-[#2B5372]">
                {t("platform.simulation.config.rulesCount").replace("{n}", String(rules))}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#10B981]">
              <Check className="h-3 w-3" aria-hidden />
              {t("platform.simulation.config.triggered")}
            </span>
          </span>
        </span>
        <Toggle tone={toggleTone} />
      </div>
      {body && <p className="mt-3 text-sm leading-relaxed text-[#4A5A68]">{body}</p>}
      <div className="mt-4">{children}</div>
    </motion.section>
  );
}

function Field({ field }: { field: SimField }) {
  const { t } = useI18n();
  const Icon = ICONS[field.icon] ?? Activity;
  return (
    <div className="rounded-xl bg-white p-3 shadow-[0_0_0_1px_rgba(43,83,114,0.10)]">
      <span className="flex items-center gap-2 text-xs font-semibold text-[#1A2834]">
        <Icon className="h-4 w-4 shrink-0 text-[#2B5372]" aria-hidden />
        {t(field.labelKey)}
      </span>
      <span
        className={`mt-2 block rounded-lg border border-black/[0.08] bg-[#F4F6F8] px-3 py-2 font-mono text-sm font-semibold tabular-nums ${
          field.tone === "danger" ? "text-[#E11D48]" : "text-[#1A2834]"
        }`}
      >
        {field.prefixKey ? `${t(field.prefixKey)}: ` : ""}
        {field.value}
        {field.unitKey ? ` ${t(field.unitKey)}` : ""}
      </span>
    </div>
  );
}

function SliderVisual({ slider }: { slider: SimSlider }) {
  const { t } = useI18n();
  const fill =
    slider.tone === "teal"
      ? "bg-[#10B981]"
      : slider.tone === "orange"
        ? "bg-[#E07A5F]"
        : slider.tone === "red"
          ? "bg-[#E11D48]"
          : "bg-[#2B5372]";
  return (
    <div className="rounded-xl bg-white p-3 shadow-[0_0_0_1px_rgba(43,83,114,0.10)]">
      <span className="block text-xs font-semibold text-[#1A2834]">{t(slider.labelKey)}</span>
      <span className="relative mt-3 block h-1.5 rounded-full bg-[#E8EDF2]" aria-hidden="true">
        <span className={`absolute inset-y-0 left-0 rounded-full ${fill}`} style={{ width: `${slider.position}%` }} />
        <span
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_1px_rgba(43,83,114,0.20),0_1px_3px_rgba(43,83,114,0.20)]"
          style={{ left: `${slider.position}%` }}
        />
      </span>
      <span className="mt-2 flex justify-between gap-2 text-[10px] tabular-nums text-[#7A8A98]">
        {slider.markKeys.map((m) => (
          <span key={m}>{t(m)}</span>
        ))}
      </span>
    </div>
  );
}

function DropdownVisual({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-[#F4F6F8] px-3 py-2.5">
      <span className="text-[13px] text-[#1A2834]">{text}</span>
      <ChevronDown className="h-4 w-4 shrink-0 text-[#7A8A98]" aria-hidden />
    </div>
  );
}

export default function SimulationConfig() {
  const { t } = useI18n();

  return (
    <div className="mx-auto mt-12 max-w-7xl rounded-3xl border border-[rgba(43,83,114,0.10)] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
      <p className="apple-headline text-balance text-xl font-semibold tracking-tight text-[#1A2834] md:text-2xl">
        {t("platform.simulation.config.title")}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#4A5A68]">
        {t("platform.simulation.config.subtitle")}
      </p>
      <span className="mt-3 inline-block rounded-full bg-[#E8EDF2] px-3 py-1 text-xs font-semibold text-[#2B5372]">
        {t(SECTOR_VALUE_KEY)}
      </span>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">

        <SectionShell index={0} icon="Building2" rules={1} tone="blue" title={t("platform.simulation.config.sector.title")}>
          <span className="inline-block rounded-lg bg-[#F4F6F8] px-3 py-2 font-mono text-sm text-[#1A2834]">
            {t(SECTOR_VALUE_KEY)}
          </span>
        </SectionShell>

        <SectionShell index={1} icon="DollarSign" rules={6} tone="mint" title={t("platform.simulation.config.financial.title")} body={t("platform.simulation.config.financial.body")}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {FINANCIAL_FIELDS.slice(0, 4).map((f) => (
              <Field key={f.labelKey} field={f} />
            ))}
            <div className="col-span-2 md:col-span-1">
              <SliderVisual slider={CHURN_SLIDER} />
            </div>
            <div className="col-span-2 md:col-span-2">
              <SliderVisual slider={DOWNTIME_SLIDER} />
            </div>
          </div>
        </SectionShell>

        <SectionShell index={2} icon="BarChart3" rules={3} tone="copper" title={t("platform.simulation.config.stock.title")} body={t("platform.simulation.config.stock.body")}>
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-[#1A2834]">
              {t("platform.simulation.config.stock.publicLabel")}
            </span>
            <Toggle />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <Field field={MARKET_CAP_FIELD} />
            <SliderVisual slider={STOCK_SLIDER} />
          </div>
        </SectionShell>

        <SectionShell index={3} icon="Sliders" rules={5} tone="copper" title={t("platform.simulation.config.advanced.title")} body={t("platform.simulation.config.advanced.body")} toggleTone="orange">
          <SliderVisual slider={DEFENSE_SLIDER} />
          <div className="mt-3">
            <SliderVisual slider={RANSOM_SLIDER} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {OVERRIDE_FIELDS.slice(2).map((f) => (
              <Field key={f.labelKey} field={f} />
            ))}
          </div>
        </SectionShell>

        <SectionShell index={4} icon="FileCheck" rules={18} tone="mint" span title={t("platform.simulation.config.kvkk.title")} body={t("platform.simulation.config.kvkk.body")}>
          <div className="space-y-4">
            <div>
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#1A2834]">
                <FileText className="h-4 w-4 text-[#2B5372]" aria-hidden />
                {t("platform.simulation.config.kvkk.dataSubject.title")}
              </span>
              <div className="space-y-2">
                {KVKK_SCALE.map((s) => (
                  <DropdownVisual key={s.optionKey} text={`${t(s.labelKey)}: ${t(s.optionKey)}`} />
                ))}
              </div>
            </div>
            <div>
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#1A2834]">
                <AlertTriangle className="h-4 w-4 text-[#2B5372]" aria-hidden />
                {t("platform.simulation.config.kvkk.verbis.title")}
              </span>
              <div className="space-y-2">
                {KVKK_COMPLIANCE.map((s) => (
                  <DropdownVisual key={s.optionKey} text={`${t(s.labelKey)}: ${t(s.optionKey)}`} />
                ))}
              </div>
            </div>
            <div>
              <span className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#1A2834]">
                <Check className="h-4 w-4 text-[#2B5372]" aria-hidden />
                {t("platform.simulation.config.kvkk.gaps.title")}
              </span>
              <p className="mb-2 text-xs leading-relaxed text-[#7A8A98]">
                {t("platform.simulation.config.kvkk.gaps.body")}
              </p>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {KVKK_GAPS.map((g) => (
                  <div
                    key={g.labelKey}
                    className={`rounded-xl p-3 ${
                      g.active
                        ? "bg-[#E11D48]/[0.06] shadow-[0_0_0_1px_rgba(225,29,72,0.25)]"
                        : "bg-[#E8EDF2]"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2 text-xs font-semibold text-[#1A2834]">
                      {t(g.labelKey)}
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${g.active ? "bg-[#E11D48]" : "bg-[#7A8A98]"}`}
                        aria-hidden
                      />
                    </span>
                    <span className={`mt-1 block text-[11px] font-semibold tabular-nums ${g.active ? "text-[#E11D48]" : "text-[#7A8A98]"}`}>
                      {g.uplift}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell index={5} icon="Activity" rules={0} tone="blue" span title={t("platform.simulation.config.mc.title")} body={t("platform.simulation.config.mc.body")}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {MC_TIERS.map((m) => (
              <div
                key={m.label}
                className={`rounded-xl p-3 text-center ${
                  m.selected
                    ? "bg-white shadow-[0_0_0_1.5px_#10B981,0_4px_16px_rgba(16,185,129,0.15)]"
                    : "bg-[#E8EDF2]"
                }`}
              >
                <p className="text-lg font-semibold tabular-nums text-[#1A2834]">{m.label}</p>
                <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${m.badge}`}>
                  {t(m.iterationsKey)}
                </span>
                <p className="mt-0.5 text-[11px] font-semibold text-[#2B5372]">{t(m.nameKey)}</p>
                <p className="mt-1.5 text-[10px] leading-snug text-[#4A5A68]">{t(m.descKey)}</p>
                <p className="mt-1.5 text-[10px] tabular-nums text-[#7A8A98]">{t(m.timeKey)}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {MC_INFO.map((info) => (
              <div key={info.titleKey} className="rounded-xl bg-[#F4F6F8] p-4">
                <p className="text-xs font-semibold text-[#1A2834]">{t(info.titleKey)}</p>
                <ul className="mt-2 space-y-1.5">
                  {info.bodyKeys.map((b) => (
                    <li key={b} className="text-[11px] leading-relaxed text-[#4A5A68]">
                      {t(b)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionShell>

        <SectionShell index={6} icon="Coins" rules={0} tone="copper" span title={t("platform.simulation.config.currency.title")}>
          <span className="inline-block rounded-lg bg-[#10B981]/10 px-4 py-2 text-sm font-semibold tabular-nums text-[#10B981]">
            {t(CURRENCY_USD_KEY)}
          </span>
        </SectionShell>
      </div>
    </div>
  );
}
