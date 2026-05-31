"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

type MapProps = {
  originLat: number;
  originLng: number;
  destLat: number;
  destLng: number;
  currentLat: number | null;
  currentLng: number | null;
  originCity: string;
  destCity: string;
  status: string;
};

function createIcon(color: string, size = 14) {
  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;background:${color};border-radius:50%;border:2px solid #fff;box-shadow:0 0 12px ${color}aa;position:relative;"></div>`,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function createCurrentIcon() {
  return L.divIcon({
    html: `
      <div style="position:relative;width:20px;height:20px;display:flex;align-items:center;justify-content:center;">
        <div style="position:absolute;width:40px;height:40px;background:rgba(249,115,22,0.2);border-radius:50%;animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;transform:translate(-50%,-50%);left:50%;top:50%;"></div>
        <div style="width:14px;height:14px;background:#f97316;border-radius:50%;border:2px solid #fff;box-shadow:0 0 12px rgba(249,115,22,0.8);position:relative;z-index:1;"></div>
      </div>
      <style>@keyframes ping{75%,100%{transform:translate(-50%,-50%) scale(2);opacity:0}}</style>
    `,
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length >= 2) {
      map.fitBounds(positions, { padding: [60, 60] });
    }
  }, [map, positions]);
  return null;
}

export default function TrackingMap({ originLat, originLng, destLat, destLng, currentLat, currentLng, originCity, destCity, status }: MapProps) {
  const isDelivered = status === "DELIVERED";
  const curLat = isDelivered ? destLat : (currentLat ?? originLat);
  const curLng = isDelivered ? destLng : (currentLng ?? originLng);

  const originPos: [number, number] = [originLat, originLng];
  const destPos: [number, number] = [destLat, destLng];
  const currentPos: [number, number] = [curLat, curLng];

  const travelledLine: [number, number][] = [originPos, currentPos];
  const remainingLine: [number, number][] = [currentPos, destPos];
  const positions: [number, number][] = [originPos, destPos];

  return (
    <MapContainer
      center={[(originLat + destLat) / 2, (originLng + destLng) / 2]}
      zoom={3}
      style={{ height: "100%", width: "100%", background: "#0f0f1a" }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />
      <FitBounds positions={positions} />

      {/* Travelled path */}
      <Polyline positions={travelledLine} pathOptions={{ color: "#f97316", weight: 2.5, opacity: 0.9 }} />
      {/* Remaining path */}
      <Polyline positions={remainingLine} pathOptions={{ color: "#2a2a3e", weight: 2, opacity: 0.6, dashArray: "6 6" }} />

      {/* Origin */}
      <Marker position={originPos} icon={createIcon("#22c55e")} />

      {/* Current position */}
      {!isDelivered && currentLat !== null && (
        <Marker position={currentPos} icon={createCurrentIcon()} />
      )}

      {/* Destination */}
      <Marker position={destPos} icon={createIcon(isDelivered ? "#22c55e" : "#64748b")} />
    </MapContainer>
  );
}
