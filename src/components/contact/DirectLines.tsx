import { Mail, Phone, AlertTriangle } from "lucide-react";

const lines = [
  {
    label: "Sales",
    value: "hello@eazylogistics.com",
    icon: Mail,
    href: "mailto:hello@eazylogistics.com",
  },
  {
    label: "Support (Existing Shipments)",
    value: "support@eazylogistics.com",
    icon: Mail,
    href: "mailto:support@eazylogistics.com",
  },
  {
    label: "24/7 Ops Line",
    value: "+1 800 EAZY OPS",
    icon: Phone,
    href: "tel:+18003299677",
  },
  {
    label: "Press Inquiries",
    value: "press@eazylogistics.com",
    icon: Mail,
    href: "mailto:press@eazylogistics.com",
  },
];

export default function DirectLines() {
  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-8">
        <h2 className="text-xl font-bold text-text-primary mb-1">Direct lines</h2>
        <p className="text-text-muted text-sm mb-6">
          Need something faster than a form? Skip straight ahead.
        </p>

        <div className="space-y-4">
          {lines.map((line) => (
            <a
              key={line.label}
              href={line.href}
              className="flex items-start gap-4 p-4 rounded-xl border border-[#2a2a3e] hover:border-accent/30 bg-surface-2/50 hover:bg-surface-2 transition-all group"
            >
              <div className="w-9 h-9 bg-accent-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent-blue/20 transition-colors">
                <line.icon className="w-4 h-4 text-accent-blue" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-0.5">
                  {line.label}
                </p>
                <p className="text-sm font-semibold text-text-primary group-hover:text-accent-blue transition-colors">
                  {line.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Emergency callout */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-accent-blue" />
          <span className="text-[10px] font-bold text-accent-blue uppercase tracking-widest">
            Urgent
          </span>
        </div>
        <p className="text-sm text-text-muted leading-relaxed">
          For active shipment exceptions outside office hours, call the ops line and quote your
          tracking number. Our dispatcher picks up within{" "}
          <span className="text-text-primary font-semibold">90 seconds</span>.
        </p>
      </div>
    </div>
  );
}
