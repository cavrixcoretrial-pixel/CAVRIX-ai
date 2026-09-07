"use client"

import { useEffect, useRef, useState } from "react"
import { Mic, Square, Play, Settings } from "lucide-react"

const voiceModels = ["Cavrix Voice v2", "Cavrix Voice v1", "Fast TTS", "Natural Voice"]

type VoiceStatus = "idle" | "listening" | "speaking"

const placeholderTranscript = [
  { role: "user" as const, text: "Hey Cavrix, can you explain how neural networks work?" },
  { role: "ai" as const, text: "Of course! Neural networks are computational models inspired by the biological neural networks in the human brain. They consist of layers of interconnected nodes, or neurons, that process information by passing it through weighted connections..." },
  { role: "user" as const, text: "What's the difference between a CNN and an RNN?" },
  { role: "ai" as const, text: "Great question! A CNN, or Convolutional Neural Network, is designed for processing grid-like data such as images. It uses convolutional filters to detect spatial patterns. An RNN, or Recurrent Neural Network, is designed for sequential data like text or time series, maintaining a hidden state that captures information from previous steps..." },
]

export default function VoicePage() {
  const [status, setStatus] = useState<VoiceStatus>("idle")
  const [model, setModel] = useState(voiceModels[0])
  const [transcript, setTranscript] = useState<typeof placeholderTranscript>([])
  const [showSettings, setShowSettings] = useState(false)
  const barsRef = useRef<HTMLDivElement[]>([])

  const toggleListening = () => {
    if (status === "listening") {
      setStatus("idle")
      setTranscript(placeholderTranscript)
    } else {
      setStatus("listening")
      setTranscript([])
      setTimeout(() => {
        setTranscript(placeholderTranscript)
      }, 4000)
    }
  }

  const stopAll = () => {
    setStatus("idle")
    setTranscript(placeholderTranscript)
  }

  return (
    <div className="min-h-screen bg-[#08080f] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Mic className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Voice Mode</h1>
            <p className="text-sm text-white/40">Talk naturally with Cavrix AI</p>
          </div>
        </div>

        <div className="relative mb-10">
          <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
            status === "listening"
              ? "bg-purple-500/20 animate-ping scale-110"
              : status === "speaking"
                ? "bg-cyan-500/20 animate-pulse"
                : ""
          }`} />
          <button
            onClick={toggleListening}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              status === "listening"
                ? "bg-gradient-to-br from-purple-600 to-purple-500 shadow-lg shadow-purple-500/30 scale-110"
                : status === "speaking"
                  ? "bg-gradient-to-br from-cyan-600 to-cyan-500 shadow-lg shadow-cyan-500/30"
                  : "bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/30 hover:bg-white/10"
            }`}
          >
            {status === "listening" ? (
              <Square className="w-8 h-8 text-white" fill="white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="w-1 rounded-full transition-all duration-150"
              style={{
                height: status !== "idle" ? `${Math.random() * 40 + 8}px` : "4px",
                backgroundColor:
                  status === "listening"
                    ? `rgba(168, 85, 247, ${0.3 + Math.random() * 0.7})`
                    : status === "speaking"
                      ? `rgba(6, 182, 212, ${0.3 + Math.random() * 0.7})`
                      : "rgba(255,255,255,0.1)",
                transition: "height 0.15s ease",
              }}
            />
          ))}
        </div>

        <div className="mb-8 h-6">
          {status === "idle" && transcript.length === 0 && (
            <p className="text-sm text-white/30">Ready to listen</p>
          )}
          {status === "idle" && transcript.length > 0 && (
            <p className="text-sm text-white/30">Conversation ended</p>
          )}
          {status === "listening" && (
            <p className="text-sm text-purple-400 animate-pulse">Listening...</p>
          )}
          {status === "speaking" && (
            <p className="text-sm text-cyan-400 animate-pulse">AI is speaking...</p>
          )}
        </div>

        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={toggleListening}
            disabled={status === "speaking"}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-40 ${
              status === "listening"
                ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                : "bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-500 hover:to-cyan-500"
            }`}
          >
            {status === "listening" ? (
              <>
                <Square className="w-4 h-4" /> Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Start Conversation
              </>
            )}
          </button>
          {transcript.length > 0 && (
            <button
              onClick={stopAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white/50 hover:bg-white/10 transition-colors"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-white/40 hover:bg-white/10 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {showSettings && (
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-8">
            <label className="text-xs text-white/40 font-medium mb-2 block">Voice Model</label>
            <div className="space-y-1">
              {voiceModels.map((m) => (
                <button
                  key={m}
                  onClick={() => setModel(m)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    model === m
                      ? "bg-purple-500/15 text-purple-400 border border-purple-500/20"
                      : "text-white/50 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {transcript.length > 0 && (
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 max-h-[300px] overflow-y-auto">
            <div className="space-y-4">
              {transcript.map((entry, i) => (
                <div key={i} className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      entry.role === "user"
                        ? "bg-purple-500/15 text-purple-200 rounded-br-md"
                        : "bg-white/5 text-white/70 rounded-bl-md"
                    }`}
                  >
                    {entry.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
