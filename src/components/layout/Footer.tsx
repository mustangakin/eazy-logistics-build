import Link from "next/link";
import { Package, X, Globe, ExternalLink, Mail } from "lucide-react";

const cols = [
  {
    title: "Services",
    links: [
      { label: "Air Freight", href: "#services" },
      { label: "Ground Freight", href: "#services" },
      { label: "Maritime Freight", href: "#services" },
      { label: "Rail Freight", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Track a Shipment", href: "/track" },
      { label: "Get a Quote", href: "/quote" },
      { label: "Help Center", href: "#faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Admin Portal", href: "/auth/signin" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface-1 border-t border-[#2a2a3e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-text-primary">Eazy Logistics</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Precision delivery and real-time intelligence for global freight operations.
            </p>
            <div className="flex gap-3">
              {[X, Globe, ExternalLink, Mail].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-8 h-8 bg-surface-2 hover:bg-accent/10 hover:text-accent border border-[#2a2a3e] rounded-lg flex items-center justify-center text-text-muted transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-text-muted hover:text-text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#2a2a3e] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">© {new Date().getFullYear()} Eazy Logistics. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((t) => (
              <Link key={t} href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
