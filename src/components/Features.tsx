import { Brain, Users, Shield, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Diagnostic IA Personnalisé",
    description: "Notre intelligence artificielle analyse votre profil pour vous recommander les cliniques les plus adaptées à votre situation.",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Accompagnement Humain",
    description: "Une équipe dédiée vous accompagne tout au long de votre parcours, répond à vos questions et vous guide dans vos démarches.",
    color: "text-accent"
  },
  {
    icon: Shield,
    title: "Transparence Totale",
    description: "Comparaisons objectives basées sur les taux de réussite réels, les tarifs et les avis patients vérifiés.",
    color: "text-success"
  },
  {
    icon: Globe,
    title: "Expertise Européenne",
    description: "Accédez aux meilleures cliniques d'Europe avec une connaissance approfondie des législations de chaque pays.",
    color: "text-primary"
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pourquoi choisir FertilEurope ?
          </h2>
          <p className="text-lg text-muted-foreground">
            Une approche innovante qui combine technologie de pointe et accompagnement humain 
            pour vous aider à réaliser votre rêve de parentalité.
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
