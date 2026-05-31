"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-surface-0" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />
      <div className="grid-pattern absolute inset-0 opacity-20" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Package className="w-8 h-8 text-accent" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Move what matters,{" "}
            <span className="gradient-text">with intent.</span>
          </h2>

          <p className="text-text-muted text-lg max-w-xl mx-auto mb-10">
            Join thousands of businesses that trust Easy Logistics to move their freight — on time, every time, with full visibility.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/track"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-warm text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:scale-[1.02] text-base"
            >
              Start Shipping <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center gap-2 border border-[#2a2a3e] hover:border-accent/40 text-text-muted hover:text-text-primary font-medium px-8 py-4 rounded-2xl transition-all text-base"
            >
              Track a Shipment
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
