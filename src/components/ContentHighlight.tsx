import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Calculator, 
  Map, 
  MessageCircle, 
  ArrowRight,
  FileText,
  Globe,
  Heart,
  Lightbulb
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { blogArticles } from "@/data/blogArticles";

const contentSections = [
  {
    id: "blog",
    title: "Blog & Guides",
    subtitle: "Articles d'experts",
    description: "Témoignages, guides par pays, conseils médicaux et juridiques pour préparer votre parcours PMA",
    icon: BookOpen,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/10",
    iconColor: "text-violet-600",
    path: "/blog",
    stats: `${blogArticles.length}+ articles`,
    featured: ["Guides par pays", "Témoignages", "Conseils d'experts"],
  },
  {
    id: "simulateurs",
    title: "Simulateurs",
    subtitle: "Outils gratuits",
    description: "Calculez vos remboursements, coûts par pays, chances de succès et budget global",
    icon: Calculator,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    path: "/simulateurs",
    stats: "4 simulateurs",
    featured: ["Remboursement SS", "Coût par pays", "Chances FIV"],
  },
  {
    id: "comparateur",
    title: "Comparateur",
    subtitle: "50+ cliniques",
    description: "Comparez les meilleures cliniques européennes : prix, taux de réussite, avis patients",
    icon: Map,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-600",
    path: "/comparateur",
    stats: "50+ cliniques",
    featured: ["Carte interactive", "Filtres avancés", "Comparaison côte à côte"],
  },
  {
    id: "diagnostic",
    title: "Diagnostic",
    subtitle: "Personnalisé & gratuit",
    description: "Recevez des recommandations de cliniques adaptées à votre profil en 5 minutes",
    icon: MessageCircle,
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-500/10",
    iconColor: "text-rose-600",
    path: "/diagnostic",
    stats: "5 min",
    featured: ["Devis gratuits", "Appel expert", "Sans engagement"],
  },
];

const latestArticles = blogArticles.slice(0, 3);

const ContentHighlight = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-accent text-white border-0 px-5 py-2 text-sm font-bold">
            📚 Bien plus qu'un comparateur
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
            Toutes les ressources pour{" "}
            <span className="text-primary">réussir votre parcours PMA</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Guides, simulateurs, témoignages et outils gratuits pour vous accompagner à chaque étape
          </p>
        </div>

        {/* Main Grid - 4 sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {contentSections.map((section) => (
            <NavLink key={section.id} to={section.path} className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/40 overflow-hidden hover:-translate-y-1">
                <div className={`h-1.5 bg-gradient-to-r ${section.color}`} />
                <CardContent className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${section.bgColor}`}>
                      <section.icon className={`w-6 h-6 ${section.iconColor}`} />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {section.stats}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {section.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {section.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {section.featured.map((feat, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explorer
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            </NavLink>
          ))}
        </div>

        {/* Latest Articles Preview */}
        <div className="bg-white rounded-2xl border-2 border-border p-6 md:p-8 shadow-soft">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Derniers articles du blog
              </h3>
              <p className="text-sm text-muted-foreground">
                Guides pratiques et témoignages pour votre parcours
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="w-fit">
              <NavLink to="/blog" className="flex items-center gap-2">
                Voir tous les articles
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {latestArticles.map((article) => (
              <NavLink 
                key={article.id} 
                to={`/blog/${article.slug}`}
                className="group flex flex-col p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  {article.category === "traitements" && <Lightbulb className="w-4 h-4 text-primary" />}
                  {article.category === "temoignages" && <Heart className="w-4 h-4 text-rose-500" />}
                  {article.category === "guides-pays" && <Globe className="w-4 h-4 text-blue-500" />}
                  {article.category === "conseils" && <MessageCircle className="w-4 h-4 text-amber-500" />}
                  <span className="text-xs font-medium text-muted-foreground uppercase">
                    {article.category.replace("-", " ")}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">
                  {article.excerpt}
                </p>
                <span className="text-xs text-primary font-medium mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Lire l'article <ArrowRight className="w-3 h-3" />
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentHighlight;
