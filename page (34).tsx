"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  MessageSquare,
  FileText,
  Settings,
  Plus,
  Trash2,
  Edit3,
  FolderOpen,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PLACEHOLDER_PROJECT = {
  id: "1",
  name: "My Website",
  description: "Building a portfolio site",
};

const PLACEHOLDER_CONVERSATIONS = [
  { id: "c1", title: "Homepage layout discussion", updatedAt: "2024-12-01" },
  { id: "c2", title: "Color palette selection", updatedAt: "2024-11-28" },
  { id: "c3", title: "Responsive design help", updatedAt: "2024-11-25" },
  { id: "c4", title: "Navigation component", updatedAt: "2024-11-20" },
];

const PLACEHOLDER_FILES = [
  { id: "f1", name: "index.html", size: "2.4 KB", updatedAt: "2024-12-01" },
  { id: "f2", name: "styles.css", size: "5.1 KB", updatedAt: "2024-11-30" },
  { id: "f3", name: "app.js", size: "3.2 KB", updatedAt: "2024-11-28" },
  { id: "f4", name: "README.md", size: "1.1 KB", updatedAt: "2024-11-25" },
  { id: "f5", name: "logo.png", size: "48.7 KB", updatedAt: "2024-11-20" },
];

type Tab = "conversations" | "files" | "settings";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("conversations");
  const [project, setProject] = useState(PLACEHOLDER_PROJECT);
  const [editName, setEditName] = useState(PLACEHOLDER_PROJECT.name);
  const [editDesc, setEditDesc] = useState(PLACEHOLDER_PROJECT.description);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleSaveSettings() {
    if (!editName.trim()) {
      toast.error("Project name is required");
      return;
    }
    setProject((prev) => ({
      ...prev,
      name: editName.trim(),
      description: editDesc.trim(),
    }));
    toast.success("Project updated");
  }

  function handleDeleteProject() {
    toast.success("Project deleted");
    router.push("/projects");
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "conversations",
      label: "Conversations",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: "files",
      label: "Files",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="border-b border-white/5 px-6 py-4">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => router.push("/projects")}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cavrix-600/20 text-cavrix-400">
              <FolderOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{project.name}</h1>
              <p className="text-sm text-slate-400">
                {project.description || "No description"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <div className="ml-auto">
            <Button
              variant="gradient"
              size="sm"
              onClick={() => toast.success("New chat created")}
            >
              <Plus className="mr-2 h-3.5 w-3.5" />
              New Chat
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        {activeTab === "conversations" && (
          <div className="space-y-2">
            {PLACEHOLDER_CONVERSATIONS.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <MessageSquare className="mb-3 h-10 w-10 text-slate-600" />
                <p className="text-sm text-slate-400">
                  No conversations in this project yet
                </p>
              </div>
            ) : (
              PLACEHOLDER_CONVERSATIONS.map((conv) => (
                <div
                  key={conv.id}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-all hover:border-purple-500/20 hover:bg-white/[0.05]"
                  onClick={() => router.push(`/chat/${conv.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-purple-400" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {conv.title}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {conv.updatedAt}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "files" && (
          <div className="space-y-2">
            {PLACEHOLDER_FILES.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-all hover:border-cyan-500/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-cyan-400" />
                  <div>
                    <p className="text-sm font-medium text-white">{file.name}</p>
                    <p className="text-xs text-slate-500">
                      {file.size} &middot; {file.updatedAt}
                    </p>
                  </div>
                </div>
                <button className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-400">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="mx-auto max-w-lg space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 text-sm font-semibold text-white">
                Project Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">
                    Name
                  </label>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">
                    Description
                  </label>
                  <Textarea
                    rows={3}
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                  />
                </div>
                <Button variant="gradient" onClick={handleSaveSettings}>
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
              <h3 className="mb-2 text-sm font-semibold text-red-400">
                Danger Zone
              </h3>
              <p className="mb-4 text-sm text-slate-400">
                Permanently delete this project and all its data.
              </p>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Project
              </Button>
            </div>
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111118] p-6 shadow-2xl animate-slide-up">
            <h2 className="mb-2 text-lg font-semibold text-white">
              Delete Project
            </h2>
            <p className="mb-6 text-sm text-slate-400">
              This will permanently delete &quot;{project.name}&quot; and all
              associated data.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteProject}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
