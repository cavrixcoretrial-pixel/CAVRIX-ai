"use client";

import {
  Activity,
  Cpu,
  DollarSign,
  TrendingUp,
  Flame,
  Layers,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tokenCards = [
  {
    label: "Tokens Used (30d)",
    value: "12.4M",
    change: "+18.2%",
    icon: Activity,
    color: "text-cavrix-400",
    bgColor: "bg-cavrix-600/15",
  },
  {
    label: "Tokens Used (Today)",
    value: "412,800",
    change: "+5.4%",
    icon: Flame,
    color: "text-cyan-400",
    bgColor: "bg-cyan-600/15",
  },
  {
    label: "API Cost (30d)",
    value: "₹1,18,400",
    change: "+14.7%",
    icon: DollarSign,
    color: "text-purple-400",
    bgColor: "bg-purple-600/15",
  },
  {
    label: "Avg Tokens / Request",
    value: "2,847",
    change: "-3.2%",
    icon: Cpu,
    color: "text-cavrix-300",
    bgColor: "bg-cavrix-500/15",
  },
];

const modelUsage = [
  { name: "gpt-4o", tokens: 4200000, cost: "₹42,000", color: "bg-cavrix-500" },
  { name: "gpt-4o-mini", tokens: 3800000, cost: "₹19,000", color: "bg-purple-500" },
  { name: "claude-sonnet-4", tokens: 2600000, cost: "₹31,200", color: "bg-cyan-500" },
  { name: "claude-haiku-4", tokens: 1400000, cost: "₹11,200", color: "bg-cavrix-400" },
  { name: "gemini-1.5-pro", tokens: 2200000, cost: "₹15,000", color: "bg-purple-400" },
];

const costByModel = [
  { name: "gpt-4o", cost: "₹42,000", percentage: 35, color: "bg-cavrix-500", text: "text-cavrix-400" },
  { name: "claude-sonnet-4", cost: "₹31,200", percentage: 26, color: "bg-purple-500", text: "text-purple-400" },
  { name: "gpt-4o-mini", cost: "₹19,000", percentage: 16, color: "bg-cyan-500", text: "text-cyan-400" },
  { name: "gemini-1.5-pro", cost: "₹15,000", percentage: 13, color: "bg-cavrix-400", text: "text-cavrix-300" },
  { name: "claude-haiku-4", cost: "₹11,200", percentage: 10, color: "bg-purple-400", text: "text-purple-300" },
];

const usageTrend = [
  { day: "Mon", tokens: 380000 },
  { day: "Tue", tokens: 420000 },
  { day: "Wed", tokens: 410000 },
  { day: "Thu", tokens: 465000 },
  { day: "Fri", tokens: 438000 },
  { day: "Sat", tokens: 390000 },
  { day: "Sun", tokens: 345000 },
];

export default function AdminAiUsagePage() {
  const maxTokens = Math.max(...usageTrend.map((d) => d.tokens));
  const maxModelTokens = Math.max(...modelUsage.map((m) => m.tokens));

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">AI Usage Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor token usage, model distribution, and API costs
        </p>
      </div>

      <div className="space-y-8 animate-fade-in">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tokenCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-xl transition-colors hover:border-slate-700"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg",
                      card.bgColor
                    )}
                  >
                    <Icon className={cn("h-4 w-4", card.color)} />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-green-400">
                    <TrendingUp className="h-3 w-3" />
                    {card.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{card.value}</p>
                <p className="mt-0.5 text-xs text-slate-500">{card.label}</p>
              </div>
            );
          })}
        </div>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Usage Trends
              </h2>
              <p className="text-xs text-slate-500">
                Token consumption this week
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cavrix-600/15">
              <BarChart3 className="h-4 w-4 text-cavrix-400" />
            </div>
          </div>
          <div className="flex items-end gap-3" style={{ height: "200px" }}>
            {usageTrend.map((bar) => {
              const heightPercent = (bar.tokens / maxTokens) * 100;
              return (
                <div
                  key={bar.day}
                  className="group flex flex-1 flex-col items-center gap-2"
                >
                  <span className="text-[10px] font-medium text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                    {(bar.tokens / 1000).toFixed(0)}k
                  </span>
                  <div className="relative w-full" style={{ height: "160px" }}>
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
                      <div
                        className="w-full max-w-[40px] rounded-t bg-gradient-to-t from-cavrix-600 to-cyan-500 transition-all duration-300 hover:from-cavrix-500 hover:to-cyan-400"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{bar.day}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Model Usage Breakdown
              </h2>
              <p className="text-xs text-slate-500">
                Tokens consumed per model (30 days)
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600/15">
              <Layers className="h-4 w-4 text-purple-400" />
            </div>
          </div>
          <div className="space-y-4">
            {modelUsage.map((model) => {
              const percent = (model.tokens / maxModelTokens) * 100;
              return (
                <div key={model.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">
                      {model.name}
                    </span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-400">
                        {(model.tokens / 1000000).toFixed(1)}M tokens
                      </span>
                      <span className="font-medium text-slate-300">
                        {model.cost}
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        model.color
                      )}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Cost by Model
              </h2>
              <p className="text-xs text-slate-500">
                API spend distribution
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-600/15">
              <DollarSign className="h-4 w-4 text-cyan-400" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex h-64 flex-col justify-center gap-4">
              {costByModel.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className={cn("h-2.5 w-2.5 rounded-full", item.color)} />
                  <span className="flex-1 text-sm text-slate-400">
                    {item.name}
                  </span>
                  <span className={cn("text-sm font-medium", item.text)}>
                    {item.percentage}%
                  </span>
                  <span className="w-20 text-right text-sm text-slate-300">
                    {item.cost}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="relative flex h-48 w-48 items-center justify-center">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  {(() => {
                    let offset = 0;
                    const radius = 40;
                    const circumference = 2 * Math.PI * radius;
                    return costByModel.map((item) => {
                      const dashLength =
                        (item.percentage / 100) * circumference;
                      const gap = circumference - dashLength;
                      const currentOffset = offset;
                      offset += dashLength;
                      return (
                        <circle
                          key={item.name}
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="none"
                          strokeWidth="10"
                          stroke="currentColor"
                          className={cn(item.color, "opacity-80")}
                          strokeDasharray={`${dashLength} ${gap}`}
                          strokeDashoffset={-currentOffset}
                          strokeLinecap="butt"
                        />
                      );
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-white">₹1,18,400</p>
                  <p className="text-[10px] text-slate-500">total cost</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
