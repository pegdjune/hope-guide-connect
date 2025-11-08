import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const PriceSimulatorBanner = () => {
  return (
    <section className="bg-gradient-to-r from-primary via-primary-hover to-accent py-6 px-4 shadow-large">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-primary-foreground">
            <div className="bg-white/20 p-3 rounded-full">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                Obtenez des devis gratuits de cliniques FIV
              </h2>
              <p className="text-primary-foreground/90 text-sm md:text-base">
                Comparez les prix et trouvez la meilleure offre pour votre traitement
              </p>
            </div>
          </div>
          
          <Button 
            asChild 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-xl whitespace-nowrap group flex-shrink-0"
          >
            <NavLink to="/diagnostic" className="flex items-center gap-2">
              Simuler mon devis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PriceSimulatorBanner;
