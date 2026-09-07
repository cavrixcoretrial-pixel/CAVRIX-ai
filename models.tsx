"use client"

import { AI_MODELS } from "@/types"
import { Zap, Clock, Gauge } from "lucide-react"

const speedConfig = {
  fast: { label: "Fast", color: "text-emerald-400", icon: Zap },
  medium: { label: "Medium", color: "text-amber-400", icon: Gauge },
  slow: { label: "Thorough", color: "text-blue-400", icon: Clock },
}

const planColors: Record<string, string> = {
  free: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  plus: "border-purple-500/30 bg-purple-500/10 text-purple-300",
  pro: "border-cavrix-500/30 bg-cavrix-500/10 text-cavrix-300",
}

export default function Models() {
  return (
    <section id="about" className="relative px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Powerful{" "}
            <span className="text-gradient">AI Models</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Choose from our curated selection of models optimized for different tasks
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AI_MODELS.map((model) => {
            const speed = speedConfig[model.speed]
            return (
              <div
                key={model.id}
                className="model-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="model-glow pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{model.name}</h3>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase ${planColors[model.plan]}`}
                    >
                      {model.plan}
                    </span>
                  </div>

                  <p className="mb-4 text-sm text-slate-400">{model.description}</p>

                  <div className="mb-4 flex items-center gap-2 text-xs">
                    <speed.icon size={14} className={speed.color} />
                    <span className={speed.color}>{speed.label}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-500">
                      {(model.maxTokens / 1000).toFixed(0)}K tokens
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {model.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400"
                      >
                        {cap.replace(/-/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <style>{`
        .model-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          padding: 1px;
          background: linear-gradient(135deg, rgba(51,144,255,0) 0%, rgba(168,85,247,0) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          transition: background 0.5s ease;
        }
        .model-card:hover::before {
          background: linear-gradient(135deg, rgba(51,144,255,0.4) 0%, rgba(168,85,247,0.4) 100%);
        }
        .model-card .model-glow {
          background: radial-gradient(
            600px circle at 50% 50%,
            rgba(51, 144, 255, 0.04),
            transparent 40%
          );
        }
        .model-card:hover .model-glow {
          background: radial-gradient(
            600px circle at 50% 50%,
            rgba(168, 85, 247, 0.06),
            transparent 40%
          );
        }
      `}</style>
    </section>
  )
}
