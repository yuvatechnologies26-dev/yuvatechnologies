import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  ["How long does it take to see results?", "Most clients see noticeable growth within 4–8 weeks of consistent strategy execution. Long-term growth compounds over 3–6 months."],
  ["Do I need to be on YouTube to work with you?", "No! We work across Instagram, YouTube, and other platforms. We tailor our services to wherever your audience is."],
  ["What makes Yuva Technologies different?", "We combine data analytics with creative content strategy. We don't just post — we optimize every piece of content for maximum reach and engagement."],
  ["Can I upgrade my plan later?", "Absolutely. Our plans are flexible. You can upgrade, downgrade, or add services at any time based on your growth needs."],
  ["Is there a contract or commitment?", "We offer monthly plans with no long-term contracts required. We believe in earning your trust month after month."],
  ["How do I get started?", "Simply book a free consultation call or fill out our application form. We'll get back to you within 24 hours with a personalized growth plan."],
  ["What platforms do you manage?", "We primarily manage YouTube and Instagram, but also work with TikTok, LinkedIn, and other platforms based on your needs."],
  ["Do you offer refunds?", "We offer a satisfaction guarantee on our strategy work. If you're not satisfied after the first month, we'll work with you to make it right."],
] as const;

export const FAQ = () => {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-foreground text-[clamp(1.8rem,3.5vw,2.6rem)]">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know before working with us.
          </p>
        </div>

        <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-3">
          {faqs.map(([q, a], i) => (
            <AccordionItem
              key={q}
              value={`item-${i}`}
              className="rounded-2xl border border-border bg-card px-5 shadow-card"
            >
              <AccordionTrigger className="font-display font-semibold text-left text-foreground hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
