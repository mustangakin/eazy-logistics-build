"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { STATUS_LABELS } from "@/lib/utils";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

type ShipmentPin = {
  id: string;
  trackingNumber: string;
  status: string;
  serviceType: string;
  recipientName: string;
  originCity: string;
  destCity: string;
  currentLat: number | null;
  currentLng: number | null;
  originLat: number;
  originLng: number;
};

function createOrangeIcon() {
  return L.divIcon({
    html: `<div style="width:14px;height:14px;background:#f97316;border-radius:50%;border:2px solid #fff;box-shadow:0 0 8px rgba(249,115,22,0.6)"></div>`,
    className: "",
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

export default function FleetMap({ shipments }: { shipments: ShipmentPin[] }) {
  const icon = createOrangeIcon();

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "calc(100vh - 220px)", width: "100%", background: "#0f0f1a" }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />
      {shipments.map((s) => {
        const lat = s.currentLat ?? s.originLat;
        const lng = s.currentLng ?? s.originLng;
        return (
          <Marker key={s.id} position={[lat, lng]} icon={icon}>
            <Popup className="dark-popup">
              <div style={{ background: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: 12, padding: "12px 16px", minWidth: 200 }}>
                <p style={{ fontFamily: "monospace", color: "#f97316", fontSize: 13, fontWeight: 700, margin: "0 0 4px" }}>{s.trackingNumber}</p>
                <p style={{ color: "#f8fafc", fontSize: 12, margin: "0 0 4px" }}>{s.recipientName}</p>
                <p style={{ color: "#94a3b8", fontSize: 11, margin: "0 0 8px" }}>{s.originCity} → {s.destCity}</p>
                <p style={{ color: "#94a3b8", fontSize: 11, margin: "0 0 8px" }}>{s.serviceType} · {STATUS_LABELS[s.status] || s.status}</p>
                <a
                  href={`/admin/shipments/${s.id}`}
                  style={{ color: "#f97316", fontSize: 11, textDecoration: "none" }}
                >
                  Manage →
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
