"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  LayoutDashboard,
  Users,
  CreditCard,
  Cpu,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { label: "AI Usage", href: "/admin/ai-usage", icon: Cpu },
  { label: "System", href: "/admin/system", icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800/60 bg-slate-900/30 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cavrix-gradient shadow-lg shadow-cavrix-600/20">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">Admin</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-600/15 px-3 py-1.5">
          <Shield className="h-3.5 w-3.5 text-purple-400" />
          <span className="text-xs font-medium text-purple-300">Admin Panel</span>
        </div>
      </div>

      <nav className="flex items-center gap-1 border-b border-slate-800/60 bg-slate-900/20 px-6 py-3 backdrop-blur-xl">
        <Link
          href="/"
          className="mr-2 flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-cavrix-600/20 text-cavrix-300 shadow-sm"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
