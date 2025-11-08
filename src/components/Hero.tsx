import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import heroImage from "@/assets/hero-fertility.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-background via-primary-light/20 to-accent-light/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Accompagnement personnalisé
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Votre parcours FIV en Europe,{" "}
              <span className="text-primary">simplifié</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Comparez les meilleures cliniques européennes, obtenez un diagnostic personnalisé 
              et bénéficiez d'un accompagnement humain à chaque étape de votre projet.
            </p>

            <div className="space-y-3">
              {[
                "Diagnostic IA personnalisé en 5 minutes",
                "Comparaison transparente de +50 cliniques",
                "Accompagnement humain gratuit"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-large group"
              >
                <NavLink to="/diagnostic" className="flex items-center gap-2">
                  Commencer mon diagnostic
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary/5"
              >
                <NavLink to="/comparateur">
                  Voir les cliniques
                </NavLink>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-large">
              <img 
                src={heroImage} 
                alt="Accompagnement FIV personnalisé" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-large">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Taux de satisfaction</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-card p-6 rounded-2xl shadow-large">
              <div className="text-3xl font-bold text-accent">+50</div>
              <div className="text-sm text-muted-foreground">Cliniques partenaires</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
