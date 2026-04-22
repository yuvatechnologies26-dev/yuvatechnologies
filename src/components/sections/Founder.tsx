import founderPhoto from "@/assets/founder.jpeg";

const values = [
  ["❤️", "Quality over quantity", "Every project is handled with attention to detail."],
  ["🤝", "Client-first approach", "We focus on long-term relationships, not short-term results."],
  ["💡", "Continuous learning & innovation", "We adapt to trends, tools, and platforms."],
] as const;

export const Founder = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-soft">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-secondary/15 text-secondary px-4 py-1.5 text-xs font-semibold mb-4">
            Meet the Founder
          </span>
          <h2 className="font-display font-extrabold text-foreground text-[clamp(1.8rem,3.5vw,2.6rem)]">
            The Vision Behind <span className="text-primary">Yuva Technologies</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <div className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lift">
              <img
                src={founderPhoto}
                alt="Rishabh Alevoor — Founder & CEO of Yuva Technologies"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur px-3 py-1.5 text-xs font-semibold text-foreground shadow-soft">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Founder
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-card border border-border p-5 shadow-card text-center">
              <div className="font-display font-bold text-foreground">Rishabh Alevoor</div>
              <div className="text-primary text-sm mt-1">Founder & CEO, Yuva Technologies</div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="font-display font-bold text-xl text-foreground">Why I Started Yuva Technologies</h3>
              <p className="mt-2 text-muted-foreground">
                I started Yuva Technologies after seeing too many talented creators stuck in burnout —
                editing late nights, second-guessing strategy, and missing growth opportunities. We
                exist so you can stay in your creative zone while we handle everything else.
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-foreground">How We Will Succeed</h3>
              <p className="text-sm text-muted-foreground mt-1">Our success is built on three core values:</p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                {values.map(([icon, title, desc]) => (
                  <div key={title} className="rounded-2xl bg-card border border-border p-4 shadow-card">
                    <div className="text-2xl">{icon}</div>
                    <div className="font-display font-bold text-sm text-foreground mt-2">{title}</div>
                    <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <blockquote className="border-l-4 border-primary pl-5 italic text-foreground/80">
              "With dedication, consistency, and a strong creative mindset, Yuva Technologies aims to
              grow into a trusted digital partner for creators and businesses across India and beyond."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};
