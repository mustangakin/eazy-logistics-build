"use client";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { staggerContainer, scaleIn } from "@/lib/animations";

const certs = [
  { name: "ISO 9001", desc: "Quality Management" },
  { name: "ISO 14001", desc: "Environmental Management" },
  { name: "C-TPAT", desc: "Customs-Trade Partnership" },
  { name: "IATA", desc: "Air Transport Association" },
  { name: "AEO", desc: "Authorised Economic Operator" },
  { name: "TAPA", desc: "Transportation Asset Protection" },
];

export default function CertificationsSection() {
  return (
    <section className="py-28 bg-surface-1 border-y border-[#2a2a3e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Compliance</p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
            Certified to operate where the bar is highest.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {certs.map(({ name, desc }) => (
            <motion.div
              key={name}
              variants={scaleIn}
              className="bg-surface-2 border border-[#2a2a3e] rounded-2xl p-5 text-center hover:border-accent/30 transition-colors group"
            >
              <ShieldCheck className="w-6 h-6 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-text-primary">{name}</p>
              <p className="text-xs text-text-muted mt-1">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
