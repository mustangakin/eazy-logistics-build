"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Package, Plus, Map, LogOut, LayoutDashboard, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/shipments", label: "Shipments", icon: LayoutDashboard },
  { href: "/admin/shipments/new", label: "New Shipment", icon: Plus },
  { href: "/admin/map", label: "Fleet Map", icon: Map },
];

type Props = {
  user: { name?: string | null; email?: string | null };
  isOpen?: boolean;
  onClose?: () => void;
};

export default function AdminSidebar({ user, isOpen = false, onClose }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full w-64 bg-surface-1 border-r border-[#2a2a3e] flex flex-col z-40 transition-transform duration-300",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-6 border-b border-[#2a2a3e] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-text-primary text-sm">Eazy Logistics</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
              pathname === href || (href !== "/admin/shipments" && pathname.startsWith(href))
                ? "bg-accent/10 text-accent"
                : "text-text-muted hover:text-text-primary hover:bg-surface-2"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[#2a2a3e]">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent text-xs font-bold">
            {(user.name || user.email || "A")[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-text-primary truncate">{user.name || "Admin"}</p>
            <p className="text-xs text-text-muted truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-text-muted hover:text-red-400 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
