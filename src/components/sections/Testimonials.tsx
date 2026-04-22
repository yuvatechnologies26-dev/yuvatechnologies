import { Star, ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const testimonials = [
  ["RR Creator Lab helped us grow from 8 to 4.17K subscribers! Their strategic approach to content and analytics-driven optimization made all the difference.", "The Currency India Official", "Finance YouTuber", "TC"],
  ["Our channel grew from 28 to 473 subscribers with their expert guidance. The team understands educational content perfectly and delivers quality edits.", "Sambodhi Mechanical Engineering Coaching", "Educational Creator", "SM"],
  ["Amazing creative team! They enhanced our art content beautifully and helped us reach a wider audience. Highly professional and timely delivery.", "Shilpa Art House", "Art & Craft Creator", "SA"],
  ["The team at Yuva Technologies understands the startup ecosystem perfectly. Our content quality and engagement improved dramatically after partnering with them.", "Startup Stories", "Business Content Creator", "SS"],
  ["Outstanding editing and creative direction! They brought our vision to life with professional quality that rivals top production houses.", "V Filmy Steps", "Entertainment YouTuber", "VF"],
  ["Excellent service for our property showcase videos. The editing quality and turnaround time exceeded our expectations. Great team to work with!", "Homzyee Property Management", "Real Estate Creator", "HP"],
  ["Yuva Technologies transformed my channel completely! My subscriber count doubled in just 3 months. Their editing quality and strategy are top-notch.", "Rahul Sharma", "Tech YouTuber", "RS"],
  ["Amazing thumbnails and video edits! My click-through rate improved significantly. The team is responsive and delivers quality work on time.", "Sneha Reddy", "Food Blogger", "SR"],
] as const;

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-10 reveal">
          <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold mb-4">
            Client Reviews
          </span>
          <h2 className="font-display font-extrabold text-foreground text-[clamp(1.8rem,3.5vw,2.6rem)]">
            What Our <span className="text-primary">Creators Say</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join hundreds of satisfied creators who have grown their channels with us.
          </p>
          <Button
            className="mt-6 rounded-full px-6 h-11 shadow-glow hover:scale-105 active:scale-95 transition-transform"
            onClick={() => toast.success("We'd love to hear your story!")}
          >
            <MessageCircle className="h-4 w-4" /> Share Your Experience
          </Button>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {testimonials.map(([quote, name, role, initials], i) => (
            <div
              key={name}
              className="reveal mb-5 break-inside-avoid rounded-2xl border border-border bg-muted/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:bg-card"
              style={{ transitionDelay: `${(i % 4) * 80}ms` }}
            >
              <p className="italic text-foreground/80 leading-relaxed">"{quote}"</p>
              <div className="flex items-center gap-1 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-brand font-display font-bold text-primary-foreground text-sm">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-sm text-foreground truncate">{name}</div>
                    <div className="text-xs text-muted-foreground truncate">{role}</div>
                  </div>
                </div>
                <button className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline shrink-0">
                  Visit <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
