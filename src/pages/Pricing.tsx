import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { Pricing as PricingSection } from "@/components/sections/Pricing";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <PricingSection />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default PricingPage;
