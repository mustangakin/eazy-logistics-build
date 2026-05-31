import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ShipmentForm from "@/components/admin/ShipmentForm";
import EventForm from "@/components/admin/EventForm";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { STATUS_LABELS, STATUS_COLORS, formatDateTime, cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function EditShipmentPage({ params }: { params: { id: string } }) {
  const shipment = await prisma.shipment.findUnique({
    where: { id: params.id },
    include: { events: { orderBy: { timestamp: "asc" } } },
  });
  if (!shipment) notFound();

  const { events, ...shipmentData } = shipment;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/shipments" className="text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-text-primary">{shipment.trackingNumber}</h1>
            <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", STATUS_COLORS[shipment.status])}>
              {STATUS_LABELS[shipment.status] || shipment.status}
            </span>
          </div>
          <p className="text-text-muted text-sm mt-1">Recipient: {shipment.recipientName}</p>
        </div>
        <Link
          href={`/track/${shipment.trackingNumber}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Public View
        </Link>
      </div>

      <div className="grid gap-8">
        <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] p-6">
          <h2 className="text-sm font-semibold text-text-primary mb-6 uppercase tracking-wide">Shipment Details</h2>
          <ShipmentForm shipment={shipmentData} />
        </div>

        <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] p-6">
          <h2 className="text-sm font-semibold text-text-primary mb-6 uppercase tracking-wide">Add Tracking Event</h2>
          <EventForm shipmentId={shipment.id} />
        </div>

        {events.length > 0 && (
          <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] p-6">
            <h2 className="text-sm font-semibold text-text-primary mb-6 uppercase tracking-wide">Event History</h2>
            <div className="space-y-3">
              {[...events].reverse().map((ev) => (
                <div key={ev.id} className="flex gap-4 py-3 border-b border-[#2a2a3e] last:border-0">
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full h-fit", STATUS_COLORS[ev.status])}>
                    {STATUS_LABELS[ev.status] || ev.status}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-text-primary">{ev.description}</p>
                    <p className="text-xs text-text-muted mt-0.5">{ev.location}</p>
                  </div>
                  <p className="text-xs text-text-muted whitespace-nowrap">{formatDateTime(ev.timestamp)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
