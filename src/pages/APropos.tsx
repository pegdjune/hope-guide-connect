import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Users, 
  MapPin, 
  Award, 
  Target,
  Shield,
  Clock,
  TrendingUp,
  ChevronDown
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const APropos = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Femmes accompagnées", color: "text-primary" },
    { icon: MapPin, value: "36", label: "Pays couverts", color: "text-accent" },
    { icon: Award, value: "272", label: "Cliniques partenaires", color: "text-success" },
    { icon: TrendingUp, value: "95%", label: "Taux de satisfaction", color: "text-primary" },
  ];

  const team = [
    {
      name: "Dr. Marie Dupont",
      role: "Fondatrice & Directrice Médicale",
      bio: "Ancienne spécialiste en médecine reproductive avec 15 ans d'expérience. Diplômée de la faculté de médecine de Paris.",
    },
    {
      name: "Sophie Martin",
      role: "Responsable Accompagnement",
      bio: "Elle-même passée par un parcours PMA, Sophie accompagne les patientes avec empathie et expertise depuis 2019.",
    },
    {
      name: "Thomas Bernard",
      role: "Directeur des Partenariats",
      bio: "Expert en santé internationale, il sélectionne et audite rigoureusement chaque clinique partenaire.",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "100% Indépendant",
      description: "Nous ne recevons aucune commission des cliniques. Nos conseils sont 100% objectifs et basés uniquement sur votre intérêt.",
    },
    {
      icon: Heart,
      title: "Empathie & Bienveillance",
      description: "Nous comprenons le parcours émotionnel de la PMA. Chaque patiente est accompagnée avec respect et compassion.",
    },
    {
      icon: Target,
      title: "Transparence Totale",
      description: "Prix clairs, taux de réussite vérifiés, aucune surprise. Vous prenez des décisions éclairées.",
    },
    {
      icon: Clock,
      title: "Réactivité",
      description: "Réponse sous 24h garantie. Une experte dédiée vous accompagne tout au long de votre parcours.",
    },
  ];

  const faqs = [
    {
      question: "Comment FertilEurope sélectionne-t-il les cliniques ?",
      answer: "Nous auditons chaque clinique selon des critères stricts : taux de réussite vérifiés, équipements, qualifications des médecins, avis patients, et conformité aux réglementations européennes. Seules les meilleures cliniques intègrent notre réseau.",
    },
    {
      question: "Le service est-il vraiment gratuit ?",
      answer: "Oui, notre service d'accompagnement et de mise en relation est 100% gratuit pour les patientes. Nous ne prenons aucune commission sur les traitements. Notre modèle économique repose sur des partenariats institutionnels.",
    },
    {
      question: "Comment se déroule l'accompagnement ?",
      answer: "Après votre diagnostic en ligne, une experte vous contacte pour comprendre votre situation. Elle vous présente les cliniques adaptées, coordonne les devis, et reste disponible jusqu'au début de votre traitement.",
    },
    {
      question: "Puis-je faire confiance aux taux de réussite affichés ?",
      answer: "Absolument. Nos taux proviennent des registres nationaux officiels (ESHRE, registres nationaux de PMA) et sont vérifiés annuellement. Nous affichons également l'année des données pour une transparence totale.",
    },
    {
      question: "Quels traitements sont proposés ?",
      answer: "FIV avec vos propres ovocytes, FIV avec don d'ovocytes, ICSI, don de sperme, DPI (diagnostic préimplantatoire), et préservation de fertilité. Chaque clinique a ses spécialités.",
    },
    {
      question: "Comment sont protégées mes données personnelles ?",
      answer: "Vos données sont hébergées en Europe, conformément au RGPD. Elles ne sont jamais vendues et sont partagées uniquement avec les cliniques que vous choisissez de contacter.",
    },
  ];

  const timeline = [
    { year: "2021", event: "Création de FertilEurope à Paris" },
    { year: "2022", event: "Premiers partenariats avec des cliniques en Espagne et République Tchèque" },
    { year: "2023", event: "Extension à 20 pays européens, 100 cliniques partenaires" },
    { year: "2024", event: "Lancement de la plateforme de comparaison et 272 cliniques référencées" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            À propos de <span className="text-primary">FertilEurope</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Notre mission est d'accompagner les femmes et les couples dans leur parcours FIV en Europe, 
            avec transparence, bienveillance et expertise.
          </p>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="text-center p-6">
                <CardContent className="pt-4">
                  <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-4`} />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Notre Histoire</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              FertilEurope est né d'un constat : trop de femmes et de couples se retrouvent perdus face à la complexité 
              des parcours de PMA à l'étranger. Entre les différences législatives, les variations de prix, et le manque 
              d'informations fiables, prendre une décision éclairée relève du parcours du combattant.
            </p>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Notre fondatrice, après avoir elle-même vécu ce parcours, a décidé de créer la plateforme qu'elle aurait 
              aimé avoir : un comparateur objectif, des informations vérifiées, et un accompagnement humain.
            </p>
            
            {/* Timeline */}
            <div className="relative border-l-2 border-primary/30 pl-8 space-y-8">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-10 w-4 h-4 bg-primary rounded-full" />
                  <div className="text-sm font-bold text-primary mb-1">{item.year}</div>
                  <div className="text-foreground">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="bg-muted/30 py-20 mb-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Nos Valeurs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => (
                <Card key={idx} className="h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* L'Équipe */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Notre Équipe</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Localisation */}
        <section className="container mx-auto px-4 mb-20">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Notre Siège</h2>
              <p className="text-muted-foreground mb-2">FertilEurope SAS</p>
              <p className="text-muted-foreground mb-2">15 Rue de la Santé</p>
              <p className="text-muted-foreground mb-4">75013 Paris, France</p>
              <p className="text-sm text-muted-foreground">
                SIRET : 123 456 789 00012 • Capital : 10 000€
              </p>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Questions Fréquentes</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
};

export default APropos;