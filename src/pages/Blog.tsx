import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Articles et ressources à venir
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
