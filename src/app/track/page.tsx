import TrackingSearchForm from "@/components/tracking/TrackingSearchForm";
import { Package, Globe, Shield, Clock } from "lucide-react";

export const metadata = { title: "Track Shipment" };

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-surface-0 flex flex-col">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="radial-gradient-orange absolute inset-0" />

      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8">
          <Package className="w-8 h-8 text-accent" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-4">
          Track Your Shipment
        </h1>
        <p className="text-text-muted text-center text-lg mb-12 max-w-md">
          Enter your Eazy Logistics tracking number to see real-time location and status updates.
        </p>

        <div className="w-full max-w-lg">
          <TrackingSearchForm />
        </div>

        <div className="grid grid-cols-3 gap-3 mt-16 max-w-lg w-full">
          {[
            { icon: Globe, label: "180+ Countries" },
            { icon: Clock, label: "Real-Time Updates" },
            { icon: Shield, label: "Secure Tracking" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="glass rounded-xl p-4 text-center">
              <Icon className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="text-xs text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
