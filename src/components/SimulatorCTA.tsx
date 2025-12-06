import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { 
  Shield, 
  Euro, 
  TrendingUp, 
  Wallet,
  ArrowRight,
  Calculator
} from "lucide-react";

const simulatorsCTA = {
  remboursement: {
    title: "Calculer mon remboursement",
    description: "Estimez votre prise en charge Sécu + mutuelle",
    icon: Shield,
    path: "/simulateurs/remboursement",
    color: "emerald",
  },
  coutPays: {
    title: "Comparer les coûts par pays",
    description: "Traitement + voyage + hébergement",
    icon: Euro,
    path: "/simulateurs/cout-pays",
    color: "blue",
  },
  chancesSucces: {
    title: "Estimer mes chances",
    description: "Probabilité de réussite personnalisée",
    icon: TrendingUp,
    path: "/simulateurs/chances-succes",
    color: "purple",
  },
  budgetGlobal: {
    title: "Planifier mon budget",
    description: "Vision complète de toutes les dépenses",
    icon: Wallet,
    path: "/simulateurs/budget-global",
    color: "amber",
  },
};

type SimulatorKey = keyof typeof simulatorsCTA;

interface SimulatorCTAProps {
  simulators?: SimulatorKey[];
  variant?: "inline" | "card" | "banner";
  title?: string;
}

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/30" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/30" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-600", border: "border-purple-500/30" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/30" },
  };
  return colors[color] || colors.blue;
};

const SimulatorCTA = ({ 
  simulators = ["remboursement", "coutPays", "chancesSucces", "budgetGlobal"],
  variant = "card",
  title = "Outils pour vous aider"
}: SimulatorCTAProps) => {
  
  if (variant === "inline") {
    return (
      <div className="flex flex-wrap gap-2">
        {simulators.map((key) => {
          const sim = simulatorsCTA[key];
          const colors = getColorClasses(sim.color);
          return (
            <NavLink key={key} to={sim.path}>
              <Button variant="outline" size="sm" className={`gap-2 ${colors.border} hover:${colors.bg}`}>
                <sim.icon className={`w-4 h-4 ${colors.text}`} />
                {sim.title}
              </Button>
            </NavLink>
          );
        })}
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{title}</h4>
                <p className="text-sm text-muted-foreground">Simulateurs gratuits</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:ml-auto">
              {simulators.map((key) => {
                const sim = simulatorsCTA[key];
                const colors = getColorClasses(sim.color);
                return (
                  <NavLink key={key} to={sim.path}>
                    <Button variant="outline" size="sm" className={`gap-2 ${colors.border} hover:${colors.bg}`}>
                      <sim.icon className={`w-4 h-4 ${colors.text}`} />
                      <span className="hidden sm:inline">{sim.title}</span>
                      <span className="sm:hidden">{sim.title.split(" ").slice(-1)[0]}</span>
                    </Button>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default: card variant
  return (
    <Card className="border-2 border-dashed border-primary/20 bg-gradient-to-br from-background to-muted/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-primary" />
          <h4 className="font-semibold text-foreground">{title}</h4>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {simulators.map((key) => {
            const sim = simulatorsCTA[key];
            const colors = getColorClasses(sim.color);
            return (
              <NavLink key={key} to={sim.path} className="group">
                <div className={`p-4 rounded-lg border ${colors.border} hover:${colors.bg} transition-all flex items-start gap-3`}>
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <sim.icon className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                      {sim.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {sim.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </NavLink>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulatorCTA;
