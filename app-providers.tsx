"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import CommandPalette from "@/components/search/command-palette";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <CommandPalette />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111118",
            color: "#e2e8f0",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            borderRadius: "12px",
          },
          success: {
            iconTheme: { primary: "#22d3ee", secondary: "#0a0a0f" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#0a0a0f" },
          },
          duration: 3500,
        }}
      />
    </SessionProvider>
  );
}
