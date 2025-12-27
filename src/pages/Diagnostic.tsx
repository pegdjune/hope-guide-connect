import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, MapPin, Star, Lock, Check } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Diagnostic = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [formData, setFormData] = useState({
    age: "",
    country: "",
    budget: "",
    treatment: "",
    fullName: "",
    email: "",
    phone: "",
  });

  // Validation: check if current step has required selection
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.age !== "";
      case 2:
        return formData.country !== "";
      case 3:
        return formData.budget !== "";
      case 4:
        return formData.treatment !== "";
      default:
        return true;
    }
  };

  // Toggle selection (second click deselects)
  const handleSelection = (field: 'age' | 'budget' | 'treatment', value: string) => {
    if (formData[field] === value) {
      setFormData({ ...formData, [field]: "" }); // Deselect
    } else {
      setFormData({ ...formData, [field]: value }); // Select
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">
                Étape {currentStep === 4.5 ? 4 : currentStep} sur {totalSteps}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(((currentStep === 4.5 ? 4 : currentStep) / totalSteps) * 100)}% complété
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${((currentStep === 4.5 ? 4 : currentStep) / totalSteps) * 100}%` }}
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
                        onClick={() => handleSelection('age', option)}
                        className={`p-4 rounded-xl border-2 transition-all text-center relative ${
                          formData.age === option 
                            ? "border-primary bg-primary/10 ring-2 ring-primary/20" 
                            : "border-border hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        {formData.age === option && (
                          <div className="absolute top-2 right-2">
                            <Check className="w-5 h-5 text-primary" />
                          </div>
                        )}
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
                  <select 
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background"
                  >
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
                        onClick={() => handleSelection('budget', option)}
                        className={`p-4 rounded-xl border-2 transition-all text-left relative ${
                          formData.budget === option 
                            ? "border-primary bg-primary/10 ring-2 ring-primary/20" 
                            : "border-border hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        {formData.budget === option && (
                          <div className="absolute top-1/2 right-4 -translate-y-1/2">
                            <Check className="w-5 h-5 text-primary" />
                          </div>
                        )}
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
                    Sélectionnez l'option qui vous intéresse le plus.
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
                        onClick={() => handleSelection('treatment', option.title)}
                        className={`p-4 rounded-xl border-2 transition-all text-left space-y-2 relative ${
                          formData.treatment === option.title 
                            ? "border-primary bg-primary/10 ring-2 ring-primary/20" 
                            : "border-border hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        {formData.treatment === option.title && (
                          <div className="absolute top-3 right-3">
                            <Check className="w-5 h-5 text-primary" />
                          </div>
                        )}
                        <div className="font-medium text-foreground pr-6">{option.title}</div>
                        <div className="text-sm text-muted-foreground">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4.5 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-3">
                      🎉 Vos recommandations sont presque prêtes !
                    </h2>
                    <p className="text-muted-foreground">
                      Voici un aperçu des cliniques qui correspondent à votre profil
                    </p>
                  </div>

                  {/* Blurred Preview */}
                  <div className="relative">
                    {/* Blur overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10 backdrop-blur-sm" />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <Card className="bg-background/95 backdrop-blur-md p-6 shadow-large border-2 border-primary/50 max-w-md mx-4">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <Lock className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold text-foreground">
                            Débloquez vos résultats personnalisés
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Complétez la dernière étape pour accéder à votre rapport complet avec prix détaillés et recommandations personnalisées
                          </p>
                          <Button 
                            className="bg-primary hover:bg-primary-hover text-primary-foreground w-full"
                            onClick={() => setCurrentStep(5)}
                          >
                            Voir mes recommandations
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </Card>
                    </div>

                    {/* Teaser clinics */}
                    <div className="space-y-4 opacity-40">
                      {[
                        { name: "Clinique FertiCare Prague", city: "Prague", country: "République Tchèque", rating: 4.8, price: 4500, badges: ["Disponibilité rapide", "Francophone"] },
                        { name: "Barcelona IVF", city: "Barcelone", country: "Espagne", rating: 4.9, price: 6200, badges: ["Taux de réussite élevé"] },
                        { name: "Athens Fertility Center", city: "Athènes", country: "Grèce", rating: 4.7, price: 3800, badges: ["Budget friendly"] },
                      ].map((clinic, idx) => (
                        <Card key={idx} className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-foreground mb-2">
                                {clinic.name}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                <MapPin className="w-4 h-4" />
                                <span>{clinic.city}, {clinic.country}</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {clinic.badges.map((badge, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full mb-2">
                                <Star className="w-4 h-4 text-accent fill-current" />
                                <span className="font-semibold text-accent">{clinic.rating}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">À partir de</div>
                              <div className="text-2xl font-bold text-primary">{clinic.price.toLocaleString()}€</div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Dernière étape : créez votre compte
                  </h2>
                  <p className="text-muted-foreground">
                    Créez votre compte pour sauvegarder votre diagnostic et recevoir vos devis personnalisés par email. 
                    Vous pourrez revenir consulter vos propositions à tout moment.
                  </p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nom complet"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background"
                    />
                    <input
                      type="tel"
                      placeholder="Téléphone (optionnel)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background"
                    />
                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                      <div className="text-sm text-muted-foreground">
                        💡 <strong>Pourquoi créer un compte ?</strong>
                        <ul className="mt-2 space-y-1 list-disc list-inside">
                          <li>Accédez à tous vos devis en un seul endroit</li>
                          <li>Échangez avec les experts des cliniques</li>
                          <li>Recevez un email quand de nouveaux devis arrivent</li>
                          <li>Gardez un historique de vos recherches</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => {
                if (currentStep === 4.5) {
                  setCurrentStep(4);
                } else if (currentStep > 1) {
                  setCurrentStep(currentStep - 1);
                }
              }}
              disabled={currentStep === 1}
              className="border-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!isStepValid()}
                className={`${
                  isStepValid() 
                    ? "bg-primary hover:bg-primary-hover text-primary-foreground" 
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : currentStep === 4 ? (
              <Button
                onClick={() => setCurrentStep(4.5)}
                disabled={!isStepValid()}
                className={`${
                  isStepValid() 
                    ? "bg-primary hover:bg-primary-hover text-primary-foreground" 
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : currentStep === 4.5 ? (
              <div /> // Empty div as button is in the card
            ) : (
              <Button 
                onClick={() => {
                  if (formData.fullName && formData.email) {
                    navigate("/auth", { 
                      state: { 
                        email: formData.email, 
                        fullName: formData.fullName,
                        fromDiagnostic: true 
                      } 
                    });
                  }
                }}
                disabled={!formData.fullName || !formData.email}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Créer mon compte et voir les devis
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

      <ChatWidget />
      <Footer />
    </div>
  );
};

export default Diagnostic;