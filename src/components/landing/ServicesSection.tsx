"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plane, Truck, Ship, Train, ArrowRight } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const services = [
  {
    icon: Plane,
    title: "Air Freight",
    desc: "Priority air cargo with door-to-door tracking across 180+ countries. Fastest transit times guaranteed.",
    color: "from-blue-500/10 to-blue-600/5",
    accent: "#3b82f6",
    stats: "2-5 day delivery",
    image: "/images/services/air-freight.webp",
  },
  {
    icon: Truck,
    title: "Ground Freight",
    desc: "Full and partial truckload solutions with real-time GPS tracking throughout every mile.",
    color: "from-orange-500/10 to-orange-600/5",
    accent: "#f97316",
    stats: "1-7 day delivery",
    image: "/images/services/ground-freight.webp",
  },
  {
    icon: Ship,
    title: "Maritime Freight",
    desc: "FCL and LCL ocean freight services with port-to-port and door-to-door options globally.",
    color: "from-cyan-500/10 to-cyan-600/5",
    accent: "#06b6d4",
    stats: "15-45 day transit",
    image: "/images/services/maritime.webp",
  },
  {
    icon: Train,
    title: "Rail Freight",
    desc: "Cost-effective transcontinental rail solutions bridging key economic corridors efficiently.",
    color: "from-green-500/10 to-green-600/5",
    accent: "#22c55e",
    stats: "7-25 day transit",
    image: "/images/services/rail.webp",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Services</p>
        <div className="flex items-end justify-between">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary max-w-xl leading-tight">
            Every mode. One operating system.
          </h2>
          <p className="hidden md:block text-text-muted max-w-xs text-sm leading-relaxed">
            Air, ground, sea or rail — managed through a single dashboard with zero complexity for every shipment.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {services.map(({ icon: Icon, title, desc, color, accent, stats, image }) => (
          <motion.div
            key={title}
            variants={fadeInUp}
            className="group relative bg-surface-1 border border-[#2a2a3e] rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 cursor-pointer"
          >
            {/* Service image */}
            <div className="relative h-40 overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-surface-1/40 to-transparent" />
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />
            </div>

            <div className="p-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 -mt-10 relative z-10 border" style={{ background: `${accent}20`, borderColor: `${accent}30` }}>
                <Icon className="w-6 h-6" style={{ color: accent }} />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-5">{desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ color: accent, background: `${accent}15` }}>
                  {stats}
                </span>
                <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
