import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { 
  Euro, 
  ArrowLeft, 
  ArrowRight, 
  Plane,
  Hotel,
  Stethoscope,
  MapPin,
  CheckCircle2,
  Info,
  Loader2,
  Database
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";

// Données complémentaires par pays (voyage, hébergement)
const PAYS_TRAVEL_DATA: Record<string, {
  flag: string;
  avion: { min: number; max: number };
  hotel: number;
  delaiAttente: string;
}> = {
  "Espagne": { flag: "🇪🇸", avion: { min: 100, max: 250 }, hotel: 80, delaiAttente: "1-2 mois" },
  "République Tchèque": { flag: "🇨🇿", avion: { min: 80, max: 200 }, hotel: 60, delaiAttente: "1-3 mois" },
  "Czech Republik": { flag: "🇨🇿", avion: { min: 80, max: 200 }, hotel: 60, delaiAttente: "1-3 mois" },
  "Portugal": { flag: "🇵🇹", avion: { min: 80, max: 180 }, hotel: 70, delaiAttente: "1-2 mois" },
  "Grèce": { flag: "🇬🇷", avion: { min: 150, max: 300 }, hotel: 65, delaiAttente: "1-2 mois" },
  "Belgique": { flag: "🇧🇪", avion: { min: 50, max: 150 }, hotel: 90, delaiAttente: "2-4 mois" },
  "Danemark": { flag: "🇩🇰", avion: { min: 100, max: 250 }, hotel: 120, delaiAttente: "1-2 mois" },
  "Allemagne": { flag: "🇩🇪", avion: { min: 80, max: 200 }, hotel: 100, delaiAttente: "2-3 mois" },
  "Italie": { flag: "🇮🇹", avion: { min: 80, max: 200 }, hotel: 90, delaiAttente: "2-4 mois" },
  "Pologne": { flag: "🇵🇱", avion: { min: 80, max: 200 }, hotel: 50, delaiAttente: "1-2 mois" },
  "Hongrie": { flag: "🇭🇺", avion: { min: 100, max: 220 }, hotel: 55, delaiAttente: "1-2 mois" },
  "Turquie": { flag: "🇹🇷", avion: { min: 150, max: 350 }, hotel: 60, delaiAttente: "1-2 semaines" },
  "Ukraine": { flag: "🇺🇦", avion: { min: 150, max: 300 }, hotel: 40, delaiAttente: "1-2 mois" },
  "Russie": { flag: "🇷🇺", avion: { min: 200, max: 400 }, hotel: 70, delaiAttente: "1-2 mois" },
  "Royaume-Uni": { flag: "🇬🇧", avion: { min: 80, max: 200 }, hotel: 130, delaiAttente: "2-4 mois" },
  "Suède": { flag: "🇸🇪", avion: { min: 120, max: 280 }, hotel: 130, delaiAttente: "3-6 mois" },
  "Norvège": { flag: "🇳🇴", avion: { min: 150, max: 300 }, hotel: 150, delaiAttente: "2-4 mois" },
  "Pays-Bas": { flag: "🇳🇱", avion: { min: 60, max: 150 }, hotel: 110, delaiAttente: "2-4 mois" },
  "Suisse": { flag: "🇨🇭", avion: { min: 80, max: 200 }, hotel: 180, delaiAttente: "1-3 mois" },
  "Austria": { flag: "🇦🇹", avion: { min: 80, max: 200 }, hotel: 100, delaiAttente: "1-3 mois" },
  "Autriche": { flag: "🇦🇹", avion: { min: 80, max: 200 }, hotel: 100, delaiAttente: "1-3 mois" },
  "Israël": { flag: "🇮🇱", avion: { min: 200, max: 400 }, hotel: 120, delaiAttente: "1-2 mois" },
  "Roumanie": { flag: "🇷🇴", avion: { min: 100, max: 220 }, hotel: 45, delaiAttente: "1-2 mois" },
  "Maroc": { flag: "🇲🇦", avion: { min: 100, max: 250 }, hotel: 50, delaiAttente: "1-2 semaines" },
  "Tunisie": { flag: "🇹🇳", avion: { min: 150, max: 300 }, hotel: 45, delaiAttente: "1-2 semaines" },
  "Irlande": { flag: "🇮🇪", avion: { min: 100, max: 250 }, hotel: 120, delaiAttente: "2-4 mois" },
  "Serbie": { flag: "🇷🇸", avion: { min: 120, max: 250 }, hotel: 50, delaiAttente: "1-2 mois" },
  "Croatie": { flag: "🇭🇷", avion: { min: 100, max: 220 }, hotel: 70, delaiAttente: "1-2 mois" },
  "Slovénie": { flag: "🇸🇮", avion: { min: 100, max: 220 }, hotel: 80, delaiAttente: "1-2 mois" },
  "Bulgarie": { flag: "🇧🇬", avion: { min: 120, max: 250 }, hotel: 45, delaiAttente: "1-2 mois" },
  "Lettonie": { flag: "🇱🇻", avion: { min: 120, max: 260 }, hotel: 60, delaiAttente: "1-2 mois" },
  "Lituanie": { flag: "🇱🇹", avion: { min: 100, max: 240 }, hotel: 55, delaiAttente: "1-2 mois" },
  "Estonie": { flag: "🇪🇪", avion: { min: 130, max: 280 }, hotel: 70, delaiAttente: "1-2 mois" },
  "Finlande": { flag: "🇫🇮", avion: { min: 130, max: 300 }, hotel: 120, delaiAttente: "2-4 mois" },
  "France": { flag: "🇫🇷", avion: { min: 0, max: 0 }, hotel: 100, delaiAttente: "6-12 mois" },
};

interface PaysData {
  country: string;
  clinic_count: number;
  avg_fiv_base: number | null;
  min_fiv_base: number | null;
  max_fiv_base: number | null;
  avg_don_ovocytes: number | null;
  avg_success_rate: number | null;
}

const SimulateurCoutPays = () => {
  useSEO({
    title: "Simulateur Coût PMA par Pays - Comparez les destinations",
    description: "Estimez le coût total d'un traitement PMA selon le pays : Espagne, République Tchèque, Portugal, Grèce. Traitement, voyage et hébergement inclus.",
    type: "website",
  });

  const [step, setStep] = useState(1);
  const [paysDataFromDB, setPaysDataFromDB] = useState<PaysData[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    typeTraitement: "fiv" as "fiv" | "donOvocytes" | "iac",
    pays: "",
    nombreVoyages: 2,
    nombreNuits: 4,
    nombrePersonnes: 2,
  });

  const [showResults, setShowResults] = useState(false);

  // Récupérer les données des cliniques par pays
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('clinics')
          .select('country, tarif_fiv_base, tarif_don_ovocytes, taux_reussite_fiv')
          .not('tarif_fiv_base', 'is', null);

        if (error) throw error;

        // Agréger par pays
        const countryMap = new Map<string, {
          count: number;
          fivSum: number;
          fivMin: number;
          fivMax: number;
          donSum: number;
          donCount: number;
          successSum: number;
          successCount: number;
        }>();

        data?.forEach((clinic) => {
          const country = clinic.country;
          const existing = countryMap.get(country) || {
            count: 0,
            fivSum: 0,
            fivMin: Infinity,
            fivMax: -Infinity,
            donSum: 0,
            donCount: 0,
            successSum: 0,
            successCount: 0,
          };

          existing.count++;
          if (clinic.tarif_fiv_base) {
            existing.fivSum += clinic.tarif_fiv_base;
            existing.fivMin = Math.min(existing.fivMin, clinic.tarif_fiv_base);
            existing.fivMax = Math.max(existing.fivMax, clinic.tarif_fiv_base);
          }
          if (clinic.tarif_don_ovocytes) {
            existing.donSum += clinic.tarif_don_ovocytes;
            existing.donCount++;
          }
          if (clinic.taux_reussite_fiv) {
            existing.successSum += Number(clinic.taux_reussite_fiv);
            existing.successCount++;
          }

          countryMap.set(country, existing);
        });

        // Convertir en tableau
        const aggregated: PaysData[] = Array.from(countryMap.entries())
          .map(([country, stats]) => ({
            country,
            clinic_count: stats.count,
            avg_fiv_base: stats.count > 0 ? Math.round(stats.fivSum / stats.count) : null,
            min_fiv_base: stats.fivMin !== Infinity ? stats.fivMin : null,
            max_fiv_base: stats.fivMax !== -Infinity ? stats.fivMax : null,
            avg_don_ovocytes: stats.donCount > 0 ? Math.round(stats.donSum / stats.donCount) : null,
            avg_success_rate: stats.successCount > 0 ? Math.round(stats.successSum / stats.successCount * 10) / 10 : null,
          }))
          .filter(p => p.clinic_count >= 3) // Au moins 3 cliniques pour être fiable
          .sort((a, b) => b.clinic_count - a.clinic_count);

        setPaysDataFromDB(aggregated);
        if (aggregated.length > 0) {
          setFormData(prev => ({ ...prev, pays: aggregated[0].country }));
        }
      } catch (err) {
        console.error("Erreur chargement données cliniques:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectedPaysData = paysDataFromDB.find(p => p.country === formData.pays);
  const travelData = PAYS_TRAVEL_DATA[formData.pays] || {
    flag: "🏥",
    avion: { min: 100, max: 250 },
    hotel: 80,
    delaiAttente: "1-3 mois"
  };

  const calculateCosts = () => {
    if (!selectedPaysData) return null;

    // Coût traitement basé sur les vrais prix
    let prixTraitement = { min: 0, max: 0 };
    if (formData.typeTraitement === "fiv") {
      prixTraitement = {
        min: selectedPaysData.min_fiv_base || selectedPaysData.avg_fiv_base || 3000,
        max: selectedPaysData.max_fiv_base || selectedPaysData.avg_fiv_base || 6000
      };
    } else if (formData.typeTraitement === "donOvocytes") {
      const avgDon = selectedPaysData.avg_don_ovocytes || (selectedPaysData.avg_fiv_base ? selectedPaysData.avg_fiv_base * 1.5 : 6000);
      prixTraitement = {
        min: Math.round(avgDon * 0.85),
        max: Math.round(avgDon * 1.15)
      };
    } else {
      // IAC = environ 30% du prix FIV
      const avgFiv = selectedPaysData.avg_fiv_base || 3500;
      prixTraitement = {
        min: Math.round(avgFiv * 0.25),
        max: Math.round(avgFiv * 0.40)
      };
    }

    // Coût transport
    const coutAvion = {
      min: travelData.avion.min * formData.nombrePersonnes * formData.nombreVoyages,
      max: travelData.avion.max * formData.nombrePersonnes * formData.nombreVoyages,
    };

    // Coût hébergement
    const coutHotel = travelData.hotel * formData.nombreNuits * formData.nombreVoyages;

    // Frais annexes (repas, transports locaux, etc.)
    const fraisAnnexes = 50 * formData.nombreNuits * formData.nombreVoyages;

    // Total
    const total = {
      min: prixTraitement.min + coutAvion.min + coutHotel + fraisAnnexes,
      max: prixTraitement.max + coutAvion.max + coutHotel + fraisAnnexes,
    };

    return {
      traitement: prixTraitement,
      transport: coutAvion,
      hebergement: coutHotel,
      annexes: fraisAnnexes,
      total,
      paysData: selectedPaysData,
      travelData,
    };
  };

  const results = calculateCosts();

  const renderStep = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Chargement des données cliniques...</p>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Type de traitement
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Quel traitement PMA envisagez-vous ?
              </p>
            </div>

            <RadioGroup
              value={formData.typeTraitement}
              onValueChange={(value) => setFormData({ ...formData, typeTraitement: value as "fiv" | "donOvocytes" | "iac" })}
              className="grid gap-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="fiv" id="fiv" />
                <Label htmlFor="fiv" className="flex-1 cursor-pointer p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <span className="font-medium">FIV / ICSI</span>
                  <p className="text-sm text-muted-foreground">Fécondation in vitro avec vos propres ovocytes</p>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="donOvocytes" id="donOvocytes" />
                <Label htmlFor="donOvocytes" className="flex-1 cursor-pointer p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <span className="font-medium">Don d'ovocytes</span>
                  <p className="text-sm text-muted-foreground">FIV avec ovocytes de donneuse</p>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="iac" id="iac" />
                <Label htmlFor="iac" className="flex-1 cursor-pointer p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <span className="font-medium">Insémination (IAC/IAD)</span>
                  <p className="text-sm text-muted-foreground">Insémination artificielle</p>
                </Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Pays de destination
              </h2>
              <p className="text-muted-foreground text-sm mb-4 flex items-center gap-2">
                <Database className="w-4 h-4" />
                Prix basés sur {paysDataFromDB.reduce((acc, p) => acc + p.clinic_count, 0)} cliniques réelles
              </p>
            </div>

            <RadioGroup
              value={formData.pays}
              onValueChange={(value) => setFormData({ ...formData, pays: value })}
              className="grid gap-3 max-h-[400px] overflow-y-auto pr-2"
            >
              {paysDataFromDB.map((data) => {
                const travel = PAYS_TRAVEL_DATA[data.country];
                return (
                  <div key={data.country} className="flex items-center space-x-3">
                    <RadioGroupItem value={data.country} id={data.country} />
                    <Label 
                      htmlFor={data.country} 
                      className="flex-1 cursor-pointer p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{travel?.flag || "🏥"}</span>
                          <div>
                            <span className="font-medium">{data.country}</span>
                            <p className="text-xs text-muted-foreground">
                              {data.clinic_count} cliniques • Taux: {data.avg_success_rate ? `${data.avg_success_rate}%` : "N/D"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <p className="text-muted-foreground">FIV dès</p>
                          <p className="font-semibold text-primary">
                            {data.min_fiv_base?.toLocaleString() || data.avg_fiv_base?.toLocaleString() || "N/D"}€
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Organisation du séjour
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Estimez vos besoins en déplacement et hébergement
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="font-medium">Nombre de voyages prévus</Label>
                <p className="text-sm text-muted-foreground">
                  Généralement 2 voyages (bilan + ponction/transfert)
                </p>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[formData.nombreVoyages]}
                    onValueChange={([value]) => setFormData({ ...formData, nombreVoyages: value })}
                    min={1}
                    max={4}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-primary w-12 text-center">
                    {formData.nombreVoyages}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-medium">Nuits par voyage</Label>
                <p className="text-sm text-muted-foreground">
                  En moyenne 3-5 nuits par déplacement
                </p>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[formData.nombreNuits]}
                    onValueChange={([value]) => setFormData({ ...formData, nombreNuits: value })}
                    min={1}
                    max={10}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-primary w-12 text-center">
                    {formData.nombreNuits}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-medium">Nombre de personnes</Label>
                <RadioGroup
                  value={formData.nombrePersonnes.toString()}
                  onValueChange={(value) => setFormData({ ...formData, nombrePersonnes: parseInt(value) })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="1p" />
                    <Label htmlFor="1p">1 personne</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="2p" />
                    <Label htmlFor="2p">2 personnes</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );
    }
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Button variant="ghost" className="mb-6" onClick={() => setShowResults(false)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Modifier les paramètres
            </Button>

            <Card className="shadow-large border-2 border-primary/20">
              <CardHeader className="text-center pb-2">
                <div className="text-4xl mb-4">{results.travelData.flag}</div>
                <CardTitle className="text-2xl">Estimation du coût total</CardTitle>
                <CardDescription>
                  {formData.typeTraitement === "fiv" ? "FIV/ICSI" : formData.typeTraitement === "donOvocytes" ? "Don d'ovocytes" : "Insémination"} en {formData.pays}
                </CardDescription>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Database className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Basé sur les prix de {results.paysData.clinic_count} cliniques
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main result */}
                <div className="text-center py-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-2">Budget estimé</p>
                  <p className="text-4xl font-bold text-foreground mb-1">
                    {results.total.min.toLocaleString()}€ - {results.total.max.toLocaleString()}€
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ({formData.nombreVoyages} voyage{formData.nombreVoyages > 1 ? "s" : ""}, {formData.nombreNuits} nuits/voyage)
                  </p>
                </div>

                {/* Breakdown */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Détail des coûts</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Stethoscope className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-foreground">Traitement médical</p>
                          <p className="text-sm text-muted-foreground">Clinique et médicaments</p>
                        </div>
                      </div>
                      <span className="font-bold text-blue-600">
                        {results.traitement.min.toLocaleString()}€ - {results.traitement.max.toLocaleString()}€
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Plane className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-foreground">Transport aérien</p>
                          <p className="text-sm text-muted-foreground">{formData.nombrePersonnes} pers. × {formData.nombreVoyages} voyage(s)</p>
                        </div>
                      </div>
                      <span className="font-bold text-purple-600">
                        {results.transport.min.toLocaleString()}€ - {results.transport.max.toLocaleString()}€
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Hotel className="w-5 h-5 text-amber-600" />
                        <div>
                          <p className="font-medium text-foreground">Hébergement</p>
                          <p className="text-sm text-muted-foreground">{formData.nombreNuits} nuits × {formData.nombreVoyages} séjour(s)</p>
                        </div>
                      </div>
                      <span className="font-bold text-amber-600">
                        {results.hebergement.toLocaleString()}€
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Frais annexes</p>
                          <p className="text-sm text-muted-foreground">Repas, transports locaux...</p>
                        </div>
                      </div>
                      <span className="font-bold text-foreground">
                        ~{results.annexes.toLocaleString()}€
                      </span>
                    </div>
                  </div>
                </div>

                {/* Country info */}
                <div className="p-4 bg-muted/50 rounded-xl space-y-2">
                  <h4 className="font-medium text-foreground">Infos {formData.pays}</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Taux de réussite moyen :</span>
                      <span className="ml-2 font-medium">
                        {results.paysData.avg_success_rate ? `${results.paysData.avg_success_rate}%` : "Non disponible"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Délai d'attente :</span>
                      <span className="ml-2 font-medium">{results.travelData.delaiAttente}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Prix FIV moyen :</span>
                      <span className="ml-2 font-medium">
                        {results.paysData.avg_fiv_base?.toLocaleString() || "N/D"}€
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cliniques référencées :</span>
                      <span className="ml-2 font-medium">{results.paysData.clinic_count}</span>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-800 dark:text-amber-200">Estimation indicative</p>
                      <p className="text-amber-700 dark:text-amber-300">
                        Ces montants sont basés sur les tarifs réels des cliniques de notre base de données. 
                        Les prix peuvent varier selon la clinique, les protocoles et les médicaments nécessaires.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <NavLink to={`/carte-cliniques?country=${encodeURIComponent(formData.pays)}`} className="flex-1">
                    <Button className="w-full" size="lg">
                      <MapPin className="w-4 h-4 mr-2" />
                      Voir les cliniques en {formData.pays}
                    </Button>
                  </NavLink>
                  <NavLink to="/diagnostic" className="flex-1">
                    <Button variant="outline" className="w-full" size="lg">
                      Faire mon diagnostic gratuit
                    </Button>
                  </NavLink>
                </div>
              </CardContent>
            </Card>

            {/* Other simulators */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <NavLink to="/simulateurs/chances-succes">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Chances de succès</h3>
                        <p className="text-sm text-muted-foreground">Estimez vos probabilités selon votre profil</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </NavLink>
              <NavLink to="/simulateurs/remboursement">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Euro className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Remboursement</h3>
                        <p className="text-sm text-muted-foreground">Ce que votre mutuelle peut rembourser</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </NavLink>
            </div>
          </div>
        </main>

        <Footer />
        <ChatWidget />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Euro className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Simulateur Coût par Pays
            </h1>
            <p className="text-muted-foreground">
              Estimez le budget total de votre traitement PMA à l'étranger
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-primary">
              <Database className="w-4 h-4" />
              <span>Prix basés sur les données réelles des cliniques</span>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full transition-colors ${
                  s === step ? "bg-primary" : s < step ? "bg-primary/50" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Form */}
          <Card className="shadow-large">
            <CardContent className="p-6 md:p-8">
              {renderStep()}

              {/* Navigation */}
              {!loading && (
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Précédent
                  </Button>
                  
                  {step < 3 ? (
                    <Button onClick={() => setStep(step + 1)}>
                      Suivant
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={() => setShowResults(true)} disabled={!formData.pays}>
                      Voir les résultats
                      <CheckCircle2 className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info */}
          <div className="mt-6 p-4 bg-muted/50 rounded-xl text-sm text-muted-foreground text-center">
            <p>
              💡 Cette simulation est basée sur les prix réels des cliniques de notre base de données.
              Les montants sont donnés à titre indicatif.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default SimulateurCoutPays;
