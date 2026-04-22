import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

/**
 * Cross-fades children whenever the route pathname changes.
 */
export const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState<"in" | "out">("in");

  useEffect(() => {
    setStage("out");
    const t = window.setTimeout(() => {
      setDisplayChildren(children);
      setStage("in");
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, 180);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Keep latest children when same pathname re-renders
  useEffect(() => {
    if (stage === "in") setDisplayChildren(children);
  }, [children, stage]);

  return (
    <div
      className={
        "transition-all duration-300 ease-out " +
        (stage === "in"
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none")
      }
    >
      {displayChildren}
    </div>
  );
};
