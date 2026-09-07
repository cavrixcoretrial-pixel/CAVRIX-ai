"use client";

import { create } from "zustand";

interface AppState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  activeModel: string;
  setActiveModel: (model: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  currentConversationId: string | null;
  setCurrentConversationId: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
  activeModel: "cavrix-pro",
  setActiveModel: (model) => set({ activeModel: model }),
  isGenerating: false,
  setIsGenerating: (generating) => set({ isGenerating: generating }),
  currentConversationId: null,
  setCurrentConversationId: (id) => set({ currentConversationId: id }),
}));
