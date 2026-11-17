export type PageId =
  | "home"
  | "discover"
  | "solution-hire-on-demand"
  | "solution-dedicated-teams"
  | "solution-hire-permanently"
  | "solution-employ-globally"
  | "solution-domain-experts-ai"
  | "product-lens-ai"
  | "product-rapid-hire"
  | "process"
  | "businesses"
  | "insights"
  | "strategy-blueprint";

export interface SampleTalentProfile {
  id: string;
  code: string;
  roleTitle: string;
  category:
    | "Developers"
    | "AI & Machine Learning"
    | "Cloud & DevOps"
    | "Data Engineering"
    | "Software Architecture"
    | "Quality Engineering"
    | "Domain Experts";
  seniority: "Senior" | "Staff" | "Principal" | "Lead";
  yearsExperience: number;
  timezone: string;
  engagementOptions: string[];
  primarySkills: string[];
  secondarySkills: string[];
  vettingSummary: string;
  architectureHighlight: string;
  hourlyIndicativeRange: string;
}

export const SAMPLE_TALENT_PROFILES: SampleTalentProfile[] = [
  {
    id: "RB-SMP-101",
    code: "Sample Profile · RB-SMP-101",
    roleTitle: "Senior Python & Distributed Systems Engineer",
    category: "Developers",
    seniority: "Senior",
    yearsExperience: 8,
    timezone: "UTC+1 / UTC-5 Overlap",
    engagementOptions: ["Hire on Demand (Hourly)", "Dedicated Team", "Permanent"],
    primarySkills: ["Python", "FastAPI", "AWS", "Apache Kafka", "PostgreSQL"],
    secondarySkills: ["Kubernetes", "Redis", "Docker", "PyTest", "gRPC"],
    vettingSummary:
      "Evaluated on high-throughput event-driven microservices, async Python concurrency, and multi-region AWS architecture.",
    architectureHighlight:
      "Designed low-latency ingestion pipelines handling 45,000 events/sec with deterministic idempotency.",
    hourlyIndicativeRange: "$45 – $65 / hr",
  },
  {
    id: "RB-SMP-102",
    code: "Sample Profile · RB-SMP-102",
    roleTitle: "Staff AI / LLM & RAG Systems Architect",
    category: "AI & Machine Learning",
    seniority: "Staff",
    yearsExperience: 9,
    timezone: "UTC+0 / UTC-5 Overlap",
    engagementOptions: ["Hire on Demand (Hourly)", "Dedicated Team"],
    primarySkills: ["PyTorch", "Retrieval-Augmented Generation", "Python", "Vector DBs", "vLLM"],
    secondarySkills: ["AWS Bedrock", "LangGraph", "Evaluation Rubrics", "ONNX", "CUDA"],
    vettingSummary:
      "Assessed on enterprise RAG retrieval precision, hallucination guardrails, latency optimization, and embedding pipelines.",
    architectureHighlight:
      "Built hybrid semantic + lexical retrieval engines with automated citation verification for enterprise knowledge bases.",
    hourlyIndicativeRange: "$65 – $90 / hr",
  },
  {
    id: "RB-SMP-103",
    code: "Sample Profile · RB-SMP-103",
    roleTitle: "Principal Cloud & DevOps Platform Engineer",
    category: "Cloud & DevOps",
    seniority: "Principal",
    yearsExperience: 10,
    timezone: "UTC+2 / UTC-4 Overlap",
    engagementOptions: ["Hire on Demand (Hourly)", "Dedicated Team", "Employ Globally (EOR)"],
    primarySkills: ["AWS", "Terraform", "Kubernetes (EKS)", "Go", "GitHub Actions"],
    secondarySkills: ["ArgoCD", "Prometheus", "OpenTelemetry", "SOC2 Compliance", "Istio"],
    vettingSummary:
      "Verified on multi-account AWS landing zones, GitOps infrastructure-as-code, and zero-downtime cluster upgrades.",
    architectureHighlight:
      "Automated multi-region Kubernetes platform provisioning reducing environment setup time from 3 weeks to 40 minutes.",
    hourlyIndicativeRange: "$60 – $85 / hr",
  },
  {
    id: "RB-SMP-104",
    code: "Sample Profile · RB-SMP-104",
    roleTitle: "Senior Full-Stack TypeScript & Systems Architect",
    category: "Software Architecture",
    seniority: "Senior",
    yearsExperience: 7,
    timezone: "UTC+5:30 / EU & US Morning Overlap",
    engagementOptions: ["Hire on Demand (Hourly)", "Dedicated Team", "Permanent"],
    primarySkills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"],
    secondarySkills: ["GraphQL", "Tailwind CSS", "Playwright", "Redis", "DDD Architecture"],
    vettingSummary:
      "Screened on web core vitals optimization, accessible design system engineering, and resilient B2B API contracts.",
    architectureHighlight:
      "Architected modular multi-tenant SaaS workspaces supporting 120,000 concurrent enterprise sessions.",
    hourlyIndicativeRange: "$40 – $60 / hr",
  },
  {
    id: "RB-SMP-105",
    code: "Sample Profile · RB-SMP-105",
    roleTitle: "Lead Data & Lakehouse Platform Engineer",
    category: "Data Engineering",
    seniority: "Lead",
    yearsExperience: 8,
    timezone: "UTC+1 / US East Overlap",
    engagementOptions: ["Hire on Demand (Hourly)", "Dedicated Team", "Permanent"],
    primarySkills: ["Apache Spark", "Snowflake", "dbt", "Apache Airflow", "Python"],
    secondarySkills: ["Delta Lake", "Terraform", "Great Expectations", "Kafka", "SQL"],
    vettingSummary:
      "Tested on medallion lakehouse modeling, cost-governed Snowflake compute partitioning, and automated data lineage.",
    architectureHighlight:
      "Consolidated 18 fragmented data silos into a unified governed lakehouse with real-time SLA monitoring.",
    hourlyIndicativeRange: "$50 – $72 / hr",
  },
  {
    id: "RB-SMP-106",
    code: "Sample Profile · RB-SMP-106",
    roleTitle: "Clinical & Biomedical AI Evaluation Specialist (MD / MSc)",
    category: "Domain Experts",
    seniority: "Lead",
    yearsExperience: 7,
    timezone: "Global Asynchronous & Live Review",
    engagementOptions: ["Domain Experts for AI", "Hire on Demand (Hourly)"],
    primarySkills: ["RLHF Rubric Design", "Clinical Model Evaluation", "Medical Red-Teaming", "Expert Annotation"],
    secondarySkills: ["ICD-10 / SNOMED Taxonomy", "Chain-of-Thought Auditing", "Hallucination Triage"],
    vettingSummary:
      "Verified medical domain credentials paired with calibration testing on clinical reasoning LLM outputs.",
    architectureHighlight:
      "Authored gold-standard multi-turn clinical reasoning datasets and safety red-teaming protocols for frontier healthcare models.",
    hourlyIndicativeRange: "$70 – $110 / hr",
  },
  {
    id: "RB-SMP-107",
    code: "Sample Profile · RB-SMP-107",
    roleTitle: "Senior Mobile & Offline-First Systems Engineer",
    category: "Developers",
    seniority: "Senior",
    yearsExperience: 6,
    timezone: "UTC+5:30 / UK & EU Overlap",
    engagementOptions: ["Hire on Demand (Hourly)", "Dedicated Team"],
    primarySkills: ["React Native", "Swift", "Kotlin", "TypeScript", "SQLite / CRDTs"],
    secondarySkills: ["GraphQL", "Fastlane", "Biometric Auth", "WebRTC", "Perfetto"],
    vettingSummary:
      "Evaluated on native bridge performance, 60fps UI rendering, and conflict-free offline synchronization.",
    architectureHighlight:
      "Engineered field-operations mobile apps operating seamlessly across zero-connectivity industrial environments.",
    hourlyIndicativeRange: "$38 – $55 / hr",
  },
  {
    id: "RB-SMP-108",
    code: "Sample Profile · RB-SMP-108",
    roleTitle: "Senior QA Automation & Performance SDET Lead",
    category: "Quality Engineering",
    seniority: "Senior",
    yearsExperience: 7,
    timezone: "UTC+2 / US & EU Overlap",
    engagementOptions: ["Hire on Demand (Hourly)", "Dedicated Team", "Permanent"],
    primarySkills: ["Playwright", "Cypress", "k6 Load Testing", "TypeScript", "Python"],
    secondarySkills: ["Contract Testing (Pact)", "GitHub Actions", "OWASP ZAP", "Docker"],
    vettingSummary:
      "Assessed on deterministic end-to-end test architecture, shift-left CI pipelines, and high-concurrency stress testing.",
    architectureHighlight:
      "Reduced production regression escapes by 78% by embedding parallelized Playwright and contract suites into PR gates.",
    hourlyIndicativeRange: "$35 – $52 / hr",
  },
];

