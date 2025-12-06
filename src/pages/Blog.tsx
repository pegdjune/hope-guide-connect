import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink } from "@/components/NavLink";
import { blogArticles, categories } from "@/data/blogArticles";
import { useState } from "react";
import { Search, Clock, Calendar, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const Blog = () => {
  useSEO({
    title: "Blog PMA & Fertilité - Guides, Conseils et Témoignages",
    description: "Découvrez nos articles sur la PMA : guides par pays, conseils d'experts, témoignages de couples et informations sur les traitements FIV en Europe.",
    type: "website",
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = blogArticles[0];

  const categoryColors: Record<string, string> = {
    traitements: "bg-primary/10 text-primary border-primary/30",
    temoignages: "bg-accent/10 text-accent border-accent/30",
    "guides-pays": "bg-secondary/10 text-secondary border-secondary/30",
    conseils: "bg-success/10 text-success border-success/30"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog FertileMap
            </h1>
            <p className="text-lg text-muted-foreground">
              Guides, témoignages et conseils d'experts pour réussir votre parcours PMA
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un article, un pays, un traitement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-soft scale-105"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          {/* Featured article (only if no filters) */}
          {selectedCategory === "all" && !searchQuery && (
            <Card className="mb-12 overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-primary/20">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge className="mb-4 w-fit bg-accent text-accent-foreground">
                    ⭐ Article à la une
                  </Badge>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 text-lg">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredArticle.date).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>
                  <Button asChild className="bg-primary hover:bg-primary-hover text-primary-foreground w-fit">
                    <NavLink to={`/blog/${featuredArticle.slug}`} className="gap-2">
                      Lire l'article
                      <ArrowRight className="w-4 h-4" />
                    </NavLink>
                  </Button>
                </CardContent>
              </div>
            </Card>
          )}

          {/* Articles grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => {
              // Skip featured article in grid if showing it
              if (idx === 0 && selectedCategory === "all" && !searchQuery) return null;
              
              return (
                <Card 
                  key={article.id} 
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105 border-2 hover:border-primary/30"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge className={`mb-3 ${categoryColors[article.category]}`}>
                      {article.category === "traitements" && "💉 Traitements"}
                      {article.category === "temoignages" && "❤️ Témoignages"}
                      {article.category === "guides-pays" && "🌍 Guides"}
                      {article.category === "conseils" && "💡 Conseils"}
                    </Badge>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                      <span>{new Date(article.date).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {article.author}
                      </div>
                      <Button asChild variant="ghost" size="sm" className="group/btn">
                        <NavLink to={`/blog/${article.slug}`} className="gap-2">
                          Lire
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </NavLink>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* No results */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">
                Aucun article ne correspond à votre recherche.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}

          {/* CTA Newsletter */}
          <Card className="mt-16 bg-gradient-to-br from-primary/10 via-accent/10 to-primary-light/20 border-primary/20">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ne manquez aucun article
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                Recevez nos meilleurs conseils, guides et témoignages directement dans votre boîte mail
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 py-6"
                />
                <Button className="bg-primary hover:bg-primary-hover text-primary-foreground px-8">
                  S'abonner
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Pas de spam, uniquement du contenu de qualité. Désabonnement en 1 clic.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
};

export default Blog;