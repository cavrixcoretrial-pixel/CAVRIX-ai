"use client"

import { useState } from "react"
import { Code, Copy, Download, Plus, Check, Wand2 } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

const languages = ["JavaScript", "TypeScript", "Python", "Java", "Go", "Rust", "C++", "HTML/CSS"] as const
const tasks = ["Generate", "Debug", "Explain", "Optimize", "Convert"] as const

type Language = (typeof languages)[number]
type Task = (typeof tasks)[number]

const languageMap: Record<Language, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  Java: "java",
  Go: "go",
  Rust: "rust",
  "C++": "cpp",
  "HTML/CSS": "html",
}

const placeholderOutputs: Partial<Record<string, Partial<Record<Task, string>>>> = {
  TypeScript: {
    Generate: `interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  createdAt: Date;
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error(\`Failed to fetch user: \${response.statusText}\`);
  }
  return response.json();
}

async function updateUser(
  id: string,
  updates: Partial<Pick<User, "name" | "email" | "role">>
): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error(\`Failed to update user: \${response.statusText}\`);
  }
  return response.json();
}`,
    Debug: `// Issue: The fetchUser function doesn't handle network errors properly
// and the updateUser function has a race condition when called multiple times.

// Fix: Add proper error handling and request deduplication

const userCache = new Map<string, Promise<User>>();

async function fetchUser(id: string): Promise<User> {
  if (userCache.has(id)) {
    return userCache.get(id)!;
  }
  const promise = fetch(\`/api/users/\${id}\`)
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .finally(() => userCache.delete(id));
  userCache.set(id, promise);
  return promise;
}`,
    Explain: `This code defines a TypeScript interface 'User' representing a user\nentity with typed fields including a discriminated union for role.\n\nTwo async functions handle CRUD operations:\n- fetchUser: GET request with proper error handling\n- updateUser: PATCH request using Partial types for flexible updates\n\nKey patterns used:\n- Generics with Promise<T> for type-safe async returns\n- Pick utility type to restrict updatable fields\n- Template literals for URL construction`,
    Optimize: `// Optimized version with batching, caching, and abort support

const cache = new Map<string, { data: User; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

async function fetchUser(
  id: string,
  signal?: AbortSignal
): Promise<User> {
  const cached = cache.get(id);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  const res = await fetch(\`/api/users/\${id}\`, { signal });
  if (!res.ok) throw new Error(res.statusText);
  const data: User = await res.json();
  cache.set(id, { data, timestamp: Date.now() });
  return data;
}`,
  },
  Python: {
    Generate: `from dataclasses import dataclass
from typing import Optional
import asyncio
import aiohttp


@dataclass
class User:
    id: str
    name: str
    email: str
    role: str
    is_active: bool = True


class UserService:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self._cache: dict[str, User] = {}

    async def get_user(self, session: aiohttp.ClientSession, user_id: str) -> User:
        if user_id in self._cache:
            return self._cache[user_id]
        async with session.get(f"{self.base_url}/users/{user_id}") as resp:
            resp.raise_for_status()
            data = await resp.json()
            user = User(**data)
            self._cache[user_id] = user
            return user

    async def get_users(self, user_ids: list[str]) -> list[User]:
        async with aiohttp.ClientSession() as session:
            tasks = [self.get_user(session, uid) for uid in user_ids]
            return await asyncio.gather(*tasks)`,
    Optimize: `# Optimized with connection pooling and batch processing
from functools import lru_cache
from concurrent.futures import ThreadPoolExecutor
import asyncio


class OptimizedUserService:
    def __init__(self, base_url: str, max_concurrent: int = 10):
        self.base_url = base_url
        self._semaphore = asyncio.Semaphore(max_concurrent)
        self._executor = ThreadPoolExecutor(max_workers=4)

    async def _fetch_with_limit(self, session, url):
        async with self._semaphore:
            async with session.get(url) as resp:
                resp.raise_for_status()
                return await resp.json()

    async def batch_fetch(self, user_ids: list[str]) -> list[dict]:
        connector = aiohttp.TCPConnector(limit=20, keepalive_timeout=30)
        async with aiohttp.ClientSession(connector=connector) as session:
            tasks = [
                self._fetch_with_limit(session, f"{self.base_url}/users/{uid}")
                for uid in user_ids
            ]
            return await asyncio.gather(*tasks, return_exceptions=True)`,
  },
}

const defaultOutput = `// Code will appear here after generation.\n// Select a language, task, and describe what you need.`

export default function CodePage() {
  const [language, setLanguage] = useState<Language>("TypeScript")
  const [task, setTask] = useState<Task>("Generate")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState(defaultOutput)
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  const handleGenerate = async () => {
    setGenerating(true)
    await new Promise((r) => setTimeout(r, 2000))
    const langOutput = placeholderOutputs[language]
    const result = langOutput?.[task] || `// ${task} operation in ${language}\n// ${input || "No description provided."}\n\n// Generated code will appear here.`
    setOutput(result)
    setGenerating(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const ext: Record<Language, string> = {
      JavaScript: "js",
      TypeScript: "ts",
      Python: "py",
      Java: "java",
      Go: "go",
      Rust: "rs",
      "C++": "cpp",
      "HTML/CSS": "html",
    }
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `output.${ext[language]}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleNew = () => {
    setInput("")
    setOutput(defaultOutput)
    setTask("Generate")
  }

  return (
    <div className="min-h-screen bg-[#08080f] p-6 md:p-10 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <Code className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Code Assistant</h1>
          <p className="text-sm text-white/40">Generate, debug, and optimize code with AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-xs text-white/40 font-medium">Language</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    language === lang
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs text-white/40 font-medium mb-2 block">Task</label>
              <div className="flex flex-wrap gap-2">
                {tasks.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTask(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      task === t
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                        : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <label className="text-xs text-white/40 font-medium mb-2 block">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                task === "Generate"
                  ? "Describe what you want to build..."
                  : task === "Debug"
                    ? "Paste your code or describe the bug..."
                    : task === "Explain"
                      ? "Paste code to explain..."
                      : task === "Optimize"
                        ? "Paste code to optimize..."
                        : "Paste code to convert..."
              }
              className="w-full h-36 bg-transparent text-white placeholder-white/30 text-sm leading-relaxed resize-none outline-none"
            />
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
              <button
                onClick={handleNew}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white/40 hover:bg-white/10 transition-colors"
              >
                <Plus className="w-3 h-3" />
                New File
              </button>
              <div className="flex-1" />
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-medium hover:from-purple-500 hover:to-cyan-500 transition-all disabled:opacity-40"
              >
                <Wand2 className="w-4 h-4" />
                {generating ? "Working..." : task}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-xs text-white/40 font-medium">
              {language} — {task}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-white/40 hover:bg-white/10 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-white/40 hover:bg-white/10 transition-colors"
              >
                <Download className="w-3 h-3" />
                Download
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {generating ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
                <p className="text-sm text-white/30">Generating code...</p>
              </div>
            ) : (
              <SyntaxHighlighter
                language={languageMap[language]}
                style={oneDark}
                customStyle={{
                  margin: 0,
                  padding: "1.25rem",
                  background: "transparent",
                  fontSize: "13px",
                  lineHeight: "1.7",
                }}
                showLineNumbers
                lineNumberStyle={{ color: "rgba(255,255,255,0.15)", minWidth: "2.5em" }}
              >
                {output}
              </SyntaxHighlighter>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
