"use client";

import { useEffect, useRef } from "react";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AI_MODELS } from "@/types";

interface ModelSelectorProps {
  selectedModel: string;
  onSelect: (model: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModelSelector({
  selectedModel,
  onSelect,
  isOpen,
  onClose,
}: ModelSelectorProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const speedDots = (speed: "fast" | "medium" | "slow") => {
    const total = speed === "fast" ? 3 : speed === "medium" ? 2 : 1;
    return (
      <span className="flex items-center gap-0.5" aria-label={`${speed} speed`}>
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              i < total
                ? speed === "fast"
                  ? "bg-green-400"
                  : speed === "medium"
                    ? i === 0
                      ? "bg-yellow-400"
                      : "bg-yellow-400/70"
                    : "bg-red-400/70"
                : "bg-slate-700"
            )}
          />
        ))}
      </span>
    );
  };

  const planBadge = (plan: "free" | "plus" | "pro") => {
    if (plan === "free")
      return (
        <span className="rounded-full border border-slate-700 bg-slate-800/70 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
          Free
        </span>
      );
    if (plan === "plus")
      return (
        <span className="rounded-full border border-cavrix-700/60 bg-cavrix-600/15 px-1.5 py-0.5 text-[10px] font-medium text-cavrix-400">
          Plus
        </span>
      );
    return (
      <span className="rounded-full border border-purple-700/60 bg-purple-600/15 px-1.5 py-0.5 text-[10px] font-medium text-purple-400">
        Pro
      </span>
    );
  };

  return (
    <div
      ref={panelRef}
      className="glass absolute bottom-full left-0 z-50 mb-2 w-80 animate-slide-up overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/90 shadow-2xl shadow-black/50 backdrop-blur-2xl"
    >
      <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
        <Sparkles className="h-4 w-4 text-cavrix-400" />
        <div>
          <p className="text-sm font-semibold text-white">Select a model</p>
          <p className="text-xs text-slate-500">Choose the model that fits your task</p>
        </div>
      </div>

      <div className="scrollbar-thin max-h-96 overflow-y-auto p-1.5">
        {AI_MODELS.map((model) => {
          const isSelected = model.id === selectedModel;
          return (
            <button
              key={model.id}
              type="button"
              onClick={() => {
                onSelect(model.id);
                onClose();
              }}
              className={cn(
                "flex w-full flex-col gap-2 rounded-xl px-3 py-2.5 text-left transition-all duration-200",
                isSelected
                  ? "bg-cavrix-600/15 ring-1 ring-cavrix-500/30"
                  : "hover:bg-slate-800/60"
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex-1 text-sm font-semibold",
                    isSelected ? "text-cavrix-400" : "text-slate-200"
                  )}
                >
                  {model.name}
                </span>
                {isSelected && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cavrix-500">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                )}
              </div>

              <p className="text-xs leading-relaxed text-slate-500">{model.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-1">
                  {model.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-full border border-slate-700/60 bg-slate-800/60 px-1.5 py-0.5 text-[10px] text-slate-400"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {planBadge(model.plan)}
                  {speedDots(model.speed)}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
