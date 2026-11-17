import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  CreditCard,
  Building2,
  Cpu,
  Stethoscope,
  FlaskConical,
  Car,
} from "lucide-react";
import { PageId } from "../data/platformData";
import { RequirementPrefill } from "../components/RequirementModal";

interface ProcessAndBusinessesPageProps {
  mode: "process" | "businesses";
  onNavigate: (page: PageId) => void;
  onOpenRequirementModal: (prefill: RequirementPrefill) => void;
}

const PROCESS_SUBPAGES = [
  {
    id: "vetting",
    label: "01 · Vetting",
    kicker: "4-Gate Technical & Domain Assessment",
    headline: "How RapidBrains Vets Global Technology & Domain Talent.",
    summary:
      "Every professional in our ecosystem passes a structured multi-stage evaluation combining Lens AI competency extraction, practical coding or domain rubric testing, and practitioner-led architectural interviews.",
    steps: [
      {
        num: "Gate 01",
        title: "Lens AI Skill Graph & Experience Audit",
        desc: "Verification of production engineering history, repository complexity, architectural scale, and credential authenticity.",
      },
      {
        num: "Gate 02",
        title: "Practical Coding & Domain Rubric Assessment",
        desc: "Role-calibrated evaluations: distributed systems debugging, cloud IaC scenarios, or clinical/legal RLHF rubric calibration.",
      },
      {
        num: "Gate 03",
        title: "Senior Practitioner System-Design Interview",
        desc: "Live 60-minute architectural deep dive with a domain specialist evaluating trade-off reasoning, security awareness, and maintainability.",
      },
      {
        num: "Gate 04",
        title: "Remote Delivery & Communication Readiness",
        desc: "Verification of asynchronous documentation clarity, proactive sprint communication, timezone reliability, and security hygiene.",
      },
    ],
  },
  {
    id: "onboarding",
    label: "02 · Onboarding",
    kicker: "Rapid Contract & EOR Integration",
    headline: "Compliant Onboarding Built for Immediate Sprint Velocity.",
    summary:
      "Once you select a candidate or squad in Rapid Hire, our operations team completes legal, security, and workspace onboarding in days so engineers can commit production code without administrative bottlenecks.",
    steps: [
      {
        num: "Phase 01",
        title: "MSA, NDA & 100% IP Assignment Execution",
        desc: "Automated execution of client-specific confidentiality, data security, and direct intellectual property transfer agreements.",
      },
      {
        num: "Phase 02",
        title: "Background, Identity & Credential Verification",
        desc: "Identity authentication, employment history verification, and academic/professional license checks where required.",
      },
      {
        num: "Phase 03",
        title: "Statutory EOR Registration or Contractor Setup",
        desc: "For Employ Globally (EOR), we execute local-law employment contracts and enroll statutory benefits; for Hire on Demand, we activate hourly timesheet governance.",
      },
      {
        num: "Phase 04",
        title: "Repository, Cloud & Ceremony Integration",
        desc: "Structured Day-1 checklist aligning GitHub/GitLab access, Jira/Linear workflows, Slack channels, and sprint standup schedules.",
      },
    ],
  },
  {
    id: "payroll",
    label: "03 · Payroll Management",
    kicker: "Consolidated Invoicing & Global Disbursement",
    headline: "Unified Global Payroll, Timesheets, and Statutory Compliance.",
    summary:
      "Eliminate multi-currency banking friction and foreign tax complexity. Fund a single monthly invoice in your operating currency while RapidBrains handles verified hourly payouts, EOR salaries, tax withholdings, and statutory benefits.",
    steps: [
      {
        num: "Cycle 01",
        title: "Verified Hourly Timesheet & Milestone Capture",
        desc: "For contract developers, hours are logged against approved sprint tasks and reviewed by your engineering manager prior to billing.",
      },
      {
        num: "Cycle 02",
        title: "Single Consolidated Client Invoice",
        desc: "Receive one clear monthly statement in USD, EUR, GBP, or INR covering all active contractors, dedicated pods, and EOR employees.",
      },
      {
        num: "Cycle 03",
        title: "Local-Currency Salary & Statutory Tax Filing",
        desc: "RapidBrains executes on-time local-currency payouts, income tax withholdings, social security contributions, and compliant payslips.",
      },
      {
        num: "Cycle 04",
        title: "Ongoing Workforce Retention & Compliance Audit",
        desc: "Dedicated account governance managing leave tracking, annual appraisals, contract extensions, and regulatory updates.",
      },
    ],
  },
] as const;

