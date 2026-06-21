  export const generateModuleLogs = (selectedScenario: string, module: { id: string; title: string; tag: string }): string[] => {
    const logs: string[] = [];

    if (selectedScenario === "shadow_ai") {
      switch (module.id) {
        case "prophecy":
          logs.push("[PROPHECY] SageMaker & Bedrock deployment logs detected in central registry.");
          logs.push("[PROPHECY] Allocating async ingestion threads to sweep shadow AI endpoints.");
          logs.push("[SUCCESS] Active posture scan complete. 12,400 shadow-infra nodes in memory.");
          break;
        case "cti":
          logs.push("[CTI] EventBridge reports console access using DeveloperRole profile.");
          logs.push("[CTI] GeoIP check maps API request to unauthorized dynamic IP range.");
          logs.push("[SUCCESS] Logged suspicious console session as :DirtyResource.");
          break;
        case "plugins":
          logs.push("[PLUGINS] Auditing SageMaker notebook instances and Bedrock agent policies.");
          logs.push("[WARN] Detected notebook instance running with full administrator execution role.");
          logs.push("[SUCCESS] Found 2 critical drift policies. Egressing metadata to Graph Intake.");
          break;
        case "runtime-agent":
          logs.push("[RUNTIME] Kernel-space eBPF sensor tracking sys_enter_execve in rogue container.");
          logs.push("[RUNTIME] ALERT: Interactive bash shell process spawned on container c72a91f3a0.");
          logs.push("[SUCCESS] Container attestation payload signed via KMS and forwarded to Graph.");
          break;
        case "graph-intelligence-core":
          logs.push("[GRAPH] Graph query: MATCH (d:DevRole)-[:CAN_ASSUME]->(a:AdminRole)-[:ACCESS]->(b:Bedrock) RETURN d, a, b.");
          logs.push("[ALGORITHM] Traversed 12,000 entities. SageMaker-to-Bedrock pivot path mapped.");
          logs.push("[SUCCESS] Mapped direct lateral movement route in 14.20ms.");
          break;
        case "reachability":
          logs.push("[REACHABILITY] 4-Layer Reachability check for target Bedrock:model-endpoint.");
          logs.push("[LAYER 1] Network validation: security groups allow all outbound to SageMaker endpoints.");
          logs.push("[LAYER 2] IAM Effective Permission: DeveloperRole possesses model-invocation wildcard.");
          logs.push("[SUCCESS] Reachability check confirmed: 2 path segments fully open.");
          break;
        case "policy-intelligence":
          logs.push("[POLICY-INTEL] S3 LLM analysis of SageMaker output buckets.");
          logs.push("[WARN] Found raw wildcard '*' principal on Bedrock trust policy.");
          logs.push("[SUCCESS] AI policy audit complete. Hallucination checks passed.");
          break;
        case "dspm":
          logs.push("[DSPM] Scanning Bedrock model inputs and SageMaker training data.");
          logs.push("[WARN] Discovered raw database credentials in plain-text training logs.");
          logs.push("[SUCCESS] DSPM tag: SageMaker staging bucket contains high-risk PII.");
          break;
        case "campaigns":
          logs.push("[CAMPAIGN] Clustered developer console pivot with container interactive shell.");
          logs.push("[CAMPAIGN] Campaign signature matches Shadow AI data exfiltration footprint.");
          logs.push("[SUCCESS] Clustered. Primary target identified: IAM:role-choke-999. Risk boosted.");
          break;
        case "threats":
          logs.push("[THREATS] Evaluating toxic combinations for active SageMaker endpoints.");
          logs.push("[WARN] TOXIC_COMBO: Developer role + Container root access + Bedrock invocation.");
          logs.push("[SUCCESS] High-severity toxic rule triggered. Risk score: 100/100.");
          break;
        case "simulation":
          logs.push("[SIMULATION] Executing breach path dry-run verification.");
          logs.push("[SIMULATION] Route: Internet -> Rogue Container -> IAM:role-choke-999 -> AWS Bedrock.");
          logs.push("[SUCCESS] Breach path validation confirmed. Exploit feasibility: 94.50%.");
          break;
        case "bce":
          logs.push("[BCE] Mapped SageMaker notebook assets to 'AI Core Production Environment'.");
          logs.push("[BCE] Blast radius calculated: PCI Cardholder + GDPR Data Leakage union.");
          logs.push("[BCE] Choke Point CPIS computed: Severing IAM:role-choke-999 saves $164,108,848.00.");
          logs.push("[SUCCESS] Dispatched prioritized mitigation proposal.");
          break;
        case "auto-fix":
          logs.push("[REMEDIATION] Compilation of kernel-space eBPF XDP isolation filter.");
          logs.push("[IaC] Generating Terraform delta update to block role-choke-999.");
          logs.push("[SUCCESS] Playbook successfully generated. Awaiting confirmation.");
          break;
        default:
          logs.push("[FINDING] Shadow AI Leak analysis step completed.");
      }
    } else if (selectedScenario === "ransomware") {
      switch (module.id) {
        case "prophecy":
          logs.push("[PROPHECY] Ingesting cloud storage configuration state.");
          logs.push("[PROPHECY] Mapping active S3 buckets and cross-account access controls.");
          logs.push("[SUCCESS] Posture scan completed. 8,600 buckets mapped in workspace.");
          break;
        case "cti":
          logs.push("[CTI] CloudTrail log stream detects high-volume GetObject calls from external IP.");
          logs.push("[CTI] Alert: Exfiltration behavior signature matching active ransomware threat.");
          logs.push("[SUCCESS] Marked S3 bucket access logs as :DirtyResource.");
          break;
        case "plugins":
          logs.push("[PLUGINS] Auditing public S3 access configuration blocks.");
          logs.push("[WARN] Found S3 bucket without PublicAccessBlock (BPA) configured.");
          logs.push("[SUCCESS] Posture anomaly logged. Forwarding to graph Intake.");
          break;
        case "runtime-agent":
          logs.push("[RUNTIME] eBPF tracking socket connects to external repository IP.");
          logs.push("[RUNTIME] sys_enter_connect syscall triggers container egress warning.");
          logs.push("[SUCCESS] Verified host network telemetry and forwarded to Graph.");
          break;
        case "graph-intelligence-core":
          logs.push("[GRAPH] MATCH (b:S3Bucket {public:true})<-[r:ACCESS]-(i:IAMRole) RETURN b, i.");
          logs.push("[ALGORITHM] Traversed S3 access graph. Mapped unencrypted exfiltration routes.");
          logs.push("[SUCCESS] Mapped exfiltration route in 8.35ms.");
          break;
        case "reachability":
          logs.push("[REACHABILITY] 4-Layer Reachability check on target S3:bucket-3188.");
          logs.push("[LAYER 1] Network: S3 endpoint allows public internet ingress.");
          logs.push("[LAYER 3] Data policy: S3 bucket policy allows anonymous Read.");
          logs.push("[SUCCESS] Reachability check confirmed: Exfiltration route open.");
          break;
        case "policy-intelligence":
          logs.push("[POLICY-INTEL] S3 Policy Intelligence check using Local LLM.");
          logs.push("[WARN] S3 bucket statement lacks condition clauses and uses wildcard action.");
          logs.push("[SUCCESS] AI policy analysis verified high risk. Hallucination checks passed.");
          break;
        case "dspm":
          logs.push("[DSPM] Go scanner running worker pool on S3:bucket-3188 content.");
          logs.push("[WARN] Discovered customer credit card details and KVKK-governed data in plain text.");
          logs.push("[SUCCESS] S3:bucket-3188 classified as critical PCI-DSS & KVKK repository.");
          break;
        case "campaigns":
          logs.push("[CAMPAIGN] Grouping S3 exposure alerts with external CloudTrail exfiltration.");
          logs.push("[CAMPAIGN] Clustered ransomware data exfiltration scenario.");
          logs.push("[SUCCESS] Campaign signature matched. Target choke point: S3:bucket-3188.");
          break;
        case "threats":
          logs.push("[THREATS] Evaluating toxic combination: Unencrypted S3 + Public Exposure + PII.");
          logs.push("[WARN] Toxic combo triggered. Highly critical exfiltration path confirmed.");
          logs.push("[SUCCESS] Vulnerability score: 98/100. Mitigation queue updated.");
          break;
        case "simulation":
          logs.push("[SIMULATION] Breach simulation on public bucket-3188.");
          logs.push("[SIMULATION] Route: Internet -> Public S3 -> Customer PII Exfiltration.");
          logs.push("[SUCCESS] Active breach path confirmed. Exploit confidence: 95.00%.");
          break;
        case "bce":
          logs.push("[BCE] Mapped bucket-3188 to 'Mega Bank Credit Customer PII Data Store'.");
          logs.push("[BCE] Blast radius calculated: PCI Cardholder + GDPR Data Leakage union.");
          logs.push("[BCE] Choke Point CPIS computed: Blocking S3:bucket-3188 saves $84,320,500.00.");
          logs.push("[SUCCESS] Dispatched prioritized S3 bucket policy remediation.");
          break;
        case "auto-fix":
          logs.push("[REMEDIATION] Generating S3 'Deny All' bucket policy playbook.");
          logs.push("[IaC] Preparing Terraform IaC state modify change plan.");
          logs.push("[SUCCESS] Playbook generated. Awaiting confirmation.");
          break;
        default:
          logs.push("[FINDING] Ransomware analysis step completed.");
      }
    } else if (selectedScenario === "cross_account") {
      switch (module.id) {
        case "prophecy":
          logs.push("[PROPHECY] Ingesting AWS Organizations cross-account trust policies.");
          logs.push("[PROPHECY] Gathering master identity configuration tables.");
          logs.push("[SUCCESS] Active posture scan complete. 18,900 trust relationships scanned.");
          break;
        case "cti":
          logs.push("[CTI] CloudTrail detects CreatePolicyVersion API execution on IAM role.");
          logs.push("[CTI] Alert: Identity attempting privilege escalation to gain admin permissions.");
          logs.push("[SUCCESS] Logged escalated IAM session as :DirtyResource.");
          break;
        case "plugins":
          logs.push("[PLUGINS] Auditing cross-account role configurations.");
          logs.push("[WARN] Found role with wildcard PutRolePolicy allowing cross-account pivot.");
          logs.push("[SUCCESS] Anomaly logged. Forwarded to graph Intake.");
          break;
        case "runtime-agent":
          logs.push("[RUNTIME] eBPF sensor flags CLI token generation inside container.");
          logs.push("[RUNTIME] Trace: AWS STS AssumeRole requests spawned from container host.");
          logs.push("[SUCCESS] Telemetry verified and forwarded to Graph Core.");
          break;
        case "graph-intelligence-core":
          logs.push("[GRAPH] MATCH (i:Identity)-[:PIVOT]->(a:CrossAccountAdmin) RETURN i, a.");
          logs.push("[ALGORITHM] Traversed trust path. Multi-hop cross-account privilege escalation mapped.");
          logs.push("[SUCCESS] Mapped escalation pivot route in 22.45ms.");
          break;
        case "reachability":
          logs.push("[REACHABILITY] 4-Layer Reachability check on cross-account role.");
          logs.push("[LAYER 2] IAM: Identity has permissions to execute CreatePolicyVersion.");
          logs.push("[LAYER 4] Compensating controls: SCP policies currently allow AssumeRole.");
          logs.push("[SUCCESS] Reachability confirmed: Escalation path is fully active.");
          break;
        case "policy-intelligence":
          logs.push("[POLICY-INTEL] S3 LLM analysis of cross-account IAM trust logs.");
          logs.push("[WARN] Inline policy allows full IAM write operations without MFA validation.");
          logs.push("[SUCCESS] AI policy analysis complete. Hallucination checks passed.");
          break;
        case "dspm":
          logs.push("[DSPM] Scanning cloud credential vaults and secret manager records.");
          logs.push("[WARN] Found plaintext access keys for cross-account admin role.");
          logs.push("[SUCCESS] Discovered master account credential store exposure.");
          break;
        case "campaigns":
          logs.push("[CAMPAIGN] Grouping privilege escalation alerts with cross-account sts:AssumeRole.");
          logs.push("[CAMPAIGN] Campaign signature matches Cross-Account Privilege Escalation.");
          logs.push("[SUCCESS] Target choke point identified: IAM:CreatePolicyVersion-escalation.");
          break;
        case "threats":
          logs.push("[THREATS] Evaluating toxic combination: CreatePolicyVersion + Cross-Account AssumeRole.");
          logs.push("[WARN] Toxic combo triggered. Shadow Admin vulnerability verified.");
          logs.push("[SUCCESS] Contextual risk assessment complete. Score: 100/100.");
          break;
        case "simulation":
          logs.push("[SIMULATION] Breach simulation on cross-account trust path.");
          logs.push("[SIMULATION] Route: Internet -> Identity -> CreatePolicyVersion -> Cross-Account Pivot.");
          logs.push("[SUCCESS] Active breach path confirmed. Exploit confidence: 97.20%.");
          break;
        case "bce":
          logs.push("[BCE] Mapped Identity assets to 'Organizations Master Admin Core'.");
          logs.push("[BCE] Blast radius calculated: PCI Cardholder + GDPR Data Leakage union.");
          logs.push("[BCE] Choke Point CPIS computed: Blocking escalation saves $212,500,000.00.");
          logs.push("[SUCCESS] Dispatched prioritized SCP remediation playbook.");
          break;
        case "auto-fix":
          logs.push("[REMEDIATION] Generating AWS Organizations SCP restriction policy.");
          logs.push("[IaC] Preparing Terraform HCL script to deny AssumeRole under toxic conditions.");
          logs.push("[SUCCESS] Playbook generated. Awaiting confirmation.");
          break;
        default:
          logs.push("[FINDING] Privilege escalation analysis step completed.");
      }
    } else {
      switch (module.id) {
        case "prophecy":
          logs.push("[PROPHECY] Ingesting identity access key usage metrics from IAM profile database.");
          logs.push("[PROPHECY] Starting background discovery on unauthorized cross-region keys usage.");
          logs.push("[SUCCESS] Active posture scan complete. Mapped 14,200 credential metrics.");
          break;
        case "cti":
          logs.push("[CTI] CloudTrail detects active production AccessKey calls from a residential IP address.");
          logs.push("[CTI] Alert: Identity metadata flags access as insider threat activity pattern.");
          logs.push("[SUCCESS] Flagged anomalous IP session metadata as :DirtyResource.");
          break;
        case "plugins":
          logs.push("[PLUGINS] Auditing Active Access Key lifetimes and region enforcement policy exceptions.");
          logs.push("[WARN] Detected access key generated 180+ days ago without rotation or IP constraints.");
          logs.push("[SUCCESS] Found 3 critical configuration drifts. Forwarding to Intake.");
          break;
        case "runtime-agent":
          logs.push("[RUNTIME] eBPF sensor intercepts active copy/paste of credentials file on personal workstation.");
          logs.push("[RUNTIME] ALERT: Insider copying admin level AccessKeys to external personal storage.");
          logs.push("[SUCCESS] Station attestation verified. Sending data to Graph.");
          break;
        case "graph-intelligence-core":
          logs.push("[GRAPH] MATCH (u:User {insider:true})-[r:LEAKED]->(k:AccessKey)-[:ADMIN]->(c:Cloud) RETURN u, k, c.");
          logs.push("[ALGORITHM] Traversed identity graph. Insider-to-admin exfiltration path mapped.");
          logs.push("[SUCCESS] Identified direct monetization path in 18.23ms.");
          break;
        case "reachability":
          logs.push("[REACHABILITY] 4-Layer Reachability check on target IAM:AccessKey-Insider-Theft.");
          logs.push("[LAYER 2] IAM: AccessKey holds wildcard administration privileges on master services.");
          logs.push("[LAYER 4] Compensating controls: No active IP constraints or MFA rules found.");
          logs.push("[SUCCESS] Reachability check confirmed: Admin key is fully unconstrained.");
          break;
        case "policy-intelligence":
          logs.push("[POLICY-INTEL] S3 LLM analysis of access key trust boundaries.");
          logs.push("[WARN] Access key lacks specific IP condition block or active session timeouts.");
          logs.push("[SUCCESS] AI policy risk assessment complete. Hallucination checks passed.");
          break;
        case "dspm":
          logs.push("[DSPM] Scanning workstation git caches for credential strings.");
          logs.push("[WARN] Found raw AWS Secret Keys committed to personal github repository drafts.");
          logs.push("[SUCCESS] Plaintext keys categorized as high-risk leak. Findings logged.");
          break;
        case "campaigns":
          logs.push("[CAMPAIGN] Clustered workstation copy events with anomalous CloudTrail API calls.");
          logs.push("[CAMPAIGN] Campaign signature matches Insider Credential Exfiltration & Sale.");
          logs.push("[SUCCESS] Campaign clustered. Choke point identified: IAM:AccessKey-Insider-Theft.");
          break;
        case "threats":
          logs.push("[THREATS] Evaluating toxic combination: Insider key copy + Non-corporate IP + Admin Role.");
          logs.push("[WARN] TOXIC_COMBO: Wildcard Admin AccessKey + Anomalous External IP + Workstation leak.");
          logs.push("[SUCCESS] High-severity toxic rule triggered. Risk score: 100/100.");
          break;
        case "simulation":
          logs.push("[SIMULATION] Breach path simulation on leaked credentials.");
          logs.push("[SIMULATION] Route: WORKSTATION -> Leaked Key -> Admin API Execution -> Production Outage.");
          logs.push("[SUCCESS] Exploit validation confirmed. Breach path feasibility: 98.40%.");
          break;
        case "bce":
          logs.push("[BCE] Mapped AccessKey to 'Corporate Financial Services Core Application'.");
          logs.push("[BCE] Blast radius calculated: PCI Cardholder + GDPR Data Leakage union.");
          logs.push("[BCE] Choke Point CPIS computed: Severing IAM:AccessKey-Insider-Theft saves $195,000,000.00.");
          logs.push("[SUCCESS] Dispatched prioritized key rotation remediation.");
          break;
        case "auto-fix":
          logs.push("[REMEDIATION] Compilation of IAM AccessKey rotation HCL script.");
          logs.push("[IaC] Preparing script to revoke credentials and block source workstation IP.");
          logs.push("[SUCCESS] Playbook generated. Awaiting confirmation.");
          break;
        default:
          logs.push("[FINDING] Insider Leak analysis step completed.");
      }
    }

    return logs;
  };
