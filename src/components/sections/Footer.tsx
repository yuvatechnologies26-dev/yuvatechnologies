import { Youtube, Instagram, Mail, Lock } from "lucide-react";

const services = ["Content Strategy", "YouTube Management", "Instagram Management", "Video Editing", "Analytics & Tracking"];
const links = [
  ["Services", "#services"],
  ["How It Works", "#services"],
  ["Why Choose Us", "#testimonials"],
  ["Who We Work With", "#team"],
  ["Contact", "#contact"],
];

export const Footer = () => {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container mx-auto container-px py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="font-display font-extrabold text-2xl">
            Yuva <span className="text-primary">Technologies</span>
          </div>
          <p className="mt-4 text-sm text-navy-foreground/70 max-w-xs">
            Strategy, editing, and optimization that helps creators grow without burning out.
          </p>
          <div className="mt-5 space-y-2 text-sm text-navy-foreground/80">
            <div>📱 +91 9483886270</div>
            <div>✉️ rrcreatorlab@gmail.com</div>
            <div>📸 @rrcreatorlab</div>
          </div>
          <div className="mt-5 flex gap-3">
            {[Youtube, Instagram, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-navy-foreground hover:bg-primary transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-display font-bold mb-4">Services</div>
          <ul className="space-y-2 text-sm text-navy-foreground/75">
            {services.map((s) => (
              <li key={s}>
                <a href="#services" className="hover:text-primary transition">{s}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display font-bold mb-4">Quick Links</div>
          <ul className="space-y-2 text-sm text-navy-foreground/75">
            {links.map(([label, href]) => (
              <li key={label}>
                <a href={href} className="hover:text-primary transition">{label}</a>
              </li>
            ))}
            <li>
              <a href="/admin" className="inline-flex items-center gap-2 text-primary font-semibold">
                <Lock className="h-3.5 w-3.5" /> Admin Panel
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto container-px py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-navy-foreground/60">
          <div>© 2024 Yuva Technologies. All rights reserved.</div>
          <div>Disclaimer: Results vary based on niche, consistency, and audience engagement.</div>
        </div>
      </div>
    </footer>
  );
};
