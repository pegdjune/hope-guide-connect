import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Info } from "lucide-react";

const DataReliabilityBanner = () => {
  return (
    <Alert className="bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900/50">
      <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-500" />
      <AlertDescription className="text-sm text-orange-900 dark:text-orange-200">
        <strong className="font-semibold block mb-2">⚠️ IMPORTANT - Vérification des données</strong>
        <ul className="space-y-1 ml-4 list-disc">
          <li>Les tarifs affichés sont <strong>indicatifs</strong> et peuvent varier</li>
          <li>Les taux de réussite proviennent de registres officiels mais peuvent être obsolètes</li>
          <li>Les politiques d'accessibilité doivent être confirmées directement avec la clinique</li>
          <li>Nous vous recommandons de contacter au minimum <strong>3 cliniques</strong> avant de décider</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default DataReliabilityBanner;
