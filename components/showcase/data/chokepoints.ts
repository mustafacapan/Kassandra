// Mock data for the /platform/kre showcase dashboard (Step 2/4:
// KPI cards + ranking table; detail panel & simulation land in Step 3-4).

export interface SeverityCounts {
  crit: number;
  high: number;
  med: number;
  low: number;
}

export const tenantGrade = 57.6;

export const severityCounts: SeverityCounts = {
  crit: 3,
  high: 0,
  med: 4,
  low: 1,
};

export type ChokepointType = "Network" | "Identity" | "Compute" | "EC2";
export type SlaLevel = "LOW" | "MEDIUM" | "CRITICAL";
export type ChokepointTag = "strict" | "alt" | "kev";

export interface ChokepointRow {
  rank: string;
  nodeId: string;
  type: ChokepointType;
  crownJewels: number;
  tags: ChokepointTag[];
  sla: { level: SlaLevel; value: number; unit: "d" | "h" };
  cpis: number;
  pathsCut: number;
  savings: number;
  savingsVerified: boolean;
  highlighted?: boolean;
}

export const MAX_CPIS = 140.3;

export interface ChokepointDetail {
  metrics: {
    pathsCut: number;
    cpis: number;
    cpisBase: number;
    crownJewels: number;
    savingsM: number;
    savingsVerified: boolean;
  };
  monteCarlo: {
    p10: number;
    p50: number;
    p95: number;
    iterations: number;
  };
  costBreakdown: Array<{
    labelKey: string;
    amountM: number;
    pct: number;
    highlight?: boolean;
  }>;
  crownJewelAssets: Array<{
    name: string;
    amount: number;
    pct: number;
  }>;
  vulnerabilities: Array<{
    severity: "CRITICAL" | "HIGH" | "MEDIUM";
    id: string;
    category: "IAM" | "EC2" | "NET";
    descKey: string;
    daysAgo: number;
  }>;
}

export type VulnSeverity = "CRITICAL" | "HIGH" | "MEDIUM";
export type VulnCategory = "IAM" | "EC2" | "NET";
export type TemplateKey = "network" | "identity" | "compute" | "ec2kev";

export function templateKey(type: ChokepointType): TemplateKey {
  if (type === "EC2") return "ec2kev";
  return type.toLowerCase() as TemplateKey;
}

interface VulnDef {
  severity: VulnSeverity;
  id: string;
  category: VulnCategory;
  descKey: string;
  daysAgo: number;
}

const NETWORK_VULNS: VulnDef[] = [
  { severity: "HIGH", id: "SG_OPEN_PORT", category: "NET", descKey: "platform.kre.detail.cve.sgport", daysAgo: 5 },
  { severity: "HIGH", id: "SG_PUBLIC_INGRESS", category: "NET", descKey: "platform.kre.detail.cve.sgingress", daysAgo: 11 },
  { severity: "HIGH", id: "NACL_MISCONFIG", category: "NET", descKey: "platform.kre.detail.cve.nacl", daysAgo: 18 },
  { severity: "HIGH", id: "SG_UNRESTRICTED_EGRESS", category: "NET", descKey: "platform.kre.detail.cve.sgegress", daysAgo: 14 },
  { severity: "MEDIUM", id: "FLOW_LOG_DISABLED", category: "NET", descKey: "platform.kre.detail.cve.flowlog", daysAgo: 27 },
  { severity: "MEDIUM", id: "SG_RULE_OVERLAP", category: "NET", descKey: "platform.kre.detail.cve.sgoverlap", daysAgo: 9 },
];

const IDENTITY_VULNS: VulnDef[] = [
  { severity: "CRITICAL", id: "IAM_EFFECTIVE_ADMIN", category: "IAM", descKey: "platform.kre.detail.cve.admin", daysAgo: 3 },
  { severity: "CRITICAL", id: "PRIVSC_ADD_USER_TO_GROUP", category: "IAM", descKey: "platform.kre.detail.cve.addgroup", daysAgo: 8 },
  { severity: "CRITICAL", id: "PRIVSC_ATTACH_POLICY", category: "IAM", descKey: "platform.kre.detail.cve.attach", daysAgo: 12 },
  { severity: "CRITICAL", id: "PRIVSC_CREATE_POLICY_VERSION", category: "IAM", descKey: "platform.kre.detail.cve.createver", daysAgo: 15 },
  { severity: "CRITICAL", id: "PRIVSC_PASS_ROLE_LAMBDA", category: "IAM", descKey: "platform.kre.detail.cve.passrole", daysAgo: 21 },
  { severity: "CRITICAL", id: "PRIVSC_UPDATE_ASSUME_ROLE", category: "IAM", descKey: "platform.kre.detail.cve.assume", daysAgo: 4 },
  { severity: "HIGH", id: "IAM_NO_MFA_ENFORCED", category: "IAM", descKey: "platform.kre.detail.cve.nomfa", daysAgo: 7 },
  { severity: "HIGH", id: "TRUST_POLICY_TOO_BROAD", category: "IAM", descKey: "platform.kre.detail.cve.trustbroad", daysAgo: 19 },
  { severity: "HIGH", id: "IAM_ACCESS_KEY_STALE", category: "IAM", descKey: "platform.kre.detail.cve.keystale", daysAgo: 33 },
];

