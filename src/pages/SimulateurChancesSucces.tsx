import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { 
  TrendingUp, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2,
  Info,
  AlertTriangle,
  Sparkles,
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

// Modèle simplifié basé sur les statistiques publiées
const calculateSuccessRate = (
  age: number,
  amh: string,
  spermQuality: string,
  previousAttempts: number,
  embryoQuality: string,
  treatmentType: string
): number => {
  // Base rate by age (données ESHRE approximatives)
  let baseRate = 0;
  if (age < 30) baseRate = 45;
  else if (age < 35) baseRate = 40;
  else if (age < 38) baseRate = 32;
  else if (age < 40) baseRate = 25;
  else if (age < 42) baseRate = 18;
  else if (age < 44) baseRate = 10;
  else baseRate = 5;

  // Ajustement AMH
  let amhModifier = 0;
  if (amh === "tres_bas") amhModifier = -10;
  else if (amh === "bas") amhModifier = -5;
  else if (amh === "normal") amhModifier = 0;
  else if (amh === "eleve") amhModifier = 3;

  // Ajustement qualité sperme
  let spermModifier = 0;
  if (spermQuality === "severe") spermModifier = -8;
  else if (spermQuality === "modere") spermModifier = -4;
  else if (spermQuality === "leger") spermModifier = -2;

  // Ajustement tentatives précédentes
  let attemptModifier = 0;
  if (previousAttempts === 1) attemptModifier = 0;
  else if (previousAttempts === 2) attemptModifier = -3;
  else if (previousAttempts === 3) attemptModifier = -5;
  else attemptModifier = -8;

  // Ajustement qualité embryonnaire
  let embryoModifier = 0;
  if (embryoQuality === "top") embryoModifier = 8;
  else if (embryoQuality === "bonne") embryoModifier = 4;
  else if (embryoQuality === "moyenne") embryoModifier = 0;
  else embryoModifier = -5;

  // Ajustement type de traitement
  let treatmentModifier = 0;
  if (treatmentType === "don_ovocytes") treatmentModifier = 15; // Améliore car utilise ovocytes de donneuse jeune

  // Calcul final
  let finalRate = baseRate + amhModifier + spermModifier + attemptModifier + embryoModifier + treatmentModifier;
  
  // Borner entre 2% et 70%
  finalRate = Math.max(2, Math.min(70, finalRate));
  
  return Math.round(finalRate);
};

const SimulateurChancesSucces = () => {
  useSEO({
    title: "Simulateur Chances de Succès FIV - Estimation personnalisée",
    description: "Estimez vos chances de réussite FIV/ICSI selon votre âge, réserve ovarienne et facteurs personnels. Calcul basé sur les statistiques ESHRE.",
    type: "website",
  });

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: 35,
    amh: "normal" as "tres_bas" | "bas" | "normal" | "eleve" | "inconnu",
    spermQuality: "normal" as "normal" | "leger" | "modere" | "severe",
    previousAttempts: 0,
    embryoQuality: "inconnu" as "top" | "bonne" | "moyenne" | "faible" | "inconnu",
    treatmentType: "fiv" as "fiv" | "don_ovocytes",
  });

  const [showResults, setShowResults] = useState(false);

  const successRate = calculateSuccessRate(
    formData.age,
    formData.amh,
    formData.spermQuality,
    formData.previousAttempts,
    formData.embryoQuality,
    formData.treatmentType
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Votre âge
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                L'âge est le facteur le plus déterminant pour le succès d'une FIV
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <span className="text-5xl font-bold text-primary">
                  {formData.age}
                </span>
                <span className="text-2xl text-muted-foreground ml-2">ans</span>
              </div>
              <Slider
                value={[formData.age]}
                onValueChange={([value]) => setFormData({ ...formData, age: value })}
                min={20}
                max={48}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>20 ans</span>
                <span>48 ans</span>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground">
                <Info className="w-4 h-4 inline mr-2" />
                Les taux de réussite diminuent significativement après 35 ans, et plus fortement après 40 ans.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Type de traitement
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Le don d'ovocytes offre généralement de meilleurs taux de réussite
              </p>
            </div>

            <RadioGroup
              value={formData.treatmentType}
              onValueChange={(value) => setFormData({ ...formData, treatmentType: value as "fiv" | "don_ovocytes" })}
              className="grid gap-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="fiv" id="fiv" />
                <Label htmlFor="fiv" className="flex-1 cursor-pointer p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <span className="font-medium">FIV/ICSI avec mes propres ovocytes</span>
                  <p className="text-sm text-muted-foreground">Les résultats dépendent de votre âge et réserve ovarienne</p>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="don_ovocytes" id="don_ovocytes" />
                <Label htmlFor="don_ovocytes" className="flex-1 cursor-pointer p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <span className="font-medium">FIV avec don d'ovocytes</span>
                  <p className="text-sm text-muted-foreground">Taux de réussite plus élevés car donneuses jeunes</p>
                </Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Réserve ovarienne (AMH)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 ml-2 inline text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>L'AMH (Hormone Anti-Müllérienne) indique votre réserve ovarienne. Un taux normal est entre 1 et 4 ng/ml.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Quel est votre niveau d'AMH ?
              </p>
            </div>

            <RadioGroup
              value={formData.amh}
              onValueChange={(value) => setFormData({ ...formData, amh: value as any })}
              className="grid gap-3"
            >
              {[
                { value: "tres_bas", label: "Très bas", desc: "< 0.5 ng/ml" },
                { value: "bas", label: "Bas", desc: "0.5 - 1 ng/ml" },
                { value: "normal", label: "Normal", desc: "1 - 4 ng/ml" },
                { value: "eleve", label: "Élevé", desc: "> 4 ng/ml" },
                { value: "inconnu", label: "Je ne sais pas", desc: "" },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <span className="font-medium">{option.label}</span>
                    {option.desc && <span className="text-sm text-muted-foreground ml-2">({option.desc})</span>}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Qualité du sperme
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Y a-t-il une anomalie connue du spermogramme ?
              </p>
            </div>

            <RadioGroup
              value={formData.spermQuality}
              onValueChange={(value) => setFormData({ ...formData, spermQuality: value as any })}
              className="grid gap-3"
            >
              {[
                { value: "normal", label: "Normal", desc: "Pas d'anomalie détectée" },
                { value: "leger", label: "Anomalie légère", desc: "Légère oligospermie ou asthénospermie" },
                { value: "modere", label: "Anomalie modérée", desc: "Oligoasthénospermie" },
                { value: "severe", label: "Anomalie sévère", desc: "OAT sévère ou azoospermie" },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={`sperm-${option.value}`} />
                  <Label htmlFor={`sperm-${option.value}`} className="flex-1 cursor-pointer p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <span className="font-medium">{option.label}</span>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Tentatives précédentes
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Combien de cycles de FIV avez-vous déjà effectués ?
              </p>
            </div>

            <RadioGroup
              value={formData.previousAttempts.toString()}
              onValueChange={(value) => setFormData({ ...formData, previousAttempts: parseInt(value) })}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { value: "0", label: "Première FIV" },
                { value: "1", label: "1 tentative" },
                { value: "2", label: "2 tentatives" },
                { value: "3", label: "3 tentatives" },
                { value: "4", label: "4+ tentatives" },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={`attempt-${option.value}`} />
                  <Label htmlFor={`attempt-${option.value}`} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
    }
  };

  if (showResults) {
    const getResultColor = () => {
      if (successRate >= 40) return "text-emerald-600";
      if (successRate >= 25) return "text-amber-600";
      return "text-orange-600";
    };

    const getResultBg = () => {
      if (successRate >= 40) return "from-emerald-500/10 to-teal-500/10";
      if (successRate >= 25) return "from-amber-500/10 to-orange-500/10";
      return "from-orange-500/10 to-red-500/10";
    };

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
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Estimation de vos chances de succès</CardTitle>
                <CardDescription>
                  {formData.treatmentType === "don_ovocytes" ? "FIV avec don d'ovocytes" : "FIV/ICSI"} • {formData.age} ans
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main result */}
                <div className={`text-center py-8 bg-gradient-to-br ${getResultBg()} rounded-xl`}>
                  <p className="text-sm text-muted-foreground mb-2">Probabilité estimée de grossesse par cycle</p>
                  <p className={`text-6xl font-bold ${getResultColor()} mb-2`}>
                    {successRate}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Soit environ {Math.round(100 / successRate)} cycle(s) en moyenne pour une grossesse
                  </p>
                </div>

                {/* Factors breakdown */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Facteurs pris en compte</h3>
                  
                  <div className="grid gap-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Âge</span>
                      <span className="font-medium">{formData.age} ans</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Type de traitement</span>
                      <span className="font-medium">{formData.treatmentType === "don_ovocytes" ? "Don d'ovocytes" : "FIV/ICSI"}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Réserve ovarienne (AMH)</span>
                      <span className="font-medium capitalize">{formData.amh.replace("_", " ")}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Qualité spermatique</span>
                      <span className="font-medium capitalize">{formData.spermQuality}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Tentatives précédentes</span>
                      <span className="font-medium">{formData.previousAttempts === 0 ? "Première FIV" : `${formData.previousAttempts} tentative(s)`}</span>
                    </div>
                  </div>
                </div>

                {/* Cumulative rates */}
                <div className="p-4 bg-primary/5 rounded-xl">
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Taux cumulé sur plusieurs cycles
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">{successRate}%</p>
                      <p className="text-xs text-muted-foreground">1 cycle</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{Math.min(95, Math.round(100 - Math.pow(1 - successRate/100, 2) * 100))}%</p>
                      <p className="text-xs text-muted-foreground">2 cycles</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{Math.min(98, Math.round(100 - Math.pow(1 - successRate/100, 3) * 100))}%</p>
                      <p className="text-xs text-muted-foreground">3 cycles</p>
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <AlertTriangle className="w-4 h-4 inline mr-2" />
                    <strong>Important :</strong> Cette estimation est basée sur des statistiques générales et ne remplace pas l'avis de votre médecin. 
                    Chaque situation est unique et de nombreux facteurs individuels peuvent influencer vos chances réelles.
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
                      Trouver les meilleures cliniques
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
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2 font-heading">
              Chances de Succès FIV
            </h1>
            <p className="text-muted-foreground">
              Estimez votre probabilité de grossesse par cycle
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Étape {step} sur 5</span>
              <span className="text-sm font-medium text-primary">{Math.round((step / 5) * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
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

            {step < 5 ? (
              <Button onClick={() => setStep(step + 1)} className="bg-primary hover:bg-primary-hover text-primary-foreground">
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => setShowResults(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Voir mon estimation
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

export default SimulateurChancesSucces;
