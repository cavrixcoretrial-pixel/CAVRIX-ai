"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  CreditCard,
  Download,
  TrendingUp,
  BarChart3,
  Calendar,
  Activity,
  Image,
  FileText,
  MessageSquare,
  Check,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SUBSCRIPTION_PLANS } from "@/types";

const CURRENT_PLAN = "free";

const paymentHistory = [
  {
    id: "1",
    date: "Aug 15, 2026",
    description: "Cavrix Plus - Monthly",
    amount: "₹499",
    status: "paid",
  },
  {
    id: "2",
    date: "Jul 15, 2026",
    description: "Cavrix Plus - Monthly",
    amount: "₹499",
    status: "paid",
  },
  {
    id: "3",
    date: "Jun 15, 2026",
    description: "Cavrix Pro - Monthly",
    amount: "₹999",
    status: "paid",
  },
  {
    id: "4",
    date: "May 10, 2026",
    description: "Cavrix Plus - Monthly",
    amount: "₹499",
    status: "failed",
  },
];

const usageData = [
  {
    label: "Messages",
    used: 156,
    total: 500,
    icon: MessageSquare,
    color: "from-cavrix-500 to-cyan-500",
  },
  {
    label: "Tokens",
    used: 45000,
    total: 100000,
    icon: Activity,
    color: "from-purple-500 to-cavrix-500",
  },
  {
    label: "Image Generations",
    used: 12,
    total: 50,
    icon: Image,
    color: "from-cyan-500 to-purple-500",
  },
  {
    label: "File Uploads",
    used: 8,
    total: 20,
    icon: FileText,
    color: "from-cavrix-400 to-cyan-400",
  },
];

export default function BillingPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const formatNumber = (num: number) =>
    num >= 1000 ? num.toLocaleString("en-IN") : String(num);

  const getProgressColor = (percent: number) => {
    if (percent >= 90) return "from-red-500 to-orange-500";
    if (percent >= 70) return "from-amber-500 to-yellow-500";
    return undefined;
  };

  const handleDownloadInvoice = (id: string) => {
    toast.success(`Downloading invoice #${id}...`);
  };

  const handleSubscribe = (planId: string) => {
    if (planId === "business") {
      toast.success("Redirecting to sales...");
      return;
    }
    if (planId === CURRENT_PLAN) {
      toast.success("You are already on this plan");
      return;
    }
    router.push(`/billing/checkout?plan=${planId}`);
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto scrollbar-thin">
      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Billing & Subscription</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your subscription, view invoices, and track usage.
          </p>
        </div>

        <div className="space-y-8 animate-fade-in">
          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Current Plan</h2>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cavrix-600/15">
                      <Zap className="h-5 w-5 text-cavrix-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Current Plan</p>
                      <p className="text-xl font-bold text-white">
                        {SUBSCRIPTION_PLANS.find((p) => p.id === CURRENT_PLAN)?.name ||
                          "Free"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Renews on</span>
                  </div>
                  <p className="text-sm font-medium text-white">Sep 07, 2026</p>
                </div>
              </div>
              <div className="mt-4 border-t border-slate-800 pt-4">
                <p className="mb-2 text-sm font-medium text-slate-300">Plan Features</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {SUBSCRIPTION_PLANS.find((p) => p.id === CURRENT_PLAN)?.features.map(
                    (feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-cavrix-400" />
                        <span className="text-sm text-slate-400">{feature}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Upgrade Plan</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SUBSCRIPTION_PLANS.map((plan) => {
                const isCurrent = plan.id === CURRENT_PLAN;
                const isPopular = plan.recommended;
                const isBusiness = plan.id === "business";
                const isUpgrade = plan.price === -1;

                return (
                  <div
                    key={plan.id}
                    className={cn(
                      "relative flex flex-col rounded-2xl border p-6 backdrop-blur-xl transition-all duration-200",
                      isCurrent
                        ? "border-cavrix-500 bg-cavrix-600/10 shadow-cavrix"
                        : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                    )}
                  >
                    {plan.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cavrix-gradient px-3 py-1 text-xs font-bold text-white shadow-cavrix">
                        {plan.badge}
                      </span>
                    )}
                    {isCurrent && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-cavrix-500 bg-cavrix-900/80 px-3 py-1 text-xs font-bold text-cavrix-300">
                        CURRENT
                      </span>
                    )}
                    <div className="mb-4 mt-2">
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                      <div className="mt-2">
                        {isUpgrade ? (
                          <p className="text-lg font-bold text-white">Custom</p>
                        ) : (
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-white">
                              ₹{plan.price === 0 ? "0" : plan.price.toLocaleString("en-IN")}
                            </span>
                            <span className="text-sm text-slate-500">
                              /{plan.interval}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <ul className="mb-6 flex-1 space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-cavrix-400" />
                          <span className="text-sm text-slate-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={isCurrent ? "outline" : "default"}
                      className={cn(
                        "w-full",
                        !isCurrent &&
                          !isBusiness &&
                          "bg-cavrix-gradient hover:bg-cavrix-gradient-hover text-white shadow-cavrix",
                        isBusiness &&
                          "bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
                      )}
                      disabled={isCurrent}
                      onClick={() => handleSubscribe(plan.id)}
                    >
                      {isCurrent
                        ? "Current Plan"
                        : isBusiness
                          ? "Contact Sales"
                          : "Upgrade"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Usage Statistics</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {usageData.map((item) => {
                const Icon = item.icon;
                const percent = Math.round((item.used / item.total) * 100);
                const customColor = getProgressColor(percent);

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800">
                          <Icon className="h-4 w-4 text-cavrix-400" />
                        </div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                      </div>
                      <p className="text-sm text-slate-500">
                        {formatNumber(item.used)} / {formatNumber(item.total)}
                      </p>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={cn(
                          "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r transition-all duration-500",
                          customColor || item.color
                        )}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">{percent}% used</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Payment History</h2>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                        Invoice
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {paymentHistory.map((entry) => (
                      <tr
                        key={entry.id}
                        className="transition-colors hover:bg-slate-800/30"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">
                          {entry.date}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                          {entry.description}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                          {entry.amount}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                              entry.status === "paid"
                                ? "bg-green-500/15 text-green-400"
                                : "bg-red-500/15 text-red-400"
                            )}
                          >
                            {entry.status === "paid" ? "Paid" : "Failed"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDownloadInvoice(entry.id)}
                            className="inline-flex items-center gap-1.5 text-sm text-cavrix-400 transition-colors hover:text-cavrix-300"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
