"use client";

import {
  Users,
  Activity,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  CreditCard,
  BarChart3,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Total Users",
    value: "12,847",
    change: "+12.5%",
    up: true,
    icon: Users,
    color: "text-cavrix-400",
    bgColor: "bg-cavrix-600/15",
  },
  {
    label: "Active Users",
    value: "3,421",
    change: "+8.2%",
    up: true,
    icon: Activity,
    color: "text-cyan-400",
    bgColor: "bg-cyan-600/15",
  },
  {
    label: "Revenue",
    value: "₹4,52,300",
    change: "+15.3%",
    up: true,
    icon: DollarSign,
    color: "text-purple-400",
    bgColor: "bg-purple-600/15",
  },
  {
    label: "Total Conversations",
    value: "89,234",
    change: "-2.1%",
    up: false,
    icon: MessageSquare,
    color: "text-cavrix-300",
    bgColor: "bg-cavrix-500/15",
  },
];

const userGrowth = [
  { month: "Jan", users: 6200 },
  { month: "Feb", users: 6800 },
  { month: "Mar", users: 7400 },
  { month: "Apr", users: 7900 },
  { month: "May", users: 8500 },
  { month: "Jun", users: 9100 },
  { month: "Jul", users: 9800 },
  { month: "Aug", users: 10400 },
  { month: "Sep", users: 11000 },
  { month: "Oct", users: 11500 },
  { month: "Nov", users: 12100 },
  { month: "Dec", users: 12847 },
];

const revenueTrend = [
  { month: "Jan", revenue: 220000 },
  { month: "Feb", revenue: 248000 },
  { month: "Mar", revenue: 231000 },
  { month: "Apr", revenue: 285000 },
  { month: "May", revenue: 312000 },
  { month: "Jun", revenue: 298000 },
  { month: "Jul", revenue: 356000 },
  { month: "Aug", revenue: 381000 },
  { month: "Sep", revenue: 364000 },
  { month: "Oct", revenue: 402000 },
  { month: "Nov", revenue: 428000 },
  { month: "Dec", revenue: 452300 },
];

const recentActivity = [
  {
    id: "1",
    user: "Aarav Sharma",
    email: "aarav@example.com",
    action: "Upgraded to Pro plan",
    time: "2 minutes ago",
    status: "success",
  },
  {
    id: "2",
    user: "Priya Patel",
    email: "priya@example.com",
    action: "Created new account",
    time: "18 minutes ago",
    status: "success",
  },
  {
    id: "3",
    user: "Vikram Singh",
    email: "vikram@example.com",
    action: "Payment failed - ₹1,999",
    time: "45 minutes ago",
    status: "failed",
  },
  {
    id: "4",
    user: "Sneha Reddy",
    email: "sneha@example.com",
    action: "Cancelled subscription",
    time: "1 hour ago",
    status: "failed",
  },
  {
    id: "5",
    user: "Rohan Mehta",
    email: "rohan@example.com",
    action: "Downgraded to Basic plan",
    time: "3 hours ago",
    status: "warning",
  },
  {
    id: "6",
    user: "Ananya Gupta",
    email: "ananya@example.com",
    action: "Upgraded to Ultra plan",
    time: "5 hours ago",
    status: "success",
  },
];

const quickActions = [
  {
    label: "Manage Users",
    description: "View and manage user accounts",
    href: "/admin/users",
    icon: UserCog,
    color: "text-cavrix-400",
    bgColor: "bg-cavrix-600/15",
  },
  {
    label: "View Revenue",
    description: "Track revenue and payments",
    href: "/admin/subscriptions",
    icon: CreditCard,
    color: "text-purple-400",
    bgColor: "bg-purple-600/15",
  },
  {
    label: "System Settings",
    description: "Configure admin preferences",
    href: "/admin/system",
    icon: Settings,
    color: "text-cyan-400",
    bgColor: "bg-cyan-600/15",
  },
];

