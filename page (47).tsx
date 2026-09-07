"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Activity,
  Image,
  FileText,
  MessageSquare,
  Download,
  Clock,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Period = "daily" | "weekly" | "monthly";

const overviewCards = [
  {
    label: "Total Messages",
    value: "1,247",
    change: "+12%",
    icon: MessageSquare,
    color: "text-cavrix-400",
    bgColor: "bg-cavrix-600/15",
  },
  {
    label: "Total Tokens",
    value: "384,500",
    change: "+8%",
    icon: Activity,
    color: "text-purple-400",
    bgColor: "bg-purple-600/15",
  },
  {
    label: "Image Generations",
    value: "89",
    change: "+23%",
    icon: Image,
    color: "text-cyan-400",
    bgColor: "bg-cyan-600/15",
  },
  {
    label: "File Uploads",
    value: "42",
    change: "+5%",
    icon: FileText,
    color: "text-cavrix-300",
    bgColor: "bg-cavrix-500/15",
  },
];

const dailyData = [
  { day: "Mon", messages: 85, tokens: 28000 },
  { day: "Tue", messages: 120, tokens: 42000 },
  { day: "Wed", messages: 95, tokens: 31000 },
  { day: "Thu", messages: 140, tokens: 48000 },
  { day: "Fri", messages: 110, tokens: 36000 },
  { day: "Sat", messages: 65, tokens: 21000 },
  { day: "Sun", messages: 45, tokens: 14000 },
];

const weeklyData = [
  { day: "W1", messages: 480, tokens: 156000 },
  { day: "W2", messages: 520, tokens: 172000 },
  { day: "W3", messages: 610, tokens: 198000 },
  { day: "W4", messages: 490, tokens: 160000 },
];

const monthlyData = [
  { day: "Jan", messages: 1800, tokens: 594000 },
  { day: "Feb", messages: 2100, tokens: 693000 },
  { day: "Mar", messages: 1950, tokens: 643500 },
  { day: "Apr", messages: 2300, tokens: 759000 },
  { day: "May", messages: 2050, tokens: 676500 },
  { day: "Jun", messages: 2400, tokens: 792000 },
];

const modelUsage = [
  { name: "Cavrix Lite", percentage: 35, color: "bg-cavrix-500" },
  { name: "Cavrix Pro", percentage: 28, color: "bg-purple-500" },
  { name: "Cavrix Ultra", percentage: 18, color: "bg-cyan-500" },
  { name: "Cavrix Vision", percentage: 12, color: "bg-cavrix-400" },
  { name: "Cavrix Code", percentage: 7, color: "bg-purple-400" },
];

const recentActivity = [
  {
    id: "1",
    action: "Chat with Cavrix Pro",
    detail: "Generated 12 responses",
    time: "2 minutes ago",
    icon: MessageSquare,
    color: "text-cavrix-400",
  },
  {
    id: "2",
    action: "Image generated",
    detail: "Landscape scene prompt",
    time: "15 minutes ago",
    icon: Image,
    color: "text-cyan-400",
  },
  {
    id: "3",
    action: "File uploaded",
    detail: "report.pdf (2.4 MB)",
    time: "1 hour ago",
    icon: FileText,
    color: "text-purple-400",
  },
  {
    id: "4",
    action: "Chat with Cavrix Ultra",
    detail: "Deep reasoning task completed",
    time: "3 hours ago",
    icon: Cpu,
    color: "text-cavrix-300",
  },
  {
    id: "5",
    action: "Code generated",
    detail: "React component refactor",
    time: "5 hours ago",
    icon: Activity,
    color: "text-purple-300",
  },
  {
    id: "6",
    action: "Chat with Cavrix Lite",
    detail: "Quick Q&A session",
    time: "Yesterday",
    icon: MessageSquare,
    color: "text-cavrix-400",
  },
];

export default function UsagePage() {
  const [period, setPeriod] = useState<Period>("daily");

  const chartData =
    period === "daily"
      ? dailyData
      : period === "weekly"
        ? weeklyData
        : monthlyData;

  const maxMessages = Math.max(...chartData.map((d) => d.messages));

  const handleExport = () => {
    toast.success("Usage report exported");
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto scrollbar-thin">
      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Usage Analytics</h1>
            <p className="mt-1 text-sm text-slate-500">
              Track your AI usage across all models and features.
            </p>
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="space-y-8 animate-fade-in">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {overviewCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-xl"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", card.bgColor)}>
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
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Usage Over Time</h2>
                <p className="text-xs text-slate-500">Messages sent per period</p>
              </div>
              <div className="flex gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1">
                {(["daily", "weekly", "monthly"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all duration-200",
                      period === p
                        ? "bg-cavrix-600/15 text-cavrix-300"
                        : "text-slate-500 hover:text-white"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end gap-2" style={{ height: "200px" }}>
              {chartData.map((bar) => {
                const heightPercent = (bar.messages / maxMessages) * 100;
                return (
                  <div
                    key={bar.day}
                    className="group flex flex-1 flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-medium text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                      {bar.messages.toLocaleString()}
                    </span>
                    <div className="relative w-full" style={{ height: "160px" }}>
                      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
                        <div
                          className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-cavrix-600 to-purple-500 transition-all duration-300 hover:from-cavrix-500 hover:to-purple-400"
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

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-semibold text-white">Model Usage</h2>
              <div className="relative mx-auto mb-6 flex h-40 w-40 items-center justify-center">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  {(() => {
                    let offset = 0;
                    const radius = 40;
                    const circumference = 2 * Math.PI * radius;
                    return modelUsage.map((model) => {
                      const dashLength = (model.percentage / 100) * circumference;
                      const gap = circumference - dashLength;
                      const currentOffset = offset;
                      offset += dashLength;
                      return (
                        <circle
                          key={model.name}
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="none"
                          strokeWidth="8"
                          stroke="currentColor"
                          className={cn(model.color, "opacity-80 transition-opacity hover:opacity-100")}
                          strokeDasharray={`${dashLength} ${gap}`}
                          strokeDashoffset={-currentOffset}
                          strokeLinecap="round"
                        />
                      );
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-white">5</p>
                  <p className="text-[10px] text-slate-500">models used</p>
                </div>
              </div>
              <div className="space-y-3">
                {modelUsage.map((model) => (
                  <div key={model.name} className="flex items-center gap-3">
                    <div className={cn("h-2.5 w-2.5 rounded-full", model.color)} />
                    <span className="flex-1 text-sm text-slate-400">{model.name}</span>
                    <span className="text-sm font-medium text-white">{model.percentage}%</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-semibold text-white">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/20 p-3 transition-colors hover:bg-slate-800/40"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800">
                        <Icon className={cn("h-4 w-4", item.color)} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">
                          {item.action}
                        </p>
                        <p className="truncate text-xs text-slate-500">{item.detail}</p>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-600">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
