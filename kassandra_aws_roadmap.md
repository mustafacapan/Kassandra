# Kassandra Prophecy
## Cyber-Economic Autonomous Defense Architecture — Technical Roadmap

*Planned platform extension — architecture and design phase*

---

## 1. What We Are Building

Most security platforms answer one question: **"is this an attack?"** Kassandra Prophecy is designed to answer a harder, more useful one: **"given everything we know about the threat and everything we know about the business, what is the least damaging way to respond — and can we trust an automated system to act on that answer, within limits we control?"**

The core insight: the same security event can require completely different responses depending on business context. An exploit detected at 3:00 AM on a low-traffic system and the same exploit detected during peak payroll processing are not the same decision problem, even though they look identical to a severity-based detection tool. No existing platform models this distinction explicitly. Kassandra Prophecy is designed to.

This roadmap describes the architecture we have designed and the phased plan to build it on AWS infrastructure.

---

## 2. Why This Matters (Problem Statement)

| Industry Problem | Consequence |
|---|---|
| Detection tools score severity, not business cost | Identical alerts get identical responses regardless of actual impact |
| Automated response systems lack reversibility guarantees | A single bad automated decision can cause outages worse than the attack it prevented (e.g., the 2024 CrowdStrike incident, which took down 8.5M Windows machines from a single bad update) |
| Threat intelligence isn't shared at the defense-outcome level | Organizations repeatedly relearn the same lessons that another organization already paid for |

Kassandra Prophecy's design responds to all three: business-context-aware decisions, mandatory reversibility on every automated action, and a collective learning layer that shares *defense outcomes*, not just attack signatures.

---

## 3. Architecture Overview

Kassandra Prophecy is designed as an **8-layer decision pipeline**, split across two operating planes:

```
COLLECTIVE PLANE (shared intelligence)
   ↓
[1] Secure Ingestion Gateway
   ↓
[2] Telemetry Collection & Normalization
   ↓
[3] Attack Graph Construction
   ↓
[4] Trust & Confidence Scoring (Bayesian)
   ↓
ENTERPRISE PLANE (local, business-aware decision)
   ↓
[5] Decision Governance (business cost + action utility + policy constraints)
   ↓
[6] Stability Control (prevents automated thrashing/oscillation)
   ↓
[7] Reversible Response Execution
   ↓
[8] Continuous Learning & Calibration
```

**Why two planes, not one:** business-sensitive data (revenue figures, regulatory exposure) should never leave a customer's environment. Only abstracted intelligence — attack patterns, calibrated model updates — is shared centrally. Raw business and telemetry data stays local. This is a structural privacy decision, not an afterthought.

---

## 4. AWS Service Mapping (Planned)

| Layer | Primary AWS Services (Planned) | Purpose |
|---|---|---|
| Ingestion Gateway | API Gateway, Lambda, Cognito | Authenticated, rate-limited entry point for external intelligence feeds |
| Telemetry Collection | CloudTrail, VPC Flow Logs, GuardDuty, Kinesis Data Streams | Native AWS signal ingestion and real-time stream processing |
| Attack Graph / Pattern Engine | Neptune (graph database), Lambda, Bedrock (LLM reasoning) | Graph construction and pattern explanation; LLM used for reasoning/explanation only, never for final decisions |
| Confidence & Decision Engines | ECS/Fargate, SageMaker (model serving), DynamoDB | Containerized scoring services; probabilistic models served independently of the core app |
| Response Execution | Step Functions, Systems Manager Automation, Lambda | Orchestrated, atomic, rollback-capable action execution |
| Learning & Calibration | S3 (model artifacts), SageMaker, EventBridge (scheduled recalibration) | Periodic recalibration jobs; federated update aggregation |
| Observability / Audit | CloudWatch, OpenSearch | Full decision audit trail — every automated action must be explainable after the fact |

This mapping is the basis for our projected AWS usage and the primary reason this credit would go directly toward platform development rather than general operating costs.

---

## 5. Development Roadmap

| Phase | Scope | Status |
|---|---|---|
| **Phase 0 — Foundation** | Current product (live), core infrastructure on AWS | **Complete / Live** |
| **Phase 1 — Telemetry & Graph Layer** | Layers 1–3: ingestion gateway, normalization pipeline, attack graph construction on Neptune | **Planned — next 1–2 quarters** |
| **Phase 2 — Trust & Confidence Engine** | Layer 4: Bayesian confidence scoring, correlation-penalty correction for non-independent signals | **Planned** |
| **Phase 3 — Decision Governance** | Layer 5: business-context cost modeling, action-utility scoring, policy-constraint engine | **Planned** |
| **Phase 4 — Stability & Response** | Layers 6–7: oscillation control, reversible/atomic response execution | **Planned** |
| **Phase 5 — Learning Loop** | Layer 8: local recalibration, federated cross-tenant pattern sharing (model updates only, no raw data) | **Planned** |

