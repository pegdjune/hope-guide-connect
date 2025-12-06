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
  Info
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

// Données par pays (basées sur les témoignages du forum)
const PAYS_DATA = {
  espagne: {
    nom: "Espagne",
    flag: "🇪🇸",
    villes: ["Barcelone", "Madrid", "Valence", "Alicante"],
    prixFIV: { min: 4500, max: 7500 },
    prixDonOvocytes: { min: 5500, max: 9000 },
    prixIAC: { min: 800, max: 1500 },
    avion: { min: 100, max: 250 },
    hotel: 80, // par nuit
    tauxReussite: "45-55%",
    delaiAttente: "1-2 mois",
  },
  republiqueTcheque: {
    nom: "République Tchèque",
    flag: "🇨🇿",
    villes: ["Prague", "Brno"],
    prixFIV: { min: 2500, max: 4500 },
    prixDonOvocytes: { min: 4000, max: 6000 },
    prixIAC: { min: 500, max: 900 },
    avion: { min: 80, max: 200 },
    hotel: 60,
    tauxReussite: "40-50%",
    delaiAttente: "1-3 mois",
  },
  portugal: {
    nom: "Portugal",
    flag: "🇵🇹",
    villes: ["Lisbonne", "Porto"],
    prixFIV: { min: 3500, max: 5500 },
    prixDonOvocytes: { min: 5000, max: 7500 },
    prixIAC: { min: 700, max: 1200 },
    avion: { min: 80, max: 180 },
    hotel: 70,
    tauxReussite: "42-52%",
    delaiAttente: "1-2 mois",
  },
  grece: {
    nom: "Grèce",
    flag: "🇬🇷",
    villes: ["Athènes", "Thessalonique"],
    prixFIV: { min: 2800, max: 4200 },
    prixDonOvocytes: { min: 4500, max: 6500 },
    prixIAC: { min: 600, max: 1000 },
    avion: { min: 150, max: 300 },
    hotel: 65,
    tauxReussite: "40-48%",
    delaiAttente: "1-2 mois",
  },
  belgique: {
    nom: "Belgique",
    flag: "🇧🇪",
    villes: ["Bruxelles", "Gand", "Liège"],
    prixFIV: { min: 3000, max: 5000 },
    prixDonOvocytes: { min: 5000, max: 8000 },
    prixIAC: { min: 600, max: 1100 },
    avion: { min: 50, max: 150 },
    hotel: 90,
    tauxReussite: "45-55%",
    delaiAttente: "2-4 mois",
  },
  danemark: {
    nom: "Danemark",
    flag: "🇩🇰",
    villes: ["Copenhague", "Aarhus"],
    prixFIV: { min: 4000, max: 6000 },
    prixDonOvocytes: { min: 6000, max: 9000 },
    prixIAC: { min: 800, max: 1400 },
    avion: { min: 100, max: 250 },
    hotel: 120,
    tauxReussite: "45-55%",
    delaiAttente: "1-2 mois",
  },
};

type PaysKey = keyof typeof PAYS_DATA;

const SimulateurCoutPays = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    typeTraitement: "fiv" as "fiv" | "donOvocytes" | "iac",
    pays: "espagne" as PaysKey,
    nombreVoyages: 2,
    nombreNuits: 4,
    nombrePersonnes: 2,
  });

  const [showResults, setShowResults] = useState(false);

  const calculateCosts = () => {
    const paysData = PAYS_DATA[formData.pays];
    
    // Coût traitement
    let prixTraitement = { min: 0, max: 0 };
    if (formData.typeTraitement === "fiv") {
      prixTraitement = paysData.prixFIV;
    } else if (formData.typeTraitement === "donOvocytes") {
      prixTraitement = paysData.prixDonOvocytes;
    } else {
      prixTraitement = paysData.prixIAC;
    }

    // Coût transport
    const coutAvion = {
      min: paysData.avion.min * formData.nombrePersonnes * formData.nombreVoyages,
      max: paysData.avion.max * formData.nombrePersonnes * formData.nombreVoyages,
    };

    // Coût hébergement
    const coutHotel = paysData.hotel * formData.nombreNuits * formData.nombreVoyages;

    // Frais annexes (repas, transports locaux, etc.) - estimation
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
      paysData,
    };
  };

  const results = calculateCosts();

  const renderStep = () => {
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
              <p className="text-muted-foreground text-sm mb-4">
                Où souhaitez-vous réaliser votre traitement ?
              </p>
            </div>

            <RadioGroup
              value={formData.pays}
              onValueChange={(value) => setFormData({ ...formData, pays: value as PaysKey })}
              className="grid gap-3"
            >
              {Object.entries(PAYS_DATA).map(([key, data]) => (
                <div key={key} className="flex items-center space-x-3">
                  <RadioGroupItem value={key} id={key} />
                  <Label 
                    htmlFor={key} 
                    className="flex-1 cursor-pointer p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{data.flag}</span>
                        <div>
                          <span className="font-medium">{data.nom}</span>
                          <p className="text-xs text-muted-foreground">{data.villes.join(", ")}</p>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-muted-foreground">FIV dès</p>
                        <p className="font-semibold text-primary">{data.prixFIV.min.toLocaleString()}€</p>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
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

  if (showResults) {
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
                <div className="text-4xl mb-4">{results.paysData.flag}</div>
                <CardTitle className="text-2xl">Estimation du coût total</CardTitle>
                <CardDescription>
                  {formData.typeTraitement === "fiv" ? "FIV/ICSI" : formData.typeTraitement === "donOvocytes" ? "Don d'ovocytes" : "Insémination"} en {results.paysData.nom}
                </CardDescription>
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
                  <h4 className="font-medium text-foreground">Infos {results.paysData.nom}</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Taux de réussite :</span>
                      <span className="ml-2 font-medium">{results.paysData.tauxReussite}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Délai d'attente :</span>
                      <span className="ml-2 font-medium">{results.paysData.delaiAttente}</span>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-4 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground">
                    <Info className="w-4 h-4 inline mr-2" />
                    Ces estimations sont basées sur des moyennes et peuvent varier significativement selon la clinique choisie, 
                    la période de l'année et vos choix personnels. Demandez des devis précis aux cliniques.
                  </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild className="flex-1" variant="outline">
                    <NavLink to="/simulateurs">
                      Autres simulateurs
                    </NavLink>
                  </Button>
                  <Button asChild className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground">
                    <NavLink to={`/carte-cliniques?country=${formData.pays}`} className="flex items-center justify-center gap-2">
                      Voir les cliniques en {results.paysData.nom}
                      <ArrowRight className="w-4 h-4" />
                    </NavLink>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <ChatWidget />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <NavLink 
            to="/simulateurs" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tous les simulateurs
          </NavLink>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Euro className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2 font-heading">
              Coût PMA par Pays
            </h1>
            <p className="text-muted-foreground">
              Comparez les coûts totaux selon votre destination
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Étape {step} sur 3</span>
              <span className="text-sm font-medium text-primary">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <Card className="shadow-large mb-8">
            <CardContent className="p-6">
              {renderStep()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)} className="bg-primary hover:bg-primary-hover text-primary-foreground">
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => setShowResults(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Calculer le budget
              </Button>
            )}
          </div>
        </div>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
};

export default SimulateurCoutPays;
