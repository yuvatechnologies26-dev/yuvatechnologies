import { Navigate, NavLink, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, Home, Layers, CreditCard, Zap, BarChart3,
  ListChecks, Users, MessageSquare, HelpCircle, Star, LogOut, Loader2, ExternalLink,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/hero", label: "Hero Section", icon: Home },
  { to: "/admin/services", label: "Services", icon: Layers },
  { to: "/admin/pricing", label: "Pricing Plans", icon: CreditCard },
  { to: "/admin/one-time", label: "One-Time Services", icon: Zap },
  { to: "/admin/stats", label: "Impact Stats", icon: BarChart3 },
  { to: "/admin/process", label: "Process Steps", icon: ListChecks },
  { to: "/admin/team", label: "Team", icon: Users },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { to: "/admin/creators", label: "Trusted Creators", icon: Star },
];

const stats = [
  ["Hero Section", "Configured", ""],
  ["Services", "18", "Service offerings"],
  ["Pricing Plans", "6", "Monthly/yearly plans"],
  ["One-Time Services", "14", "Quick setup solutions"],
  ["Impact Stats", "4", "Impact metrics"],
  ["Process Steps", "4", "How it works"],
  ["Team Members", "8", "Your team"],
  ["Testimonials", "9", "0 pending"],
  ["FAQs", "8", "Questions & answers"],
] as const;

const AdminDashboard = () => {
  const { session, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-muted">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) return <Navigate to="/admin" replace />;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
  };

  const activeLabel = navItems.find((n) => n.to === location.pathname)?.label ?? "Dashboard";

  return (
    <div className="min-h-screen flex bg-muted/40">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[220px] shrink-0 bg-navy text-navy-foreground">
        <div className="p-5 border-b border-white/10">
          <Logo size={36} />
          <div className="mt-3 font-display font-bold text-sm">Yuva Technologies</div>
          <div className="text-xs text-navy-foreground/60">Admin Panel</div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all border-l-2 ${
                  isActive
                    ? "bg-primary/15 text-primary border-primary font-semibold"
                    : "text-navy-foreground/75 border-transparent hover:bg-white/5 hover:text-navy-foreground"
                }`
              }
            >
              <Icon className="h-4 w-4" /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="text-xs text-navy-foreground/60 truncate">{user?.email}</div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="w-full bg-transparent border-white/20 text-navy-foreground hover:bg-white/10 hover:text-navy-foreground"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Admin</div>
            <h1 className="font-display font-bold text-xl text-foreground">{activeLabel}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Back to Website</span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="md:hidden">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map(([title, value, sub]) => (
              <div key={title} className="rounded-2xl bg-card border border-border p-5 shadow-card">
                <div className="text-xs text-muted-foreground">{title}</div>
                <div className="font-display font-extrabold text-2xl text-foreground mt-1">{value}</div>
                {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
                <button className="mt-4 text-xs font-semibold text-primary hover:underline">
                  Manage →
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-card border border-border p-6 shadow-card">
            <h2 className="font-display font-bold text-foreground">Welcome back 👋</h2>
            <p className="text-sm text-muted-foreground mt-1">
              The dashboard shell is ready. CRUD management for each section can be wired up next —
              just say the word and we'll move services, pricing, team, testimonials and FAQs into
              Cloud tables with full edit/remove flows.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