const COMPUTE_VULNS: VulnDef[] = [
  { severity: "CRITICAL", id: "EC2_IAM_ROLE", category: "EC2", descKey: "platform.kre.detail.cve.ec2role", daysAgo: 6 },
  { severity: "HIGH", id: "EC2_IAM_ROLE_MISSING_BOUNDARY", category: "EC2", descKey: "platform.kre.detail.cve.ec2boundary", daysAgo: 30 },
  { severity: "HIGH", id: "IMDS_V1_ENABLED", category: "EC2", descKey: "platform.kre.detail.cve.imds", daysAgo: 10 },
  { severity: "HIGH", id: "EC2_NO_PATCHING", category: "EC2", descKey: "platform.kre.detail.cve.nopatch", daysAgo: 22 },
  { severity: "HIGH", id: "SSM_AGENT_EXPOSED", category: "EC2", descKey: "platform.kre.detail.cve.ssmagent", daysAgo: 16 },
  { severity: "MEDIUM", id: "EBS_UNENCRYPTED", category: "EC2", descKey: "platform.kre.detail.cve.ebs", daysAgo: 25 },
  { severity: "MEDIUM", id: "AMI_OUTDATED", category: "EC2", descKey: "platform.kre.detail.cve.ami", daysAgo: 40 },
];

const KEV_VULNS: VulnDef[] = [
  { severity: "CRITICAL", id: "CVE-2024-3094", category: "EC2", descKey: "platform.kre.detail.cve.cve3094", daysAgo: 17 },
  { severity: "CRITICAL", id: "CVE-2023-38545", category: "EC2", descKey: "platform.kre.detail.cve.cve38545", daysAgo: 26 },
  { severity: "HIGH", id: "EC2_IAM_ROLE_MISSING_BOUNDARY", category: "EC2", descKey: "platform.kre.detail.cve.ec2boundary", daysAgo: 30 },
  { severity: "HIGH", id: "SSM_LATERAL_MOVEMENT", category: "IAM", descKey: "platform.kre.detail.cve.ssmlat", daysAgo: 20 },
  { severity: "HIGH", id: "IMDS_V1_ENABLED", category: "EC2", descKey: "platform.kre.detail.cve.imds", daysAgo: 10 },
  { severity: "MEDIUM", id: "EBS_UNENCRYPTED", category: "EC2", descKey: "platform.kre.detail.cve.ebs", daysAgo: 25 },
];

// Same template, different discovery days (proves per-row data).
const ROW_DAY_OVERRIDES: Record<string, Record<string, number>> = {
  "03": { PRIVSC_ATTACH_POLICY: 9, PRIVSC_PASS_ROLE_LAMBDA: 17, IAM_ACCESS_KEY_STALE: 28 },
  "05": { IMDS_V1_ENABLED: 13, EBS_UNENCRYPTED: 29, AMI_OUTDATED: 35 },
};

interface TypeTemplate {
  vulns: VulnDef[];
  mc: { p10: number; p50: number; p95: number };
  cost: Array<{ labelKey: string; pct: number; highlight?: boolean }>;
}

const TEMPLATES: Record<TemplateKey, TypeTemplate> = {
  network: {
    vulns: NETWORK_VULNS,
    mc: { p10: 5.2, p50: 8.4, p95: 18.7 },
    cost: [
      { labelKey: "platform.kre.detail.cost.operational", pct: 45, highlight: true },
      { labelKey: "platform.kre.detail.cost.breach", pct: 30 },
      { labelKey: "platform.kre.detail.cost.crisis", pct: 25 },
    ],
  },
  identity: {
    vulns: IDENTITY_VULNS,
    mc: { p10: 24.15, p50: 40.8, p95: 100.88 },
    cost: [
      { labelKey: "platform.kre.detail.cost.churn", pct: 89.5, highlight: true },
      { labelKey: "platform.kre.detail.cost.direct", pct: 9.5 },
      { labelKey: "platform.kre.detail.cost.crisis", pct: 0.6 },
    ],
  },
  compute: {
    vulns: COMPUTE_VULNS,
    mc: { p10: 9.8, p50: 16.2, p95: 38.4 },
    cost: [
      { labelKey: "platform.kre.detail.cost.churn", pct: 60, highlight: true },
      { labelKey: "platform.kre.detail.cost.direct", pct: 30 },
      { labelKey: "platform.kre.detail.cost.crisis", pct: 10 },
    ],
  },
  ec2kev: {
    vulns: KEV_VULNS,
    mc: { p10: 12.4, p50: 21.5, p95: 48.2 },
    cost: [
      { labelKey: "platform.kre.detail.cost.churn", pct: 55, highlight: true },
      { labelKey: "platform.kre.detail.cost.direct", pct: 25 },
      { labelKey: "platform.kre.detail.cost.operational", pct: 20 },
    ],
  },
};

