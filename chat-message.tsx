"use client";

import { useState, Suspense, lazy } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Pencil,
  Trash2,
  User,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import type { ChatMessage } from "@/types";

const CodeBlock = lazy(() =>
  import("./code-block").then((mod) => ({ default: mod.CodeBlock }))
);

interface ChatMessageProps {
  message: ChatMessage;
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onCopy?: (id: string) => void;
  onRegenerate?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ChatMessage({
  message,
  onLike,
  onDislike,
  onCopy,
  onRegenerate,
  onEdit,
  onDelete,
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.(message.id);
  };

  const relativeTime = message.createdAt
    ? formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })
    : "";

  return (
    <div
      className={cn(
        "group flex w-full animate-slide-up items-start gap-3 px-4 py-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cavrix-500 to-purple-600 shadow-lg shadow-purple-600/20">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}

      <div className={cn("flex max-w-[80%] flex-col gap-1", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-lg",
            isUser
              ? "rounded-br-md bg-gradient-to-br from-cavrix-600 via-purple-600 to-cavrix-700 text-white shadow-cavrix-600/20"
              : "rounded-bl-md border border-slate-800 bg-slate-900/70 text-slate-200 shadow-slate-950/30 backdrop-blur"
          )}
        >
          <div>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const codeString = String(children).replace(/\n$/, "");

                  if (!className && !codeString.includes("\n")) {
                    return (
                      <code
                        className="rounded bg-slate-800/80 px-1.5 py-0.5 font-mono text-[13px] text-cyan-300"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  return (
                    <Suspense
                      fallback={
                        <div className="my-3 overflow-hidden rounded-lg border border-slate-800 bg-[#282c34] px-4 py-3 font-mono text-[13px] text-slate-400">
                          {codeString}
                        </div>
                      }
                    >
                      <CodeBlock
                        language={match ? match[1] : "text"}
                        code={codeString}
                      />
                    </Suspense>
                  );
                },
                a({ children, href }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cavrix-400 underline decoration-cavrix-500/40 underline-offset-2 transition-colors hover:text-cavrix-300 hover:decoration-cavrix-400"
                    >
                      {children}
                    </a>
                  );
                },
                ul({ children }) {
                  return <ul className="mb-2 list-disc space-y-1 pl-5">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="mb-2 list-decimal space-y-1 pl-5">{children}</ol>;
                },
                h1({ children }) {
                  return <h1 className="mb-2 mt-4 text-xl font-bold text-white">{children}</h1>;
                },
                h2({ children }) {
                  return <h2 className="mb-2 mt-4 text-lg font-bold text-white">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="mb-2 mt-3 text-base font-semibold text-white">{children}</h3>;
                },
                p({ children }) {
                  return <p className="my-1.5">{children}</p>;
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="my-2 border-l-4 border-cavrix-500 pl-3 text-slate-400 italic">
                      {children}
                    </blockquote>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        <div className="flex items-center gap-2 px-2">
          <span className="text-[11px] text-slate-500">
            {relativeTime || message.createdAt?.slice(0, 10)}
          </span>

          {isUser ? (
            <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(message.id)}
                  className="rounded p-1 text-slate-500 transition-colors hover:bg-slate-800 hover:text-cavrix-400"
                  title="Edit"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(message.id)}
                  className="rounded p-1 text-slate-500 transition-colors hover:bg-slate-800 hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {onCopy && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200"
                  title={copied ? "Copied!" : "Copy"}
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              )}
              {onRegenerate && (
                <button
                  type="button"
                  onClick={() => onRegenerate(message.id)}
                  className="rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-cyan-400"
                  title="Regenerate"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
              {onLike && (
                <button
                  type="button"
                  onClick={() => onLike(message.id)}
                  className={cn(
                    "rounded p-1.5 transition-colors hover:bg-slate-800",
                    message.liked === true
                      ? "text-green-400"
                      : "text-slate-500 hover:text-green-400"
                  )}
                  title="Like"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </button>
              )}
              {onDislike && (
                <button
                  type="button"
                  onClick={() => onDislike(message.id)}
                  className={cn(
                    "rounded p-1.5 transition-colors hover:bg-slate-800",
                    message.liked === false
                      ? "text-red-400"
                      : "text-slate-500 hover:text-red-400"
                  )}
                  title="Dislike"
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(message.id)}
                  className="rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {isUser && (
        <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 shadow-lg shadow-slate-950/40">
          <User className="h-4 w-4 text-slate-300" />
        </div>
      )}
    </div>
  );
}
