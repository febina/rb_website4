import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, SlidersHorizontal, FileText, Users } from "lucide-react";
import { SAMPLE_TALENT_PROFILES, PageId, SampleTalentProfile } from "../data/platformData";

interface LensAnalysisResult {
  briefTitle: string;
  summary: string;
  extractedRoles: {
    title: string;
    seniority: string;
    headcount: number;
    category: string;
  }[];
  extractedSkills: {
    name: string;
    domain: string;
    importance: string;
  }[];
  engagementDuration: string;
  locationPreference: string;
  recommendedSolution: string;
  solutionRationale: string;
  screeningCriteria: string[];
  matchedSampleIds: string[];
}

const PRESET_PROMPTS = [
  {
    label: "Python + AWS ML (6 Months)",
    text: "We need three senior Python developers with AWS and machine learning experience for a six-month project.",
  },
  {
    label: "Cloud & EKS Pod",
    text: "We need two Principal DevOps & Kubernetes engineers with Terraform and Go to modernize our multi-region AWS infrastructure over 4 months.",
  },
  {
    label: "RLHF Clinical Evaluators",
    text: "We are looking for a cohort of medical domain experts and senior Python engineers for RLHF rubric evaluation and clinical LLM red-teaming.",
  },
  {
    label: "Full-Stack + Global EOR",
    text: "We want to hire two Senior Full-Stack TypeScript & React architects full-time in Europe using Employer of Record without opening a local entity.",
  },
];

const INITIAL_DEMO_RESULT: LensAnalysisResult = {
  briefTitle: "Senior Python, AWS & Machine Learning Engineering Squad (6-Month Contract)",
  summary:
    "Requirement parsed for 3 Senior Python Engineers combining cloud-native AWS infrastructure with production machine learning pipelines over a 6-month flexible engagement.",
  extractedRoles: [
    {
      title: "Senior Python & Distributed Systems Engineer",
      seniority: "Senior (6–8+ yrs)",
      headcount: 2,
      category: "Backend & Data Systems",
    },
    {
      title: "Staff AI / Machine Learning Infrastructure Engineer",
      seniority: "Senior / Staff (8+ yrs)",
      headcount: 1,
      category: "AI & Machine Learning",
    },
  ],
  extractedSkills: [
    { name: "Python (Async / FastAPI)", domain: "Core Language", importance: "Mandatory" },
    { name: "AWS (SageMaker, EKS, Lambda)", domain: "Cloud Infrastructure", importance: "Mandatory" },
    { name: "Machine Learning / MLOps", domain: "AI Engineering", importance: "Mandatory" },
    { name: "Docker & Kubernetes", domain: "Deployment", importance: "High" },
    { name: "PostgreSQL & Data Pipelines", domain: "Data Layer", importance: "High" },
  ],
  engagementDuration: "6 Months · Extendable Hourly Contract",
  locationPreference: "Global Remote · 4+ Hours Overlap with Client Timezone",
  recommendedSolution: "Hire on Demand",
  solutionRationale:
    "A 6-month project requiring 3 specialized Python/AWS/ML engineers aligns directly with RapidBrains Hire on Demand (hourly contract staffing), providing immediate sprint velocity without permanent overhead.",
  screeningCriteria: [
    "Production Python concurrency, memory profiling, and distributed service architecture",
    "AWS cloud infrastructure design, IAM security boundaries, and model deployment pipelines",
    "Practical MLOps lifecycle: feature engineering, model evaluation, and drift monitoring",
    "Asynchronous remote engineering communication and Git workflow rigor",
  ],
  matchedSampleIds: ["RB-SMP-101", "RB-SMP-102", "RB-SMP-105"],
};

interface LensAIWorkbenchProps {
  onNavigate: (page: PageId) => void;
  onOpenRequirementModal: (prefill: {
    inquiryType: string;
    roleOrTech: string;
    teamSize: string;
    engagementModel: string;
    requirements: string;
  }) => void;
  variant?: "dark" | "light";
}

