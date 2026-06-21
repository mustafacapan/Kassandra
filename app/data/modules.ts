// modules.ts

export interface ModuleDetail {
  id: string;
  title: string;
  tag: string;
  category: string;
  
  technical: {
    short: string;
    specTitle: string;
    specDesc: string;
    metric: string;
    metricLabel: string;
  };
  
  executive: {
    short: string;
    specTitle: string;
    specDesc: string;
    metric: string;
    metricLabel: string;
  };
}

export const modulesRegistry: ModuleDetail[] = [
  {
    id: "graph-engine",
    title: "Enterprise Graph Topography",
    tag: "RELATIONAL_RISK_MAPPING",
    category: "Infrastructure",
    technical: {
      short: "Analyzes multi-account configuration metadata and implicit IAM trust boundaries using highly parallel Rust workers to map paths.",
      specTitle: "Graph Engine Core Specs",
      specDesc: "Traces dynamic graph paths within milliseconds over 100k nodes. Uses isolated memory structures to prevent heap fragmentation.",
      metric: "6hr SLA",
      metricLabel: "Graph Refresh Rate"
    },
    executive: {
      short: "Transforms scattered cloud assets into a single visual risk map, showing exactly where security breaches could impact business operations.",
      specTitle: "Executive Risk Context",
      specDesc: "Eliminates administrative overhead by converting raw technical vulnerabilities into a prioritized list of real corporate exposures.",
      metric: "95% Noise Red.",
      metricLabel: "Alert Fatigue Avoidance"
    }
  },
  {
    id: "bce",
    title: "Business Criticality Engine",
    tag: "FINANCIAL_RISK_MODELING",
    category: "Financials",
    technical: {
      short: "Executes Bayesian Age-Decay EPSS formulas for zero-days, evaluating real risk weighting relative to direct infrastructure cost structures.",
      specTitle: "Mathematical Modeling",
      specDesc: "Applies statistical probability matrices to correlate active exploit records (CISA KEV) directly with target environment reachability.",
      metric: "O(1) Lookup",
      metricLabel: "Evaluation Latency"
    },
    executive: {
      short: "Quantifies technical security flaws into exact monetary liability values, allowing executive teams to prioritize fixes based on business balance sheets.",
      specTitle: "Balance Sheet Defense",
      specDesc: "Forces immediate automated containment on any asset containing critical intellectual property or carrying over $1,000,000 in liability.",
      metric: "$2.34M Max",
      metricLabel: "Evaluated Liability Limit"
    }
  },
  {
    id: "auto-fix",
    title: "Tactical Auto-Remediation",
    tag: "MITIGATION_AUTOMATION",
    category: "Automation",
    technical: {
      short: "Generates semantic Terraform deltas and deploys transaction-locked workflows with built-in LIFO rollback mechanisms.",
      specTitle: "IaC Integrity Engine",
      specDesc: "Applies dry-run validation tests on cloud state files before pushing configurations. Automatically rolls back if cloud APIs return non-200.",
      metric: "Zero Drift",
      metricLabel: "State Synchronization"
    },
    executive: {
      short: "Resolves dangerous infrastructure misconfigurations in seconds without requiring manual engineering intervention or risking system downtime.",
      specTitle: "Business Continuity",
      specDesc: "Calculates the Net Return on Investment (ROI) of each patch by weighing engineering labor costs against the financial weight of the risk.",
      metric: "< 4s Response",
      metricLabel: "Time-to-Remediate"
    }
  },
  {
    id: "dspm",
    title: "Data Posture Management",
    tag: "DATA_POSTURE_PROTECTION",
    category: "Security",
    technical: {
      short: "Scans massive cloud storage buckets via optimized fractional range queries and applies Shannon entropy algorithms to locate plaintext secrets.",
      specTitle: "Entropy Scanning Engine",
      specDesc: "Deploys multi-threaded workers to evaluate storage structures, matching custom regex patterns for private API keys and OAuth tokens.",
      metric: "Gbps Scan Rate",
      metricLabel: "Throughput Optimization"
    },
    executive: {
      short: "Discovers and protects unencrypted customer records and intellectual property, avoiding costly regulatory fines and brand damage.",
      specTitle: "Compliance Guardrails",
      specDesc: "Ensures sensitive databases never suffer from structural configuration drift, meeting data privacy laws globally.",
      metric: "$0 Fine Guarantee",
      metricLabel: "Regulatory Penalty Protection"
    }
  },
  {
    id: "compliance",
    title: "Automated Compliance Ledger",
    tag: "REGULATORY_GOVERNANCE",
    category: "Compliance",
    technical: {
      short: "Correlates active cloud resources with compliance checklists, anchoring logs into a dual cryptographic chain using SHA-256 and SHA3-512 hashes.",
      specTitle: "Tamper-Proof Logging",
      specDesc: "Logs system states into chronological block chains. Prevents administrative alteration or external deletion of event logs.",
      metric: "Dual Hash",
      metricLabel: "Cryptographic Integrity"
    },
    executive: {
      short: "Provides board-ready, mathematically verified audit trails for PCI-DSS, GDPR, and HIPAA, reducing manual auditing work.",
      specTitle: "Legal & Regulatory Proof",
      specDesc: "Generates comprehensive, instantly downloadable reports for external auditors without requiring developer assistance.",
      metric: "100% Audit Ready",
      metricLabel: "Manual Reporting Reduction"
    }
  },
  {
    id: "campaigns",
    title: "Interconnected Campaign Analysis",
    tag: "THREAT_CONSOLIDATION",
    category: "Threat Management",
    technical: {
      short: "Groups independent security events into unified multi-stage attack scenarios aligned with the MITRE ATT&CK framework.",
      specTitle: "Graph Clustering Mechanics",
      specDesc: "Uses modular community-detection algorithms to locate overlapping 'Choke Point' nodes across separate threat vectors.",
      metric: "95% Alert Red.",
      metricLabel: "Choke-Point Resolution"
    },
    executive: {
      short: "Consolidates thousands of chaotic security alerts into a single strategic dashboard to let small security teams work efficiently.",
      specTitle: "Resource Allocation",
      specDesc: "Allows technical departments to address a single root cause instead of chasing thousands of minor, duplicate warning tickets.",
      metric: "20x Efficiency",
      metricLabel: "Security Team Leverage"
    }
  },
  {
    id: "cti",
    title: "Event-Driven Stream Processor",
    tag: "REAL_TIME_TELEMETRY",
    category: "Telemetry",
    technical: {
      short: "Processes cloud event logs using concurrent Go pipelines. Uses Redis LRU caching layer to de-duplicate micro-mutations on the graph.",
      specTitle: "Deduplication Pipeline",
      specDesc: "Filters incoming noise patterns. Processes event payloads in memory before writing changes to persistent graph databases.",
      metric: "15ms Processing",
      metricLabel: "Event Processing Speed"
    },
    executive: {
      short: "Maintains real-time visibility over the cloud environment so that a morning mistake does not lead to an afternoon breach.",
      specTitle: "Constant Vigilance",
      specDesc: "Eliminates legacy 24-hour waiting windows, warning security administrators the moment a critical exposure occurs.",
      metric: "Instant Alert",
      metricLabel: "Zero Delay Threat Warning"
    }
  },
  {
    id: "agent",
    title: "Kernel-Level Protection Matrix",
    tag: "RUNTIME_INTELLIGENCE",
    category: "Runtime",
    technical: {
      short: "Leverages lightweight eBPF sensors in the Linux kernel to monitor process states and secure outbound gRPC pipelines.",
      specTitle: "eBPF System Monitor",
      specDesc: "Intercepts system calls directly in the kernel space. Feeds runtime events to the posture analyzer with low CPU overhead.",
      metric: "<0.5% Overhead",
      metricLabel: "Maximum Performance Load"
    },
    executive: {
      short: "Bridges the gap between passive auditing and live protection by spotting compromised servers executing hostile commands.",
      specTitle: "Active Breach Blocking",
      specDesc: "Isolates hijacked containers immediately, protecting adjacent corporate storage from active ransomware spread.",
      metric: "Real-time Block",
      metricLabel: "Outbound Containment Speed"
    }
  },
  {
    id: "iam-boundary",
    title: "IAM Trust Boundary Solver",
    tag: "ACCESS_MANAGEMENT_SOLVER",
    category: "Security",
    technical: {
      short: "Computes complex multi-hop cross-account privilege escalation routes using stateful path-finding logic.",
      specTitle: "Privilege Path Calculation",
      specDesc: "Constructs direct and indirect evaluation matrices for assume-role actions to isolate hidden paths to sensitive systems.",
      metric: "O(V + E) Complexity",
      metricLabel: "Graph Search Time"
    },
    executive: {
      short: "Prevents developers or third-party contractors from accidentally gaining excess permissions to corporate databases.",
      specTitle: "Least-Privilege Enforcement",
      specDesc: "Enforces strict identity management guidelines, ensuring high protection boundaries around company secrets.",
      metric: "Zero Trust Verified",
      metricLabel: "Credential Exposure Rate"
    }
  },
  {
    id: "api-drift",
    title: "API Drift Detection Agent",
    tag: "INTERFACE_POSTURE_DRIFT",
    category: "Infrastructure",
    technical: {
      short: "Inspects live API gateways to detect undocumented endpoints using lightweight schema validation filters.",
      specTitle: "Schema Comparison",
      specDesc: "Validates active API request schemas against committed swagger files to flag unmapped gateways.",
      metric: "100% Schema Sync",
      metricLabel: "Endpoint Inventory Audit"
    },
    executive: {
      short: "Stops external actors from discovering and exploiting forgotten internet portals that bypass company firewalls.",
      specTitle: "Shadow API Prevention",
      specDesc: "Maintains an active inventory of all internet-exposed portals, protecting user databases from leak threats.",
      metric: "Zero Shadow Portals",
      metricLabel: "External Attack Surface"
    }
  },
  {
    id: "k8s-guard",
    title: "Kubernetes Ephemeral Guard",
    tag: "CONTAINER_EPHEMERAL_POSTURE",
    category: "Runtime",
    technical: {
      short: "Validates short-lived container policies against admission controller criteria to block unprivileged container launches.",
      specTitle: "Admission Control Validation",
      specDesc: "Hooks into the K8s API server using custom webhooks to prevent root-access container executions.",
      metric: "12ms Delay Limit",
      metricLabel: "Container Creation Impact"
    },
    executive: {
      short: "Ensures containerized cloud systems comply with core security standards without slowing down developer speed.",
      specTitle: "Secure Devops Orchestration",
      specDesc: "Protects application environments from malicious container images injected into deployment lines.",
      metric: "Continuous Shield",
      metricLabel: "Workload Runtime Protection"
    }
  },
  {
    id: "zt-access",
    title: "Zero-Trust Access Broker",
    tag: "SENSITIVE_ACCESS_BROKER",
    category: "Security",
    technical: {
      short: "Generates single-use access credentials with automatic time-to-live restrictions to prevent lingering admin access.",
      specTitle: "Temporary Access Generation",
      specDesc: "Configures dynamic cloud-provider tokens that expire automatically, eliminating static developer keys.",
      metric: "1hr Max TTL",
      metricLabel: "Token Validity Lifespan"
    },
    executive: {
      short: "Eliminates static developer passwords, reducing the risk of administrative credentials being leaked.",
      specTitle: "Credential Leak Prevention",
      specDesc: "Limits operational access to highly temporary windows, ensuring high control over who changes live environments.",
      metric: "99% Token Reduction",
      metricLabel: "Static Credential Count"
    }
  },
  {
    id: "prov-engine",
    title: "Container Image Provenance",
    tag: "SUPPLY_CHAIN_PROVENANCE",
    category: "Supply Chain",
    technical: {
      short: "Scans container software packages and verifies cryptographic signatures to stop package injection attacks.",
      specTitle: "Signature and SBom Audit",
      specDesc: "Validates the software bill of materials against active vulnerability lists before images reach cluster registers.",
      metric: "<1s Verification",
      metricLabel: "Signature Validation Latency"
    },
    executive: {
      short: "Blocks external code packages with security flaws from entering production environments.",
      specTitle: "Software Supply Chain Protection",
      specDesc: "Mitigates dependencies on dangerous external software, protecting customer services from supply chain risks.",
      metric: "Secure Sbom Catalog",
      metricLabel: "Package Authenticity Rate"
    }
  },
  {
    id: "serverless-eval",
    title: "Serverless Security Evaluator",
    tag: "SERVERLESS_FUNCTION_DRIFT",
    category: "Infrastructure",
    technical: {
      short: "Analyzes cold-start parameters and resource limits in serverless functions to identify microservice vulnerabilities.",
      specTitle: "Function Runtime Analysis",
      specDesc: "Analyzes execution permissions to locate unnecessary network access within lightweight serverless functions.",
      metric: "100k Functions",
      metricLabel: "Scanned per Minute"
    },
    executive: {
      short: "Reduces serverless compute overhead and blocks malicious attacks from exploiting cloud utility systems.",
      specTitle: "Serverless Defense & Optimization",
      specDesc: "Ensures that isolated application functions cannot be manipulated to generate massive cloud hosting bills.",
      metric: "30% Bill Protection",
      metricLabel: "Waste Allocation Avoidance"
    }
  },
  {
    id: "red-team-bot",
    title: "Automated Red-Teaming Bot",
    tag: "AUTONOMOUS_ATTACK_SIMULATOR",
    category: "Threat Management",
    technical: {
      short: "Simulates secure, non-disruptive cloud attack vectors to confirm if warning systems activate as configured.",
      specTitle: "Simulated Pentest Execution",
      specDesc: "Traces path validation logic dynamically to ensure active alerts respond reliably to simulated threats.",
      metric: "100+ Scenarios",
      metricLabel: "Attack Vector Simulation"
    },
    executive: {
      short: "Verifies the effectiveness of security safeguards using harmless simulations, replacing expensive yearly testing.",
      specTitle: "Constant Security Verification",
      specDesc: "Validates defense configurations dynamically, providing continuous operational proof of defense readiness.",
      metric: "365 Days Verified",
      metricLabel: "Defense Validation Frequency"
    }
  },
  {
    id: "shadow-db",
    title: "Database Shadow Mapper",
    tag: "DATA_SHADOW_DISCOVERY",
    category: "Security",
    technical: {
      short: "Inspects unmapped local databases and temporary database snapshots across multi-account structures.",
      specTitle: "Storage Metadata Scraping",
      specDesc: "Audits historical volume snapshot creations to discover forgotten development databases containing production records.",
      metric: "Multi-Region Search",
      metricLabel: "Inventory Search Scope"
    },
    executive: {
      short: "Stops database backups and temporary copies from leaking customer information onto the internet.",
      specTitle: "Private Data Protection",
      specDesc: "Identifies hidden data storage points that fail database encryption and security standards.",
      metric: "Zero Shadow Backups",
      metricLabel: "Unmapped Storage Outlets"
    }
  },
  {
    id: "cicd-gate",
    title: "CI/CD Pipeline Gatekeeper",
    tag: "PIPELINE_SECURITY_GATE",
    category: "Supply Chain",
    technical: {
      short: "Hooks directly into git workflows to audit codebases for hardcoded credentials before code commits.",
      specTitle: "Commit Hook Evaluation",
      specDesc: "Parses active code additions using regular expressions, blocking pushes that violate credential standards.",
      metric: "<0.3s Commit Check",
      metricLabel: "Developer Process Impact"
    },
    executive: {
      short: "Blocks private developer keys and access secrets from being published to shared public platforms.",
      specTitle: "Developer Leak Guard",
      specDesc: "Corrects credential storage habits early in development, preventing accidental public access.",
      metric: "100% Leak Blocked",
      metricLabel: "Credential Exposure Avoided"
    }
  },
  {
    id: "drift-engine",
    title: "Compliance Drift Alert Engine",
    tag: "COMPLIANCE_DRIFT_ALERT",
    category: "Compliance",
    technical: {
      short: "Monitors changes in security groups and network settings, raising immediate alerts for policy drift.",
      specTitle: "Network Policy Validation",
      specDesc: "Compares current state parameters against target baseline states, generating visual differences.",
      metric: "Real-time Verification",
      metricLabel: "Policy Synchronization State"
    },
    executive: {
      short: "Prevents configuration changes from violating industry security rules or risking audit failures.",
      specTitle: "Audit Compliance Guard",
      specDesc: "Corrects manual configuration drift automatically to preserve certified security ratings.",
      metric: "Continuous Compliance",
      metricLabel: "Target Framework Alignment"
    }
  },
  {
    id: "ransomware-shield",
    title: "Active Ransomware Shield",
    tag: "RANSOMWARE_HEURISTICS_SHIELD",
    category: "Threat Management",
    technical: {
      short: "Evaluates storage modification patterns to isolate rapid file modification commands.",
      specTitle: "Heuristic Action Detection",
      specDesc: "Uses threat modeling to detect file encryption scripts in active workloads and suspends processes.",
      metric: "Heuristic Block",
      metricLabel: "Abnormal Behavior Detection"
    },
    executive: {
      short: "Stops malware attacks from locking critical company files and demanding ransom payments.",
      specTitle: "Financial Ransom Avoidance",
      specDesc: "Provides direct threat isolation to protect cloud file repositories from widespread corruption.",
      metric: "Zero Data Locked",
      metricLabel: "Malicious Encryption Blocks"
    }
  },
  {
    id: "genai-auditor",
    title: "Generative AI Policy Auditor",
    tag: "LLM_INTEGRITY_AUDITOR",
    category: "Compliance",
    technical: {
      short: "Monitors local LLM interfaces and prompt payloads for accidental intellectual property exposure.",
      specTitle: "Data Leak Screening",
      specDesc: "Screens data flows to external model APIs, checking for company source code or private keys.",
      metric: "100% Prompt Inspected",
      metricLabel: "Data Flow Inspection Rate"
    },
    executive: {
      short: "Ensures staff use artificial intelligence platforms safely without leaking corporate secrets.",
      specTitle: "Corporate Secret Security",
      specDesc: "Enforces structured access control policies over AI development channels, meeting data usage guidelines.",
      metric: "Secure AI Integration",
      metricLabel: "Compliance Score Level"
    }
  }
];