export interface SolutionPageData {
  id: PageId;
  slug: string;
  navLabel: string;
  kicker: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  inquiryType: string;
  defaultEngagementModel: string;
  commercialNote: string;
  keyCapabilities: {
    number: string;
    title: string;
    description: string;
    deliverable: string;
  }[];
  businessBenefits: {
    metricLabel: string;
    title: string;
    detail: string;
  }[];
  useCases: {
    scenario: string;
    rolesInvolved: string;
    outcome: string;
  }[];
  workflowSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  seoMeta: {
    title: string;
    description: string;
    targetKeywords: string[];
  };
}

export const SOLUTIONS_DATA: Record<string, SolutionPageData> = {
  "solution-hire-on-demand": {
    id: "solution-hire-on-demand",
    slug: "/solutions/hire-on-demand",
    navLabel: "Hire on Demand",
    kicker: "Primary Commercial Offering · Contract Technology Staffing",
    headline: "Engage Pre-Vetted Contract Developers on Flexible Hourly Terms.",
    subheadline:
      "Scale your engineering capacity up or down without long-term lock-ins. Discover remote software developers, AI specialists, cloud architects, and data engineers ready to integrate directly into your sprint workflows.",
    primaryCta: "Find Developers",
    secondaryCta: "Submit Your Requirement",
    inquiryType: "Contract Developer Requirement",
    defaultEngagementModel: "Hire on Demand (Hourly Contract)",
    commercialNote:
      "Flexible hourly billing arrangements with transparent timesheets, adaptable contract durations, and full compliance handled by RapidBrains.",
    keyCapabilities: [
      {
        number: "01",
        title: "Hourly Developer Engagement",
        description:
          "Engage senior engineers on transparent hourly billing arrangements tailored to your active sprint velocity and product roadmap.",
        deliverable: "Verified weekly timesheets & sprint-aligned billing",
      },
      {
        number: "02",
        title: "Flexible Contract Duration",
        description:
          "From targeted 3-month feature accelerations to multi-year engineering extensions—adjust duration as your business priorities evolve.",
        deliverable: "Modular contract terms with straightforward extension options",
      },
      {
        number: "03",
        title: "Technology-Specific Sourcing via Lens AI",
        description:
          "Match exact framework, cloud infrastructure, and domain combinations across 50+ engineering specializations.",
        deliverable: "Curated shortlist with technical evaluation scorecards",
      },
      {
        number: "04",
        title: "Zero Administrative Overhead",
        description:
          "RapidBrains manages contractor agreements, statutory compliance, NDA enforcement, and global payouts under a single consolidated invoice.",
        deliverable: "Single master services agreement (MSA)",
      },
    ],
    businessBenefits: [
      {
        metricLabel: "48–72 Hours",
        title: "Rapid Shortlist Delivery",
        detail:
          "Receive pre-screened developer profiles matched to your technical stack and timezone overlap within days, not months.",
      },
      {
        metricLabel: "100% Remote Ready",
        title: "Seamless Workflow Integration",
        detail:
          "Engineers join your GitHub, Jira, Linear, and Slack channels immediately, adhering to your code review and security standards.",
      },
      {
        metricLabel: "Elastic Scale",
        title: "Convert or Scale Anytime",
        detail:
          "Add specialist capacity for critical releases or transition high-performing contractors into dedicated pods.",
      },
    ],
    useCases: [
      {
        scenario: "Accelerating Core Product Roadmap",
        rolesInvolved: "2 Senior React/TypeScript Engineers + 1 Python/FastAPI Backend Engineer",
        outcome:
          "Shipped enterprise analytics module 6 weeks ahead of schedule without overloading internal core teams.",
      },
      {
        scenario: "Cloud Migration & Kubernetes Modernization",
        rolesInvolved: "2 Principal AWS & Terraform DevOps Engineers",
        outcome:
          "Completed zero-downtime migration to multi-region EKS with automated GitOps pipelines over a 4-month contract.",
      },
      {
        scenario: "Production GenAI & RAG Implementation",
        rolesInvolved: "1 Staff LLM Architect + 1 Senior Data Engineer",
        outcome:
          "Deployed grounded enterprise search with deterministic evaluation harness on a flexible 6-month engagement.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Share Your Technical Brief",
        description:
          "Define required tech stack, seniority level, timezone overlap, and expected contract duration using Lens AI or our solutions desk.",
      },
      {
        step: "02",
        title: "Review Vetted Developer Profiles",
        description:
          "Inspect structured assessment reports, architectural experience, and code evaluation results before selecting candidates to interview.",
      },
      {
        step: "03",
        title: "Conduct Technical Alignment Call",
        description:
          "Host a focused interview with your engineering lead to confirm technical depth and team culture alignment.",
      },
      {
        step: "04",
        title: "Onboard & Track Hourly Delivery",
        description:
          "Complete compliant onboarding in days. Manage timesheets, delivery milestones, and consolidated billing through RapidBrains.",
      },
    ],
    faqs: [
      {
        question: "How does hourly billing work for Hire on Demand developers?",
        answer:
          "You are billed only for verified hours worked based on approved weekly or bi-weekly timesheets, with clear rate cards agreed upfront per role and seniority.",
      },
      {
        question: "What is the minimum contract duration?",
        answer:
          "We support both short-term specialist engagements (starting from 1 to 3 months) and long-term rolling engineering contracts.",
      },
      {
        question: "Who owns the intellectual property (IP) created by contract developers?",
        answer:
          "100% of intellectual property, source code, and documentation created during the engagement is assigned directly to your organization under our Master Services Agreement.",
      },
    ],
    seoMeta: {
      title: "Hire Remote Contract Developers on Demand | RapidBrains",
      description:
        "Hire pre-vetted remote contract developers on flexible hourly arrangements. Scale engineering capacity with Python, React, AI/ML, and Cloud specialists.",
      targetKeywords: [
        "hire remote developers",
        "hire contract developers",
        "hourly developers",
        "IT staff augmentation",
        "remote software developers",
      ],
    },
  },
  "solution-dedicated-teams": {
    id: "solution-dedicated-teams",
    slug: "/solutions/dedicated-teams",
    navLabel: "Dedicated Teams",
    kicker: "Managed Engineering Pods · Long-Term Delivery",
    headline: "Build Cohesive Dedicated Engineering Teams Aligned to Your Product Vision.",
    subheadline:
      "Assemble full-lifecycle software engineering squads—combining frontend, backend, cloud, QA, and technical leadership—configured exclusively around your architecture and release cadence.",
    primaryCta: "Build Your Team",
    secondaryCta: "Talk to Our Team",
    inquiryType: "Dedicated Engineering Team Inquiry",
    defaultEngagementModel: "Dedicated Engineering Team",
    commercialNote:
      "Predictable monthly pod retainers covering talent compensation, workspace infrastructure, retention programs, and operational governance.",
    keyCapabilities: [
      {
        number: "01",
        title: "Custom Squad Topology",
        description:
          "Configure balanced pods featuring Tech Leads, Senior Full-Stack Engineers, DevOps Specialists, and QA Automation SDETs.",
        deliverable: "Tailored team blueprint & role matrix",
      },
      {
        number: "02",
        title: "Dedicated Institutional Knowledge Retention",
        description:
          "Engineers work 100% exclusively on your codebase and product domain, building deep long-term architectural context.",
        deliverable: "100% dedicated allocation with zero context switching",
      },
      {
        number: "03",
        title: "Integrated Engineering Governance",
        description:
          "Align sprint ceremonies, DORA metrics, security protocols, and release gates directly with your VP of Engineering or CTO.",
        deliverable: "Bi-weekly delivery health & velocity reviews",
      },
      {
        number: "04",
        title: "Modular Pod Expansion",
        description:
          "Seamlessly add specialized AI, data, or security engineers to your core pod as new product tracks emerge.",
        deliverable: "Elastic pod scaling protocol",
      },
    ],
    businessBenefits: [
      {
        metricLabel: "Cross-Functional",
        title: "Pre-Aligned Engineering Squads",
        detail:
          "Eliminate the friction of hiring individual roles sequentially; launch an entire cohesive squad in parallel.",
      },
      {
        metricLabel: "Direct Control",
        title: "Your Roadmap, Your Ceremonies",
        detail:
          "Maintain full technical direction and architectural authority while RapidBrains handles HR, payroll, and retention.",
      },
      {
        metricLabel: "Long-Term Stability",
        title: "High Engineer Retention",
        detail:
          "Structured career progression and dedicated account support keep your extended engineering team stable over multi-year horizons.",
      },
    ],
    useCases: [
      {
        scenario: "New SaaS Platform Vertical Launch",
        rolesInvolved: "1 Solution Architect, 3 Full-Stack Engineers, 1 DevOps, 1 QA SDET",
        outcome:
          "Delivered multi-tenant enterprise SaaS platform from architecture to GA release in 5 months.",
      },
      {
        scenario: "Dedicated R&D Offshore Engineering Hub",
        rolesInvolved: "12-Engineer Multi-Pod Setup (Core API, Data Platform, Mobile)",
        outcome:
          "Established a permanent extended engineering center operating in lockstep with headquarters.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Architecture & Topology Workshop",
        description:
          "Map your product roadmap, technical stack, and velocity goals into an optimal squad structure.",
      },
      {
        step: "02",
        title: "Parallel Role Sourcing & Vetting",
        description:
          "Lens AI and our principal recruiters shortlist every pod role simultaneously with collaborative technical interviews.",
      },
      {
        step: "03",
        title: "Environment, Security & Sprint Onboarding",
        description:
          "Provision secure hardware, VPN/zero-trust access, and repository permissions across the entire team.",
      },
      {
        step: "04",
        title: "Continuous Delivery & Pod Optimization",
        description:
          "Track velocity, code quality, and team health with dedicated operational management.",
      },
    ],
    faqs: [
      {
        question: "How is a Dedicated Team different from traditional project outsourcing?",
        answer:
          "Unlike black-box project outsourcing, a RapidBrains Dedicated Team works transparently inside your repositories, tools, and engineering culture under your technical leadership.",
      },
      {
        question: "Can we interview every member of the dedicated team?",
        answer:
          "Yes. You have full final approval on every engineer, architect, and QA specialist joining your dedicated squad.",
      },
    ],
    seoMeta: {
      title: "Dedicated Software Development Teams | RapidBrains",
      description:
        "Build and scale dedicated engineering teams for long-term software development. Custom cross-functional squads aligned with your product roadmap.",
      targetKeywords: [
        "dedicated development teams",
        "dedicated software engineering team",
        "extended engineering team",
        "global talent platform",
      ],
    },
  },
  "solution-hire-permanently": {
    id: "solution-hire-permanently",
    slug: "/solutions/hire-permanently",
    navLabel: "Hire Permanently",
    kicker: "Full-Time Technology & Leadership Recruitment",
    headline: "Recruit Exceptional Full-Time Engineers and Technical Leaders.",
    subheadline:
      "Build your permanent in-house core team with precision. We combine AI-powered talent intelligence with deep technical screening to source, evaluate, and close high-impact full-time hires.",
    primaryCta: "Hire Permanently",
    secondaryCta: "Submit Permanent Role Brief",
    inquiryType: "Permanent Recruitment Requirement",
    defaultEngagementModel: "Permanent Placement",
    commercialNote:
      "Transparent success-aligned permanent recruitment framework with comprehensive candidate evaluation and replacement assurance.",
    keyCapabilities: [
      {
        number: "01",
        title: "Deep Technical Headhunting",
        description:
          "Reach passive senior engineers, staff architects, and AI researchers who never apply on public job boards.",
        deliverable: "Targeted market mapping & passive outreach",
      },
      {
        number: "02",
        title: "Practitioner-Led Technical Screening",
        description:
          "Every candidate undergoes domain-specific coding, system design, and architectural evaluation before reaching your hiring managers.",
        deliverable: "Verified technical scorecard per candidate",
      },
      {
        number: "03",
        title: "Leadership & Specialist Search",
        description:
          "Recruit Engineering Managers, Principal Architects, Heads of AI, and foundational startup engineers.",
        deliverable: "Executive & specialist evaluation dossier",
      },
      {
        number: "04",
        title: "Offer Management & Onboarding Support",
        description:
          "We manage compensation benchmarking, candidate expectations, notice period navigation, and post-offer engagement.",
        deliverable: "High offer-acceptance & retention assurance",
      },
    ],
    businessBenefits: [
      {
        metricLabel: "High Signal-to-Noise",
        title: "Zero Unvetted Resume Flooding",
        detail:
          "Your engineering leaders only interview candidates who have already passed technical and role-fit validation.",
      },
      {
        metricLabel: "Transparent Terms",
        title: "Success-Aligned Commercial Model",
        detail:
          "Structured permanent placement model designed for long-term hiring value without inflated executive search retainers.",
      },
      {
        metricLabel: "EOR Bridge Option",
        title: "Hire Locally or Internationally",
        detail:
          "Hire directly into your local entity or pair with RapidBrains EOR to employ full-time talent in countries where you lack an entity.",
      },
    ],
    useCases: [
      {
        scenario: "Foundational AI Engineering Team Buildout",
        rolesInvolved: "Head of AI + 3 Senior Applied ML Engineers",
        outcome:
          "Completed full-time hiring for a Series B SaaS company within 6 weeks with 100% 12-month retention.",
      },
      {
        scenario: "Core Platform Modernization Leadership",
        rolesInvolved: "Principal Distributed Systems Architect + Staff Security Engineer",
        outcome:
          "Placed full-time technical leaders following rigorous system design and architectural vetting.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Role Calibration & Competency Mapping",
        description:
          "Define technical bar, architectural challenges, compensation bands, and cultural attributes.",
      },
      {
        step: "02",
        title: "AI Sourcing & Technical Assessment",
        description:
          "Lens AI identifies high-propensity talent while domain assessors verify practical engineering capability.",
      },
      {
        step: "03",
        title: "Structured Hiring Manager Interviews",
        description:
          "Receive a curated shortlist in Rapid Hire with full assessment transcripts and interview coordination.",
      },
      {
        step: "04",
        title: "Offer Closing & Integration",
        description:
          "Navigate offer negotiation, background verification, and smooth transition into your permanent workforce.",
      },
    ],
    faqs: [
      {
        question: "How do you screen permanent technology candidates?",
        answer:
          "Candidates complete structured technical evaluations tailored to the role—covering system design, live code review, domain architecture, and communication clarity.",
      },
      {
        question: "What if we want to hire a full-time candidate in a country where we don't have a legal entity?",
        answer:
          "You can seamlessly combine Permanent Recruitment with our Employ Globally (EOR) service so we become the legal Employer of Record while the professional works full-time for you.",
      },
    ],
    seoMeta: {
      title: "Permanent IT Recruitment & Executive Tech Hiring | RapidBrains",
      description:
        "Hire full-time software engineers, AI specialists, and engineering leaders. AI-powered talent sourcing and deep technical vetting.",
      targetKeywords: [
        "permanent IT recruitment",
        "technology recruitment",
        "hire full-time software engineers",
        "technical headhunting",
      ],
    },
  },
  "solution-employ-globally": {
    id: "solution-employ-globally",
    slug: "/solutions/employ-globally",
    navLabel: "Employ Globally",
    kicker: "Employer of Record (EOR) · Global Payroll & Compliance",
    headline: "Employ International Talent Compliantly Without Local Entities.",
    subheadline:
      "Expand your workforce across borders without the cost, delay, or legal complexity of incorporating foreign subsidiaries. RapidBrains acts as your compliant Employer of Record—managing local employment contracts, statutory benefits, tax withholdings, and multi-currency payroll.",
    primaryCta: "Hire Globally",
    secondaryCta: "Explore Global Employment",
    inquiryType: "Employer of Record (EOR) & Global Payroll Inquiry",
    defaultEngagementModel: "Employer of Record (EOR)",
    commercialNote:
      "Transparent monthly EOR management structure subject to applicable country employment regulations, statutory social contributions, and local labor laws.",
    keyCapabilities: [
      {
        number: "01",
        title: "Compliant Employer of Record (EOR)",
        description:
          "Hire full-time international employees through RapidBrains' established legal infrastructure while retaining full day-to-day operational direction.",
        deliverable: "Locally compliant employment contracts & statutory onboarding",
      },
      {
        number: "02",
        title: "Multi-Currency Global Payroll",
        description:
          "Fund payroll in your primary operating currency while RapidBrains executes accurate, on-time local-currency salary disbursements, tax filings, and payslips.",
        deliverable: "Consolidated monthly payroll invoice & automated local payouts",
      },
      {
        number: "03",
        title: "Statutory Benefits & Local HR Administration",
        description:
          "Administer mandatory health insurance, pension contributions, paid leave tracking, and local statutory compliance.",
        deliverable: "Country-specific benefits & leave compliance",
      },
      {
        number: "04",
        title: "International Contractor Management & Misclassification Shield",
        description:
          "Onboard independent contractors globally or convert long-term contractors to compliant EOR employees to mitigate misclassification risk.",
        deliverable: "Worker classification audit & compliant transition",
      },
    ],
    businessBenefits: [
      {
        metricLabel: "Zero Entity Setup",
        title: "Bypass Foreign Incorporation Delays",
        detail:
          "Onboard international employees in days rather than spending 6–12 months and significant legal capital establishing a local entity.",
      },
      {
        metricLabel: "Regulatory Clarity",
        title: "Country-Specific Labor Law Alignment",
        detail:
          "Employment agreements, IP assignment clauses, notice periods, and statutory filings are tailored to local jurisdiction rules.",
      },
      {
        metricLabel: "Unified Platform",
        title: "Sourcing + EOR in One Ecosystem",
        detail:
          "Unlike standalone EOR software, RapidBrains can both source the talent AND employ them compliantly on your behalf.",
      },
    ],
    useCases: [
      {
        scenario: "International Engineering Expansion Without Local Subsidiary",
        rolesInvolved: "8 Full-Time Engineers Employed via RapidBrains EOR",
        outcome:
          "Enabled a US-based enterprise to employ specialized engineering talent abroad with full statutory compliance and single-currency invoicing.",
      },
      {
        scenario: "Contractor-to-Employee Misclassification Remediation",
        rolesInvolved: "5 Long-Term Remote Contractors Transitioned to EOR",
        outcome:
          "Eliminated permanent establishment and misclassification exposure while providing full statutory employee benefits.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Jurisdiction & Compensation Structuring",
        description:
          "Review country-specific employer statutory costs, mandatory benefits, and local labor terms before issuing an offer.",
      },
      {
        step: "02",
        title: "Local Employment Contract & IP Execution",
        description:
          "Generate bilingual/local-law employment contracts with ironclad intellectual property and confidentiality protections.",
      },
      {
        step: "03",
        title: "Statutory Registration & Benefits Enrollment",
        description:
          "Complete tax authority registrations, social security enrollment, and background verification.",
      },
      {
        step: "04",
        title: "Ongoing Monthly Payroll & Lifecycle Support",
        description:
          "Approve a single monthly invoice while RapidBrains manages local salary payouts, tax withholdings, and HR support.",
      },
    ],
    faqs: [
      {
        question: "What does an Employer of Record (EOR) actually do?",
        answer:
          "An EOR serves as the official legal employer for tax, statutory benefits, and local labor law purposes in the talent's country of residence, while the employee works exclusively under your day-to-day management and product direction.",
      },
      {
        question: "Can RapidBrains employ talent we have already found ourselves?",
        answer:
          "Yes. You can bring your own selected candidates for RapidBrains to onboard and employ via EOR, or have us both recruit and employ the talent.",
      },
      {
        question: "Are EOR services subject to country-specific regulations?",
        answer:
          "Yes. All EOR engagements adhere strictly to applicable country labor regulations, statutory social security requirements, and duration rules.",
      },
    ],
    seoMeta: {
      title: "Employer of Record (EOR) & Global Payroll Services | RapidBrains",
      description:
        "Employ international talent without establishing a local entity. Compliant Employer of Record (EOR), global payroll, and contractor management.",
      targetKeywords: [
        "employer of record",
        "EOR services",
        "global payroll",
        "international contractor management",
        "employ remote talent globally",
      ],
    },
  },
  "solution-domain-experts-ai": {
    id: "solution-domain-experts-ai",
    slug: "/solutions/domain-experts-ai",
    navLabel: "Domain Experts for AI",
    kicker: "RLHF · Model Evaluation · Expert Red-Teaming",
    headline: "Subject-Matter Experts to Train, Evaluate, and Red-Team Frontier AI.",
    subheadline:
      "Frontier AI models require more than generic crowd-workers. Access verified clinicians, attorneys, PhDs, quantitative analysts, and staff software engineers for Reinforcement Learning from Human Feedback (RLHF), rubric-based evaluation, adversarial red-teaming, and high-precision domain annotation.",
    primaryCta: "Engage Domain Experts",
    secondaryCta: "Submit AI Evaluation Brief",
    inquiryType: "Domain Experts for AI / RLHF Requirement",
    defaultEngagementModel: "Domain Experts for AI",
    commercialNote:
      "Structured hourly or milestone-based domain expert cohorts with credential verification, inter-annotator calibration, and strict NDA data governance.",
    keyCapabilities: [
      {
        number: "01",
        title: "Reinforcement Learning from Human Feedback (RLHF)",
        description:
          "Multi-turn prompt creation, response ranking, preference tuning, and chain-of-thought critique by credentialed domain specialists.",
        deliverable: "Calibrated preference pairs & SFT datasets",
      },
      {
        number: "02",
        title: "Rubric-Driven AI Model Evaluation",
        description:
          "Systematic benchmarking of LLM accuracy, clinical/legal safety, reasoning fidelity, and domain hallucination rates.",
        deliverable: "Quantitative rubric scorecards & failure-mode taxonomy",
      },
      {
        number: "03",
        title: "Adversarial Red-Teaming & Safety Auditing",
        description:
          "Domain specialists probe models for high-risk medical advice, regulatory non-compliance, security vulnerabilities, and jailbreak vectors.",
        deliverable: "Structured red-team vulnerability & mitigation logs",
      },
      {
        number: "04",
        title: "Code & STEM Reasoning Annotation",
        description:
          "Senior software architects and STEM PhDs author complex repository-level coding tasks, unit test harnesses, and mathematical proofs.",
        deliverable: "Verified multi-file code execution benchmarks",
      },
    ],
    businessBenefits: [
      {
        metricLabel: "Verified Credentials",
        title: "Practicing Specialists, Not Generalist Crowd Pools",
        detail:
          "Every expert undergoes academic degree verification, professional license checks (MD, JD, CPA, PhD), and domain calibration tests.",
      },
      {
        metricLabel: "High Agreement",
        title: "Calibrated Inter-Annotator Quality",
        detail:
          "Multi-tier peer review and gold-set auditing ensure consistent, high-signal training and evaluation data.",
      },
      {
        metricLabel: "Flexible Cohorts",
        title: "Scale From 5 to 100+ Specialists",
        detail:
          "Deploy focused evaluation panels for specialized vertical models or larger multi-disciplinary cohorts.",
      },
    ],
    useCases: [
      {
        scenario: "Clinical Decision Support LLM Evaluation",
        rolesInvolved: "Cohort of 12 Licensed Physicians & Clinical Pharmacists",
        outcome:
          "Evaluated 4,500 multi-turn diagnostic reasoning traces, identifying critical contraindication edge cases prior to clinical pilot.",
      },
      {
        scenario: "Legal Contract Analysis & Regulatory Red-Teaming",
        rolesInvolved: "Cohort of 8 Corporate Attorneys & Compliance Specialists",
        outcome:
          "Created gold-standard clause extraction benchmarks and adversarial red-team prompts across US and EU regulatory frameworks.",
      },
      {
        scenario: "Repository-Scale Code Generation Post-Training",
        rolesInvolved: "20 Senior Python, Rust, and TypeScript Systems Engineers",
        outcome:
          "Authored complex debugging and refactoring traces with containerized test verification.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Domain Taxonomy & Rubric Specification",
        description:
          "Define target specialty credentials, evaluation rubrics, annotation guidelines, and data security protocols.",
      },
      {
        step: "02",
        title: "Credential Vetting & Calibration Batch",
        description:
          "Select verified specialists and execute a calibrated pilot batch to align inter-annotator agreement.",
      },
      {
        step: "03",
        title: "Managed Evaluation & RLHF Execution",
        description:
          "Experts execute annotation, ranking, or red-teaming workflows inside your platform or RapidBrains-managed workflows.",
      },
      {
        step: "04",
        title: "QA Audit & Dataset Delivery",
        description:
          "Lead domain reviewers audit outputs for reasoning depth and schema compliance before delivery.",
      },
    ],
    faqs: [
      {
        question: "What domains do your AI evaluation experts cover?",
        answer:
          "We provide verified specialists across Software Engineering, Medicine & Healthcare, Law & Regulatory Compliance, Finance & Accounting, Biotechnology, and core STEM disciplines.",
      },
      {
        question: "How do you verify the credentials of doctors, lawyers, and PhDs?",
        answer:
          "Every domain specialist undergoes primary-source credential verification, identity authentication, and a practical domain rubric calibration assessment before joining any AI evaluation cohort.",
      },
    ],
    seoMeta: {
      title: "Domain Experts for AI — RLHF, Model Evaluation & Red-Teaming | RapidBrains",
      description:
        "Access verified doctors, lawyers, PhDs, and senior engineers for RLHF, AI model evaluation, red-teaming, and expert data annotation.",
      targetKeywords: [
        "RLHF domain experts",
        "AI model evaluation experts",
        "AI red teaming specialists",
        "expert data annotation",
        "hire AI trainers",
      ],
    },
  },
};

