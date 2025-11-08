import { Brain, Users, Shield, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Globe,
    title: "Répertoire Complet",
    description: "+50 cliniques européennes répertoriées avec toutes leurs informations : tarifs détaillés, services, taux de réussite et conditions d'accès.",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Informations Vérifiées",
    description: "Toutes les données cliniques sont vérifiées et mises à jour régulièrement : prix, protocoles, législations et avis patients.",
    color: "text-accent"
  },
  {
    icon: Brain,
    title: "Comparateur Intelligent",
    description: "Filtrez et comparez facilement les cliniques selon vos critères : budget, pays, traitement, taux de réussite.",
    color: "text-success"
  },
  {
    icon: Users,
    title: "Accompagnement Expert",
    description: "Notre équipe vous aide à comprendre les informations et à faire le meilleur choix pour votre situation.",
    color: "text-primary"
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            La référence de l'information FIV en Europe
          </h2>
          <p className="text-lg text-muted-foreground">
            Un répertoire exhaustif et transparent de toutes les cliniques européennes, 
            avec leurs tarifs, services et conditions d'accès détaillés.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <Card 
              key={idx} 
              className="bg-card hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border"
            >
              <CardContent className="p-6 space-y-4">
                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}/10 flex items-center justify-center`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
