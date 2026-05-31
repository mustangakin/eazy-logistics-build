"use client";
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center gap-4 min-h-[420px] text-center">
        <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
          <Send className="w-7 h-7 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-text-primary">Message sent.</h3>
        <p className="text-text-muted text-sm max-w-xs">
          A real person will read this and reply within one business day. No ticket numbers, no bots.
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-xl font-bold text-text-primary mb-1">Send us a note</h2>
      <p className="text-text-muted text-sm mb-6">
        Sales, partnerships, freight support — all roads start here.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Your Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ada Okonkwo"
              className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Company
            </label>
            <input
              type="text"
              placeholder="Acme Corp"
              className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Email Address <span className="text-accent">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              placeholder="+1 555 000 0000"
              className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              I&apos;m Here About
            </label>
            <select className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors text-sm appearance-none cursor-pointer">
              <option value="">Select a topic</option>
              <option>Ship something new</option>
              <option>Track a package</option>
              <option>Become a partner</option>
              <option>Press inquiry</option>
              <option>General</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Expected Monthly Volume
            </label>
            <select className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors text-sm appearance-none cursor-pointer">
              <option value="">Select volume</option>
              <option>Just one shipment</option>
              <option>1–10 per month</option>
              <option>11–50 per month</option>
              <option>50+ per month</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
            What Do You Need? <span className="text-accent">*</span>
          </label>
          <textarea
            required
            rows={5}
            placeholder="Tell us about your lanes, cargo type, urgency, or anything else that helps us respond usefully."
            className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors text-sm resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-text-muted">
            By submitting you agree to our{" "}
            <a href="#" className="underline hover:text-text-primary transition-colors">
              privacy practices
            </a>
            .
          </p>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-warm text-white font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {loading ? "Sending…" : "Send it"}
          </button>
        </div>
      </form>
    </div>
  );
}
