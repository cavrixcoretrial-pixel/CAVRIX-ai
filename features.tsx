"use client"

import {
  MessageSquare,
  Brain,
  Globe,
  Image,
  FileText,
  Code,
  Mic,
  Bot,
} from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Advanced AI Chat",
    description:
      "Natural conversations powered by state-of-the-art language models with contextual understanding.",
  },
  {
    icon: Brain,
    title: "Deep Reasoning",
    description:
      "Multi-step logical analysis and problem solving that mirrors human cognitive processes.",
  },
  {
    icon: Globe,
    title: "Web Research",
    description:
      "Real-time information retrieval from the web with source verification and analysis.",
  },
  {
    icon: Image,
    title: "Image Generation",
    description:
      "Create stunning visuals from text descriptions with our integrated AI image generation.",
  },
  {
    icon: FileText,
    title: "File Analysis",
    description:
      "Upload and analyze documents, PDFs, spreadsheets, and images with intelligent extraction.",
  },
  {
    icon: Code,
    title: "Code Assistant",
    description:
      "Write, debug, and optimize code across 50+ programming languages with expert-level guidance.",
  },
  {
    icon: Mic,
    title: "Voice AI",
    description:
      "Interact naturally through voice with real-time speech recognition and synthesis.",
  },
  {
    icon: Bot,
    title: "Custom Agents",
    description:
      "Build and deploy specialized AI agents tailored to your specific workflows and needs.",
  },
]

export default function Features() {
  return (
    <section id="features" className="relative px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Everything You Need,{" "}
            <span className="text-gradient">One Platform</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            A complete suite of AI tools designed to supercharge your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-purple-500/5"
            >
              <div className="feature-glow pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cavrix-500/20 to-purple-500/20">
                  <feature.icon size={22} className="text-cavrix-400" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .feature-card:hover .feature-glow {
          background: radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(168, 85, 247, 0.06),
            transparent 40%
          );
        }
      `}</style>
    </section>
  )
}
