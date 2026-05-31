"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const DEMO_TN = "EZL-K7M3RV9XQT";

export default function TrackingTeaser() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= DEMO_TN.length) {
        setTyped(DEMO_TN.slice(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
        setDone(true);
        // Animate progress bar
        let p = 0;
        const progInterval = setInterval(() => {
          p += 2;
          setProgress(p);
          if (p >= 68) clearInterval(progInterval);
        }, 30);
      }
    }, 60);
    return () => clearInterval(typeInterval);
  }, []);

  return (
    <section className="py-28 bg-surface-1 border-y border-[#2a2a3e] relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(249,115,22,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Live Tracking</p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Watch it move, in real time.
          </h2>
          <p className="text-text-muted text-lg mb-12 max-w-lg mx-auto">
            Enter any tracking number to see live location, route progress, and status updates — updated every 30 seconds.
          </p>

          {/* Demo tracking UI */}
          <div className="bg-surface-2 border border-[#2a2a3e] rounded-2xl p-6 mb-6 max-w-lg mx-auto text-left">
            <label className="block text-xs text-text-muted mb-2 uppercase tracking-wide">Tracking Number</label>
            <div className="flex gap-3">
              <div className="flex-1 bg-surface-0 border border-[#2a2a3e] rounded-xl px-4 py-3 font-mono text-sm text-accent">
                {typed}
                {!done && <span className="animate-pulse">|</span>}
              </div>
              <div className="bg-accent text-white text-sm font-semibold px-4 py-3 rounded-xl opacity-80">
                Track
              </div>
            </div>

            {done && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    New York, USA
                  </div>
                  <span className="text-accent font-medium">In Transit · 68%</span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    London, UK
                  </div>
                </div>
                <div className="h-1.5 bg-surface-0 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          <Link
            href="/track"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-warm text-white font-semibold px-6 py-3.5 rounded-2xl transition-all hover:scale-[1.02]"
          >
            Track Your Shipment <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
