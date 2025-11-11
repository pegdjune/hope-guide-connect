import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ComparisonTable from "@/components/ComparisonTable";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Euro, TrendingUp, ArrowRight, Map, GitCompare, X, Loader2 } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Clinic {
  id: string;
  name: string;
  country: string;
  city: string;
  rating: number | null;
  review_count: number;
  success_rate: string | null;
  price_from: number | null;
  specialties: string[];
  badges: string[];
  longitude: number | null;
  latitude: number | null;
  website: string | null;
}

// Token Mapbox configuré
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYmc3NTc1NzUiLCJhIjoiY21ocXhnNzdiMGNzczJqc2R3dWpmM3N4ZSJ9.BUHrAaoH9kK_HXmAfCo9ig';

const Comparateur = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedClinics, setSelectedClinics] = useState<string[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Charger les cliniques depuis Supabase
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const { data, error } = await supabase
          .from('clinics')
          .select('*')
          .order('country', { ascending: true });

        if (error) throw error;

        setClinics(data || []);
      } catch (error) {
        console.error('Error fetching clinics:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les cliniques",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  const toggleClinicSelection = (clinicId: string) => {
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

  useEffect(() => {
    if (!mapContainer.current || map.current || viewMode !== 'map') return;

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [10, 48],
        zoom: 4.5,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        "top-right"
      );

      map.current.on("load", () => {
        setMapLoaded(true);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      if (viewMode !== 'map') {
        map.current?.remove();
        map.current = null;
        setMapLoaded(false);
      }
    };
  }, [viewMode]);

  // Add markers when clinics data changes and map is loaded
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    const markers = document.querySelectorAll('.marker');
    markers.forEach((marker) => marker.remove());

    // Add markers for clinics with coordinates
    clinics
      .filter((clinic) => clinic.latitude && clinic.longitude)
      .forEach((clinic) => {
        const el = document.createElement("div");
        el.className = "marker";
        el.style.width = "40px";
        el.style.height = "40px";
        el.style.cursor = "pointer";

        const markerIcon = document.createElement("div");
        markerIcon.innerHTML = `
          <div class="flex items-center justify-center w-10 h-10 bg-primary rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `;
        el.appendChild(markerIcon);

        const popup = new mapboxgl.Popup({ offset: 25, maxWidth: '350px' }).setHTML(`
          <div class="p-4 min-w-[300px]">
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-bold text-lg text-foreground pr-2">${clinic.name}</h3>
              ${clinic.rating ? `
                <div class="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-full shrink-0">
                  <span class="text-yellow-500">★</span>
                  <span class="font-semibold text-sm">${clinic.rating}</span>
                  <span class="text-xs text-muted-foreground">(${clinic.review_count})</span>
                </div>
              ` : ''}
            </div>
            
            <div class="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>${clinic.city}, ${clinic.country}</span>
            </div>

            ${clinic.badges && clinic.badges.length > 0 ? `
              <div class="flex flex-wrap gap-1 mb-3">
                ${clinic.badges.slice(0, 3).map(badge => `
                  <span class="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">${badge}</span>
                `).join('')}
              </div>
            ` : ''}

            ${clinic.specialties && clinic.specialties.length > 0 ? `
              <div class="mb-3">
                <div class="text-xs font-semibold text-muted-foreground mb-1">Spécialités</div>
                <div class="flex flex-wrap gap-1">
                  ${clinic.specialties.slice(0, 3).map(specialty => `
                    <span class="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground rounded">${specialty}</span>
                  `).join('')}
                  ${clinic.specialties.length > 3 ? `<span class="text-xs text-muted-foreground">+${clinic.specialties.length - 3}</span>` : ''}
                </div>
              </div>
            ` : ''}

            <div class="grid grid-cols-2 gap-3 mb-3 pb-3 border-b border-border/50">
              ${clinic.success_rate ? `
                <div>
                  <div class="text-xs text-muted-foreground">Taux de réussite</div>
                  <div class="font-semibold text-success flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                    ${clinic.success_rate}
                  </div>
                </div>
              ` : ''}
              ${clinic.price_from ? `
                <div>
                  <div class="text-xs text-muted-foreground">À partir de</div>
                  <div class="font-bold text-primary text-lg">${clinic.price_from.toLocaleString()}€</div>
                </div>
              ` : ''}
            </div>

            <div class="flex gap-2">
              <button class="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
                Voir les détails
              </button>
              ${clinic.website ? `
                <a href="${clinic.website}" target="_blank" rel="noopener noreferrer" class="px-3 py-2 border-2 border-border rounded-lg hover:bg-secondary/50 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              ` : ''}
            </div>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat([clinic.longitude!, clinic.latitude!])
          .setPopup(popup)
          .addTo(map.current!);
      });
  }, [clinics, mapLoaded]);

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
            <div className="relative mb-8 h-[600px] rounded-lg overflow-hidden shadow-large">
              <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
              
              {/* Loading indicator */}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
                  <div className="text-center">
                    <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground">Chargement des cliniques...</p>
                  </div>
                </div>
              )}
              
              {!loading && !mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
                  <div className="text-center">
                    <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground">Initialisation de la carte...</p>
                  </div>
                </div>
              )}
              
              {!loading && clinics.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
                  <Card className="p-6 max-w-md">
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Aucune clinique importée
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Importez d'abord les cliniques depuis la base de données
                    </p>
                    <Button asChild>
                      <NavLink to="/import-clinics">
                        Importer les cliniques
                      </NavLink>
                    </Button>
                  </Card>
                </div>
              )}
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
            {loading ? (
              <Card className="p-8 text-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground">Chargement des cliniques...</p>
              </Card>
            ) : clinics.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-lg font-semibold text-foreground mb-2">
                  Aucune clinique trouvée
                </p>
                <p className="text-muted-foreground mb-4">
                  Importez d'abord les cliniques depuis la base de données
                </p>
                <Button asChild>
                  <NavLink to="/import-clinics">
                    Importer les cliniques
                  </NavLink>
                </Button>
              </Card>
            ) : (
              clinics.map((clinic) => (
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
                            <span className="text-xs text-muted-foreground">({clinic.review_count})</span>
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
                        {clinic.success_rate && (
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-success" />
                            <div>
                              <div className="text-sm text-muted-foreground">Taux de réussite</div>
                              <div className="font-semibold text-foreground">{clinic.success_rate}</div>
                            </div>
                          </div>
                        )}
                        {clinic.price_from && (
                          <div className="flex items-center gap-2">
                             <Euro className="w-5 h-5 text-primary" />
                            <div>
                              <div className="text-sm text-muted-foreground">À partir de</div>
                              <div className="font-semibold text-foreground">{clinic.price_from.toLocaleString()}€</div>
                            </div>
                          </div>
                        )}
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
            ))
            )}
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
