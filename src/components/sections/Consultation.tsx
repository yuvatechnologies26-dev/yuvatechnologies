import { Calendar, Clock, Video, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const checks = [
  "30-minute free strategy call",
  "Personalized growth roadmap",
  "Content audit & recommendations",
  "No commitment required",
];

export const Consultation = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-soft">
      <div className="container mx-auto container-px grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold mb-4">
            Free Consultation
          </span>
          <h2 className="font-display font-extrabold text-foreground text-[clamp(1.8rem,3.5vw,2.6rem)]">
            Ready to <span className="text-primary">Level Up?</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Book a free 30-minute strategy call with our founder. We'll review your channel, identify
            growth opportunities, and lay out a tailored roadmap — no strings attached.
          </p>
          <ul className="mt-6 space-y-3">
            {checks.map((c) => (
              <li key={c} className="flex items-center gap-3 text-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" /> {c}
              </li>
            ))}
          </ul>
          <Button
            size="lg"
            className="mt-8 rounded-full px-7 h-12 shadow-glow"
            onClick={() => toast.success("Opening booking calendar...")}
          >
            Book Your Free Call <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-3xl bg-card border border-border p-7 shadow-lift">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-brand font-display font-bold text-primary-foreground">
              RA
            </div>
            <div>
              <div className="font-display font-bold text-foreground">Rishabh Alevoor</div>
              <div className="text-sm text-primary">Founder & CEO</div>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {[
              [Calendar, "Flexible Scheduling", "Pick a time that works for you"],
              [Clock, "30 Minutes", "Focused, actionable session"],
              [Video, "Video Call", "Google Meet or Zoom"],
            ].map(([Icon, title, sub]) => {
              const I = Icon as typeof Calendar;
              return (
                <div key={title as string} className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <I className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{title as string}</div>
                    <div className="text-xs text-muted-foreground">{sub as string}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Available this week
          </div>
          <Button
            className="w-full mt-6 rounded-full h-12 shadow-glow"
            onClick={() => toast.success("Scheduling your call...")}
          >
            Schedule Now <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
