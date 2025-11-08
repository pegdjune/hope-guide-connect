import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import InteractiveMap from "@/components/InteractiveMap";
import ComparisonTable from "@/components/ComparisonTable";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Euro, TrendingUp, ArrowRight, Map, GitCompare } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Mock data - sera remplacé par de vraies données
const clinics = [
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
    badges: ["Disponibilité rapide", "Francophone"],
    coordinates: [14.4378, 50.0755] as [number, number],
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
    coordinates: [2.1734, 41.3851] as [number, number],
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
    coordinates: [23.7275, 37.9838] as [number, number],
  },
];

const Comparateur = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedClinics, setSelectedClinics] = useState<number[]>([]);

  const toggleClinicSelection = (clinicId: number) => {
    if (selectedClinics.includes(clinicId)) {
      setSelectedClinics(selectedClinics.filter(id => id !== clinicId));
    } else if (selectedClinics.length < 3) {
      setSelectedClinics([...selectedClinics, clinicId]);
      toast({
        title: "Clinique ajoutée",
        description: "Clinique ajoutée à la comparaison",
      });
    } else {
      toast({
        title: "Limite atteinte",
        description: "Vous pouvez comparer maximum 3 cliniques",
        variant: "destructive",
      });
    }
  };

  const selectedClinicsData = clinics.filter(c => selectedClinics.includes(c.id));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comparateur de Cliniques FIV
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez et comparez les meilleures cliniques européennes de fertilité
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8 shadow-soft">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <select className="p-3 rounded-lg border-2 border-border focus:border-primary outline-none bg-background">
                  <option value="">Tous les pays</option>
                  <option value="cz">République Tchèque</option>
                  <option value="es">Espagne</option>
                  <option value="gr">Grèce</option>
                  <option value="cy">Chypre</option>
                </select>

                <select className="p-3 rounded-lg border-2 border-border focus:border-primary outline-none bg-background">
                  <option value="">Type de traitement</option>
                  <option value="fiv">FIV</option>
                  <option value="don">Don d'ovocytes</option>
                  <option value="icsi">ICSI</option>
                </select>

                <select className="p-3 rounded-lg border-2 border-border focus:border-primary outline-none bg-background">
                  <option value="">Budget</option>
                  <option value="low">Moins de 5 000€</option>
                  <option value="mid">5 000€ - 10 000€</option>
                  <option value="high">Plus de 10 000€</option>
                </select>

                <select className="p-3 rounded-lg border-2 border-border focus:border-primary outline-none bg-background">
                  <option value="">Trier par</option>
                  <option value="rating">Meilleure note</option>
                  <option value="price">Prix croissant</option>
                  <option value="success">Taux de réussite</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* View toggle and results count */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{clinics.length}</span> cliniques trouvées
              </p>
              {selectedClinics.length > 0 && (
                <p className="text-sm text-primary mt-1">
                  {selectedClinics.length} clinique{selectedClinics.length > 1 ? 's' : ''} sélectionnée{selectedClinics.length > 1 ? 's' : ''} pour comparaison
                </p>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                onClick={() => {
                  setViewMode('map');
                  setComparisonMode(false);
                }}
                className="gap-2"
              >
                <Map className="w-4 h-4" />
                Carte
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => {
                  setViewMode('list');
                  setComparisonMode(false);
                }}
                className="gap-2"
              >
                <MapPin className="w-4 h-4" />
                Liste
              </Button>
              {selectedClinics.length >= 2 && (
                <Button
                  variant={comparisonMode ? 'default' : 'outline'}
                  onClick={() => {
                    setComparisonMode(!comparisonMode);
                    setViewMode('list');
                  }}
                  className="gap-2"
                >
                  <GitCompare className="w-4 h-4" />
                  Comparer ({selectedClinics.length})
                </Button>
              )}
            </div>
          </div>

          {/* Interactive Map */}
          {viewMode === 'map' && (
            <div className="mb-8">
              <InteractiveMap clinics={clinics} />
            </div>
          )}

          {/* Comparison view */}
          {comparisonMode && viewMode === 'list' && (
            <ComparisonTable 
              clinics={selectedClinicsData}
              onRemove={(id) => setSelectedClinics(selectedClinics.filter(cId => cId !== id))}
              onClearAll={() => {
                setSelectedClinics([]);
                setComparisonMode(false);
              }}
            />
          )}

          {/* Clinics list */}
          {viewMode === 'list' && !comparisonMode && (
          <div className="space-y-6">
            {clinics.map((clinic) => (
              <Card key={clinic.id} className="hover:shadow-large transition-all duration-300">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-[1fr,auto] gap-6">
                    {/* Main info */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-2xl font-semibold text-foreground">
                            {clinic.name}
                          </h3>
                          <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 text-accent fill-current" />
                            <span className="font-semibold text-accent">{clinic.rating}</span>
                            <span className="text-xs text-muted-foreground">({clinic.reviewCount})</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{clinic.city}, {clinic.country}</span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        {clinic.badges.map((badge, idx) => (
                          <Badge key={idx} variant="outline" className="border-primary/30 text-primary">
                            {badge}
                          </Badge>
                        ))}
                      </div>

                      {/* Specialties */}
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Spécialités :</div>
                        <div className="flex flex-wrap gap-2">
                          {clinic.specialties.map((specialty, idx) => (
                            <Badge key={idx} className="bg-secondary text-secondary-foreground">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-success" />
                          <div>
                            <div className="text-sm text-muted-foreground">Taux de réussite</div>
                            <div className="font-semibold text-foreground">{clinic.successRate}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Euro className="w-5 h-5 text-primary" />
                          <div>
                            <div className="text-sm text-muted-foreground">À partir de</div>
                            <div className="font-semibold text-foreground">{clinic.priceFrom.toLocaleString()}€</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col justify-between gap-4 min-w-[200px]">
                      <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                        Voir les détails
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button 
                        variant={selectedClinics.includes(clinic.id) ? "default" : "outline"}
                        className="border-2"
                        onClick={() => toggleClinicSelection(clinic.id)}
                      >
                        {selectedClinics.includes(clinic.id) ? (
                          <>
                            <GitCompare className="w-4 h-4 mr-2" />
                            Sélectionnée
                          </>
                        ) : (
                          'Comparer'
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          )}

          {/* CTA bottom */}
          <Card className="mt-12 bg-gradient-to-br from-primary/10 via-accent-light/30 to-primary-light/20 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Besoin d'aide pour choisir ?
              </h3>
              <p className="text-muted-foreground mb-6">
                Notre diagnostic personnalisé vous aide à trouver la clinique idéale en 5 minutes
              </p>
              <Button asChild className="bg-primary hover:bg-primary-hover text-primary-foreground">
                <NavLink to="/diagnostic">
                  Faire le diagnostic gratuit
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

export default Comparateur;
