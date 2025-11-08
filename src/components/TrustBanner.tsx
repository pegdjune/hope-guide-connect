import { Shield, Award, Users, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const TrustBanner = () => {
  const trustPoints = [
    {
      icon: Shield,
      title: "100% Indépendant",
      description: "Aucune commission des cliniques. Nos recommandations sont objectifs."
    },
    {
      icon: Award,
      title: "Expertise vérifiée",
      description: "Équipe d'expertes PMA pour vous guider dans votre choix."
    },
    {
      icon: Users,
      title: "2000+ familles aidées",
      description: "Des centaines de couples nous font confiance chaque année."
    },
    {
      icon: Heart,
      title: "Accompagnement humain",
      description: "Échanges téléphoniques gratuits avec nos conseillères."
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-success/10 via-primary/5 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Pourquoi nous faire confiance ?
          </h2>
          <p className="text-muted-foreground">
            La seule plateforme 100% indépendante de comparaison de cliniques FIV en Europe
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <Card key={idx} className="p-6 hover:shadow-large transition-all duration-300 bg-white border-2 hover:border-primary/30">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">
                    {point.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;