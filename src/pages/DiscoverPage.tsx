import React, { useState } from "react";
import { Search, ArrowRight, Filter, CheckCircle2, Code2, Layers } from "lucide-react";
import {
  PageId,
  SAMPLE_TALENT_PROFILES,
} from "../data/platformData";
import { LensAIWorkbench } from "../components/LensAIWorkbench";
import { RequirementPrefill } from "../components/RequirementModal";

interface DiscoverPageProps {
  onNavigate: (page: PageId) => void;
  onOpenRequirementModal: (prefill: RequirementPrefill) => void;
}

const BROWSE_MODES = [
  "Browse by Talent",
  "Browse by Technology",
  "Browse by Role",
  "Browse by Expertise",
  "Browse by Industry",
] as const;

const TECHNOLOGIES = [
  { name: "Frontend Development", skills: "React · Next.js · TypeScript · Vue · Tailwind CSS", roles: "Senior Frontend & UI Systems Engineers" },
  { name: "Backend Development", skills: "Python · Node.js · Go · Java · Rust · PostgreSQL", roles: "Distributed Systems & API Engineers" },
  { name: "Full Stack Development", skills: "TypeScript · React · Node.js · Python · GraphQL", roles: "End-to-End Product & Platform Engineers" },
  { name: "Mobile Development", skills: "React Native · Swift · Kotlin · Flutter · Offline Sync", roles: "iOS, Android & Cross-Platform Engineers" },
  { name: "Cloud & DevOps", skills: "AWS · GCP · Azure · Terraform · Kubernetes · ArgoCD", roles: "Cloud Architects, SREs & Platform Engineers" },
  { name: "Data Engineering", skills: "Apache Spark · Snowflake · dbt · Airflow · Kafka", roles: "Data Platform & Lakehouse Architects" },
  { name: "Artificial Intelligence", skills: "PyTorch · Model Evaluation · Agentic Workflows · Python", roles: "Applied AI Systems Engineers" },
  { name: "Machine Learning", skills: "MLOps · Feature Stores · Scikit-Learn · SageMaker", roles: "ML Infrastructure & Modeling Engineers" },
  { name: "Generative AI", skills: "RAG · Vector Databases · vLLM · RLHF · Fine-Tuning", roles: "LLM & Generative AI Specialists" },
  { name: "Cybersecurity", skills: "Zero-Trust IAM · Cloud Security · DevSecOps · Penetration Testing", roles: "Application & Infrastructure Security Engineers" },
  { name: "QA & Automation", skills: "Playwright · Cypress · k6 Load Testing · Contract Testing", roles: "QA Automation Leads & Performance SDETs" },
];

