"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Shield, Zap, Clock } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const stats = [
  { icon: Globe, value: "180+", label: "Countries" },
  { icon: Zap, value: "99.98%", label: "On-Time" },
  { icon: Shield, value: "4.28M+", label: "Shipments" },
  { icon: Clock, value: "24/7", label: "Support" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-bg.webp"
          alt="Eazy Logistics global freight hub at night"
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-surface-0/70" />
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />

      {/* Animated orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-accent-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="text-xs font-medium text-accent">Trusted by 4,280,000+ shipments delivered</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.05] tracking-tight mb-6">
              Precision<br />Delivery.{" "}
              <span className="gradient-text">Real-Time<br />Intelligence.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-text-muted leading-relaxed mb-10 max-w-md">
              Eazy Logistics moves the things that matter — with transparent operations, live status across every continent, and infrastructure built for businesses that don&apos;t accept surprises.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link
                href="/track"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-warm text-white font-semibold px-6 py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Track a Shipment <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 border border-[#2a2a3e] hover:border-accent/40 text-text-muted hover:text-text-primary font-medium px-6 py-3.5 rounded-2xl transition-all"
              >
                Our Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Globe visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full border border-accent/10 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-accent/10 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full border border-accent/20 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-0 rounded-full bg-accent/5 blur-xl" />
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-surface-2 to-surface-1 border border-accent/30 flex items-center justify-center glow-orange">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent-blue/20 flex items-center justify-center border border-accent/20">
                    <Globe className="w-10 h-10 text-accent" />
                  </div>
                </div>
              </div>
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={i}
                  className="absolute w-2.5 h-2.5 bg-accent rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${deg}deg) translateX(145px) translateY(-50%)`,
                    boxShadow: "0 0 8px rgba(249,115,22,0.8)",
                    opacity: 0.4 + (i % 3) * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xl font-bold text-text-primary">{value}</p>
                <p className="text-xs text-text-muted">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
