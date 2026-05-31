"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "/track", label: "Track" },
  { href: "#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-surface-0/90 backdrop-blur-xl border-b border-[#2a2a3e]" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-text-primary">Eazy Logistics</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/signin"
            className="text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-warm text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Get a Quote <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-text-muted hover:text-text-primary transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-surface-1 border-b border-[#2a2a3e] px-4 py-4 space-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-text-muted hover:text-text-primary py-2 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="block mt-3 bg-accent text-white text-sm font-semibold px-4 py-2.5 rounded-xl text-center"
            onClick={() => setOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
