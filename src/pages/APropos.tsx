import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const APropos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">À propos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notre mission est d'accompagner les femmes dans leur parcours FIV en Europe
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default APropos;
