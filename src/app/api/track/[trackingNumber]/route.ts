import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { trackingNumber: string } }
) {
  const shipment = await prisma.shipment.findUnique({
    where: { trackingNumber: params.trackingNumber.toUpperCase() },
    include: { events: { orderBy: { timestamp: "asc" } } },
  });

  if (!shipment) {
    return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { events, createdById: _cbi, recipientEmail: _re, notes: _n, ...publicShipment } = shipment;

  return NextResponse.json({ shipment: publicShipment, events });
}
