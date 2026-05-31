"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Copy, Check, Loader2 } from "lucide-react";
import type { Shipment } from "@prisma/client";

type FormData = {
  serviceType: string;
  originCity: string;
  originCountry: string;
  originLat: number;
  originLng: number;
  destCity: string;
  destCountry: string;
  destLat: number;
  destLng: number;
  weightKg: number;
  dimensions: string;
  carrier: string;
  recipientName: string;
  recipientEmail: string;
  estimatedDelivery: string;
  notes: string;
};

export default function ShipmentForm({ shipment }: { shipment?: Shipment }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdTracking, setCreatedTracking] = useState("");
  const [copied, setCopied] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: shipment ? {
      serviceType: shipment.serviceType,
      originCity: shipment.originCity,
      originCountry: shipment.originCountry,
      originLat: shipment.originLat,
      originLng: shipment.originLng,
      destCity: shipment.destCity,
      destCountry: shipment.destCountry,
      destLat: shipment.destLat,
      destLng: shipment.destLng,
      weightKg: shipment.weightKg,
      dimensions: shipment.dimensions || "",
      carrier: shipment.carrier || "",
      recipientName: shipment.recipientName,
      recipientEmail: shipment.recipientEmail || "",
      estimatedDelivery: shipment.estimatedDelivery
        ? new Date(shipment.estimatedDelivery).toISOString().slice(0, 16)
        : "",
      notes: shipment.notes || "",
    } : { serviceType: "AIR" },
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    setError("");
    const payload = {
      ...data,
      originLat: Number(data.originLat),
      originLng: Number(data.originLng),
      destLat: Number(data.destLat),
      destLng: Number(data.destLng),
      weightKg: Number(data.weightKg),
    };

    const url = shipment ? `/api/shipments/${shipment.id}` : "/api/shipments";
    const method = shipment ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      setError("Failed to save shipment. Please check all fields.");
      return;
    }
    const json = await res.json();
    if (!shipment) {
      setCreatedTracking(json.shipment.trackingNumber);
    } else {
      router.push("/admin/shipments");
    }
  }

  function copyTracking() {
    navigator.clipboard.writeText(createdTracking);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (createdTracking) {
    return (
      <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] p-8 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Shipment Created!</h2>
        <p className="text-text-muted text-sm mb-6">Share this tracking number with the recipient</p>
        <div className="bg-surface-2 rounded-xl px-6 py-4 flex items-center justify-between mb-6">
          <span className="font-mono text-accent text-lg font-bold">{createdTracking}</span>
          <button onClick={copyTracking} className="text-text-muted hover:text-accent transition-colors">
            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setCreatedTracking(""); }}
            className="flex-1 border border-[#2a2a3e] text-text-muted hover:text-text-primary py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Create Another
          </button>
          <button
            onClick={() => router.push("/admin/shipments")}
            className="flex-1 bg-accent hover:bg-accent-warm text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            View All Shipments
          </button>
        </div>
      </div>
    );
  }

  const field = (label: string, name: keyof FormData, type = "text", opts?: object) => (
    <div>
      <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        step={type === "number" ? "any" : undefined}
        {...register(name, { required: true, ...opts })}
        className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors"
      />
      {errors[name] && <p className="text-red-400 text-xs mt-1">Required</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wide">Service</h2>
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Service Type</label>
          <select
            {...register("serviceType", { required: true })}
            className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
          >
            <option value="AIR">Air Freight</option>
            <option value="GROUND">Ground Freight</option>
            <option value="MARITIME">Maritime Freight</option>
            <option value="RAIL">Rail Freight</option>
          </select>
        </div>
      </div>

      <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wide">Origin</h2>
        <div className="grid grid-cols-2 gap-4">
          {field("City", "originCity")}
          {field("Country", "originCountry")}
          {field("Latitude", "originLat", "number")}
          {field("Longitude", "originLng", "number")}
        </div>
      </div>

      <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wide">Destination</h2>
        <div className="grid grid-cols-2 gap-4">
          {field("City", "destCity")}
          {field("Country", "destCountry")}
          {field("Latitude", "destLat", "number")}
          {field("Longitude", "destLng", "number")}
        </div>
      </div>

      <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wide">Recipient</h2>
        <div className="grid grid-cols-2 gap-4">
          {field("Full Name", "recipientName")}
          {field("Email (optional)", "recipientEmail", "email")}
        </div>
      </div>

      <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wide">Package Details</h2>
        <div className="grid grid-cols-2 gap-4">
          {field("Weight (kg)", "weightKg", "number")}
          {field("Dimensions (optional)", "dimensions")}
          {field("Carrier (optional)", "carrier")}
          {field("Est. Delivery", "estimatedDelivery", "datetime-local")}
        </div>
        <div className="mt-4">
          <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Notes (optional)</label>
          <textarea
            {...register("notes")}
            rows={3}
            className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors resize-none"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-[#2a2a3e] text-text-muted hover:text-text-primary px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-accent hover:bg-accent-warm text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Saving…" : shipment ? "Update Shipment" : "Create Shipment"}
        </button>
      </div>
    </form>
  );
}
