"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { ExternalLink } from "lucide-react";

const team = [
  { name: "David Owens", role: "Head of Air Operations", color: "#3b82f6", photo: "/images/team/david-owens.webp" },
  { name: "Amara Singh", role: "Maritime Director", color: "#f97316", photo: "/images/team/amara-singh.webp" },
  { name: "Chen Wei", role: "Technology & Tracking", color: "#22c55e", photo: "/images/team/chen-wei.webp" },
  { name: "Yara Mensah", role: "Client Operations Lead", color: "#8b5cf6", photo: "/images/team/yara-mensah.webp" },
];

export default function TeamSection() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Our Team</p>
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
          Operators behind every shipment.
        </h2>
        <p className="text-text-muted mt-4 max-w-xl text-lg">
          A hands-on team of logistics experts who treat your freight like their own — and stay available around the clock to prove it.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {team.map(({ name, role, color, photo }) => (
          <motion.div
            key={name}
            variants={fadeInUp}
            className="bg-surface-1 border border-[#2a2a3e] rounded-2xl overflow-hidden hover:border-accent/20 transition-colors group"
          >
            {/* Photo */}
            <div
              className="relative h-52 overflow-hidden"
              style={{ borderBottom: `1px solid ${color}20` }}
            >
              <Image
                src={photo}
                alt={name}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-1/80 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="font-bold text-text-primary mb-1">{name}</h3>
              <p className="text-sm text-text-muted mb-4">{role}</p>
              <a href="#" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-accent transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                Profile
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
