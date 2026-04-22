import { Calendar, MessageCircle, Mail, Instagram, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSelpy0EMOK1UNj5zR31jYi0WuHGCISzDU8uJ-dw7ba7SJvXig/viewform?usp=sf_link";

export const Contact = () => {
  const channels = [
    [Calendar, "Book a Meeting", "Free Consultation on Topmate"],
    [MessageCircle, "WhatsApp", "+91 9483886270"],
    [Mail, "Email", "yuvatechnologies26@gmail.com"],
    [Instagram, "Instagram", "@yuvatechnologies"],
  ] as const;

  return (
    <section id="contact" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
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
          <div className="reveal rounded-3xl border border-border bg-card p-7 shadow-card flex flex-col card-interactive">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
              <ArrowRight className="h-5 w-5" />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mt-5">Get Started</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Fill out our quick form and we'll get back to you within 24 hours with a
              personalized growth plan.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Tell us about your channel & goals
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Pick the platform you want to grow on
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Get a tailored plan within 24 hours
              </li>
            </ul>

            <div className="mt-auto pt-6">
              <Button
                asChild
                className="w-full rounded-full h-12 shadow-glow hover:scale-[1.02] active:scale-95 transition-transform"
              >
                <a href={FORM_URL} target="_blank" rel="noopener noreferrer">
                  Open Form
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Opens in a new tab
              </p>
            </div>
          </div>

          <div className="reveal rounded-3xl border border-border bg-card p-7 shadow-card">
            <h3 className="font-display font-bold text-xl text-foreground">Reach Out Directly</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Prefer a quick chat? Connect with us through any of these channels.
            </p>
            <div className="mt-6 space-y-4">
              {channels.map(([Icon, title, value]) => {
                const I = Icon as typeof Calendar;
                return (
                  <div
                    key={title}
                    className="flex items-center gap-4 rounded-2xl border border-border p-4 transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:-translate-y-0.5"
                  >
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