Each phase is independently shippable — the architecture is designed so that Phase 1 alone (graph-based attack-path visibility) is already a usable improvement over flat alert lists, with later phases adding progressively more autonomous decision-making on top.

---

## 6. What Makes This Different (Honest Framing)

We are not claiming this is built. We are claiming we have done the architectural work to build it correctly:

- **Detection-to-decision separation is designed in from layer one** — no component automatically escalates from "this looks suspicious" to "take action" without passing through explicit business-context and governance checks.
- **Every automated action is designed to be reversible by construction** — pre-action state snapshots and rollback tokens are part of the response pipeline specification, not a planned add-on.
- **Open questions are tracked, not hidden.** Two known hard problems we are explicitly designing around: (1) business-context modeling (revenue curves, seasonality) requires real customer data to calibrate and cannot be fully validated before deployment; (2) cross-tenant federated learning's real-world generalization across heterogeneous environments is a theoretical strength we intend to validate empirically, not an assumed result.

---

## 7. Scenario — How the Architecture Is Meant to Behave

**Setup:** A mid-sized fintech customer runs its payment-processing environment on AWS. At 3:14 AM, a developer's credentials are compromised via phishing. The attacker authenticates successfully and attempts to assume an administrative IAM role.

**Walking through the pipeline:**

1. **Layer 2 (Telemetry):** CloudTrail logs an `AssumeRole` call outside the developer's normal working hours. GuardDuty flags the source IP as originating from an unfamiliar geography. Individually, neither signal is conclusive — developers occasionally work odd hours, and VPNs change apparent geography.

2. **Layer 3 (Attack Graph):** The pattern engine connects the two signals into a path: `Compromised Credential → AssumeRole(AdminRole, never used before by this identity) → Reachable: payment-prod environment`. The reasoning engine (Bedrock-based) generates a plain-language explanation of *why* this path is concerning — but does not label it an attack. That determination is reserved for Layer 4.

3. **Layer 4 (Confidence):** Bayesian scoring combines source reputation, the unusual-role-assumption signal, and the geographic anomaly. Because the geography signal and the role-assumption signal are not fully independent (both stem from the same login session), a correlation penalty is applied so confidence is not artificially inflated. Resulting confidence: high, but not at the maximum threshold for instant automated lockout.

4. **Layer 5 (Decision Governance):** This is where the architecture's core differentiation shows up. The Business Context Engine flags the target environment as `payment-prod` — maximum financial blast radius, maximum regulatory exposure. The Action Utility Engine evaluates the candidate actions: a full shutdown would stop the attacker immediately, but at 3:14 AM revenue-per-hour for this customer is low, so the utility of *quarantining only the compromised role* (rather than shutting down the entire payment environment) scores highest — it stops the credential from doing further damage while leaving unrelated payment traffic untouched. Critically, because the target is tagged `payment-prod`, a governance policy requires this specific action to be human-approved before execution, **regardless of how high the confidence score is.** Confidence and authorization are deliberately kept as separate questions.

5. **Layer 6 (Stability Control):** Because this incident also resembles a pattern that triggered a threshold recalibration earlier in the week, the system checks whether more than one automatic parameter is trying to change at once. It is — so only the single highest-priority adjustment (tightening this credential's permissions) proceeds immediately; a second proposed change (raising the audit-sampling rate for this role type) is queued for human review rather than applied automatically. This prevents the system from making several simultaneous adjustments that would be hard to reason about later.

6. **Layer 7 (Response Execution):** Once approved (in this case, via an on-call engineer's rapid sign-off, since the fintech customer's policy allows expedited approval for credential-based incidents outside business hours), the response engine takes a pre-action snapshot of the IAM policy state, revokes the compromised role's session, and forces credential rotation — all as a single atomic operation with a rollback token attached, in case the action needs to be reversed.

7. **Layer 8 (Learning):** The incident is logged with full context: confidence score, business-context inputs, the action taken, and the outcome. If, on review, the response is confirmed correct, this strengthens the confidence calibration for this attack pattern. An abstracted version of the pattern — not the customer's raw logs — is made available to the collective intelligence pool, so that another customer encountering a similar credential-phishing pattern benefits from a head start.

**Why this scenario matters:** it shows the three hardest problems the architecture is built to solve, together, in one incident — (1) an ambiguous initial signal that required correlation rather than a single rule, (2) a path toward a business-critical system that needed economic and governance reasoning, not just a severity score, and (3) multiple automated mechanisms that could have fired simultaneously, deliberately throttled so the system's behavior stays explainable.

---

## 8. Closing Note

We are sharing this roadmap not as a finished product claim, but as evidence of the depth of planning behind our next development phase. The architecture has been deliberately designed, reviewed, and stress-tested on paper — including its own weaknesses — before a single production line of this specific pipeline is written. We believe that is exactly the kind of technical seriousness this credit is meant to support.
