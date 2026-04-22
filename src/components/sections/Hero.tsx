import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const stats = [
  { value: "50+", label: "YouTube Managed" },
  { value: "10M+", label: "Insta Growth" },
  { value: "100+", label: "Happy Creators" },
  { value: "3x", label: "Avg. Growth" },
];

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-16 flex items-center bg-gradient-hero overflow-hidden"
    >
      {/* Color blobs */}
      <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-primary/30 blur-[120px] animate-blob-drift" />
      <div className="absolute -bottom-32 -right-24 h-[460px] w-[460px] rounded-full bg-secondary/30 blur-[120px] animate-blob-drift" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto container-px relative z-10">
        <div className="flex flex-col items-center text-center gap-7 max-w-4xl mx-auto animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-4 py-1.5 text-xs font-medium text-foreground shadow-soft">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Content Growth & Social Media Management Studio
          </span>

          {/* Logo badge */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold via-secondary to-primary blur-md opacity-70" />
            <div className="relative grid h-[140px] w-[140px] place-items-center rounded-full bg-navy ring-4 ring-gold/60 shadow-lift">
              <div className="text-center leading-tight">
                <div className="font-display font-extrabold text-3xl text-navy-foreground">YT</div>
                <div className="text-[9px] tracking-[0.2em] text-navy-foreground/80 mt-1">YUVA TECHNOLOGIES</div>
              </div>
            </div>
          </div>

          <h1 className="font-display font-extrabold text-foreground leading-[1.05] text-[clamp(2.25rem,6vw,4rem)]">
            Focus On Creating.
            <br />
            <span className="text-gradient">We Handle The Growth.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl">
            Yuva Technologies manages editing, posting and optimization.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="rounded-full h-12 px-7 text-base shadow-glow"
              onClick={() => toast.success("Booking your free consultation...")}
            >
              <Calendar className="h-4 w-4" />
              Book Free Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-12 px-7 text-base bg-background"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 mt-8 w-full max-w-2xl">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-extrabold text-2xl text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Carousel dots */}
          <div className="flex items-center gap-2 mt-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={
                  i === 2
                    ? "h-2 w-6 rounded-full bg-primary"
                    : "h-2 w-2 rounded-full bg-foreground/20"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
