"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is Cavrix AI?",
    answer:
      "Cavrix AI is an all-in-one AI platform that combines advanced chat, reasoning, coding assistance, web research, image generation, file analysis, and voice AI into a single seamless experience. It is built to serve students, professionals, and businesses.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Free plan gives you access to Cavrix Lite with limited daily messages, basic AI chat, limited file uploads, and standard support. You can upgrade to Plus or Pro anytime for more powerful models and features.",
  },
  {
    question: "Which AI models are available?",
    answer:
      "We offer six specialized models: Cavrix Lite (fast, everyday tasks), Cavrix Pro (advanced reasoning and coding), Cavrix Ultra (maximum intelligence), Cavrix Vision (image and document analysis), Cavrix Code (programming specialist), and Cavrix Research (web research and source analysis).",
  },
  {
    question: "How does billing work?",
    answer:
      "All paid plans are billed monthly in INR. Choose between Cavrix Plus at ₹499/month or Cavrix Pro at ₹999/month. Business plans are custom-priced. You can cancel anytime and your subscription will remain active until the end of the billing cycle.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use end-to-end encryption, SOC 2 compliant infrastructure, and strict data isolation. Your conversations and files are never used to train AI models. Business plans include additional security features such as SSO and dedicated infrastructure.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-white/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-sm font-medium text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className="faq-answer"
                style={{
                  maxHeight: openIndex === i ? "200px" : "0",
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <div className="px-6 pb-4 text-sm leading-relaxed text-slate-400">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .faq-answer {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.25s ease;
        }
      `}</style>
    </section>
  )
}
