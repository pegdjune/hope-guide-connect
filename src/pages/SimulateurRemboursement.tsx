import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  ArrowLeft, 
  ArrowRight, 
  Calculator,
  Info,
  CheckCircle2,
  Euro,
  Building2,
  Heart
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSEO } from "@/hooks/useSEO";

// Barèmes Sécurité Sociale (approximatifs basés sur les données CNSE)
const TARIFS_SS = {
  fiv: {
    label: "FIV/ICSI",
    baseRemboursement: 100, // 100% base SS
    plafond: 4500, // Plafond approximatif
  },
  iac: {
    label: "Insémination (IAC/IAD)",
    baseRemboursement: 100,
    plafond: 1200,
  },
  tec: {
    label: "Transfert embryon congelé (TEC)",
    baseRemboursement: 100,
    plafond: 1500,
  },
  don_ovocytes: {
    label: "Don d'ovocytes",
    baseRemboursement: 100,
    plafond: 6000,
  },
};

// Niveaux de mutuelle
const NIVEAUX_MUTUELLE = {
  basique: { label: "Basique", complement: 0, depassements: 0 },
  standard: { label: "Standard", complement: 100, depassements: 50 },
  premium: { label: "Premium", complement: 200, depassements: 100 },
  optimale: { label: "Optimale", complement: 300, depassements: 150 },
};

