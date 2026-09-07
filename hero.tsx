"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <style>{`
          .hero-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.4;
          }
          .hero-orb-1 {
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, #3390ff 0%, transparent 70%);
            top: -10%;
            left: 10%;
            animation: float1 8s ease-in-out infinite;
          }
          .hero-orb-2 {
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, #a855f7 0%, transparent 70%);
            bottom: 10%;
            right: 5%;
            animation: float2 10s ease-in-out infinite;
          }
          .hero-orb-3 {
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
            top: 40%;
            left: 50%;
            animation: float3 12s ease-in-out infinite;
          }
          @keyframes float1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -40px) scale(1.05); }
            66% { transform: translate(-20px, 20px) scale(0.95); }
          }
          @keyframes float2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-40px, 30px) scale(1.1); }
            66% { transform: translate(30px, -20px) scale(0.9); }
          }
          @keyframes float3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(40px, -30px) scale(1.15); }
          }
        `}</style>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300">
          <Sparkles size={14} className="animate-pulse" />
          Powered by Shivam
        </div>

        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Intelligence,{" "}
          <span className="text-gradient">Reimagined.</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
          Cavrix AI brings powerful intelligence, creativity, coding, research,
          and productivity into one seamless platform.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="w-full rounded-xl bg-cavrix-gradient px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-cavrix-500/25 transition-all hover:shadow-xl hover:shadow-cavrix-500/40 hover:brightness-110 sm:w-auto"
          >
            Try Cavrix Free
          </Link>
          <Link
            href="#features"
            className="w-full rounded-xl border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5 sm:w-auto"
          >
            Explore Features
          </Link>
        </div>
      </div>
    </section>
  )
}
