import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Heart } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import familyIllustration from "@/assets/family-illustration.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-br from-primary-light via-accent-light/50 to-background">
      {/* Decorative floating elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
      <Heart className="absolute top-32 right-1/4 w-12 h-12 text-primary/30 animate-pulse-slow" />
      <Heart className="absolute bottom-40 left-1/4 w-8 h-8 text-accent/30 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-wrap gap-3">
              <span className="px-5 py-2.5 rounded-full bg-white shadow-medium text-success text-base font-bold border-2 border-success/20">
                🔒 100% Indépendant
              </span>
              <span className="px-5 py-2.5 rounded-full bg-white shadow-medium text-accent text-base font-bold border-2 border-accent/20">
                ✅ 0% Commission
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-foreground leading-tight font-heading">
              Comparez les{" "}
              <span className="text-primary relative inline-block">
                meilleures cliniques FIV
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C60 2, 140 2, 198 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
              {" "}d'Europe
            </h1>
            
            <p className="text-xl text-foreground/80 leading-relaxed font-medium">
              <span className="text-foreground font-bold">Plateforme 100% indépendante.</span> Nous ne recevons aucune commission. 
              Recevez des devis personnalisés et parlez à une experte - gratuitement.
            </p>

            <div className="space-y-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-medium border-2 border-primary/10">
              {[
                "Aucune commission sur les cliniques",
                "Conseils 100% objectifs et personnalisés",
                "Devis détaillés et appel expert gratuit"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="bg-success p-2 rounded-full group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-foreground font-semibold text-lg">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow group text-lg font-bold px-8 py-7 hover:scale-105 transition-all"
              >
                <NavLink to="/diagnostic" className="flex items-center gap-3">
                  📋 Recevoir mes devis gratuits
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </NavLink>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-3 border-accent text-accent hover:bg-accent hover:text-white text-lg font-bold px-8 py-7 hover:scale-105 transition-all"
              >
                <a href="tel:+33123456789">
                  📞 Parler à une experte PMA (gratuit)
                </a>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-large hover:shadow-glow transition-all">
              <img 
                src={familyIllustration} 
                alt="Famille heureuse avec bébé - Accompagnement FIV" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-large hover:shadow-glow transition-all hover:scale-105 border-2 border-primary/10 animate-float">
              <div className="text-4xl font-extrabold text-primary font-heading">95%</div>
              <div className="text-sm font-semibold text-muted-foreground">Taux de satisfaction</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-large hover:shadow-glow transition-all hover:scale-105 border-2 border-accent/10 animate-float-delayed">
              <div className="text-4xl font-extrabold text-accent font-heading">+50</div>
              <div className="text-sm font-semibold text-muted-foreground">Cliniques partenaires</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
