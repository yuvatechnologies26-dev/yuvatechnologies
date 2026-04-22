import { useCMS } from "@/hooks/useCMS";

const fallback = [
  { title: "The Currency India Official", category: "Finance YouTube", description: "Grew channel from 8 to 4.17K subscribers in 3 months.", result: "8 → 4,170 subscribers", icon: "💰", color_gradient: "from-emerald-400 to-teal-600" },
];

export const Portfolio = () => {
  const { data } = useCMS<any>("portfolio_items");
  const items = data.length ? data : fallback;

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold mb-4">
            Our Work
          </span>
          <h2 className="font-display font-extrabold text-foreground text-[clamp(1.8rem,3.5vw,2.6rem)]">
            Success <span className="text-primary">Stories</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real results for real creators. Here's what we've built together.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any, i: number) => (
            <div
              key={item.id ?? item.title}
              className="reveal group rounded-3xl overflow-hidden border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className={`h-32 bg-gradient-to-br ${item.color_gradient} grid place-items-center text-5xl transition-transform duration-500 group-hover:scale-105`}>
                {item.icon}
              </div>
              <div className="p-6">
                <span className="inline-block rounded-full bg-primary/10 text-primary px-3 py-0.5 text-[11px] font-semibold mb-3">
                  {item.category}
                </span>
                <h3 className="font-display font-bold text-foreground text-lg leading-snug">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-1 text-xs font-semibold">
                  📈 {item.result}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
