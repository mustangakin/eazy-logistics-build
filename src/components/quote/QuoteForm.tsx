"use client";
import { useState } from "react";
import { Plane, Truck, Ship, Train, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

const serviceTypes = [
  { id: "air", label: "Air Freight", icon: Plane, color: "text-blue-400", bg: "bg-blue-400/10" },
  { id: "ground", label: "Ground Freight", icon: Truck, color: "text-accent", bg: "bg-accent/10" },
  { id: "maritime", label: "Maritime", icon: Ship, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  { id: "rail", label: "Rail", icon: Train, color: "text-green-400", bg: "bg-green-400/10" },
];

export default function QuoteForm() {
  const [serviceType, setServiceType] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="glass rounded-2xl p-12 flex flex-col items-center justify-center gap-4 text-center min-h-[400px]">
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-text-primary">Quote request received.</h3>
        <p className="text-text-muted max-w-sm">
          Our ops team will send your custom rate breakdown within 4 business hours. No commitment
          required.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1 — Route */}
      <div className="glass rounded-2xl p-8">
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-6">
          01 — Route
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Origin City or Country <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. New York, USA"
              className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Destination City or Country <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Los Angeles, USA"
              className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
        </div>
        <div className="max-w-xs">
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
            Estimated Pickup Date
          </label>
          <input
            type="date"
            className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors text-sm"
          />
        </div>
      </div>

      {/* Section 2 — Cargo */}
      <div className="glass rounded-2xl p-8">
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-6">
          02 — Cargo
        </p>

        {/* Service type radio cards */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
            Service Type <span className="text-accent">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {serviceTypes.map(({ id, label, icon: Icon, color, bg }) => (
              <button
                key={id}
                type="button"
                onClick={() => setServiceType(id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all text-center ${
                  serviceType === id
                    ? "border-accent bg-accent/10"
                    : "border-[#2a2a3e] bg-surface-2/50 hover:border-accent/30"
                }`}
              >
                <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-4.5 h-4.5 ${color}`} />
                </div>
                <span className="text-xs font-semibold text-text-primary">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Cargo Type
            </label>
            <select className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors text-sm appearance-none cursor-pointer">
              <option value="">Select type</option>
              <option>General</option>
              <option>Perishable</option>
              <option>High-Value</option>
              <option>Hazardous</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Estimated Weight
            </label>
            <select className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors text-sm appearance-none cursor-pointer">
              <option value="">Select range</option>
              <option>Under 50 kg</option>
              <option>50–500 kg</option>
              <option>500 kg–5 t</option>
              <option>5 t+</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Dimensions (optional)
            </label>
            <input
              type="text"
              placeholder="L × W × H cm"
              className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
        </div>
      </div>

      {/* Section 3 — Your details */}
      <div className="glass rounded-2xl p-8">
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-6">
          03 — Your Details
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Full Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ada Okonkwo"
              className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Acme Corp"
              className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Email Address <span className="text-accent">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 555 000 0000"
              className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
            Anything Else?
          </label>
          <textarea
            rows={4}
            placeholder="Fragile items, special handling, customs notes, preferred carriers..."
            className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors text-sm resize-none"
          />
        </div>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-warm text-white font-semibold py-4 rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 text-base"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowRight className="w-5 h-5" />
          )}
          {loading ? "Submitting…" : "Request my quote"}
        </button>
        <p className="text-center text-xs text-text-muted mt-3">
          No commitment required. We&apos;ll email your rate breakdown within 4 business hours.
        </p>
      </div>
    </form>
  );
}
