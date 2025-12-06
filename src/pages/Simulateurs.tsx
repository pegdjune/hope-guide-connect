import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  PiggyBank, 
  Target, 
  Plane,
  ArrowRight,
  Shield,
  Euro,
  TrendingUp,
  Wallet
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

const simulators = [
  {
    id: "remboursement",
    title: "Simulateur Remboursement",
    subtitle: "Sécurité Sociale & Mutuelle",
    description: "Estimez le montant pris en charge par la Sécurité Sociale et votre mutuelle pour un traitement PMA.",
    icon: Shield,
    color: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    path: "/simulateurs/remboursement",
    tags: ["France", "Sécu", "Mutuelle"],
  },
  {
    id: "cout-pays",
    title: "Coût PMA par Pays",
    subtitle: "Comparer les destinations",
    description: "Calculez le coût total d'un protocole PMA (traitement, transport, séjour) selon le pays et la clinique.",
    icon: Euro,
    color: "from-blue-500 to-indigo-600",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    path: "/simulateurs/cout-pays",
    tags: ["International", "Comparatif"],
  },
  {
    id: "chances-succes",
    title: "Chances de Succès FIV",
    subtitle: "Estimation personnalisée",
    description: "Estimez la probabilité de réussite d'une FIV/ICSI selon votre âge, réserve ovarienne et autres facteurs.",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-600",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    path: "/simulateurs/chances-succes",
    tags: ["FIV", "ICSI", "Statistiques"],
  },
  {
    id: "budget-global",
    title: "Budget Global PMA",
    subtitle: "Planification financière",
    description: "Planifiez votre budget complet : traitement, voyages, hébergement et perte de revenus éventuelle.",
    icon: Wallet,
    color: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    path: "/simulateurs/budget-global",
    tags: ["Budget", "Planification"],
  },
];

const Simulateurs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              Outils gratuits
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-heading">
              Simulateurs PMA
            </h1>
            <p className="text-lg text-muted-foreground">
              Des outils interactifs pour estimer vos coûts, remboursements et chances de succès. 
              Planifiez votre parcours PMA en toute sérénité.
            </p>
          </div>

          {/* Simulators Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {simulators.map((sim) => (
              <Card 
                key={sim.id} 
                className="group hover:shadow-large transition-all duration-300 border-2 hover:border-primary/30 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${sim.color}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${sim.iconBg}`}>
                      <sim.icon className={`w-6 h-6 ${sim.iconColor}`} />
                    </div>
                    <div className="flex gap-2">
                      {sim.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-4">{sim.title}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {sim.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {sim.description}
                  </p>
                  <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground" variant="outline">
                    <NavLink to={sim.path} className="flex items-center justify-center gap-2">
                      Lancer le simulateur
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </NavLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Besoin d'un accompagnement personnalisé ?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Faites notre diagnostic complet pour recevoir des recommandations de cliniques adaptées à votre profil.
                </p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground">
                  <NavLink to="/diagnostic" className="flex items-center gap-2">
                    Commencer le diagnostic
                    <ArrowRight className="w-5 h-5" />
                  </NavLink>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
};

export default Simulateurs;
