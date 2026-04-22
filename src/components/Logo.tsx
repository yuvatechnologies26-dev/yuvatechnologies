import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  variant?: "default" | "dark";
}

export const Logo = ({ size = 40, showText = false, className, variant = "default" }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="relative grid place-items-center rounded-full bg-gradient-brand shadow-glow"
        style={{ width: size, height: size }}
        aria-label="Yuva Technologies logo"
      >
        <span
          className="font-display font-extrabold text-primary-foreground leading-none"
          style={{ fontSize: size * 0.38 }}
        >
          YT
        </span>
      </div>
      {showText && (
        <span
          className={cn(
            "font-display font-extrabold tracking-tight",
            variant === "dark" ? "text-navy-foreground" : "text-foreground",
          )}
        >
          Yuva <span className="text-primary">Technologies</span>
        </span>
      )}
    </div>
  );
};
