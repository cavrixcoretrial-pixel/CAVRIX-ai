"use client";

import { useState, useRef, useEffect } from "react";
import {
  Paperclip,
  ImageIcon,
  Mic,
  Send,
  Square,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AI_MODELS } from "@/types";

interface ChatInputProps {
  onSend: (text: string) => void;
  onStop: () => void;
  isGenerating: boolean;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export default function ChatInput({
  onSend,
  onStop,
  isGenerating,
  selectedModel,
  onModelChange,
}: ChatInputProps) {
  const [text, setText] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const currentModel = AI_MODELS.find((m) => m.id === selectedModel) || AI_MODELS[0];

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 8 * 24)}px`;
  }, [text]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setModelOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModelOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (text.trim() && !isGenerating) {
        onSend(text.trim());
        setText("");
      }
    }
  };

  const handleSend = () => {
    if (!text.trim() || isGenerating) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl px-4">
      <div className="glass group rounded-2xl border border-slate-700/80 bg-slate-900/60 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 focus-within:border-cavrix-500/60 focus-within:shadow-cavrix-glow focus-within:ring-1 focus-within:ring-cavrix-500/30">
        <div className="flex items-end gap-2 p-3 pb-2">
          <div className="flex items-center gap-1 pb-1.5">
            <button
              type="button"
              aria-label="Attach file"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-cavrix-400 active:scale-95"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Upload image"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-purple-400 active:scale-95"
            >
              <ImageIcon className="h-5 w-5" />
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask Cavrix anything..."
            className="scrollbar-thin max-h-[192px] flex-1 resize-none bg-transparent py-2 text-[15px] leading-6 text-slate-200 placeholder-slate-500 outline-none"
          />

          <div className="flex items-center gap-1 pb-1.5">
            <button
              type="button"
              aria-label="Voice input"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-cyan-400 active:scale-95"
            >
              <Mic className="h-5 w-5" />
            </button>

            {isGenerating ? (
              <button
                type="button"
                onClick={onStop}
                aria-label="Stop generating"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/15 text-red-400 transition-all duration-200 hover:bg-red-500/25 hover:text-red-300 active:scale-95"
              >
                <Square className="h-4 w-4 fill-current" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSend}
                disabled={!text.trim()}
                aria-label="Send message"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 active:scale-95",
                  text.trim()
                    ? "bg-cavrix-gradient text-white shadow-lg shadow-cavrix-600/30 hover:bg-cavrix-gradient-hover hover:shadow-purple-600/40"
                    : "cursor-not-allowed text-slate-500"
                )}
              >
                <Send className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-3 pb-3">
          <div className="relative" ref={modelRef}>
            <button
              type="button"
              onClick={() => setModelOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/50 px-2.5 py-1 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-cavrix-400" />
              <span className="flex items-center gap-1.5">
                {currentModel.name}
                <span
                  className={cn(
                    "flex items-center gap-0.5",
                    currentModel.speed === "fast"
                      ? "text-green-400"
                      : currentModel.speed === "medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                  )}
                >
                  {currentModel.speed === "fast" ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    </>
                  ) : currentModel.speed === "medium" ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-100" />
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-100" />
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />
                    </>
                  ) : (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-100" />
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-20" />
                    </>
                  )}
                </span>
              </span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-slate-500 transition-transform duration-200",
                  modelOpen && "rotate-180"
                )}
              />
            </button>

            {modelOpen && (
              <div className="absolute bottom-full left-0 z-50 mb-2 w-72 animate-slide-up overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/95 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                <div className="border-b border-slate-800 px-4 py-3">
                  <p className="text-sm font-medium text-white">Select a model</p>
                  <p className="text-xs text-slate-500">Choose the best model for your task</p>
                </div>
                <div className="scrollbar-thin max-h-80 overflow-y-auto py-1">
                  {AI_MODELS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => {
                        onModelChange(model.id);
                        setModelOpen(false);
                      }}
                      className={cn(
                        "flex w-full flex-col gap-1 px-4 py-2.5 text-left transition-colors",
                        model.id === selectedModel
                          ? "bg-cavrix-600/15"
                          : "hover:bg-slate-800/60"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-sm font-semibold",
                            model.id === selectedModel
                              ? "text-cavrix-400"
                              : "text-slate-200"
                          )}
                        >
                          {model.name}
                        </span>
                        {model.id === selectedModel && (
                          <span className="rounded bg-cavrix-600/20 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cavrix-400">
                            Active
                          </span>
                        )}
                        <span className="ml-auto flex items-center gap-0.5">
                          {Array.from({ length: model.speed === "fast" ? 3 : model.speed === "medium" ? 2 : 1 }).map(
                            (_, i) => (
                              <span key={i} className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                            )
                          )}
                        </span>
                      </span>
                      <span className="text-xs text-slate-500">{model.description}</span>
                      <span className="mt-1 flex flex-wrap gap-1">
                        {model.capabilities.slice(0, 3).map((cap) => (
                          <span
                            key={cap}
                            className="rounded-full border border-slate-700/60 bg-slate-800/50 px-1.5 py-0.5 text-[10px] text-slate-400"
                          >
                            {cap}
                          </span>
                        ))}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate-500">
            Cavrix AI can make mistakes. Check important information.
          </p>
        </div>
      </div>
    </div>
  );
}
