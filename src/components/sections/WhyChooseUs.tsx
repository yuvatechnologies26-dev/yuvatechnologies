const features = [
  ["❤️", "Creator-First Approach", "We understand creators because we think like creators. Your success is our priority."],
  ["📊", "Data-Backed Strategies", "Every decision is informed by analytics and proven growth methodologies."],
  ["✅", "Clean & Consistent Execution", "Reliable, on-time delivery with attention to detail in everything we do."],
  ["💬", "Transparent Communication", "Regular updates and honest feedback. No surprises, just results."],
  ["📈", "Scalable Growth Plans", "Strategies that grow with you, from beginner to established creator."],
] as const;

export const WhyChooseUs = () => {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto container-px grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display font-extrabold text-foreground text-[clamp(1.8rem,3.5vw,2.6rem)] leading-tight">
            Why <span className="text-primary">Yuva Technologies?</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            We focus on organic, optimized growth through smart strategy and consistent execution.
            Our team is dedicated to helping you build a sustainable content presence.
          </p>
          <blockquote className="mt-6 border-l-4 border-primary pl-5 italic text-foreground/80">
            "We don't just manage accounts—we build communities and help creators thrive."
          </blockquote>
        </div>

        <div className="space-y-3">
          {features.map(([icon, title, desc]) => (
            <div
              key={title}
              className="group flex gap-4 p-5 rounded-2xl border border-border bg-card transition-all duration-300 hover:translate-x-1 hover:border-primary hover:shadow-lift"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-xl">
                {icon}
              </div>
              <div>
                <div className="font-display font-bold text-foreground">{title}</div>
                <p className="text-sm text-muted-foreground mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
