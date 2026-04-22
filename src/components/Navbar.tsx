import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, Lock } from "lucide-react";
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

      {/* Overlay menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between container-px">
          <Logo size={38} />
          <button
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="container mx-auto mt-8 flex flex-col gap-2 container-px pb-12">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl sm:text-4xl font-bold text-foreground transition hover:text-primary py-2 animate-fade-in"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/admin"
            className="mt-2 inline-flex items-center gap-2 text-primary font-semibold animate-fade-in"
          >
            <Lock className="h-4 w-4" /> Admin Panel
          </a>
          <Button
            size="lg"
            className="mt-8 self-start rounded-full px-8 h-12 text-base"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Button>
        </nav>
      </div>
    </>
  );
};
