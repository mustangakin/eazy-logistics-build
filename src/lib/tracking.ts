import { prisma } from "./prisma";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const LENGTH = 10;

function generateCode() {
  let code = "";
  for (let i = 0; i < LENGTH; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return `EZL-${code}`;
}

export async function generateTrackingNumber(): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const trackingNumber = generateCode();
    const existing = await prisma.shipment.findUnique({
      where: { trackingNumber },
    });
    if (!existing) return trackingNumber;
  }
  throw new Error("Failed to generate unique tracking number after 5 attempts");
}
