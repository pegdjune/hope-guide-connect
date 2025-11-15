import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VerificationBadgeProps {
  status?: 'verified' | 'to-verify' | 'unverified';
  source?: string;
}

const VerificationBadge = ({ status = 'unverified', source }: VerificationBadgeProps) => {
  const config = {
    verified: {
      icon: Shield,
      className: "bg-green-100 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-400",
      label: "Vérifié",
      tooltip: source || "Données vérifiées auprès de la clinique"
    },
    'to-verify': {
      icon: AlertTriangle,
      className: "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-950 dark:text-orange-400",
      label: "À vérifier",
      tooltip: "Données provenant de registres officiels - Confirmation recommandée"
    },
    unverified: {
      icon: Info,
      className: "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-400",
      label: "Non vérifié",
      tooltip: "Données non vérifiées - Contact direct fortement recommandé"
    }
  };

  const { icon: Icon, className, label, tooltip } = config[status];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`gap-1 ${className}`}>
            <Icon className="w-3 h-3" />
            {label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs max-w-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;
