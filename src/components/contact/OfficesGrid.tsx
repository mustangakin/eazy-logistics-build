import Image from "next/image";
import { MapPin } from "lucide-react";

const offices = [
  {
    city: "New York",
    region: "US HQ",
    address: "1 World Trade Center, Lower Manhattan",
    image: "/images/offices/new-york.webp",
  },
  {
    city: "London",
    region: "EMEA Hub",
    address: "1 Canada Square, Canary Wharf",
    image: "/images/offices/london.webp",
  },
  {
    city: "Singapore",
    region: "APAC Hub",
    address: "20 Anson Road #08-01",
    image: "/images/offices/singapore.webp",
  },
  {
    city: "Dubai",
    region: "MEA Hub",
    address: "Jumeirah Lake Towers, Cluster F",
    image: "/images/offices/dubai.webp",
  },
];

export default function OfficesGrid() {
  return (
    <section className="mt-20">
      <div className="mb-10">
        <p className="text-xs font-bold text-accent-blue uppercase tracking-widest mb-3">
          Offices
        </p>
        <h2 className="text-3xl font-bold text-text-primary">Where our operators sit.</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {offices.map((office) => (
          <div
            key={office.city}
            className="glass rounded-2xl overflow-hidden group hover:border-accent/20 transition-colors"
          >
            <div className="relative h-36 overflow-hidden">
              <Image
                src={office.image}
                alt={`${office.city} office`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-1/70 to-transparent" />
            </div>

            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-bold text-text-primary">{office.city}</p>
                  <p className="text-[10px] font-semibold text-accent-blue uppercase tracking-widest mb-1">
                    {office.region}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed">{office.address}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
