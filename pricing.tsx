"use client"

import Link from "next/link"
import { SUBSCRIPTION_PLANS } from "@/types"
import { Check } from "lucide-react"

export default function Pricing() {
  return (
    <section id="pricing" className="relative px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Simple,{" "}
            <span className="text-gradient">Transparent Pricing</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Start free, upgrade when you need more power
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] ${
                plan.recommended
                  ? "border-purple-500/50 shadow-lg shadow-purple-500/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {plan.recommended && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              )}

              {plan.badge && (
                <div className="mb-4 inline-flex w-fit rounded-full bg-cavrix-gradient px-3 py-1 text-xs font-bold text-white">
                  {plan.badge}
                </div>
              )}

              <h3 className="mb-2 text-lg font-bold text-white">{plan.name}</h3>

              <div className="mb-6">
                {plan.price < 0 ? (
                  <span className="text-3xl font-bold text-white">Custom</span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-slate-400">₹</span>
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-sm text-slate-500">/mo</span>
                  </div>
                )}
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`block rounded-xl py-2.5 text-center text-sm font-semibold transition-all ${
                  plan.recommended
                    ? "bg-cavrix-gradient text-white shadow-md shadow-cavrix-500/25 hover:shadow-lg hover:shadow-cavrix-500/40 hover:brightness-110"
                    : "border border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                }`}
              >
                {plan.price < 0 ? "Contact Sales" : "Get Started"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
