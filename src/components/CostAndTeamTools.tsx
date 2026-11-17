import React, { useState } from "react";
import { Calculator, Cpu, ArrowRight, Info, Layers } from "lucide-react";

interface TeamRecommendation {
  architectureName: string;
  recommendedEngagementModel: string;
  totalHeadcount: number;
  estimatedOnboardingDays: number;
  roles: {
    roleTitle: string;
    seniority: string;
    count: number;
    coreSkills: string[];
    keyResponsibility: string;
  }[];
  deliveryPhases: {
    phaseName: string;
    duration: string;
    deliverable: string;
  }[];
}

const ROLE_RATES: Record<string, { label: string; baseHourly: number }> = {
  "fullstack-ts": { label: "Full-Stack TypeScript / React / Node Engineer", baseHourly: 48 },
  "python-backend": { label: "Python & Distributed Systems Engineer", baseHourly: 52 },
  "ai-ml": { label: "AI / Machine Learning & RAG Engineer", baseHourly: 68 },
  "cloud-devops": { label: "Cloud Architect & Kubernetes DevOps Engineer", baseHourly: 62 },
  "data-eng": { label: "Data & Lakehouse Engineer (Spark / Snowflake)", baseHourly: 55 },
  "qa-sdet": { label: "QA Automation & Performance SDET", baseHourly: 42 },
  "domain-expert": { label: "Domain Expert for AI (RLHF / Clinical / Legal)", baseHourly: 80 },
};

const SENIORITY_MULTIPLIERS: Record<string, { label: string; mult: number }> = {
  "Mid-Senior (4–6 yrs)": { label: "Mid-Senior (4–6 yrs)", mult: 0.88 },
  "Senior (6–9 yrs)": { label: "Senior (6–9 yrs)", mult: 1.0 },
  "Staff / Principal (9+ yrs)": { label: "Staff / Principal (9+ yrs)", mult: 1.28 },
};

const REGION_MULTIPLIERS: Record<string, { label: string; mult: number }> = {
  "South Asia / India Hub (UTC+5:30)": { label: "South Asia / India Hub (UTC+5:30)", mult: 0.85 },
  "Central & Eastern Europe (UTC+1/UTC+2)": { label: "Central & Eastern Europe (UTC+1/UTC+2)", mult: 1.08 },
  "Latin America Nearshore (UTC-3/UTC-5)": { label: "Latin America Nearshore (UTC-3/UTC-5)", mult: 1.05 },
  "Global Blended Timezone Overlap": { label: "Global Blended Timezone Overlap", mult: 1.0 },
};

interface CostAndTeamToolsProps {
  onOpenRequirementModal: (prefill: {
    inquiryType: string;
    roleOrTech: string;
    teamSize: string;
    engagementModel: string;
    requirements: string;
  }) => void;
}