const SimulateurRemboursement = () => {
  useSEO({
    title: "Simulateur Remboursement PMA - Sécurité Sociale et Mutuelle",
    description: "Estimez vos remboursements PMA : Sécurité Sociale et mutuelle. Calculez le reste à charge pour FIV, ICSI, don d'ovocytes en France.",
    type: "website",
  });

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    typeTraitement: "fiv" as keyof typeof TARIFS_SS,
    coutTotal: 5000,
    enFrance: true,
    depassementsHonoraires: 500,
    niveauMutuelle: "standard" as keyof typeof NIVEAUX_MUTUELLE,
    tentative: 1,
  });

  const [showResults, setShowResults] = useState(false);

  // Calcul des remboursements
  const calculateRemboursement = () => {
    const tarif = TARIFS_SS[formData.typeTraitement];
    const mutuelle = NIVEAUX_MUTUELLE[formData.niveauMutuelle];

    // Vérifier si éligible SS (en France, moins de 43 ans, tentatives limitées)
    const eligibleSS = formData.enFrance && formData.tentative <= 4;
    
    // Base Sécurité Sociale (100% du tarif de base, plafonné)
    const baseRemboursableSS = eligibleSS 
      ? Math.min(formData.coutTotal, tarif.plafond) 
      : 0;
    const remboursementSS = baseRemboursableSS * (tarif.baseRemboursement / 100);

    // Dépassements d'honoraires
    const depassements = formData.depassementsHonoraires;
    const remboursementDepassementsMutuelle = Math.min(
      depassements,
      mutuelle.depassements * (depassements > 0 ? 1 : 0)
    );

    // Complément mutuelle sur le reste
    const resteApresSSS = formData.coutTotal - remboursementSS;
    const remboursementComplementMutuelle = Math.min(
      resteApresSSS - depassements,
      mutuelle.complement
    );

    const totalMutuelle = remboursementDepassementsMutuelle + remboursementComplementMutuelle;
    const totalRembourse = remboursementSS + totalMutuelle;
    const resteACharge = formData.coutTotal - totalRembourse;

    return {
      remboursementSS,
      totalMutuelle,
      totalRembourse,
      resteACharge,
      pourcentageRembourse: Math.round((totalRembourse / formData.coutTotal) * 100),
      eligibleSS,
    };
  };

  const results = calculateRemboursement();

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
                Sélectionnez le type de traitement PMA envisagé
              </p>
            </div>

            <RadioGroup
              value={formData.typeTraitement}
              onValueChange={(value) => setFormData({ ...formData, typeTraitement: value as keyof typeof TARIFS_SS })}
              className="grid gap-3"
            >
              {Object.entries(TARIFS_SS).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-3">
                  <RadioGroupItem value={key} id={key} />
                  <Label 
                    htmlFor={key} 
                    className="flex-1 cursor-pointer p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <span className="font-medium">{value.label}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      (plafond SS : {value.plafond.toLocaleString()}€)
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Coût estimé du traitement
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Indiquez le coût total prévu (devis de la clinique)
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <span className="text-4xl font-bold text-primary">
                  {formData.coutTotal.toLocaleString()}€
                </span>
              </div>
              <Slider
                value={[formData.coutTotal]}
                onValueChange={([value]) => setFormData({ ...formData, coutTotal: value })}
                min={500}
                max={15000}
                step={100}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>500€</span>
                <span>15 000€</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div>
                <Label className="text-base font-medium flex items-center gap-2">
                  Dépassements d'honoraires
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Les dépassements d'honoraires sont les frais facturés au-delà du tarif de convention de la Sécurité Sociale.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-foreground">
                  {formData.depassementsHonoraires.toLocaleString()}€
                </span>
              </div>
              <Slider
                value={[formData.depassementsHonoraires]}
                onValueChange={([value]) => setFormData({ ...formData, depassementsHonoraires: value })}
                min={0}
                max={3000}
                step={50}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Votre situation
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Ces informations impactent votre éligibilité au remboursement
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <div>
                    <Label className="font-medium">Traitement en France</Label>
                    <p className="text-sm text-muted-foreground">
                      La SS ne rembourse que les traitements en France
                    </p>
                  </div>
                </div>
                <Switch
                  checked={formData.enFrance}
                  onCheckedChange={(checked) => setFormData({ ...formData, enFrance: checked })}
                />
              </div>

              <div className="space-y-3">
                <Label className="font-medium flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Numéro de tentative
                </Label>
                <p className="text-sm text-muted-foreground">
                  La SS rembourse jusqu'à 4 tentatives de FIV (6 pour les IAC)
                </p>
                <RadioGroup
                  value={formData.tentative.toString()}
                  onValueChange={(value) => setFormData({ ...formData, tentative: parseInt(value) })}
                  className="grid grid-cols-4 gap-3"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} className="flex items-center space-x-2">
                      <RadioGroupItem value={num.toString()} id={`tentative-${num}`} />
                      <Label htmlFor={`tentative-${num}`} className="cursor-pointer">
                        {num === 6 ? "6+" : num}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Niveau de mutuelle
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Sélectionnez le niveau de couverture de votre complémentaire santé
              </p>
            </div>

            <RadioGroup
              value={formData.niveauMutuelle}
              onValueChange={(value) => setFormData({ ...formData, niveauMutuelle: value as keyof typeof NIVEAUX_MUTUELLE })}
              className="grid gap-3"
            >
              {Object.entries(NIVEAUX_MUTUELLE).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-3">
                  <RadioGroupItem value={key} id={key} />
                  <Label 
                    htmlFor={key} 
                    className="flex-1 cursor-pointer p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{value.label}</span>
                      <span className="text-sm text-muted-foreground">
                        Jusqu'à {value.complement}€ complément
                      </span>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="p-4 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground">
                <Info className="w-4 h-4 inline mr-2" />
                Si vous ne connaissez pas votre niveau, consultez votre contrat ou contactez votre mutuelle.
              </p>
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
            {/* Back button */}
            <Button variant="ghost" className="mb-6" onClick={() => setShowResults(false)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Modifier les paramètres
            </Button>

            <Card className="shadow-large border-2 border-primary/20">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Estimation de vos remboursements</CardTitle>
                <CardDescription>
                  Pour un {TARIFS_SS[formData.typeTraitement].label} à {formData.coutTotal.toLocaleString()}€
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main result */}
                <div className="text-center py-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-2">Reste à votre charge</p>
                  <p className="text-5xl font-bold text-foreground mb-2">
                    {results.resteACharge.toLocaleString()}€
                  </p>
                  <p className="text-primary font-medium">
                    {results.pourcentageRembourse}% remboursé
                  </p>
                </div>

                {/* Breakdown */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Détail des remboursements</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="font-medium text-foreground">Sécurité Sociale</p>
                          <p className="text-sm text-muted-foreground">
                            {results.eligibleSS ? "100% du tarif de base" : "Non éligible (étranger ou tentatives épuisées)"}
                          </p>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-emerald-600">
                        {results.remboursementSS.toLocaleString()}€
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-foreground">Mutuelle</p>
                          <p className="text-sm text-muted-foreground">
                            Niveau {NIVEAUX_MUTUELLE[formData.niveauMutuelle].label}
                          </p>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-blue-600">
                        {results.totalMutuelle.toLocaleString()}€
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg border-2 border-primary/20">
                      <div className="flex items-center gap-3">
                        <Euro className="w-5 h-5 text-primary" />
                        <p className="font-semibold text-foreground">Total remboursé</p>
                      </div>
                      <span className="text-xl font-bold text-primary">
                        {results.totalRembourse.toLocaleString()}€
                      </span>
                    </div>
                  </div>
                </div>

                {/* Warnings */}
                {!results.eligibleSS && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <Info className="w-4 h-4 inline mr-2" />
                      {!formData.enFrance 
                        ? "Les traitements à l'étranger ne sont généralement pas pris en charge par la Sécurité Sociale."
                        : "Vous avez dépassé le nombre de tentatives prises en charge par la Sécurité Sociale."
                      }
                    </p>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="p-4 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground">
                    <strong>Avertissement :</strong> Ces estimations sont fournies à titre indicatif et basées sur les barèmes généraux. 
                    Le remboursement réel peut varier selon votre situation personnelle, votre contrat de mutuelle et les décisions de votre caisse d'assurance maladie. 
                    Nous vous recommandons de contacter votre CPAM et votre mutuelle pour obtenir une estimation précise.
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
                    <NavLink to="/diagnostic" className="flex items-center justify-center gap-2">
                      Comparer les cliniques
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
          {/* Back link */}
          <NavLink 
            to="/simulateurs" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tous les simulateurs
          </NavLink>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2 font-heading">
              Simulateur de Remboursement
            </h1>
            <p className="text-muted-foreground">
              Estimez la prise en charge Sécurité Sociale et Mutuelle
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Étape {step} sur 4</span>
              <span className="text-sm font-medium text-primary">{Math.round((step / 4) * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
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

            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} className="bg-primary hover:bg-primary-hover text-primary-foreground">
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => setShowResults(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Voir les résultats
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

export default SimulateurRemboursement;
