import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  LayoutDashboard, Home, Layers, CreditCard, Zap, BarChart3,
  ListChecks, Users, MessageSquare, HelpCircle, Star, LogOut, Loader2,
  ArrowLeft, Image as ImageIcon, Plus, Trash2, Save, Check, X, Pencil,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin, useCMS } from "@/hooks/useCMS";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AdminTable, AdminCard, ConfirmDelete } from "@/components/admin/AdminTable";
import { toast } from "sonner";

type Section =
  | "dashboard" | "hero" | "services" | "pricing" | "onetime" | "stats"
  | "process" | "team" | "testimonials" | "portfolio" | "faqs" | "creators";

const navItems: { id: Section; label: string; icon: any }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "hero", label: "Hero Section", icon: Home },
  { id: "services", label: "Services", icon: Layers },
  { id: "pricing", label: "Pricing Plans", icon: CreditCard },
  { id: "onetime", label: "One-Time Services", icon: Zap },
  { id: "stats", label: "Impact Stats", icon: BarChart3 },
  { id: "process", label: "Process Steps", icon: ListChecks },
  { id: "team", label: "Team", icon: Users },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "portfolio", label: "Portfolio", icon: ImageIcon },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "creators", label: "Trusted Creators", icon: Star },
];

const db = supabase as any;

