import { useCMS } from "@/hooks/useCMS";

export const TrustedBy = () => {
  const { data } = useCMS<any>("trusted_creators");
  const names = data.length ? data.map((d) => d.name) : ["V Filmy Steps", "Homzyee Property Management", "Rahul Sharma", "Sneha Reddy"];
  const loop = [...names, ...names];

  return (
    <section
      aria-label="Trusted by growing creators"
      className="relative bg-gradient-to-b from-background to-primary/5 py-14 overflow-hidden border-y border-border/40"
    >
      <div className="container container-px mx-auto">
        <p className="text-center text-xs sm:text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase mb-8 animate-fade-in">
          Trusted by Growing Creators
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="group flex w-max animate-marquee hover:[animation-play-state:paused] gap-4">
          {loop.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="shrink-0 rounded-full border border-border bg-card px-7 py-3.5 shadow-soft hover:shadow-lift hover:-translate-y-0.5 hover:border-primary/40 transition-all duration-300"
            >
              <span className="font-display font-semibold text-sm sm:text-base text-foreground whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
