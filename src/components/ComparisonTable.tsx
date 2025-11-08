import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Check, MapPin, Star, Euro, TrendingUp } from "lucide-react";

interface Clinic {
  id: number;
  name: string;
  country: string;
  city: string;
  rating: number;
  reviewCount: number;
  successRate: string;
  priceFrom: number;
  specialties: string[];
  badges: string[];
}

interface ComparisonTableProps {
  clinics: Clinic[];
  onRemove: (id: number) => void;
  onClearAll: () => void;
}

const ComparisonTable = ({ clinics, onRemove, onClearAll }: ComparisonTableProps) => {
  if (clinics.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          Sélectionnez des cliniques à comparer en cliquant sur "Comparer"
        </p>
      </Card>
    );
  }

  const comparisonRows = [
    { label: "Localisation", icon: MapPin, key: "location" },
    { label: "Note", icon: Star, key: "rating" },
    { label: "Taux de réussite", icon: TrendingUp, key: "successRate" },
    { label: "Prix à partir de", icon: Euro, key: "price" },
    { label: "Spécialités", icon: null, key: "specialties" },
    { label: "Avantages", icon: null, key: "badges" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">
          Comparaison de {clinics.length} clinique{clinics.length > 1 ? 's' : ''}
        </h2>
        <Button variant="outline" onClick={onClearAll}>
          Tout effacer
        </Button>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left bg-muted/50 rounded-tl-lg">Critères</th>
              {clinics.map((clinic) => (
                <th key={clinic.id} className="p-4 bg-muted/50 relative">
                  <div className="text-center">
                    <button
                      onClick={() => onRemove(clinic.id)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-destructive" />
                    </button>
                    <h3 className="font-semibold text-foreground mb-1">{clinic.name}</h3>
                    <p className="text-sm text-muted-foreground">{clinic.city}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="border-t border-border">
                <td className="p-4 font-medium text-foreground bg-muted/30">
                  <div className="flex items-center gap-2">
                    {row.icon && <row.icon className="w-4 h-4 text-primary" />}
                    {row.label}
                  </div>
                </td>
                {clinics.map((clinic) => (
                  <td key={clinic.id} className="p-4 text-center">
                    {row.key === "location" && (
                      <div>
                        <div className="font-medium text-foreground">{clinic.city}</div>
                        <div className="text-sm text-muted-foreground">{clinic.country}</div>
                      </div>
                    )}
                    {row.key === "rating" && (
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-current" />
                        <span className="font-semibold text-foreground">{clinic.rating}</span>
                        <span className="text-xs text-muted-foreground">({clinic.reviewCount})</span>
                      </div>
                    )}
                    {row.key === "successRate" && (
                      <div className="font-semibold text-success">{clinic.successRate}</div>
                    )}
                    {row.key === "price" && (
                      <div className="font-bold text-primary text-lg">
                        {clinic.priceFrom.toLocaleString()}€
                      </div>
                    )}
                    {row.key === "specialties" && (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {clinic.specialties.map((spec, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {row.key === "badges" && (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {clinic.badges.map((badge, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-primary/30">
                            <Check className="w-3 h-3 mr-1" />
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {clinics.map((clinic) => (
          <Card key={clinic.id} className="relative">
            <button
              onClick={() => onRemove(clinic.id)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-4 h-4 text-destructive" />
            </button>
            <CardContent className="p-6 space-y-4">
              <div className="pr-8">
                <h3 className="font-semibold text-lg text-foreground mb-1">{clinic.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{clinic.city}, {clinic.country}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Note</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-current" />
                    <span className="font-semibold">{clinic.rating}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Réussite</div>
                  <div className="font-semibold text-success">{clinic.successRate}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Prix</div>
                <div className="font-bold text-primary text-xl">
                  {clinic.priceFrom.toLocaleString()}€
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Spécialités</div>
                <div className="flex flex-wrap gap-2">
                  {clinic.specialties.map((spec, i) => (
                    <Badge key={i} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Avantages</div>
                <div className="flex flex-wrap gap-2">
                  {clinic.badges.map((badge, i) => (
                    <Badge key={i} variant="outline" className="border-primary/30">
                      <Check className="w-3 h-3 mr-1" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComparisonTable;