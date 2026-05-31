"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";

export default function EventForm({ shipmentId }: { shipmentId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("IN_TRANSIT");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch(`/api/shipments/${shipmentId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        description,
        location,
        ...(lat && lng ? { lat: Number(lat), lng: Number(lng) } : {}),
      }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Failed to add event");
      return;
    }
    setDescription("");
    setLocation("");
    setLat("");
    setLng("");
    router.refresh();
  }

  const statuses = [
    { value: "PENDING", label: "Awaiting Pickup" },
    { value: "PICKED_UP", label: "Picked Up" },
    { value: "IN_TRANSIT", label: "In Transit" },
    { value: "IN_CUSTOMS", label: "In Customs" },
    { value: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "EXCEPTION", label: "Exception" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
          >
            {statuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="e.g. Dubai, UAE"
            className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="e.g. Package departed origin facility"
          className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Latitude (optional)</label>
          <input
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            type="number"
            step="any"
            placeholder="25.2048"
            className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Longitude (optional)</label>
          <input
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            type="number"
            step="any"
            placeholder="55.2708"
            className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-accent hover:bg-accent-warm text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        {loading ? "Adding…" : "Add Event"}
      </button>
    </form>
  );
}
