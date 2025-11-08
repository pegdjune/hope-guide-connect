import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";

const Diagnostic = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">
                Étape {currentStep} sur {totalSteps}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round((currentStep / totalSteps) * 100)}% complété
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Diagnostic Personnalisé
            </h1>
            <p className="text-lg text-muted-foreground">
              Aidez-nous à mieux comprendre votre situation pour vous recommander 
              les cliniques les plus adaptées
            </p>
          </div>

          {/* Question Card */}
          <Card className="shadow-large border-border mb-8">
            <CardContent className="p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Quel est votre âge ?
                  </h2>
                  <p className="text-muted-foreground">
                    L'âge est un facteur important dans le choix de la clinique et du traitement.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Moins de 30 ans", "30-35 ans", "36-40 ans", "Plus de 40 ans"].map((option) => (
                      <button
                        key={option}
                        className="p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-center"
                      >
                        <span className="text-foreground font-medium">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Dans quel pays résidez-vous ?
                  </h2>
                  <p className="text-muted-foreground">
                    Cela nous aide à comprendre les contraintes légales et logistiques.
                  </p>
                  <select className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background">
                    <option value="">Sélectionnez votre pays</option>
                    <option value="fr">France</option>
                    <option value="be">Belgique</option>
                    <option value="ch">Suisse</option>
                    <option value="ca">Canada</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Quel est votre budget approximatif ?
                  </h2>
                  <p className="text-muted-foreground">
                    Les prix varient considérablement selon les pays et les traitements.
                  </p>
                  <div className="grid gap-4">
                    {[
                      "Moins de 5 000€",
                      "5 000€ - 8 000€",
                      "8 000€ - 12 000€",
                      "Plus de 12 000€",
                      "Budget flexible"
                    ].map((option) => (
                      <button
                        key={option}
                        className="p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
                      >
                        <span className="text-foreground font-medium">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Quel type de traitement envisagez-vous ?
                  </h2>
                  <p className="text-muted-foreground">
                    Sélectionnez toutes les options qui vous intéressent.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: "FIV avec propres ovocytes", desc: "Stimulation et prélèvement de vos ovocytes" },
                      { title: "FIV avec don d'ovocytes", desc: "Utilisation d'ovocytes de donneuse" },
                      { title: "ICSI", desc: "Injection intracytoplasmique de spermatozoïde" },
                      { title: "Don de sperme", desc: "Utilisation de sperme de donneur" }
                    ].map((option) => (
                      <button
                        key={option.title}
                        className="p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left space-y-2"
                      >
                        <div className="font-medium text-foreground">{option.title}</div>
                        <div className="text-sm text-muted-foreground">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Dernière étape : vos coordonnées
                  </h2>
                  <p className="text-muted-foreground">
                    Pour recevoir votre rapport personnalisé et être contactée par notre équipe.
                  </p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Prénom"
                      className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background"
                    />
                    <input
                      type="tel"
                      placeholder="Téléphone (optionnel)"
                      className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
              className="border-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Voir mes recommandations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <NavLink to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Retour à l'accueil
            </NavLink>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Diagnostic;
