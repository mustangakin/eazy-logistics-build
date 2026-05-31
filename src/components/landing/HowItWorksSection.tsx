"use client";
import { motion } from "framer-motion";
import { PackagePlus, Route, Satellite } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    num: "01",
    icon: PackagePlus,
    title: "Book your global shipment",
    desc: "Submit shipment details through our portal. Receive an instant tracking number and confirmation within minutes.",
  },
  {
    num: "02",
    icon: Route,
    title: "We handle the route",
    desc: "Our network of vetted carriers picks up, routes, and manages your freight through customs and every checkpoint.",
  },
  {
    num: "03",
    icon: Satellite,
    title: "Live intelligence",
    desc: "Watch your shipment move in real time. Instant status updates, location pings, and delivery confirmation.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 bg-surface-1 border-y border-[#2a2a3e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
            Three steps. Zero ambiguity.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          {steps.map(({ num, icon: Icon, title, desc }) => (
            <motion.div key={num} variants={fadeInUp} className="relative text-center">
              <div className="inline-flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-surface-2 border border-[#2a2a3e] rounded-2xl flex items-center justify-center mx-auto relative z-10">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <span className="absolute -top-3 -right-3 text-xs font-bold text-accent bg-surface-0 border border-accent/20 w-7 h-7 rounded-full flex items-center justify-center">
                    {num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{title}</h3>
                <p className="text-text-muted text-sm leading-relaxed max-w-xs">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