const BUSINESS_TYPES = [
  {
    name: "Startups & Founders",
    challenge:
      "Need senior, self-directed product engineers to ship MVP and Series A milestones rapidly without burning runway on 4-month executive search cycles.",
    categories: "Full-Stack TypeScript · Python/FastAPI · Applied AI/LLM · Mobile React Native",
    recommendedModel: "Hire on Demand (Hourly Contract) — 1 to 3 Senior Builders",
    solutionLink: "solution-hire-on-demand" as PageId,
    caseOutcome:
      "Enabled a seed-stage AI startup to onboard 2 Senior Full-Stack & RAG engineers in 72 hours, launching their enterprise beta 8 weeks ahead of plan.",
  },
  {
    name: "Technology Companies",
    challenge:
      "Core engineering teams face backlog bottlenecks on cloud migrations, data lakehouse modernization, and specialized AI features.",
    categories: "Cloud & Kubernetes · Data Engineering (Spark/Snowflake) · QA Automation SDETs",
    recommendedModel: "Hire on Demand + Dedicated Engineering Pods",
    solutionLink: "solution-dedicated-teams" as PageId,
    caseOutcome:
      "Augmented an existing 40-person engineering org with a 5-engineer Cloud & Data pod to complete multi-region AWS modernization.",
  },
  {
    name: "Scale-ups",
    challenge:
      "Expanding internationally after Series B/C funding requires hiring 10–30 engineers across borders without establishing foreign legal subsidiaries.",
    categories: "Dedicated Cross-Functional Squads · Engineering Managers · Staff Architects",
    recommendedModel: "Dedicated Teams + Employ Globally (EOR) + Permanent Hiring",
    solutionLink: "solution-employ-globally" as PageId,
    caseOutcome:
      "Combined Dedicated Squads with RapidBrains EOR to scale a distributed engineering hub of 14 full-time engineers with zero entity setup delay.",
  },
  {
    name: "Enterprise Organizations",
    challenge:
      "Strict procurement, SOC2/ISO security mandates, complex AI model evaluation (RLHF), and multi-country contractor compliance governance.",
    categories: "Domain Experts for AI (RLHF) · Principal Cloud Architects · RPO & Rapid Hire",
    recommendedModel: "Enterprise MSA · Domain Experts for AI · Global EOR & RPO",
    solutionLink: "solution-domain-experts-ai" as PageId,
    caseOutcome:
      "Delivered calibrated cohorts of credentialed domain specialists and senior systems engineers under a unified enterprise governance framework.",
  },
];

const INDUSTRY_SOLUTIONS = [
  {
    name: "Technology & SaaS",
    challenges:
      "High competition for senior distributed systems, DevOps, and applied Generative AI engineers slows product release velocity.",
    talentCategories: "Full-Stack React/Node · Python · Kubernetes/Terraform · RAG & LLM Engineers",
    engagementModels: "Hire on Demand (Hourly Contract) · Dedicated Product Pods",
    caseStudy:
      "Multi-tenant B2B SaaS provider engaged 4 senior contract developers to deliver SOC2 infrastructure automation and real-time analytics dashboards.",
  },
  {
    name: "Healthcare & Life Sciences",
    challenges:
      "Building clinical software and evaluating medical AI models requires both HIPAA-aware software engineers and licensed clinicians (MDs).",
    talentCategories: "Clinical AI Evaluators (MDs) · HL7/FHIR Backend Engineers · Data Security Architects",
    engagementModels: "Domain Experts for AI (RLHF & Clinical Red-Teaming) · Dedicated Engineering Teams",
    caseStudy:
      "Assembled a cohort of 12 licensed physicians to evaluate 4,500 diagnostic LLM reasoning traces alongside backend interoperability engineers.",
  },
  {
    name: "Biotechnology",
    challenges:
      "Genomic and computational biology platforms demand specialized Python, R, Nextflow, and cloud lakehouse data engineering talent.",
    talentCategories: "Bioinformatics Data Engineers · Cloud Scientific Computing · Python & Spark Specialists",
    engagementModels: "Hire on Demand · Permanent Specialist Recruitment · Global EOR",
    caseStudy:
      "Provisioned senior data and cloud pipeline engineers to automate high-throughput experimental data processing on AWS.",
  },
  {
    name: "Automotive",
    challenges:
      "Connected vehicle platforms, EV telemetry, and autonomous perception systems require scarce embedded C++, Rust, and edge AI engineers.",
    talentCategories: "Embedded C++/Rust · IoT Telemetry Cloud Architects · Computer Vision & QA SDETs",
    engagementModels: "Dedicated Engineering Teams · Hire on Demand · Employ Globally",
    caseStudy:
      "Scaled a dedicated connected-mobility telemetry and QA automation pod supporting real-time fleet diagnostics.",
  },
];

