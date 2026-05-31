import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const passwordHash = await bcrypt.hash("Admin1234!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@eazylogistics.com" },
    update: {},
    create: {
      email: "admin@eazylogistics.com",
      name: "Admin User",
      passwordHash,
      role: "ADMIN",
    },
  });

  // Demo shipments
  const shipments = [
    {
      trackingNumber: "EZL-K7M3RV9XQT",
      status: "IN_TRANSIT",
      serviceType: "AIR",
      originCity: "New York",
      originCountry: "United States",
      originLat: 40.7128,
      originLng: -74.006,
      destCity: "London",
      destCountry: "United Kingdom",
      destLat: 51.5074,
      destLng: -0.1278,
      currentLat: 48.8566,
      currentLng: 2.3522,
      weightKg: 12.5,
      dimensions: "45x30x20 cm",
      carrier: "EazyAir Express",
      recipientName: "James Carter",
      recipientEmail: "james@example.com",
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      createdById: admin.id,
    },
    {
      trackingNumber: "EZL-P4N8WX2ZMC",
      status: "DELIVERED",
      serviceType: "GROUND",
      originCity: "New York",
      originCountry: "United States",
      originLat: 40.7128,
      originLng: -74.006,
      destCity: "Chicago",
      destCountry: "United States",
      destLat: 41.8781,
      destLng: -87.6298,
      currentLat: 41.8781,
      currentLng: -87.6298,
      weightKg: 45.0,
      carrier: "EasyGround Pro",
      recipientName: "Sarah Mitchell",
      recipientEmail: "sarah@example.com",
      estimatedDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdById: admin.id,
    },
    {
      trackingNumber: "EZL-Q2X7BH5RKJ",
      status: "IN_CUSTOMS",
      serviceType: "MARITIME",
      originCity: "Shanghai",
      originCountry: "China",
      originLat: 31.2304,
      originLng: 121.4737,
      destCity: "Rotterdam",
      destCountry: "Netherlands",
      destLat: 51.9225,
      destLng: 4.4792,
      currentLat: 45.0,
      currentLng: 60.0,
      weightKg: 2400.0,
      dimensions: "200x120x100 cm",
      carrier: "EasySea Freight",
      recipientName: "Henrik van der Berg",
      recipientEmail: "henrik@example.com",
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      createdById: admin.id,
    },
    {
      trackingNumber: "EZL-F9T3LM6VNP",
      status: "PICKED_UP",
      serviceType: "RAIL",
      originCity: "Berlin",
      originCountry: "Germany",
      originLat: 52.52,
      originLng: 13.405,
      destCity: "Warsaw",
      destCountry: "Poland",
      destLat: 52.2297,
      destLng: 21.0122,
      currentLat: 52.41,
      currentLng: 14.55,
      weightKg: 320.0,
      carrier: "EasyRail Connect",
      recipientName: "Anna Kowalski",
      estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      createdById: admin.id,
    },
    {
      trackingNumber: "EZL-D6Y2CR4TNS",
      status: "PENDING",
      serviceType: "AIR",
      originCity: "Dubai",
      originCountry: "UAE",
      originLat: 25.2048,
      originLng: 55.2708,
      destCity: "Singapore",
      destCountry: "Singapore",
      destLat: 1.3521,
      destLng: 103.8198,
      weightKg: 8.0,
      carrier: "EasyAir Express",
      recipientName: "Wei Tan",
      recipientEmail: "wei@example.com",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      createdById: admin.id,
    },
  ];

  for (const s of shipments) {
    const shipment = await prisma.shipment.upsert({
      where: { trackingNumber: s.trackingNumber },
      update: {},
      create: s,
    });

    // Add tracking events for each shipment
    const existingEvents = await prisma.trackingEvent.count({
      where: { shipmentId: shipment.id },
    });
    if (existingEvents > 0) continue;

    if (s.status === "IN_TRANSIT" || s.status === "IN_CUSTOMS" || s.status === "DELIVERED" || s.status === "PICKED_UP") {
      await prisma.trackingEvent.createMany({
        data: [
          {
            shipmentId: shipment.id,
            status: "PENDING",
            description: "Shipment created and awaiting pickup",
            location: `${s.originCity}, ${s.originCountry}`,
            lat: s.originLat,
            lng: s.originLng,
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          },
          {
            shipmentId: shipment.id,
            status: "PICKED_UP",
            description: "Package picked up by carrier",
            location: `${s.originCity}, ${s.originCountry}`,
            lat: s.originLat,
            lng: s.originLng,
            timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          },
        ],
      });
    }

    if (s.status === "IN_TRANSIT" || s.status === "IN_CUSTOMS" || s.status === "DELIVERED") {
      await prisma.trackingEvent.create({
        data: {
          shipmentId: shipment.id,
          status: "IN_TRANSIT",
          description: "Shipment departed origin facility",
          location: `${s.originCity}, ${s.originCountry}`,
          lat: s.originLat,
          lng: s.originLng,
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
      });
    }

    if (s.status === "IN_CUSTOMS") {
      await prisma.trackingEvent.create({
        data: {
          shipmentId: shipment.id,
          status: "IN_CUSTOMS",
          description: "Shipment arrived at customs facility for clearance",
          location: "International Customs Checkpoint",
          lat: s.currentLat ?? s.destLat,
          lng: s.currentLng ?? s.destLng,
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
      });
    }

    if (s.status === "DELIVERED") {
      await prisma.trackingEvent.createMany({
        data: [
          {
            shipmentId: shipment.id,
            status: "OUT_FOR_DELIVERY",
            description: "Out for final delivery",
            location: `${s.destCity}, ${s.destCountry}`,
            lat: s.destLat,
            lng: s.destLng,
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          },
          {
            shipmentId: shipment.id,
            status: "DELIVERED",
            description: "Package delivered successfully. Signed by recipient.",
            location: `${s.destCity}, ${s.destCountry}`,
            lat: s.destLat,
            lng: s.destLng,
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
          },
        ],
      });
    }

    if (s.status === "PENDING") {
      await prisma.trackingEvent.create({
        data: {
          shipmentId: shipment.id,
          status: "PENDING",
          description: "Shipment created and awaiting pickup",
          location: `${s.originCity}, ${s.originCountry}`,
          lat: s.originLat,
          lng: s.originLng,
          timestamp: new Date(),
        },
      });
    }
  }

  console.log("✅ Seed complete");
  console.log("Admin login: admin@eazylogistics.com / Admin1234!");
  console.log("Demo tracking numbers:");
  shipments.forEach((s) => console.log(`  ${s.trackingNumber} — ${s.status}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
