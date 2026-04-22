import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { Pricing as PricingSection } from "@/components/sections/Pricing";
import { Skeleton } from "@/components/ui/skeleton";

const PricingSkeleton = () => (
  <section className="py-20 sm:py-28 bg-muted/40">
    <div className="container mx-auto container-px">
      <div className="max-w-2xl mx-auto mb-10 space-y-4 text-center">
        <Skeleton className="h-6 w-32 mx-auto rounded-full" />
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-4 w-80 mx-auto" />
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-36 rounded-full" />
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-3xl bg-card border-2 border-border p-7 shadow-card space-y-4"
          >
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-9 w-32" />
            <div className="space-y-2 pt-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-3 w-full" />
              ))}
            </div>
            <Skeleton className="h-11 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PricingPage = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 280);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {ready ? (
          <div className="animate-fade-in">
            <PricingSection />
          </div>
        ) : (
          <PricingSkeleton />
        )}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default PricingPage;
