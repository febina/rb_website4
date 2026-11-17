import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  FileText,
  HelpCircle,
  Layers,
  CheckCircle2,
  ExternalLink,
  Search,
} from "lucide-react";
import {
  PageId,
  INSIGHTS_ARTICLES,
  COMPETITOR_BENCHMARKS,
} from "../data/platformData";
import { RequirementPrefill } from "../components/RequirementModal";

interface InsightsAndStrategyPageProps {
  mode: "insights" | "strategy-blueprint";
  onNavigate: (page: PageId) => void;
  onOpenRequirementModal: (prefill: RequirementPrefill) => void;
}

const INSIGHT_CATEGORIES = [
  "All",
  "Case Studies",
  "Hiring Guides",
  "Whitepapers",
  "Knowledge Base",
  "Podcast",
  "Blogs",
  "Video Room",
  "Newsletters",
  "FAQs",
] as const;

const PLATFORM_FAQS = [
  {
    q: "What is RapidBrains' primary engagement model?",
    a: "Contract Technology Staffing (Hire on Demand) is our primary offering—helping businesses engage pre-vetted software developers and technology specialists on flexible hourly billing arrangements for short-term and long-term projects.",
  },
  {
    q: "How does Employer of Record (Employ Globally) work?",
    a: "RapidBrains enables companies to employ international talent without establishing a local legal entity. We manage compliant local employment contracts, statutory benefits, tax withholdings, and multi-currency payroll, subject to applicable country regulations.",
  },
  {
    q: "How does RapidBrains Lens AI differ from standard keyword filters?",
    a: "Lens AI parses natural-language hiring briefs into structured engineering roles, extracts technical skill graphs and duration requirements, recommends the appropriate engagement model, and generates role-specific screening criteria.",
  },
  {
    q: "Are the profiles shown on the website live available candidates?",
    a: "In compliance with strict transparency and data governance standards, public profiles displayed on the website are clearly labeled sample demonstration profiles. Custom live candidate shortlists are generated specifically for your verified requirement.",
  },
];

