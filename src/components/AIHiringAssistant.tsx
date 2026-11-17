import React, { useState } from "react";
import { MessageSquare, X, Send, UserCheck } from "lucide-react";
import { RequirementPrefill } from "./RequirementModal";

interface ChatMessage {
  role: "assistant" | "user";
  text: string;
}

interface AIHiringAssistantProps {
  onOpenRequirementModal: (prefill: RequirementPrefill) => void;
}

const QUICK_QUESTIONS = [
  "How does Hire on Demand hourly billing work?",
  "How does RapidBrains EOR employ talent globally?",
  "What is the difference between Lens AI and Rapid Hire?",
  "Can we engage MDs or lawyers for RLHF evaluation?",
];

export const AIHiringAssistant: React.FC<AIHiringAssistantProps> = ({
  onOpenRequirementModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Welcome to RapidBrains. I can answer questions on Contract Developer Staffing, Dedicated Teams, Permanent Hiring, Global EOR & Payroll, Lens AI, and Rapid Hire—or connect you directly with a human talent architect.",
    },
  ]);

  const sendQuestion = async (q?: string) => {
    const text = (q ?? input).trim();
    if (!text || loading) return;

    const updatedHistory: ChatMessage[] = [
      ...messages,
      { role: "user", text },
    ];
    setMessages(updatedHistory);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: updatedHistory,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to reach AI Hiring Assistant.");
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply },
      ]);
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error
          ? err.message
          : "Service error. Please use Human Specialist Handoff below.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Note: ${errMsg}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {isOpen ? (
        <div className="w-[360px] sm:w-[400px] bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[540px]">
          {/* Header */}
          <div className="px-4 py-3.5 bg-slate-900 text-white flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold">
                RapidBrains AI Hiring Assistant
              </div>
              <div className="text-[11px] text-slate-400">
                Services · EOR · Lens AI · Human Handoff
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              aria-label="Close AI Hiring Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 overflow-y-auto flex-1 bg-slate-50 max-h-[310px]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-slate-200 text-slate-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-slate-500 font-mono px-2">
                Consulting RapidBrains knowledge base...
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-white border-t border-slate-200 flex gap-1.5 overflow-x-auto">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => sendQuestion(q)}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input & Human Handoff */}
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendQuestion();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about contract hiring, EOR, Lens AI..."
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white cursor-pointer"
                aria-label="Send question"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenRequirementModal({
                  sourcePage: "AI Hiring Assistant Handoff",
                  inquiryType: "Human Solutions Architect Consultation",
                  requirements: messages
                    .filter((m) => m.role === "user")
                    .map((m) => m.text)
                    .join(" | "),
                });
              }}
              className="w-full py-1.5 px-3 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Request Human Sales Specialist Handoff</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-lg border border-slate-700 flex items-center gap-2.5 text-xs font-medium transition-transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-blue-400" />
          <span>Ask RapidBrains AI</span>
        </button>
      )}
    </div>
  );
};
