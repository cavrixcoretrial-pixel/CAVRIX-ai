"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Zap, Crown, Building2, ArrowRight } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/types";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-full p-6 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-white/50 text-lg mb-8">
            Unlock the full power of Cavrix AI
          </p>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                !annual
                  ? "bg-cavrix-gradient text-white shadow-lg shadow-purple-500/20"
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                annual
                  ? "bg-cavrix-gradient text-white shadow-lg shadow-purple-500/20"
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              Yearly
              <span className="ml-1.5 text-xs text-cyan-400 font-semibold">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const displayPrice =
              plan.price < 0
                ? null
                : annual && plan.price > 0
                ? Math.round(plan.price * 0.8)
                : plan.price;

            const isPopular = plan.recommended;
            const isBusiness = plan.id === "business";

            const planIcons: Record<string, React.ReactNode> = {
              free: <Sparkles className="w-6 h-6" />,
              plus: <Zap className="w-6 h-6" />,
              pro: <Crown className="w-6 h-6" />,
              business: <Building2 className="w-6 h-6" />,
            };

            const planColors: Record<string, string> = {
              free: "from-white/10 to-white/5",
              plus: "from-purple-500/20 to-purple-500/5",
              pro: "from-cyan-500/20 to-cyan-500/5",
              business: "from-cavrix-500/20 to-cavrix-500/5",
            };

            const glowColors: Record<string, string> = {
              free: "",
              plus: "shadow-purple-500/20 hover:shadow-purple-500/30",
              pro: "shadow-cyan-500/20 hover:shadow-cyan-500/30",
              business: "shadow-cavrix-500/20 hover:shadow-cavrix-500/30",
            };

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border bg-gradient-to-b transition-all duration-300 hover:scale-[1.02] ${
                  isPopular
                    ? "border-purple-500/40 shadow-glow"
                    : "border-white/10 hover:border-white/20"
                } ${planColors[plan.id]} ${glowColors[plan.id]}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cavrix-gradient px-4 py-1 text-xs font-bold text-white shadow-lg shadow-purple-500/30">
                    {plan.badge}
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <div className={`mb-4 inline-flex w-12 h-12 items-center justify-center rounded-xl ${
                    isPopular
                      ? "bg-purple-500/20 text-purple-400"
                      : isBusiness
                      ? "bg-cavrix-500/20 text-cavrix-400"
                      : plan.id === "pro"
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "bg-white/10 text-white/60"
                  }`}>
                    {planIcons[plan.id]}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>

                  <div className="mb-6">
                    {displayPrice === null ? (
                      <span className="text-xl font-bold text-white">Custom</span>
                    ) : displayPrice === 0 ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white">₹0</span>
                        <span className="text-white/40 text-sm">/forever</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white">₹{displayPrice}</span>
                        <span className="text-white/40 text-sm">/mo</span>
                      </div>
                    )}
                    {annual && displayPrice !== null && displayPrice !== 0 && (
                      <p className="text-xs text-cyan-400 mt-1">Billed annually</p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-white/60">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isBusiness ? (
                    <a
                      href="mailto:sales@cavrix.ai"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20"
                    >
                      Contact Sales
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href={`/billing/checkout?plan=${plan.id}`}
                      className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        isPopular
                          ? "bg-cavrix-gradient text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02]"
                          : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      {plan.price === 0 ? "Get Started" : isPopular ? "Upgrade to Plus" : "Subscribe"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
