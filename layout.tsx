import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Cavrix AI - Powered by Shivam",
    template: "%s | Cavrix AI",
  },
  description:
    "Cavrix AI is an advanced AI assistant powered by the latest models. Chat, generate, create and more.",
  keywords: [
    "AI",
    "Cavrix",
    "assistant",
    "chat",
    "generative",
    "machine learning",
  ],
  applicationName: "Cavrix AI",
  authors: [{ name: "Shivam" }],
  openGraph: {
    title: "Cavrix AI",
    description:
      "Cavrix AI is an advanced AI assistant powered by the latest models.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cavrix AI",
    description:
      "Cavrix AI is an advanced AI assistant powered by the latest models.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-[#0a0a0f] text-slate-300 min-h-screen`}
      >
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#111118",
              color: "#e2e8f0",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              borderRadius: "12px",
            },
            success: {
              iconTheme: { primary: "#22d3ee", secondary: "#0a0a0f" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#0a0a0f" },
            },
            duration: 3500,
          }}
        />
      </body>
    </html>
  );
}