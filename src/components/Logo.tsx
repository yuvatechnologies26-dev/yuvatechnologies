import { cn } from "@/lib/utils";
import logoSrc from "@/assets/yuva-logo.png";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  variant?: "default" | "dark";
}

export const Logo = ({ size = 40, showText = false, className, variant = "default" }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src={logoSrc}
        alt="Yuva Technologies logo"
        width={size}
        height={size}
        loading="eager"
        decoding="async"
        className="rounded-xl object-contain shadow-soft bg-navy"
        style={{ width: size, height: size }}
      />
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
