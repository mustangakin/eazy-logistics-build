import { prisma } from "@/lib/prisma";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export const metadata = { title: "Fleet Map" };
export const revalidate = 0;

const FleetMap = dynamic(() => import("@/components/admin/FleetMap"), { ssr: false });

export default async function FleetMapPage() {
  const shipments = await prisma.shipment.findMany({
    where: { NOT: { status: "DELIVERED" } },
    select: {
      id: true,
      trackingNumber: true,
      status: true,
      serviceType: true,
      recipientName: true,
      originCity: true,
      destCity: true,
      currentLat: true,
      currentLng: true,
      originLat: true,
      originLng: true,
    },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Fleet Map</h1>
        <p className="text-text-muted text-sm mt-1">{shipments.length} active shipments</p>
      </div>
      <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] overflow-hidden">
        <Suspense fallback={<div className="bg-surface-2 animate-pulse" style={{ height: "calc(100vh - 220px)" }} />}>
          <FleetMap shipments={shipments} />
        </Suspense>
      </div>
    </div>
  );
}
