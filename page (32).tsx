"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Bot,
  Star,
  Edit3,
  Trash2,
  MessageSquare,
  Code,
  Palette,
  Search,
  PenTool,
  Briefcase,
  Settings,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AgentDetail {
  id: string;
  name: string;
  description: string;
  instructions: string;
  personality: string;
  model: string;
  capabilities: string[];
  avatarColor: string;
  icon: React.ReactNode;
  isBuiltIn: boolean;
}

const AGENTS_MAP: Record<string, AgentDetail> = {
  "coding-expert": {
    id: "coding-expert",
    name: "Coding Expert",
    description:
      "Advanced AI coding assistant for code generation, debugging, refactoring, and technical problem solving across all programming languages.",
    instructions:
      "You are an expert software developer with deep knowledge of programming languages, design patterns, and best practices. Help users write clean, efficient, and maintainable code. Always explain your reasoning and suggest improvements.",
    personality: "Technical, precise, and thorough",
    model: "cavrix-code",
    capabilities: [
      "Code Generation",
      "Debugging",
      "Refactoring",
      "Code Review",
      "Architecture Design",
    ],
    avatarColor: "bg-cyan-500/20 text-cyan-400",
    icon: <Code className="h-6 w-6" />,
    isBuiltIn: true,
  },
  "discord-bot-dev": {
    id: "discord-bot-dev",
    name: "Discord Bot Developer",
    description:
      "Specialized in building Discord bots with discord.js, handling events, commands, slash commands, and integrations with external APIs.",
    instructions:
      "You are an expert Discord bot developer specializing in discord.js. Help users create, debug, and optimize Discord bots. Provide working code examples and explain Discord API concepts clearly.",
    personality: "Helpful, community-focused, and detail-oriented",
    model: "cavrix-pro",
    capabilities: [
      "discord.js",
      "Bot Creation",
      "Event Handling",
      "Slash Commands",
      "Database Integration",
    ],
    avatarColor: "bg-purple-500/20 text-purple-400",
    icon: <MessageSquare className="h-6 w-6" />,
    isBuiltIn: true,
  },
  "website-designer": {
    id: "website-designer",
    name: "Website Designer",
    description:
      "Creative web designer for building responsive, modern websites with HTML, CSS, JavaScript, React, and professional UI/UX design.",
    instructions:
      "You are a professional web designer with expertise in modern web technologies. Help users create beautiful, responsive, and accessible websites. Focus on clean code, good UX, and cross-browser compatibility.",
    personality: "Creative, modern, and user-focused",
    model: "cavrix-pro",
    capabilities: [
      "HTML/CSS/JS",
      "UI Design",
      "Responsive Layout",
      "React",
      "Tailwind CSS",
    ],
    avatarColor: "bg-pink-500/20 text-pink-400",
    icon: <Palette className="h-6 w-6" />,
    isBuiltIn: true,
  },
  "research-assistant": {
    id: "research-assistant",
    name: "Research Assistant",
    description:
      "AI-powered research tool for web research, data analysis, source verification, and comprehensive report generation.",
    instructions:
      "You are a research specialist skilled in finding, analyzing, and synthesizing information from multiple sources. Help users conduct thorough research, verify facts, and create well-structured reports with citations.",
    personality: "Analytical, thorough, and objective",
    model: "cavrix-research",
    capabilities: [
      "Web Research",
      "Analysis",
      "Report Writing",
      "Data Synthesis",
      "Source Verification",
    ],
    avatarColor: "bg-emerald-500/20 text-emerald-400",
    icon: <Search className="h-6 w-6" />,
    isBuiltIn: true,
  },
  "content-writer": {
    id: "content-writer",
    name: "Content Writer",
    description:
      "Expert content creator for writing, editing, SEO optimization, blog posts, marketing copy, and engaging copywriting.",
    instructions:
      "You are a professional content writer and editor. Help users create compelling, well-structured content optimized for readability and SEO. Adapt your tone and style to match the target audience and platform.",
    personality: "Creative, engaging, and adaptable",
    model: "cavrix-pro",
    capabilities: ["Writing", "Editing", "SEO", "Copywriting", "Blog Posts"],
    avatarColor: "bg-amber-500/20 text-amber-400",
    icon: <PenTool className="h-6 w-6" />,
    isBuiltIn: true,
  },
  "business-advisor": {
    id: "business-advisor",
    name: "Business Advisor",
    description:
      "Strategic business advisor for planning, strategy development, market analysis, financial modeling, and growth insights.",
    instructions:
      "You are an experienced business strategist and advisor. Help users with business planning, market analysis, competitive strategy, financial projections, and growth hacking. Provide actionable insights backed by data.",
    personality: "Strategic, data-driven, and visionary",
    model: "cavrix-ultra",
    capabilities: [
      "Strategy",
      "Planning",
      "Analysis",
      "Market Research",
      "Financial Modeling",
    ],
    avatarColor: "bg-red-500/20 text-red-400",
    icon: <Briefcase className="h-6 w-6" />,
    isBuiltIn: true,
  },
};

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [agent, setAgent] = useState<AgentDetail>(
    AGENTS_MAP[id] ?? {
      id,
      name: "Custom Agent",
      description: "A custom AI agent",
      instructions: "You are a helpful AI assistant.",
      personality: "Friendly and helpful",
      model: "cavrix-pro",
      capabilities: ["Chat"],
      avatarColor: "bg-cavrix-500/20 text-cavrix-400",
      icon: <Bot className="h-6 w-6" />,
      isBuiltIn: false,
    }
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(agent.name);
  const [editDesc, setEditDesc] = useState(agent.description);
  const [editInstructions, setEditInstructions] = useState(agent.instructions);
  const [editPersonality, setEditPersonality] = useState(agent.personality);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleSave() {
    if (!editName.trim()) {
      toast.error("Agent name is required");
      return;
    }
    setAgent((prev) => ({
      ...prev,
      name: editName.trim(),
      description: editDesc.trim(),
      instructions: editInstructions.trim(),
      personality: editPersonality.trim(),
    }));
    setIsEditing(false);
    toast.success("Agent updated");
  }

  function handleDelete() {
    toast.success("Agent deleted");
    router.push("/agents");
  }

  const modelLabels: Record<string, string> = {
    "cavrix-lite": "Cavrix Lite",
    "cavrix-pro": "Cavrix Pro",
    "cavrix-code": "Cavrix Code",
    "cavrix-research": "Cavrix Research",
    "cavrix-ultra": "Cavrix Ultra",
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="border-b border-white/5 px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/agents")}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-xl ${agent.avatarColor}`}
            >
              {agent.icon}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{agent.name}</h1>
              <p className="text-sm text-slate-400">{agent.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
              <Star className="h-3 w-3" />
              {modelLabels[agent.model] ?? agent.model}
            </span>
            {!agent.isBuiltIn && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <Shield className="h-3 w-3" />
                Custom
              </span>
            )}
            {agent.isBuiltIn && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                <Star className="h-3 w-3" />
                Built-in
              </span>
            )}
          </div>

          {!isEditing ? (
            <>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="mb-3 text-sm font-semibold text-white">
                  Instructions
                </h3>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                  {agent.instructions}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="mb-3 text-sm font-semibold text-white">
                  Personality
                </h3>
                <p className="text-sm text-slate-300">{agent.personality}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="mb-3 text-sm font-semibold text-white">
                  Capabilities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-lg bg-white/5 px-3 py-1 text-xs text-slate-300"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Name
                </label>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Description
                </label>
                <Input
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Instructions
                </label>
                <Textarea
                  rows={6}
                  value={editInstructions}
                  onChange={(e) => setEditInstructions(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Personality
                </label>
                <Input
                  value={editPersonality}
                  onChange={(e) => setEditPersonality(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="gradient"
              onClick={() => toast.success("Chat started with " + agent.name)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Start Chat
            </Button>

            {!agent.isBuiltIn && (
              <>
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button variant="default" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111118] p-6 shadow-2xl animate-slide-up">
            <h2 className="mb-2 text-lg font-semibold text-white">
              Delete Agent
            </h2>
            <p className="mb-6 text-sm text-slate-400">
              Are you sure you want to delete &quot;{agent.name}&quot;? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
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
