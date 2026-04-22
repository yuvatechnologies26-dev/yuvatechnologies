import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const tabs = ["Content Marketing", "Additional Packages", "YT Management", "One-Time Services"] as const;
type Tab = (typeof tabs)[number];

const contentPlans = [
  {
    name: "Starter Creator Plan",
    sub: "Best for new & small creators",
    price: "₹2,000 – ₹8,000",
    period: "/month",
    features: [
      "Content strategy & ideas",
      "8–10 reels/shorts editing",
      "1–2 long videos",
      "Uploading & scheduling",
      "Caption + hashtag support",
      "Basic YouTube/Instagram optimization",
      "Weekly update",
    ],
    popular: false,
  },
  {
    name: "Growth Plan",
    sub: "Full content growth strategy",
    price: "₹8,000 – ₹20,000",
    period: "/month",
    features: [
      "Full content growth strategy",
      "12–20 reels/shorts editing",
      "2–4 long videos",
      "YouTube or Instagram management",
      "Monthly performance report",
    ],
    popular: true,
  },
  {
    name: "Premium Management Plan",
    sub: "For serious creators & brands",
    price: "₹25,000 – ₹50,000",
    period: "/month",
    features: [
      "End-to-end account management",
      "20–25 shorts/reels + 4–5 long videos",
      "YouTube + Instagram handled fully",
      "Community building support",
    ],
    popular: false,
  },
];

const ytPlans = [
  {
    name: "YT Complete Teaching",
    price: "₹2,999",
    period: "one-time",
    features: ["2-hour comprehensive webinar", "1-on-1 strategy call (30 mins)", "Lifetime access to recordings"],
    badge: null,
  },
  {
    name: "Toolkit (6 Months)",
    price: "₹2,499",
    period: "for 6 months",
    features: ["Content calendar templates", "Script writing frameworks", "6 months of updates"],
    badge: null,
  },
  {
    name: "Toolkit (Yearly)",
    price: "₹3,999",
    period: "per year",
    features: ["Everything in 6-month plan", "Full year of updates", "Priority support"],
    badge: "BEST VALUE",
  },
];

const oneTime = [
  ["Website Creation", "₹8,000 – ₹12,000", false],
  ["AI Chat Agent", "₹2,000 – ₹3,000", false],
  ["Website + AI Assistant", "₹12,999 – ₹15,999", true],
  ["Creation of Inventory", "₹8,000 – ₹12,000", false],
  ["Inventory Management", "₹2,000 – ₹6,000", false],
  ["SEO", "₹4,000 – ₹6,000", false],
  ["UGC Video Creation", "₹300 – ₹500", false],
  ["UGC Photo Creation", "₹150 – ₹300", false],
  ["AI Model Creation", "₹2,500 – ₹3,500", false],
  ["Product Marketing", "₹4,999 – ₹14,999", true],
  ["Banking Software", "₹80,000 – ₹1,00,000", false],
  ["Billing Software", "₹45,000 – ₹60,000", false],
  ["E-commerce Software", "₹80,000", false],
  ["Account Management Service", "₹6,000 – ₹18,000", false],
] as const;

export const Pricing = () => {
  const [tab, setTab] = useState<Tab>("Content Marketing");
  const [yearly, setYearly] = useState(false);

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

        {/* Tabs */}
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
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  yearly ? "bg-primary" : "bg-border",
                )}
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
                <PricingCard key={p.name} plan={p} />
              ))}
            </div>
          </>
        )}

        {tab === "YT Management" && (
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {ytPlans.map((p) => (
              <div
                key={p.name}
                className={cn(
                  "relative rounded-3xl bg-card border-2 p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift",
                  p.badge ? "border-secondary" : "border-border",
                )}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-bold">
                    {p.badge}
                  </span>
                )}
                <div className="font-display font-bold text-lg text-foreground">{p.name}</div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display font-extrabold text-3xl text-foreground">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </div>
                <ul className="mt-5 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-foreground/80">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-6 rounded-full"
                  variant={p.badge ? "default" : "outline"}
                  onClick={() => toast.success(`${p.name} selected`)}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        )}

        {tab === "Additional Packages" && (
          <div className="text-center text-muted-foreground py-12">
            More custom packages — talk to us at <span className="text-primary font-semibold">rrcreatorlab@gmail.com</span>
          </div>
        )}

        {tab === "One-Time Services" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {oneTime.map(([name, price, best]) => (
              <div
                key={name}
                className={cn(
                  "relative rounded-2xl bg-card border-2 p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift",
                  best ? "border-secondary" : "border-border",
                )}
              >
                {best && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-[10px] font-bold">
                    BEST VALUE
                  </span>
                )}
                <div className="font-display font-bold text-foreground">{name}</div>
                <div className="font-display font-extrabold text-2xl text-primary mt-2">{price}</div>
                <div className="text-xs text-muted-foreground mt-1">one-time setup + no monthly charges</div>
                <Button variant="outline" className="w-full mt-4 rounded-full" onClick={() => toast.success(`${name} requested`)}>
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

const PricingCard = ({ plan }: { plan: typeof contentPlans[number] }) => (
  <div
    className={cn(
      "relative rounded-3xl bg-card border-2 p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift",
      plan.popular ? "border-primary lg:scale-105" : "border-border",
    )}
  >
    {plan.popular && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold">
        MOST POPULAR
      </span>
    )}
    <div className="font-display font-bold text-lg text-foreground">{plan.name}</div>
    <div className="text-sm text-muted-foreground mt-1">{plan.sub}</div>
    <div className="mt-5 flex items-baseline gap-2">
      <span className="font-display font-extrabold text-3xl text-foreground">{plan.price}</span>
      <span className="text-sm text-muted-foreground">{plan.period}</span>
    </div>
    <ul className="mt-5 space-y-2">
      {plan.features.map((f) => (
        <li key={f} className="flex gap-2 text-sm text-foreground/80">
          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {f}
        </li>
      ))}
    </ul>
    <Button
      className="w-full mt-6 rounded-full"
      variant={plan.popular ? "default" : "outline"}
      onClick={() => toast.success(`${plan.name} selected`)}
    >
      Get Started
    </Button>
  </div>
);
