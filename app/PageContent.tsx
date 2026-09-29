"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FrameScrollytelling from "@/components/FrameScrollytelling";
import TempleHero from "@/components/TempleHero";
import DelphiHero from "@/components/DelphiHero";
import PlatformCards from "@/components/PlatformCards";
import ProblemChapter from "@/components/chapters/ProblemChapter";
import KreChapter from "@/components/chapters/KreChapter";
import KieChapter from "@/components/chapters/KieChapter";
import KgeChapter from "@/components/chapters/KgeChapter";
import KeeChapter from "@/components/chapters/KeeChapter";
import ArchitectureChapter from "@/components/chapters/ArchitectureChapter";
import { I18nProvider, useI18n } from "@/lib/i18n";

// ─── Types ───
interface KVKKState {
  scale: string;
  sensitivity: string;
  missingSafeguards: string[];
  notification: string;
  verbis: string;
  location: string;
  ownership: string;
  access: string;
  lineage: string;
  repeat: string;
  voluntary: string;
  exposure: string;
  revenue: string;
  sector: string;
}

// ─── KVKK Calculator Logic (DO NOT CHANGE) ───
const safeguardsList = [
  { id: "discovery", labelKey: "sg.discovery" },
  { id: "access", labelKey: "sg.access" },
  { id: "encryption", labelKey: "sg.encryption" },
  { id: "masking", labelKey: "sg.masking" },
  { id: "logging", labelKey: "sg.logging" },
  { id: "dlp", labelKey: "sg.dlp" },
];

const safeguardLabels: Record<string, { tr: string; en: string }> = {
  "sg.discovery": {
    tr: "Veri Keşfi & Sınıflandırma (DSPM)",
    en: "Data Discovery & Classification (DSPM)",
  },
  "sg.access": {
    tr: "Erişim Kontrolü & Yetki Matrisi",
    en: "Access Control & Privilege Matrix",
  },
  "sg.encryption": {
    tr: "Veri Şifreleme (Encryption)",
    en: "Data Encryption",
  },
  "sg.masking": {
    tr: "Veri Maskeleme / Anonimleştirme",
    en: "Data Masking / Anonymization",
  },
  "sg.logging": { tr: "Loglama & SIEM", en: "Logging & SIEM" },
  "sg.dlp": { tr: "DLP (Veri Kaybı Önleme)", en: "DLP (Data Loss Prevention)" },
};

function calculateKVKK(params: KVKKState) {
  const baseMap: Record<string, number> = {
    small: 50000,
    medium: 200000,
    large: 1000000,
  };
  let base = baseMap[params.scale] || 50000;
  let multiplier = 1;

  if (params.sensitivity === "sensitive") multiplier *= 1.8;
  else if (params.sensitivity === "biometric") multiplier *= 2.0;

  const safeguardBoost = 1 + params.missingSafeguards.length * 0.18;
  multiplier *= Math.min(safeguardBoost, 2.0);

  if (params.notification === "late") multiplier *= 1.35;
  else if (params.notification === "hidden") multiplier *= 1.75;

  if (params.verbis === "shadow") multiplier *= 1.25;

  if (params.location === "abroad") multiplier *= 1.4;
  else if (params.location === "test") multiplier *= 1.25;

  if (params.ownership === "orphan") multiplier *= 1.2;
  else if (params.ownership === "zombie") multiplier *= 1.35;

  if (params.access === "over") multiplier *= 1.3;
  else if (params.access === "public") multiplier *= 1.5;

  if (params.lineage === "uncontrolled") multiplier *= 1.25;

  if (params.repeat === "repeat") multiplier *= 1.3;
  else if (params.repeat === "multiple") multiplier *= 1.5;

  if (params.voluntary === "reported") multiplier *= 0.75;
  else if (params.voluntary === "obstructed") multiplier *= 1.3;

  if (params.exposure === "weeks") multiplier *= 1.2;
  else if (params.exposure === "months") multiplier *= 1.4;

  if (params.revenue === "medium") multiplier *= 0.7;
  else if (params.revenue === "small") multiplier *= 0.5;

  if (params.sector === "critical") multiplier *= 1.2;
  else if (params.sector === "low") multiplier *= 0.9;

  let total = base * multiplier;
  total = Math.max(total, 50000);

  return { total: Math.round(total), multiplier, base };
}

