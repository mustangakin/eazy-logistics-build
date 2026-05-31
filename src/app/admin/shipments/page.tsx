import { prisma } from "@/lib/prisma";
import ShipmentTable from "@/components/admin/ShipmentTable";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ShipmentsPage() {
  const shipments = await prisma.shipment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Shipments</h1>
          <p className="text-text-muted text-sm mt-1">{shipments.length} total shipments</p>
        </div>
        <Link
          href="/admin/shipments/new"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-warm text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Shipment
        </Link>
      </div>
      <ShipmentTable shipments={shipments} />
    </div>
  );
}