export interface CompetitorBenchmark {
  company: string;
  url: string;
  roleInResearch: string;
  positioning: string;
  strengthsStudied: string[];
  rapidBrainsOpportunity: string;
}

export const COMPETITOR_BENCHMARKS: CompetitorBenchmark[] = [
  {
    company: "Braintrust",
    url: "https://www.usebraintrust.com/",
    roleInResearch: "Primary UI/UX & Talent Marketplace Reference",
    positioning: "User-owned talent network connecting enterprises with vetted tech & AI talent.",
    strengthsStudied: [
      "Intuitive talent discovery navigation by role, skill, and category",
      "Clean, high-trust profile cards with transparent skill verification",
      "Direct, conversion-oriented dual CTAs and enterprise proof architecture",
    ],
    rapidBrainsOpportunity:
      "Combine Braintrust's marketplace clarity with RapidBrains' broader full-lifecycle EOR, Permanent Recruitment, and Dedicated Team capabilities.",
  },
  {
    company: "Docket",
    url: "https://docket.io/",
    roleInResearch: "Whitespace, Editorial Typography & Layout Reference",
    positioning: "Modern AI workspace with disciplined B2B SaaS visual hierarchy.",
    strengthsStudied: [
      "Generous breathing room and rhythmic white/neutral section alternation",
      "Editorial typography with crisp geometric headings and comfortable line widths",
      "Uncluttered bento grids without overlapping decorative noise",
    ],
    rapidBrainsOpportunity:
      "Elevate RapidBrains above crowded IT staffing agency sites by adopting Docket's calm, spacious SaaS editorial discipline.",
  },
  {
    company: "Eightfold AI",
    url: "https://eightfold.ai/",
    roleInResearch: "AI Talent Intelligence & Interactive Visual Storytelling Reference",
    positioning: "Deep-learning talent intelligence platform for enterprise workforce management.",
    strengthsStudied: [
      "Dynamic skill-graph and capability matching visualizations",
      "Storytelling that positions AI as actionable workforce intelligence",
      "Clear articulation of skill adjacency and role recommendation engines",
    ],
    rapidBrainsOpportunity:
      "Position RapidBrains Lens AI as a live, interactive natural-language requirement parser and talent matching engine right on the platform.",
  },
  {
    company: "Toptal",
    url: "https://www.toptal.com/",
    roleInResearch: "Rigorous Vetting & Enterprise Quality Assurance Reference",
    positioning: "Exclusive network of vetted software developers, designers, and finance experts.",
    strengthsStudied: [
      "Clear communication of multi-stage screening methodology",
      "Enterprise-grade trust markers and structured category landing pages",
    ],
    rapidBrainsOpportunity:
      "Offer transparent vetting rigor alongside flexible engagement models (Contract, Dedicated Pods, Permanent, and Global EOR).",
  },
  {
    company: "Turing",
    url: "https://www.turing.com/",
    roleInResearch: "AI-Assisted Technical Screening & AI Data Services Reference",
    positioning: "AI-powered tech services and LLM training/talent platform.",
    strengthsStudied: [
      "Dual positioning across developer staffing and AI/RLHF domain experts",
      "Deep technical evaluation messaging for engineering leaders",
    ],
    rapidBrainsOpportunity:
      "Clearly segment 'Hire on Demand' (Contract Developers) and 'Domain Experts for AI' (RLHF/Evaluation) as distinct, navigable solutions.",
  },
  {
    company: "Uplers & Proxify",
    url: "https://www.uplers.com/ · https://proxify.io/",
    roleInResearch: "Global Hiring Segmentation & Conversion Journey Reference",
    positioning: "Streamlined remote tech hiring and developer matching platforms.",
    strengthsStudied: [
      "Frictionless requirement capture flows and role-specific landing pages",
      "Clear breakdown of hiring timelines and timezone coverage",
    ],
    rapidBrainsOpportunity:
      "Replace generic 'Contact Us' forms with contextual requirement briefs tailored to Contract, EOR, Permanent, or AI Expert needs.",
  },
];

