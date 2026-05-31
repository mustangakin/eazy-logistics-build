"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const testimonials = [
  {
    quote: "Easy Logistics replaced two carriers and a tracking dashboard. Fewer vendors, fewer surprises, faster clearance times.",
    name: "James Adeyemi",
    title: "Supply Chain Director",
    company: "Meridian Group",
    initials: "JA",
    color: "#f97316",
  },
  {
    quote: "The visibility is the difference. We know exactly where every shipment is, on the minute. The product actually does what it says.",
    name: "Mirova Adjunct",
    title: "Head of Operations",
    company: "HeliosPort",
    initials: "MA",
    color: "#3b82f6",
  },
  {
    quote: "Premium service that actually feels premium. The problem is that now we can't imagine going back to how we used to operate.",
    name: "Petra Baumgartner",
    title: "VP of Procurement",
    company: "Schwarzwald Industries",
    initials: "PB",
    color: "#22c55e",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-28 bg-surface-1 border-y border-[#2a2a3e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
            Quiet confidence at scale.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map(({ quote, name, title, company, initials, color }) => (
            <motion.div
              key={name}
              variants={fadeInUp}
              className="bg-surface-2 border border-[#2a2a3e] rounded-2xl p-7 flex flex-col"
            >
              <Quote className="w-6 h-6 text-accent/40 mb-4" />
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-text-muted text-sm leading-relaxed flex-1 mb-6">&ldquo;{quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{name}</p>
                  <p className="text-xs text-text-muted">{title} · {company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
