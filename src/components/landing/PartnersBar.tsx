const partners = [
  "DHL", "FedEx", "Maersk", "UPS", "Hapag-Lloyd", "MSC", "COSCO", "CMA CGM",
  "DB Schenker", "Kuehne+Nagel", "Panalpina", "Agility", "XPO Logistics", "Expeditors",
];

export default function PartnersBar() {
  return (
    <section className="relative border-y border-[#2a2a3e] bg-surface-1 py-8 overflow-hidden">
      <p className="text-center text-xs text-text-muted uppercase tracking-widest mb-6">Trusted Network Partners</p>
      <div className="flex">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
          {[...partners, ...partners].map((p, i) => (
            <span key={i} className="text-text-muted/50 text-sm font-semibold tracking-wide hover:text-accent/70 transition-colors flex-shrink-0">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
