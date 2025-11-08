import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Shield, Globe } from "lucide-react";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import aiIllustration from "@/assets/ai-illustration.jpg";
import consultationIllustration from "@/assets/consultation-illustration.jpg";
import europeMapIllustration from "@/assets/europe-map-illustration.jpg";

const features = [
  {
    icon: Globe,
    title: "Répertoire Complet",
    description: "+50 cliniques européennes référencées avec prix, services et avis patients vérifiés",
    color: "text-primary",
    bgColor: "bg-primary/10",
    illustration: europeMapIllustration
  },
  {
    icon: Sparkles,
    title: "IA Personnalisée",
    description: "Diagnostic intelligent qui analyse votre profil pour recommander les meilleures options",
    color: "text-accent",
    bgColor: "bg-accent/10",
    illustration: aiIllustration
  },
  {
    icon: Heart,
    title: "Accompagnement Expert",
    description: "Équipe humaine dédiée pour vous guider à chaque étape de votre parcours",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    illustration: consultationIllustration
  },
  {
    icon: Shield,
    title: "Transparence Totale",
    description: "Tarifs clairs, taux de réussite réels et zéro commission cachée",
    color: "text-success",
    bgColor: "bg-success/10",
    illustration: null
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <Badge className="mb-4 bg-primary text-white border-0 px-6 py-2 text-base font-bold shadow-medium animate-pulse-slow">
            🌟 Pourquoi nous choisir
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 font-heading">
            La référence de{" "}
            <span className="text-primary">l'information FIV</span>
            {" "}en Europe
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Une plateforme complète pour comparer, comprendre et choisir votre clinique FIV en toute confiance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <ScrollAnimation key={idx} animation="scale-in">
              <Card
                key={idx} 
                className="group hover:shadow-glow transition-all duration-500 border-2 hover:border-primary/30 hover:scale-105 overflow-hidden bg-white"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CardHeader className="relative">
                  {feature.illustration && (
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity rounded-bl-3xl overflow-hidden">
                      <img src={feature.illustration} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-medium`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold font-heading group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 text-lg leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
