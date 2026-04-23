import { useEffect, useState } from "react";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCMS } from "@/hooks/useCMS";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";

const slideImages = [hero1, hero2, hero3, hero4];

export const Hero = () => {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const [settings, setSettings] = useState({
    hero_headline: "Focus On Creating.",
    hero_accent: "We Handle The Growth.",
    hero_subtitle: "Yuva Technologies manages editing, posting and optimization.",
    hero_cta1: "Book Free Consultation",
    hero_cta2: "Get Started",
  });
  const { data: stats } = useCMS<any>("impact_stats");

  useEffect(() => {
    (supabase as any).from("site_settings").select("*").limit(1).single().then((r: any) => {
      if (r.data) setSettings(r.data);
    });
  }, []);

  const slides = slideImages.map((img, i) => ({
    image: img,
    title: i === slideImages.length - 1 ? settings.hero_headline : ["Turn Content", "Building Creators.", "Strategy That"][i],
    accent: i === slideImages.length - 1 ? settings.hero_accent : ["Into Growth.", "Scaling Reach.", "Drives Results."][i],
    desc: i === slideImages.length - 1 ? settings.hero_subtitle :
      ["Editing, strategy and social media management that scales your brand.",
       "Helping creators and brands grow on YouTube and Instagram through strategy, consistency, and optimized execution.",
       "Data-driven content planning and team collaboration to maximize your social media impact."][i],
  }));

  useEffect(() => {
    slides.forEach((s, i) => {
      const img = new Image();
      img.src = s.image;
      img.onload = () => setLoaded((p) => ({ ...p, [i]: true }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const go = (dir: number) =>
    setActive((a) => (a + dir + slides.length) % slides.length);

  const current = slides[active];
  const isLoaded = loaded[active];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-16 flex items-center overflow-hidden bg-gradient-hero dark:bg-navy"
    >
      {/* Background image carousel */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            {!loaded[i] && <Skeleton className="absolute inset-0 rounded-none" />}
            <img
              src={s.image}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            className={`h-full w-full object-cover opacity-70 dark:opacity-100 ${
              i === active ? "animate-ken-burns" : ""
            }`}
              key={`${i}-${active === i ? "active" : "idle"}`}
            />
          </div>
        ))}
        {/* Light: dark gradient wash for legibility. Dark: navy wash. */}
        <div className="absolute inset-0 bg-navy/55 dark:bg-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/55 to-navy/75 dark:from-navy/40 dark:via-navy/60 dark:to-navy" />
      </div>

      {/* Color blobs */}
      <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[120px] animate-blob-drift pointer-events-none" />
      <div
        className="absolute -bottom-32 -right-24 h-[460px] w-[460px] rounded-full bg-secondary/25 blur-[120px] animate-blob-drift pointer-events-none"
        style={{ animationDelay: "2s" }}
      />

      {/* Carousel arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="container mx-auto container-px relative z-10 py-20">
        <div className="flex flex-col items-center text-center gap-7 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-medium text-white shadow-soft animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Content Growth & Social Media Management Studio
          </span>

          <h1
            key={`title-${active}`}
            className="font-display font-extrabold leading-[1.05] text-[clamp(2.25rem,6vw,4rem)] text-white animate-fade-in drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
          >
            {current.title}
            <br />
            <span className="text-gradient">{current.accent}</span>
          </h1>

          <p
            key={`desc-${active}`}
            className="text-lg text-white/85 max-w-2xl animate-fade-in"
            style={{ animationDelay: "120ms" }}
          >
            {current.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Button
              size="lg"
              className="rounded-full h-12 px-7 text-base shadow-glow hover:scale-[1.03] transition-transform"
              onClick={() => toast.success("Booking your free consultation...")}
            >
              <Calendar className="h-4 w-4" />
              {settings.hero_cta1}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-12 px-7 text-base bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20 hover:text-white"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              {settings.hero_cta2} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 mt-8 w-full max-w-2xl animate-fade-in" style={{ animationDelay: "280ms" }}>
            {stats.map((s: any) => (
              <div key={s.id} className="text-center hover-lift">
                <div className="font-display font-extrabold text-2xl text-white drop-shadow">{s.value}</div>
                <div className="text-xs text-white/75 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Carousel dots */}
          <div className="flex items-center gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {!isLoaded && (
            <div className="text-[11px] text-white/50 mt-2">Loading visuals…</div>
          )}
        </div>
      </div>
    </section>
  );
};