export const INSIGHTS_ARTICLES = [
  {
    id: "ins-1",
    category: "Hiring Guides",
    title: "Contract vs. Dedicated Pods vs. EOR: Selecting the Right Global Engineering Model",
    readTime: "7 min read",
    date: "November 2026",
    summary:
      "An architectural framework for CTOs and VPs of Engineering evaluating when to deploy hourly contract specialists versus full cross-functional pods or Employer of Record arrangements.",
    keyTakeaways: [
      "Use Hire on Demand (hourly contract) for targeted sprint acceleration, specialized migrations, and elastic capacity.",
      "Choose Dedicated Teams when building long-term product verticals requiring shared institutional context.",
      "Deploy Employer of Record (EOR) when retaining full-time international specialists in jurisdictions without a local subsidiary.",
    ],
  },
  {
    id: "ins-2",
    category: "Whitepapers",
    title: "Inside Lens AI: How Natural-Language Requirement Parsing Reduces Time-to-Shortlist",
    readTime: "9 min read",
    date: "October 2026",
    summary:
      "How structured skill taxonomy extraction and practitioner-designed technical rubrics replace keyword-based resume screening.",
    keyTakeaways: [
      "Traditional job descriptions miss implicit architectural constraints such as throughput, compliance, and latency budgets.",
      "Lens AI decomposes natural-language briefs into weighted primary stack, system design depth, and timezone overlap requirements.",
      "Every AI match is paired with human technical validation before shortlist delivery.",
    ],
  },
  {
    id: "ins-3",
    category: "Case Studies",
    title: "Scaling Distributed Cloud & Data Engineering Across Three Continents Without Local Entities",
    readTime: "6 min read",
    date: "October 2026",
    summary:
      "How a high-growth B2B SaaS platform combined RapidBrains Contract Staffing and Global EOR to onboard 14 senior engineers across 4 timezones.",
    keyTakeaways: [
      "Started with 4 contract cloud engineers to complete AWS EKS modernization.",
      "Transitioned long-term core contributors into compliant EOR employment agreements.",
      "Consolidated multi-country compliance and billing into a single monthly operational workflow.",
    ],
  },
  {
    id: "ins-4",
    category: "Case Studies",
    title: "Deploying Credentialed Clinical & Legal Domain Experts for Enterprise LLM Red-Teaming",
    readTime: "8 min read",
    date: "September 2026",
    summary:
      "Structuring calibrated RLHF and rubric evaluation cohorts with licensed physicians and corporate attorneys to eliminate high-severity domain hallucinations.",
    keyTakeaways: [
      "Generalist annotation pools fail on nuanced clinical contraindications and multi-jurisdictional regulatory reasoning.",
      "RapidBrains assembled verified MD and JD cohorts with rigorous inter-annotator calibration.",
      "Delivered structured preference datasets and safety red-team taxonomies within a 4-week sprint.",
    ],
  },
  {
    id: "ins-5",
    category: "Knowledge Base",
    title: "Global Payroll & Statutory Compliance Checklist for Distributed Engineering Teams",
    readTime: "5 min read",
    date: "September 2026",
    summary:
      "Understanding intellectual property assignment, contractor misclassification safeguards, and statutory benefits administration in cross-border tech hiring.",
    keyTakeaways: [
      "Ensure local-law IP assignment clauses are executed prior to repository access.",
      "Evaluate contractor tenure and exclusivity rules in each country to prevent misclassification risk.",
      "Use EOR structures for long-term full-time international team members.",
    ],
  },
  {
    id: "ins-6",
    category: "Podcast",
    title: "Engineering Leadership Dispatch: Building AI-Native Product Teams in 2026",
    readTime: "28 min episode",
    date: "August 2026",
    summary:
      "A conversation on balancing core full-time architectural leadership with elastic specialist contract talent across AI, Data, and Platform Engineering.",
    keyTakeaways: [
      "Why smaller, senior-heavy squads outperform bloated engineering orgs.",
      "How to integrate external contract specialists into internal sprint culture seamlessly.",
      "Measuring engineering impact through delivery outcomes rather than headcount vanity.",
    ],
  },
];
