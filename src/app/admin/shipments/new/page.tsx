import ShipmentForm from "@/components/admin/ShipmentForm";

export const metadata = { title: "New Shipment" };

export default function NewShipmentPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">New Shipment</h1>
        <p className="text-text-muted text-sm mt-1">A tracking number will be generated automatically</p>
      </div>
      <ShipmentForm />
    </div>
  );
}
