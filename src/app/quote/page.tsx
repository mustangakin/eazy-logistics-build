import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock, ShieldCheck, Headphones } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuoteForm from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request a custom freight rate from Eazy Logistics. Air, ground, maritime, and rail — our ops team responds within 4 business hours.",
};

const perks = [
  { icon: Clock, label: "Rate in 4 hours", desc: "No waiting days for a reply" },
  { icon: ShieldCheck, label: "No commitment", desc: "Get the number, decide later" },
  { icon: Headphones, label: "Ops team reviews every request", desc: "A real person, not a bot" },
];

export default function QuotePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-surface-0 pt-16">
        <div className="grid-pattern absolute inset-0 opacity-20 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(249,115,22,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-10">
            <Link href="/" className="hover:text-text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary">Get a Quote</span>
          </nav>

          {/* Hero header */}
          <div className="mb-12">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">
              Get a Quote
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold text-text-primary leading-tight mb-4">
              What are you <span className="gradient-text">moving?</span>
            </h1>
            <p className="text-lg text-text-muted max-w-lg leading-relaxed mb-8">
              Fill in the details below. Our ops team will send a custom rate within 4 business
              hours.
            </p>

            {/* Perk chips */}
            <div className="flex flex-wrap gap-3">
              {perks.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 bg-surface-1 border border-[#2a2a3e] rounded-xl px-4 py-2"
                >
                  <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-text-primary leading-none">{label}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <QuoteForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
