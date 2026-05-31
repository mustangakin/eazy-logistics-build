"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ExternalLink, Plane, Truck, Ship, Train } from "lucide-react";
import { cn, STATUS_LABELS, STATUS_COLORS, formatDate, formatWeight } from "@/lib/utils";
import type { Shipment } from "@prisma/client";

const SERVICE_ICONS = { AIR: Plane, GROUND: Truck, MARITIME: Ship, RAIL: Train };

export default function ShipmentTable({ shipments }: { shipments: Shipment[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = shipments.filter((s) => {
    const matchSearch =
      !search ||
      s.trackingNumber.includes(search.toUpperCase()) ||
      s.recipientName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statuses = ["ALL", "PENDING", "PICKED_UP", "IN_TRANSIT", "IN_CUSTOMS", "OUT_FOR_DELIVERY", "DELIVERED", "EXCEPTION"];

  return (
    <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] overflow-hidden">
      <div className="p-4 border-b border-[#2a2a3e] flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tracking # or recipient…"
            className="w-full bg-surface-2 border border-[#2a2a3e] rounded-xl pl-9 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-surface-2 border border-[#2a2a3e] rounded-xl px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s === "ALL" ? "All Statuses" : STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2a2a3e]">
              {["Tracking #", "Service", "Recipient", "Route", "Status", "Weight", "ETA", ""].map((h) => (
                <th key={h} className="text-left text-xs font-medium text-text-muted px-4 py-3 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-12 text-text-muted text-sm">No shipments found</td>
              </tr>
            )}
            {filtered.map((s) => {
              const Icon = SERVICE_ICONS[s.serviceType as keyof typeof SERVICE_ICONS] || Plane;
              return (
                <tr key={s.id} className="border-b border-[#2a2a3e] hover:bg-surface-2/50 transition-colors">
                  <td className="px-4 py-4">
                    <span className="font-mono text-xs text-accent font-semibold">{s.trackingNumber}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-text-muted">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-xs">{s.serviceType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-text-primary">{s.recipientName}</td>
                  <td className="px-4 py-4 text-xs text-text-muted">
                    <span>{s.originCity}</span>
                    <span className="mx-1.5 text-[#2a2a3e]">→</span>
                    <span>{s.destCity}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", STATUS_COLORS[s.status] || "text-text-muted bg-surface-2")}>
                      {STATUS_LABELS[s.status] || s.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-text-muted">{formatWeight(s.weightKg)}</td>
                  <td className="px-4 py-4 text-xs text-text-muted">
                    {s.estimatedDelivery ? formatDate(s.estimatedDelivery) : "—"}
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/admin/shipments/${s.id}`}
                      className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
