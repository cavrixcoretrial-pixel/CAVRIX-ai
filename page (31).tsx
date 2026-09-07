"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Bot,
  Plus,
  Upload,
  Star,
  X,
  Code,
  MessageSquare,
  Palette,
  Search,
  PenTool,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BuiltInAgent {
  id: string;
  name: string;
  description: string;
  model: string;
  capabilities: string[];
  avatarColor: string;
  icon: React.ReactNode;
}

const BUILT_IN_AGENTS: BuiltInAgent[] = [
  {
    id: "coding-expert",
    name: "Coding Expert",
    description:
      "Advanced AI coding assistant for code generation, debugging, refactoring, and technical problem solving.",
    model: "cavrix-code",
    capabilities: ["Code Generation", "Debugging", "Refactoring"],
    avatarColor: "bg-cyan-500/20 text-cyan-400",
    icon: <Code className="h-5 w-5" />,
  },
  {
    id: "discord-bot-dev",
    name: "Discord Bot Developer",
    description:
      "Specialized in building Discord bots with discord.js, handling events, commands, and integrations.",
    model: "cavrix-pro",
    capabilities: ["discord.js", "Bot Creation", "Event Handling"],
    avatarColor: "bg-purple-500/20 text-purple-400",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    id: "website-designer",
    name: "Website Designer",
    description:
      "Creative web designer for building responsive, modern websites with HTML, CSS, JavaScript, and UI design.",
    model: "cavrix-pro",
    capabilities: ["HTML/CSS/JS", "UI Design", "Responsive Layout"],
    avatarColor: "bg-pink-500/20 text-pink-400",
    icon: <Palette className="h-5 w-5" />,
  },
  {
    id: "research-assistant",
    name: "Research Assistant",
    description:
      "AI-powered research tool for web research, data analysis, and comprehensive report generation.",
    model: "cavrix-research",
    capabilities: ["Web Research", "Analysis", "Report Writing"],
    avatarColor: "bg-emerald-500/20 text-emerald-400",
    icon: <Search className="h-5 w-5" />,
  },
  {
    id: "content-writer",
    name: "Content Writer",
    description:
      "Expert content creator for writing, editing, SEO optimization, and engaging copywriting.",
    model: "cavrix-pro",
    capabilities: ["Writing", "Editing", "SEO"],
    avatarColor: "bg-amber-500/20 text-amber-400",
    icon: <PenTool className="h-5 w-5" />,
  },
  {
    id: "business-advisor",
    name: "Business Advisor",
    description:
      "Strategic business advisor for planning, strategy development, market analysis, and growth insights.",
    model: "cavrix-ultra",
    capabilities: ["Strategy", "Planning", "Analysis"],
    avatarColor: "bg-red-500/20 text-red-400",
    icon: <Briefcase className="h-5 w-5" />,
  },
];

const MODEL_OPTIONS = [
  { value: "cavrix-lite", label: "Cavrix Lite" },
  { value: "cavrix-pro", label: "Cavrix Pro" },
  { value: "cavrix-code", label: "Cavrix Code" },
  { value: "cavrix-research", label: "Cavrix Research" },
  { value: "cavrix-ultra", label: "Cavrix Ultra" },
];

export default function AgentsPage() {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [agentDesc, setAgentDesc] = useState("");
  const [agentInstructions, setAgentInstructions] = useState("");
  const [agentPersonality, setAgentPersonality] = useState("");
  const [agentModel, setAgentModel] = useState("cavrix-pro");

  function handleCreateAgent() {
    if (!agentName.trim()) {
      toast.error("Agent name is required");
      return;
    }
    toast.success("Agent created successfully");
    setAgentName("");
    setAgentDesc("");
    setAgentInstructions("");
    setAgentPersonality("");
    setAgentModel("cavrix-pro");
    setShowCreateModal(false);
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">AI Agents</h1>
        <Button variant="gradient" onClick={() => setShowCreateModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Agent
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        <div className="mb-6">
          <h2 className="mb-1 text-sm font-semibold text-slate-300">
            Built-in Agents
          </h2>
          <p className="text-xs text-slate-500">
            Pre-configured agents optimized for specific tasks
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {BUILT_IN_AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="group cursor-pointer rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
              onClick={() => router.push(`/agents/${agent.id}`)}
            >
              <div className="mb-4 flex items-start gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${agent.avatarColor}`}
                >
                  {agent.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white">{agent.name}</h3>
                  <p className="mt-0.5 line-clamp-2 text-xs text-slate-400">
                    {agent.description}
                  </p>
                </div>
              </div>

              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-400">
                  <Star className="h-2.5 w-2.5" />
                  {agent.model}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {agent.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-400"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111118] p-6 shadow-2xl animate-slide-up">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Create Agent
              </h2>
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
                  Avatar
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/5 text-slate-500 transition-colors hover:border-cavrix-500/40 hover:text-cavrix-400">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Upload an avatar image
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Name
                </label>
                <Input
                  placeholder="My Custom Agent"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Description
                </label>
                <Input
                  placeholder="What does this agent do?"
                  value={agentDesc}
                  onChange={(e) => setAgentDesc(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Instructions
                </label>
                <Textarea
                  placeholder="Detailed instructions for the agent's behavior and expertise..."
                  rows={4}
                  value={agentInstructions}
                  onChange={(e) => setAgentInstructions(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Personality
                </label>
                <Input
                  placeholder="e.g. Professional, creative, friendly"
                  value={agentPersonality}
                  onChange={(e) => setAgentPersonality(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Model
                </label>
                <select
                  value={agentModel}
                  onChange={(e) => setAgentModel(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 transition-colors focus:border-cavrix-500 focus:outline-none focus:ring-1 focus:ring-cavrix-500"
                >
                  {MODEL_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button variant="gradient" onClick={handleCreateAgent}>
                <Bot className="mr-2 h-4 w-4" />
                Create Agent
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
