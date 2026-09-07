"use client"

import { useState } from "react"
import { Globe, Search, FileText, ExternalLink, Copy, Download, Check } from "lucide-react"

const researchSteps = [
  { label: "Searching sources...", duration: 2000 },
  { label: "Analyzing data...", duration: 2500 },
  { label: "Generating report...", duration: 2000 },
]

const placeholderReport = {
  title: "Latest Trends in Artificial Intelligence — 2026",
  sections: [
    {
      heading: "1. Agentic AI Systems",
      content:
        "Autonomous AI agents capable of multi-step reasoning, tool use, and goal-directed behavior have become the dominant paradigm in 2026. Major labs including OpenAI, Anthropic, and Google DeepMind have shipped production-grade agent frameworks that orchestrate complex workflows across enterprise environments. These systems combine large language models with planning modules, memory architectures, and external tool integrations to complete tasks that previously required human oversight.",
    },
    {
      heading: "2. Multimodal Foundation Models",
      content:
        "The boundary between vision, language, audio, and video understanding has largely dissolved. State-of-the-art models natively process and generate across all modalities with unified architectures. Real-time video understanding, native image generation within chat interfaces, and cross-modal retrieval are now standard capabilities shipped in consumer products.",
    },
    {
      heading: "3. Efficient Inference & Edge Deployment",
      content:
        "Quantization, speculative decoding, and mixture-of-experts architectures have dramatically reduced the cost of running large models. On-device AI is now practical for smartphones, laptops, and embedded systems. Apple, Qualcomm, and NVIDIA have shipped silicon specifically optimized for transformer inference, enabling real-time AI without cloud connectivity.",
    },
    {
      heading: "4. AI Safety & Governance",
      content:
        "Regulatory frameworks such as the EU AI Act enforcement and the US AI Safety Institute standards have matured. Constitutional AI, RLHF, and automated red-teaming are standard practices. Organizations increasingly deploy guardrail layers, content classifiers, and audit trails as mandatory components of production AI systems.",
    },
    {
      heading: "5. Synthetic Data & World Models",
      content:
        "Synthetic data generation has surpassed human-curated datasets for training specialized models. World models that simulate physics, biology, and social dynamics are being used for drug discovery, autonomous driving, and scientific research. These simulation environments generate unlimited high-fidelity training data at a fraction of the cost of real-world collection.",
    },
  ],
  sources: [
    { title: "State of AI Report 2026 — Sequoia Capital", url: "#" },
    { title: "AI Index Annual Report — Stanford HAI", url: "#" },
    { title: "Gartner Hype Cycle for AI 2026", url: "#" },
    { title: "McKinsey Global Survey on AI Adoption", url: "#" },
    { title: "DeepMind Technical Reports", url: "#" },
    { title: "OpenAI Research Publications", url: "#" },
  ],
}

export default function ResearchPage() {
  const [query, setQuery] = useState("")
  const [researching, setResearching] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [complete, setComplete] = useState(false)
  const [copied, setCopied] = useState(false)

  const startResearch = async () => {
    if (!query.trim()) return
    setResearching(true)
    setComplete(false)

    for (let i = 0; i < researchSteps.length; i++) {
      setCurrentStep(i)
      await new Promise((r) => setTimeout(r, researchSteps[i].duration))
    }

    setCurrentStep(-1)
    setResearching(false)
    setComplete(true)
  }

  const copyReport = () => {
    const text = [
      placeholderReport.title,
      "",
      ...placeholderReport.sections.flatMap((s) => [s.heading, s.content, ""]),
      "Sources:",
      ...placeholderReport.sources.map((s) => `- ${s.title}`),
    ].join("\n")
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#08080f] p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Globe className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Deep Research</h1>
          <p className="text-sm text-white/40">AI-powered comprehensive research on any topic</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 mb-8">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What would you like to research? e.g. 'Latest trends in AI' or 'Comparison of quantum computing frameworks'"
          className="w-full h-28 bg-transparent text-white placeholder-white/30 text-sm leading-relaxed resize-none outline-none"
        />
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-white/30">
            Research typically takes 5-10 seconds
          </p>
          <button
            onClick={startResearch}
            disabled={researching || !query.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-medium hover:from-purple-500 hover:to-cyan-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Search className="w-4 h-4" />
            {researching ? "Researching..." : "Start Research"}
          </button>
        </div>
      </div>

      {researching && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-8">
          <div className="space-y-4">
            {researchSteps.map((step, i) => {
              const isActive = i === currentStep
              const isDone = i < currentStep
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    isDone
                      ? "bg-green-500/20 text-green-400"
                      : isActive
                        ? "bg-purple-500/20 text-purple-400 animate-pulse"
                        : "bg-white/5 text-white/20"
                  }`}>
                    {isDone ? "✓" : i + 1}
                  </div>
                  <span className={`text-sm ${isActive ? "text-white" : isDone ? "text-white/50" : "text-white/20"}`}>
                    {step.label}
                  </span>
                  {isActive && (
                    <div className="flex-1 h-0.5 rounded-full bg-white/10 overflow-hidden ml-2">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse" style={{ width: "60%" }} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {complete && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/50 font-medium">Research Report</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copyReport}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white/60 hover:bg-white/10 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white/60 hover:bg-white/10 transition-colors">
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-bold text-white mb-6">{placeholderReport.title}</h2>
            <div className="space-y-5">
              {placeholderReport.sections.map((section, i) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold text-purple-400 mb-2">{section.heading}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-sm font-semibold text-white/70 mb-3">Sources</h3>
            <div className="space-y-2">
              {placeholderReport.sources.map((source, i) => (
                <a
                  key={i}
                  href={source.url}
                  className="flex items-center gap-2 text-sm text-cyan-400/80 hover:text-cyan-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  {source.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {!researching && !complete && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <Globe className="w-8 h-8 text-white/10" />
          </div>
          <p className="text-sm text-white/30 max-w-xs">
            Enter a topic above and click &quot;Start Research&quot; to get a comprehensive AI-generated report.
          </p>
        </div>
      )}
    </div>
  )
}
