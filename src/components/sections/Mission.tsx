export const Mission = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-soft">
      <div className="container mx-auto container-px text-center max-w-3xl">
        <div className="text-xs font-semibold tracking-[0.25em] text-primary uppercase mb-4">
          Our Mission
        </div>
        <h2 className="font-display font-extrabold text-foreground leading-[1.1] text-[clamp(1.8rem,4vw,2.75rem)]">
          We don't just manage content.
          <br />
          <span className="text-gradient">We build creators.</span>
        </h2>
        <p className="mt-6 text-muted-foreground text-lg">
          Strategy, consistency, and optimized execution — everything your channel needs to grow,
          without the burnout.
        </p>
      </div>
    </section>
  );
};
