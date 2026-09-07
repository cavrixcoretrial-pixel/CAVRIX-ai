"use client"

import { useEffect, useRef, useState } from "react"
import { Search, MessageSquare, FolderOpen, Bot, FileText, ArrowUp, ArrowDown, CornerDownLeft } from "lucide-react"
import { useAppStore } from "@/context/app-store"

interface SearchResult {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  group: string
}

const placeholderResults: SearchResult[] = [
  { id: "1", title: "Research on quantum computing", subtitle: "Started 2 hours ago", icon: <MessageSquare className="w-4 h-4" />, group: "Conversations" },
  { id: "2", title: "Neural network architecture project", subtitle: "Last edited yesterday", icon: <FolderOpen className="w-4 h-4" />, group: "Projects" },
  { id: "3", title: "GPT-4 Agent", subtitle: "Advanced reasoning model", icon: <Bot className="w-4 h-4" />, group: "AI Agents" },
  { id: "4", title: "report-final.md", subtitle: "Documents / reports", icon: <FileText className="w-4 h-4" />, group: "Files" },
  { id: "5", title: "Image generation pipeline", subtitle: "Started 5 days ago", icon: <MessageSquare className="w-4 h-4" />, group: "Conversations" },
  { id: "6", title: "Cavrix Design System", subtitle: "Last edited today", icon: <FolderOpen className="w-4 h-4" />, group: "Projects" },
  { id: "7", title: "Code Review Agent", subtitle: "Analyzes pull requests", icon: <Bot className="w-4 h-4" />, group: "AI Agents" },
  { id: "8", title: "app.tsx", subtitle: "src / components", icon: <FileText className="w-4 h-4" />, group: "Files" },
  { id: "9", title: "Voice assistant prototype", subtitle: "Started 3 days ago", icon: <MessageSquare className="w-4 h-4" />, group: "Conversations" },
  { id: "10", title: "Backend API service", subtitle: "Last edited 1 week ago", icon: <FolderOpen className="w-4 h-4" />, group: "Projects" },
]

export default function CommandPalette() {
  const { searchOpen, setSearchOpen } = useAppStore()
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query.trim()
    ? placeholderResults.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : placeholderResults

  const grouped = filtered.reduce<Record<string, SearchResult[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {})

  const flatList = Object.values(grouped).flat()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(!searchOpen)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [searchOpen, setSearchOpen])

  useEffect(() => {
    if (searchOpen) {
      setQuery("")
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [searchOpen])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSearchOpen(false)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((prev) => Math.min(prev + 1, flatList.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (flatList[activeIndex]) {
        setSearchOpen(false)
      }
    }
  }

  if (!searchOpen) return null

  let globalIndex = -1

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setSearchOpen(false)}
      />
      <div className="relative w-full max-w-xl rounded-xl border border-white/10 bg-[#0d0d1a]/90 shadow-2xl shadow-purple-500/10 backdrop-blur-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search className="w-5 h-5 text-purple-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search conversations, projects, agents, files..."
            className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/40 font-mono">
            ESC
          </kbd>
        </div>
        <div className="max-h-[360px] overflow-y-auto py-2">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group}>
              <div className="px-4 py-1.5 text-[11px] font-semibold text-white/30 uppercase tracking-wider">
                {group}
              </div>
              {items.map((item) => {
                globalIndex++
                const idx = globalIndex
                const isActive = idx === activeIndex
                return (
                  <button
                    key={item.id}
                    onClick={() => setSearchOpen(false)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      isActive ? "bg-purple-500/15 text-white" : "text-white/70 hover:bg-white/5"
                    }`}
                  >
                    <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                      isActive ? "bg-purple-500/20 text-purple-400" : "bg-white/5 text-white/40"
                    }`}>
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{item.title}</div>
                      <div className="text-xs text-white/30 truncate">{item.subtitle}</div>
                    </div>
                    {isActive && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-white/30 shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          ))}
          {flatList.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-white/30">
              No results found.
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/10 text-[11px] text-white/30">
          <span className="flex items-center gap-1"><ArrowUp className="w-3 h-3" /><ArrowDown className="w-3 h-3" /> Navigate</span>
          <span className="flex items-center gap-1"><CornerDownLeft className="w-3 h-3" /> Select</span>
          <span className="flex items-center gap-1">ESC Close</span>
        </div>
      </div>
    </div>
  )
}
