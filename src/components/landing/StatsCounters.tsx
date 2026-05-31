"use client";
import { useCountUp } from "@/hooks/useCountUp";

const counters = [
  { target: 4280000, suffix: "+", label: "Shipments Delivered", prefix: "" },
  { target: 180, suffix: "+", label: "Countries Covered", prefix: "" },
  { target: 9998, suffix: "%", label: "On-Time Delivery", prefix: "", divisor: 100 },
  { target: 24, suffix: "/7", label: "Support Available", prefix: "" },
];

function Counter({ target, suffix, label, prefix, divisor }: { target: number; suffix: string; label: string; prefix: string; divisor?: number }) {
  const { count, ref } = useCountUp(target);
  const display = divisor ? (count / divisor).toFixed(2) : count.toLocaleString();

  return (
    <div ref={ref} className="text-center px-8 py-6">
      <p className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
        {prefix}{display}{suffix}
      </p>
      <p className="text-text-muted text-sm">{label}</p>
    </div>
  );
}

export default function StatsCounters() {
  return (
    <section className="py-28 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#2a2a3e] border border-[#2a2a3e] rounded-2xl bg-surface-1 overflow-hidden">
        {counters.map((c) => (
          <Counter key={c.label} {...c} />
        ))}
      </div>
    </section>
  );
}
