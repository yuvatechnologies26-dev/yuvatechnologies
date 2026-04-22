import { Calendar, MessageCircle, Mail, Instagram } from "lucide-react";

export const Contact = () => {

  const channels = [
    [Calendar, "Book a Meeting", "Free Consultation on Topmate"],
    [MessageCircle, "WhatsApp", "+91 9483886270"],
    [Mail, "Email", "rrcreatorlab@gmail.com"],
    [Instagram, "Instagram", "@rrcreatorlab"],
  ] as const;

  return (
    <section id="contact" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-secondary/15 text-secondary px-4 py-1.5 text-xs font-semibold mb-4">
            Ready to Grow?
          </span>
          <h2 className="font-display font-extrabold text-foreground text-[clamp(1.8rem,3.5vw,2.6rem)]">
            Let's <span className="text-secondary">Connect</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start a conversation. We respond within a day, every time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="rounded-3xl border border-border bg-card p-3 shadow-card overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <h3 className="font-display font-bold text-xl text-foreground">Get Started</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Fill out our quick form and we'll get back to you within 24 hours with a personalized
                growth plan.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border bg-background">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSelpy0EMOK1UNj5zR31jYi0WuHGCISzDU8uJ-dw7ba7SJvXig/viewform?embedded=true"
                width="100%"
                height="720"
                title="Contact form"
                className="block w-full"
                loading="lazy"
              >
                Loading…
              </iframe>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
            <h3 className="font-display font-bold text-xl text-foreground">Reach Out Directly</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Prefer a quick chat? Connect with us through any of these channels.
            </p>
            <div className="mt-6 space-y-4">
              {channels.map(([Icon, title, value]) => {
                const I = Icon as typeof Calendar;
                return (
                  <div key={title} className="flex items-center gap-4 rounded-2xl border border-border p-4 transition hover:border-primary hover:bg-primary/5">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-brand text-primary-foreground">
                      <I className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground">{title}</div>
                      <div className="text-sm text-muted-foreground truncate">{value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
