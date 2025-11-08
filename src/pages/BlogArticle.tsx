import { useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { NavLink } from "@/components/NavLink";
import { blogArticles } from "@/data/blogArticles";
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark } from "lucide-react";
import ReactMarkdown from "react-markdown";

const BlogArticle = () => {
  const { slug } = useParams();
  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedArticles = blogArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

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
          {/* Back button */}
          <Button variant="ghost" asChild className="mb-8">
            <NavLink to="/blog" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour aux articles
            </NavLink>
          </Button>

          <div className="grid lg:grid-cols-[1fr,300px] gap-12">
            {/* Article content */}
            <article className="max-w-3xl">
              {/* Category badge */}
              <Badge className={`mb-4 ${categoryColors[article.category]}`}>
                {article.category === "traitements" && "💉 Traitements"}
                {article.category === "temoignages" && "❤️ Témoignages"}
                {article.category === "guides-pays" && "🌍 Guides par Pays"}
                {article.category === "conseils" && "💡 Conseils"}
              </Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap gap-6 text-muted-foreground mb-8 pb-8 border-b">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <div>
                    <div className="font-medium text-foreground">{article.author}</div>
                    <div className="text-sm">{article.authorRole}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString("fr-FR", { 
                    day: "numeric", 
                    month: "long", 
                    year: "numeric" 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} de lecture</span>
                </div>
              </div>

              {/* Featured image */}
              <div className="mb-8 rounded-lg overflow-hidden shadow-large">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h2 className="text-3xl font-bold text-foreground mt-8 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h3 className="text-2xl font-bold text-foreground mt-6 mb-3" {...props} />,
                    h3: ({node, ...props}) => <h4 className="text-xl font-semibold text-foreground mt-4 mb-2" {...props} />,
                    p: ({node, ...props}) => <p className="text-foreground/80 leading-relaxed mb-4" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="text-foreground/80" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
                    blockquote: ({node, ...props}) => (
                      <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 bg-primary/5 rounded-r" {...props} />
                    ),
                    table: ({node, ...props}) => (
                      <div className="overflow-x-auto my-6">
                        <table className="min-w-full border-collapse border border-border" {...props} />
                      </div>
                    ),
                    th: ({node, ...props}) => (
                      <th className="border border-border bg-muted px-4 py-2 text-left font-semibold" {...props} />
                    ),
                    td: ({node, ...props}) => (
                      <td className="border border-border px-4 py-2" {...props} />
                    ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Card className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Prêt(e) à franchir le pas ?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Faites notre diagnostic gratuit pour trouver la clinique idéale adaptée à votre situation
                </p>
                <Button asChild className="bg-primary hover:bg-primary-hover text-primary-foreground">
                  <NavLink to="/diagnostic">
                    Faire le diagnostic gratuit
                  </NavLink>
                </Button>
              </Card>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Share & Save */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Partager l'article</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </Card>

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Articles similaires</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((related) => (
                      <NavLink 
                        key={related.id} 
                        to={`/blog/${related.slug}`}
                        className="block group"
                      >
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                          {related.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {related.excerpt}
                        </p>
                      </NavLink>
                    ))}
                  </div>
                </Card>
              )}

              {/* Newsletter */}
              <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
                <h3 className="font-semibold text-foreground mb-2">Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Recevez nos meilleurs conseils PMA chaque semaine
                </p>
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full p-3 rounded-lg border border-border mb-3"
                />
                <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
                  S'abonner
                </Button>
              </Card>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogArticle;