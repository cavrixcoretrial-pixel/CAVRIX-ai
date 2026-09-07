"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-strong border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="#3390ff" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <path
              d="M22 6C16.5 6 12 8.5 12 14v4c0 5.5 4.5 8 10 8"
              stroke="url(#logoGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M10 6c-5.5 0-10 3-10 8s4.5 8 10 8"
              stroke="url(#logoGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            <circle cx="24" cy="8" r="3" fill="url(#logoGrad)" />
            <path
              d="M8 26l4-4m0 0l4 4m-4-4v-6"
              stroke="url(#logoGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.7"
            />
          </svg>
          <span className="text-lg font-bold text-gradient">Cavrix AI</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-cavrix-gradient px-5 py-2 text-sm font-semibold text-white shadow-md shadow-cavrix-500/25 transition-all hover:shadow-lg hover:shadow-cavrix-500/40 hover:brightness-110"
          >
            Try Free
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="glass-strong mx-4 mb-4 rounded-2xl border border-white/10 p-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg py-2.5 text-center text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-cavrix-gradient py-2.5 text-center text-sm font-semibold text-white shadow-md"
            >
              Try Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
