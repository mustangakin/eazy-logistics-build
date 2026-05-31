import { formatDateTime } from "@/lib/utils";
import { CheckCircle2, Clock } from "lucide-react";
import type { TrackingEvent } from "@prisma/client";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Awaiting Pickup",
  PICKED_UP: "Picked Up",
  IN_TRANSIT: "In Transit",
  IN_CUSTOMS: "In Customs",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  EXCEPTION: "Exception",
};

export default function StatusTimeline({
  events,
}: {
  events: TrackingEvent[];
  currentStatus: string;
}) {

  return (
    <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] p-6">
      <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-6">Tracking Timeline</h3>

      {events.length > 0 ? (
        <div className="space-y-0">
          {[...events].reverse().map((ev, i) => (
            <div key={ev.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10",
                  i === 0
                    ? ev.status === "DELIVERED"
                      ? "bg-green-500/20 text-green-400"
                      : ev.status === "EXCEPTION"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-accent/20 text-accent"
                    : "bg-surface-2 text-text-muted"
                )}>
                  {i === 0 ? (
                    ev.status === "DELIVERED" ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                </div>
                {i < events.length - 1 && (
                  <div className="w-px bg-[#2a2a3e] flex-1 my-1" />
                )}
              </div>
              <div className={cn("pb-6 flex-1", i === events.length - 1 && "pb-0")}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={cn("font-semibold text-sm", i === 0 ? "text-text-primary" : "text-text-muted")}>
                      {STATUS_LABELS[ev.status] || ev.status}
                    </p>
                    <p className="text-sm text-text-muted mt-0.5">{ev.description}</p>
                    <p className="text-xs text-text-muted/70 mt-0.5">{ev.location}</p>
                  </div>
                  <p className="text-xs text-text-muted whitespace-nowrap mt-0.5">{formatDateTime(ev.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-text-muted text-sm">No events yet.</p>
      )}
    </div>
  );
}
