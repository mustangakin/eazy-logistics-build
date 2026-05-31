"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const posts = [
  {
    category: "Industry",
    title: "Why air cargo is shifting back to freighters after three years of belly-hold dependence",
    date: "May 28, 2026",
    readTime: "4 min read",
    tag: "Air Freight",
    tagColor: "#3b82f6",
    image: "/images/blog/post-1.webp",
  },
  {
    category: "Operations",
    title: "Sea freight, container age, and signatures: what the new Asia-Europe framework changes",
    date: "May 19, 2026",
    readTime: "6 min read",
    tag: "Maritime",
    tagColor: "#06b6d4",
    image: "/images/blog/post-2.webp",
  },
  {
    category: "Innovation",
    title: "Inside the US-to-Europe freight corridor that is redefining last-mile delivery",
    date: "May 12, 2026",
    readTime: "5 min read",
    tag: "Ground",
    tagColor: "#f97316",
    image: "/images/blog/post-3.webp",
  },
];

export default function BlogSection() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-end justify-between mb-16"
      >
        <div>
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Insights</p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Field notes from the network.</h2>
        </div>
        <a href="#" className="hidden md:inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors">
          View all <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6"
      >
        {posts.map(({ category, title, date, readTime, tag, tagColor, image }) => (
          <motion.article
            key={title}
            variants={fadeInUp}
            className="group bg-surface-1 border border-[#2a2a3e] rounded-2xl overflow-hidden hover:border-accent/20 transition-colors cursor-pointer"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-1/60 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ color: tagColor, background: `${tagColor}15` }}>
                  {tag}
                </span>
                <span className="text-xs text-text-muted">{category}</span>
              </div>
              <h3 className="font-semibold text-text-primary text-sm leading-snug mb-4 group-hover:text-accent transition-colors line-clamp-3">
                {title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span>{date}</span>
                <span>·</span>
                <Clock className="w-3 h-3" />
                <span>{readTime}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
