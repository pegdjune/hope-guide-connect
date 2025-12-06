import Navigation from "@/components/Navigation";
import PriceSimulatorBanner from "@/components/PriceSimulatorBanner";
import Hero from "@/components/Hero";
import TrustBanner from "@/components/TrustBanner";
import Features from "@/components/Features";
import FeaturedClinics from "@/components/FeaturedClinics";
import HowItWorks from "@/components/HowItWorks";
import SimulatorsSection from "@/components/SimulatorsSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PriceSimulatorBanner />
      <Hero />
      <TrustBanner />
      <Features />
      <FeaturedClinics />
      <HowItWorks />
      <SimulatorsSection />
      <Testimonials />
      <FAQ />
      <CTASection />
      <ChatWidget />
      <Footer />
    </div>
  );
};

export default Index;
