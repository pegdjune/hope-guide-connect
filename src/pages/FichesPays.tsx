import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { countryMapping } from "@/data/countryPages";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

interface CountryWithStats {
  slug: string;
  frenchName: string;
  flag: string;
  clinicCount: number;
}

const FichesPays = () => {
  const [countries, setCountries] = useState<CountryWithStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryStats = async () => {
      const { data, error } = await supabase
        .from("clinics")
        .select("country");

      if (!error && data) {
        // Count clinics per country
        const countryStats: Record<string, number> = {};
        data.forEach(clinic => {
          countryStats[clinic.country] = (countryStats[clinic.country] || 0) + 1;
        });

        // Map to our country data
        const countriesWithStats: CountryWithStats[] = Object.entries(countryMapping)
          .map(([slug, info]) => ({
            slug,
            frenchName: info.frenchName,
            flag: info.flag,
            clinicCount: countryStats[info.dbName] || 0,
          }))
          .filter(c => c.clinicCount > 0)
          .sort((a, b) => b.clinicCount - a.clinicCount);

        setCountries(countriesWithStats);
      }
      setLoading(false);
    };

    fetchCountryStats();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>FIV par Pays | Guides et Cliniques par Destination | FertilEurope</title>
        <meta name="description" content="Découvrez les meilleures destinations pour votre FIV : Espagne, République Tchèque, Grèce, Portugal... Comparez les prix, taux de réussite et cadres légaux." />
      </Helmet>

      <Navigation />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              FIV par Pays
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez les destinations les plus populaires pour la FIV en Europe. 
              Comparez les cadres légaux, les prix et les taux de réussite.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-muted rounded-full mx-auto mb-4" />
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {countries.map((country) => (
                <NavLink key={country.slug} to={`/fiv/${country.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all hover:border-primary group cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl mb-4">{country.flag}</div>
                      <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {country.frenchName}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4">
                        {country.clinicCount} clinique{country.clinicCount > 1 ? 's' : ''}
                      </p>
                      <div className="flex items-center justify-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Voir le guide
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </NavLink>
              ))}
            </div>
          )}

          {/* Pays populaires */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Destinations les plus populaires
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">🇪🇸</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Espagne</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    N°1 européen pour le don d'ovocytes. Cadre légal ouvert, expertise reconnue.
                  </p>
                  <NavLink to="/fiv/espagne" className="text-primary font-medium flex items-center gap-1">
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </NavLink>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-accent/20">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">🇨🇿</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">République Tchèque</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Excellent rapport qualité-prix. Cliniques modernes, tarifs compétitifs.
                  </p>
                  <NavLink to="/fiv/republique-tcheque" className="text-primary font-medium flex items-center gap-1">
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </NavLink>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-success/20">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">🇬🇷</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Grèce</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tarifs attractifs, climat agréable. Destination en forte croissance.
                  </p>
                  <NavLink to="/fiv/grece" className="text-primary font-medium flex items-center gap-1">
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </NavLink>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
};

export default FichesPays;