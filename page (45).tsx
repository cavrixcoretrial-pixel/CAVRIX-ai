"use client"

import { useState } from "react"
import { Layout, Save, Download, Bot, Plus } from "lucide-react"

type Tab = "write" | "code" | "preview"

const placeholderCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      background: linear-gradient(135deg, #0d0d1a, #1a0a2e);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      padding: 40px;
      max-width: 480px;
      text-align: center;
      backdrop-filter: blur(20px);
    }
    h1 { font-size: 28px; margin-bottom: 12px; }
    p { color: rgba(255,255,255,0.6); line-height: 1.6; }
    button {
      margin-top: 20px;
      padding: 10px 24px;
      border-radius: 10px;
      border: none;
      background: linear-gradient(135deg, #7c3aed, #06b6d4);
      color: white;
      font-size: 14px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Welcome to Canvas</h1>
    <p>Edit this HTML on the left and see your changes rendered here in real time.</p>
    <button onclick="alert('Hello from Canvas!')">Click Me</button>
  </div>
</body>
</html>`

const placeholderChatMessages = [
  { role: "user" as const, text: "Help me create a landing page with a gradient background" },
  { role: "ai" as const, text: "I've created a landing page with a dark gradient background, a glass-morphism card, and a CTA button. You can see the preview on the right!" },
]

export default function CanvasPage() {
  const [activeTab, setActiveTab] = useState<Tab>("write")
  const [editorContent, setEditorContent] = useState(placeholderCode)
  const [chatMessages, setChatMessages] = useState(placeholderChatMessages)
  const [chatInput, setChatInput] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSendChat = () => {
    if (!chatInput.trim()) return
    const newMessages = [...chatMessages, { role: "user" as const, text: chatInput }]
    setChatMessages(newMessages)
    setChatInput("")
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: "ai" as const, text: "I've updated the canvas based on your request. Check the preview!" },
      ])
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#08080f] p-6 md:p-10 flex flex-col max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Layout className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Canvas</h1>
            <p className="text-sm text-white/40">Write, preview, and collaborate with AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white/60 hover:bg-white/10 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            {saved ? "Saved!" : "Save"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white/60 hover:bg-white/10 transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0" style={{ height: "calc(100vh - 140px)" }}>
        <div className="flex-1 flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden min-w-0">
          <div className="flex items-center gap-1 px-2 py-2 border-b border-white/10">
            {(["write", "code", "preview"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? "bg-purple-500/15 text-purple-400"
                    : "text-white/40 hover:text-white/60 hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-auto">
            {activeTab === "write" && (
              <textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                className="w-full h-full p-6 bg-transparent text-white/80 text-sm font-mono leading-relaxed resize-none outline-none"
                spellCheck={false}
              />
            )}
            {activeTab === "code" && (
              <textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                className="w-full h-full p-6 bg-transparent text-cyan-400/80 text-sm font-mono leading-relaxed resize-none outline-none"
                spellCheck={false}
              />
            )}
            {activeTab === "preview" && (
              <div className="w-full h-full">
                <iframe
                  srcDoc={editorContent}
                  className="w-full h-full border-0 bg-white"
                  title="Preview"
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-[380px] shrink-0 flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white/70">AI Assistant</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[90%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-purple-500/15 text-purple-200 rounded-br-md"
                      : "bg-white/5 text-white/60 rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendChat()}
                placeholder="Ask AI to help with your canvas..."
                className="flex-1 bg-white/5 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 outline-none border border-white/10 focus:border-purple-500/30 transition-colors"
              />
              <button
                onClick={handleSendChat}
                disabled={!chatInput.trim()}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white disabled:opacity-30 transition-opacity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => {
                setChatInput(`Help me improve this code: ${editorContent.slice(0, 200)}...`)
                handleSendChat()
              }}
              className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-purple-500/20 bg-purple-500/10 text-xs text-purple-400 hover:bg-purple-500/20 transition-colors"
            >
              <Bot className="w-3 h-3" />
              Ask AI to help
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