export const CostAndTeamTools: React.FC<CostAndTeamToolsProps> = ({
  onOpenRequirementModal,
}) => {
  const [activeTab, setActiveTab] = useState<"calculator" | "recommender">("calculator");

  // Calculator State
  const [roleKey, setRoleKey] = useState<string>("python-backend");
  const [seniority, setSeniority] = useState<string>("Senior (6–9 yrs)");
  const [headcount, setHeadcount] = useState<number>(3);
  const [durationMonths, setDurationMonths] = useState<number>(6);
  const [region, setRegion] = useState<string>("Global Blended Timezone Overlap");
  const [engagementModel, setEngagementModel] = useState<string>("Hire on Demand (Hourly Contract)");

  // Recommender State
  const [projectDescription, setProjectDescription] = useState<string>(
    "We are building a multi-tenant B2B analytics platform with an embedded RAG assistant, automated cloud data ingestion pipelines, and SOC2-ready AWS infrastructure."
  );
  const [stage, setStage] = useState<string>("Series A / Scale-up");
  const [timeline, setTimeline] = useState<string>("6 Months to Production");
  const [recLoading, setRecLoading] = useState<boolean>(false);
  const [recError, setRecError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<TeamRecommendation>({
    architectureName: "Cloud-Native B2B Analytics & Embedded RAG Engineering Squad",
    recommendedEngagementModel: "Dedicated Teams / Hire on Demand Hybrid",
    totalHeadcount: 5,
    estimatedOnboardingDays: 7,
    roles: [
      {
        roleTitle: "Staff AI & RAG Systems Engineer",
        seniority: "Staff",
        count: 1,
        coreSkills: ["Python", "Vector DBs", "Evaluation Harnesses", "AWS Bedrock"],
        keyResponsibility: "Design grounded retrieval pipelines, citation verification, and latency guardrails.",
      },
      {
        roleTitle: "Senior Full-Stack TypeScript & React Engineers",
        seniority: "Senior",
        count: 2,
        coreSkills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
        keyResponsibility: "Build multi-tenant workspace UI, RBAC permissions, and API gateway services.",
      },
      {
        roleTitle: "Senior Data & Ingestion Pipeline Engineer",
        seniority: "Senior",
        count: 1,
        coreSkills: ["Python", "Apache Airflow", "dbt", "Snowflake"],
        keyResponsibility: "Architect automated ETL connectors and real-time tenant data isolation.",
      },
      {
        roleTitle: "Principal Cloud & DevOps Engineer",
        seniority: "Principal",
        count: 1,
        coreSkills: ["AWS", "Terraform", "Kubernetes", "SOC2 Controls"],
        keyResponsibility: "Provision infrastructure-as-code, CI/CD pipelines, and observability.",
      },
    ],
    deliveryPhases: [
      {
        phaseName: "01. Architecture, Multi-Tenant Auth & Cloud Landing Zone",
        duration: "Weeks 1–6",
        deliverable: "Terraform AWS foundation, tenant isolation schema, and core ingestion pipeline.",
      },
      {
        phaseName: "02. Analytics Workspace & Grounded RAG Pipeline",
        duration: "Weeks 7–16",
        deliverable: "Interactive dashboarding, vector indexing, and evaluated AI query workflows.",
      },
      {
        phaseName: "03. Load Testing, Security Hardening & GA Rollout",
        duration: "Weeks 17–24",
        deliverable: "Automated Playwright/k6 suites, SOC2 audit readiness, and production launch.",
      },
    ],
  });

  // Calculation Math (transparent, indicative planning model)
  const baseRole = ROLE_RATES[roleKey] ?? ROLE_RATES["python-backend"];
  const senMult = SENIORITY_MULTIPLIERS[seniority]?.mult ?? 1.0;
  const regMult = REGION_MULTIPLIERS[region]?.mult ?? 1.0;
  const estimatedHourlyRate = Math.round(baseRole.baseHourly * senMult * regMult);
  const hoursPerMonth = 160;
  const monthlyPerPerson = estimatedHourlyRate * hoursPerMonth;
  const totalMonthlyEstimate = monthlyPerPerson * headcount;
  const totalEngagementEstimate = totalMonthlyEstimate * durationMonths;

  const handleGenerateRecommendation = async () => {
    if (!projectDescription.trim()) return;
    setRecLoading(true);
    setRecError(null);
    try {
      const response = await fetch("/api/recommender/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectDescription, stage, timeline }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate team recommendation.");
      }
      setRecommendation(data);
    } catch (err: unknown) {
      setRecError(
        err instanceof Error ? err.message : "Unable to generate recommendation."
      );
    } finally {
      setRecLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Segmented Tool Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab("calculator")}
            className={`px-4 py-2 text-xs font-medium rounded-md flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "calculator"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>AI Hiring Cost & Engagement Estimator</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("recommender")}
            className={`px-4 py-2 text-xs font-medium rounded-md flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "recommender"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Skill & Role Recommender</span>
          </button>
        </div>
        <div className="text-xs text-slate-500">
          Interactive Workforce Planning Suite
        </div>
      </div>

      {activeTab === "calculator" ? (
        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Target Engineering Role
                </label>
                <select
                  value={roleKey}
                  onChange={(e) => setRoleKey(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {Object.entries(ROLE_RATES).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Experience & Seniority Level
                </label>
                <select
                  value={seniority}
                  onChange={(e) => setSeniority(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {Object.keys(SENIORITY_MULTIPLIERS).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Number of Professionals:{" "}
                  <span className="font-mono font-semibold text-blue-600">
                    {headcount}
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={15}
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                  <span>1 Engineer</span>
                  <span>5 Pod</span>
                  <span>15 Multi-Pod</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Engagement Duration:{" "}
                  <span className="font-mono font-semibold text-blue-600">
                    {durationMonths} Months
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={24}
                  value={durationMonths}
                  onChange={(e) => setDurationMonths(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                  <span>1 Mo</span>
                  <span>6 Mos</span>
                  <span>12 Mos</span>
                  <span>24 Mos</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Preferred Timezone / Talent Hub
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {Object.keys(REGION_MULTIPLIERS).map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Engagement Model
                </label>
                <select
                  value={engagementModel}
                  onChange={(e) => setEngagementModel(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Hire on Demand (Hourly Contract)">
                    Hire on Demand (Hourly Contract)
                  </option>
                  <option value="Dedicated Engineering Team">
                    Dedicated Engineering Team
                  </option>
                  <option value="Employ Globally (Employer of Record)">
                    Employ Globally (Employer of Record / EOR)
                  </option>
                  <option value="Hire Permanently (Direct Placement)">
                    Hire Permanently (Direct Placement)
                  </option>
                </select>
              </div>
            </div>

            {/* Assumptions & Exclusions Disclosure */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Methodology, Assumptions & Commercial Exclusions</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Estimates above reflect indicative planning bands based on a standard 160-hour billing month per professional. Actual commercial proposals depend on specific skill combinations, statutory country social contributions (for EOR), and notice-period/location parameters. No fabricated salary savings are assumed.
              </p>
            </div>
          </div>

          {/* Output Summary */}
          <div className="lg:col-span-5 lg:pl-8 lg:border-l border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-xs font-medium text-slate-500">
                Indicative Commercial Estimate · {engagementModel}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500">Indicative Hourly Rate</div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                    ${estimatedHourlyRate}
                    <span className="text-xs font-normal text-slate-500"> / hr</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500">Monthly per Engineer</div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                    ${monthlyPerPerson.toLocaleString()}
                    <span className="text-xs font-normal text-slate-500"> / mo</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Monthly Squad Investment ({headcount}×)</span>
                  <span className="font-mono tabular-nums text-white font-semibold">
                    ${totalMonthlyEstimate.toLocaleString()} / mo
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                  <span className="text-xs text-slate-300">
                    Total {durationMonths}-Month Budget Estimate
                  </span>
                  <span className="text-2xl font-bold font-mono tabular-nums text-blue-400">
                    ${totalEngagementEstimate.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenRequirementModal({
                  inquiryType: "Validated Rate Card & Cost Proposal Request",
                  roleOrTech: `${headcount}x ${baseRole.label} (${seniority})`,
                  teamSize: `${headcount} Professionals`,
                  engagementModel,
                  requirements: `Duration: ${durationMonths} Months | Hub: ${region} | Indicative Estimate: $${estimatedHourlyRate}/hr ($${totalMonthlyEstimate.toLocaleString()}/mo)`,
                })
              }
              className="w-full py-3 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Request Validated Commercial Rate Card</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Project Input */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Describe Your Product or Engineering Initiative
              </label>
              <textarea
                rows={4}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Describe your product architecture, target users, and technical goals..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Organization Stage
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
                >
                  <option>Seed / Startup</option>
                  <option>Series A / Scale-up</option>
                  <option>Growth Technology Company</option>
                  <option>Enterprise Organization</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Target Delivery Horizon
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
                >
                  <option>3 Months (MVP / Sprint Acceleration)</option>
                  <option>6 Months to Production</option>
                  <option>12+ Months Ongoing Roadmap</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerateRecommendation}
              disabled={recLoading || !projectDescription.trim()}
              className="w-full py-3 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>
                {recLoading
                  ? "Architecting Recommended Team Topology..."
                  : "Generate AI Skill & Role Recommendation"}
              </span>
            </button>

            {recError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                {recError}
              </div>
            )}
          </div>

          {/* Right: Recommended Topology */}
          <div className="lg:col-span-7 lg:pl-8 lg:border-l border-slate-200 space-y-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <div className="text-xs text-blue-600 font-medium">
                  Recommended Squad Topology · {recommendation.recommendedEngagementModel}
                </div>
                <h4 className="text-base font-semibold text-slate-900 mt-0.5">
                  {recommendation.architectureName}
                </h4>
              </div>
              <div className="text-xs font-mono text-slate-600">
                {recommendation.totalHeadcount} Engineers · ~{recommendation.estimatedOnboardingDays}d Onboarding
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendation.roles.map((r, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900">
                      {r.roleTitle}
                    </span>
                    <span className="text-xs font-mono font-semibold text-blue-600">
                      ×{r.count}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {r.seniority} · {r.coreSkills.join(" · ")}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {r.keyResponsibility}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2.5">
              <div className="text-xs font-semibold text-slate-800">
                Recommended Execution Milestones
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {recommendation.deliveryPhases.map((phase, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-200 bg-white"
                  >
                    <div className="text-[11px] font-mono text-blue-600">
                      {phase.duration}
                    </div>
                    <div className="text-xs font-semibold text-slate-900 mt-0.5">
                      {phase.phaseName}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {phase.deliverable}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
