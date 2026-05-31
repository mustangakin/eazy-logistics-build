"use client";
import { useState } from "react";
import { Menu, Package } from "lucide-react";
import Link from "next/link";
import AdminSidebar from "./AdminSidebar";

type User = { name?: string | null; email?: string | null };

export default function AdminShell({ user, children }: { user: User; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <AdminSidebar user={user} isOpen={open} onClose={() => setOpen(false)} />

      <main className="flex-1 lg:ml-64 overflow-auto min-h-screen">
        <div className="lg:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-surface-1 border-b border-[#2a2a3e]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
              <Package className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-text-primary text-sm">Eazy Logistics</span>
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="p-2 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 sm:p-8">{children}</div>
      </main>
    </>
  );
}
