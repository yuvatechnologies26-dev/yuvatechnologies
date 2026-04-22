import { ChevronDown } from "lucide-react";

const team = [
  ["Rishabh Alevoor", "Founder & CEO", "RA"],
  ["Sanjay", "Head of Production", "SJ"],
  ["Ashik", "Head of Insta Management & Marketing", "AK"],
  ["Devin", "Head of Video Editing", "DV"],
  ["Vasu", "Web Developer", "VA"],
  ["Priyam", "Editor", "PR"],
  ["Shubham", "Editor", "SH"],
  ["Keshav Tiwari", "Editor", "KT"],
] as const;

export const Team = () => {
  return (
    <section id="team" className="py-20 sm:py-28 bg-gradient-soft">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <span className="inline-block rounded-full bg-secondary/15 text-secondary px-4 py-1.5 text-xs font-semibold mb-4">
            Our Team
          </span>
          <h2 className="font-display font-extrabold text-foreground text-[clamp(1.8rem,3.5vw,2.6rem)]">
            Meet the <span className="text-secondary">Creative Minds</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A small, hands-on team obsessed with growing creators and brands.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {team.map(([name, role, initials], i) => (
            <div
              key={name}
              className="reveal rounded-2xl bg-card border border-border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lift"
              style={{ transitionDelay: `${(i % 4) * 70}ms` }}
            >
              <div className="grid h-20 w-20 mx-auto place-items-center rounded-full bg-gradient-brand font-display font-extrabold text-primary-foreground text-xl shadow-glow transition-transform duration-300 hover:scale-110">
                {initials}
              </div>
              <div className="font-display font-bold text-foreground mt-4">{name}</div>
              <div className="text-primary text-xs mt-1">{role}</div>
              <ChevronDown className="h-4 w-4 text-muted-foreground mx-auto mt-3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
