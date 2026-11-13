import { Building2, Plus, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { supabase } from "../lib/supabase";
import { useSession } from "../lib/useSession";
import { GRADIENT } from "../lib/constants";

const items = [
  { to: "/listings", label: "Listings", icon: Building2 },
  { to: "/wizard", label: "Add property", icon: Plus },
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const session = useSession();
  const email = session?.user?.email ?? "";
  const initials = email ? email.slice(0, 2).toUpperCase() : "AD";

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" style={{ backgroundColor: "rgba(0,0,0,0.3)" }} onClick={() => setMobileOpen(false)} />
      )}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-60 bg-white border-r border-neutral-100 z-50 flex flex-col transition-transform md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center px-5">
          <Logo />
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"}`}
            >
              <it.icon className="w-4 h-4" />
              {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-neutral-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" style={{ background: GRADIENT }}>{initials}</div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-neutral-900 truncate">{email || "Admin"}</div>
            <div className="text-xs text-neutral-400">Admin</div>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            title="Log out"
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}
