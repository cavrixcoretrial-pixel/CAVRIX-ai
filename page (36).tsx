"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Image,
  Code,
  Mic,
  Bot,
  FileSearch,
  TrendingUp,
  Star,
  ArrowRight,
  Globe,
  Palette,
} from "lucide-react";

const featuredItems = [
  {
    id: "deep-research",
    title: "Deep Research",
    description: "AI-powered research with source citations and analysis",
    icon: <FileSearch className="w-6 h-6" />,
    href: "/research",
    gradient: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    glowColor: "hover:shadow-purple-500/20",
    iconBg: "bg-purple-500/20 text-purple-400",
  },
  {
    id: "image-gen",
    title: "Image Generation",
    description: "Create stunning images from text descriptions",
    icon: <Image className="w-6 h-6" />,
    href: "/image-gen",
    gradient: "from-pink-500/20 to-pink-500/5",
    borderColor: "border-pink-500/30",
    glowColor: "hover:shadow-pink-500/20",
    iconBg: "bg-pink-500/20 text-pink-400",
  },
  {
    id: "code-assistant",
    title: "Code Assistant",
    description: "Write, debug, and optimize code with AI",
    icon: <Code className="w-6 h-6" />,
    href: "/code",
    gradient: "from-cyan-500/20 to-cyan-500/5",
    borderColor: "border-cyan-500/30",
    glowColor: "hover:shadow-cyan-500/20",
    iconBg: "bg-cyan-500/20 text-cyan-400",
  },
  {
    id: "voice-mode",
    title: "Voice Mode",
    description: "Natural voice conversations with Cavrix AI",
    icon: <Mic className="w-6 h-6" />,
    href: "/voice",
    gradient: "from-cavrix-500/20 to-cavrix-500/5",
    borderColor: "border-cavrix-500/30",
    glowColor: "hover:shadow-cavrix-500/20",
    iconBg: "bg-cavrix-500/20 text-cavrix-400",
  },
];

const popularAgents = [
  {
    id: "coding-expert",
    name: "Coding Expert",
    description: "Full-stack developer specializing in modern frameworks",
    icon: <Code className="w-5 h-5" />,
    category: "Development",
    rating: 4.9,
  },
  {
    id: "research-assistant",
    name: "Research Assistant",
    description: "Deep analysis and research with citations",
    icon: <Globe className="w-5 h-5" />,
    category: "Research",
    rating: 4.8,
  },
  {
    id: "creative-writer",
    name: "Creative Writer",
    description: "Storytelling, copywriting, and creative content",
    icon: <Palette className="w-5 h-5" />,
    category: "Content",
    rating: 4.7,
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description: "Analyze data, create charts, and find insights",
    icon: <TrendingUp className="w-5 h-5" />,
    category: "Analytics",
    rating: 4.8,
  },
  {
    id: "design-critic",
    name: "Design Critic",
    description: "UI/UX review and design improvement suggestions",
    icon: <Sparkles className="w-5 h-5" />,
    category: "Design",
    rating: 4.6,
  },
  {
    id: "product-manager",
    name: "Product Manager",
    description: "Product strategy, PRDs, and roadmap planning",
    icon: <Bot className="w-5 h-5" />,
    category: "Business",
    rating: 4.7,
  },
];

const recentResearch = [
  {
    id: "1",
    title: "The Future of Large Language Models in 2026",
    topic: "AI & Machine Learning",
    date: "2 hours ago",
    sources: 12,
  },
  {
    id: "2",
    title: "Quantum Computing Breakthroughs and Applications",
    topic: "Technology",
    date: "5 hours ago",
    sources: 8,
  },
  {
    id: "3",
    title: "Sustainable Energy Solutions: A Comprehensive Review",
    topic: "Environment",
    date: "1 day ago",
    sources: 15,
  },
  {
    id: "4",
    title: "Cybersecurity Trends and Threat Analysis 2026",
    topic: "Security",
    date: "2 days ago",
    sources: 10,
  },
];

export default function ExplorePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-full p-6 lg:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Explore</h1>
          <p className="text-white/50 text-lg mb-6">
            Discover powerful AI tools and agents
          </p>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search features, agents, research..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder-white/30 outline-none transition-all focus:border-purple-500/50 focus:bg-white/[0.07] focus:shadow-glow"
            />
          </div>
        </div>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Featured</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`group relative flex items-start gap-4 rounded-2xl border bg-gradient-to-br p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${item.gradient} ${item.borderColor} ${item.glowColor}`}
              >
                <div className={`flex shrink-0 items-center justify-center w-12 h-12 rounded-xl ${item.iconBg}`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white group-hover:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50">{item.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/50 transition-colors shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Bot className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">Popular Agents</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularAgents.map((agent) => (
              <Link
                key={agent.id}
                href={`/agents/${agent.id}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                    {agent.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">{agent.name}</h3>
                    <span className="text-xs text-white/30">{agent.category}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-yellow-400/80">
                    <Star className="w-3 h-3 fill-current" />
                    {agent.rating}
                  </div>
                </div>
                <p className="text-xs text-white/40 line-clamp-2">{agent.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <FileSearch className="w-5 h-5 text-cavrix-400" />
            <h2 className="text-xl font-semibold text-white">Recent Research</h2>
          </div>
          <div className="space-y-3">
            {recentResearch.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cavrix-500/10 text-cavrix-400 shrink-0">
                  <FileSearch className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white truncate">{item.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-white/30">{item.topic}</span>
                    <span className="text-xs text-white/20">·</span>
                    <span className="text-xs text-white/30">{item.sources} sources</span>
                  </div>
                </div>
                <span className="text-xs text-white/30 shrink-0">{item.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
