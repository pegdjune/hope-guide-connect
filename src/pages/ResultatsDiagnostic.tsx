import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { CheckCircle2, MapPin, Star, Euro, TrendingUp, ArrowRight, Download, Mail } from "lucide-react";

const ResultatsDiagnostic = () => {
  // Mock data - serait remplacé par les vraies données du diagnostic
  const userProfile = {
    age: "30-35 ans",
    country: "France",
    budget: "5 000€ - 8 000€",
    treatment: "FIV avec don d'ovocytes"
  };

  const recommendations = [
    {
      id: 1,
      name: "Clinique FertiCare Prague",
      country: "République Tchèque",
      city: "Prague",
      rating: 4.8,
      reviewCount: 245,
      successRate: "68%",
      priceFrom: 4500,
      specialties: ["FIV", "Don d'ovocytes", "ICSI"],
      badges: ["Recommandé pour vous", "Francophone"],
      matchScore: 95,
      whyRecommended: "Prix compétitif, équipe francophone, spécialisée dans le don d'ovocytes avec excellent taux de réussite",
      coordinates: [14.4378, 50.0755] as [number, number]
    },
    {
      id: 2,
      name: "Barcelona IVF",
      country: "Espagne",
      city: "Barcelone",
      rating: 4.9,
      reviewCount: 412,
      successRate: "72%",
      priceFrom: 6200,
      specialties: ["FIV", "Don d'ovocytes", "Don de sperme"],
      badges: ["Taux de réussite élevé", "Équipe multiculturelle"],
      matchScore: 88,
      whyRecommended: "Meilleur taux de réussite, banque d'ovocytes diversifiée, dans votre budget",
      coordinates: [2.1734, 41.3851] as [number, number]
    },
    {
      id: 3,
      name: "Athens Fertility Center",
      country: "Grèce",
      city: "Athènes",
      rating: 4.7,
      reviewCount: 198,
      successRate: "65%",
      priceFrom: 3800,
      specialties: ["FIV", "ICSI"],
      badges: ["Budget friendly", "Support émotionnel"],
      matchScore: 82,
      whyRecommended: "Excellent rapport qualité-prix, accompagnement personnalisé",
      coordinates: [23.7275, 37.9838] as [number, number]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header avec animation */}
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full mb-4">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Diagnostic complété</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Vos Recommandations Personnalisées
            </h1>
            <p className="text-lg text-muted-foreground">
              Basées sur votre profil, nous avons sélectionné {recommendations.length} cliniques qui correspondent parfaitement à vos besoins
            </p>
          </div>

          {/* User Profile Summary */}
          <Card className="mb-12 shadow-large border-primary/20 animate-fade-in">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Votre profil</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Âge</div>
                  <div className="font-semibold text-foreground">{userProfile.age}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Pays</div>
                  <div className="font-semibold text-foreground">{userProfile.country}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Budget</div>
                  <div className="font-semibold text-foreground">{userProfile.budget}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Traitement</div>
                  <div className="font-semibold text-foreground">{userProfile.treatment}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="space-y-8 mb-12">
            {recommendations.map((clinic, idx) => (
              <Card 
                key={clinic.id} 
                className="hover:shadow-xl transition-all duration-300 animate-fade-in border-2 border-border hover:border-primary/30"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardContent className="p-8">
                  {/* Match badge */}
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                      {clinic.matchScore}% de correspondance
                    </Badge>
                    {clinic.badges.includes("Recommandé pour vous") && (
                      <Badge className="bg-accent text-accent-foreground">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Recommandé pour vous
                      </Badge>
                    )}
                  </div>

                  <div className="grid md:grid-cols-[1fr,auto] gap-8">
                    {/* Main info */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {clinic.name}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground mb-4">
                          <MapPin className="w-4 h-4" />
                          <span>{clinic.city}, {clinic.country}</span>
                        </div>

                        {/* Why recommended */}
                        <div className="bg-primary/5 border-l-4 border-primary p-4 rounded">
                          <p className="text-sm font-medium text-foreground">
                            <CheckCircle2 className="w-4 h-4 inline mr-2 text-primary" />
                            Pourquoi cette clinique ?
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            {clinic.whyRecommended}
                          </p>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        {clinic.badges.map((badge, i) => (
                          <Badge key={i} variant="outline" className="border-primary/30 text-primary">
                            {badge}
                          </Badge>
                        ))}
                      </div>

                      {/* Specialties */}
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Spécialités :</div>
                        <div className="flex flex-wrap gap-2">
                          {clinic.specialties.map((specialty, i) => (
                            <Badge key={i} className="bg-secondary text-secondary-foreground">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-accent fill-current" />
                          <div>
                            <div className="text-sm text-muted-foreground">Note</div>
                            <div className="font-semibold text-foreground">
                              {clinic.rating} ({clinic.reviewCount} avis)
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-success" />
                          <div>
                            <div className="text-sm text-muted-foreground">Taux de réussite</div>
                            <div className="font-semibold text-foreground">{clinic.successRate}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col justify-between gap-4 min-w-[220px]">
                      <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">À partir de</div>
                        <div className="text-4xl font-bold text-primary mb-2">
                          {clinic.priceFrom.toLocaleString()}€
                        </div>
                        <div className="text-xs text-muted-foreground">Traitement complet</div>
                      </div>
                      <Button className="bg-primary hover:bg-primary-hover text-primary-foreground w-full">
                        Voir les détails
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" className="border-2 w-full">
                        Contacter la clinique
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 via-accent-light/20 to-primary-light/10 border-primary/20">
              <CardContent className="p-8 text-center">
                <Download className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Télécharger votre rapport
                </h3>
                <p className="text-muted-foreground mb-6">
                  Recevez un PDF détaillé avec toutes vos recommandations
                </p>
                <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                  Télécharger le PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 via-primary-light/20 to-accent-light/10 border-accent/20">
              <CardContent className="p-8 text-center">
                <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Être accompagné(e)
                </h3>
                <p className="text-muted-foreground mb-6">
                  Échangez avec nos experts pour affiner votre choix
                </p>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Prendre rendez-vous
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Compare CTA */}
          <Card className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Comparer ces cliniques en détail
              </h3>
              <p className="text-muted-foreground mb-6">
                Visualisez côte à côte tous les critères pour faire le meilleur choix
              </p>
              <Button asChild className="bg-primary hover:bg-primary-hover text-primary-foreground">
                <NavLink to="/comparateur">
                  Comparer les cliniques
                  <ArrowRight className="w-4 h-4 ml-2" />
                </NavLink>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
};

export default ResultatsDiagnostic;