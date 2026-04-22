import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const FloatingActions = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <button
        onClick={() => toast("Chat with us on WhatsApp: +91 9483886270")}
        className="grid h-12 w-12 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow transition-transform hover:scale-110"
        aria-label="Chat"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition-all hover:scale-110",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};
