import React, { useState } from "react";
import {
  ArrowRight,
  Globe,
  Cpu,
  ShieldCheck,
  Layers,
  Workflow,
  CheckCircle2,
  Code2,
  Sparkles,
  FileSearch,
  Building2,
} from "lucide-react";
import {
  PageId,
  SAMPLE_TALENT_PROFILES,
  INSIGHTS_ARTICLES,
} from "../data/platformData";
import { LensAIWorkbench } from "../components/LensAIWorkbench";
import { CostAndTeamTools } from "../components/CostAndTeamTools";
import { RequirementPrefill } from "../components/RequirementModal";

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenRequirementModal: (prefill: RequirementPrefill) => void;
}

const EXPLORE_CATEGORIES = [
  "Developers",
  "AI & Machine Learning",
  "Cloud & DevOps",
  "Data Engineering",
  "Software Architecture",
  "Quality Engineering",
] as const;

const HOW_IT_WORKS_STAGES = [
  {
    stage: "01",
    title: "Define Your Requirements",
    subtitle: "Natural-Language Brief or Technical Consultation",
    description:
      "Describe your required technical stack, role seniority, timezone overlap, and engagement duration using Lens AI or directly with our solutions architects.",
    deliverable: "Structured Hiring Brief & Competency Matrix",
    metrics: "Parsed across 50+ engineering domains",
  },
  {
    stage: "02",
    title: "Discover the Right Talent",
    subtitle: "AI Matching + Practitioner Technical Screening",
    description:
      "Lens AI maps your architectural requirements against pre-evaluated professionals. Every shortlisted candidate has completed domain-specific code and system design evaluations.",
    deliverable: "Curated Shortlist in Rapid Hire with Assessment Dossiers",
    metrics: "48–72 hour typical shortlist turnaround",
  },
  {
    stage: "03",
    title: "Evaluate and Select",
    subtitle: "Streamlined Technical Interviews & Workflow Alignment",
    description:
      "Coordinate interviews effortlessly through Rapid Hire. Review practical coding transcripts, architectural trade-off evaluations, and communication readiness before selecting.",
    deliverable: "Verified Candidate Selection & Rate/Salary Confirmation",
    metrics: "Zero unvetted resume screening required",
  },
  {
    stage: "04",
    title: "Hire and Manage",
    subtitle: "Contract Staffing, Dedicated Pods, Permanent, or Global EOR",
    description:
      "Onboard talent rapidly under your preferred commercial model. RapidBrains manages contracts, IP assignment, local EOR statutory compliance, timesheets, and multi-currency global payroll.",
    deliverable: "Single Consolidated Invoice & Continuous Workforce Governance",
    metrics: "100% IP transfer & statutory compliance",
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenRequirementModal,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof EXPLORE_CATEGORIES)[number]>("Developers");
  const [activeHeroNode, setActiveHeroNode] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(0);

  const filteredTalent = SAMPLE_TALENT_PROFILES.filter(
    (p) => p.category === selectedCategory
  );
  const displayTalent =
    filteredTalent.length > 0 ? filteredTalent : SAMPLE_TALENT_PROFILES.slice(0, 2);

  const heroNodes = [
    {
      role: "Senior Python & Distributed Systems Engineer",
      mode: "Hire on Demand · Hourly Contract",
      skills: "Python · FastAPI · AWS · Kafka · PostgreSQL",
      code: "Sample Profile · RB-SMP-101",
      overlap: "UTC+1 / US & EU Overlap",
      matchNote: "Matched via Lens AI for 6-month cloud & ML pipeline velocity",
    },
    {
      role: "Staff AI / LLM & RAG Systems Architect",
      mode: "Hire on Demand · Dedicated Pod",
      skills: "PyTorch · RAG · Vector DBs · vLLM · AWS Bedrock",
      code: "Sample Profile · RB-SMP-102",
      overlap: "UTC+0 / Global Overlap",
      matchNote: "Verified on enterprise retrieval precision & evaluation rubrics",
    },
    {
      role: "Principal Cloud & Kubernetes Platform Lead",
      mode: "Employ Globally · EOR Compliant",
      skills: "AWS · Terraform · EKS · Go · GitOps",
      code: "Sample Profile · RB-SMP-103",
      overlap: "UTC+2 / EU & US East Overlap",
      matchNote: "Full-time international employment managed without local entity",
    },
  ];

  return (
    <div className="bg-white">
      {/* SECTION 1 — HERO (Spacious White Canvas with Interactive Talent Intelligence Visual) */}
      <section className="relative bg-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
            {/* Left Column: Brand Proposition & CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="text-xs font-medium text-blue-700 tracking-tight">
                Global Technology Talent Ecosystem · Discover Talent. Hire Smarter. Scale Globally.
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-slate-900 leading-[1.08]"
                style={{ textWrap: "balance" }}
              >
                The Global Talent Platform Built for What&apos;s Next.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Discover, hire and manage exceptional technology talent from anywhere in the world. From flexible contract developers to global employment and AI-powered talent intelligence, RapidBrains brings every talent solution together.
              </p>

              {/* Primary, Secondary & Additional CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate("discover")}
                  className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Find Your Talent</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate("solution-hire-on-demand")}
                  className="px-5 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Explore Our Solutions
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onOpenRequirementModal({
                      sourcePage: "Homepage Hero",
                      inquiryType: "Executive Talent Consultation",
                    })
                  }
                  className="px-4 py-3.5 rounded-lg border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Talk to Our Team
                </button>
              </div>

              {/* Clean Unboxed Metadata Row */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                <span className="font-medium text-slate-800">Core Capabilities:</span>
                <span>Hourly Contract Developers</span>
                <span aria-hidden="true">·</span>
                <span>Dedicated Engineering Pods</span>
                <span aria-hidden="true">·</span>
                <span>Employer of Record (EOR)</span>
                <span aria-hidden="true">·</span>
                <span>Lens AI Matching</span>
              </div>
            </div>

            {/* Right Column: Live-Feeling Animated Talent Ecosystem Visual */}
            <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-6 lg:p-7">
              {/* Top Ecosystem Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    RapidBrains Connected Talent Graph
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Interactive Discovery · Sample Demonstration Profiles
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-lg">
                  {["Python / AI", "LLM / RAG", "Cloud / EOR"].map((tab, i) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveHeroNode(i)}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        activeHeroNode === i
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Network SVG + Dynamic Skill Topology */}
              <div className="my-5 relative bg-white rounded-lg border border-slate-200 p-5">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-mono text-[11px] text-blue-600">
                    Lens AI Requirement Signal
                  </span>
                  <span className="font-mono text-[11px]">
                    4-Stage Technical Vetting Verified
                  </span>
                </div>

                {/* SVG Skill Graph Visualization */}
                <svg
                  viewBox="0 0 520 120"
                  className="w-full h-28 overflow-visible"
                  role="img"
                  aria-label="Interactive Talent Skill Graph connecting hiring requirements to verified engineering capabilities"
                >
                  {/* Connection Paths */}
                  <path
                    d="M 80 60 C 160 20, 200 25, 260 30"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M 80 60 C 160 60, 200 60, 260 60"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M 80 60 C 160 100, 200 95, 260 90"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M 260 30 C 330 30, 370 50, 440 60"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 260 60 C 330 60, 370 60, 440 60"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M 260 90 C 330 90, 370 70, 440 60"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                  />

                  {/* Left Node: Business Brief */}
                  <g transform="translate(10, 38)">
                    <rect
                      width="115"
                      height="44"
                      rx="6"
                      fill="#0f172a"
                    />
                    <text
                      x="57"
                      y="20"
                      textAnchor="middle"
                      fill="#93c5fd"
                      fontSize="9"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      CLIENT BRIEF
                    </text>
                    <text
                      x="57"
                      y="34"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="600"
                    >
                      Role + Tech Stack
                    </text>
                  </g>

                  {/* Center Nodes: Lens AI Capabilities */}
                  <g transform="translate(200, 12)">
                    <rect
                      width="125"
                      height="28"
                      rx="5"
                      fill="#f8fafc"
                      stroke="#cbd5e1"
                    />
                    <text
                      x="62"
                      y="18"
                      textAnchor="middle"
                      fill="#334155"
                      fontSize="10"
                      fontWeight="500"
                    >
                      Skill Graph Extraction
                    </text>
                  </g>

                  <g transform="translate(200, 46)">
                    <rect
                      width="125"
                      height="28"
                      rx="5"
                      fill="#eff6ff"
                      stroke="#2563eb"
                      strokeWidth="1.5"
                    />
                    <text
                      x="62"
                      y="18"
                      textAnchor="middle"
                      fill="#1d4ed8"
                      fontSize="10"
                      fontWeight="600"
                    >
                      Lens AI Match Engine
                    </text>
                  </g>

                  <g transform="translate(200, 80)">
                    <rect
                      width="125"
                      height="28"
                      rx="5"
                      fill="#f8fafc"
                      stroke="#cbd5e1"
                    />
                    <text
                      x="62"
                      y="18"
                      textAnchor="middle"
                      fill="#334155"
                      fontSize="10"
                      fontWeight="500"
                    >
                      EOR & Billing Ready
                    </text>
                  </g>

                  {/* Right Node: Matched Talent */}
                  <g transform="translate(385, 38)">
                    <rect
                      width="125"
                      height="44"
                      rx="6"
                      fill="#2563eb"
                    />
                    <text
                      x="62"
                      y="20"
                      textAnchor="middle"
                      fill="#dbeafe"
                      fontSize="9"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      VERIFIED MATCH
                    </text>
                    <text
                      x="62"
                      y="34"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="600"
                    >
                      Ready to Onboard
                    </text>
                  </g>
                </svg>

                {/* Active Sample Profile Preview Card */}
                <div className="mt-3 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-slate-500">
                      {heroNodes[activeHeroNode].code} ·{" "}
                      {heroNodes[activeHeroNode].overlap}
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {heroNodes[activeHeroNode].role}
                    </div>
                    <div className="text-xs text-slate-600">
                      {heroNodes[activeHeroNode].skills}
                    </div>
                    <div className="text-[11px] text-blue-700 font-medium pt-0.5">
                      {heroNodes[activeHeroNode].matchNote}
                    </div>
                  </div>
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => onNavigate("product-lens-ai")}
                      className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Test in Lens AI
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Ecosystem Navigation Links */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <button
                  type="button"
                  onClick={() => onNavigate("solution-hire-on-demand")}
                  className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-600 transition-colors text-left cursor-pointer"
                >
                  <div className="text-[11px] font-mono text-slate-500">01 · Primary</div>
                  <div className="text-xs font-semibold text-slate-900 mt-0.5">
                    Hire on Demand
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("solution-employ-globally")}
                  className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-600 transition-colors text-left cursor-pointer"
                >
                  <div className="text-[11px] font-mono text-slate-500">02 · Global EOR</div>
                  <div className="text-xs font-semibold text-slate-900 mt-0.5">
                    Employ Globally
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("product-rapid-hire")}
                  className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-600 transition-colors text-left cursor-pointer"
                >
                  <div className="text-[11px] font-mono text-slate-500">03 · Platform</div>
                  <div className="text-xs font-semibold text-slate-900 mt-0.5">
                    Rapid Hire ATS
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — TALENT PLATFORM OVERVIEW (Bento-Grid Architecture on Soft Neutral Canvas) */}
      <section className="bg-slate-50 py-20 lg:py-28 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-medium text-blue-700">
              Connected Global Talent Ecosystem
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: "balance" }}
            >
              Everything You Need to Build and Manage Your Workforce.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              RapidBrains replaces fragmented recruitment agencies, disconnected freelance boards, and standalone payroll vendors with one unified platform spanning discovery through global employment.
            </p>
          </div>

          {/* Asymmetric Bento Grid covering all 7 interconnected pillars */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Pillar 1 & 2 (Col Span 7) */}
            <div className="md:col-span-7 bg-white rounded-xl border border-slate-200 p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-blue-600">
                  01 · Discover Talent &amp; 02 · Hire Talent
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Contract Technology Staffing, Dedicated Pods &amp; Permanent Hiring
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Engage pre-vetted software engineers on flexible hourly contracts (our primary business model), assemble cross-functional dedicated engineering teams, or recruit full-time technical leaders.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Hourly Contract · Dedicated Teams · Permanent Recruitment · RPO
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate("solution-hire-on-demand")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Hiring Models</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pillar 3 & 5 (Col Span 5) */}
            <div className="md:col-span-5 bg-white rounded-xl border border-slate-200 p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-blue-600">
                  03 · Employ Globally &amp; 04 · Pay Talent
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Employer of Record (EOR) &amp; Multi-Currency Global Payroll
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Employ international talent without establishing a local legal entity. We handle compliant local employment contracts, statutory benefits, tax filings, and consolidated monthly payroll.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Subject to country labor regulations
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate("solution-employ-globally")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore EOR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pillar 6 (Col Span 4) */}
            <div className="md:col-span-4 bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-mono text-blue-600">
                  05 · Assess Skills
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Candidate Screening &amp; Technical Evaluation
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Multi-gate technical evaluation covering live architecture reviews, code quality, and asynchronous communication rigor.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("process")}
                className="text-xs font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>See Vetting Process</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pillar 7 (Col Span 4) */}
            <div className="md:col-span-4 bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-mono text-blue-600">
                  06 · Automate Recruitment
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Lens AI &amp; Rapid Hire Workflow Engine
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transform natural-language requirements into structured hiring briefs and manage candidate pipelines in one workspace.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("product-lens-ai")}
                className="text-xs font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>Experience Lens AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pillar 4 (Col Span 4) */}
            <div className="md:col-span-4 bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-mono text-blue-600">
                  07 · Manage Workforce
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Lifecycle Onboarding &amp; Timesheet Governance
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unified onboarding, IP assignment governance, contract renewals, and ongoing retention management for global teams.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("process")}
                className="text-xs font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>Explore Workforce Lifecycle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — EXPLORE TALENT (Generous White Canvas with Interactive Category Explorer) */}
      <section className="bg-white py-20 lg:py-28 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-medium text-blue-700">
                Interactive Talent Discovery
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
                style={{ textWrap: "balance" }}
              >
                Find the Expertise Your Business Needs.
              </h2>
              <p className="text-base text-slate-600">
                Explore technology domains and role specializations. Sample profiles below demonstrate how RapidBrains structures technical competencies and engagement options.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("discover")}
              className="px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <span>Explore Talent</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Category Filter Bar */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl overflow-x-auto">
            {EXPLORE_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === category
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sample Profiles Grid for Selected Category */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayTalent.map((talent) => (
              <div
                key={talent.id}
                className="rounded-xl border border-slate-200 bg-white p-6 flex flex-col justify-between space-y-5 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-mono">
                    <span>{talent.code}</span>
                    <span>
                      {talent.seniority} · {talent.yearsExperience} Years Exp ·{" "}
                      {talent.hourlyIndicativeRange}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {talent.roleTitle}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {talent.architectureHighlight}
                  </p>

                  <div className="pt-1 text-xs text-slate-700">
                    <span className="font-semibold text-slate-900">Primary Stack: </span>
                    {talent.primarySkills.join(" · ")}
                  </div>

                  <div className="text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Vetting Note: </span>
                    {talent.vettingSummary}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    {talent.engagementOptions.join(" / ")}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenRequirementModal({
                        sourcePage: "Homepage Talent Explorer",
                        inquiryType: `Request Similar Profile (${talent.roleTitle})`,
                        roleOrTech: `${talent.roleTitle} (${talent.primarySkills.join(", ")})`,
                        engagementModel: "Hire on Demand (Hourly Contract)",
                      })
                    }
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Request Similar Talent</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — SOLUTIONS (Spacious Differentiated Cards Prioritizing Hire on Demand) */}
      <section className="bg-slate-50 py-20 lg:py-28 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-medium text-blue-700">
              Modular Talent Acquisition &amp; Global Employment Solutions
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: "balance" }}
            >
              Engagement Models Built Around How Modern Teams Scale.
            </h2>
            <p className="text-base text-slate-600">
              Whether you need flexible hourly contract developers for an upcoming release, a dedicated multi-disciplinary pod, permanent full-time specialists, or compliant global employment via EOR.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 1. Primary Offering: Hire on Demand (Full-Width Featured Card) */}
            <div className="lg:col-span-12 rounded-xl border-2 border-blue-600 bg-white p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="text-xs font-mono font-semibold text-blue-600">
                  01. PRIMARY SOLUTION · CONTRACT TECHNOLOGY STAFFING
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Hire on Demand — Flexible Hourly Contract Developers
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                  Discover and engage pre-vetted remote software engineers, AI specialists, cloud architects, and data engineers on transparent hourly billing arrangements. Scale up for critical sprints or engage long-term without fixed overhead.
                </p>
                <div className="text-xs text-slate-500 pt-1">
                  Hourly Developer Engagement · Flexible Contract Duration · Remote Technology Professionals · Scalable Engineering Resources
                </div>
              </div>
              <div className="lg:col-span-4 lg:border-l border-slate-200 lg:pl-8 flex flex-col justify-center space-y-3">
                <div className="text-xs text-slate-500">
                  Typical shortlist delivery in <span className="font-mono font-semibold text-slate-900">48–72 hours</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate("solution-hire-on-demand")}
                  className="w-full py-3.5 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Find Developers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Dedicated Teams */}
            <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-500">
                  02. DEDICATED ENGINEERING PODS
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Dedicated Teams
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Build and scale dedicated cross-functional engineering squads configured exclusively for your long-term product roadmap and technical architecture.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Full-Lifecycle Squads · Long-Term Retention
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate("solution-dedicated-teams")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Build Your Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3. Hire Permanently */}
            <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-500">
                  03. FULL-TIME RECRUITMENT
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Hire Permanently
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Recruit full-time technology professionals, specialist engineers, and technical leaders through AI-assisted sourcing and practitioner-led technical vetting.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Specialist &amp; Executive Tech Search
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate("solution-hire-permanently")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Hire Permanently</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4. Employ Globally (EOR) */}
            <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-500">
                  04. EMPLOYER OF RECORD &amp; GLOBAL PAYROLL
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Employ Globally
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Employ international talent compliantly without establishing a local legal entity. We manage local contracts, statutory benefits, tax withholdings, and global payroll.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  EOR · Global Payroll · Contractor Management
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate("solution-employ-globally")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Hire Globally</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 5. Domain Experts for AI */}
            <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-500">
                  05. RLHF, RED-TEAMING &amp; MODEL EVALUATION
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Domain Experts for AI
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Access credentialed doctors, lawyers, PhDs, and senior software architects for Reinforcement Learning from Human Feedback (RLHF), AI model evaluation, red-teaming, and expert annotation.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  RLHF · Model Evaluation · Expert Annotation
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate("solution-domain-experts-ai")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Engage Domain Experts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — RAPIDBRAINS LENS AI (Balanced High-Contrast Deep Navy Feature Section) */}
      <section className="bg-slate-950 text-white py-20 lg:py-28 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-mono text-blue-400">
                SIGNATURE PRODUCT · TALENT INTELLIGENCE ENGINE
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
                style={{ textWrap: "balance" }}
              >
                Meet the Intelligence Behind Better Hiring.
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                RapidBrains Lens AI translates natural-language hiring requirements into structured competency briefs, extracts mandatory skill graphs, recommends optimal engagement models, and matches sample talent profiles in real time.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("product-lens-ai")}
              className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <span>Explore Lens AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <LensAIWorkbench
            onNavigate={onNavigate}
            onOpenRequirementModal={(prefill) =>
              onOpenRequirementModal({
                ...prefill,
                sourcePage: "Homepage Lens AI Workbench",
              })
            }
            variant="dark"
          />
        </div>
      </section>

      {/* SECTION 6 — RAPID HIRE (White Background Section with Interactive Pipeline Preview) */}
      <section className="bg-white py-20 lg:py-28 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="text-xs font-mono text-blue-600">
                RECRUITMENT &amp; WORKFLOW PLATFORM
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
                style={{ textWrap: "balance" }}
              >
                Organize Candidate Pipelines and Hiring Workflows with Rapid Hire.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Rapid Hire brings engineering managers, talent acquisition teams, and technical evaluators into one collaborative hiring workspace—from initial shortlist review through technical interview scorecards and onboarding.
              </p>

              <ul className="space-y-2.5 pt-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                  <span>Unified recruitment pipeline and candidate tracking across contract and permanent roles</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                  <span>Structured technical scorecard comparison and interview coordination</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                  <span>Direct transition from approved offer to EOR or contract onboarding</span>
                </li>
              </ul>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => onNavigate("product-rapid-hire")}
                  className="px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Discover Rapid Hire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Rapid Hire Pipeline Preview UI */}
            <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    Rapid Hire — Active Engineering Requisition Workspace
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Requisition #RB-409 · Senior Distributed Systems &amp; AI Pod
                  </div>
                </div>
                <span className="text-xs font-mono text-blue-600">
                  Pipeline View · Demonstration
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Column 1 */}
                <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 pb-2 border-b border-slate-100">
                    <span>Lens AI Vetted</span>
                    <span className="font-mono text-slate-500">3</span>
                  </div>
                  <div className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[11px] font-mono text-slate-500">RB-SMP-101</div>
                    <div className="text-xs font-semibold text-slate-900">
                      Sr. Python &amp; AWS Engineer
                    </div>
                    <div className="text-[11px] text-slate-600">
                      System Design: Verified · 8 yrs
                    </div>
                  </div>
                  <div className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[11px] font-mono text-slate-500">RB-SMP-105</div>
                    <div className="text-xs font-semibold text-slate-900">
                      Lead Data &amp; Spark Engineer
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Lakehouse Architecture · 8 yrs
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 pb-2 border-b border-slate-100">
                    <span>Client Tech Interview</span>
                    <span className="font-mono text-slate-500">2</span>
                  </div>
                  <div className="p-3 rounded-md bg-blue-50/60 border border-blue-200 space-y-1">
                    <div className="text-[11px] font-mono text-blue-700">RB-SMP-102</div>
                    <div className="text-xs font-semibold text-slate-900">
                      Staff AI / RAG Architect
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Panel Scheduled · Thursday 14:00 UTC
                    </div>
                  </div>
                  <div className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[11px] font-mono text-slate-500">RB-SMP-103</div>
                    <div className="text-xs font-semibold text-slate-900">
                      Principal Cloud &amp; EKS Lead
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Scorecard Submitted · Strong Hire
                    </div>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 pb-2 border-b border-slate-100">
                    <span>Onboarding &amp; EOR</span>
                    <span className="font-mono text-slate-500">1</span>
                  </div>
                  <div className="p-3 rounded-md bg-emerald-50/60 border border-emerald-200 space-y-1">
                    <div className="text-[11px] font-mono text-emerald-800">RB-SMP-104</div>
                    <div className="text-xs font-semibold text-slate-900">
                      Sr. Full-Stack TS Architect
                    </div>
                    <div className="text-[11px] text-slate-600">
                      MSA &amp; IP Assignment Executed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — WHY RAPIDBRAINS + AI COST CALCULATOR & ROLE RECOMMENDER */}
      <section className="bg-slate-50 py-20 lg:py-28 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="space-y-10">
            <div className="max-w-3xl space-y-3">
              <div className="text-xs font-medium text-blue-700">
                Why Leading Engineering Organizations Choose RapidBrains
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
                style={{ textWrap: "balance" }}
              >
                One Connected Platform. Every Talent Solution.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  num: "01",
                  title: "Multiple Engagement Models",
                  desc: "Switch seamlessly between hourly contract staffing, dedicated teams, permanent hiring, and RPO.",
                },
                {
                  num: "02",
                  title: "Global Talent Access",
                  desc: "Source specialized engineering and domain expertise across key international technology hubs.",
                },
                {
                  num: "03",
                  title: "Flexible Contract Hiring",
                  desc: "Engage developers on hourly arrangements with adaptable durations aligned to your active roadmap.",
                },
                {
                  num: "04",
                  title: "Permanent Recruitment",
                  desc: "Hire full-time engineers and technical leaders with structured, success-aligned commercial terms.",
                },
                {
                  num: "05",
                  title: "AI-Powered Talent Intelligence",
                  desc: "Use Lens AI to parse natural-language requirements into calibrated skill and role matrices.",
                },
                {
                  num: "06",
                  title: "Rigorous Screening & Assessment",
                  desc: "Every candidate completes multi-stage technical, architectural, and communication validation.",
                },
                {
                  num: "07",
                  title: "Global EOR & Payroll Support",
                  desc: "Employ international professionals compliantly without establishing foreign legal subsidiaries.",
                },
                {
                  num: "08",
                  title: "End-to-End Workforce Management",
                  desc: "Consolidated timesheets, IP protection, statutory benefits, and retention governance.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="bg-white rounded-xl border border-slate-200 p-5 space-y-2"
                >
                  <div className="text-xs font-mono text-blue-600">{item.num}</div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive AI Cost Estimator & Team Recommender */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-medium text-blue-700">
                  Interactive Planning Tools
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  Estimate Engagement Budgets &amp; Architect Your Team
                </h3>
              </div>
              <div className="text-xs text-slate-500">
                Transparent assumptions · Powered by RapidBrains Lens AI
              </div>
            </div>

            <CostAndTeamTools
              onOpenRequirementModal={(prefill) =>
                onOpenRequirementModal({
                  ...prefill,
                  sourcePage: "Homepage Cost & Team Planner",
                })
              }
            />
          </div>
        </div>
      </section>

      {/* SECTION 8 — HOW IT WORKS (Interactive 4-Stage Journey on White Canvas) */}
      <section className="bg-white py-20 lg:py-28 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-medium text-blue-700">
                Streamlined Execution Lifecycle
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
                style={{ textWrap: "balance" }}
              >
                How RapidBrains Works — From Requirement to Global Workforce.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("process")}
              className="px-4 py-2.5 rounded-lg border border-slate-300 hover:border-slate-400 text-xs font-medium text-slate-800 flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <span>See Full Vetting &amp; Payroll Process</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Stage Selector Buttons */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
              {HOW_IT_WORKS_STAGES.map((st, idx) => (
                <button
                  key={st.stage}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`w-full text-left p-5 rounded-xl border transition-colors cursor-pointer ${
                    activeStage === idx
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono ${
                        activeStage === idx ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      Stage {st.stage}
                    </span>
                    <span
                      className={`text-[11px] font-mono ${
                        activeStage === idx ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {st.metrics}
                    </span>
                  </div>
                  <div className="text-base font-bold mt-1">{st.title}</div>
                  <div
                    className={`text-xs mt-0.5 ${
                      activeStage === idx ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {st.subtitle}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Stage Detail Card */}
            <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-slate-50 p-8 lg:p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="text-xs font-mono text-blue-600">
                  STAGE {HOW_IT_WORKS_STAGES[activeStage].stage} OF 04 ·{" "}
                  {HOW_IT_WORKS_STAGES[activeStage].metrics.toUpperCase()}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {HOW_IT_WORKS_STAGES[activeStage].title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {HOW_IT_WORKS_STAGES[activeStage].description}
                </p>
              </div>

              <div className="p-5 rounded-lg bg-white border border-slate-200 space-y-2">
                <div className="text-xs font-mono text-slate-500">
                  Primary Stage Deliverable
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  {HOW_IT_WORKS_STAGES[activeStage].deliverable}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  {HOW_IT_WORKS_STAGES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveStage(i)}
                      aria-label={`Select stage ${i + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeStage === i
                          ? "w-8 bg-blue-600"
                          : "w-2 bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onOpenRequirementModal({
                      sourcePage: "Homepage How It Works",
                      inquiryType: "Start Stage 01 — Define Requirements",
                    })
                  }
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Start Your Requirement</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — INDUSTRY & BUSINESS SOLUTIONS */}
      <section className="bg-slate-50 py-20 lg:py-28 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-medium text-blue-700">
                Tailored by Business Stage &amp; Industry Vertical
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
                style={{ textWrap: "balance" }}
              >
                Built for High-Velocity Startups, Scale-Ups, and Global Enterprises.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("businesses")}
              className="px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <span>Find Your Hiring Solution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                sector: "Technology & SaaS",
                focus: "Full-Stack, Cloud-Native, DevOps & Applied AI Pods",
                detail:
                  "Accelerate multi-tenant product roadmaps, SOC2 cloud migrations, and embedded LLM features with senior contract or dedicated engineers.",
              },
              {
                sector: "Healthcare & Life Sciences",
                focus: "Clinical AI Evaluators (MDs), Interoperability & HIPAA-Aware Systems",
                detail:
                  "Combine healthcare software engineers with credentialed clinicians for EHR integration and clinical AI model evaluation.",
              },
              {
                sector: "Biotechnology",
                focus: "Bioinformatics Data Pipelines, Scientific Computing & Python/R",
                detail:
                  "Deploy data engineers, computational biologists, and cloud lakehouse architects for genomic and research workflows.",
              },
              {
                sector: "Automotive & Mobility",
                focus: "Embedded Systems, Connected Fleet Telemetry & Edge AI",
                detail:
                  "Scale specialized C++, Rust, IoT cloud ingestion, and computer vision engineering teams across global hubs.",
              },
            ].map((ind) => (
              <div
                key={ind.sector}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-2.5">
                  <div className="text-xs font-mono text-blue-600">
                    Industry Vertical
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {ind.sector}
                  </h3>
                  <div className="text-xs font-medium text-slate-700">
                    {ind.focus}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ind.detail}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate("businesses")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer pt-3 border-t border-slate-100"
                >
                  <span>Explore {ind.sector}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — TRUST, SCREENING METHODOLOGY & OPERATIONAL GOVERNANCE */}
      <section className="bg-white py-20 lg:py-28 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-medium text-blue-700">
              Verified Quality Assurance &amp; Governance
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: "balance" }}
            >
              Built on Transparent Technical Vetting and Compliant Global Operations.
            </h2>
            <p className="text-base text-slate-600">
              Every engagement is backed by documented multi-stage candidate evaluation, contractual intellectual property protection, and jurisdiction-aligned employment structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <FileSearch className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">
                4-Gate Technical &amp; Domain Screening
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Candidates undergo (1) Lens AI competency &amp; architecture mapping, (2) practical coding or domain rubric evaluation, (3) senior practitioner system-design review, and (4) remote communication &amp; delivery readiness checks.
              </p>
            </div>

            <div className="p-7 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">
                100% IP Assignment &amp; Enterprise NDA Controls
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every contract developer, dedicated squad member, and AI domain evaluator executes binding confidentiality and intellectual property transfer agreements prior to accessing client systems.
              </p>
            </div>

            <div className="p-7 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">
                Multi-Country EOR &amp; Payroll Governance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our Employer of Record and global payroll operations align with applicable local labor laws, statutory tax withholdings, and mandatory employee benefits administration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11 — INSIGHTS (Editorial Preview on Soft Neutral Canvas) */}
      <section className="bg-slate-50 py-20 lg:py-28 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs font-medium text-blue-700">
                Research, Case Studies &amp; Hiring Guides
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Latest Workforce &amp; Engineering Insights
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("insights")}
              className="px-4 py-2.5 rounded-lg border border-slate-300 hover:border-slate-400 text-xs font-medium text-slate-800 flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <span>Explore Insights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INSIGHTS_ARTICLES.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  {/* Unboxed clean metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-blue-700">
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate("insights")}
                  className="text-xs font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-1 cursor-pointer pt-3 border-t border-slate-100"
                >
                  <span>Read Full Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12 — FINAL CTA */}
      <section className="bg-slate-900 text-white py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="text-xs font-mono text-blue-400">
            DISCOVER TALENT · HIRE SMARTER · SCALE GLOBALLY
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight"
            style={{ textWrap: "balance" }}
          >
            Your Next Great Hire Starts Here.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Tell us what your business needs. We&apos;ll help you find the right talent solution—from flexible contract developers to dedicated squads and compliant global employment.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate("discover")}
              className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Find Your Talent</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                onOpenRequirementModal({
                  sourcePage: "Homepage Final CTA",
                  inquiryType: "Custom Talent Solution Consultation",
                })
              }
              className="px-6 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Talk to Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
