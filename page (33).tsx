"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FolderOpen,
  Plus,
  Trash2,
  MessageSquare,
  FileText,
  Calendar,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectData } from "@/types";

const INITIAL_PROJECTS: ProjectData[] = [
  {
    id: "1",
    name: "My Website",
    description: "Building a portfolio site",
    _count: { conversations: 12, files: 5 },
    createdAt: "2024-11-20",
    updatedAt: "2024-12-01",
  },
  {
    id: "2",
    name: "Research Project",
    description: "AI research papers",
    _count: { conversations: 8, files: 3 },
    createdAt: "2024-11-25",
    updatedAt: "2024-12-03",
  },
  {
    id: "3",
    name: "Mobile App",
    description: "React Native project",
    _count: { conversations: 5, files: 2 },
    createdAt: "2024-12-01",
    updatedAt: "2024-12-05",
  },
];

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectData[]>(INITIAL_PROJECTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  function handleCreateProject() {
    if (!newProjectName.trim()) {
      toast.error("Project name is required");
      return;
    }
    const now = new Date().toISOString().split("T")[0];
    const project: ProjectData = {
      id: String(Date.now()),
      name: newProjectName.trim(),
      description: newProjectDesc.trim() || undefined,
      _count: { conversations: 0, files: 0 },
      createdAt: now,
      updatedAt: now,
    };
    setProjects((prev) => [project, ...prev]);
    setNewProjectName("");
    setNewProjectDesc("");
    setShowCreateModal(false);
    toast.success("Project created");
  }

  function handleDeleteProject(id: string) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirmId(null);
    toast.success("Project deleted");
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <Button
          variant="gradient"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <FolderOpen className="h-12 w-12 text-slate-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              No projects yet
            </h3>
            <p className="mb-6 max-w-sm text-sm text-slate-400">
              Create your first project to organize conversations and files.
            </p>
            <Button
              variant="gradient"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative cursor-pointer rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cavrix-600/20 text-cavrix-400">
                      <FolderOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {project.name}
                      </h3>
                      <p className="max-w-[200px] truncate text-xs text-slate-400">
                        {project.description || "No description"}
                      </p>
                    </div>
                  </div>
                  <button
                    className="rounded-lg p-1.5 text-slate-500 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirmId(project.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {project._count?.conversations ?? 0}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    {project._count?.files ?? 0}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {project.updatedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111118] p-6 shadow-2xl animate-slide-up">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">New Project</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Project Name
                </label>
                <Input
                  placeholder="Enter project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateProject()}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Description
                </label>
                <Textarea
                  placeholder="What is this project about?"
                  rows={3}
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button variant="gradient" onClick={handleCreateProject}>
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111118] p-6 shadow-2xl animate-slide-up">
            <h2 className="mb-2 text-lg font-semibold text-white">
              Delete Project
            </h2>
            <p className="mb-6 text-sm text-slate-400">
              Are you sure you want to delete this project? This action cannot be
              undone. All conversations and files will be removed.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteProject(deleteConfirmId)}
              >
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
