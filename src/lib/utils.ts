import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return format(new Date(date), "MMM d, yyyy");
}

export function formatDateTime(date: Date | string) {
  return format(new Date(date), "MMM d, yyyy • h:mm a");
}

export function formatRelative(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatWeight(kg: number) {
  return kg >= 1000 ? `${(kg / 1000).toFixed(1)} t` : `${kg} kg`;
}

export const STATUS_LABELS: Record<string, string> = {
  PENDING: "Awaiting Pickup",
  PICKED_UP: "Picked Up",
  IN_TRANSIT: "In Transit",
  IN_CUSTOMS: "In Customs",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  EXCEPTION: "Exception",
};

export const STATUS_COLORS: Record<string, string> = {
  PENDING: "text-yellow-400 bg-yellow-400/10",
  PICKED_UP: "text-blue-400 bg-blue-400/10",
  IN_TRANSIT: "text-orange-400 bg-orange-400/10",
  IN_CUSTOMS: "text-purple-400 bg-purple-400/10",
  OUT_FOR_DELIVERY: "text-cyan-400 bg-cyan-400/10",
  DELIVERED: "text-green-400 bg-green-400/10",
  EXCEPTION: "text-red-400 bg-red-400/10",
};

export const SERVICE_LABELS: Record<string, string> = {
  AIR: "Air Freight",
  GROUND: "Ground Freight",
  MARITIME: "Maritime Freight",
  RAIL: "Rail Freight",
};

export const SERVICE_ICONS: Record<string, string> = {
  AIR: "✈",
  GROUND: "🚛",
  MARITIME: "🚢",
  RAIL: "🚂",
};
