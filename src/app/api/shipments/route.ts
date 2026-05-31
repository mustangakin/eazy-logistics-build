import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateTrackingNumber } from "@/lib/tracking";
import { z } from "zod";

const createSchema = z.object({
  serviceType: z.enum(["AIR", "GROUND", "MARITIME", "RAIL"]),
  originCity: z.string().min(1),
  originCountry: z.string().min(1),
  originLat: z.number(),
  originLng: z.number(),
  destCity: z.string().min(1),
  destCountry: z.string().min(1),
  destLat: z.number(),
  destLng: z.number(),
  weightKg: z.number().positive(),
  dimensions: z.string().optional(),
  carrier: z.string().optional(),
  recipientName: z.string().min(1),
  recipientEmail: z.string().email().optional().or(z.literal("")),
  estimatedDelivery: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const service = searchParams.get("service");
  const search = searchParams.get("search");

  const shipments = await prisma.shipment.findMany({
    where: {
      ...(status && { status: status as never }),
      ...(service && { serviceType: service as never }),
      ...(search && {
        OR: [
          { trackingNumber: { contains: search.toUpperCase() } },
          { recipientName: { contains: search } },
        ],
      }),
    },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { events: true } } },
  });

  return NextResponse.json({ shipments });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const trackingNumber = await generateTrackingNumber();

  const shipment = await prisma.shipment.create({
    data: {
      trackingNumber,
      serviceType: data.serviceType,
      originCity: data.originCity,
      originCountry: data.originCountry,
      originLat: data.originLat,
      originLng: data.originLng,
      destCity: data.destCity,
      destCountry: data.destCountry,
      destLat: data.destLat,
      destLng: data.destLng,
      weightKg: data.weightKg,
      dimensions: data.dimensions,
      carrier: data.carrier,
      recipientName: data.recipientName,
      recipientEmail: data.recipientEmail || null,
      estimatedDelivery: data.estimatedDelivery ? new Date(data.estimatedDelivery) : null,
      notes: data.notes,
      events: {
        create: {
          status: "PENDING",
          description: "Shipment created and awaiting pickup",
          location: `${data.originCity}, ${data.originCountry}`,
          lat: data.originLat,
          lng: data.originLng,
        },
      },
    },
  });

  return NextResponse.json({ shipment }, { status: 201 });
}
