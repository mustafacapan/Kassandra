// Static showcase data for the /platform/simulation config card.
// All visible strings are i18n keys under platform.simulation.config.*.
// Numeric values (amounts, %, $, ₺) stay literal. Read-only: div/span only.

export interface SimField {
  icon: string;
  labelKey: string;
  value: string;
  prefixKey?: string;
  unitKey?: string;
  tone?: "plain" | "danger";
}

export interface SimSlider {
  labelKey: string;
  position: number;
  tone: "teal" | "orange" | "red" | "blue";
  markKeys: string[];
}

export interface SimSection {
  id: string;
  icon: string;
  titleKey: string;
  bodyKey: string;
  rules: number;
}

export const SECTOR_VALUE_KEY = "platform.simulation.config.sector.value";

export const FINANCIAL_FIELDS: SimField[] = [
  { icon: "DollarSign", labelKey: "platform.simulation.config.financial.revenue", value: "$50,000,000" },
  { icon: "Users", labelKey: "platform.simulation.config.financial.customerCount", value: "500,000", unitKey: "platform.simulation.config.financial.customerUnit" },
  { icon: "Heart", labelKey: "platform.simulation.config.financial.ltv", value: "$500" },
  { icon: "Shield", labelKey: "platform.simulation.config.financial.insurance", value: "$250,000" },
  { icon: "TrendingDown", labelKey: "platform.simulation.config.financial.churn", value: "%5.5" },
  { icon: "Clock", labelKey: "platform.simulation.config.financial.downtime", value: "24", unitKey: "platform.simulation.config.financial.downtimeUnit" },
];

export const CHURN_SLIDER: SimSlider = {
  labelKey: "platform.simulation.config.financial.churn",
  position: 21,
  tone: "red",
  markKeys: [
    "platform.simulation.config.financial.churn.low",
    "platform.simulation.config.financial.churn.standard",
    "platform.simulation.config.financial.churn.high",
  ],
};

export const DOWNTIME_SLIDER: SimSlider = {
  labelKey: "platform.simulation.config.financial.downtime",
  position: 14,
  tone: "blue",
  markKeys: [
    "platform.simulation.config.financial.downtime.0h",
    "platform.simulation.config.financial.downtime.72h",
    "platform.simulation.config.financial.downtime.168h",
  ],
};

export const STOCK_SLIDER: SimSlider = {
  labelKey: "platform.simulation.config.stock.dropOverride",
  position: 96,
  tone: "red",
  markKeys: [
    "platform.simulation.config.stock.drop.0",
    "platform.simulation.config.stock.drop.50",
    "platform.simulation.config.stock.drop.156",
  ],
};

export const MARKET_CAP_FIELD: SimField = {
  icon: "BarChart3",
  labelKey: "platform.simulation.config.stock.marketCap",
  value: "$500,000,000",
};

export const OVERRIDE_FIELDS: SimField[] = [
  { icon: "Shield", labelKey: "platform.simulation.config.advanced.defense", value: "%50" },
  { icon: "TrendingDown", labelKey: "platform.simulation.config.advanced.ransomRevenue", value: "%3.0" },
  { icon: "Shield", labelKey: "platform.simulation.config.advanced.insuranceHike", value: "%20" },
  { icon: "DollarSign", labelKey: "platform.simulation.config.advanced.creditMonitoring", value: "$15.00" },
  { icon: "AlertTriangle", labelKey: "platform.simulation.config.advanced.prCrisis", value: "$50,000" },
  { icon: "AlertTriangle", labelKey: "platform.simulation.config.advanced.ransomBase", value: "$250,000", tone: "danger" },
  { icon: "Clock", labelKey: "platform.simulation.config.advanced.recovery", value: "$50,000", prefixKey: "platform.simulation.config.advanced.default" },
  { icon: "FileText", labelKey: "platform.simulation.config.advanced.litigation", value: "$150,000", prefixKey: "platform.simulation.config.advanced.default" },
];

export const DEFENSE_SLIDER: SimSlider = {
  labelKey: "platform.simulation.config.advanced.defense",
  position: 50,
  tone: "teal",
  markKeys: [
    "platform.simulation.config.advanced.defense.0",
    "platform.simulation.config.advanced.defense.40",
    "platform.simulation.config.advanced.defense.100",
  ],
};

export const RANSOM_SLIDER: SimSlider = {
  labelKey: "platform.simulation.config.advanced.ransomRevenue",
  position: 28,
  tone: "orange",
  markKeys: [
    "platform.simulation.config.advanced.ransom.low",
    "platform.simulation.config.advanced.ransom.standard",
    "platform.simulation.config.advanced.ransom.high",
  ],
};

export interface KvkkOption {
  labelKey: string;
  optionKey: string;
}

