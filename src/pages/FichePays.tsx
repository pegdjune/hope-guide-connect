import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  MapPin, 
  Star, 
  Euro, 
  Scale, 
  TrendingUp, 
  Plane, 
  HelpCircle,
  Building2,
  Users,
  CheckCircle
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { supabase } from "@/integrations/supabase/client";
import { countryMapping, getCountryContent } from "@/data/countryPages";
import { Helmet } from "react-helmet";

interface Clinic {
  id: string;
  name: string;
  city: string;
  rating: number | null;
  price_from: number | null;
  taux_reussite_fiv: number | null;
  service_don_ovocytes: boolean | null;
  service_don_sperme: boolean | null;
  service_dpi: boolean | null;
}

interface CountryStats {
  totalClinics: number;
  avgPrice: number | null;
  avgSuccessRate: number | null;
  minPrice: number | null;
  maxPrice: number | null;
}

const FichePays = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [stats, setStats] = useState<CountryStats | null>(null);
  const [loading, setLoading] = useState(true);

  const countryInfo = slug ? countryMapping[slug] : null;
  const content = slug ? getCountryContent(slug) : null;

  useEffect(() => {
    if (!countryInfo) {
      navigate("/404");
      return;
    }

    const fetchClinics = async () => {
      const { data, error } = await supabase
        .from("clinics")
        .select("id, name, city, rating, price_from, taux_reussite_fiv, service_don_ovocytes, service_don_sperme, service_dpi")
        .eq("country", countryInfo.dbName)
        .order("rating", { ascending: false, nullsFirst: false })
        .limit(6);

      if (!error && data) {
        setClinics(data);
      }
    };

    const fetchStats = async () => {
      const { data, error } = await supabase
        .from("clinics")
        .select("price_from, taux_reussite_fiv")
        .eq("country", countryInfo.dbName);

      if (!error && data) {
        const prices = data.filter(c => c.price_from).map(c => c.price_from!);
        const rates = data.filter(c => c.taux_reussite_fiv).map(c => c.taux_reussite_fiv!);

        setStats({
          totalClinics: data.length,
          avgPrice: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : null,
          avgSuccessRate: rates.length > 0 ? Math.round(rates.reduce((a, b) => a + b, 0) / rates.length * 10) / 10 : null,
          minPrice: prices.length > 0 ? Math.min(...prices) : null,
          maxPrice: prices.length > 0 ? Math.max(...prices) : null,
        });
      }
      setLoading(false);
    };

    fetchClinics();
    fetchStats();
  }, [countryInfo, navigate]);

  if (!countryInfo || !content) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>FIV en {countryInfo.frenchName} | Cliniques, Prix et Taux de Réussite | FertilEurope</title>
        <meta name="description" content={`Tout savoir sur la FIV en ${countryInfo.frenchName} : cliniques, prix, taux de réussite, cadre légal. Comparez les meilleures cliniques et recevez des devis gratuits.`} />
      </Helmet>

      <Navigation />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-4">{countryInfo.flag}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Faire une FIV en {countryInfo.frenchName}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {content.intro}
            </p>
            
            {/* Quick Stats */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-4 text-center">
                  <Building2 className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stats.totalClinics}</div>
                  <div className="text-sm text-muted-foreground">Cliniques</div>
                </Card>
                {stats.avgPrice && (
                  <Card className="p-4 text-center">
                    <Euro className="w-8 h-8 text-accent mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stats.avgPrice.toLocaleString()}€</div>
                    <div className="text-sm text-muted-foreground">Prix moyen</div>
                  </Card>
                )}
                {stats.avgSuccessRate && (
                  <Card className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stats.avgSuccessRate}%</div>
                    <div className="text-sm text-muted-foreground">Taux moyen</div>
                  </Card>
                )}
                {stats.minPrice && stats.maxPrice && (
                  <Card className="p-4 text-center">
                    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stats.minPrice.toLocaleString()}€ - {stats.maxPrice.toLocaleString()}€</div>
                    <div className="text-sm text-muted-foreground">Fourchette prix</div>
                  </Card>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                <NavLink to={`/comparateur?country=${encodeURIComponent(countryInfo.dbName)}`}>
                  <MapPin className="w-5 h-5 mr-2" />
                  Voir toutes les cliniques
                </NavLink>
              </Button>
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white"
              >
                <NavLink to="/diagnostic">
                  Recevoir des devis gratuits
                  <ArrowRight className="w-5 h-5 ml-2" />
                </NavLink>
              </Button>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Cadre Légal */}
            <div className="flex gap-6">
              <div className="hidden md:block">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Cadre légal de la FIV et de la PMA</h2>
                <p className="text-muted-foreground leading-relaxed">{content.cadreLegal}</p>
              </div>
            </div>

            {/* Coûts */}
            <div className="flex gap-6">
              <div className="hidden md:block">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Euro className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Coûts et budget d'une FIV</h2>
                <p className="text-muted-foreground leading-relaxed">{content.couts}</p>
                {stats?.minPrice && stats?.maxPrice && (
                  <div className="mt-4 p-4 bg-accent/5 rounded-xl border border-accent/20">
                    <p className="text-foreground font-medium">
                      💰 Prix constatés en {countryInfo.frenchName} : <span className="text-accent">{stats.minPrice.toLocaleString()}€ à {stats.maxPrice.toLocaleString()}€</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Taux de Réussite */}
            <div className="flex gap-6">
              <div className="hidden md:block">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Taux de réussite et qualité médicale</h2>
                <p className="text-muted-foreground leading-relaxed">{content.tauxReussite}</p>
                {stats?.avgSuccessRate && (
                  <div className="mt-4 p-4 bg-success/5 rounded-xl border border-success/20">
                    <p className="text-foreground font-medium">
                      📈 Taux de réussite moyen constaté : <span className="text-success">{stats.avgSuccessRate}%</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Pourquoi Choisir */}
            <div className="flex gap-6">
              <div className="hidden md:block">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Pourquoi choisir la FIV en {countryInfo.frenchName} ?</h2>
                <p className="text-muted-foreground leading-relaxed">{content.pourquoiChoisir}</p>
              </div>
            </div>

            {/* Logistique */}
            <div className="flex gap-6">
              <div className="hidden md:block">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Plane className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Logistique et parcours patient</h2>
                <p className="text-muted-foreground leading-relaxed">{content.logistique}</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="flex gap-6">
              <div className="hidden md:block">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Questions fréquentes</h2>
                <p className="text-muted-foreground leading-relaxed">{content.faq}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cliniques du pays */}
        {clinics.length > 0 && (
          <section className="bg-muted/30 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Cliniques FIV en {countryInfo.frenchName}
                </h2>
                <p className="text-muted-foreground">
                  Découvrez les cliniques disponibles dans notre comparateur
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {clinics.map((clinic) => (
                  <Card key={clinic.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{clinic.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{clinic.city}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {clinic.service_don_ovocytes && (
                          <Badge variant="outline" className="text-xs">Don ovocytes</Badge>
                        )}
                        {clinic.service_don_sperme && (
                          <Badge variant="outline" className="text-xs">Don sperme</Badge>
                        )}
                        {clinic.service_dpi && (
                          <Badge variant="outline" className="text-xs">DPI</Badge>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        {clinic.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-accent fill-current" />
                            <span className="font-semibold">{clinic.rating}</span>
                          </div>
                        )}
                        {clinic.price_from && (
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">À partir de</div>
                            <div className="font-bold text-primary">{clinic.price_from.toLocaleString()}€</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button asChild size="lg" variant="outline" className="border-2">
                  <NavLink to={`/comparateur?country=${encodeURIComponent(countryInfo.dbName)}`}>
                    Voir toutes les cliniques en {countryInfo.frenchName}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </NavLink>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* CTA Final */}
        <section className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-none">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Besoin d'aide pour votre projet FIV en {countryInfo.frenchName} ?
              </h2>
              <p className="text-muted-foreground mb-6">
                Recevez des devis personnalisés gratuits et parlez à une experte qui vous accompagnera dans votre parcours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground">
                  <NavLink to="/diagnostic">
                    📋 Recevoir mes devis gratuits
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </NavLink>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2">
                  <a href="tel:+33123456789">
                    📞 Parler à une experte
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
};

export default FichePays;