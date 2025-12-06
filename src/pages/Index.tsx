import Navigation from "@/components/Navigation";
import PriceSimulatorBanner from "@/components/PriceSimulatorBanner";
import Hero from "@/components/Hero";
import TrustBanner from "@/components/TrustBanner";
import Features from "@/components/Features";
import ContentHighlight from "@/components/ContentHighlight";
import FeaturedClinics from "@/components/FeaturedClinics";
import HowItWorks from "@/components/HowItWorks";
import SimulatorsSection from "@/components/SimulatorsSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { useOrganizationSchema } from "@/hooks/useOrganizationSchema";

const Index = () => {
  useSEO({
    title: "FertilEurope - Votre parcours FIV en Europe simplifié",
    description: "Comparez les meilleures cliniques FIV européennes. Diagnostic personnalisé gratuit en 5 minutes. Accompagnement humain à chaque étape de votre parcours PMA.",
    type: "website",
  });
  
  useOrganizationSchema();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PriceSimulatorBanner />
      <Hero />
      <TrustBanner />
      <Features />
      <ContentHighlight />
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
