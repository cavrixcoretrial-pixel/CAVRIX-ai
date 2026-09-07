"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  Eye,
  Ban,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Basic" | "Pro" | "Ultra";
  status: "Active" | "Suspended" | "Pending";
  joined: string;
  avatar: string;
}

const initialUsers: AdminUser[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    plan: "Ultra",
    status: "Active",
    joined: "Jan 12, 2026",
    avatar: "AS",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    plan: "Pro",
    status: "Active",
    joined: "Feb 3, 2026",
    avatar: "PP",
  },
  {
    id: "3",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    plan: "Basic",
    status: "Suspended",
    joined: "Mar 18, 2026",
    avatar: "VS",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    plan: "Pro",
    status: "Active",
    joined: "Apr 2, 2026",
    avatar: "SR",
  },
  {
    id: "5",
    name: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    plan: "Free",
    status: "Pending",
    joined: "May 11, 2026",
    avatar: "RM",
  },
  {
    id: "6",
    name: "Ananya Gupta",
    email: "ananya.gupta@example.com",
    plan: "Ultra",
    status: "Active",
    joined: "Jun 27, 2026",
    avatar: "AG",
  },
  {
    id: "7",
    name: "Kabir Joshi",
    email: "kabir.joshi@example.com",
    plan: "Basic",
    status: "Active",
    joined: "Jul 9, 2026",
    avatar: "KJ",
  },
  {
    id: "8",
    name: "Meera Nair",
    email: "meera.nair@example.com",
    plan: "Pro",
    status: "Suspended",
    joined: "Aug 15, 2026",
    avatar: "MN",
  },
  {
    id: "9",
    name: "Devansh Kapoor",
    email: "devansh.kapoor@example.com",
    plan: "Free",
    status: "Active",
    joined: "Aug 28, 2026",
    avatar: "DK",
  },
  {
    id: "10",
    name: "Ishita Verma",
    email: "ishita.verma@example.com",
    plan: "Ultra",
    status: "Active",
    joined: "Sep 1, 2026",
    avatar: "IV",
  },
];

const plans = ["Free", "Basic", "Pro", "Ultra"] as const;
const statuses = ["Active", "Suspended", "Pending"] as const;
const pageSize = 5;

const planColors: Record<AdminUser["plan"], string> = {
  Free: "bg-slate-500/10 text-slate-400",
  Basic: "bg-cavrix-600/10 text-cavrix-400",
  Pro: "bg-purple-600/10 text-purple-400",
  Ultra: "bg-cyan-600/10 text-cyan-400",
};

const statusColors: Record<AdminUser["status"], string> = {
  Active: "bg-green-500/10 text-green-400",
  Suspended: "bg-red-500/10 text-red-400",
  Pending: "bg-yellow-500/10 text-yellow-400",
};

const avatarGradients = [
  "from-cavrix-500 to-purple-600",
  "from-purple-500 to-cyan-500",
  "from-cyan-500 to-cavrix-500",
  "from-cavrix-400 to-purple-500",
  "from-purple-400 to-cavrix-500",
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = planFilter === "All" || user.plan === planFilter;
    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleView = (user: AdminUser) => {
    toast.success(`Viewing ${user.name}`);
  };

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "Suspended" ? "Active" : "Suspended",
            }
          : u
      )
    );
  };

  const handleChangePlan = (id: string, plan: AdminUser["plan"]) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, plan } : u))
    );
    toast.success("Plan updated");
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          {users.length} registered users
          <span className="rounded-lg border border-purple-500/30 bg-purple-600/15 px-2 py-0.5 text-xs font-medium text-purple-300">
            Admin
          </span>
        </p>
      </div>

      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              type="text"
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Plan</span>
              <select
                value={planFilter}
                onChange={(e) => {
                  setPlanFilter(e.target.value);
                  resetPage();
                }}
                className="h-10 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-slate-300 outline-none transition-colors focus:border-cavrix-500"
              >
                <option value="All">All Plans</option>
                {plans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Status</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  resetPage();
                }}
                className="h-10 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-slate-300 outline-none transition-colors focus:border-cavrix-500"
              >
                <option value="All">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/20 text-xs text-slate-500">
                  <th className="px-6 py-4 font-medium">User</th>
                  <th className="px-6 py-4 font-medium">Plan</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Joined</th>
                  <th className="px-6 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white",
                            avatarGradients[index % avatarGradients.length]
                          )}
                        >
                          {user.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {user.name}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.plan}
                        onChange={(e) =>
                          handleChangePlan(
                            user.id,
                            e.target.value as AdminUser["plan"]
                          )
                        }
                        className={cn(
                          "rounded-lg border border-transparent px-2.5 py-1 text-xs font-medium outline-none transition-colors focus:border-slate-600",
                          planColors[user.plan]
                        )}
                      >
                        {plans.map((plan) => (
                          <option
                            key={plan}
                            value={plan}
                            className="bg-slate-900 text-slate-300"
                          >
                            {plan}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium",
                          statusColors[user.status]
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            user.status === "Active" &&
                              "bg-green-400",
                            user.status === "Suspended" && "bg-red-400",
                            user.status === "Pending" && "bg-yellow-400"
                          )}
                        />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {user.joined}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleView(user)}
                          title="View user"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleToggleStatus(user.id)}
                          title={
                            user.status === "Suspended"
                              ? "Unsuspend user"
                              : "Suspend user"
                          }
                          className={
                            user.status === "Suspended"
                              ? "text-green-400 hover:bg-green-500/10 hover:text-green-300"
                              : "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                          }
                        >
                          {user.status === "Suspended" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Ban className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Users className="mx-auto mb-2 h-8 w-8 text-slate-600" />
                      <p className="text-sm text-slate-500">
                        No users match your filters
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-300">
                {(currentPage - 1) * pageSize + 1}-
                {Math.min(currentPage * pageSize, filteredUsers.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-300">
                {filteredUsers.length}
              </span>{" "}
              users
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="icon-sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="icon-sm"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
