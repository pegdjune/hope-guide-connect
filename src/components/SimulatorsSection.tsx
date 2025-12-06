import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Shield, 
  Euro, 
  TrendingUp, 
  Wallet,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

const simulators = [
  {
    id: "remboursement",
    title: "Remboursement SS",
    description: "Estimez votre prise en charge Sécurité Sociale et mutuelle",
    icon: Shield,
    color: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    path: "/simulateurs/remboursement",
  },
  {
    id: "cout-pays",
    title: "Coût par pays",
    description: "Comparez les tarifs selon la destination",
    icon: Euro,
    color: "from-blue-500 to-indigo-600",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    path: "/simulateurs/cout-pays",
  },
  {
    id: "chances-succes",
    title: "Chances de succès",
    description: "Estimez votre probabilité de réussite FIV",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-600",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    path: "/simulateurs/chances-succes",
  },
  {
    id: "budget-global",
    title: "Budget global",
    description: "Planifiez l'ensemble de vos dépenses PMA",
    icon: Wallet,
    color: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    path: "/simulateurs/budget-global",
  },
];

const SimulatorsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Outils gratuits
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
            Simulateurs PMA
          </h2>
          <p className="text-muted-foreground">
            Estimez vos coûts, remboursements et chances de succès en quelques clics
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {simulators.map((sim) => (
            <NavLink key={sim.id} to={sim.path} className="group">
              <Card className="h-full hover:shadow-large transition-all duration-300 border-2 hover:border-primary/30 overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${sim.color}`} />
                <CardContent className="p-5">
                  <div className={`p-2.5 rounded-xl ${sim.iconBg} w-fit mb-4`}>
                    <sim.icon className={`w-5 h-5 ${sim.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {sim.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {sim.description}
                  </p>
                  <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Lancer
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="group">
            <NavLink to="/simulateurs" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Voir tous les simulateurs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SimulatorsSection;
