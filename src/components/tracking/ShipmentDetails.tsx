import { formatDate, formatWeight, STATUS_LABELS, STATUS_COLORS, SERVICE_LABELS, cn } from "@/lib/utils";
import { Plane, Truck, Ship, Train, Weight, Ruler, Calendar, User } from "lucide-react";
import type { Shipment } from "@prisma/client";

const ICONS = { AIR: Plane, GROUND: Truck, MARITIME: Ship, RAIL: Train };

export default function ShipmentDetails({ shipment }: { shipment: Shipment }) {
  const Icon = ICONS[shipment.serviceType as keyof typeof ICONS] || Plane;

  return (
    <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Tracking Number</p>
          <p className="font-mono text-accent text-xl font-bold">{shipment.trackingNumber}</p>
        </div>
        <span className={cn("text-xs font-medium px-3 py-1.5 rounded-full", STATUS_COLORS[shipment.status])}>
          {STATUS_LABELS[shipment.status] || shipment.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface-2 rounded-xl p-4">
          <p className="text-xs text-text-muted mb-1">From</p>
          <p className="text-sm font-semibold text-text-primary">{shipment.originCity}</p>
          <p className="text-xs text-text-muted">{shipment.originCountry}</p>
        </div>
        <div className="bg-surface-2 rounded-xl p-4">
          <p className="text-xs text-text-muted mb-1">To</p>
          <p className="text-sm font-semibold text-text-primary">{shipment.destCity}</p>
          <p className="text-xs text-text-muted">{shipment.destCountry}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4 text-accent flex-shrink-0" />
          <div>
            <p className="text-xs text-text-muted">Service</p>
            <p className="text-sm text-text-primary">{SERVICE_LABELS[shipment.serviceType] || shipment.serviceType}</p>
          </div>
        </div>

        {shipment.carrier && (
          <div className="flex items-center gap-3">
            <Truck className="w-4 h-4 text-text-muted flex-shrink-0" />
            <div>
              <p className="text-xs text-text-muted">Carrier</p>
              <p className="text-sm text-text-primary">{shipment.carrier}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Weight className="w-4 h-4 text-text-muted flex-shrink-0" />
          <div>
            <p className="text-xs text-text-muted">Weight</p>
            <p className="text-sm text-text-primary">{formatWeight(shipment.weightKg)}</p>
          </div>
        </div>

        {shipment.dimensions && (
          <div className="flex items-center gap-3">
            <Ruler className="w-4 h-4 text-text-muted flex-shrink-0" />
            <div>
              <p className="text-xs text-text-muted">Dimensions</p>
              <p className="text-sm text-text-primary">{shipment.dimensions}</p>
            </div>
          </div>
        )}

        {shipment.estimatedDelivery && (
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-text-muted flex-shrink-0" />
            <div>
              <p className="text-xs text-text-muted">Estimated Delivery</p>
              <p className="text-sm text-text-primary">{formatDate(shipment.estimatedDelivery)}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <User className="w-4 h-4 text-text-muted flex-shrink-0" />
          <div>
            <p className="text-xs text-text-muted">Recipient</p>
            <p className="text-sm text-text-primary">{shipment.recipientName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