const CROWNS_BY_RANK: Record<string, string[]> = {
  "01": ["public-subnet-db", "bastion-host-target", "dmz-api-endpoint"],
  "02": ["prod-customer-db", "billing-reports-bucket", "auth-service-secrets", "payment-processor-api", "hr-employee-records"],
  "03": ["auth-service-secrets", "payment-processor-api", "prod-customer-db", "ml-training-dataset", "audit-log-archive"],
  "04": ["app-data-volume", "analytics-warehouse"],
  "05": ["analytics-warehouse", "session-store", "app-data-volume"],
  "06": ["app-data-volume", "session-store"],
  "07": ["session-store"],
  "08": ["payment-processor-api", "audit-log-archive", "ml-training-dataset", "billing-reports-bucket"],
};

function buildDetail(row: ChokepointRow): ChokepointDetail {
  const q2 = (n: number) => Math.round(n * 100) / 100;
  const tpl = TEMPLATES[templateKey(row.type)];
  const savingsM = q2(row.savings / 1000);
  const dayOverrides = ROW_DAY_OVERRIDES[row.rank] ?? {};
  const names = CROWNS_BY_RANK[row.rank] ?? [];
  const weightSum = (names.length * (names.length + 1)) / 2;
  return {
    metrics: {
      pathsCut: row.pathsCut,
      cpis: row.cpis,
      cpisBase: 100,
      crownJewels: row.crownJewels,
      savingsM,
      savingsVerified: row.savingsVerified,
    },
    monteCarlo: { ...tpl.mc, iterations: 100000 },
    costBreakdown: tpl.cost.map((c) => ({
      labelKey: c.labelKey,
      amountM: q2((c.pct / 100) * savingsM),
      pct: c.pct,
      highlight: c.highlight,
    })),
    crownJewelAssets: names.map((name, i) => {
      const amountM = q2(savingsM * ((names.length - i) / weightSum));
      return {
        name,
        amount: amountM,
        pct: Math.round((amountM / savingsM) * 1000) / 10,
      };
    }),
    vulnerabilities: tpl.vulns.map((v) => ({
      severity: v.severity,
      id: v.id,
      category: v.category,
      descKey: v.descKey,
      daysAgo: dayOverrides[v.id] ?? v.daysAgo,
    })),
  };
}

export const chokepointRows: ChokepointRow[] = [
  {
    rank: "01",
    nodeId: "SG:sg-a1b2c3d4***",
    type: "Network",
    crownJewels: 3,
    tags: ["strict"],
    sla: { level: "LOW", value: 90, unit: "d" },
    cpis: 28.0,
    pathsCut: 187,
    savings: 40800,
    savingsVerified: true,
    highlighted: true,
  },
  {
    rank: "02",
    nodeId: "Role:prod-admin-***",
    type: "Identity",
    crownJewels: 5,
    tags: ["alt"],
    sla: { level: "CRITICAL", value: 24, unit: "h" },
    cpis: 140.3,
    pathsCut: 142,
    savings: 32300,
    savingsVerified: false,
    highlighted: true,
  },
  {
    rank: "03",
    nodeId: "Role:prod-admin-***",
    type: "Identity",
    crownJewels: 5,
    tags: ["alt"],
    sla: { level: "CRITICAL", value: 24, unit: "h" },
    cpis: 140.3,
    pathsCut: 124,
    savings: 28800,
    savingsVerified: false,
  },
  {
    rank: "04",
    nodeId: "EC2:i-0a1b***",
    type: "Compute",
    crownJewels: 2,
    tags: [],
    sla: { level: "MEDIUM", value: 30, unit: "d" },
    cpis: 43.2,
    pathsCut: 89,
    savings: 18800,
    savingsVerified: false,
  },
  {
    rank: "05",
    nodeId: "EC2:i-0a2c***",
    type: "Compute",
    crownJewels: 3,
    tags: [],
    sla: { level: "MEDIUM", value: 30, unit: "d" },
    cpis: 43.2,
    pathsCut: 67,
    savings: 14900,
    savingsVerified: false,
  },
  {
    rank: "06",
    nodeId: "EC2:i-0a3d***",
    type: "Compute",
    crownJewels: 2,
    tags: [],
    sla: { level: "MEDIUM", value: 30, unit: "d" },
    cpis: 43.2,
    pathsCut: 52,
    savings: 11300,
    savingsVerified: false,
  },
  {
    rank: "07",
    nodeId: "EC2:i-0a4e***",
    type: "Compute",
    crownJewels: 1,
    tags: [],
    sla: { level: "MEDIUM", value: 30, unit: "d" },
    cpis: 43.2,
    pathsCut: 28,
    savings: 4600,
    savingsVerified: false,
  },
  {
    rank: "08",
    nodeId: "EC2:i-0a5f***",
    type: "EC2",
    crownJewels: 4,
    tags: ["kev"],
    sla: { level: "CRITICAL", value: 24, unit: "h" },
    cpis: 85.5,
    pathsCut: 21,
    savings: 4600,
    savingsVerified: false,
  },
];

export const chokepointDetails: Record<string, ChokepointDetail> = Object.fromEntries(
  chokepointRows.map((row) => [row.rank, buildDetail(row)])
);
