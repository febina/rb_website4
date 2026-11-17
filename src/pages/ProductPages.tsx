import React, { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Workflow,
  CheckCircle2,
  ShieldCheck,
  SlidersHorizontal,
  Calendar,
  FileCheck,
  ChevronRight,
} from "lucide-react";
import { PageId } from "../data/platformData";
import { LensAIWorkbench } from "../components/LensAIWorkbench";
import { CostAndTeamTools } from "../components/CostAndTeamTools";
import { RequirementPrefill } from "../components/RequirementModal";

interface ProductPagesProps {
  productId: "product-lens-ai" | "product-rapid-hire";
  onNavigate: (page: PageId) => void;
  onOpenRequirementModal: (prefill: RequirementPrefill) => void;
}

interface PipelineCandidate {
  id: string;
  name: string;
  role: string;
  stage: "shortlist" | "assessment" | "interview" | "onboarding";
  evaluationNote: string;
  engagementType: string;
}

const INITIAL_PIPELINE: PipelineCandidate[] = [
  {
    id: "RB-SMP-101",
    name: "Sample Candidate #101",
    role: "Senior Python & AWS Distributed Systems",
    stage: "shortlist",
    evaluationNote: "Passed Async Concurrency & Kafka Architecture Review",
    engagementType: "Hire on Demand · Hourly",
  },
  {
    id: "RB-SMP-102",
    name: "Sample Candidate #102",
    role: "Staff AI / RAG Systems Architect",
    stage: "assessment",
    evaluationNote: "Completed Retrieval Precision & Latency Benchmark",
    engagementType: "Dedicated Team Pod",
  },
  {
    id: "RB-SMP-103",
    name: "Sample Candidate #103",
    role: "Principal Cloud & EKS Platform Lead",
    stage: "interview",
    evaluationNote: "Client CTO Architecture Call Scheduled",
    engagementType: "Employ Globally · EOR",
  },
  {
    id: "RB-SMP-104",
    name: "Sample Candidate #104",
    role: "Senior Full-Stack TypeScript Architect",
    stage: "onboarding",
    evaluationNote: "MSA, NDA & IP Assignment Executed",
    engagementType: "Hire on Demand · Hourly",
  },
];

