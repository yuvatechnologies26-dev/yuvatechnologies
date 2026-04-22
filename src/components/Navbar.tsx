import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, Lock, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Success Stories", href: "/#testimonials" },
  { label: "Portfolio", href: "/#team" },
  { label: "Blog", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
  { label: "Let's Connect", href: "/#contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border shadow-soft"
            : "bg-background/40 backdrop-blur-sm",
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between container-px">
          <a href="#home" className="flex items-center gap-3">
            <Logo size={38} />
            <span className="font-display font-extrabold text-foreground hidden sm:inline">
              Yuva <span className="text-primary">Technologies</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              className="group relative grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80 backdrop-blur text-foreground shadow-soft hover:shadow-glow hover:border-primary/40 hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="group relative grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80 backdrop-blur text-foreground shadow-soft hover:shadow-glow hover:border-primary/40 hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Open menu"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-[55] bg-foreground/30 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        aria-hidden="true"
      />

      {/* Side drawer (left, ~half width on mobile, narrower on desktop) */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-[60] h-[100dvh] w-[78%] max-w-[360px] sm:max-w-[400px] bg-background border-r border-border shadow-lift flex flex-col transition-transform duration-400 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div className="h-1 w-full bg-gradient-brand shrink-0" />

        <div className="flex h-16 items-center justify-between px-5 border-b border-border/60 shrink-0">
          <a href="#home" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
            <Logo size={34} />
            <span className="font-display font-extrabold text-foreground text-sm">
              Yuva <span className="text-primary">Technologies</span>
            </span>
          </a>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDark((d) => !d)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background hover:bg-muted transition"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 pt-4 pb-6 flex flex-col">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "group flex items-center justify-between py-3.5 border-b border-border/50 text-foreground hover:text-primary transition-colors",
                open && "animate-fade-in",
              )}
              style={{ animationDelay: open ? `${i * 40}ms` : undefined }}
            >
              <span className="text-base font-medium">{l.label}</span>
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          ))}

          <a
            href="/admin"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex items-center gap-2 text-primary font-semibold text-sm"
          >
            <Lock className="h-4 w-4" /> Admin Panel
          </a>

          <Button
            size="lg"
            className="mt-5 w-full rounded-xl h-12 text-base bg-primary hover:bg-primary-dark transition-colors"
            onClick={() => {
              setOpen(false);
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get Started
          </Button>
        </nav>
      </aside>
    </>
  );
};
