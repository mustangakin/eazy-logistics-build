import type { Shipment, TrackingEvent, User } from "@prisma/client";

export type { Shipment, TrackingEvent, User };

export type ShipmentStatus =
  | "PENDING"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "IN_CUSTOMS"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "EXCEPTION";

export type ServiceType = "AIR" | "GROUND" | "MARITIME" | "RAIL";
export type Role = "ADMIN" | "OPERATOR";

export type ShipmentWithEvents = Shipment & {
  events: TrackingEvent[];
  createdBy?: Pick<User, "id" | "name" | "email"> | null;
};

export type PublicShipment = Omit<Shipment, "createdById" | "recipientEmail" | "notes">;

export type PublicTrackingData = {
  shipment: PublicShipment;
  events: TrackingEvent[];
};
