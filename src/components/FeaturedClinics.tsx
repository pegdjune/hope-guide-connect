import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, TrendingUp, Euro, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const featuredClinics = [
  {
    id: 1,
    name: "IVF Spain Madrid",
    country: "Espagne",
    city: "Madrid",
    rating: 4.8,
    reviewCount: 245,
    successRate: "68%",
    price: "4,500€",
    treatments: ["FIV", "ICSI", "Don d'ovocytes"],
    featured: true,
    badge: "⭐ Top évalué"
  },
  {
    id: 2,
    name: "Cyprus IVF Centre",
    country: "Chypre",
    city: "Nicosie",
    rating: 4.7,
    reviewCount: 189,
    successRate: "65%",
    price: "3,900€",
    treatments: ["FIV", "Don d'ovocytes", "DPI"],
    featured: true,
    badge: "💰 Meilleur prix"
  },
  {
    id: 3,
    name: "Reprofit International",
    country: "République Tchèque",
    city: "Brno",
    rating: 4.9,
    reviewCount: 312,
    successRate: "71%",
    price: "3,200€",
    treatments: ["FIV", "ICSI", "Don d'embryons"],
    featured: true,
    badge: "🏆 Plus de succès"
  },
];

const FeaturedClinics = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-light/30 via-background to-accent-light/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      <Sparkles className="absolute top-20 right-20 w-16 h-16 text-primary/20 animate-pulse-slow" />
      <Sparkles className="absolute bottom-20 left-20 w-12 h-12 text-accent/20 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-accent text-white border-0 px-6 py-2 text-base font-bold shadow-medium animate-pulse-slow">
            ✨ Sélection premium
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 font-heading">
            Les cliniques{" "}
            <span className="text-primary relative">
              les mieux notées
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                <path d="M2 6C60 2, 140 2, 198 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
            {" "}d'Europe
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Découvrez notre sélection de cliniques partenaires reconnues pour leur excellence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredClinics.map((clinic, idx) => (
            <Card 
              key={clinic.id} 
              className="group hover:shadow-glow transition-all duration-500 border-2 hover:border-primary/30 bg-white overflow-hidden hover:scale-105"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
              
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-3">
                  <CardTitle className="text-2xl font-bold font-heading group-hover:text-primary transition-colors">
                    {clinic.name}
                  </CardTitle>
                  <Badge className="bg-primary/10 text-primary border-primary/20 font-bold">
                    {clinic.badge}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-base font-medium">
                    {clinic.city}, {clinic.country}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex items-center gap-2 bg-accent/5 p-3 rounded-xl">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(clinic.rating) ? 'fill-accent text-accent' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="font-bold text-foreground text-lg ml-1">{clinic.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({clinic.reviewCount} avis)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 bg-primary/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-primary">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-sm font-semibold">Taux de réussite</span>
                    </div>
                    <p className="text-3xl font-extrabold text-primary font-heading">{clinic.successRate}</p>
                  </div>
                  <div className="space-y-2 bg-accent/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-accent">
                      <Euro className="w-5 h-5" />
                      <span className="text-sm font-semibold">À partir de</span>
                    </div>
                    <p className="text-3xl font-extrabold text-accent font-heading">{clinic.price}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-bold text-foreground">Traitements proposés :</p>
                  <div className="flex flex-wrap gap-2">
                    {clinic.treatments.map((treatment, idx) => (
                      <Badge key={idx} variant="outline" className="text-sm font-medium border-primary/30 hover:bg-primary/10">
                        {treatment}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-base py-6 group/btn"
                >
                  <span>Voir les détails</span>
                  <Star className="w-5 h-5 ml-2 group-hover/btn:fill-white transition-all" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow font-bold text-lg px-12 py-7 hover:scale-105 transition-all group"
          >
            <NavLink to="/comparateur" className="flex items-center gap-3">
              Voir toutes les cliniques
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedClinics;