export const LensAIWorkbench: React.FC<LensAIWorkbenchProps> = ({
  onNavigate,
  onOpenRequirementModal,
  variant = "dark",
}) => {
  const [prompt, setPrompt] = useState(PRESET_PROMPTS[0].text);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LensAnalysisResult>(INITIAL_DEMO_RESULT);

  const handleAnalyze = async (inputPrompt?: string) => {
    const query = (inputPrompt ?? prompt).trim();
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/lens-ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze hiring requirement.");
      }
      setResult(data);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to reach Lens AI server endpoint."
      );
    } finally {
      setLoading(false);
    }
  };

  const matchedProfiles: SampleTalentProfile[] = result.matchedSampleIds
    .map((id) => SAMPLE_TALENT_PROFILES.find((p) => p.id === id))
    .filter((p): p is SampleTalentProfile => Boolean(p));

  const displayProfiles =
    matchedProfiles.length > 0 ? matchedProfiles : SAMPLE_TALENT_PROFILES.slice(0, 3);

  const mapSolutionToPage = (sol: string): PageId => {
    const lower = sol.toLowerCase();
    if (lower.includes("dedicated")) return "solution-dedicated-teams";
    if (lower.includes("permanent")) return "solution-hire-permanently";
    if (lower.includes("employ") || lower.includes("eor") || lower.includes("global"))
      return "solution-employ-globally";
    if (lower.includes("domain") || lower.includes("rlhf")) return "solution-domain-experts-ai";
    return "solution-hire-on-demand";
  };

  const isDark = variant === "dark";

  return (
    <div
      className={`rounded-xl border transition-colors ${
        isDark
          ? "bg-slate-900 border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-900 shadow-sm"
      }`}
    >
      {/* Top Workbench Header */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b ${
          isDark ? "border-slate-800 bg-slate-950/60" : "border-slate-200 bg-slate-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <Sparkles className={`w-4 h-4 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
          <span className="text-sm font-semibold tracking-tight">
            RapidBrains Lens AI — Natural-Language Talent Discovery Workbench
          </span>
        </div>
        <div
          className={`text-xs font-mono ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Interactive Demonstration · Sample Talent Pool Connected
        </div>
      </div>

      {/* Main Content Split */}
      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Natural-Language Input & Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="lens-ai-input"
                className={`block text-xs font-medium mb-2 ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Describe your hiring requirement in plain language
              </label>
              <textarea
                id="lens-ai-input"
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., We need three senior Python developers with AWS and machine learning experience for a six-month project."
                className={`w-full rounded-lg border p-3.5 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  isDark
                    ? "bg-slate-950 border-slate-800 text-white placeholder-slate-500"
                    : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>

            {/* Preset Requirement Buttons */}
            <div className="space-y-2">
              <div
                className={`text-xs ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Try sample engineering briefs:
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESET_PROMPTS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setPrompt(preset.text);
                      handleAnalyze(preset.text);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                      prompt === preset.text
                        ? isDark
                          ? "bg-blue-600/20 border-blue-500 text-blue-300"
                          : "bg-blue-50 border-blue-600 text-blue-700"
                        : isDark
                        ? "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleAnalyze()}
              disabled={loading || !prompt.trim()}
              className="w-full py-3 px-5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>
                {loading
                  ? "Parsing Skills, Roles & Screening Criteria..."
                  : "Parse Requirement & Match Talent with Lens AI"}
              </span>
            </button>

            {error && (
              <div
                role="alert"
                className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                  isDark
                    ? "bg-red-950/50 border-red-800 text-red-200"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                {error}
              </div>
            )}
          </div>

          {/* Screening Rubric Box */}
          <div
            className={`pt-6 border-t space-y-3 ${
              isDark ? "border-slate-800" : "border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-semibold ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Generated Technical Screening Rubric
              </span>
              <span
                className={`text-xs font-mono ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {result.screeningCriteria.length} Evaluation Gates
              </span>
            </div>
            <ul className="space-y-2">
              {result.screeningCriteria.map((criterion, idx) => (
                <li
                  key={idx}
                  className={`text-xs flex items-start gap-2.5 leading-relaxed ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Structured Hiring Brief & Matched Sample Profiles */}
        <div
          className={`lg:col-span-7 lg:pl-8 lg:border-l space-y-6 ${
            isDark ? "border-slate-800" : "border-slate-200"
          }`}
        >
          {/* Structured Brief Header */}
          <div className="space-y-2">
            <div
              className={`flex flex-wrap items-center gap-2 text-xs ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Structured Hiring Brief</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{result.engagementDuration}</span>
              <span aria-hidden="true">·</span>
              <span>{result.locationPreference}</span>
            </div>
            <h3 className="text-lg font-semibold tracking-tight">
              {result.briefTitle}
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {result.summary}
            </p>
          </div>

          {/* Extracted Roles & Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Roles */}
            <div className="space-y-3">
              <div
                className={`text-xs font-semibold ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Extracted Role Requirements
              </div>
              <div className="space-y-2.5">
                {result.extractedRoles.map((role, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border ${
                      isDark
                        ? "bg-slate-950/70 border-slate-800"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold">{role.title}</span>
                      <span className="text-xs font-mono tabular-nums text-blue-500 font-semibold">
                        ×{role.headcount}
                      </span>
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {role.seniority} · {role.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Engagement Recommendation */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div
                  className={`text-xs font-semibold ${
                    isDark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Extracted Technical Stack
                </div>
                <div
                  className={`text-xs leading-relaxed ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {result.extractedSkills.map((sk, idx) => (
                    <React.Fragment key={sk.name}>
                      <span className="font-medium">
                        {sk.name}{" "}
                        <span
                          className={
                            isDark ? "text-slate-400" : "text-slate-500"
                          }
                        >
                          ({sk.importance})
                        </span>
                      </span>
                      {idx < result.extractedSkills.length - 1 && (
                        <span className="mx-2 text-slate-500" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div
                className={`p-3.5 rounded-lg border ${
                  isDark
                    ? "bg-blue-950/30 border-blue-900/60"
                    : "bg-blue-50/70 border-blue-200"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold">
                    Recommended Solution: {result.recommendedSolution}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate(mapSolutionToPage(result.recommendedSolution))
                    }
                    className={`text-xs font-medium underline cursor-pointer whitespace-nowrap shrink-0 ${
                      isDark
                        ? "text-blue-300 hover:text-white"
                        : "text-blue-700 hover:text-blue-900"
                    }`}
                  >
                    Explore Solution
                  </button>
                </div>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {result.solutionRationale}
                </p>
              </div>
            </div>
          </div>

          {/* Matched Sample Talent Profiles */}
          <div
            className={`pt-5 border-t space-y-3 ${
              isDark ? "border-slate-800" : "border-slate-200"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-semibold">
                  Matched Sample Profiles (Demonstration Data — Non-Fabricated Availability)
                </span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("discover")}
                className={`text-xs font-medium flex items-center gap-1 cursor-pointer ${
                  isDark
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                <span>Browse All Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {displayProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className={`p-3.5 rounded-lg border flex flex-col justify-between ${
                    isDark
                      ? "bg-slate-950/80 border-slate-800"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div
                      className={`text-[11px] font-mono ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {profile.code} · {profile.yearsExperience} yrs
                    </div>
                    <div className="text-xs font-semibold leading-snug">
                      {profile.roleTitle}
                    </div>
                    <div
                      className={`text-xs leading-relaxed ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {profile.primarySkills.slice(0, 4).join(" · ")}
                    </div>
                  </div>
                  <div
                    className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] font-mono ${
                      isDark
                        ? "border-slate-800 text-slate-300"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <span>{profile.timezone.split("/")[0].trim()}</span>
                    <span>{profile.hourlyIndicativeRange}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <p
                className={`text-xs ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Ready to convert this structured brief into a verified shortlist?
              </p>
              <button
                type="button"
                onClick={() =>
                  onOpenRequirementModal({
                    inquiryType: `Lens AI Brief: ${result.briefTitle}`,
                    roleOrTech: result.extractedRoles
                      .map((r) => `${r.headcount}x ${r.title}`)
                      .join(", "),
                    teamSize: `${result.extractedRoles.reduce(
                      (acc, r) => acc + r.headcount,
                      0
                    )} Professionals`,
                    engagementModel: result.recommendedSolution,
                    requirements: `Original Prompt: ${prompt}\nDuration: ${result.engagementDuration}\nSkills: ${result.extractedSkills
                      .map((s) => s.name)
                      .join(", ")}`,
                  })
                }
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Submit This Hiring Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
