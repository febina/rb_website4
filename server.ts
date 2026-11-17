import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured. Please check the Settings > Secrets panel to ensure your API key is attached."
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

interface LeadSubmission {
  id: string;
  submittedAt: string;
  sourcePage: string;
  inquiryType: string;
  name: string;
  email: string;
  company: string;
  roleOrTech: string;
  teamSize: string;
  engagementModel: string;
  startDate: string;
  requirements: string;
}

const leadSubmissions: LeadSubmission[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "2mb" }));

  // SEO robots.txt & sitemap.xml
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(
      `User-agent: *\nAllow: /\nSitemap: https://www.rapidbrains.com/sitemap.xml\n`
    );
  });

  app.get("/sitemap.xml", (_req, res) => {
    const pages = [
      "",
      "discover",
      "solutions/hire-on-demand",
      "solutions/dedicated-teams",
      "solutions/hire-permanently",
      "solutions/employ-globally",
      "solutions/domain-experts-ai",
      "products/lens-ai",
      "products/rapid-hire",
      "process",
      "businesses",
      "insights",
      "strategy-blueprint",
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>https://www.rapidbrains.com/${p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === "" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
    res.type("application/xml").send(xml);
  });

  // 1. RapidBrains Lens AI — Natural-Language Talent Discovery & Requirement Extraction
  app.post("/api/lens-ai/analyze", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
        res.status(400).json({ error: "Please provide a natural-language hiring requirement." });
        return;
      }

      const ai = getGenAIClient();
      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: `Analyze the following client hiring requirement for RapidBrains Global Talent Platform and produce a structured hiring brief and sample profile match selection.

Client Requirement:
"${prompt.trim()}"

Available Verified Sample Profile IDs in the RapidBrains demonstration pool:
- "RB-SMP-101": Senior Python & Distributed Systems Engineer (Python, FastAPI, AWS, Kafka, Kubernetes, MLOps, 8 yrs exp)
- "RB-SMP-102": Staff AI / LLM & RAG Architect (PyTorch, LangChain, Vector DBs, Python, AWS Bedrock, Fine-tuning, 9 yrs exp)
- "RB-SMP-103": Principal Cloud & DevOps Platform Engineer (AWS, Terraform, Kubernetes, Go, CI/CD, Zero-Trust Security, 10 yrs exp)
- "RB-SMP-104": Senior Full-Stack TypeScript & React Architect (React, Next.js, Node.js, TypeScript, PostgreSQL, GraphQL, 7 yrs exp)
- "RB-SMP-105": Lead Data & Lakehouse Engineer (Apache Spark, Snowflake, dbt, Airflow, Python, Kafka, 8 yrs exp)
- "RB-SMP-106": AI Evaluation & RLHF Clinical/Legal Domain Lead (RLHF Rubric Design, Red-Teaming, Domain Annotation QA, 7 yrs exp)
- "RB-SMP-107": Senior Mobile & Cross-Platform Engineer (React Native, Swift, Kotlin, GraphQL, Offline-first Sync, 6 yrs exp)
- "RB-SMP-108": Senior QA Automation & SDET Lead (Playwright, Cypress, k6 Load Testing, Python, CI Quality Gates, 7 yrs exp)`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction:
            "You are RapidBrains Lens AI, the talent intelligence engine for RapidBrains. Parse natural-language hiring requests into structured hiring briefs, extract roles, skills, duration, location preferences, recommend the best RapidBrains engagement model (Hire on Demand, Dedicated Teams, Hire Permanently, Employ Globally / EOR, or Domain Experts for AI), and pick 2 to 4 best-fitting sample profile IDs from the provided list.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              briefTitle: {
                type: Type.STRING,
                description: "Concise title for the structured hiring brief",
              },
              summary: {
                type: Type.STRING,
                description: "2-sentence executive summary of the extracted requirement",
              },
              extractedRoles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    seniority: { type: Type.STRING },
                    headcount: { type: Type.INTEGER },
                    category: { type: Type.STRING },
                  },
                  required: ["title", "seniority", "headcount", "category"],
                },
              },
              extractedSkills: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    domain: { type: Type.STRING },
                    importance: { type: Type.STRING },
                  },
                  required: ["name", "domain", "importance"],
                },
              },
              engagementDuration: {
                type: Type.STRING,
                description: "Extracted or recommended contract/engagement duration",
              },
              locationPreference: {
                type: Type.STRING,
                description: "Extracted timezone or location preference",
              },
              recommendedSolution: {
                type: Type.STRING,
                description:
                  "One of: Hire on Demand, Dedicated Teams, Hire Permanently, Employ Globally, Domain Experts for AI",
              },
              solutionRationale: {
                type: Type.STRING,
                description: "Why this RapidBrains engagement model fits best",
              },
              screeningCriteria: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: "3 to 4 specific technical evaluation criteria Lens AI will assess",
              },
              matchedSampleIds: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: "2 to 4 IDs from RB-SMP-101 through RB-SMP-108",
              },
            },
            required: [
              "briefTitle",
              "summary",
              "extractedRoles",
              "extractedSkills",
              "engagementDuration",
              "locationPreference",
              "recommendedSolution",
              "solutionRationale",
              "screeningCriteria",
              "matchedSampleIds",
            ],
          },
        },
      });

      const parsed = JSON.parse((response.text ?? "{}").trim());
      res.json(parsed);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to analyze requirement with Lens AI.";
      console.error("Lens AI error:", message);
      res.status(500).json({ error: message });
    }
  });

  // 2. AI Skill & Role Recommender
  app.post("/api/recommender/team", async (req, res) => {
    try {
      const { projectDescription, stage, timeline } = req.body;
      if (!projectDescription || typeof projectDescription !== "string") {
        res.status(400).json({ error: "Please provide a project description." });
        return;
      }

      const ai = getGenAIClient();
      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: `Project Description: "${projectDescription}"
Business Stage: "${stage || "Growth / Scale-up"}"
Target Timeline: "${timeline || "3–6 Months"}"

Design an optimal engineering team composition, recommended skill matrix, engagement model, and delivery roadmap using RapidBrains.`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction:
            "You are the RapidBrains AI Skill & Role Recommender. Provide practical, concrete software engineering team architectures without fluff.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              architectureName: { type: Type.STRING },
              recommendedEngagementModel: { type: Type.STRING },
              totalHeadcount: { type: Type.INTEGER },
              estimatedOnboardingDays: { type: Type.INTEGER },
              roles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    roleTitle: { type: Type.STRING },
                    seniority: { type: Type.STRING },
                    count: { type: Type.INTEGER },
                    coreSkills: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    keyResponsibility: { type: Type.STRING },
                  },
                  required: [
                    "roleTitle",
                    "seniority",
                    "count",
                    "coreSkills",
                    "keyResponsibility",
                  ],
                },
              },
              deliveryPhases: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phaseName: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    deliverable: { type: Type.STRING },
                  },
                  required: ["phaseName", "duration", "deliverable"],
                },
              },
            },
            required: [
              "architectureName",
              "recommendedEngagementModel",
              "totalHeadcount",
              "estimatedOnboardingDays",
              "roles",
              "deliveryPhases",
            ],
          },
        },
      });

      const parsed = JSON.parse((response.text ?? "{}").trim());
      res.json(parsed);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to generate team recommendation.";
      console.error("Team Recommender error:", message);
      res.status(500).json({ error: message });
    }
  });

  // 3. AI Hiring Assistant (Conversational Q&A with Human Sales Handoff)
  app.post("/api/assistant/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        res.status(400).json({ error: "Message is required." });
        return;
      }

      const ai = getGenAIClient();
      const conversationContext = Array.isArray(history)
        ? history
            .slice(-6)
            .map((h: { role: string; text: string }) => `${h.role.toUpperCase()}: ${h.text}`)
            .join("\n")
        : "";

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: `${conversationContext ? `Previous conversation:\n${conversationContext}\n\n` : ""}Visitor Question: ${message}`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction: `You are the RapidBrains AI Hiring Assistant.
Your role is to answer questions accurately and concisely about RapidBrains (https://www.rapidbrains.com/), a Global Talent Platform.

Verified RapidBrains Capabilities:
1. Primary Offering — Hire on Demand (Contract Developers): Flexible hourly billing arrangements, short-term and long-term engagements, remote pre-vetted engineers across AI/ML, Python, React, Cloud/DevOps, Data Engineering, Cybersecurity, and QA.
2. Dedicated Teams: Build and scale full engineering pods with dedicated delivery alignment.
3. Hire Permanently: Full-time specialist and leadership technology recruitment.
4. Employ Globally (Employer of Record / EOR): Employ international talent without establishing a local legal entity, including compliant local contracts, multi-currency global payroll, and statutory benefits administration, subject to country regulations.
5. Domain Experts for AI: Access qualified subject-matter experts (doctors, lawyers, PhDs, financial analysts, senior coders) for RLHF, AI model evaluation, red-teaming, and expert annotation.
6. Products:
   - Lens AI: Intelligent talent matching, natural-language hiring requirement parsing, skill assessment, and candidate evaluation.
   - Rapid Hire: Recruitment workflow platform for candidate pipelines, interview coordination, and hiring analytics.
7. Process: Vetting (multi-stage technical and communication evaluation), Onboarding (rapid contract & compliance setup), and Payroll Management (consolidated global invoicing and payout).

Important Rules:
- Keep answers clear, structured, and under 120 words.
- Do not invent unverified client names, fake savings guarantees, or fabricated candidate availability.
- Do not quote internal commercial fee percentages as binding public prices; advise that tailored commercial proposals are provided by the RapidBrains Solutions Team and invite the user to click "Request Human Specialist Handoff" or submit a requirement.`,
        },
      });

      res.json({
        reply: response.text ?? "I can help you explore RapidBrains solutions. Would you like to connect with our team?",
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unable to reach the AI Hiring Assistant.";
      console.error("Assistant error:", message);
      res.status(500).json({ error: message });
    }
  });

  // 4. Contextual Lead & Requirement Capture
  app.post("/api/leads/submit", (req, res) => {
    const {
      sourcePage,
      inquiryType,
      name,
      email,
      company,
      roleOrTech,
      teamSize,
      engagementModel,
      startDate,
      requirements,
    } = req.body;

    if (!name || !email || !company || !roleOrTech) {
      res.status(400).json({
        error: "Please complete Name, Business Email, Company, and Required Role/Technology.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        error: "Please enter a valid business email address.",
      });
      return;
    }

    const newLead: LeadSubmission = {
      id: `RB-REQ-${Math.floor(100000 + Math.random() * 900000)}`,
      submittedAt: new Date().toISOString(),
      sourcePage: sourcePage || "Homepage",
      inquiryType: inquiryType || "Talent Requirement",
      name,
      email,
      company,
      roleOrTech,
      teamSize: teamSize || "1–3 Professionals",
      engagementModel: engagementModel || "Hire on Demand (Hourly Contract)",
      startDate: startDate || "Within 2 Weeks",
      requirements: requirements || "",
    };

    leadSubmissions.unshift(newLead);
    res.json({
      success: true,
      lead: newLead,
      message:
        "Your requirement has been logged with the RapidBrains Solutions Desk. A talent architect will review your brief and respond within 4 business hours.",
    });
  });

  app.get("/api/leads", (_req, res) => {
    res.json({ leads: leadSubmissions });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RapidBrains Global Talent Platform running on http://localhost:${PORT}`);
  });
}

startServer();
