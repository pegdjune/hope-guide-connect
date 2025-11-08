import { ClipboardList, Search, MessageCircle, Calendar } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Diagnostic Personnalisé",
    description: "Répondez à quelques questions sur votre situation, vos attentes et vos préférences en 5 minutes."
  },
  {
    icon: Search,
    number: "02",
    title: "Recommandations IA",
    description: "Obtenez instantanément une sélection de cliniques adaptées avec scores de compatibilité et tarifs."
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "Échange avec un Expert",
    description: "Discutez avec notre équipe pour affiner votre choix et obtenir des réponses à toutes vos questions."
  },
  {
    icon: Calendar,
    number: "04",
    title: "Prise de Rendez-vous",
    description: "Nous vous mettons en relation directe avec la clinique de votre choix pour planifier votre parcours."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-muted-foreground">
            Un parcours simple et guidé en 4 étapes pour trouver la clinique idéale
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line - hidden on mobile */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" 
               style={{ width: 'calc(100% - 8rem)', left: '4rem' }} 
          />

          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Step card */}
              <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 relative z-10">
                {/* Number badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center shadow-medium">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
