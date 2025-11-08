import Navigation from "@/components/Navigation";
import PriceSimulatorBanner from "@/components/PriceSimulatorBanner";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedClinics from "@/components/FeaturedClinics";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PriceSimulatorBanner />
      <Hero />
      <Features />
      <FeaturedClinics />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
