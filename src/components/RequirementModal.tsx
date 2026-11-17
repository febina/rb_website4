import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

export interface RequirementPrefill {
  sourcePage?: string;
  inquiryType?: string;
  roleOrTech?: string;
  teamSize?: string;
  engagementModel?: string;
  requirements?: string;
}

interface RequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill: RequirementPrefill;
}

export const RequirementModal: React.FC<RequirementModalProps> = ({
  isOpen,
  onClose,
  prefill,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [roleOrTech, setRoleOrTech] = useState("");
  const [teamSize, setTeamSize] = useState("2–4 Professionals");
  const [engagementModel, setEngagementModel] = useState(
    "Hire on Demand (Hourly Contract)"
  );
  const [startDate, setStartDate] = useState("Within 2 Weeks");
  const [requirements, setRequirements] = useState("");
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{
    id: string;
    submittedAt: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setRoleOrTech(prefill.roleOrTech || "");
      setTeamSize(prefill.teamSize || "2–4 Professionals");
      setEngagementModel(
        prefill.engagementModel || "Hire on Demand (Hourly Contract)"
      );
      setRequirements(prefill.requirements || "");
      setError(null);
      setReceipt(null);
    }
  }, [isOpen, prefill]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Please confirm data handling consent to submit your inquiry.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourcePage: prefill.sourcePage || "Platform",
          inquiryType: prefill.inquiryType || "Talent Requirement Brief",
          name,
          email,
          company,
          roleOrTech,
          teamSize,
          engagementModel,
          startDate,
          requirements,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit requirement.");
      }
      setReceipt({
        id: data.lead.id,
        submittedAt: data.lead.submittedAt,
        message: data.message,
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error submitting requirement."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="req-modal-title"
    >
      <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full overflow-hidden shadow-xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div>
            <div className="text-xs text-blue-400 font-mono">
              {prefill.inquiryType || "Contextual Talent Requirement"}
            </div>
            <h3 id="req-modal-title" className="text-base font-semibold mt-0.5">
              Submit Your Business & Talent Requirement
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {receipt ? (
          <div className="p-8 space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-500">
                  Reference ID: {receipt.id} · Logged{" "}
                  {new Date(receipt.submittedAt).toLocaleTimeString()}
                </div>
                <h4 className="text-lg font-semibold text-slate-900">
                  Requirement Brief Received by RapidBrains Solutions Desk
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {receipt.message}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500">Organization:</span>{" "}
                <span className="font-semibold text-slate-900">{company}</span>
              </div>
              <div>
                <span className="text-slate-500">Engagement Model:</span>{" "}
                <span className="font-semibold text-slate-900">
                  {engagementModel}
                </span>
              </div>
              <div>
                <span className="text-slate-500">Required Expertise:</span>{" "}
                <span className="font-semibold text-slate-900">{roleOrTech}</span>
              </div>
              <div>
                <span className="text-slate-500">Target Start:</span>{" "}
                <span className="font-semibold text-slate-900">{startDate}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Return to Platform
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Business Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@company.com"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Cloud Inc."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Required Role or Technology *
                </label>
                <input
                  type="text"
                  required
                  value={roleOrTech}
                  onChange={(e) => setRoleOrTech(e.target.value)}
                  placeholder="e.g., Senior Python + AWS + ML Engineers"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Engagement Model
                </label>
                <select
                  value={engagementModel}
                  onChange={(e) => setEngagementModel(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Hire on Demand (Hourly Contract)">
                    Hire on Demand (Hourly Contract)
                  </option>
                  <option value="Dedicated Engineering Team">
                    Dedicated Engineering Team
                  </option>
                  <option value="Hire Permanently (Full-Time)">
                    Hire Permanently (Full-Time)
                  </option>
                  <option value="Employ Globally (Employer of Record / EOR)">
                    Employ Globally (Employer of Record / EOR)
                  </option>
                  <option value="Domain Experts for AI (RLHF / Evaluation)">
                    Domain Experts for AI (RLHF / Evaluation)
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Number of Professionals
                </label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option>1 Specialist</option>
                  <option>2–4 Professionals</option>
                  <option>5–10 Pod Members</option>
                  <option>10+ Enterprise Cohort</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Expected Start Date
                </label>
                <select
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option>Immediate (Within 1 Week)</option>
                  <option>Within 2 Weeks</option>
                  <option>Within 30 Days</option>
                  <option>Q1 / Q2 Roadmap Planning</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Additional Technical or Jurisdiction Requirements
              </label>
              <textarea
                rows={3}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Share timezone overlap preferences, contract duration, EOR target countries, or evaluation rubric notes..."
                className="w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="req-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 accent-blue-600 cursor-pointer"
              />
              <label
                htmlFor="req-consent"
                className="text-xs text-slate-600 leading-relaxed cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 inline mr-1" />
                I consent to RapidBrains processing this business enquiry under enterprise NDA and data protection standards.
              </label>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>
                  {submitting ? "Submitting Requirement..." : "Submit Requirement"}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
