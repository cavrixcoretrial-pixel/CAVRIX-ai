"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Loader2, Mail, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VerifyEmailPageProps {
  searchParams: { token?: string };
}

export default function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error" | "pending">("pending");

  useEffect(() => {
    if (!searchParams.token) {
      setStatus("pending");
      return;
    }

    const verifyToken = async () => {
      setStatus("loading");
      try {
        const res = await fetch(
          `/api/auth/verify-email?token=${encodeURIComponent(searchParams.token)}`
        );

        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    verifyToken();
  }, [searchParams.token]);

  return (
    <div className="relative w-full">
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cavrix-600 via-purple-600 to-cyan-500 opacity-30 blur-sm" />
      <div className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-8 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cavrix-gradient shadow-lg shadow-cavrix-600/20">
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          {status === "pending" && (
            <>
              <Mail className="mb-4 h-12 w-12 text-cavrix-400" />
              <h1 className="mb-2 text-2xl font-bold text-white">Check your email</h1>
              <p className="mb-6 text-sm text-slate-400">
                We&apos;ve sent a verification link to your email address. Please click the link to verify
                your account.
              </p>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Back to Sign In
                </Button>
              </Link>
            </>
          )}

          {status === "loading" && (
            <>
              <Loader2 className="mb-4 h-12 w-12 animate-spin text-cavrix-400" />
              <h1 className="mb-2 text-2xl font-bold text-white">Verifying your email...</h1>
              <p className="text-sm text-slate-400">Please wait while we verify your email address.</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="mb-4 h-12 w-12 text-emerald-400" />
              <h1 className="mb-2 text-2xl font-bold text-white">Email verified!</h1>
              <p className="mb-6 text-sm text-slate-400">
                Your email has been successfully verified. You can now sign in to your account.
              </p>
              <Link href="/login">
                <Button variant="gradient" size="lg">
                  Sign In
                </Button>
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <AlertCircle className="mb-4 h-12 w-12 text-red-400" />
              <h1 className="mb-2 text-2xl font-bold text-white">Verification failed</h1>
              <p className="mb-6 text-sm text-slate-400">
                The verification link is invalid or has expired. Please request a new one.
              </p>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Back to Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