export const ProductPages: React.FC<ProductPagesProps> = ({
  productId,
  onNavigate,
  onOpenRequirementModal,
}) => {
  const [pipeline, setPipeline] = useState<PipelineCandidate[]>(INITIAL_PIPELINE);

  const advanceStage = (id: string) => {
    const order: PipelineCandidate["stage"][] = [
      "shortlist",
      "assessment",
      "interview",
      "onboarding",
    ];
    setPipeline((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const nextIdx = (order.indexOf(c.stage) + 1) % order.length;
        return { ...c, stage: order[nextIdx] };
      })
    );
  };

  return (
    <div className="bg-white">
      {/* Product Switcher Subbar */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-500">
            RAPIDBRAINS PRODUCT SUITE:
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate("product-lens-ai")}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                productId === "product-lens-ai"
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              Lens AI — Talent Intelligence
            </button>
            <button
              type="button"
              onClick={() => onNavigate("product-rapid-hire")}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                productId === "product-rapid-hire"
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              Rapid Hire — Workflow Platform
            </button>
          </div>
        </div>
      </div>

      {productId === "product-lens-ai" ? (
        <>
          {/* LENS AI HERO */}
          <section className="bg-slate-950 text-white pt-14 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-900">
            <div className="max-w-7xl mx-auto px-6 space-y-12">
              <div className="max-w-3xl space-y-5">
                <div className="text-xs font-mono text-blue-400">
                  SIGNATURE PRODUCT · RAPIDBRAINS LENS AI
                </div>
                <h1
                  className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08]"
                  style={{ textWrap: "balance" }}
                >
                  AI-Powered Talent Intelligence Built for Engineering Precision.
                </h1>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  Lens AI transforms unstructured hiring conversations into calibrated engineering competency briefs, extracts deep skill dependencies, recommends optimal team topologies, and powers technical screening.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenRequirementModal({
                        sourcePage: "Lens AI Product Page",
                        inquiryType: "Experience Lens AI — Live Briefing",
                      })
                    }
                    className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <span>Experience Lens AI</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate("discover")}
                    className="px-5 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white text-sm font-medium cursor-pointer"
                  >
                    Browse Talent Categories
                  </button>
                </div>
              </div>

              {/* Interactive Lens AI Workbench */}
              <LensAIWorkbench
                onNavigate={onNavigate}
                onOpenRequirementModal={(prefill) =>
                  onOpenRequirementModal({
                    ...prefill,
                    sourcePage: "Lens AI Product Page Workbench",
                  })
                }
                variant="dark"
              />
            </div>
          </section>

          {/* 7 CORE LENS AI CAPABILITIES */}
          <section className="bg-white py-20 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 space-y-12">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono text-blue-600">
                  CAPABILITY ARCHITECTURE
                </div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Seven Core Pillars of RapidBrains Lens AI
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    num: "01",
                    title: "Natural-Language Hiring Requirements",
                    desc: "Describe your project or engineering gap in plain English. Lens AI extracts implicit infrastructure, scale, and domain requirements.",
                  },
                  {
                    num: "02",
                    title: "Intelligent Talent Matching",
                    desc: "Maps multi-dimensional skill graphs rather than brittle keyword matching—evaluating framework adjacency and production depth.",
                  },
                  {
                    num: "03",
                    title: "Candidate Screening & Filtering",
                    desc: "Automates initial technical qualification and asynchronous architecture prompts before human practitioner review.",
                  },
                  {
                    num: "04",
                    title: "Calibrated Skill Assessment",
                    desc: "Generates role-specific coding, system design, and domain rubric evaluations aligned to seniority levels.",
                  },
                  {
                    num: "05",
                    title: "Role & Squad Recommendations",
                    desc: "Advises whether a requirement calls for a single hourly contractor, a cross-functional pod, or a permanent architect.",
                  },
                  {
                    num: "06",
                    title: "Structured Candidate Evaluation Dossiers",
                    desc: "Synthesizes code quality metrics, architectural trade-off reasoning, and interview transcripts into clear hiring manager briefs.",
                  },
                ].map((cap) => (
                  <div
                    key={cap.num}
                    className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5"
                  >
                    <div className="text-xs font-mono font-bold text-blue-600">
                      {cap.num}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TECHNICAL & SECURITY ARCHITECTURE */}
          <section className="bg-slate-50 py-20 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 space-y-10">
              <div className="max-w-3xl space-y-2">
                <div className="text-xs font-mono text-blue-600">
                  ENTERPRISE AI GOVERNANCE &amp; ARCHITECTURE
                </div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Human-in-the-Loop Intelligence with Strict Data Privacy
                </h2>
                <p className="text-sm text-slate-600">
                  Lens AI is engineered with server-side LLM orchestration, retrieval-augmented grounding against verified company knowledge, and mandatory human practitioner review.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  {
                    layer: "Layer 01 · Client & API Gateway",
                    title: "Zero Frontend Key Exposure",
                    detail: "All natural-language prompts route through authenticated server-side API endpoints with rate limiting and input sanitization.",
                  },
                  {
                    layer: "Layer 02 · LLM & RAG Engine",
                    title: "Schema-Constrained Parsing",
                    detail: "Uses deterministic JSON schema enforcement and approved RapidBrains competency taxonomies to prevent hallucinated attributes.",
                  },
                  {
                    layer: "Layer 03 · Talent & CRM Sync",
                    title: "PII Redaction & Access Controls",
                    detail: "Sensitive candidate PII is protected; public demonstrations operate strictly on anonymized sample archetypes.",
                  },
                  {
                    layer: "Layer 04 · Human Sign-Off",
                    title: "Practitioner Validation",
                    detail: "Every AI-generated shortlist and assessment score is audited by a senior RapidBrains engineering architect prior to client delivery.",
                  },
                ].map((l) => (
                  <div
                    key={l.layer}
                    className="p-5 rounded-xl bg-white border border-slate-200 space-y-2"
                  >
                    <div className="text-[11px] font-mono text-blue-600">
                      {l.layer}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {l.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {l.detail}
                    </p>
                  </div>
                ))}
              </div>

              <CostAndTeamTools
                onOpenRequirementModal={(prefill) =>
                  onOpenRequirementModal({
                    ...prefill,
                    sourcePage: "Lens AI Page — Cost & Team Recommender",
                  })
                }
              />
            </div>
          </section>
        </>
      ) : (
        <>
          {/* RAPID HIRE HERO */}
          <section className="bg-white pt-14 pb-20 lg:pt-20 lg:pb-24 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 space-y-10">
              <div className="max-w-3xl space-y-5">
                <div className="text-xs font-mono text-blue-600">
                  RECRUITMENT &amp; HIRING WORKFLOW PLATFORM · RAPID HIRE
                </div>
                <h1
                  className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.08]"
                  style={{ textWrap: "balance" }}
                >
                  Streamline Candidate Pipelines, Interviews, and Global Onboarding.
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Rapid Hire gives engineering leaders and recruitment operations a single transparent workspace to review Lens AI shortlists, compare technical scorecards, coordinate interviews, and trigger contract or EOR onboarding.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenRequirementModal({
                        sourcePage: "Rapid Hire Product Page",
                        inquiryType: "Explore Rapid Hire Platform Access",
                      })
                    }
                    className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <span>Explore Rapid Hire</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate("product-lens-ai")}
                    className="px-5 py-3.5 rounded-lg border border-slate-300 hover:border-slate-400 text-slate-800 text-sm font-medium cursor-pointer"
                  >
                    See Lens AI Integration
                  </button>
                </div>
              </div>

              {/* INTERACTIVE RAPID HIRE PIPELINE SIMULATOR */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 lg:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Interactive Rapid Hire Pipeline Simulator (Click &quot;Advance Stage&quot; on any card)
                    </div>
                    <div className="text-xs text-slate-500">
                      Demonstration Workspace · Connected to Sample Talent Archetypes
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPipeline(INITIAL_PIPELINE)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    Reset Demo Pipeline
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(
                    [
                      { key: "shortlist", title: "01 · Lens AI Shortlist" },
                      { key: "assessment", title: "02 · Technical Evaluation" },
                      { key: "interview", title: "03 · Client Interview" },
                      { key: "onboarding", title: "04 · Contract / EOR Onboarding" },
                    ] as const
                  ).map((col) => {
                    const cards = pipeline.filter((c) => c.stage === col.key);
                    return (
                      <div
                        key={col.key}
                        className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 min-h-[240px]"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-800 pb-2 border-b border-slate-100">
                          <span>{col.title}</span>
                          <span className="font-mono text-blue-600">
                            {cards.length}
                          </span>
                        </div>

                        {cards.length === 0 ? (
                          <div className="py-8 text-center text-xs text-slate-400">
                            No candidates in this stage
                          </div>
                        ) : (
                          cards.map((card) => (
                            <div
                              key={card.id}
                              className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2"
                            >
                              <div className="text-[11px] font-mono text-slate-500">
                                {card.id} · {card.engagementType}
                              </div>
                              <div className="text-xs font-bold text-slate-900">
                                {card.role}
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed">
                                {card.evaluationNote}
                              </p>
                              <button
                                type="button"
                                onClick={() => advanceStage(card.id)}
                                className="w-full mt-2 py-1.5 px-2.5 rounded-md bg-white border border-slate-300 hover:border-blue-600 text-[11px] font-medium text-slate-800 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                              >
                                <span>Advance Stage</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* CURRENT CAPABILITIES VS APPROVED PRODUCT ROADMAP */}
          <section className="bg-slate-50 py-20 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 space-y-10">
              <div className="max-w-3xl space-y-2">
                <div className="text-xs font-mono text-blue-600">
                  PRODUCT TRANSPARENCY
                </div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Current Platform Capabilities &amp; Approved Roadmap
                </h2>
                <p className="text-sm text-slate-600">
                  Clear distinction between active Rapid Hire operational workflows and upcoming roadmap expansions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-7 space-y-4">
                  <div className="text-xs font-mono font-semibold text-emerald-700">
                    ACTIVE CAPABILITIES · AVAILABLE TODAY
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Core Requisition, Shortlist &amp; Onboarding Workflows
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-600">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                      <span>Centralized candidate shortlist delivery with technical evaluation dossiers</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                      <span>Collaborative hiring pipeline tracking across Contract, Dedicated, and Permanent roles</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                      <span>Interview scheduling coordination and structured feedback capture</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                      <span>Direct transition of selected candidates into MSA contract billing or EOR onboarding</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-7 space-y-4">
                  <div className="text-xs font-mono font-semibold text-blue-600">
                    APPROVED PRODUCT ROADMAP · UPCOMING RELEASE
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Next-Generation Analytics &amp; Bi-Directional ATS Sync
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-600">
                    <li className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                      <span>Roadmap: Self-serve bi-directional webhooks for Greenhouse, Lever, and Workday</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                      <span>Roadmap: Predictive sprint capacity and velocity forecasting across hybrid contract pods</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                      <span>Roadmap: Automated coding sandbox replay directly inside client scorecard views</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
