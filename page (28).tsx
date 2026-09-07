"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CreditCard,
  Check,
  Shield,
  Zap,
  Lock,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SUBSCRIPTION_PLANS } from "@/types";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "plus";

  const [paymentMethod, setPaymentMethod] = useState<"card" | "razorpay">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPlan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
  if (!selectedPlan || selectedPlan.id === "business") {
    router.push("/billing");
    return null;
  }

  const tax = Math.round(selectedPlan.price * 0.18);
  const total = selectedPlan.price + tax;

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      return digits.slice(0, 2) + "/" + digits.slice(2);
    }
    return digits;
  };

  const handleSubscribe = () => {
    if (paymentMethod === "card") {
      if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
        toast.error("Please enter a valid card number");
        return;
      }
      if (!expiry || expiry.length < 5) {
        toast.error("Please enter a valid expiry date");
        return;
      }
      if (!cvc || cvc.length < 3) {
        toast.error("Please enter a valid CVC");
        return;
      }
      if (!name.trim()) {
        toast.error("Please enter the cardholder name");
        return;
      }
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(`Subscribed to ${selectedPlan.name} successfully!`);
      router.push("/billing");
    }, 2000);
  };

  const handleRazorpay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(`Subscribed to ${selectedPlan.name} via Razorpay!`);
      router.push("/billing");
    }, 2000);
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto scrollbar-thin">
      <div className="mx-auto w-full max-w-4xl flex-1 px-6 py-8">
        <div className="mb-8">
          <Link
            href="/billing"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Billing
          </Link>
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
          <p className="mt-1 text-sm text-slate-500">
            Complete your subscription to get started.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5 animate-fade-in">
          <div className="space-y-6 lg:col-span-3">
            <section>
              <h2 className="mb-4 text-lg font-semibold text-white">Payment Method</h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all duration-200",
                    paymentMethod === "card"
                      ? "border-cavrix-500 bg-cavrix-600/15 text-cavrix-300"
                      : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white"
                  )}
                >
                  <CreditCard className="h-4 w-4" />
                  Credit/Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("razorpay")}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all duration-200",
                    paymentMethod === "razorpay"
                      ? "border-cavrix-500 bg-cavrix-600/15 text-cavrix-300"
                      : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white"
                  )}
                >
                  <Zap className="h-4 w-4" />
                  Razorpay
                </button>
              </div>
            </section>

            {paymentMethod === "card" && (
              <section>
                <h2 className="mb-4 text-lg font-semibold text-white">Card Details</h2>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="card-number"
                        className="mb-1.5 block text-sm font-medium text-slate-300"
                      >
                        Card number
                      </label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="expiry"
                          className="mb-1.5 block text-sm font-medium text-slate-300"
                        >
                          Expiry date
                        </label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) =>
                            setExpiry(formatExpiry(e.target.value))
                          }
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvc"
                          className="mb-1.5 block text-sm font-medium text-slate-300"
                        >
                          CVC
                        </label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          value={cvc}
                          onChange={(e) =>
                            setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                          }
                          maxLength={4}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="cardholder-name"
                        className="mb-1.5 block text-sm font-medium text-slate-300"
                      >
                        Cardholder name
                      </label>
                      <Input
                        id="cardholder-name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Your payment is secured with 256-bit SSL encryption.</span>
                </div>
              </section>
            )}

            {paymentMethod === "razorpay" && (
              <section>
                <h2 className="mb-4 text-lg font-semibold text-white">Razorpay</h2>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
                  <div className="flex flex-col items-center gap-4 py-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/15">
                      <Zap className="h-7 w-7 text-blue-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-white">
                        You will be redirected to Razorpay
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Complete payment securely via Razorpay gateway
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <Shield className="h-3.5 w-3.5" />
                  <span>PCI DSS compliant. Your data is encrypted and secure.</span>
                </div>
              </section>
            )}

            <div className="flex justify-center lg:hidden">
              <Button
                className="w-full bg-cavrix-gradient px-8 py-6 text-base font-semibold text-white shadow-cavrix hover:bg-cavrix-gradient-hover"
                onClick={paymentMethod === "razorpay" ? handleRazorpay : handleSubscribe}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Subscribe - ₹{total.toLocaleString("en-IN")}/mo
                  </span>
                )}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-semibold text-white">Order Summary</h2>
              <div className="mb-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cavrix-600/15">
                    <Zap className="h-5 w-5 text-cavrix-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{selectedPlan.name}</p>
                    <p className="text-xs text-slate-500">Billed monthly</p>
                  </div>
                </div>
              </div>

              <div className="mb-4 space-y-3">
                {selectedPlan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-cavrix-400" />
                    <span className="text-sm text-slate-400">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-800 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="text-white">
                      ₹{selectedPlan.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">GST (18%)</span>
                    <span className="text-white">₹{tax.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-2 text-base font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-white">
                      ₹{total.toLocaleString("en-IN")}/mo
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 hidden justify-center lg:flex">
                <Button
                  className="w-full bg-cavrix-gradient px-6 py-6 text-base font-semibold text-white shadow-cavrix hover:bg-cavrix-gradient-hover"
                  onClick={
                    paymentMethod === "razorpay" ? handleRazorpay : handleSubscribe
                  }
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Subscribe
                    </span>
                  )}
                </Button>
              </div>

              <p className="mt-3 text-center text-[11px] text-slate-600">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
                Cancel anytime from your billing settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full min-h-0 flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cavrix-500/30 border-t-cavrix-500" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
