import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, Lock, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Success Stories", href: "#testimonials" },
  { label: "Portfolio", href: "#team" },
  { label: "Blog", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Let's Connect", href: "#contact" },
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
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-down menu (matches reference) */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-[60] bg-background/98 backdrop-blur-xl border-b border-border shadow-lift transition-all duration-500 ease-out",
          open ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none",
        )}
      >
        <div className="h-1 w-full bg-gradient-brand" />

        <div className="container mx-auto flex h-16 items-center justify-between container-px">
          <a href="#home" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <Logo size={38} />
            <span className="font-display font-extrabold text-foreground">
              Yuva <span className="text-primary">Technologies</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav className="container mx-auto container-px pt-6 pb-8 flex flex-col">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between py-4 border-b border-border/60 text-foreground hover:text-primary transition-colors animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-base sm:text-lg font-medium">{l.label}</span>
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          ))}

          <a
            href="/admin"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center gap-2 text-primary font-semibold animate-fade-in"
            style={{ animationDelay: `${links.length * 50}ms` }}
          >
            <Lock className="h-4 w-4" /> Admin Panel
          </a>

          <Button
            size="lg"
            className="mt-6 w-full rounded-xl h-12 text-base bg-primary hover:bg-primary-dark transition-colors"
            onClick={() => {
              setOpen(false);
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get Started
          </Button>
        </nav>
      </div>
    </>
  );
};
