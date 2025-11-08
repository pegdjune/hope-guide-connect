import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const PriceSimulatorBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent py-8 px-4 shadow-large">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-primary-foreground">
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 rounded-2xl blur-lg animate-pulse-slow" />
              <div className="relative bg-white/20 backdrop-blur-sm p-4 rounded-2xl border-2 border-white/30">
                <Calculator className="w-8 h-8" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl md:text-3xl font-bold font-heading">
                  Obtenez des devis gratuits
                </h2>
                <Sparkles className="w-6 h-6 animate-pulse-slow" />
              </div>
              <p className="text-primary-foreground/95 text-base md:text-lg font-medium">
                Comparez les prix de +50 cliniques européennes en 2 minutes
              </p>
            </div>
          </div>
          
          <Button 
            asChild 
            size="lg"
            className="bg-white text-primary hover:bg-white/95 shadow-glow whitespace-nowrap group flex-shrink-0 font-bold text-lg px-8 py-6 hover:scale-105 transition-all"
          >
            <NavLink to="/diagnostic" className="flex items-center gap-3">
              Simuler gratuitement
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PriceSimulatorBanner;