export const InsightsAndStrategyPage: React.FC<InsightsAndStrategyPageProps> = ({
  mode,
  onNavigate,
  onOpenRequirementModal,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof INSIGHT_CATEGORIES)[number]>("All");
  const [activeArticleId, setActiveArticleId] = useState<string>(
    INSIGHTS_ARTICLES[0].id
  );

  if (mode === "insights") {
    const filteredArticles =
      selectedCategory === "All" || selectedCategory === "FAQs"
        ? INSIGHTS_ARTICLES
        : INSIGHTS_ARTICLES.filter((a) => a.category === selectedCategory);

    const displayArticles =
      filteredArticles.length > 0 ? filteredArticles : INSIGHTS_ARTICLES;
    const selectedArticle =
      INSIGHTS_ARTICLES.find((a) => a.id === activeArticleId) ??
      INSIGHTS_ARTICLES[0];

    return (
      <div className="bg-white">
        {/* HERO */}
        <section className="bg-white pt-14 pb-16 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono text-blue-600">
                  EDITORIAL RESOURCE CENTRE · INSIGHTS
                </div>
                <h1
                  className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900"
                  style={{ textWrap: "balance" }}
                >
                  Case Studies, Whitepapers, Hiring Guides &amp; Global Workforce Research.
                </h1>
                <p className="text-base text-slate-600 leading-relaxed">
                  Practical playbooks for CTOs, VPs of Engineering, and Global People Operations leaders navigating remote contract staffing, AI talent evaluation, and international EOR compliance.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("strategy-blueprint")}
                className="px-4 py-2.5 rounded-lg border border-slate-300 hover:border-slate-400 text-xs font-medium text-slate-800 flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 self-start lg:self-auto"
              >
                <span>View Stage 1–7 Strategy &amp; Sitemap Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category Filter Bar */}
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl overflow-x-auto">
              {INSIGHT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED READER + EDITORIAL GRID */}
        <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            {/* Active Featured Briefing Reader */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-blue-700">
                    Featured Briefing · {selectedArticle.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedArticle.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                  {selectedArticle.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {selectedArticle.summary}
                </p>
              </div>

              <div className="lg:col-span-5 lg:border-l border-slate-200 lg:pl-8 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="text-xs font-mono font-semibold text-slate-800">
                    KEY ARCHITECTURAL TAKEAWAYS
                  </div>
                  <ul className="space-y-2">
                    {selectedArticle.keyTakeaways.map((tk, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                        <span>{tk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenRequirementModal({
                      sourcePage: `Insights — ${selectedArticle.title}`,
                      inquiryType: "Request Full Whitepaper & Architecture Briefing",
                    })
                  }
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Discuss This Topic with Our Architects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Article Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayArticles.map((art) => (
                <div
                  key={art.id}
                  className={`rounded-xl border p-6 flex flex-col justify-between space-y-5 transition-colors ${
                    art.id === selectedArticle.id
                      ? "bg-white border-blue-600"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-medium text-blue-700">
                        {art.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{art.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveArticleId(art.id)}
                    className="pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>
                      {art.id === selectedArticle.id
                        ? "Currently Reading Above"
                        : "Open Briefing Above"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KNOWLEDGE BASE & FAQS */}
        <section className="bg-white py-20 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6 space-y-8">
            <div className="space-y-2">
              <div className="text-xs font-mono text-blue-600">
                KNOWLEDGE BASE &amp; FAQS
              </div>
              <h2 className="text-3xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {PLATFORM_FAQS.map((item) => (
                <div
                  key={item.q}
                  className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-2"
                >
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{item.q}</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed pl-6">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // STRATEGY, COMPETITOR BENCHMARKING & SITEMAP BLUEPRINT PAGE (STAGE 1–7 DELIVERABLES)
  return (
    <div className="bg-white">
      <section className="bg-slate-950 text-white pt-14 pb-20 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <div className="text-xs font-mono text-blue-400">
            STAGE 1 TO STAGE 7 DELIVERABLE · RESEARCH, SITEMAP &amp; ARCHITECTURE REPORT
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ textWrap: "balance" }}
          >
            RapidBrains Website Strategy, Competitor Benchmarking &amp; Multi-Page Architecture
          </h1>
          <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
            This living architecture blueprint documents our Stage 1 Competitor Research (Braintrust, Docket, Eightfold AI, Toptal, Turing, Uplers, Proxify), Stage 2 Sitemap &amp; Homepage Wireframe, SEO Keyword Matrix, and direct navigation to every built page.
          </p>
        </div>
      </section>

      {/* STAGE 1: COMPETITOR BENCHMARKING REPORT */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-mono text-blue-600">
              STAGE 1 DELIVERABLE · COMPETITOR &amp; DESIGN RESEARCH
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Competitor Benchmarking &amp; Visual Synthesis Matrix
            </h2>
            <p className="text-sm text-slate-600">
              Synthesizing Braintrust (Marketplace Experience), Eightfold AI (Intelligent Experience), and Docket (Premium SaaS Whitespace &amp; Typography) into a distinct RapidBrains identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPETITOR_BENCHMARKS.map((comp) => (
              <div
                key={comp.company}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="text-xs font-mono text-blue-600">
                    {comp.roleInResearch}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {comp.company}
                  </h3>
                  <p className="text-xs text-slate-600">{comp.positioning}</p>
                  <div className="pt-2 space-y-1.5">
                    <div className="text-xs font-semibold text-slate-800">
                      Patterns Studied:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {comp.strengthsStudied.map((s, idx) => (
                        <li key={idx}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs text-slate-700">
                  <span className="font-semibold text-slate-900">
                    RapidBrains Differentiation:{" "}
                  </span>
                  {comp.rapidBrainsOpportunity}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAGE 2, 3, 4: COMPLETE MULTI-PAGE SITEMAP & LIVE ROUTE LAUNCHER */}
      <section className="bg-slate-50 py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-mono text-blue-600">
              STAGE 2, 3 &amp; 4 DELIVERABLE · MULTI-PAGE INFORMATION ARCHITECTURE
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Interactive Sitemap &amp; Page-by-Page Review Launcher
            </h2>
            <p className="text-sm text-slate-600">
              Click any page node below to inspect its dedicated layout, interactive visual workbench, contextual CTA, and SEO schema.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(
              [
                {
                  page: "home" as PageId,
                  stage: "Stage 2 & 3",
                  title: "Homepage (12-Section Ecosystem)",
                  cta: "Find Your Talent",
                  desc: "Establishes design system, connected talent graph hero, bento overview, Lens AI workbench, Rapid Hire preview, and cost calculator.",
                },
                {
                  page: "discover" as PageId,
                  stage: "Stage 4 · Page 01",
                  title: "Discover Talent Hub",
                  cta: "Explore Talent",
                  desc: "Browse by Talent, Technology (11 stacks), Role (8 archetypes), Expertise, and Industry with sample profile disclosures.",
                },
                {
                  page: "solution-hire-on-demand" as PageId,
                  stage: "Stage 4 · Page 02 (Primary)",
                  title: "Solutions — Hire on Demand",
                  cta: "Find Developers",
                  desc: "Primary revenue service: hourly contract developer engagement, flexible contract duration, and sprint velocity simulator.",
                },
                {
                  page: "solution-dedicated-teams" as PageId,
                  stage: "Stage 4 · Page 03",
                  title: "Solutions — Dedicated Teams",
                  cta: "Build Your Team",
                  desc: "Cross-functional engineering pods for long-term product roadmaps and institutional knowledge retention.",
                },
                {
                  page: "solution-hire-permanently" as PageId,
                  stage: "Stage 4 · Page 04",
                  title: "Solutions — Hire Permanently",
                  cta: "Hire Permanently",
                  desc: "Full-time specialist and leadership technology recruitment with practitioner-led vetting.",
                },
                {
                  page: "solution-employ-globally" as PageId,
                  stage: "Stage 4 · Page 05",
                  title: "Solutions — Employ Globally (EOR)",
                  cta: "Hire Globally",
                  desc: "Employer of Record, international employment without local entity, multi-currency payroll, and contractor compliance.",
                },
                {
                  page: "solution-domain-experts-ai" as PageId,
                  stage: "Stage 4 · Page 06",
                  title: "Solutions — Domain Experts for AI",
                  cta: "Engage Domain Experts",
                  desc: "Doctors, lawyers, PhDs, and senior coders for RLHF, AI model evaluation, red-teaming, and expert annotation.",
                },
                {
                  page: "product-lens-ai" as PageId,
                  stage: "Stage 4 · Page 07 & Stage 5",
                  title: "Products — RapidBrains Lens AI",
                  cta: "Experience Lens AI",
                  desc: "Signature AI talent intelligence product with live Gemini-powered natural-language requirement parsing.",
                },
                {
                  page: "product-rapid-hire" as PageId,
                  stage: "Stage 4 · Page 08",
                  title: "Products — Rapid Hire Platform",
                  cta: "Explore Rapid Hire",
                  desc: "Interactive recruitment pipeline simulator, candidate tracking, interview coordination, and roadmap transparency.",
                },
                {
                  page: "process" as PageId,
                  stage: "Stage 4 · Page 09",
                  title: "Process — Vetting, Onboarding & Payroll",
                  cta: "See How It Works",
                  desc: "Interactive 3-part lifecycle covering 4-gate technical vetting, rapid onboarding, and global payroll.",
                },
                {
                  page: "businesses" as PageId,
                  stage: "Stage 4 · Page 10",
                  title: "Businesses — By Type & Industry",
                  cta: "Find Your Hiring Solution",
                  desc: "Dedicated views for Startups, Tech Companies, Scale-ups, Enterprise, SaaS, Healthcare, Biotech, and Automotive.",
                },
                {
                  page: "insights" as PageId,
                  stage: "Stage 4 · Page 11",
                  title: "Insights Resource Centre",
                  cta: "Explore Insights",
                  desc: "Editorial hub covering Case Studies, Whitepapers, Hiring Guides, Podcast, Knowledge Base, and FAQs.",
                },
              ]
            ).map((item) => (
              <div
                key={item.page}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-blue-600">
                    {item.stage} · Primary CTA: &quot;{item.cta}&quot;
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(item.page)}
                  className="pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Inspect Live Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO KEYWORD CLUSTERS & URL MIGRATION GOVERNANCE */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-mono text-blue-600">
              SECTION 11 &amp; STAGE 7 · SEO ARCHITECTURE &amp; URL MIGRATION PLAN
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Search-Intent Keyword Clusters &amp; Technical SEO Implementation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              {
                cluster: "Cluster 01 · Contract Hiring",
                keywords: [
                  "Hire remote developers",
                  "Hire contract developers",
                  "Hourly developers",
                  "IT staff augmentation",
                  "Remote software developers",
                ],
                targetRoute: "/solutions/hire-on-demand",
              },
              {
                cluster: "Cluster 02 · Talent Solutions",
                keywords: [
                  "Dedicated development teams",
                  "Global talent platform",
                  "Technology recruitment",
                  "Permanent IT recruitment",
                  "Recruitment process outsourcing",
                ],
                targetRoute: "/solutions/dedicated-teams",
              },
              {
                cluster: "Cluster 03 · Global Employment",
                keywords: [
                  "Employer of record",
                  "EOR services",
                  "Global payroll",
                  "International contractor management",
                ],
                targetRoute: "/solutions/employ-globally",
              },
              {
                cluster: "Cluster 04 · AI Talent & RLHF",
                keywords: [
                  "Hire AI engineers",
                  "Hire machine learning engineers",
                  "Generative AI developers",
                  "LLM specialists & RAG developers",
                  "AI talent assessment",
                ],
                targetRoute: "/solutions/domain-experts-ai",
              },
            ].map((cl) => (
              <div
                key={cl.cluster}
                className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-3"
              >
                <div className="text-xs font-mono font-bold text-blue-600">
                  {cl.cluster}
                </div>
                <div className="text-xs font-mono text-slate-500">
                  Canonical: {cl.targetRoute}
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 pt-1">
                  {cl.keywords.map((kw) => (
                    <li key={kw}>• {kw}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
