"use client";

import {
  DollarSign,
  CreditCard,
  TrendingUp,
  Users,
  BarChart3,
  Plus,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const revenueCards = [
  {
    label: "Monthly Recurring Revenue",
    value: "₹3,86,500",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-cavrix-400",
    bgColor: "bg-cavrix-600/15",
  },
  {
    label: "Total Subscribers",
    value: "4,208",
    change: "+8.2%",
    icon: Users,
    color: "text-cyan-400",
    bgColor: "bg-cyan-600/15",
  },
  {
    label: "Average Revenue per User",
    value: "₹91.9",
    change: "+3.1%",
    icon: TrendingUp,
    color: "text-purple-400",
    bgColor: "bg-purple-600/15",
  },
  {
    label: "Churn Rate",
    value: "2.4%",
    change: "-0.6%",
    icon: RefreshCcw,
    color: "text-cavrix-300",
    bgColor: "bg-cavrix-500/15",
  },
];

const subscriptions = [
  {
    id: "SUB-9987",
    user: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    plan: "Ultra",
    status: "Active",
    amount: "₹2,999/mo",
    started: "Jan 12, 2026",
    renews: "Jan 12, 2027",
  },
  {
    id: "SUB-9932",
    user: "Priya Patel",
    email: "priya.patel@example.com",
    plan: "Pro",
    status: "Active",
    amount: "₹1,999/mo",
    started: "Feb 3, 2026",
    renews: "Feb 3, 2027",
  },
  {
    id: "SUB-9876",
    user: "Vikram Singh",
    email: "vikram.singh@example.com",
    plan: "Basic",
    status: "Past Due",
    amount: "₹499/mo",
    started: "Mar 18, 2026",
    renews: "Mar 18, 2027",
  },
  {
    id: "SUB-9854",
    user: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    plan: "Pro",
    status: "Active",
    amount: "₹1,999/mo",
    started: "Apr 2, 2026",
    renews: "Apr 2, 2027",
  },
  {
    id: "SUB-9801",
    user: "Ananya Gupta",
    email: "ananya.gupta@example.com",
    plan: "Ultra",
    status: "Active",
    amount: "₹2,999/mo",
    started: "Jun 27, 2026",
    renews: "Jun 27, 2027",
  },
  {
    id: "SUB-9745",
    user: "Kabir Joshi",
    email: "kabir.joshi@example.com",
    plan: "Basic",
    status: "Canceled",
    amount: "₹499/mo",
    started: "Jul 9, 2026",
    renews: null,
  },
];

const revenueData = [
  { month: "Jul", revenue: 298000 },
  { month: "Aug", revenue: 325000 },
  { month: "Sep", revenue: 312000 },
  { month: "Oct", revenue: 348000 },
  { month: "Nov", revenue: 372000 },
  { month: "Dec", revenue: 386500 },
];

const planBreakdown = [
  { plan: "Ultra", count: 320, color: "bg-cyan-500", text: "text-cyan-400" },
  { plan: "Pro", count: 1150, color: "bg-purple-500", text: "text-purple-400" },
  { plan: "Basic", count: 1738, color: "bg-cavrix-500", text: "text-cavrix-400" },
  { plan: "Free", count: 1000, color: "bg-slate-500", text: "text-slate-400" },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-500/10 text-green-400",
  "Past Due": "bg-yellow-500/10 text-yellow-400",
  Canceled: "bg-red-500/10 text-red-400",
};

const planColors: Record<string, string> = {
  Free: "bg-slate-500/10 text-slate-400",
  Basic: "bg-cavrix-600/10 text-cavrix-400",
  Pro: "bg-purple-600/10 text-purple-400",
  Ultra: "bg-cyan-600/10 text-cyan-400",
};

export default function AdminSubscriptionsPage() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));
  const totalSubscribers = planBreakdown.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage and monitor all active subscriptions
        </p>
      </div>

      <div className="space-y-8 animate-fade-in">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {revenueCards.map((card) => {
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
                Revenue Overview
              </h2>
              <p className="text-xs text-slate-500">Monthly subscription revenue</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600/15">
              <BarChart3 className="h-4 w-4 text-purple-400" />
            </div>
          </div>
          <div className="flex items-end gap-3" style={{ height: "200px" }}>
            {revenueData.map((bar) => {
              const heightPercent = (bar.revenue / maxRevenue) * 100;
              return (
                <div
                  key={bar.month}
                  className="group flex flex-1 flex-col items-center gap-2"
                >
                  <span className="text-[10px] font-medium text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                    ₹{(bar.revenue / 1000).toFixed(0)}k
                  </span>
                  <div className="relative w-full" style={{ height: "160px" }}>
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
                      <div
                        className="w-full max-w-[40px] rounded-t bg-gradient-to-t from-purple-600 to-cavrix-500 transition-all duration-300 hover:from-purple-500 hover:to-cavrix-400"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{bar.month}</span>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Active Subscriptions
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CreditCard className="h-4 w-4" />
                {subscriptions.length} records
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-800/20 text-xs text-slate-500">
                    <th className="px-6 py-3 font-medium">Subscriber</th>
                    <th className="px-6 py-3 font-medium">Plan</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Amount</th>
                    <th className="px-6 py-3 font-medium">Started</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {subscriptions.map((sub) => (
                    <tr
                      key={sub.id}
                      className="transition-colors hover:bg-slate-800/30"
                    >
                      <td className="px-6 py-3.5">
                        <p className="text-sm font-medium text-white">
                          {sub.user}
                        </p>
                        <p className="text-xs text-slate-500">
                          {sub.email} · {sub.id}
                        </p>
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={cn(
                            "rounded-lg px-2.5 py-1 text-xs font-medium",
                            planColors[sub.plan]
                          )}
                        >
                          {sub.plan}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={cn(
                            "rounded-lg px-2.5 py-1 text-xs font-medium",
                            statusColors[sub.status]
                          )}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-sm font-medium text-white">
                        {sub.amount}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-slate-400">
                        {sub.started}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Subscription Breakdown
            </h2>
            <p className="mb-6 text-xs text-slate-500">
              {totalSubscribers.toLocaleString()} total subscribers
            </p>
            <div className="space-y-4">
              {planBreakdown.map((item) => {
                const percent = (item.count / totalSubscribers) * 100;
                return (
                  <div key={item.plan}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        {item.plan}
                      </span>
                      <span className={cn("text-sm font-medium", item.text)}>
                        {item.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={cn("h-full rounded-full", item.color)}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/20 p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-cavrix-600/15">
                <Plus className="h-5 w-5 text-cavrix-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">
                  Create a new plan
                </p>
                <p className="text-xs text-slate-500">
                  Add custom subscription tiers
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
