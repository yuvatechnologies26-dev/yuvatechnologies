import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const steps = [
  ["💬", "Client Onboarding", "Fill out our simple form and share your goals. We learn about your content, audience, and vision for growth."],
  ["📊", "Strategy & Analytics Review", "We analyze your channel performance and develop a customized growth strategy tailored to your niche."],
  ["🚀", "Editing + Uploading", "Our team handles professional editing, optimization, and strategic uploading to maximize reach."],
  ["📄", "Weekly / Monthly Growth Report", "Receive detailed performance reports with insights, analytics, and actionable recommendations."],
] as const;

export const HowItWorks = () => {
  return (
    <section className="py-20 sm:py-28 bg-muted/40">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold mb-4">
            Our Process
          </span>
          <h2 className="font-display font-extrabold text-foreground text-[clamp(1.8rem,3.5vw,2.6rem)]">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A simple, proven workflow from your first call to monthly reports.
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-7 top-7 bottom-7 w-px bg-gradient-to-b from-primary via-secondary to-transparent hidden sm:block" />
          <div className="space-y-6">
            {steps.map(([icon, title, desc], i) => (
              <div key={title} className="flex gap-5 items-start">
                <div className="relative shrink-0">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-2xl text-primary-foreground shadow-glow">
                    {icon}
                  </div>
                  <span className="absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-navy text-navy-foreground text-xs font-bold">
                    {i + 1}
                  </span>
                </div>
                <div className="flex-1 rounded-2xl bg-card border border-border p-5 shadow-card">
                  <div className="font-display font-bold text-foreground">{title}</div>
                  <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="rounded-full px-8 h-12 shadow-glow hover:scale-105 active:scale-95 transition-transform"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};