function FadeUp({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-4% 0px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function KVKKCalculator() {
  const { t, locale } = useI18n();
  const [params, setParams] = useState<KVKKState>({
    scale: "medium",
    sensitivity: "standard",
    missingSafeguards: [],
    notification: "ontime",
    verbis: "compliant",
    location: "local",
    ownership: "active",
    access: "least",
    lineage: "isolated",
    repeat: "first",
    voluntary: "none",
    exposure: "days",
    revenue: "large",
    sector: "medium",
  });

  const result = calculateKVKK(params);

  const toggleSafeguard = (id: string) => {
    setParams((p) => ({
      ...p,
      missingSafeguards: p.missingSafeguards.includes(id)
        ? p.missingSafeguards.filter((x) => x !== id)
        : [...p.missingSafeguards, id],
    }));
  };

  const opt = (tr: string, en: string) => (locale === "tr" ? tr : en);

  const Select = ({
    label,
    value,
    onChange,
    options,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
  }) => (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-[#7A8A98] uppercase tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-[#E8EDF2] border border-black/[0.08] px-4 py-3 text-sm text-[#1A2834] outline-none focus:border-[#2B5372]/50 focus:ring-2 focus:ring-[#2B5372]/15 transition-all appearance-none cursor-pointer hover:bg-black/[0.03]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="rounded-[2rem] border border-[rgba(43,83,114,0.10)] bg-white shadow-[0_20px_60px_rgba(43,83,114,0.10)] p-8 md:p-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-[#2B5372] flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#1A2834]">{t("kvkk.heading")}</h3>
          <p className="text-xs text-[#7A8A98]">{t("kvkk.desc")}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Select
          label={t("kvkk.scale")}
          value={params.scale}
          onChange={(v) => setParams((p) => ({ ...p, scale: v }))}
          options={[
            { value: "small", label: opt("Küçük Ölçek (<10K)", "Small scale (<10K)") },
            { value: "medium", label: opt("Orta Ölçek (10K-100K)", "Medium (10K-100K)") },
            { value: "large", label: opt("Kitlesel İhlal (>100K)", "Mass breach (>100K)") },
          ]}
        />
        <Select
          label={t("kvkk.sensitivity")}
          value={params.sensitivity}
          onChange={(v) => setParams((p) => ({ ...p, sensitivity: v }))}
          options={[
            { value: "standard", label: opt("Standart PII (1.0x)", "Standard PII (1.0x)") },
            { value: "sensitive", label: opt("Özel Nitelikli (1.8x)", "Special category (1.8x)") },
            { value: "biometric", label: opt("Biyometrik / Sağlık (2.0x)", "Biometric / Health (2.0x)") },
          ]}
        />
        <Select
          label={t("kvkk.notification")}
          value={params.notification}
          onChange={(v) => setParams((p) => ({ ...p, notification: v }))}
          options={[
            { value: "ontime", label: opt("Zamanında (≤72s)", "On time (≤72h)") },
            { value: "late", label: opt("Geç Bildirim (+35%)", "Late notice (+35%)") },
            { value: "hidden", label: opt("Gizlendi (+75%)", "Concealed (+75%)") },
          ]}
        />
        <Select
          label={t("kvkk.verbis")}
          value={params.verbis}
          onChange={(v) => setParams((p) => ({ ...p, verbis: v }))}
          options={[
            { value: "compliant", label: opt("Envanter Uyumlu", "Inventory compliant") },
            { value: "shadow", label: opt("Gölge Veri (+25%)", "Shadow data (+25%)") },
          ]}
        />
        <Select
          label={t("kvkk.location")}
          value={params.location}
          onChange={(v) => setParams((p) => ({ ...p, location: v }))}
          options={[
            { value: "local", label: opt("Yerel / Regüle Ortam", "Local / regulated") },
            { value: "abroad", label: opt("Yurt Dışı Bulut (+40%)", "Foreign cloud (+40%)") },
            { value: "test", label: opt("Test/Dev Ortamı (+25%)", "Test/Dev (+25%)") },
          ]}
        />
        <Select
          label={t("kvkk.ownership")}
          value={params.ownership}
          onChange={(v) => setParams((p) => ({ ...p, ownership: v }))}
          options={[
            { value: "active", label: opt("Aktif & Sorumlu Belli", "Active & owned") },
            { value: "orphan", label: opt("Yetim Veri (+20%)", "Orphan data (+20%)") },
            { value: "zombie", label: opt("Zombi Veri (+35%)", "Zombie data (+35%)") },
          ]}
        />
        <Select
          label={t("kvkk.access")}
          value={params.access}
          onChange={(v) => setParams((p) => ({ ...p, access: v }))}
          options={[
            { value: "least", label: opt("En Az Yetki İlkesi", "Least privilege") },
            { value: "over", label: opt("Aşırı Yetkilendirme (+30%)", "Over-privileged (+30%)") },
            { value: "public", label: opt("Herkese Açık (+50%)", "Publicly open (+50%)") },
          ]}
        />
        <Select
          label={t("kvkk.lineage")}
          value={params.lineage}
          onChange={(v) => setParams((p) => ({ ...p, lineage: v }))}
          options={[
            { value: "isolated", label: opt("İzole & Kontrollü", "Isolated & controlled") },
            { value: "uncontrolled", label: opt("Kontrolsüz Hareket (+25%)", "Uncontrolled flow (+25%)") },
          ]}
        />
        <Select
          label={t("kvkk.repeat")}
          value={params.repeat}
          onChange={(v) => setParams((p) => ({ ...p, repeat: v }))}
          options={[
            { value: "first", label: opt("İlk İhlal", "First incident") },
            { value: "repeat", label: opt("Tekerrür (+30%)", "Repeat (+30%)") },
            { value: "multiple", label: opt("Mükerrer (+50%)", "Multiple (+50%)") },
          ]}
        />
        <Select
          label={t("kvkk.voluntary")}
          value={params.voluntary}
          onChange={(v) => setParams((p) => ({ ...p, voluntary: v }))}
          options={[
            { value: "none", label: opt("Bildirim Yok", "No self-report") },
            { value: "reported", label: opt("Kendi Tespit & Bildirim (-25%)", "Self-detected & reported (-25%)") },
            { value: "obstructed", label: opt("İşbirliği Engellendi (+30%)", "Cooperation blocked (+30%)") },
          ]}
        />
        <Select
          label={t("kvkk.exposure")}
          value={params.exposure}
          onChange={(v) => setParams((p) => ({ ...p, exposure: v }))}
          options={[
            { value: "days", label: opt("Günler", "Days") },
            { value: "weeks", label: opt("Haftalar (+20%)", "Weeks (+20%)") },
            { value: "months", label: opt("Aylar (+40%)", "Months (+40%)") },
          ]}
        />
        <Select
          label={t("kvkk.revenue")}
          value={params.revenue}
          onChange={(v) => setParams((p) => ({ ...p, revenue: v }))}
          options={[
            { value: "large", label: opt("> 100M TL (İndirim Yok)", "> 100M TRY (no relief)") },
            { value: "medium", label: opt("10M - 100M TL (-30%)", "10M - 100M TRY (-30%)") },
            { value: "small", label: opt("< 10M TL (-50%)", "< 10M TRY (-50%)") },
          ]}
        />
        <Select
          label={t("kvkk.sector")}
          value={params.sector}
          onChange={(v) => setParams((p) => ({ ...p, sector: v }))}
          options={[
            { value: "critical", label: opt("Kritik (Finans/Sağlık) (+20%)", "Critical (Finance/Health) (+20%)") },
            { value: "medium", label: opt("Orta (Teknoloji/E-Ticaret)", "Medium (Tech/eCommerce)") },
            { value: "low", label: opt("Düşük (Perakende) (-10%)", "Low (Retail) (-10%)") },
          ]}
        />
      </div>

      <div className="mt-8">
        <label className="text-xs font-semibold text-[#7A8A98] uppercase tracking-wider block mb-3">
          {t("kvkk.safeguards")}
        </label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {safeguardsList.map((s) => (
            <button
              key={s.id}
              onClick={() => toggleSafeguard(s.id)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                params.missingSafeguards.includes(s.id)
                  ? "border-rose-300 bg-rose-50 text-rose-700"
                  : "border-black/[0.08] bg-[#E8EDF2] text-[#4A5A68] hover:bg-black/[0.03] hover:text-[#1A2834]"
              }`}
            >
              <div
                className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                  params.missingSafeguards.includes(s.id)
                    ? "bg-rose-500 border-rose-500"
                    : "border-[#c7c7cc] bg-white"
                }`}
              >
                {params.missingSafeguards.includes(s.id) && (
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </div>
              {safeguardLabels[s.labelKey][locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[#2B5372]/20 bg-gradient-to-r from-[#2B5372]/[0.06] to-[#10B981]/[0.06] p-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#2B5372] uppercase tracking-wider mb-1">
              {t("kvkk.result")}
            </p>
            <motion.p
              key={result.total}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="text-4xl md:text-5xl font-semibold text-[#1A2834] tracking-tight"
            >
              ₺ {result.total.toLocaleString("tr-TR")}
            </motion.p>
            <p className="text-xs text-[#7A8A98] mt-1">
              {t("kvkk.base")}: ₺{result.base.toLocaleString("tr-TR")} × {t("kvkk.mult")}:{" "}
              {result.multiplier.toFixed(2)}x
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl bg-white border border-[rgba(43,83,114,0.10)] px-4 py-3 text-center min-w-[80px]">
              <p className="text-lg font-semibold text-[#1A2834]">
                {params.missingSafeguards.length}
              </p>
              <p className="text-[10px] text-[#7A8A98] uppercase">{t("kvkk.missing")}</p>
            </div>
            <div className="rounded-xl bg-white border border-[rgba(43,83,114,0.10)] px-4 py-3 text-center min-w-[80px]">
              <p className="text-lg font-semibold text-[#1A2834]">
                {((result.multiplier - 1) * 100).toFixed(0)}%
              </p>
              <p className="text-[10px] text-[#7A8A98] uppercase">{t("kvkk.increase")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeContent() {
  const { t, locale, toggleLocale } = useI18n();

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F6F8] text-[#1A2834]">
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 h-12 md:h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <img
              src="/logo.jpeg"
              alt="Kassandra"
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-[13px] md:text-sm font-semibold tracking-tight">
              Kassandra Prophecy
            </span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-[12px] text-[#1A2834]/80">
            <Link href="/platform" className="hover:text-[#2B5372] transition-colors">
              {t("nav.engines")}
            </Link>
            <Link href="/platform/agentless" className="hover:text-[#2B5372] transition-colors">
              {t("nav.agentless")}
            </Link>
            <Link href="/platform/simulation" className="hover:text-[#2B5372] transition-colors">
              {t("nav.simulation")}
            </Link>
            <Link href="/about" className="hover:text-[#2B5372] transition-colors">
              {t("nav.about")}
            </Link>
            <a href="#experience" className="hover:text-[#2B5372] transition-colors">
              {t("nav.experience")}
            </a>
            <a href="#kvkk" className="hover:text-[#2B5372] transition-colors">
              {t("nav.kvkk")}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/blog" className="text-sm font-medium text-[#4A5A68] hover:text-[#2B5372] transition-colors">
              {t("nav.blog")}
            </Link>
            <button
              type="button"
              onClick={toggleLocale}
              aria-label="Toggle language"
              className="rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-[#1A2834] hover:border-[#2B5372]/40 hover:text-[#2B5372] transition-colors"
            >
              {locale === "tr" ? "EN" : "TR"}
            </button>
            <a href="#cta" className="btn-apple !text-[12px] !py-1.5 !px-4">
              {t("nav.briefing")}
            </a>
          </div>
        </div>
      </nav>

      <TempleHero />

      <PlatformCards />

      <section className="bg-gradient-to-b from-[#E8EDF2] to-[#F4F6F8] py-28 md:py-36 overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeUp>
            <h2 className="apple-headline text-3xl md:text-5xl lg:text-[3.5rem] font-semibold text-[#1A2834] mb-6">
              {t("promise.title1")}
              <br />
              {t("promise.title2")}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg md:text-xl text-[#4A5A68] max-w-2xl mx-auto">
              {t("promise.body")}
            </p>
          </FadeUp>
        </div>
        <FadeUp delay={0.15} className="mx-auto mt-14 max-w-6xl px-6 md:mt-16">
          <DelphiHero />
        </FadeUp>
      </section>

      <ProblemChapter />

      <div id="modules">
        <KreChapter />
        <KieChapter />
        <KgeChapter />
        <KeeChapter />
      </div>

      <section id="experience" className="relative">
        <div className="bg-white py-20 md:py-28 text-center px-6">
          <FadeUp>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981] mb-4">
              {t("exp.eyebrow")}
            </p>
            <h2 className="apple-headline text-3xl md:text-5xl font-semibold text-[#1A2834] mb-4">
              {t("exp.title")}
            </h2>
            <p className="text-[#4A5A68] text-lg max-w-xl mx-auto">{t("exp.body")}</p>
          </FadeUp>
        </div>
        <FrameScrollytelling />
      </section>

      <section className="bg-white py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeUp>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981] mb-4">
                {t("stats.eyebrow")}
              </p>
              <h2 className="apple-headline text-3xl md:text-4xl font-semibold text-[#1A2834]">
                {t("stats.title")}
              </h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6 text-center lg:text-left">
              {[
                { value: "$42M", label: t("stats.s1") },
                { value: "9+", label: t("stats.s2") },
                { value: "90", label: t("stats.s3") },
                { value: "0", label: t("stats.s4") },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  <p className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1A2834] mb-2">
                    {s.value}
                  </p>
                  <p className="text-sm text-[#7A8A98]">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#E8EDF2] py-28 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeUp>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981] mb-4">
                {t("audience.eyebrow")}
              </p>
              <h2 className="apple-headline text-3xl md:text-4xl font-semibold text-[#1A2834]">
                {t("audience.title")}
              </h2>
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-2 gap-6">
            {(["ciso", "cfo", "team", "compliance"] as const).map((role, i) => (
              <FadeUp key={role} delay={i * 0.05}>
                <div className="rounded-2xl bg-white border border-[rgba(43,83,114,0.10)] p-6 md:p-7 h-full shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <h3 className="text-lg font-semibold text-[#1A2834] mb-2">
                    {t(`audience.${role}.title`)}
                  </h3>
                  <p className="text-sm text-[#4A5A68] leading-relaxed">
                    {t(`audience.${role}.body`)}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="kvkk" className="bg-white py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#10B981] mb-4">
                {t("kvkk.eyebrow")}
              </p>
              <h2 className="apple-headline text-3xl md:text-5xl font-semibold text-[#1A2834] mb-4">
                {t("kvkk.title")}
              </h2>
              <p className="text-[#4A5A68] max-w-2xl mx-auto text-lg">{t("kvkk.sub")}</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.12}>
            <KVKKCalculator />
          </FadeUp>
        </div>
      </section>

      <ArchitectureChapter />

      <section id="cta" className="bg-gradient-to-b from-[#F4F6F8] to-[#E8EDF2] py-28 md:py-40 overflow-hidden">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <h2 className="apple-headline text-4xl md:text-6xl font-semibold text-[#1A2834] mb-6">
              {t("cta.title1")}
              <br />
              {t("cta.title2")}
            </h2>
            <p className="text-lg text-[#4A5A68] mb-10 max-w-xl mx-auto">{t("cta.body")}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="btn-apple"
              >
                {t("cta.primary")}
              </Link>
              <a href="#kvkk" className="btn-apple-ghost">
                {t("cta.secondary")}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="border-t border-[rgba(43,83,114,0.10)] bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <img src="/logo.jpeg" alt="" className="h-7 w-7 rounded-full object-cover" />
            <span className="text-sm font-semibold">Kassandra Prophecy</span>
          </div>
          <p className="text-xs text-[#7A8A98]">{t("footer.tag")}</p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-[#7A8A98] md:justify-end">
            <Link href="/blog" className="transition-colors hover:text-[#2B5372]">{t('nav.blog')}</Link>
            <Link href="/about" className="transition-colors hover:text-[#2B5372]">{t("nav.about")}</Link>
            <Link href="/privacy" className="transition-colors hover:text-[#2B5372]">Privacy Policy</Link>
            <Link href="/kvkk" className="transition-colors hover:text-[#2B5372]">KVKK</Link>
            <Link href="/terms" className="transition-colors hover:text-[#2B5372]">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function PageContent() {
  return (
    <I18nProvider>
      <HomeContent />
    </I18nProvider>
  );
}