const AdminDashboard = () => {
  const { session, user, loading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const [active, setActive] = useState<Section>("dashboard");

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-muted">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) return <Navigate to="/admin" replace />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center bg-muted px-4">
        <div className="max-w-md text-center rounded-2xl bg-card border border-border p-8 shadow-card">
          <h1 className="font-display font-bold text-xl text-foreground">Not authorized</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Your account doesn't have admin access. Sign up with the access code or contact an existing admin.
          </p>
          <Button asChild variant="outline" className="mt-5"><Link to="/">Back to website</Link></Button>
          <Button variant="ghost" className="mt-2" onClick={() => supabase.auth.signOut()}>Sign out</Button>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
  };

  const activeLabel = navItems.find((n) => n.id === active)?.label ?? "Dashboard";
  const displayName = (user?.user_metadata as any)?.display_name || user?.email?.split("@")[0] || "Admin";
  const initials = displayName.split(" ").map((p: string) => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="min-h-screen flex bg-muted/40">
      <aside className="hidden md:flex flex-col w-[240px] shrink-0 bg-navy text-navy-foreground">
        <Link
          to="/"
          className="mx-3 mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 hover:bg-white/15 text-navy-foreground px-3 py-2 text-xs font-semibold transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Site
        </Link>

        <div className="p-5 border-b border-white/10">
          <Logo size={36} />
          <div className="mt-3 font-display font-bold text-sm">Yuva Technologies</div>
          <div className="text-xs text-primary">Admin Panel</div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all border-l-2 ${
                active === id
                  ? "bg-primary/15 text-primary border-primary font-semibold"
                  : "text-navy-foreground/75 border-transparent hover:bg-white/5 hover:text-navy-foreground"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="text-xs text-navy-foreground/60 truncate">{user?.email}</div>
          <Button variant="outline" size="sm" onClick={handleSignOut}
            className="w-full bg-transparent border-white/20 text-navy-foreground hover:bg-white/10 hover:text-navy-foreground">
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground">Admin / {activeLabel}</div>
            <h1 className="font-display font-bold text-xl text-foreground truncate">{activeLabel}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline ml-1">Back to Site</span></Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="md:hidden">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Mobile section selector */}
        <div className="md:hidden px-4 py-3 bg-background border-b border-border overflow-x-auto">
          <div className="flex gap-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                  active === id ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                <Icon className="h-3 w-3" /> {label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {active === "dashboard" && <DashboardView name={displayName} email={user?.email || ""} initials={initials} onJump={setActive} />}
          {active === "hero" && <HeroManager />}
          {active === "services" && <ServicesManager />}
          {active === "pricing" && <PricingManager />}
          {active === "onetime" && <OneTimeManager />}
          {active === "stats" && <StatsManager />}
          {active === "process" && <ProcessManager />}
          {active === "team" && <TeamManager />}
          {active === "testimonials" && <TestimonialsManager />}
          {active === "portfolio" && <PortfolioManager />}
          {active === "faqs" && <FaqsManager />}
          {active === "creators" && <CreatorsManager />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

/* ---------- DASHBOARD ---------- */
const DashboardView = ({ name, email, initials, onJump }: { name: string; email: string; initials: string; onJump: (s: Section) => void }) => {
  const counts = useAllCounts();
  const cards: { label: string; key: Section; value: number | string }[] = [
    { label: "Services", key: "services", value: counts.services },
    { label: "Pricing Plans", key: "pricing", value: counts.pricing_plans },
    { label: "One-Time Services", key: "onetime", value: counts.one_time_services },
    { label: "Impact Stats", key: "stats", value: counts.impact_stats },
    { label: "Process Steps", key: "process", value: counts.process_steps },
    { label: "Team Members", key: "team", value: counts.team_members },
    { label: "Testimonials", key: "testimonials", value: counts.testimonials },
    { label: "Portfolio Items", key: "portfolio", value: counts.portfolio_items },
    { label: "FAQs", key: "faqs", value: counts.faqs },
    { label: "Trusted Creators", key: "creators", value: counts.trusted_creators },
  ];
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-card border border-border p-5 shadow-card flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-primary-foreground font-display font-bold text-lg">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display font-bold text-foreground truncate">{name}</div>
          <div className="text-xs text-muted-foreground truncate">{email}</div>
        </div>
        <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">Administrator</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.key} className="rounded-2xl bg-card border border-border p-5 shadow-card">
            <div className="text-xs text-muted-foreground">{c.label}</div>
            <div className="font-display font-extrabold text-2xl text-foreground mt-1">{c.value}</div>
            <button onClick={() => onJump(c.key)} className="mt-4 text-xs font-semibold text-primary hover:underline">
              Manage →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const useAllCounts = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});
  useEffect(() => {
    const tables = ["services","pricing_plans","one_time_services","impact_stats","process_steps","team_members","testimonials","portfolio_items","faqs","trusted_creators"];
    Promise.all(tables.map((t) => db.from(t).select("*", { count: "exact", head: true }).then((r: any) => [t, r.count || 0]))).then((res) => {
      setCounts(Object.fromEntries(res));
    });
  }, []);
  return counts;
};

/* ---------- HERO ---------- */
const HeroManager = () => {
  const [s, setS] = useState({ hero_headline: "", hero_accent: "", hero_subtitle: "", hero_cta1: "", hero_cta2: "" });
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.from("site_settings").select("*").limit(1).single().then((r: any) => {
      if (r.data) { setS(r.data); setId(r.data.id); }
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader2 className="h-5 w-5 animate-spin text-primary" />;

  const save = async () => {
    const { error } = await db.from("site_settings").update(s).eq("id", id);
    if (error) toast.error(error.message); else toast.success("Saved!");
  };

  return (
    <AdminCard title="Hero Section">
      <div className="grid gap-4 max-w-lg">
        {[
          ["hero_headline", "Headline"],
          ["hero_accent", "Accent (gradient text)"],
          ["hero_subtitle", "Subtitle"],
          ["hero_cta1", "CTA Button 1"],
          ["hero_cta2", "CTA Button 2"],
        ].map(([k, label]) => (
          <div key={k} className="space-y-1.5">
            <Label>{label}</Label>
            <Input value={(s as any)[k]} onChange={(e) => setS({ ...s, [k]: e.target.value })} />
          </div>
        ))}
        <Button onClick={save} className="rounded-full mt-2"><Save className="h-4 w-4" /> Save Changes</Button>
      </div>
    </AdminCard>
  );
};

/* ---------- Generic CRUD helpers ---------- */
const useCrud = (table: string) => {
  const { data, loading } = useCMS<any>(table as any);
  const remove = async (id: string) => {
    const { error } = await db.from(table).delete().eq("id", id);
    if (error) toast.error(error.message); else toast.success("Removed");
  };
  const update = async (id: string, patch: any) => {
    const { error } = await db.from(table).update(patch).eq("id", id);
    if (error) toast.error(error.message); else toast.success("Updated");
  };
  const insert = async (row: any) => {
    const { error } = await db.from(table).insert({ ...row, sort_order: data.length + 1 });
    if (error) toast.error(error.message); else toast.success("Added");
  };
  return { rows: data, loading, remove, update, insert };
};

const RowActions = ({ onEdit, onRemove }: { onEdit?: () => void; onRemove: () => void }) => {
  const [confirm, setConfirm] = useState(false);
  if (confirm) return <ConfirmDelete onConfirm={() => { onRemove(); setConfirm(false); }} onCancel={() => setConfirm(false)} />;
  return (
    <div className="flex gap-1.5">
      {onEdit && <Button size="sm" variant="outline" onClick={onEdit} className="h-7 px-2 text-xs"><Pencil className="h-3 w-3" /></Button>}
      <Button size="sm" variant="outline" onClick={() => setConfirm(true)} className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10"><Trash2 className="h-3 w-3" /></Button>
    </div>
  );
};

/* ---------- SERVICES ---------- */
const ServicesManager = () => {
  const { rows, remove, insert } = useCrud("services");
  const [form, setForm] = useState({ icon: "", name: "", description: "" });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.icon || !form.name) return;
    await insert(form);
    setForm({ icon: "", name: "", description: "" });
  };
  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminTable headers={["Icon", "Name", "Description", ""]}>
          {rows.map((r: any) => (
            <tr key={r.id} className="hover:bg-muted/40">
              <td className="px-4 py-2 text-2xl">{r.icon}</td>
              <td className="px-4 py-2 font-semibold text-foreground">{r.name}</td>
              <td className="px-4 py-2 text-muted-foreground max-w-md truncate">{r.description}</td>
              <td className="px-4 py-2 text-right"><RowActions onRemove={() => remove(r.id)} /></td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
      <AdminCard title="Add new service">
        <form onSubmit={submit} className="grid sm:grid-cols-[80px_1fr_1fr_auto] gap-3 items-end">
          <div><Label>Icon</Label><Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="📱" /></div>
          <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <Button type="submit" className="rounded-full"><Plus className="h-4 w-4" /> Add</Button>
        </form>
      </AdminCard>
    </div>
  );
};

/* ---------- PRICING ---------- */
const PricingManager = () => {
  const { rows, remove, insert, update } = useCrud("pricing_plans");
  const [form, setForm] = useState({ name: "", subtitle: "", price: "", period: "/month", popular: false, features: "" });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await insert({ ...form, features: form.features.split(",").map((f) => f.trim()).filter(Boolean) });
    setForm({ name: "", subtitle: "", price: "", period: "/month", popular: false, features: "" });
  };
  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminTable headers={["Name", "Subtitle", "Price", "Period", "Popular", ""]}>
          {rows.map((r: any) => (
            <tr key={r.id} className="hover:bg-muted/40">
              <td className="px-4 py-2 font-semibold">{r.name}</td>
              <td className="px-4 py-2 text-muted-foreground">{r.subtitle}</td>
              <td className="px-4 py-2 text-primary font-semibold">{r.price}</td>
              <td className="px-4 py-2">{r.period}</td>
              <td className="px-4 py-2"><Switch checked={r.popular} onCheckedChange={(v) => update(r.id, { popular: v })} /></td>
              <td className="px-4 py-2 text-right"><RowActions onRemove={() => remove(r.id)} /></td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
      <AdminCard title="Add plan">
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
          <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><Label>Subtitle</Label><Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></div>
          <div><Label>Price</Label><Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></div>
          <div><Label>Period</Label><Input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} /></div>
          <div className="flex items-center gap-2"><Switch checked={form.popular} onCheckedChange={(v) => setForm({ ...form, popular: v })} /><Label>Most Popular</Label></div>
          <div className="sm:col-span-2"><Label>Features (comma-separated)</Label><Textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={2} /></div>
          <Button type="submit" className="rounded-full"><Plus className="h-4 w-4" /> Add Plan</Button>
        </form>
      </AdminCard>
    </div>
  );
};

/* ---------- ONE-TIME ---------- */
const OneTimeManager = () => {
  const { rows, remove, insert, update } = useCrud("one_time_services");
  const [form, setForm] = useState({ name: "", price: "", description: "", best_value: false });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await insert(form);
    setForm({ name: "", price: "", description: "", best_value: false });
  };
  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminTable headers={["Name", "Price", "Best", "Description", ""]}>
          {rows.map((r: any) => (
            <tr key={r.id} className="hover:bg-muted/40">
              <td className="px-4 py-2 font-semibold">{r.name}</td>
              <td className="px-4 py-2 text-primary font-semibold">{r.price}</td>
              <td className="px-4 py-2"><Switch checked={r.best_value} onCheckedChange={(v) => update(r.id, { best_value: v })} /></td>
              <td className="px-4 py-2 text-muted-foreground max-w-sm truncate">{r.description}</td>
              <td className="px-4 py-2 text-right"><RowActions onRemove={() => remove(r.id)} /></td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
      <AdminCard title="Add service">
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
          <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><Label>Price</Label><Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></div>
          <div className="sm:col-span-2"><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="flex items-center gap-2"><Switch checked={form.best_value} onCheckedChange={(v) => setForm({ ...form, best_value: v })} /><Label>Best Value</Label></div>
          <Button type="submit" className="rounded-full"><Plus className="h-4 w-4" /> Add</Button>
        </form>
      </AdminCard>
    </div>
  );
};

/* ---------- STATS ---------- */
const StatsManager = () => {
  const { rows, remove, insert, update } = useCrud("impact_stats");
  const [form, setForm] = useState({ value: "", label: "" });
  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminTable headers={["Value", "Label", ""]}>
          {rows.map((r: any) => (
            <tr key={r.id}>
              <td className="px-4 py-2"><Input className="h-8" defaultValue={r.value} onBlur={(e) => e.target.value !== r.value && update(r.id, { value: e.target.value })} /></td>
              <td className="px-4 py-2"><Input className="h-8" defaultValue={r.label} onBlur={(e) => e.target.value !== r.label && update(r.id, { label: e.target.value })} /></td>
              <td className="px-4 py-2 text-right"><RowActions onRemove={() => remove(r.id)} /></td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
      <AdminCard title="Add stat">
        <form onSubmit={async (e) => { e.preventDefault(); await insert(form); setForm({ value: "", label: "" }); }} className="grid sm:grid-cols-[1fr_2fr_auto] gap-3 items-end">
          <div><Label>Value</Label><Input value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="50+" required /></div>
          <div><Label>Label</Label><Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required /></div>
          <Button type="submit" className="rounded-full"><Plus className="h-4 w-4" /> Add</Button>
        </form>
      </AdminCard>
    </div>
  );
};

/* ---------- PROCESS STEPS ---------- */
const ProcessManager = () => {
  const { rows, remove, insert } = useCrud("process_steps");
  const [form, setForm] = useState({ icon: "", title: "", description: "" });
  const sorted = [...rows].sort((a: any, b: any) => a.step_num - b.step_num);
  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminTable headers={["#", "Icon", "Title", "Description", ""]}>
          {sorted.map((r: any) => (
            <tr key={r.id}>
              <td className="px-4 py-2 font-bold">{r.step_num}</td>
              <td className="px-4 py-2 text-2xl">{r.icon}</td>
              <td className="px-4 py-2 font-semibold">{r.title}</td>
              <td className="px-4 py-2 text-muted-foreground max-w-sm truncate">{r.description}</td>
              <td className="px-4 py-2 text-right"><RowActions onRemove={() => remove(r.id)} /></td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
      <AdminCard title="Add step">
        <form onSubmit={async (e) => { e.preventDefault(); await db.from("process_steps").insert({ ...form, step_num: rows.length + 1 }); toast.success("Added"); setForm({ icon: "", title: "", description: "" }); }} className="grid sm:grid-cols-[80px_1fr_2fr_auto] gap-3 items-end">
          <div><Label>Icon</Label><Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} required /></div>
          <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
          <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></div>
          <Button type="submit" className="rounded-full"><Plus className="h-4 w-4" /> Add</Button>
        </form>
      </AdminCard>
    </div>
  );
};

/* ---------- TEAM ---------- */
const TeamManager = () => {
  const { rows, remove, insert } = useCrud("team_members");
  const [form, setForm] = useState({ name: "", role: "", initials: "" });
  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminTable headers={["Avatar", "Name", "Role", ""]}>
          {rows.map((r: any) => (
            <tr key={r.id}>
              <td className="px-4 py-2"><div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-primary-foreground text-xs font-bold">{r.initials}</div></td>
              <td className="px-4 py-2 font-semibold">{r.name}</td>
              <td className="px-4 py-2 text-muted-foreground">{r.role}</td>
              <td className="px-4 py-2 text-right"><RowActions onRemove={() => remove(r.id)} /></td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
      <AdminCard title="Add team member">
        <form onSubmit={async (e) => {
          e.preventDefault();
          const initials = form.initials || form.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
          await insert({ ...form, initials });
          setForm({ name: "", role: "", initials: "" });
        }} className="grid sm:grid-cols-[1fr_1fr_100px_auto] gap-3 items-end">
          <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><Label>Role</Label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></div>
          <div><Label>Initials</Label><Input value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value.toUpperCase() })} maxLength={3} placeholder="auto" /></div>
          <Button type="submit" className="rounded-full"><Plus className="h-4 w-4" /> Add</Button>
        </form>
      </AdminCard>
    </div>
  );
};

/* ---------- TESTIMONIALS ---------- */
const TestimonialsManager = () => {
  const { rows, remove, insert, update } = useCrud("testimonials");
  const [form, setForm] = useState({ name: "", role: "", initials: "", text: "", stars: 5, approved: true });
  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminTable headers={["Avatar", "Name", "Role", "Stars", "Approved", ""]}>
          {rows.map((r: any) => (
            <tr key={r.id}>
              <td className="px-4 py-2"><div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-primary-foreground text-xs font-bold">{r.initials}</div></td>
              <td className="px-4 py-2 font-semibold">{r.name}</td>
              <td className="px-4 py-2 text-muted-foreground">{r.role}</td>
              <td className="px-4 py-2">{"⭐".repeat(r.stars)}</td>
              <td className="px-4 py-2"><Switch checked={r.approved} onCheckedChange={(v) => update(r.id, { approved: v })} /></td>
              <td className="px-4 py-2 text-right"><RowActions onRemove={() => remove(r.id)} /></td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
      <AdminCard title="Add testimonial">
        <form onSubmit={async (e) => {
          e.preventDefault();
          const initials = form.initials || form.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
          await insert({ ...form, initials });
          setForm({ name: "", role: "", initials: "", text: "", stars: 5, approved: true });
        }} className="grid sm:grid-cols-2 gap-3">
          <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><Label>Role</Label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></div>
          <div><Label>Initials</Label><Input value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value.toUpperCase() })} maxLength={3} /></div>
          <div><Label>Stars (1-5)</Label><Input type="number" min={1} max={5} value={form.stars} onChange={(e) => setForm({ ...form, stars: Number(e.target.value) })} /></div>
          <div className="sm:col-span-2"><Label>Review</Label><Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required rows={3} /></div>
          <div className="flex items-center gap-2"><Switch checked={form.approved} onCheckedChange={(v) => setForm({ ...form, approved: v })} /><Label>Approved</Label></div>
          <Button type="submit" className="rounded-full"><Plus className="h-4 w-4" /> Add</Button>
        </form>
      </AdminCard>
    </div>
  );
};

/* ---------- PORTFOLIO ---------- */
const gradients = [
  "from-emerald-400 to-teal-600","from-blue-400 to-indigo-600","from-pink-400 to-rose-600",
  "from-purple-400 to-violet-600","from-amber-400 to-orange-600","from-cyan-400 to-teal-600",
];
const PortfolioManager = () => {
  const { rows, remove, insert } = useCrud("portfolio_items");
  const [form, setForm] = useState({ title: "", category: "", description: "", result: "", icon: "", color_gradient: gradients[0] });
  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminTable headers={["Icon", "Title", "Category", "Result", ""]}>
          {rows.map((r: any) => (
            <tr key={r.id}>
              <td className="px-4 py-2 text-2xl">{r.icon}</td>
              <td className="px-4 py-2 font-semibold">{r.title}</td>
              <td className="px-4 py-2 text-muted-foreground">{r.category}</td>
              <td className="px-4 py-2 text-emerald-600 font-semibold text-xs">{r.result}</td>
              <td className="px-4 py-2 text-right"><RowActions onRemove={() => remove(r.id)} /></td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
      <AdminCard title="Add portfolio item">
        <form onSubmit={async (e) => { e.preventDefault(); await insert(form); setForm({ title: "", category: "", description: "", result: "", icon: "", color_gradient: gradients[0] }); }} className="grid sm:grid-cols-2 gap-3">
          <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
          <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required /></div>
          <div><Label>Icon</Label><Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="🚀" required /></div>
          <div><Label>Result</Label><Input value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })} placeholder="3x growth" required /></div>
          <div className="sm:col-span-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={2} /></div>
          <div className="sm:col-span-2">
            <Label>Color gradient</Label>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {gradients.map((g) => (
                <button type="button" key={g} onClick={() => setForm({ ...form, color_gradient: g })}
                  className={`h-9 w-16 rounded-lg bg-gradient-to-br ${g} ${form.color_gradient === g ? "ring-2 ring-foreground" : ""}`} />
              ))}
            </div>
          </div>
          <Button type="submit" className="rounded-full"><Plus className="h-4 w-4" /> Add</Button>
        </form>
      </AdminCard>
    </div>
  );
};

/* ---------- FAQS ---------- */
const FaqsManager = () => {
  const { rows, remove, insert } = useCrud("faqs");
  const [form, setForm] = useState({ question: "", answer: "" });
  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminTable headers={["#", "Question", "Answer", ""]}>
          {rows.map((r: any, i: number) => (
            <tr key={r.id}>
              <td className="px-4 py-2 text-muted-foreground">{i + 1}</td>
              <td className="px-4 py-2 font-semibold">{r.question}</td>
              <td className="px-4 py-2 text-muted-foreground max-w-md truncate">{r.answer}</td>
              <td className="px-4 py-2 text-right"><RowActions onRemove={() => remove(r.id)} /></td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
      <AdminCard title="Add FAQ">
        <form onSubmit={async (e) => { e.preventDefault(); await insert(form); setForm({ question: "", answer: "" }); }} className="grid gap-3">
          <div><Label>Question</Label><Input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required /></div>
          <div><Label>Answer</Label><Textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required rows={3} /></div>
          <Button type="submit" className="rounded-full self-start"><Plus className="h-4 w-4" /> Add FAQ</Button>
        </form>
      </AdminCard>
    </div>
  );
};

/* ---------- CREATORS ---------- */
const CreatorsManager = () => {
  const { rows, remove, insert } = useCrud("trusted_creators");
  const [form, setForm] = useState({ name: "", platform: "YouTube", subscribers: "", niche: "" });
  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminTable headers={["Name", "Platform", "Subscribers", "Niche", ""]}>
          {rows.map((r: any) => (
            <tr key={r.id}>
              <td className="px-4 py-2 font-semibold">{r.name}</td>
              <td className="px-4 py-2 text-muted-foreground">{r.platform}</td>
              <td className="px-4 py-2">{r.subscribers}</td>
              <td className="px-4 py-2 text-muted-foreground">{r.niche}</td>
              <td className="px-4 py-2 text-right"><RowActions onRemove={() => remove(r.id)} /></td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
      <AdminCard title="Add creator">
        <form onSubmit={async (e) => { e.preventDefault(); await insert(form); setForm({ name: "", platform: "YouTube", subscribers: "", niche: "" }); }} className="grid sm:grid-cols-4 gap-3 items-end">
          <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><Label>Platform</Label><Input value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} required /></div>
          <div><Label>Subscribers</Label><Input value={form.subscribers} onChange={(e) => setForm({ ...form, subscribers: e.target.value })} required /></div>
          <div><Label>Niche</Label><Input value={form.niche} onChange={(e) => setForm({ ...form, niche: e.target.value })} required /></div>
          <Button type="submit" className="rounded-full sm:col-span-4 sm:w-auto sm:justify-self-start"><Plus className="h-4 w-4" /> Add Creator</Button>
        </form>
      </AdminCard>
    </div>
  );
};
