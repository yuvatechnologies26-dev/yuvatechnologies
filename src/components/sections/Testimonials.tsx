import { useState } from "react";
import { Star, ArrowUpRight, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCMS } from "@/hooks/useCMS";

const initialsOf = (name: string) =>
  name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase() || "??";

export const Testimonials = () => {
  const { data } = useCMS<any>("testimonials", { filter: { column: "approved", value: true } });
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", text: "", stars: 5 });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) {
      toast.error("Please fill in your name and review.");
      return;
    }
    setBusy(true);
    const { error } = await (supabase as any).from("testimonials").insert({
      name: form.name.trim(),
      role: form.role.trim() || "Creator",
      initials: initialsOf(form.name),
      text: form.text.trim(),
      stars: form.stars,
      approved: false,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Thanks! Your review was submitted for approval.");
    setForm({ name: "", role: "", text: "", stars: 5 });
    setOpen(false);
  };

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-10 reveal">
          <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold mb-4">
            Client Reviews
          </span>
          <h2 className="font-display font-extrabold text-foreground text-[clamp(1.8rem,3.5vw,2.6rem)]">
            What Our <span className="text-primary">Creators Say</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join hundreds of satisfied creators who have grown their channels with us.
          </p>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="mt-6 rounded-full px-6 h-11 shadow-glow hover:scale-105 active:scale-95 transition-transform">
                <MessageCircle className="h-4 w-4" /> Share Your Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share your experience</DialogTitle>
                <DialogDescription>
                  Your review will appear after a quick approval check.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={submit} className="space-y-4 mt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="t-name">Your name</Label>
                  <Input id="t-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="t-role">Role / Channel (optional)</Label>
                  <Input id="t-role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Tech YouTuber" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="t-text">Your review</Label>
                  <Textarea id="t-text" rows={4} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Rating</Label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setForm({ ...form, stars: n })}
                        className="p-1"
                        aria-label={`${n} stars`}
                      >
                        <Star className={`h-5 w-5 ${n <= form.stars ? "fill-gold text-gold" : "text-muted-foreground"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <Button type="submit" disabled={busy} className="w-full rounded-full h-11">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Review"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {data.map((t, i) => (
            <div
              key={t.id}
              className="reveal mb-5 break-inside-avoid rounded-2xl border border-border bg-muted/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:bg-card"
              style={{ transitionDelay: `${(i % 4) * 80}ms` }}
            >
              <p className="italic text-foreground/80 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-1 mt-4">
                {Array.from({ length: t.stars || 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-brand font-display font-bold text-primary-foreground text-sm">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-sm text-foreground truncate">{t.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{t.role}</div>
                  </div>
                </div>
                <button className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline shrink-0">
                  Visit <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
