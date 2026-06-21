export interface Module {
  id: string;
  slug: string;
  title: string;
  layer: "telemetry" | "graph" | "remediation";
  category: "module" | "component";
  description: string;
  icon: string;
  color: string;
  sections: ModuleSection[];
  importantPoints: string[];
  dependencies: string[];
  codeSnippets?: CodeSnippet[];
}

export interface ModuleSection {
  title: string;
  content?: string;
  subsections?: Subsection[];
}

export interface Subsection {
  title: string;
  content: string;
}

export interface CodeSnippet {
  language: string;
  title: string;
  code: string;
}

export const modules: Module[] = [
  // TELEMETRY & INGESTION LAYER
  {
    id: "discovery",
    slug: "discovery",
    title: "Discovery Orchestrator",
    layer: "telemetry",
    category: "module",
    description: "Multi-account, multi-region asynchronous AWS resource scanner mapping cloud assets to Unified Resource Models.",
    icon: "Search",
    color: "blue",
    sections: [
      {
        title: "Overview",
        content: "The Discovery module acts as the entrypoint for inventory mapping. It uses asynchronous worker pools to assume roles and query AWS API endpoints concurrently across accounts and regions, transforming raw metadata into the Unified Resource Model (URM)."
      },
      {
        title: "Internal Architecture",
        subsections: [
          {
            title: "Async Token Bucket Rate Limiter",
            content: "Integrates a thread-safe rate limiter to prevent AWS API throttling during large-scale network scanning."
          },
          {
            title: "Dual Cache Engine",
            content: "Syncs discovered assets with a fast in-memory Redis cache (production) or local SQLite fallback."
          }
        ]
      }
    ],
    importantPoints: [
      "Assumes cross-account IAM roles dynamically for comprehensive mapping.",
      "Handles regional and global service scanning in parallel worker pipelines.",
      "Maps asset properties to a standardized SHA256 hashed signature to detect configuration drift."
    ],
    dependencies: ["boto3", "redis", "pydantic", "sqlite3"],
    codeSnippets: [
      {
        language: "python",
        title: "Standardized URM Schema mapping",
        code: `class URMResource(BaseModel):
    arn: str
    account_id: str
    region: str
    resource_type: str
    metadata: dict
    signature: str = Field(description="SHA256 hash of configuration")`
      }
    ]
  },
  {
    id: "sensor",
    slug: "ebpf-sensor",
    title: "eBPF Runtime Sensor",
    layer: "telemetry",
    category: "module",
    description: "Kernel-level security monitoring utility tracking raw process executions, network connections, and filesystem drifts.",
    icon: "Shield",
    color: "blue",
    sections: [
      {
        title: "Overview",
        content: "Low-overhead Linux agent injecting eBPF programs into the kernel space. It hooks syscalls (e.g., sys_enter_execve) to intercept malicious behavior in real time before logs are tampered with."
      }
    ],
    importantPoints: [
      "Operates directly in the Linux kernel space for tamper-proof telemetry.",
      "Exports telemetry streams via high-performance ring buffers to gRPC listeners."
    ],
    dependencies: ["libbpf", "go-clang", "protobuf", "grpc"]
  },
  {
    id: "s3_analyzer",
    slug: "s3-analyzer",
    title: "S3 Security Analyzer",
    layer: "telemetry",
    category: "module",
    description: "Deep configuration auditor inspecting AWS S3 policies, ACL lists, encryption configurations, and public access blocks.",
    icon: "Search",
    color: "blue",
    sections: [
      {
        title: "Overview",
        content: "Isolated Python scanner targeting Object Storage vulnerability patterns. It checks for exposed credentials, missing KMS keys, and open bucket policies."
      }
    ],
    importantPoints: [
      "Flags public buckets immediately for the auto-fix pipeline.",
      "Audits cross-account resource policies for authorization issues."
    ],
    dependencies: ["boto3", "pytest"]
  },
  {
    id: "revolution",
    slug: "revolution-pipeline",
    title: "Kassandra Revolution",
    layer: "telemetry",
    category: "component",
    description: "Event-driven CloudTrail processing pipeline worker consuming events from AWS SQS and managing dead-letter queue (DLQ) redrives.",
    icon: "RefreshCw",
    color: "blue",
    sections: [
      {
        title: "Overview",
        content: "Go-based pipeline worker consuming raw JSON CloudTrail bursts. It filters operational events and streams configuration state changes directly into the Neo4j graph collector."
      }
    ],
    importantPoints: [
      "Uses a robust SQS queue structure with DLQ error boundaries.",
      "Resolves out-of-order CloudTrail events using cryptographic logical clocks."
    ],
    dependencies: ["aws-sdk-go", "neo4j-go-driver"]
  },
  {
    id: "prophecy",
    slug: "prophecy-collectors",
    title: "Prophecy Collectors",
    layer: "telemetry",
    category: "component",
    description: "Python collectors gathering configuration metadata from RDS, EC2, KMS, and route tables.",
    icon: "Server",
    color: "blue",
    sections: [
      {
        title: "Overview",
        content: "Lightweight discovery collectors deployed as regional Lambda functions to query active AWS state changes."
      }
    ],
    importantPoints: [
      "Optimized to run within minimal CPU overhead.",
      "Secured via tight IAM execution role bindings."
    ],
    dependencies: ["boto3"]
  },
  {
    id: "scanners",
    slug: "scanner-suite",
    title: "Service Scanner Suite",
    layer: "telemetry",
    category: "component",
    description: "AWS security compliance scanners evaluating targets against CIS benchmarks and custom attack signatures.",
    icon: "Shield",
    color: "blue",
    sections: [
      {
        title: "Overview",
        content: "Set of security scanners checking configurations against regulatory standards like SOC2, ISO27001, and CIS foundations."
      }
    ],
    importantPoints: [
      "Maintains modular vulnerability check plugins.",
      "Generates compliance-aligned compliance violations."
    ],
    dependencies: ["python-oval", "pydantic"]
  },

  // GRAPH & RISK ANALYTICS LAYER
  {
    id: "dspm",
    slug: "dspm",
    title: "DSPM BCE Engine",
    layer: "graph",
    category: "module",
    description: "Business Criticality Engine calculating asset exposure in dollars and identifying tactical attack choke points.",
    icon: "Cpu",
    color: "purple",
    sections: [
      {
        title: "Overview",
        content: "The Business Criticality Engine (BCE) is the brain of Kassandra. Written in Go, it evaluates zero-day vulnerabilities using Bayesian Age-Decay EPSS formulas and computes the financial ROI of potential fixes."
      },
      {
        title: "Core Mechanics",
        subsections: [
          {
            title: "Age-Decay EPSS scoring",
            content: "Calculates the dynamic exploitability of vulnerabilities based on their publish date and active exploit trends."
          },
          {
            title: "Financial ROI modeling",
            content: "Quantifies the risk reduction value of a fix by comparing vulnerability severity against the monetary value of connected resources."
          }
        ]
      }
    ],
    importantPoints: [
      "Isolates logical choke points in attack graphs to maximize remediation ROI.",
      "Integrates with local Ollama Qwen models for natural language remediation summaries."
    ],
    dependencies: ["go", "neo4j", "redis", "ollama"],
    codeSnippets: [
      {
        language: "go",
        title: "EPSS Bayesian calculation core",
        code: `func CalculateDecayedEPSS(baseScore float64, ageInDays int) float64 {
    decayFactor := math.Exp(-0.005 * float64(ageInDays))
    return baseScore * decayFactor
}`
      }
    ]
  },
  {
    id: "graph",
    slug: "graph-engine",
    title: "Graph Engine Layer",
    layer: "graph",
    category: "module",
    description: "Graph management system mapping URM assets to Neo4j nodes and paths.",
    icon: "Network",
    color: "purple",
    sections: [
      {
        title: "Overview",
        content: "Maintains the topological structure of the cloud environment. It models resources as nodes and configurations (like network routing and IAM policies) as directed edges."
      }
    ],
    importantPoints: [
      "Identifies transitive trust relationships across accounts.",
      "Uses Cypher queries to sweep the database for toxic security groups."
    ],
    dependencies: ["neo4j", "networkx"]
  },
  {
    id: "reachability",
    slug: "reachability-engine",
    title: "Reachability Engine",
    layer: "graph",
    category: "module",
    description: "Network security analyzer evaluating packet routes across firewalls, subnets, and internet gateways.",
    icon: "Network",
    color: "purple",
    sections: [
      {
        title: "Overview",
        content: "Evaluates whether a resource is network-exposed by traversing security groups, route tables, and subnet boundaries."
      }
    ],
    importantPoints: [
      "Discovers silent exposure paths hidden by complex security group rules.",
      "Enforces strict separation boundaries between staging and production nodes."
    ],
    dependencies: ["networkx", "ipaddress"]
  },
  {
    id: "rust",
    slug: "rust-algorithms",
    title: "Rust Graph Core",
    layer: "graph",
    category: "component",
    description: "High-performance graph traversal algorithms written in Rust for real-time attack path compilation.",
    icon: "Cpu",
    color: "purple",
    sections: [
      {
        title: "Overview",
        content: "Handles deep network traversals and path compilation using parallel Rust workers, providing millisecond speeds over millions of edges."
      }
    ],
    importantPoints: [
      "Runs complex traversal logic in sub-millisecond rates.",
      "Optimized for high-concurrency cloud delta mapping."
    ],
    dependencies: ["rust-petgraph", "neon"]
  },
  {
    id: "anomaly",
    slug: "anomaly-engine",
    title: "Anomaly Detection Engine",
    layer: "graph",
    category: "component",
    description: "Go service detecting behavioral anomalies against statistical cloud activity baselines.",
    icon: "AlertTriangle",
    color: "purple",
    sections: [
      {
        title: "Overview",
        content: "Monitors API call patterns and flags structural deviations compared to established baseline profiles."
      }
    ],
    importantPoints: [
      "Leverages Redis for low-latency metric analysis.",
      "Flags compromised API credentials dynamically."
    ],
    dependencies: ["go", "redis"]
  },
  {
    id: "simulation",
    slug: "attack-simulator",
    title: "Attack Path Simulator",
    layer: "graph",
    category: "module",
    description: "Simulates threat actor traversal capabilities across discovered asset relationships.",
    icon: "Zap",
    color: "purple",
    sections: [
      {
        title: "Overview",
        content: "Generates mock intrusion campaigns to test security boundaries, verifying firewall resilience and least-privilege configurations."
      }
    ],
    importantPoints: [
      "Uses MITRE ATT&CK framework mapping for test flows.",
      "Calculates threat lateral movement likelihood metrics."
    ],
    dependencies: ["networkx", "pytest"]
  },

  // REMEDIATION & COMPLIANCE LAYER
  {
    id: "auto_fix_pipeline",
    slug: "auto-fix-pipeline",
    title: "Auto-Fix Pipeline",
    layer: "remediation",
    category: "module",
    description: "FastAPI microservice executing automated security configurations fixes via Redis background task workers.",
    icon: "Lock", // wait, let's keep color same as remediation
    color: "emerald",
    sections: [
      {
        title: "Overview",
        content: "Processes auto-remediation jobs asynchronously. It handles public buckets closures, security group restrictions, and MFA enforcement actions."
      }
    ],
    importantPoints: [
      "Utilizes Redis queues to run long-running AWS API fix actions.",
      "Incorporates full dry-run logging capabilities before execution."
    ],
    dependencies: ["fastapi", "redis", "boto3"],
    codeSnippets: [
      {
        language: "python",
        title: "Asynchronous job creation with Redis tracking",
        code: `@app.post("/jobs")
async def create_job(job: JobRequest, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    redis_client.set(f"job:{job_id}", json.dumps({"status": "pending"}))
    background_tasks.add_task(execute_job, job_id, job)
    return {"job_id": job_id}`
      }
    ]
  },
  {
    id: "remediation",
    slug: "remediation-engine",
    title: "Remediation Core",
    layer: "remediation",
    category: "module",
    description: "Policy-driven remediation orchestrator supporting transactional rollback configurations.",
    icon: "Lock",
    color: "emerald",
    sections: [
      {
        title: "Overview",
        content: "Manages safe execution state bounds. In case of drift conflicts or downstream failures during remediation steps, it executes transactional LIFO rollbacks."
      }
    ],
    importantPoints: [
      "Ensures zero deadlock states through persistent locks.",
      "Secures audit logging via HMAC-SHA256 hash chains."
    ],
    dependencies: ["sqlite3", "aws-sdk-go"]
  },
  {
    id: "terraform",
    slug: "terraform-driver",
    title: "Terraform IaC Driver",
    layer: "remediation",
    category: "component",
    description: "Applies cloud state fixes directly via dynamic Terraform Infrastructure as Code template generation.",
    icon: "Layers",
    color: "emerald",
    sections: [
      {
        title: "Overview",
        content: "Generates target configuration files dynamically. Runs plans, applies state changes, and monitors drift variables."
      }
    ],
    importantPoints: [
      "Tracks target deployment states securely.",
      "Handles failed apply rollbacks via modular state checks."
    ],
    dependencies: ["terraform-cli", "go"]
  },
  {
    id: "core",
    slug: "core-utilities",
    title: "Core Utilities Core",
    layer: "remediation",
    category: "module",
    description: "Shared logging engines, plugin managers, and Splunk/Elastic multi-format exporter tools.",
    icon: "Database",
    color: "emerald",
    sections: [
      {
        title: "Overview",
        content: "Contains shared helper libraries. Manages dynamic plugin loads and compiles audit metrics into Splunk HEC or Elastic Common Schema formats."
      }
    ],
    importantPoints: [
      "Handles multi-format compliance exports.",
      "Provides structured JSON log formatters."
    ],
    dependencies: ["rich", "pydantic"]
  }
];

export function getAllModules(): Module[] {
  return modules;
}

export function getModuleBySlug(slug: string): Module | undefined {
  return getAllModules().find(m => m.slug === slug);
}

export function getModulesByLayer(layer: "telemetry" | "graph" | "remediation"): Module[] {
  return getAllModules().filter(m => m.layer === layer);
}

// Backward compatibility helper
export function getModulesByCategory(category: "module" | "component"): Module[] {
  return getAllModules().filter(m => m.category === category);
}
