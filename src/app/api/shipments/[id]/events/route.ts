import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const eventSchema = z.object({
  status: z.enum(["PENDING", "PICKED_UP", "IN_TRANSIT", "IN_CUSTOMS", "OUT_FOR_DELIVERY", "DELIVERED", "EXCEPTION"]),
  description: z.string().min(1),
  location: z.string().min(1),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { status, description, location, lat, lng } = parsed.data;

  const [event, shipment] = await prisma.$transaction([
    prisma.trackingEvent.create({
      data: { shipmentId: params.id, status, description, location, lat, lng },
    }),
    prisma.shipment.update({
      where: { id: params.id },
      data: {
        status,
        ...(lat !== undefined && lng !== undefined && { currentLat: lat, currentLng: lng }),
      },
    }),
  ]);

  return NextResponse.json({ event, shipment }, { status: 201 });
}
