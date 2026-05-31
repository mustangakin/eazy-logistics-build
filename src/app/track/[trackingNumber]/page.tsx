import { prisma } from "@/lib/prisma";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { Package, ArrowLeft, Search } from "lucide-react";
import StatusTimeline from "@/components/tracking/StatusTimeline";
import ShipmentDetails from "@/components/tracking/ShipmentDetails";
import TrackingSearchForm from "@/components/tracking/TrackingSearchForm";

const TrackingMap = dynamic(() => import("@/components/tracking/TrackingMap"), { ssr: false });

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { trackingNumber: string } }) {
  return { title: `Track ${params.trackingNumber}` };
}

export default async function TrackingDetailPage({ params }: { params: { trackingNumber: string } }) {
  const shipment = await prisma.shipment.findUnique({
    where: { trackingNumber: params.trackingNumber.toUpperCase() },
    include: { events: { orderBy: { timestamp: "asc" } } },
  });

  return (
    <div className="min-h-screen bg-surface-0">
      <div className="grid-pattern fixed inset-0 opacity-20 pointer-events-none" />

      <header className="relative border-b border-[#2a2a3e] bg-surface-0/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-text-primary">Eazy Logistics</span>
          </Link>
          <div className="w-64 hidden md:block">
            <Suspense fallback={null}>
              <TrackingSearchForm compact />
            </Suspense>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 py-8">
        <Link href="/track" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to tracking
        </Link>

        {!shipment ? (
          <div className="max-w-lg mx-auto text-center py-24">
            <div className="w-16 h-16 bg-surface-2 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-text-muted" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-3">Shipment Not Found</h1>
            <p className="text-text-muted mb-8">
              We couldn&apos;t find a shipment with tracking number{" "}
              <span className="font-mono text-accent">{params.trackingNumber}</span>
            </p>
            <Link
              href="/track"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-warm text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Try Another Number
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-surface-1 rounded-2xl border border-[#2a2a3e] overflow-hidden h-[280px] sm:h-[400px]">
                <Suspense fallback={<div className="h-full bg-surface-2 animate-pulse" />}>
                  <TrackingMap
                    originLat={shipment.originLat}
                    originLng={shipment.originLng}
                    destLat={shipment.destLat}
                    destLng={shipment.destLng}
                    currentLat={shipment.currentLat}
                    currentLng={shipment.currentLng}
                    originCity={shipment.originCity}
                    destCity={shipment.destCity}
                    status={shipment.status}
                  />
                </Suspense>
              </div>
              <StatusTimeline events={shipment.events} currentStatus={shipment.status} />
            </div>
            <div>
              <ShipmentDetails shipment={shipment} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
