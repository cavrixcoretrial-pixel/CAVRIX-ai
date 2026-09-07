"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Settings,
  User,
  FolderOpen,
  Bot,
  Compass,
  Pin,
  Trash2,
  Edit3,
  Archive,
  MoreHorizontal,
} from "lucide-react";
import { useAppStore } from "@/context/app-store";

interface ChatItem {
  id: string;
  title: string;
  pinned?: boolean;
}

interface ProjectItem {
  id: string;
  name: string;
  icon: string;
}

interface AgentItem {
  id: string;
  name: string;
  icon: string;
}

const mockChats: { group: string; items: ChatItem[] }[] = [
  {
    group: "Today",
    items: [
      { id: "1", title: "React Component Architecture" },
      { id: "2", title: "TypeScript Best Practices", pinned: true },
      { id: "3", title: "API Design Patterns" },
    ],
  },
  {
    group: "Yesterday",
    items: [
      { id: "4", title: "Database Schema Design" },
      { id: "5", title: "Performance Optimization" },
    ],
  },
  {
    group: "Previous 7 Days",
    items: [
      { id: "6", title: "Authentication Flow" },
      { id: "7", title: "Deployment Strategy" },
      { id: "8", title: "Testing Methodology" },
    ],
  },
  {
    group: "Older",
    items: [
      { id: "9", title: "Project Setup Guide" },
      { id: "10", title: "Code Review Checklist" },
    ],
  },
];

const mockProjects: ProjectItem[] = [
  { id: "1", name: "Cavrix AI", icon: "🚀" },
  { id: "2", name: "E-commerce Platform", icon: "🛒" },
  { id: "3", name: "Mobile App", icon: "📱" },
];

