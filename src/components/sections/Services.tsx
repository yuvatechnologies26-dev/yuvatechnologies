import { useCMS } from "@/hooks/useCMS";

export const Services = () => {
  const { data } = useCMS<any>("services");
  return (
    <section id="services" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold mb-4">
            Our Services
          </span>
          <h2 className="font-display font-extrabold text-foreground text-[clamp(1.8rem,3.5vw,2.6rem)]">
            What We <span className="text-primary">Do</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            End-to-end services covering content, growth, software and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((s, i) => (
            <div
              key={s.id}
              className="reveal group flex gap-4 p-5 rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-lift"
              style={{ transitionDelay: `${(i % 6) * 60}ms` }}
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-brand text-2xl shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {s.icon}
              </div>
              <div>
                <div className="font-display font-bold text-foreground">{s.name}</div>
                <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
