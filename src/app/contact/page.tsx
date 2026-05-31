import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import DirectLines from "@/components/contact/DirectLines";
import OfficesGrid from "@/components/contact/OfficesGrid";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Eazy Logistics team for sales, freight support, partnerships, or press. Real people reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-surface-0 pt-16">
        <div className="grid-pattern absolute inset-0 opacity-20 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-10">
            <Link href="/" className="hover:text-text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary">Contact</span>
          </nav>

          {/* Hero header */}
          <div className="mb-14">
            <p className="text-xs font-bold text-accent-blue uppercase tracking-widest mb-4">
              Contact
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold text-text-primary leading-tight mb-4">
              Drop us a line.{" "}
              <span className="gradient-text">We pick up fast.</span>
            </h1>
            <p className="text-lg text-text-muted max-w-xl leading-relaxed">
              Sales, partnership, or freight support — real people read every message and respond
              within one business day.
            </p>
          </div>

          {/* Two-column: form + direct lines */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            <ContactForm />
            <DirectLines />
          </div>

          {/* Offices */}
          <OfficesGrid />
        </div>
      </main>

      <Footer />
    </>
  );
}
