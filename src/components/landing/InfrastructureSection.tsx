"use client";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import { CheckCircle2 } from "lucide-react";

const stats = [
  { value: "2,400+", label: "Partner Carriers" },
  { value: "847", label: "Global Hubs" },
  { value: "99.98%", label: "Uptime SLA" },
  { value: "12M ft²", label: "Warehouse Space" },
];

const features = [
  "Certified temperature-controlled storage",
  "AI-powered route optimization",
  "Confirmed insurance coverage",
  "Live operator monitoring",
  "24/7 compliance operations",
];

export default function InfrastructureSection() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Image side */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden bg-surface-2 border border-[#2a2a3e]" style={{ height: "420px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/infrastructure/warehouse.webp"
              alt="Eazy Logistics global warehouse infrastructure"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-2/60 to-transparent" />
            {/* Corner badge */}
            <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-2.5">
              <p className="text-xs text-text-muted">Fully operational</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <p className="text-sm font-semibold text-text-primary">Live monitoring</p>
              </div>
            </div>
          </div>

          {/* Floating stat card */}
          <div className="absolute -bottom-6 -right-6 glass rounded-2xl px-5 py-4 border border-accent/20 glow-orange">
            <p className="text-2xl font-bold text-text-primary">99.98%</p>
            <p className="text-xs text-text-muted">On-time delivery rate</p>
          </div>
        </motion.div>

        {/* Content side */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Infrastructure</p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
            Infrastructure you can see.
          </h2>
          <p className="text-text-muted leading-relaxed mb-8 text-lg">
            From Tier-1 warehousing to last-mile delivery networks, every point in our supply chain is connected, monitored, and optimized — so you always know exactly where your freight is.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-surface-1 border border-[#2a2a3e] rounded-xl p-4">
                <p className="text-2xl font-bold text-accent">{value}</p>
                <p className="text-xs text-text-muted mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-text-muted">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
