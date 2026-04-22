const services = [
  ["📱", "Content Marketing", "Full-stack social media content strategy and scheduling across platforms."],
  ["🌐", "Hosting Services", "Reliable hosting solutions for your digital presence."],
  ["📊", "Inventory Software Development", "Custom inventory management systems for your business."],
  ["💻", "Website Development", "Modern, responsive websites built for performance and conversions."],
  ["🔍", "SEO Optimisation", "Data-driven SEO to rank higher and attract organic traffic."],
  ["🎥", "UGC Video Creation", "Authentic user-generated style video content for your brand."],
  ["📸", "UGC Photo Creation", "Lifestyle and product photography optimized for social platforms."],
  ["✨", "AI Model Creation", "Realistic AI models for product showcases and brand visuals."],
  ["🤖", "AI Chatbox Integration", "Intelligent chatbots to automate customer engagement 24/7."],
  ["📢", "Digital Marketing", "Comprehensive digital campaigns to grow your online presence."],
  ["🛍️", "Product Marketing", "Strategic product positioning and launch campaigns."],
  ["📅", "Content Marketing (Calendar)", "Consistent content calendars and creation pipelines."],
  ["📧", "Email Marketing", "High-converting email sequences and newsletter campaigns."],
  ["🏦", "Banking Software", "Custom banking software solutions for financial institutions."],
  ["🧾", "Billing Software", "Automated billing and invoicing systems for your business."],
  ["🛒", "E-commerce Software", "Full-featured e-commerce platforms built to scale."],
  ["🗂️", "Account Management Service", "Dedicated account managers to handle your digital presence."],
] as const;

export const Services = () => {
  return (
    <section id="services" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold mb-4">
            Our Services
          </span>
          <h2 className="font-display font-extrabold text-foreground text-[clamp(1.8rem,3.5vw,2.6rem)]">
            What We <span className="text-primary">Do</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Eighteen end-to-end services covering content, growth, software and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(([icon, name, desc], i) => (
            <div
              key={name}
              className="reveal group flex gap-4 p-5 rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-lift"
              style={{ transitionDelay: `${(i % 6) * 60}ms` }}
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-brand text-2xl shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {icon}
              </div>
              <div>
                <div className="font-display font-bold text-foreground">{name}</div>
                <p className="text-sm text-muted-foreground mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
