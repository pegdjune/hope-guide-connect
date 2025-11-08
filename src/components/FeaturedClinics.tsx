import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, TrendingUp, Euro } from "lucide-react";
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
  },
];

const FeaturedClinics = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Cliniques vedettes
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Les cliniques les mieux notées d'Europe
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection de cliniques partenaires reconnues pour leur excellence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredClinics.map((clinic) => (
            <Card key={clinic.id} className="hover:shadow-large transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{clinic.name}</CardTitle>
                  {clinic.featured && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      Top
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {clinic.city}, {clinic.country}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">{clinic.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({clinic.reviewCount} avis)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>Taux de réussite</span>
                    </div>
                    <p className="text-xl font-bold text-primary">{clinic.successRate}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Euro className="w-4 h-4" />
                      <span>À partir de</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">{clinic.price}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Traitements :</p>
                  <div className="flex flex-wrap gap-2">
                    {clinic.treatments.map((treatment, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {treatment}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
                  Voir les détails
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground">
            <NavLink to="/comparateur">
              Voir toutes les cliniques →
            </NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedClinics;
