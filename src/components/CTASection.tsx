import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary-hover to-accent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">100% Indépendant - 0% Commission</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Besoin d'aide pour choisir votre clinique ?
          </h2>

          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Recevez des devis personnalisés ou échangez avec une experte PMA par téléphone - 100% gratuit et indépendant
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-large text-lg px-10 py-7 font-bold group"
            >
              <NavLink to="/diagnostic" className="flex items-center gap-2">
                📋 Recevoir mes devis gratuits
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NavLink>
            </Button>

            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent text-lg px-10 py-7 font-bold"
            >
              <a href="tel:+33123456789">
                📞 Appel gratuit avec une experte
              </a>
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-8 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm">Indépendant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">0%</div>
              <div className="text-sm">Commission</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Gratuit</div>
              <div className="text-sm">Devis & appel</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
