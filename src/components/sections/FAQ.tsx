import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { useCMS } from "@/hooks/useCMS";

export const FAQ = () => {
  const { data } = useCMS<any>("faqs");
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
          {data.map((f, i) => (
            <AccordionItem
              key={f.id}
              value={`item-${i}`}
              className="rounded-2xl border border-border bg-card px-5 shadow-card"
            >
              <AccordionTrigger className="font-display font-semibold text-left text-foreground hover:no-underline">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
