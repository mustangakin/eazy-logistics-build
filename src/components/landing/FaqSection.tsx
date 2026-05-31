"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How long does setup take?",
    a: "You can create your first shipment and have a tracking number within 2 minutes. No contracts, no onboarding calls required.",
  },
  {
    q: "Do you have an API?",
    a: "Yes. Our REST API allows you to create shipments, query status, and receive webhooks when tracking events occur. Documentation is available to registered users.",
  },
  {
    q: "Which countries do you cover?",
    a: "We operate across 180+ countries through our partner carrier network. Air freight covers virtually every destination globally; maritime and rail focus on major trade corridors.",
  },
  {
    q: "How do you handle customs?",
    a: "Our operations team manages customs documentation and clearance as part of every international shipment. You'll receive status updates as your freight moves through customs.",
  },
  {
    q: "Is my shipment insured?",
    a: "All shipments include basic carrier liability coverage. Full cargo insurance can be added at booking for high-value freight.",
  },
  {
    q: "Can I get a quote without signing up?",
    a: "You can request a freight quote through our contact form without creating an account. For live rates and instant booking, an account is required.",
  },
  {
    q: "How accurate is the real-time tracking?",
    a: "Location data is updated at each carrier checkpoint and, for ground shipments, via GPS every 30 minutes. Air and maritime updates occur at departure and arrival points.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#2a2a3e] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left gap-4"
      >
        <span className={cn("text-sm font-medium transition-colors", open ? "text-accent" : "text-text-primary")}>
          {q}
        </span>
        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors", open ? "bg-accent/10 text-accent" : "bg-surface-2 text-text-muted")}>
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="pb-5 text-sm text-text-muted leading-relaxed"
        >
          {a}
        </motion.div>
      )}
    </div>
  );
}

export default function FaqSection() {
  return (
    <section id="faq" className="py-28 bg-surface-1 border-t border-[#2a2a3e]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Common questions</h2>
        </motion.div>

        <div className="bg-surface-2 border border-[#2a2a3e] rounded-2xl px-6">
          {faqs.map((f) => <FaqItem key={f.q} {...f} />)}
        </div>
      </div>
    </section>
  );
}
