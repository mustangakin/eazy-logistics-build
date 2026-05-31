"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

export default function TrackingSearchForm({ compact }: { compact?: boolean }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tn = value.trim().toUpperCase();
    if (tn) router.push(`/track/${tn}`);
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="EZL-XXXXXXXXXX"
          className="flex-1 bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors font-mono"
        />
        <button
          type="submit"
          className="bg-accent hover:bg-accent-warm text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5"
        >
          Track
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter tracking number (e.g. EZL-K7M3RV9XQT)"
            className="w-full bg-surface-1 border border-[#2a2a3e] rounded-2xl pl-12 pr-4 py-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors font-mono text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-accent hover:bg-accent-warm text-white px-6 py-4 rounded-2xl font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          Track <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-text-muted mt-2 text-center">Format: EZL- followed by 10 characters</p>
    </form>
  );
}