export const KVKK_SCALE: KvkkOption[] = [
  { labelKey: "platform.simulation.config.kvkk.scale", optionKey: "platform.simulation.config.kvkk.scale.option.medium" },
  { labelKey: "platform.simulation.config.kvkk.sensitivity", optionKey: "platform.simulation.config.kvkk.sensitivity.option.standard" },
  { labelKey: "platform.simulation.config.kvkk.notification", optionKey: "platform.simulation.config.kvkk.notification.option.ontime" },
  { labelKey: "platform.simulation.config.kvkk.exposure", optionKey: "platform.simulation.config.kvkk.exposure.option.short" },
];

export const KVKK_COMPLIANCE: KvkkOption[] = [
  { labelKey: "platform.simulation.config.kvkk.verbis.record", optionKey: "platform.simulation.config.kvkk.verbis.record.option.compliant" },
  { labelKey: "platform.simulation.config.kvkk.storage", optionKey: "platform.simulation.config.kvkk.storage.option.local" },
  { labelKey: "platform.simulation.config.kvkk.lifecycle", optionKey: "platform.simulation.config.kvkk.lifecycle.option.active" },
  { labelKey: "platform.simulation.config.kvkk.access", optionKey: "platform.simulation.config.kvkk.access.option.least" },
  { labelKey: "platform.simulation.config.kvkk.lineage", optionKey: "platform.simulation.config.kvkk.lineage.option.controlled" },
  { labelKey: "platform.simulation.config.kvkk.repeat", optionKey: "platform.simulation.config.kvkk.repeat.option.first" },
  { labelKey: "platform.simulation.config.kvkk.voluntary", optionKey: "platform.simulation.config.kvkk.voluntary.option.detected" },
];

export interface KvkkGap {
  labelKey: string;
  uplift: string;
  active: boolean;
}

export const KVKK_GAPS: KvkkGap[] = [
  { labelKey: "platform.simulation.config.kvkk.gaps.discovery", uplift: "+15%", active: true },
  { labelKey: "platform.simulation.config.kvkk.gaps.rbac", uplift: "+15%", active: false },
  { labelKey: "platform.simulation.config.kvkk.gaps.encryption", uplift: "+20%", active: false },
  { labelKey: "platform.simulation.config.kvkk.gaps.masking", uplift: "+15%", active: false },
  { labelKey: "platform.simulation.config.kvkk.gaps.siem", uplift: "+15%", active: false },
  { labelKey: "platform.simulation.config.kvkk.gaps.dlp", uplift: "+20%", active: false },
];

export interface McTier {
  label: string;
  badge: string;
  nameKey: string;
  iterationsKey: string;
  descKey: string;
  timeKey: string;
  selected?: boolean;
}

export const MC_TIERS: McTier[] = [
  { label: "10K", badge: "bg-[#E07A5F]/10 text-[#E07A5F]", nameKey: "platform.simulation.config.mc.10k.badge", iterationsKey: "platform.simulation.config.mc.10k.iterations", descKey: "platform.simulation.config.mc.10k.body", timeKey: "platform.simulation.config.mc.10k.time" },
  { label: "50K", badge: "bg-[#2B5372]/10 text-[#2B5372]", nameKey: "platform.simulation.config.mc.50k.badge", iterationsKey: "platform.simulation.config.mc.50k.iterations", descKey: "platform.simulation.config.mc.50k.body", timeKey: "platform.simulation.config.mc.50k.time" },
  { label: "100K", badge: "bg-[#10B981]/10 text-[#10B981]", nameKey: "platform.simulation.config.mc.100k.badge", iterationsKey: "platform.simulation.config.mc.100k.iterations", descKey: "platform.simulation.config.mc.100k.body", timeKey: "platform.simulation.config.mc.100k.time", selected: true },
  { label: "500K", badge: "bg-[#1A2834]/10 text-[#1A2834]", nameKey: "platform.simulation.config.mc.500k.badge", iterationsKey: "platform.simulation.config.mc.500k.iterations", descKey: "platform.simulation.config.mc.500k.body", timeKey: "platform.simulation.config.mc.500k.time" },
  { label: "1M", badge: "bg-[#E11D48]/10 text-[#E11D48]", nameKey: "platform.simulation.config.mc.1m.badge", iterationsKey: "platform.simulation.config.mc.1m.iterations", descKey: "platform.simulation.config.mc.1m.body", timeKey: "platform.simulation.config.mc.1m.time" },
];

export interface McInfo {
  titleKey: string;
  bodyKeys: string[];
}

export const MC_INFO: McInfo[] = [
  { titleKey: "platform.simulation.config.mc.what.title", bodyKeys: ["platform.simulation.config.mc.what.body"] },
  { titleKey: "platform.simulation.config.mc.why.title", bodyKeys: ["platform.simulation.config.mc.why.b1", "platform.simulation.config.mc.why.b2", "platform.simulation.config.mc.why.b3"] },
  { titleKey: "platform.simulation.config.mc.which.title", bodyKeys: ["platform.simulation.config.mc.which.b1", "platform.simulation.config.mc.which.b2", "platform.simulation.config.mc.which.b3"] },
];

export const CURRENCY_USD_KEY = "platform.simulation.config.currency.usd";
