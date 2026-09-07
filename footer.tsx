import Link from "next/link"

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#06060a] px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="footerGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#3390ff" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <path
                d="M22 6C16.5 6 12 8.5 12 14v4c0 5.5 4.5 8 10 8"
                stroke="url(#footerGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M10 6c-5.5 0-10 3-10 8s4.5 8 10 8"
                stroke="url(#footerGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
              <circle cx="24" cy="8" r="3" fill="url(#footerGrad)" />
              <path
                d="M8 26l4-4m0 0l4 4m-4-4v-6"
                stroke="url(#footerGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
              />
            </svg>
            <span className="text-base font-bold text-gradient">Cavrix AI</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-slate-500 transition-colors hover:text-slate-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {["twitter", "github", "discord"].map((social) => (
              <div
                key={social}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs text-slate-500 transition-all hover:border-white/20 hover:text-slate-300"
              >
                {social.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-8 text-xs text-slate-600 sm:flex-row">
          <p>&copy; 2024 Cavrix AI. All rights reserved.</p>
          <p>Powered by Shivam</p>
        </div>
      </div>
    </footer>
  )
}
