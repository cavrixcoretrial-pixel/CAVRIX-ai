"use client";

import { useEffect, useState } from "react";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface AILoadingProps {
  isVisible: boolean;
}

const MESSAGES = [
  "Cavrix is thinking...",
  "Analyzing your request...",
  "Searching knowledge...",
  "Building a response...",
];

export default function AILoading({ isVisible }: AILoadingProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    setMessageIndex(0);
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 1600);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="flex w-full animate-slide-up items-start gap-3 px-4 py-3">
      <div className="animate-pulse-glow flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cavrix-500 to-purple-600">
        <Bot className="h-4 w-4 text-white" />
      </div>

      <div className="glass flex items-center gap-3 rounded-2xl rounded-bl-md border border-slate-800 bg-slate-900/70 px-4 py-3">
        <span className="text-sm text-slate-400">{MESSAGES[messageIndex]}</span>
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-1.5 animate-typing rounded-full bg-cavrix-400"
              )}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
