import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, Globe, Cpu, Users } from "lucide-react";
import {
  PageId,
  SOLUTIONS_DATA,
  SolutionPageData,
} from "../data/platformData";
import { RequirementPrefill } from "../components/RequirementModal";

interface SolutionDetailPageProps {
  solutionId: PageId;
  onNavigate: (page: PageId) => void;
  onOpenRequirementModal: (prefill: RequirementPrefill) => void;
}

const SOLUTION_TABS: { id: PageId; label: string; tag: string }[] = [
  { id: "solution-hire-on-demand", label: "Hire on Demand", tag: "Primary · Hourly Contract" },
  { id: "solution-dedicated-teams", label: "Dedicated Teams", tag: "Engineering Pods" },
  { id: "solution-hire-permanently", label: "Hire Permanently", tag: "Full-Time Search" },
  { id: "solution-employ-globally", label: "Employ Globally", tag: "EOR & Payroll" },
  { id: "solution-domain-experts-ai", label: "Domain Experts for AI", tag: "RLHF & Evaluation" },
];

export const SolutionDetailPage: React.FC<SolutionDetailPageProps> = ({
  solutionId,
  onNavigate,
  onOpenRequirementModal,
}) => {
  const data: SolutionPageData =
    SOLUTIONS_DATA[solutionId] ?? SOLUTIONS_DATA["solution-hire-on-demand"];

  // Interactive visual states per solution
  const [selectedHours, setSelectedHours] = useState<number>(40);
  const [selectedEorCountry, setSelectedEorCountry] = useState<string>("India");
  const [selectedAiDomain, setSelectedAiDomain] = useState<string>("Clinical Medicine (MD)");

  return (
    <div className="bg-white">
      {/* Sub-Navigation Bar for Solutions */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="text-xs font-mono text-slate-500 whitespace-nowrap shrink-0">
            SOLUTIONS ARCHITECTURE:
          </div>
          <div className="flex items-center gap-1.5">
            {SOLUTION_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  solutionId === tab.id
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 1. UNIQUE HERO SECTION WITH SOLUTION-SPECIFIC INTERACTIVE VISUAL */}
      <section className="bg-white pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="text-xs font-mono text-blue-600">
                {data.kicker.toUpperCase()}
              </div>
              <h1
                className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]"
                style={{ textWrap: "balance" }}
              >
                {data.headline}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {data.subheadline}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() =>
                    onOpenRequirementModal({
                      sourcePage: data.navLabel,
                      inquiryType: data.inquiryType,
                      engagementModel: data.defaultEngagementModel,
                    })
                  }
                  className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{data.primaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("discover")}
                  className="px-5 py-3.5 rounded-lg border border-slate-300 hover:border-slate-400 text-slate-800 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Browse Sample Talent
                </button>
              </div>

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
                <span className="font-semibold text-slate-800">Commercial Governance: </span>
                {data.commercialNote}
              </div>
            </div>

            {/* Right Column: Bespoke Solution Interactive Workbench */}
            <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-slate-50 p-6 lg:p-8 flex flex-col justify-between space-y-6">
              {solutionId === "solution-hire-on-demand" && (
                <>
                  <div className="space-y-1 pb-4 border-b border-slate-200">
                    <div className="text-xs font-mono text-blue-600">
                      HOURLY ENGAGEMENT SIMULATOR
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      Flexible Contract Developer Billing &amp; Velocity
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">
                        Weekly Allocation per Developer
                      </span>
                      <span className="font-mono font-bold text-blue-600">
                        {selectedHours} hrs / week ({selectedHours * 4} hrs / mo)
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[20, 30, 40].map((hrs) => (
                        <button
                          key={hrs}
                          type="button"
                          onClick={() => setSelectedHours(hrs)}
                          className={`flex-1 py-2.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                            selectedHours === hrs
                              ? "bg-slate-900 border-slate-900 text-white"
                              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          {hrs} hrs/wk ({hrs === 40 ? "Full Sprint" : "Part-Time Specialist"})
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Billing Cadence</span>
                        <span className="font-mono font-medium text-slate-900">
                          Verified Weekly / Monthly Timesheets
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Contract Flexibility</span>
                        <span className="font-mono font-medium text-slate-900">
                          Short-Term &amp; Long-Term Extendable
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">IP &amp; Code Ownership</span>
                        <span className="font-mono font-medium text-emerald-700">
                          100% Direct Client Assignment
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {solutionId === "solution-employ-globally" && (
                <>
                  <div className="space-y-1 pb-4 border-b border-slate-200">
                    <div className="text-xs font-mono text-blue-600">
                      GLOBAL EOR JURISDICTION EXPLORER
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      Compliant International Employment Without a Local Entity
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {["India", "United Kingdom", "Germany", "Poland", "United Arab Emirates"].map(
                        (country) => (
                          <button
                            key={country}
                            type="button"
                            onClick={() => setSelectedEorCountry(country)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                              selectedEorCountry === country
                                ? "bg-slate-900 border-slate-900 text-white"
                                : "bg-white border-slate-200 text-slate-700"
                            }`}
                          >
                            {country}
                          </button>
                        )
                      )}
                    </div>

                    <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2.5 text-xs">
                      <div className="font-semibold text-slate-900">
                        {selectedEorCountry} — EOR Governance Scope
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Local Entity Required by Client:</span>
                        <span className="font-mono font-semibold text-emerald-700">
                          No (RapidBrains EOR)
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Statutory Payroll &amp; Tax Filings:</span>
                        <span className="font-mono text-slate-900">
                          Automated Monthly Local Disbursement
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Employment Contract &amp; IP Assignment:</span>
                        <span className="font-mono text-slate-900">
                          Jurisdiction-Aligned &amp; Enforced
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {solutionId === "solution-domain-experts-ai" && (
                <>
                  <div className="space-y-1 pb-4 border-b border-slate-200">
                    <div className="text-xs font-mono text-blue-600">
                      RLHF &amp; EVALUATION COHORT MATRIX
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      Credentialed Specialist Panels for AI Post-Training
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Clinical Medicine (MD)",
                        "Corporate Law (JD)",
                        "STEM & Quantitative (PhD)",
                        "Staff Systems Coding",
                      ].map((dom) => (
                        <button
                          key={dom}
                          type="button"
                          onClick={() => setSelectedAiDomain(dom)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                            selectedAiDomain === dom
                              ? "bg-slate-900 border-slate-900 text-white"
                              : "bg-white border-slate-200 text-slate-700"
                          }`}
                        >
                          {dom}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2 text-xs">
                      <div className="font-semibold text-slate-900">
                        Active Cohort Specification: {selectedAiDomain}
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        Specialists complete primary credential verification and rubric calibration tests before executing SFT prompt authoring, preference ranking (RLHF), or adversarial safety red-teaming.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {(solutionId === "solution-dedicated-teams" ||
                solutionId === "solution-hire-permanently") && (
                <>
                  <div className="space-y-1 pb-4 border-b border-slate-200">
                    <div className="text-xs font-mono text-blue-600">
                      {solutionId === "solution-dedicated-teams"
                        ? "DEDICATED SQUAD ARCHITECTURE"
                        : "PERMANENT SEARCH & VETTING FUNNEL"}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {solutionId === "solution-dedicated-teams"
                        ? "Cohesive Multi-Role Engineering Pod"
                        : "Practitioner-Vetted Full-Time Placement"}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {data.keyCapabilities.map((cap) => (
                      <div
                        key={cap.number}
                        className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1"
                      >
                        <div className="text-[11px] font-mono text-blue-600">
                          {cap.number}
                        </div>
                        <div className="text-xs font-semibold text-slate-900">
                          {cap.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {cap.deliverable}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Need a tailored proposal for {data.navLabel}?</span>
                <button
                  type="button"
                  onClick={() =>
                    onOpenRequirementModal({
                      sourcePage: `${data.navLabel} Interactive Panel`,
                      inquiryType: data.inquiryType,
                      engagementModel: data.defaultEngagementModel,
                    })
                  }
                  className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Request Custom Brief →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIFIC CAPABILITIES */}
      <section className="bg-slate-50 py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono text-blue-600">
              CORE CAPABILITIES
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              What RapidBrains Delivers with {data.navLabel}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.keyCapabilities.map((cap) => (
              <div
                key={cap.number}
                className="bg-white rounded-xl border border-slate-200 p-7 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-2.5">
                  <div className="text-xs font-mono text-blue-600">
                    {cap.number}. Capability Pillar
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-600">
                  Deliverable: {cap.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BUSINESS BENEFITS & USE CASES */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* Benefits */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Operational &amp; Engineering Advantages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.businessBenefits.map((b) => (
                <div
                  key={b.title}
                  className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5"
                >
                  <div className="text-sm font-mono font-bold text-blue-600">
                    {b.metricLabel}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{b.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {b.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Representative Enterprise Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.useCases.map((uc, idx) => (
                <div
                  key={uc.scenario}
                  className="p-6 rounded-xl border border-slate-200 bg-white flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-slate-500">
                      Scenario 0{idx + 1}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {uc.scenario}
                    </h3>
                    <div className="text-xs font-medium text-blue-700">
                      {uc.rolesInvolved}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {uc.outcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS WORKFLOW */}
      <section className="bg-slate-50 py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="space-y-2">
            <div className="text-xs font-mono text-blue-600">
              EXECUTION WORKFLOW
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              How {data.navLabel} Works Step-by-Step
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.workflowSteps.map((st) => (
              <div
                key={st.step}
                className="bg-white rounded-xl border border-slate-200 p-6 space-y-3"
              >
                <div className="text-xs font-mono font-bold text-blue-600">
                  Step {st.step}
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQS & SEO TARGET INTENT */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <div className="space-y-2">
            <div className="text-xs font-mono text-blue-600">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Common Questions About {data.navLabel}
            </h2>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq) => (
              <div
                key={faq.question}
                className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-2"
              >
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Contextual CTA Box */}
          <div className="p-8 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs font-mono text-blue-400">
                READY TO GET STARTED WITH {data.navLabel.toUpperCase()}?
              </div>
              <h3 className="text-2xl font-bold">
                Submit Your {data.navLabel} Requirement Today
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Our talent architects will review your technical brief and respond with a tailored plan and verified candidate shortlist.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onOpenRequirementModal({
                  sourcePage: `${data.navLabel} Footer CTA`,
                  inquiryType: data.inquiryType,
                  engagementModel: data.defaultEngagementModel,
                })
              }
              className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{data.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