export default function AdminDashboardPage() {
  const isAdmin = true;

  if (!isAdmin) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center backdrop-blur-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15">
            <Shield className="h-7 w-7 text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-white">Access Denied</h1>
          <p className="max-w-sm text-sm text-slate-500">
            You do not have permission to view this page. Please contact an
            administrator if you believe this is a mistake.
          </p>
        </div>
      </div>
    );
  }

  const maxGrowth = Math.max(...userGrowth.map((d) => d.users));
  const maxRevenue = Math.max(...revenueTrend.map((d) => d.revenue));

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-lg border border-purple-500/30 bg-purple-600/15 px-2.5 py-1 text-xs font-medium text-purple-300">
              Admin
            </span>
            <p className="text-sm text-slate-500">
              Overview of your platform performance
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 animate-fade-in">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((card) => {
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
                  <span
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium",
                      card.up ? "text-green-400" : "text-red-400"
                    )}
                  >
                    {card.up ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {card.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{card.value}</p>
                <p className="mt-0.5 text-xs text-slate-500">{card.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Users Growth</h2>
                <p className="text-xs text-slate-500">New users per month</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cavrix-600/15">
                <BarChart3 className="h-4 w-4 text-cavrix-400" />
              </div>
            </div>
            <div className="flex items-end gap-2" style={{ height: "200px" }}>
              {userGrowth.map((bar) => {
                const heightPercent = (bar.users / maxGrowth) * 100;
                return (
                  <div
                    key={bar.month}
                    className="group flex flex-1 flex-col items-center gap-2"
                  >
                    <span className="text-[10px] font-medium text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                      {bar.users.toLocaleString()}
                    </span>
                    <div className="relative w-full" style={{ height: "160px" }}>
                      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
                        <div
                          className="w-full max-w-[24px] rounded-t bg-gradient-to-t from-cavrix-600 to-purple-500 transition-all duration-300 hover:from-cavrix-500 hover:to-purple-400"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500">{bar.month}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Revenue</h2>
                <p className="text-xs text-slate-500">Monthly revenue (₹)</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600/15">
                <TrendingUp className="h-4 w-4 text-purple-400" />
              </div>
            </div>
            <div className="flex items-end gap-2" style={{ height: "200px" }}>
              {revenueTrend.map((bar) => {
                const heightPercent = (bar.revenue / maxRevenue) * 100;
                return (
                  <div
                    key={bar.month}
                    className="group flex flex-1 flex-col items-center gap-2"
                  >
                    <span className="text-[10px] font-medium text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                      ₹{(bar.revenue / 1000).toFixed(1)}k
                    </span>
                    <div className="relative w-full" style={{ height: "160px" }}>
                      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
                        <div
                          className="w-full max-w-[24px] rounded-t bg-gradient-to-t from-purple-600 to-cyan-500 transition-all duration-300 hover:from-purple-500 hover:to-cyan-400"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500">{bar.month}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Recent Activity
              </h2>
              <span className="text-xs text-slate-500">Last 24 hours</span>
            </div>
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/20 p-3 transition-colors hover:bg-slate-800/40"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cavrix-500 to-purple-600">
                    <span className="text-sm font-bold text-white">
                      {item.user.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {item.user}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {item.action} · {item.email}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-lg px-2 py-1 text-[10px] font-medium uppercase tracking-wide",
                      item.status === "success" &&
                        "bg-green-500/10 text-green-400",
                      item.status === "failed" && "bg-red-500/10 text-red-400",
                      item.status === "warning" &&
                        "bg-yellow-500/10 text-yellow-400"
                    )}
                  >
                    {item.status}
                  </span>
                  <span className="hidden text-xs text-slate-600 sm:block">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/20 p-4 transition-all hover:border-slate-700 hover:bg-slate-800/40"
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
                        action.bgColor
                      )}
                    >
                      <Icon className={cn("h-5 w-5", action.color)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white transition-colors group-hover:text-cavrix-300">
                        {action.label}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {action.description}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-600 transition-colors group-hover:text-cavrix-400" />
                  </a>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
