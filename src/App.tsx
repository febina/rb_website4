import React, { useState, useEffect } from "react";
import { PageId, SOLUTIONS_DATA } from "./data/platformData";
import { HomePage } from "./pages/HomePage";
import { DiscoverPage } from "./pages/DiscoverPage";
import { SolutionDetailPage } from "./pages/SolutionDetailPage";
import { ProductPages } from "./pages/ProductPages";
import { ProcessAndBusinessesPage } from "./pages/ProcessAndBusinessesPage";
import { InsightsAndStrategyPage } from "./pages/InsightsAndStrategyPage";
import {
  RequirementModal,
  RequirementPrefill,
} from "./components/RequirementModal";
import { AIHiringAssistant } from "./components/AIHiringAssistant";

const PAGE_SEO_MAP: Record<PageId, { title: string; description: string }> = {
  home: {
    title: "RapidBrains — Global Talent Platform | Contract Developers, Lens AI & EOR",
    description:
      "Discover, evaluate, hire, employ, and manage exceptional global technology talent. Hire contract developers on demand, experience Lens AI, and scale with global EOR.",
  },
  discover: {
    title: "Discover Pre-Vetted Global Technology Talent | RapidBrains",
    description:
      "Explore global technology professionals by skill, role, expertise, and industry. Powered by RapidBrains Lens AI.",
  },
  "solution-hire-on-demand": SOLUTIONS_DATA["solution-hire-on-demand"].seoMeta,
  "solution-dedicated-teams": SOLUTIONS_DATA["solution-dedicated-teams"].seoMeta,
  "solution-hire-permanently": SOLUTIONS_DATA["solution-hire-permanently"].seoMeta,
  "solution-employ-globally": SOLUTIONS_DATA["solution-employ-globally"].seoMeta,
  "solution-domain-experts-ai": SOLUTIONS_DATA["solution-domain-experts-ai"].seoMeta,
  "product-lens-ai": {
    title: "RapidBrains Lens AI — AI-Powered Talent Intelligence & Matching",
    description:
      "Parse natural-language hiring requirements, extract skill graphs, and match vetted engineers with RapidBrains Lens AI.",
  },
  "product-rapid-hire": {
    title: "Rapid Hire — Recruitment Pipeline & Hiring Workflow Platform | RapidBrains",
    description:
      "Organize candidate pipelines, technical scorecards, interviews, and global onboarding in one workspace.",
  },
  process: {
    title: "Talent Vetting, Onboarding & Global Payroll Process | RapidBrains",
    description:
      "Explore RapidBrains' 4-gate technical vetting, rapid contract/EOR onboarding, and consolidated global payroll management.",
  },
  businesses: {
    title: "Global Talent Solutions by Business Stage & Industry | RapidBrains",
    description:
      "Tailored engineering and AI talent solutions for Startups, Scale-ups, Enterprises, SaaS, Healthcare, Biotech, and Automotive.",
  },
  insights: {
    title: "Insights Resource Centre — Case Studies, Whitepapers & Guides | RapidBrains",
    description:
      "Research, hiring guides, case studies, whitepapers, and FAQs on global software engineering and workforce management.",
  },
  "strategy-blueprint": {
    title: "Stage 1–7 Website Strategy, Competitor Benchmarking & Sitemap | RapidBrains",
    description:
      "Complete competitor research (Braintrust, Docket, Eightfold AI), multi-page sitemap architecture, and SEO blueprint for RapidBrains.",
  },
};

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPrefill, setModalPrefill] = useState<RequirementPrefill>({});

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenRequirementModal = (prefill: RequirementPrefill) => {
    setModalPrefill(prefill);
    setModalOpen(true);
  };

  // Dynamic SEO Title & Meta Description per page
  useEffect(() => {
    const seo = PAGE_SEO_MAP[currentPage] ?? PAGE_SEO_MAP.home;
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", seo.description);
    }
  }, [currentPage]);

  const isSolutionsActive = currentPage.startsWith("solution-");
  const isProductsActive = currentPage.startsWith("product-");

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => handleNavigate("home")}
            className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer font-display"
          >
            RapidBrains
          </button>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <button
              type="button"
              onClick={() => handleNavigate("discover")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === "discover"
                  ? "text-slate-900 underline underline-offset-8 decoration-2 decoration-blue-600"
                  : ""
              }`}
            >
              Discover
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("solution-hire-on-demand")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isSolutionsActive
                  ? "text-slate-900 underline underline-offset-8 decoration-2 decoration-blue-600"
                  : ""
              }`}
            >
              Solutions
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("product-lens-ai")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isProductsActive
                  ? "text-slate-900 underline underline-offset-8 decoration-2 decoration-blue-600"
                  : ""
              }`}
            >
              Products
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("process")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === "process" || currentPage === "businesses"
                  ? "text-slate-900 underline underline-offset-8 decoration-2 decoration-blue-600"
                  : ""
              }`}
            >
              Process
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("insights")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === "insights" || currentPage === "strategy-blueprint"
                  ? "text-slate-900 underline underline-offset-8 decoration-2 decoration-blue-600"
                  : ""
              }`}
            >
              Insights
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() =>
                handleOpenRequirementModal({
                  sourcePage: "Global Top Bar CTA",
                  inquiryType: "Find Your Talent — Requirement Brief",
                })
              }
              className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Find Your Talent
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT VIEWPORT WITH SUB-ARCHITECTURE EXPLORER BAR */}
      <main className="flex-1">
        {/* Multi-Page Architecture Quick-Access Strip (Below the Fold of Header) */}
        <div className="bg-slate-900 text-slate-300 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4 overflow-x-auto text-xs">
            <div className="flex items-center gap-4 whitespace-nowrap shrink-0">
              <span className="font-mono text-[11px] text-slate-400">
                Direct Page Switcher:
              </span>
              <button
                type="button"
                onClick={() => handleNavigate("home")}
                className={`hover:text-white cursor-pointer ${
                  currentPage === "home" ? "text-blue-400 font-semibold" : ""
                }`}
              >
                Home
              </button>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <button
                type="button"
                onClick={() => handleNavigate("solution-hire-on-demand")}
                className={`hover:text-white cursor-pointer ${
                  currentPage === "solution-hire-on-demand"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                Hire on Demand
              </button>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <button
                type="button"
                onClick={() => handleNavigate("solution-dedicated-teams")}
                className={`hover:text-white cursor-pointer ${
                  currentPage === "solution-dedicated-teams"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                Dedicated Teams
              </button>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <button
                type="button"
                onClick={() => handleNavigate("solution-hire-permanently")}
                className={`hover:text-white cursor-pointer ${
                  currentPage === "solution-hire-permanently"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                Hire Permanently
              </button>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <button
                type="button"
                onClick={() => handleNavigate("solution-employ-globally")}
                className={`hover:text-white cursor-pointer ${
                  currentPage === "solution-employ-globally"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                Employ Globally (EOR)
              </button>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <button
                type="button"
                onClick={() => handleNavigate("solution-domain-experts-ai")}
                className={`hover:text-white cursor-pointer ${
                  currentPage === "solution-domain-experts-ai"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                Domain Experts for AI
              </button>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <button
                type="button"
                onClick={() => handleNavigate("product-lens-ai")}
                className={`hover:text-white cursor-pointer ${
                  currentPage === "product-lens-ai"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                Lens AI
              </button>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <button
                type="button"
                onClick={() => handleNavigate("product-rapid-hire")}
                className={`hover:text-white cursor-pointer ${
                  currentPage === "product-rapid-hire"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                Rapid Hire
              </button>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <button
                type="button"
                onClick={() => handleNavigate("businesses")}
                className={`hover:text-white cursor-pointer ${
                  currentPage === "businesses"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                Businesses &amp; Industries
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleNavigate("strategy-blueprint")}
              className={`font-mono text-[11px] whitespace-nowrap shrink-0 cursor-pointer underline ${
                currentPage === "strategy-blueprint"
                  ? "text-blue-400 font-semibold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Stage 1–7 Strategy &amp; Sitemap Report
            </button>
          </div>
        </div>

        {/* Route Content */}
        {currentPage === "home" && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenRequirementModal={handleOpenRequirementModal}
          />
        )}

        {currentPage === "discover" && (
          <DiscoverPage
            onNavigate={handleNavigate}
            onOpenRequirementModal={handleOpenRequirementModal}
          />
        )}

        {isSolutionsActive && (
          <SolutionDetailPage
            solutionId={currentPage}
            onNavigate={handleNavigate}
            onOpenRequirementModal={handleOpenRequirementModal}
          />
        )}

        {(currentPage === "product-lens-ai" ||
          currentPage === "product-rapid-hire") && (
          <ProductPages
            productId={currentPage}
            onNavigate={handleNavigate}
            onOpenRequirementModal={handleOpenRequirementModal}
          />
        )}

        {(currentPage === "process" || currentPage === "businesses") && (
          <ProcessAndBusinessesPage
            mode={currentPage}
            onNavigate={handleNavigate}
            onOpenRequirementModal={handleOpenRequirementModal}
          />
        )}

        {(currentPage === "insights" ||
          currentPage === "strategy-blueprint") && (
          <InsightsAndStrategyPage
            mode={currentPage}
            onNavigate={handleNavigate}
            onOpenRequirementModal={handleOpenRequirementModal}
          />
        )}
      </main>

      {/* QUIET, COMPREHENSIVE ENTERPRISE FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="text-lg font-bold text-white font-display">
                RapidBrains
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                Discover Talent. Hire Smarter. Scale Globally. The global technology talent platform connecting businesses with contract developers, dedicated teams, permanent hires, global EOR, and AI-powered talent intelligence.
              </p>
              <div className="text-xs text-slate-500">
                https://www.rapidbrains.com/
              </div>
            </div>

            {/* Discover */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-white">Discover</div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("discover")}
                    className="hover:text-white cursor-pointer"
                  >
                    Browse by Talent
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("discover")}
                    className="hover:text-white cursor-pointer"
                  >
                    Browse by Technology
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("discover")}
                    className="hover:text-white cursor-pointer"
                  >
                    Browse by Role
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("discover")}
                    className="hover:text-white cursor-pointer"
                  >
                    Browse by Expertise
                  </button>
                </li>
              </ul>
            </div>

            {/* Solutions */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-white">Solutions</div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("solution-hire-on-demand")}
                    className="hover:text-white cursor-pointer"
                  >
                    Hire on Demand (Primary)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("solution-dedicated-teams")}
                    className="hover:text-white cursor-pointer"
                  >
                    Dedicated Teams
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("solution-hire-permanently")}
                    className="hover:text-white cursor-pointer"
                  >
                    Hire Permanently
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("solution-employ-globally")}
                    className="hover:text-white cursor-pointer"
                  >
                    Employ Globally (EOR)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("solution-domain-experts-ai")}
                    className="hover:text-white cursor-pointer"
                  >
                    Domain Experts for AI
                  </button>
                </li>
              </ul>
            </div>

            {/* Products & Process */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-white">
                Products &amp; Process
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("product-lens-ai")}
                    className="hover:text-white cursor-pointer"
                  >
                    RapidBrains Lens AI
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("product-rapid-hire")}
                    className="hover:text-white cursor-pointer"
                  >
                    Rapid Hire Platform
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("process")}
                    className="hover:text-white cursor-pointer"
                  >
                    Vetting &amp; Onboarding
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("process")}
                    className="hover:text-white cursor-pointer"
                  >
                    Global Payroll Management
                  </button>
                </li>
              </ul>
            </div>

            {/* Businesses & Insights */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-white">
                Businesses &amp; Insights
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("businesses")}
                    className="hover:text-white cursor-pointer"
                  >
                    Startups, Scale-ups &amp; Enterprise
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("businesses")}
                    className="hover:text-white cursor-pointer"
                  >
                    SaaS, Healthcare, Biotech &amp; Auto
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("insights")}
                    className="hover:text-white cursor-pointer"
                  >
                    Insights Resource Centre
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate("strategy-blueprint")}
                    className="hover:text-white cursor-pointer"
                  >
                    Stage 1–7 Strategy Report
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} RapidBrains Global Talent Platform. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-300"
              >
                XML Sitemap
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-300"
              >
                Robots.txt
              </a>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() =>
                  handleOpenRequirementModal({
                    sourcePage: "Footer Contact",
                    inquiryType: "Enterprise Governance & Privacy Inquiry",
                  })
                }
                className="hover:text-slate-300 cursor-pointer"
              >
                Submit Requirement
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Contextual Lead Capture Modal */}
      <RequirementModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefill={modalPrefill}
      />

      {/* AI Hiring Assistant with Human Sales Handoff */}
      <AIHiringAssistant onOpenRequirementModal={handleOpenRequirementModal} />
    </div>
  );
}

export default App;
