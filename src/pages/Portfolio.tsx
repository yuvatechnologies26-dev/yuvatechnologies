import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { Portfolio as PortfolioSection } from "@/components/sections/Portfolio";

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <PortfolioSection />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default PortfolioPage;
