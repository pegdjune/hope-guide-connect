import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Martin",
    country: "France",
    avatar: "/placeholder.svg",
    initials: "SM",
    rating: 5,
    quote: "Grâce à cette plateforme, nous avons trouvé la clinique parfaite en Espagne. Le processus était transparent et nous avons économisé plus de 40% par rapport aux prix en France.",
    treatment: "FIV avec don d'ovocytes"
  },
  {
    name: "Marie et Thomas Dubois",
    country: "Belgique",
    avatar: "/placeholder.svg",
    initials: "MD",
    rating: 5,
    quote: "Le comparateur nous a permis d'avoir une vision claire des options disponibles. L'équipe nous a accompagnés à chaque étape. Aujourd'hui, nous sommes parents grâce à eux!",
    treatment: "ICSI"
  },
  {
    name: "Laura Fontaine",
    country: "Suisse",
    avatar: "/placeholder.svg",
    initials: "LF",
    rating: 5,
    quote: "J'avais peur de partir à l'étranger, mais la plateforme m'a mise en confiance. J'ai reçu plusieurs devis rapidement et les cliniques étaient toutes certifiées. Excellent service!",
    treatment: "FIV classique"
  },
  {
    name: "Caroline & Marc",
    country: "France",
    avatar: "/placeholder.svg",
    initials: "CM",
    rating: 5,
    quote: "Après 3 années de parcours difficile, nous avons enfin réussi grâce à une clinique trouvée via ce site. Les prix étaient transparents et le suivi impeccable.",
    treatment: "Don de sperme"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-primary-light/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des milliers de familles ont réalisé leur rêve grâce à notre plateforme de comparaison
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-card border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                    <div className="flex gap-0.5 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-foreground/90 italic leading-relaxed mb-3">
                  "{testimonial.quote}"
                </blockquote>

                <div className="inline-block px-3 py-1 bg-accent-light rounded-full">
                  <p className="text-xs font-medium text-accent-foreground">
                    {testimonial.treatment}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            ⭐ Note moyenne: <span className="font-semibold text-foreground">4.9/5</span> basée sur plus de 2,500 avis
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
