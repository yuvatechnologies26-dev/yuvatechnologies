import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useCMS } from "@/hooks/useCMS";

const tabs = ["Content Marketing", "One-Time Services"] as const;
type Tab = (typeof tabs)[number];

export const Pricing = () => {
  const [tab, setTab] = useState<Tab>("Content Marketing");
  const [yearly, setYearly] = useState(false);
  const { data: contentPlans } = useCMS<any>("pricing_plans");
  const { data: oneTime } = useCMS<any>("one_time_services");

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-muted/40">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold mb-4">
            Service Packages
          </span>
          <h2 className="font-display font-extrabold text-foreground text-[clamp(1.8rem,3.5vw,2.6rem)]">
            Our <span className="text-primary">Pricing</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Choose the perfect package for your creative journey.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-5 h-10 rounded-full text-sm font-semibold transition-all border",
                tab === t
                  ? "bg-primary text-primary-foreground border-primary shadow-glow"
                  : "bg-card text-foreground border-border hover:border-primary",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Content Marketing" && (
          <>
            <div className="flex justify-center items-center gap-3 mb-10 text-sm">
              <span className={cn(!yearly && "text-foreground font-semibold")}>Monthly</span>
              <button
                onClick={() => setYearly((v) => !v)}
                className={cn("relative h-6 w-11 rounded-full transition-colors", yearly ? "bg-primary" : "bg-border")}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-background shadow-md transition-transform",
                    yearly ? "translate-x-5" : "translate-x-0.5",
                  )}
                />
              </button>
              <span className={cn(yearly && "text-foreground font-semibold")}>
                Yearly <span className="text-primary">(save 15%)</span>
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {contentPlans.map((p) => (
                <div
                  key={p.id}
                  className={cn(
                    "relative rounded-3xl bg-card border-2 p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift",
                    p.popular ? "border-primary lg:scale-105" : "border-border",
                  )}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold">
                      MOST POPULAR
                    </span>
                  )}
                  <div className="font-display font-bold text-lg text-foreground">{p.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{p.subtitle}</div>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-display font-extrabold text-3xl text-foreground">{p.price}</span>
                    <span className="text-sm text-muted-foreground">{p.period}</span>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {(p.features || []).map((f: string) => (
                      <li key={f} className="flex gap-2 text-sm text-foreground/80">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6 rounded-full"
                    variant={p.popular ? "default" : "outline"}
                    onClick={() => toast.success(`${p.name} selected`)}
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "One-Time Services" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {oneTime.map((s) => (
              <div
                key={s.id}
                className={cn(
                  "relative rounded-2xl bg-card border-2 p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift",
                  s.best_value ? "border-secondary" : "border-border",
                )}
              >
                {s.best_value && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-[10px] font-bold">
                    BEST VALUE
                  </span>
                )}
                <div className="font-display font-bold text-foreground">{s.name}</div>
                <div className="font-display font-extrabold text-2xl text-primary mt-2">{s.price}</div>
                {s.description && <div className="text-xs text-muted-foreground mt-1">{s.description}</div>}
                <Button variant="outline" className="w-full mt-4 rounded-full" onClick={() => toast.success(`${s.name} requested`)}>
                  Request Quote
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