const mockAgents: AgentItem[] = [
  { id: "1", name: "Coding Expert", icon: "💻" },
  { id: "2", name: "Research Assistant", icon: "🔍" },
  { id: "3", name: "Website Designer", icon: "🎨" },
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    chatId: string;
    x: number;
    y: number;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "O") {
        e.preventDefault();
        handleNewChat();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target as Node)
      ) {
        setContextMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNewChat = useCallback(() => {
    console.log("New chat created");
  }, []);

  const handleContextMenu = (e: React.MouseEvent, chatId: string) => {
    e.preventDefault();
    setContextMenu({ chatId, x: e.clientX, y: e.clientY });
  };

  const handleChatAction = (action: string, chatId: string) => {
    console.log(`${action} action on chat ${chatId}`);
    setContextMenu(null);
  };

  const filteredChats = mockChats
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  const sidebarWidth = sidebarOpen ? 260 : 0;

  if (isMobile) {
    return (
      <>
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="fixed left-4 top-4 z-50 rounded-lg bg-slate-800/80 p-2 text-slate-300 backdrop-blur-sm transition-colors hover:bg-slate-700 hover:text-white md:hidden"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={toggleSidebar}
          />
        )}

        <div
          ref={sidebarRef}
          className={`fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r border-slate-800/50 bg-[#0a0a0f]/95 backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            contextMenu={contextMenu}
            contextMenuRef={contextMenuRef}
            handleContextMenu={handleContextMenu}
            handleChatAction={handleChatAction}
            handleNewChat={handleNewChat}
            filteredChats={filteredChats}
            toggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
          />
        </div>
      </>
    );
  }

  return (
    <div
      ref={sidebarRef}
      className="flex h-full flex-col border-r border-slate-800/50 bg-[#0a0a0f]/95 backdrop-blur-xl transition-all duration-300 ease-in-out"
      style={{ width: sidebarWidth, minWidth: sidebarWidth }}
    >
      {sidebarOpen && (
        <SidebarContent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeChatId={activeChatId}
          setActiveChatId={setActiveChatId}
          contextMenu={contextMenu}
          contextMenuRef={contextMenuRef}
          handleContextMenu={handleContextMenu}
          handleChatAction={handleChatAction}
          handleNewChat={handleNewChat}
          filteredChats={filteredChats}
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
      )}

      {!sidebarOpen && (
        <div className="flex flex-col items-center py-4">
          <button
            onClick={toggleSidebar}
            className="mb-4 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            title="Open sidebar"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={handleNewChat}
            className="mb-4 rounded-lg bg-cavrix-gradient p-2 text-white shadow-lg shadow-cavrix-600/20 transition-all hover:bg-cavrix-gradient-hover hover:shadow-cavrix-600/40"
            title="New chat"
          >
            <Plus className="h-5 w-5" />
          </button>
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              title="Dashboard"
            >
              <MessageSquare className="h-5 w-5" />
            </Link>
            <Link
              href="/settings"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

interface SidebarContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeChatId: string | null;
  setActiveChatId: (id: string) => void;
  contextMenu: { chatId: string; x: number; y: number } | null;
  contextMenuRef: React.RefObject<HTMLDivElement>;
  handleContextMenu: (e: React.MouseEvent, chatId: string) => void;
  handleChatAction: (action: string, chatId: string) => void;
  handleNewChat: () => void;
  filteredChats: { group: string; items: ChatItem[] }[];
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

function SidebarContent({
  searchQuery,
  setSearchQuery,
  activeChatId,
  setActiveChatId,
  contextMenu,
  contextMenuRef,
  handleContextMenu,
  handleChatAction,
  handleNewChat,
  filteredChats,
  toggleSidebar,
  sidebarOpen,
}: SidebarContentProps) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-800/50 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="logoGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3390ff" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <circle cx="14" cy="14" r="13" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />
            <path
              d="M10 10 L10 18 C10 18 10 18 10 18"
              stroke="url(#logoGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M10 10 L18 10 C18 10 18 10 18 10"
              stroke="url(#logoGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <text
              x="16"
              y="18"
              fontSize="6"
              fontWeight="bold"
              fill="url(#logoGradient)"
              fontFamily="sans-serif"
            >
              AI
            </text>
          </svg>
          <span className="text-lg font-semibold text-white">Cavrix AI</span>
        </Link>
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          title="Collapse sidebar"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <div className="p-3">
        <button
          onClick={handleNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-cavrix-gradient px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-cavrix-600/20 transition-all hover:bg-cavrix-gradient-hover hover:shadow-cavrix-600/40 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/50 py-2 pl-10 pr-4 text-sm text-slate-300 placeholder-slate-500 outline-none transition-colors focus:border-cavrix-500/50 focus:bg-slate-900"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3">
        {filteredChats.map((group) => (
          <div key={group.group} className="mb-4">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                {group.group}
              </span>
            </div>
            <div className="space-y-1">
              {group.items.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  onContextMenu={(e) => handleContextMenu(e, chat.id)}
                  className={`group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                    activeChatId === chat.id
                      ? "bg-cavrix-600/20 text-cavrix-400"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  }`}
                >
                  <MessageSquare className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1 truncate">{chat.title}</span>
                  {chat.pinned && (
                    <Pin className="h-3 w-3 flex-shrink-0 text-cavrix-400" />
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContextMenu(e, chat.id);
                    }}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredChats.length === 0 && searchQuery && (
          <div className="py-8 text-center">
            <Search className="mx-auto mb-2 h-8 w-8 text-slate-600" />
            <p className="text-sm text-slate-500">No chats found</p>
          </div>
        )}

        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Projects
            </span>
            <button className="rounded p-1 text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-300">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-1">
            {mockProjects.map((project) => (
              <button
                key={project.id}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition-all hover:bg-slate-800/50 hover:text-slate-200"
              >
                <span className="text-base">{project.icon}</span>
                <span className="flex-1 truncate text-left">{project.name}</span>
                <FolderOpen className="h-4 w-4 text-slate-600" />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-2 flex items-center px-1">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Agents
            </span>
          </div>
          <div className="space-y-1">
            {mockAgents.map((agent) => (
              <button
                key={agent.id}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition-all hover:bg-slate-800/50 hover:text-slate-200"
              >
                <span className="text-base">{agent.icon}</span>
                <span className="flex-1 truncate text-left">{agent.name}</span>
                <Bot className="h-4 w-4 text-slate-600" />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <Link
            href="/explore"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition-all hover:bg-slate-800/50 hover:text-slate-200"
          >
            <Compass className="h-4 w-4" />
            <span>Explore</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-800/50 p-3">
        <Link
          href="/settings"
          className="mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition-all hover:bg-slate-800/50 hover:text-slate-200"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-slate-800/50">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cavrix-500 to-purple-600">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-slate-200">User</p>
            <p className="truncate text-xs text-slate-500">user@cavrix.ai</p>
          </div>
        </div>
      </div>

      {contextMenu && (
        <div
          ref={contextMenuRef}
          className="fixed z-[100] min-w-[160px] rounded-xl border border-slate-700/50 bg-slate-900/95 p-1.5 shadow-xl backdrop-blur-xl"
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
          }}
        >
          <button
            onClick={() => handleChatAction("rename", contextMenu.chatId)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <Edit3 className="h-4 w-4" />
            Rename
          </button>
          <button
            onClick={() => handleChatAction("pin", contextMenu.chatId)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <Pin className="h-4 w-4" />
            Pin
          </button>
          <button
            onClick={() => handleChatAction("archive", contextMenu.chatId)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <Archive className="h-4 w-4" />
            Archive
          </button>
          <div className="my-1 border-t border-slate-700/50" />
          <button
            onClick={() => handleChatAction("delete", contextMenu.chatId)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      )}
    </>
  );
}
