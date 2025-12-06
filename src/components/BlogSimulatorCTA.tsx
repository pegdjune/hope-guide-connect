import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { 
  Shield, 
  Euro, 
  TrendingUp, 
  Wallet,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SimulatorInfo {
  key: string;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  colorClass: string;
}

const allSimulators: SimulatorInfo[] = [
  {
    key: "remboursement",
    title: "Calculer mon remboursement",
    description: "Estimez votre prise en charge SS + mutuelle",
    icon: Shield,
    path: "/simulateurs/remboursement",
    colorClass: "emerald",
  },
  {
    key: "coutPays",
    title: "Comparer les coûts par pays",
    description: "Traitement + voyage + hébergement",
    icon: Euro,
    path: "/simulateurs/cout-pays",
    colorClass: "blue",
  },
  {
    key: "chancesSucces",
    title: "Estimer mes chances",
    description: "Probabilité de réussite personnalisée",
    icon: TrendingUp,
    path: "/simulateurs/chances-succes",
    colorClass: "purple",
  },
  {
    key: "budgetGlobal",
    title: "Planifier mon budget",
    description: "Vision complète de toutes les dépenses",
    icon: Wallet,
    path: "/simulateurs/budget-global",
    colorClass: "amber",
  },
];

// Mapping des catégories d'articles aux simulateurs pertinents
const categorySimulatorMapping: Record<string, string[]> = {
  traitements: ["chancesSucces", "remboursement", "budgetGlobal"],
  temoignages: ["coutPays", "budgetGlobal", "chancesSucces"],
  "guides-pays": ["coutPays", "budgetGlobal", "remboursement"],
  conseils: ["chancesSucces", "remboursement", "budgetGlobal"],
};

// Mapping des tags spécifiques aux simulateurs
const tagSimulatorMapping: Record<string, string[]> = {
  fiv: ["chancesSucces", "remboursement"],
  icsi: ["chancesSucces", "remboursement"],
  "don d'ovocytes": ["coutPays", "chancesSucces"],
  prix: ["coutPays", "budgetGlobal", "remboursement"],
  coût: ["coutPays", "budgetGlobal", "remboursement"],
  espagne: ["coutPays", "budgetGlobal"],
  "république tchèque": ["coutPays", "budgetGlobal"],
  grèce: ["coutPays", "budgetGlobal"],
  portugal: ["coutPays", "budgetGlobal"],
  réussite: ["chancesSucces"],
  statistiques: ["chancesSucces"],
};

interface BlogSimulatorCTAProps {
  category: string;
  tags: string[];
}

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; iconBg: string }> = {
    emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-600", iconBg: "bg-emerald-500/10" },
    blue: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-600", iconBg: "bg-blue-500/10" },
    purple: { bg: "bg-purple-50 dark:bg-purple-950/30", text: "text-purple-600", iconBg: "bg-purple-500/10" },
    amber: { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-600", iconBg: "bg-amber-500/10" },
  };
  return colors[color] || colors.blue;
};

const BlogSimulatorCTA = ({ category, tags }: BlogSimulatorCTAProps) => {
  // Déterminer les simulateurs pertinents
  const relevantSimulatorKeys = new Set<string>();
  
  // Ajouter les simulateurs basés sur la catégorie
  const categorySimulators = categorySimulatorMapping[category] || [];
  categorySimulators.forEach(key => relevantSimulatorKeys.add(key));
  
  // Ajouter les simulateurs basés sur les tags
  tags.forEach(tag => {
    const tagLower = tag.toLowerCase();
    Object.entries(tagSimulatorMapping).forEach(([keyword, simulatorKeys]) => {
      if (tagLower.includes(keyword)) {
        simulatorKeys.forEach(key => relevantSimulatorKeys.add(key));
      }
    });
  });

  // Convertir en liste et limiter à 2 simulateurs
  const simulatorKeys = Array.from(relevantSimulatorKeys).slice(0, 2);
  const simulators = simulatorKeys
    .map(key => allSimulators.find(s => s.key === key))
    .filter((s): s is SimulatorInfo => s !== undefined);

  if (simulators.length === 0) {
    // Fallback : afficher les 2 premiers simulateurs
    simulators.push(allSimulators[0], allSimulators[1]);
  }

  return (
    <Card className="my-8 border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h4 className="font-semibold text-foreground">Outils utiles pour cet article</h4>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {simulators.map((sim) => {
            const colors = getColorClasses(sim.colorClass);
            const IconComponent = sim.icon;
            return (
              <NavLink key={sim.key} to={sim.path} className="group">
                <div className={`p-4 rounded-xl ${colors.bg} border border-transparent hover:border-primary/30 transition-all`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${colors.iconBg}`}>
                      <IconComponent className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {sim.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {sim.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogSimulatorCTA;
