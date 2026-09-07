"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  PenLine,
  Cpu,
  Bug,
  Globe,
} from "lucide-react";
import { nanoid } from "nanoid";
import { useAppStore } from "@/context/app-store";
import type { ChatMessage } from "@/types";
import ChatInput from "./chat-input";
import ChatMessageComponent from "./chat-message";
import AILoading from "./ai-loading";

interface ChatAreaProps {
  conversationId?: string;
}

const SUGGESTIONS = [
  { icon: PenLine, label: "Write an essay", prompt: "Write an essay about the importance of artificial intelligence in education." },
  { icon: Cpu, label: "Explain quantum computing", prompt: "Explain quantum computing in simple terms for a beginner." },
  { icon: Bug, label: "Debug my code", prompt: "Help me debug my code. What common issues should I look out for?" },
  { icon: Globe, label: "Create a website", prompt: "Create a website for a small coffee shop. What sections and features should I include?" },
];

export default function ChatArea({ conversationId }: ChatAreaProps) {
  const { isGenerating, setIsGenerating, activeModel, setActiveModel } = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingMessage, setStreamingMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streamingMessage, isGenerating]);

  const handleSend = useCallback(
    async (text: string) => {
      const userMessage: ChatMessage = {
        id: nanoid(),
        role: "user",
        content: text,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsGenerating(true);
      setStreamingMessage("");

      try {
        const controller = new AbortController();
        abortRef.current = controller;

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            model: activeModel,
            conversationId,
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error("Failed to get response");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        let buffer = "";

        const isSSE = (res.headers.get("content-type") || "").includes(
          "text/event-stream"
        );

        if (isSSE) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data: ")) continue;
              const data = trimmed.slice(6);
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                const content = parsed.content ?? "";
                if (content) {
                  accumulated += content;
                  setStreamingMessage(accumulated);
                }
              } catch {}
            }
          }
        } else {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            accumulated += decoder.decode(value, { stream: true });
            setStreamingMessage(accumulated);
          }
        }

        const assistantMessage: ChatMessage = {
          id: nanoid(),
          role: "assistant",
          content: accumulated,
          model: activeModel,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          const errorMessage: ChatMessage = {
            id: nanoid(),
            role: "assistant",
            content: "Sorry, I encountered an error while processing your request. Please try again.",
            createdAt: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, errorMessage]);
        }
      } finally {
        setStreamingMessage("");
        setIsGenerating(false);
        abortRef.current = null;
      }
    },
    [messages, activeModel, conversationId, setIsGenerating]
  );

  const handleStop = useCallback(() => {
    abortRef.current?.abort();
    setIsGenerating(false);
    setStreamingMessage("");
  }, [setIsGenerating]);

  const handleSuggestion = (prompt: string) => {
    handleSend(prompt);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div ref={scrollRef} className="scrollbar-thin flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="flex min-h-full flex-col items-center justify-center px-4 pb-8">
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 animate-bounce-subtle items-center justify-center rounded-2xl bg-cavrix-gradient shadow-lg shadow-purple-600/30">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-gradient-purple text-2xl font-bold md:text-3xl">
                How can I help you today?
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Ask Cavrix anything — I&apos;m here to help.
              </p>
            </div>

            <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
              {SUGGESTIONS.map((suggestion) => {
                const Icon = suggestion.icon;
                return (
                  <button
                    key={suggestion.label}
                    type="button"
                    onClick={() => handleSuggestion(suggestion.prompt)}
                    className="glass group flex items-center gap-3 rounded-xl border-slate-800 bg-slate-900/50 px-4 py-3 text-left transition-all duration-200 hover:border-cavrix-500/40 hover:bg-slate-900/80 hover:shadow-cavrix active:scale-[0.98]"
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors group-hover:bg-cavrix-600/20 group-hover:text-cavrix-400">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
                      {suggestion.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-3xl flex-col py-4">
            {messages.map((message) => (
              <ChatMessageComponent key={message.id} message={message} />
            ))}

            {isGenerating && (
              <>
                {streamingMessage && (
                  <ChatMessageComponent
                    message={{
                      id: "streaming",
                      role: "assistant",
                      content: streamingMessage,
                      createdAt: new Date().toISOString(),
                    }}
                  />
                )}
                {!streamingMessage && <AILoading isVisible />}
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center pb-4">
        <div className="w-full max-w-3xl px-4">
          <ChatInput
            onSend={handleSend}
            onStop={handleStop}
            isGenerating={isGenerating}
            selectedModel={activeModel}
            onModelChange={setActiveModel}
          />
        </div>
      </div>
    </div>
  );
}