const ROLES_CATALOG = [
  { title: "Software Developers", seniority: "Senior · Staff", engagement: "Hire on Demand · Dedicated · Permanent", focus: "Production web, backend, and distributed systems engineering." },
  { title: "AI Engineers", seniority: "Senior · Staff · Principal", engagement: "Hire on Demand · Domain Experts", focus: "LLM integration, RAG architectures, model evaluation, and RLHF." },
  { title: "Data Engineers", seniority: "Senior · Lead", engagement: "Hire on Demand · Dedicated · Permanent", focus: "Real-time streaming, medallion lakehouses, and governed ETL." },
  { title: "Cloud Architects", seniority: "Principal · Lead", engagement: "Hire on Demand · Employ Globally (EOR)", focus: "Multi-region cloud landing zones, FinOps, and high-availability design." },
  { title: "DevOps Engineers", seniority: "Senior · Principal", engagement: "Hire on Demand · Dedicated", focus: "Kubernetes orchestration, Terraform IaC, and CI/CD automation." },
  { title: "Solution Architects", seniority: "Principal · Staff", engagement: "Hire on Demand · Permanent", focus: "Enterprise system integration, domain-driven design, and technical governance." },
  { title: "QA Engineers", seniority: "Senior · Lead SDET", engagement: "Hire on Demand · Dedicated", focus: "Automated end-to-end test frameworks, load testing, and CI quality gates." },
  { title: "Engineering Managers", seniority: "Lead · Director", engagement: "Hire Permanently · Dedicated Pod Lead", focus: "Agile delivery governance, technical mentorship, and stakeholder alignment." },
];

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  onNavigate,
  onOpenRequirementModal,
}) => {
  const [browseMode, setBrowseMode] =
    useState<(typeof BROWSE_MODES)[number]>("Browse by Talent");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedEngagement, setSelectedEngagement] = useState<string>("All");

  const filteredProfiles = SAMPLE_TALENT_PROFILES.filter((profile) => {
    const matchesCategory =
      selectedCategory === "All" || profile.category === selectedCategory;
    const matchesEngagement =
      selectedEngagement === "All" ||
      profile.engagementOptions.some((opt) =>
        opt.toLowerCase().includes(selectedEngagement.toLowerCase())
      );
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      profile.roleTitle.toLowerCase().includes(q) ||
      profile.primarySkills.some((s) => s.toLowerCase().includes(q)) ||
      profile.secondarySkills.some((s) => s.toLowerCase().includes(q)) ||
      profile.category.toLowerCase().includes(q);

    return matchesCategory && matchesEngagement && matchesQuery;
  });

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="text-xs font-mono text-blue-600">
                PRIMARY NAVIGATION · DISCOVER TALENT ECOSYSTEM
              </div>
              <h1
                className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900"
                style={{ textWrap: "balance" }}
              >
                Explore Pre-Vetted Global Technology Talent by Skill, Role, or Industry.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Browse technology specializations, engineering roles, and verified demonstration profiles—or use Lens AI below to parse a natural-language hiring brief into a custom shortlist.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() =>
                  onOpenRequirementModal({
                    sourcePage: "Discover Talent Page",
                    inquiryType: "Custom Talent Discovery Request",
                  })
                }
                className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Explore Talent &amp; Submit Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Subpage Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl overflow-x-auto">
            {BROWSE_MODES.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setBrowseMode(mode)}
                className={`px-4 py-2.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  browseMode === mode
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC BROWSE SECTION */}
      <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          {/* Transparent Sample Data Disclosure */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                Sample Profile Disclosure:{" "}
              </span>
              Profiles displayed below are clearly labeled sample demonstration profiles illustrating RapidBrains&apos; vetting structure and skill taxonomy. Live candidate shortlists are generated specifically for your verified requirement.
            </div>
            <span className="text-xs font-mono text-blue-600 shrink-0">
              {SAMPLE_TALENT_PROFILES.length} Sample Archetypes Indexed
            </span>
          </div>

          {browseMode === "Browse by Technology" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Browse by Technology Specialization (11 Core Domains)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {TECHNOLOGIES.map((tech, idx) => (
                  <div
                    key={tech.name}
                    className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono text-blue-600">
                        {String(idx + 1).padStart(2, "0")} · Technology Stack
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {tech.name}
                      </h3>
                      <div className="text-xs text-slate-500">{tech.roles}</div>
                      <div className="pt-2 text-xs font-medium text-slate-800">
                        {tech.skills}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenRequirementModal({
                          sourcePage: "Discover — Browse by Technology",
                          inquiryType: `Technology Requirement: ${tech.name}`,
                          roleOrTech: `${tech.name} (${tech.skills})`,
                        })
                      }
                      className="pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Request {tech.name} Specialists</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {browseMode === "Browse by Role" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Browse by Engineering &amp; Architecture Role
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {ROLES_CATALOG.map((role, idx) => (
                  <div
                    key={role.title}
                    className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                        <span>Role {String(idx + 1).padStart(2, "0")}</span>
                        <span>{role.seniority}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {role.title}
                      </h3>
                      <p className="text-sm text-slate-600">{role.focus}</p>
                      <div className="text-xs text-slate-500 pt-1">
                        Available via: {role.engagement}
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setBrowseMode("Browse by Talent");
                          setSearchQuery(role.title.split(" ")[0]);
                        }}
                        className="text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                      >
                        Filter Sample Profiles
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenRequirementModal({
                            sourcePage: "Discover — Browse by Role",
                            inquiryType: `Role Requirement: ${role.title}`,
                            roleOrTech: role.title,
                          })
                        }
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Hire {role.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(browseMode === "Browse by Expertise" ||
            browseMode === "Browse by Industry") && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {browseMode === "Browse by Expertise"
                  ? "Browse by Architectural & Domain Expertise"
                  : "Browse by Industry Vertical"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "High-Throughput Cloud & Distributed Systems",
                    meta: "Microservices · Event-Driven Kafka · Multi-Region Kubernetes",
                    desc: "Senior architects experienced in zero-downtime cloud migrations, distributed consensus, and high-concurrency API design.",
                  },
                  {
                    title: "Enterprise Generative AI, RAG & RLHF Evaluation",
                    meta: "LLM Orchestration · Guardrails · Clinical & Legal Evaluators",
                    desc: "Combine applied AI engineers with verified medical, legal, and STEM domain specialists for post-training and evaluation.",
                  },
                  {
                    title: "Modern Data Lakehouse & Real-Time Analytics",
                    meta: "Snowflake · Apache Spark · dbt · Governed Data Lineage",
                    desc: "Data platform engineers who unify fragmented enterprise data into query-optimized, compliant analytical stores.",
                  },
                  {
                    title: "Regulated Healthcare, Biotech & Automotive Software",
                    meta: "HIPAA-Aware · Bioinformatics · Embedded Mobility Telemetry",
                    desc: "Domain-grounded engineering squads familiar with strict audit trails, validation protocols, and safety-critical systems.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl border border-slate-200 p-7 space-y-4"
                  >
                    <div className="text-xs font-mono text-blue-600">
                      {item.meta}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenRequirementModal({
                          sourcePage: `Discover — ${browseMode}`,
                          inquiryType: item.title,
                          roleOrTech: item.meta,
                        })
                      }
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer pt-2"
                    >
                      <span>Discuss This Expertise</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Always Show Interactive Sample Talent Filter & Explorer */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Sample Talent Archetypes ({filteredProfiles.length})
              </h2>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter by skill (e.g. Python, AWS, RAG)..."
                    className="pl-9 pr-4 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-800"
                >
                  <option value="All">All Categories</option>
                  <option value="Developers">Developers</option>
                  <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
                  <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                  <option value="Data Engineering">Data Engineering</option>
                  <option value="Software Architecture">Software Architecture</option>
                  <option value="Quality Engineering">Quality Engineering</option>
                  <option value="Domain Experts">Domain Experts</option>
                </select>

                <select
                  value={selectedEngagement}
                  onChange={(e) => setSelectedEngagement(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-800"
                >
                  <option value="All">All Engagement Models</option>
                  <option value="Hourly">Hire on Demand (Hourly)</option>
                  <option value="Dedicated">Dedicated Team</option>
                  <option value="Permanent">Permanent</option>
                  <option value="EOR">Employ Globally (EOR)</option>
                </select>
              </div>
            </div>

            {filteredProfiles.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
                <div className="text-sm font-semibold text-slate-900">
                  No sample profiles matched your current filter combination.
                </div>
                <p className="text-xs text-slate-500">
                  Reset the filters or describe your custom skill combination in the Lens AI Workbench below.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedEngagement("All");
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-medium cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500">
                        <span>{profile.code}</span>
                        <span>
                          {profile.category} · {profile.yearsExperience} yrs ·{" "}
                          {profile.hourlyIndicativeRange}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">
                        {profile.roleTitle}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {profile.architectureHighlight}
                      </p>

                      <div className="text-xs text-slate-700 space-y-1 pt-1">
                        <div>
                          <span className="font-semibold text-slate-900">
                            Primary Skills:{" "}
                          </span>
                          {profile.primarySkills.join(" · ")}
                        </div>
                        <div className="text-slate-500">
                          <span className="font-medium text-slate-700">
                            Secondary:{" "}
                          </span>
                          {profile.secondarySkills.join(" · ")}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                        <span className="font-semibold text-slate-800">
                          Technical Screening Summary:{" "}
                        </span>
                        {profile.vettingSummary}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs text-slate-500">
                        {profile.timezone} · {profile.engagementOptions.join(" / ")}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenRequirementModal({
                            sourcePage: "Discover Page Sample Card",
                            inquiryType: `Shortlist Request Matching ${profile.id}`,
                            roleOrTech: `${profile.roleTitle} (${profile.primarySkills.join(", ")})`,
                            engagementModel: profile.engagementOptions[0],
                          })
                        }
                        className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Request Shortlist</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EMBEDDED LENS AI WORKBENCH FOR NATURAL-LANGUAGE DISCOVERY */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono text-blue-600">
              AI-ASSISTED DISCOVERY
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Don&apos;t Want to Filter Manually? Describe Your Requirement to Lens AI.
            </h2>
          </div>

          <LensAIWorkbench
            onNavigate={onNavigate}
            onOpenRequirementModal={(prefill) =>
              onOpenRequirementModal({
                ...prefill,
                sourcePage: "Discover Page Lens AI",
              })
            }
            variant="light"
          />
        </div>
      </section>
    </div>
  );
};