export const ProcessAndBusinessesPage: React.FC<ProcessAndBusinessesPageProps> = ({
  mode,
  onNavigate,
  onOpenRequirementModal,
}) => {
  const [activeProcessTab, setActiveProcessTab] = useState<number>(0);
  const [businessView, setBusinessView] = useState<"type" | "industry">("type");

  if (mode === "process") {
    const currentProc = PROCESS_SUBPAGES[activeProcessTab];

    return (
      <div className="bg-white">
        {/* Subbar */}
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-500">
              COMPLETE TALENT LIFECYCLE PROCESS:
            </div>
            <div className="flex items-center gap-2">
              {PROCESS_SUBPAGES.map((sub, i) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setActiveProcessTab(i)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeProcessTab === i
                      ? "bg-slate-900 text-white"
                      : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* HERO */}
        <section className="bg-white pt-14 pb-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="max-w-3xl space-y-4">
              <div className="text-xs font-mono text-blue-600">
                {currentProc.kicker.toUpperCase()}
              </div>
              <h1
                className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900"
                style={{ textWrap: "balance" }}
              >
                {currentProc.headline}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {currentProc.summary}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onOpenRequirementModal({
                      sourcePage: `Process — ${currentProc.label}`,
                      inquiryType: "See How It Works — Consultation",
                    })
                  }
                  className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>See How It Works for Your Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive 4-Step Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {currentProc.steps.map((st) => (
                <div
                  key={st.num}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="text-xs font-mono font-bold text-blue-600">
                      {st.num}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {st.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* END-TO-END LIFECYCLE MATRIX */}
        <section className="bg-slate-50 py-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 space-y-10">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-mono text-blue-600">
                UNIFIED WORKFORCE JOURNEY
              </div>
              <h2 className="text-3xl font-bold text-slate-900">
                How Vetting, Onboarding, and Payroll Connect Seamlessly
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROCESS_SUBPAGES.map((proc, idx) => (
                <div
                  key={proc.id}
                  className={`rounded-xl border p-7 flex flex-col justify-between space-y-6 ${
                    activeProcessTab === idx
                      ? "bg-white border-blue-600 shadow-xs"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-blue-600">
                      {proc.label}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {proc.kicker}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proc.summary}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveProcessTab(idx)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer pt-3 border-t border-slate-100"
                  >
                    <span>Inspect {proc.label.split("·")[1]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // BUSINESSES PAGE
  return (
    <div className="bg-white">
      {/* Subbar */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-500">
            BUSINESS &amp; INDUSTRY SOLUTIONS:
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBusinessView("type")}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                businessView === "type"
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              By Business Type (Startups to Enterprise)
            </button>
            <button
              type="button"
              onClick={() => setBusinessView("industry")}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                businessView === "industry"
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              By Industry Vertical (SaaS, Healthcare, Biotech, Auto)
            </button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-white pt-14 pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono text-blue-600">
              SOLUTIONS BY ORGANIZATION STAGE &amp; INDUSTRY
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: "balance" }}
            >
              Workforce Architectures Calibrated to Your Business Reality.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              From founders shipping initial product-market fit to global enterprises managing regulated AI evaluation and cross-border EOR hubs, explore how RapidBrains configures talent solutions for your sector.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() =>
                  onOpenRequirementModal({
                    sourcePage: "Businesses Page",
                    inquiryType: "Find Your Hiring Solution — Business Consultation",
                  })
                }
                className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Find Your Hiring Solution</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {businessView === "type" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BUSINESS_TYPES.map((b, idx) => (
                <div
                  key={b.name}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-7 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-blue-600">
                      0{idx + 1} · By Business Type
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {b.name}
                    </h2>
                    <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                      <p>
                        <span className="font-semibold text-slate-900">
                          Hiring Challenge:{" "}
                        </span>
                        {b.challenge}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">
                          Relevant Talent Categories:{" "}
                        </span>
                        {b.categories}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">
                          Recommended Model:{" "}
                        </span>
                        {b.recommendedModel}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600">
                      <span className="font-semibold text-slate-900">
                        Representative Outcome:{" "}
                      </span>
                      {b.caseOutcome}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => onNavigate(b.solutionLink)}
                      className="text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      View Recommended Solution
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenRequirementModal({
                          sourcePage: `Businesses — ${b.name}`,
                          inquiryType: `${b.name} Hiring Solution`,
                          engagementModel: b.recommendedModel,
                        })
                      }
                      className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Find Your Hiring Solution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {INDUSTRY_SOLUTIONS.map((ind, idx) => (
                <div
                  key={ind.name}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-7 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-blue-600">
                      0{idx + 1} · By Industry Vertical
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {ind.name}
                    </h2>
                    <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                      <p>
                        <span className="font-semibold text-slate-900">
                          Industry Challenge:{" "}
                        </span>
                        {ind.challenges}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">
                          Key Talent Categories:{" "}
                        </span>
                        {ind.talentCategories}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">
                          Engagement Models:{" "}
                        </span>
                        {ind.engagementModels}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600">
                      <span className="font-semibold text-slate-900">
                        Case Scenario:{" "}
                      </span>
                      {ind.caseStudy}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenRequirementModal({
                          sourcePage: `Industry — ${ind.name}`,
                          inquiryType: `${ind.name} Talent Requirement`,
                          roleOrTech: ind.talentCategories,
                        })
                      }
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Request {ind.name} Talent</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
