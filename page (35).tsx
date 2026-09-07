"use client"

import { useState } from "react"
import { Image, Download, Settings, Sparkles, X } from "lucide-react"

const aspectRatios = ["1:1", "16:9", "9:16", "4:3"] as const
const styles = ["Photorealistic", "Digital Art", "Oil Painting", "Watercolor", "Abstract"] as const
const qualities = ["Standard", "HD"] as const

const gradients = [
  "from-purple-600 to-cyan-500",
  "from-pink-500 to-orange-400",
  "from-blue-600 to-indigo-500",
  "from-green-500 to-teal-400",
  "from-yellow-500 to-red-500",
  "from-violet-600 to-fuchsia-500",
  "from-cyan-500 to-blue-500",
  "from-rose-500 to-purple-500",
  "from-emerald-500 to-cyan-400",
]

const historyItems = gradients.map((g, i) => ({
  id: i + 1,
  gradient: g,
  prompt: [
    "A serene mountain landscape at sunset",
    "Cyberpunk city with neon lights",
    "Abstract fluid art in purple tones",
    "Portrait of a robot in a garden",
    "Underwater scene with bioluminescent creatures",
    "Futuristic spacecraft orbiting Saturn",
    "Japanese temple in cherry blossom season",
    "Steampunk mechanical clockwork",
    "Dreamlike forest with glowing mushrooms",
  ][i],
}))

export default function ImageGenPage() {
  const [prompt, setPrompt] = useState("")
  const [aspectRatio, setAspectRatio] = useState<string>("1:1")
  const [style, setStyle] = useState<string>("Photorealistic")
  const [quality, setQuality] = useState<string>("Standard")
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState<{ gradient: string; prompt: string } | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setGenerating(true)
    setGenerated(null)
    await new Promise((r) => setTimeout(r, 3000))
    const randomGrad = gradients[Math.floor(Math.random() * gradients.length)]
    setGenerated({ gradient: randomGrad, prompt })
    setGenerating(false)
  }

  return (
    <div className="min-h-screen bg-[#08080f] p-6 md:p-10 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <Image className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Image Generation</h1>
          <p className="text-sm text-white/40">Create stunning images with AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to create... e.g. 'A serene mountain landscape at sunset with golden light filtering through clouds'"
              className="w-full h-28 bg-transparent text-white placeholder-white/30 text-sm leading-relaxed resize-none outline-none"
            />

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white/50 hover:bg-white/10 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                Settings
              </button>
              <button
                onClick={handleGenerate}
                disabled={generating || !prompt.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-medium hover:from-purple-500 hover:to-cyan-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                {generating ? "Generating..." : "Generate"}
              </button>
            </div>

            {showSettings && (
              <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
                <div>
                  <label className="text-xs text-white/40 font-medium mb-2 block">Aspect Ratio</label>
                  <div className="flex gap-2">
                    {aspectRatios.map((ar) => (
                      <button
                        key={ar}
                        onClick={() => setAspectRatio(ar)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          aspectRatio === ar
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                            : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {ar}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/40 font-medium mb-2 block">Style</label>
                  <div className="flex flex-wrap gap-2">
                    {styles.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          style === s
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                            : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/40 font-medium mb-2 block">Quality</label>
                  <div className="flex gap-2">
                    {qualities.map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          quality === q
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                            : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            {generating ? (
              <div className="aspect-square rounded-xl bg-white/5 flex flex-col items-center justify-center gap-4 animate-pulse">
                <div className="w-12 h-12 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
                <p className="text-sm text-white/40">Creating your image...</p>
              </div>
            ) : generated ? (
              <div className="relative group">
                <div className={`aspect-square rounded-xl bg-gradient-to-br ${generated.gradient}`} />
                <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm border border-white/20 hover:bg-white/20 transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
                <p className="text-xs text-white/40 mt-3">{generated.prompt}</p>
              </div>
            ) : (
              <div className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3">
                <Image className="w-10 h-10 text-white/10" />
                <p className="text-sm text-white/20">Generated image will appear here</p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-sm font-semibold text-white/70 mb-4">History</h3>
          <div className="grid grid-cols-3 gap-2">
            {historyItems.map((item) => (
              <div key={item.id} className="relative group cursor-pointer">
                <div className={`aspect-square rounded-lg bg-gradient-to-br ${item.gradient}`} />
                <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Download className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
