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
import { Input } from "@/components/ui/input";
import { 
  Wallet, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2,
  Info,
  Stethoscope,
  Plane,
  Hotel,
  Clock,
  Pill,
  Baby,
  Euro
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

const SimulateurBudgetGlobal = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Traitement
    location: "france" as "france" | "etranger",
    treatmentType: "fiv" as "fiv" | "don_ovocytes" | "iac",
    treatmentCost: 5000,
    medicationCost: 1500,
    numberOfCycles: 2,
    
    // Voyage (si étranger)
    flightCost: 300,
    hotelPerNight: 80,
    nightsPerTrip: 4,
    tripsPerCycle: 2,
    mealsAndTransport: 50,
    
    // Perte de revenus
    daysOff: 5,
    dailyIncome: 150,
    partnerDaysOff: 3,
    
    // Extras
    psychologicalSupport: true,
    psychologyCost: 60,
    psychologySessions: 10,
    acupuncture: false,
    acupunctureCost: 50,
    acupunctureSessions: 8,
  });

  const [showResults, setShowResults] = useState(false);

  const calculateBudget = () => {
    // Coûts médicaux
    const medicalPerCycle = formData.treatmentCost + formData.medicationCost;
    const totalMedical = medicalPerCycle * formData.numberOfCycles;

    // Coûts voyage (si étranger)
    let travelPerCycle = 0;
    if (formData.location === "etranger") {
      const flightPerTrip = formData.flightCost * 2; // 2 personnes
      const hotelPerTrip = formData.hotelPerNight * formData.nightsPerTrip;
      const mealsPerTrip = formData.mealsAndTransport * formData.nightsPerTrip;
      travelPerCycle = (flightPerTrip + hotelPerTrip + mealsPerTrip) * formData.tripsPerCycle;
    }
    const totalTravel = travelPerCycle * formData.numberOfCycles;

    // Perte de revenus
    const incomePerCycle = (formData.daysOff + formData.partnerDaysOff) * formData.dailyIncome;
    const totalIncome = incomePerCycle * formData.numberOfCycles;

    // Extras
    let totalExtras = 0;
    if (formData.psychologicalSupport) {
      totalExtras += formData.psychologyCost * formData.psychologySessions;
    }
    if (formData.acupuncture) {
      totalExtras += formData.acupunctureCost * formData.acupunctureSessions * formData.numberOfCycles;
    }

    // Total
    const grandTotal = totalMedical + totalTravel + totalIncome + totalExtras;

    return {
      medical: totalMedical,
      travel: totalTravel,
      income: totalIncome,
      extras: totalExtras,
      total: grandTotal,
      perCycle: Math.round(grandTotal / formData.numberOfCycles),
    };
  };

  // Fix the typo in psychologySettings
  const results = {
    ...calculateBudget(),
  };

  // Recalculate properly
  const calculateBudgetFixed = () => {
    const medicalPerCycle = formData.treatmentCost + formData.medicationCost;
    const totalMedical = medicalPerCycle * formData.numberOfCycles;

    let travelPerCycle = 0;
    if (formData.location === "etranger") {
      const flightPerTrip = formData.flightCost * 2;
      const hotelPerTrip = formData.hotelPerNight * formData.nightsPerTrip;
      const mealsPerTrip = formData.mealsAndTransport * formData.nightsPerTrip;
      travelPerCycle = (flightPerTrip + hotelPerTrip + mealsPerTrip) * formData.tripsPerCycle;
    }
    const totalTravel = travelPerCycle * formData.numberOfCycles;

    const incomePerCycle = (formData.daysOff + formData.partnerDaysOff) * formData.dailyIncome;
    const totalIncome = incomePerCycle * formData.numberOfCycles;

    let totalExtras = 0;
    if (formData.psychologicalSupport) {
      totalExtras += formData.psychologyCost * formData.psychologySessions;
    }
    if (formData.acupuncture) {
      totalExtras += formData.acupunctureCost * formData.acupunctureSessions * formData.numberOfCycles;
    }

    const grandTotal = totalMedical + totalTravel + totalIncome + totalExtras;

    return {
      medical: totalMedical,
      travel: totalTravel,
      income: totalIncome,
      extras: totalExtras,
      total: grandTotal,
      perCycle: Math.round(grandTotal / formData.numberOfCycles),
    };
  };

  const budget = calculateBudgetFixed();

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Lieu du traitement
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Où prévoyez-vous de réaliser votre parcours PMA ?
              </p>
            </div>

            <RadioGroup
              value={formData.location}
              onValueChange={(value) => setFormData({ ...formData, location: value as "france" | "etranger" })}
              className="grid gap-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="france" id="france" />
                <Label htmlFor="france" className="flex-1 cursor-pointer p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <span className="font-medium">🇫🇷 En France</span>
                  <p className="text-sm text-muted-foreground">Prise en charge SS possible, pas de frais de voyage</p>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="etranger" id="etranger" />
                <Label htmlFor="etranger" className="flex-1 cursor-pointer p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <span className="font-medium">🌍 À l'étranger</span>
                  <p className="text-sm text-muted-foreground">Frais de voyage à prévoir, pas de remboursement SS</p>
                </Label>
              </div>
            </RadioGroup>

            <div className="space-y-4 pt-4 border-t">
              <div>
                <h3 className="font-medium text-foreground mb-2">Type de traitement</h3>
                <RadioGroup
                  value={formData.treatmentType}
                  onValueChange={(value) => setFormData({ ...formData, treatmentType: value as any })}
                  className="grid gap-2"
                >
                  {[
                    { value: "fiv", label: "FIV/ICSI" },
                    { value: "don_ovocytes", label: "Don d'ovocytes" },
                    { value: "iac", label: "Insémination (IAC/IAD)" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Coûts médicaux
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Estimez les coûts de traitement par cycle
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="font-medium flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-primary" />
                  Coût du traitement (clinique)
                </Label>
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary">{formData.treatmentCost.toLocaleString()}€</span>
                  <span className="text-muted-foreground ml-2">/ cycle</span>
                </div>
                <Slider
                  value={[formData.treatmentCost]}
                  onValueChange={([value]) => setFormData({ ...formData, treatmentCost: value })}
                  min={500}
                  max={12000}
                  step={100}
                />
              </div>

              <div className="space-y-3">
                <Label className="font-medium flex items-center gap-2">
                  <Pill className="w-4 h-4 text-primary" />
                  Coût des médicaments
                </Label>
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary">{formData.medicationCost.toLocaleString()}€</span>
                  <span className="text-muted-foreground ml-2">/ cycle</span>
                </div>
                <Slider
                  value={[formData.medicationCost]}
                  onValueChange={([value]) => setFormData({ ...formData, medicationCost: value })}
                  min={0}
                  max={4000}
                  step={100}
                />
              </div>

              <div className="space-y-3">
                <Label className="font-medium flex items-center gap-2">
                  <Baby className="w-4 h-4 text-primary" />
                  Nombre de cycles prévus
                </Label>
                <RadioGroup
                  value={formData.numberOfCycles.toString()}
                  onValueChange={(value) => setFormData({ ...formData, numberOfCycles: parseInt(value) })}
                  className="flex gap-4"
                >
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex items-center space-x-2">
                      <RadioGroupItem value={num.toString()} id={`cycle-${num}`} />
                      <Label htmlFor={`cycle-${num}`}>{num}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 3:
        if (formData.location === "france") {
          // Skip to step 4 for France
          return renderStep4();
        }
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Frais de voyage
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Estimez vos coûts de déplacement et hébergement
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="font-medium flex items-center gap-2">
                  <Plane className="w-4 h-4 text-primary" />
                  Billet d'avion A/R (par personne)
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[formData.flightCost]}
                    onValueChange={([value]) => setFormData({ ...formData, flightCost: value })}
                    min={50}
                    max={500}
                    step={10}
                    className="flex-1"
                  />
                  <span className="text-xl font-bold text-primary w-20 text-right">{formData.flightCost}€</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-medium flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-primary" />
                  Hôtel par nuit
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[formData.hotelPerNight]}
                    onValueChange={([value]) => setFormData({ ...formData, hotelPerNight: value })}
                    min={30}
                    max={200}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-xl font-bold text-primary w-20 text-right">{formData.hotelPerNight}€</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nuits par voyage</Label>
                  <Input
                    type="number"
                    value={formData.nightsPerTrip}
                    onChange={(e) => setFormData({ ...formData, nightsPerTrip: parseInt(e.target.value) || 0 })}
                    min={1}
                    max={14}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Voyages par cycle</Label>
                  <Input
                    type="number"
                    value={formData.tripsPerCycle}
                    onChange={(e) => setFormData({ ...formData, tripsPerCycle: parseInt(e.target.value) || 0 })}
                    min={1}
                    max={5}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-medium">Repas et transports locaux (par jour)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[formData.mealsAndTransport]}
                    onValueChange={([value]) => setFormData({ ...formData, mealsAndTransport: value })}
                    min={20}
                    max={150}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-xl font-bold text-primary w-20 text-right">{formData.mealsAndTransport}€</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return renderStep4();
    }
  };

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Autres coûts
        </h2>
        <p className="text-muted-foreground text-sm mb-4">
          Perte de revenus et accompagnements complémentaires
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-4 rounded-xl border border-border">
          <Label className="font-medium flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-primary" />
            Perte de revenus estimée
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Jours d'absence / cycle</Label>
              <Input
                type="number"
                value={formData.daysOff}
                onChange={(e) => setFormData({ ...formData, daysOff: parseInt(e.target.value) || 0 })}
                min={0}
                max={30}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Jours partenaire / cycle</Label>
              <Input
                type="number"
                value={formData.partnerDaysOff}
                onChange={(e) => setFormData({ ...formData, partnerDaysOff: parseInt(e.target.value) || 0 })}
                min={0}
                max={30}
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Label className="text-sm text-muted-foreground">Revenu journalier moyen</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[formData.dailyIncome]}
                onValueChange={([value]) => setFormData({ ...formData, dailyIncome: value })}
                min={0}
                max={500}
                step={10}
                className="flex-1"
              />
              <span className="font-bold text-primary w-20 text-right">{formData.dailyIncome}€</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border border-border">
            <div>
              <Label className="font-medium">Accompagnement psychologique</Label>
              <p className="text-sm text-muted-foreground">{formData.psychologyCost}€ × {formData.psychologySessions} séances</p>
            </div>
            <Switch
              checked={formData.psychologicalSupport}
              onCheckedChange={(checked) => setFormData({ ...formData, psychologicalSupport: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-border">
            <div>
              <Label className="font-medium">Acupuncture / médecines douces</Label>
              <p className="text-sm text-muted-foreground">{formData.acupunctureCost}€ × {formData.acupunctureSessions} séances / cycle</p>
            </div>
            <Switch
              checked={formData.acupuncture}
              onCheckedChange={(checked) => setFormData({ ...formData, acupuncture: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const totalSteps = formData.location === "france" ? 3 : 4;
  const currentDisplayStep = formData.location === "france" && step === 4 ? 3 : step;

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
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-2xl">Budget global estimé</CardTitle>
                <CardDescription>
                  Pour {formData.numberOfCycles} cycle(s) de {formData.treatmentType === "fiv" ? "FIV/ICSI" : formData.treatmentType === "don_ovocytes" ? "don d'ovocytes" : "insémination"}
                  {formData.location === "etranger" ? " à l'étranger" : " en France"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main result */}
                <div className="text-center py-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-2">Budget total estimé</p>
                  <p className="text-5xl font-bold text-foreground mb-2">
                    {budget.total.toLocaleString()}€
                  </p>
                  <p className="text-primary font-medium">
                    Soit ~{budget.perCycle.toLocaleString()}€ par cycle
                  </p>
                </div>

                {/* Breakdown */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Répartition des coûts</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Stethoscope className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-foreground">Traitements médicaux</p>
                          <p className="text-sm text-muted-foreground">Clinique + médicaments</p>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-blue-600">
                        {budget.medical.toLocaleString()}€
                      </span>
                    </div>

                    {formData.location === "etranger" && budget.travel > 0 && (
                      <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Plane className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-medium text-foreground">Voyages et hébergement</p>
                            <p className="text-sm text-muted-foreground">{formData.numberOfCycles * formData.tripsPerCycle} voyage(s) total</p>
                          </div>
                        </div>
                        <span className="text-xl font-bold text-purple-600">
                          {budget.travel.toLocaleString()}€
                        </span>
                      </div>
                    )}

                    {budget.income > 0 && (
                      <div className="flex justify-between items-center p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-amber-600" />
                          <div>
                            <p className="font-medium text-foreground">Perte de revenus</p>
                            <p className="text-sm text-muted-foreground">{(formData.daysOff + formData.partnerDaysOff) * formData.numberOfCycles} jours d'absence</p>
                          </div>
                        </div>
                        <span className="text-xl font-bold text-amber-600">
                          {budget.income.toLocaleString()}€
                        </span>
                      </div>
                    )}

                    {budget.extras > 0 && (
                      <div className="flex justify-between items-center p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Euro className="w-5 h-5 text-emerald-600" />
                          <div>
                            <p className="font-medium text-foreground">Accompagnements</p>
                            <p className="text-sm text-muted-foreground">Psychologue, acupuncture...</p>
                          </div>
                        </div>
                        <span className="text-xl font-bold text-emerald-600">
                          {budget.extras.toLocaleString()}€
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Visual breakdown */}
                <div className="space-y-2">
                  <div className="h-4 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-blue-500" 
                      style={{ width: `${(budget.medical / budget.total) * 100}%` }}
                    />
                    {budget.travel > 0 && (
                      <div 
                        className="bg-purple-500" 
                        style={{ width: `${(budget.travel / budget.total) * 100}%` }}
                      />
                    )}
                    {budget.income > 0 && (
                      <div 
                        className="bg-amber-500" 
                        style={{ width: `${(budget.income / budget.total) * 100}%` }}
                      />
                    )}
                    {budget.extras > 0 && (
                      <div 
                        className="bg-emerald-500" 
                        style={{ width: `${(budget.extras / budget.total) * 100}%` }}
                      />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500" /> Médical ({Math.round((budget.medical / budget.total) * 100)}%)</span>
                    {budget.travel > 0 && <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-500" /> Voyage ({Math.round((budget.travel / budget.total) * 100)}%)</span>}
                    {budget.income > 0 && <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500" /> Revenus ({Math.round((budget.income / budget.total) * 100)}%)</span>}
                    {budget.extras > 0 && <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500" /> Extras ({Math.round((budget.extras / budget.total) * 100)}%)</span>}
                  </div>
                </div>

                {/* Tips */}
                <div className="p-4 bg-primary/5 rounded-xl">
                  <h4 className="font-medium text-foreground mb-2">💡 Conseils pour optimiser votre budget</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {formData.location === "france" && (
                      <li>• Vérifiez votre prise en charge SS avec le <NavLink to="/simulateurs/remboursement" className="text-primary hover:underline">simulateur de remboursement</NavLink></li>
                    )}
                    <li>• Comparez les devis de plusieurs cliniques pour le même traitement</li>
                    <li>• Réservez vos billets d'avion à l'avance pour économiser</li>
                    <li>• Certaines mutuelles proposent des forfaits PMA : renseignez-vous</li>
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="p-4 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground">
                    <Info className="w-4 h-4 inline mr-2" />
                    Cette estimation est indicative et basée sur vos paramètres. Les coûts réels peuvent varier 
                    selon la clinique, les protocoles et votre situation personnelle.
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
                      Obtenir des devis personnalisés
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

  const handleNext = () => {
    if (formData.location === "france" && step === 2) {
      setStep(4); // Skip travel step
    } else if ((formData.location === "france" && step === 4) || (formData.location === "etranger" && step === 4)) {
      setShowResults(true);
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (formData.location === "france" && step === 4) {
      setStep(2);
    } else {
      setStep(step - 1);
    }
  };

  const isLastStep = (formData.location === "france" && step === 4) || (formData.location === "etranger" && step === 4);

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
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2 font-heading">
              Budget Global PMA
            </h1>
            <p className="text-muted-foreground">
              Planifiez l'ensemble de vos dépenses
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Étape {currentDisplayStep} sur {totalSteps}</span>
              <span className="text-sm font-medium text-primary">{Math.round((currentDisplayStep / totalSteps) * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300"
                style={{ width: `${(currentDisplayStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <Card className="shadow-large mb-8">
            <CardContent className="p-6">
              {step === 4 ? renderStep4() : renderStep()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            {!isLastStep ? (
              <Button onClick={handleNext} className="bg-primary hover:bg-primary-hover text-primary-foreground">
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => setShowResults(true)} className="bg-amber-600 hover:bg-amber-700 text-white">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Calculer mon budget
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

export default SimulateurBudgetGlobal;
