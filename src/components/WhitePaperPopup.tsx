import { useState, useEffect } from "react";
import { X, Download, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { whitePapers, WhitePaper, getRandomWhitePaper } from "@/data/whitePapers";
import { toast } from "@/hooks/use-toast";

interface WhitePaperPopupProps {
  trigger?: "scroll" | "exit" | "time" | "manual";
  delay?: number; // délai en ms pour trigger="time"
  scrollThreshold?: number; // % de scroll pour trigger="scroll"
  specificPaperId?: string; // ID spécifique du livre blanc à afficher
  onClose?: () => void;
}

export const WhitePaperPopup = ({
  trigger = "time",
  delay = 30000,
  scrollThreshold = 50,
  specificPaperId,
  onClose
}: WhitePaperPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [whitePaper, setWhitePaper] = useState<WhitePaper | null>(null);

  // Sélectionner le livre blanc
  useEffect(() => {
    if (specificPaperId) {
      const found = whitePapers.find(wp => wp.id === specificPaperId);
      setWhitePaper(found || getRandomWhitePaper());
    } else {
      // Vérifier ce qui a déjà été montré dans localStorage
      const shown = JSON.parse(localStorage.getItem("shownWhitePapers") || "[]");
      setWhitePaper(getRandomWhitePaper(shown));
    }
  }, [specificPaperId]);

  // Trigger par temps
  useEffect(() => {
    if (trigger !== "time" || hasShown) return;
    
    // Vérifier si déjà affiché récemment (24h)
    const lastShown = localStorage.getItem("lastWhitePaperPopup");
    if (lastShown && Date.now() - parseInt(lastShown) < 24 * 60 * 60 * 1000) {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasShown(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [trigger, delay, hasShown]);

  // Trigger par scroll
  useEffect(() => {
    if (trigger !== "scroll" || hasShown) return;

    const lastShown = localStorage.getItem("lastWhitePaperPopup");
    if (lastShown && Date.now() - parseInt(lastShown) < 24 * 60 * 60 * 1000) {
      return;
    }

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= scrollThreshold && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trigger, scrollThreshold, hasShown]);

  // Trigger par exit intent (mouvement souris vers le haut)
  useEffect(() => {
    if (trigger !== "exit" || hasShown) return;

    const lastShown = localStorage.getItem("lastWhitePaperPopup");
    if (lastShown && Date.now() - parseInt(lastShown) < 24 * 60 * 60 * 1000) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [trigger, hasShown]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("lastWhitePaperPopup", Date.now().toString());
    onClose?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !whitePaper) return;

    setIsSubmitting(true);
    
    // Simuler l'envoi (à remplacer par vraie API)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sauvegarder dans localStorage les livres blancs déjà téléchargés
    const shown = JSON.parse(localStorage.getItem("shownWhitePapers") || "[]");
    if (!shown.includes(whitePaper.id)) {
      shown.push(whitePaper.id);
      localStorage.setItem("shownWhitePapers", JSON.stringify(shown));
    }

    toast({
      title: "🎉 Guide envoyé !",
      description: `Vérifiez votre boîte mail (${email}) pour télécharger "${whitePaper.title}"`,
    });

    setIsSubmitting(false);
    handleClose();
  };

  if (!whitePaper) return null;

  const categoryColors: Record<WhitePaper["category"], string> = {
    parcours: "bg-blue-100 text-blue-700",
    finances: "bg-green-100 text-green-700",
    etranger: "bg-purple-100 text-purple-700",
    don: "bg-pink-100 text-pink-700",
    couples: "bg-orange-100 text-orange-700",
    sante: "bg-teal-100 text-teal-700"
  };

  const categoryLabels: Record<WhitePaper["category"], string> = {
    parcours: "Parcours PMA",
    finances: "Finances",
    etranger: "PMA à l'étranger",
    don: "Don",
    couples: "Couples & Solo",
    sante: "Santé & Bien-être"
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 shadow-2xl">
        {/* Header avec gradient */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-accent p-6 text-white">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[whitePaper.category]}`}>
              {categoryLabels[whitePaper.category]}
            </span>
            <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
              {whitePaper.format === "guide" ? "📘 Guide complet" : whitePaper.format === "faq" ? "❓ FAQ" : "📄 Article"}
            </span>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-5xl">{whitePaper.icon}</span>
            <div>
              <h3 className="text-xl font-bold mb-2 leading-tight">
                {whitePaper.title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                {whitePaper.description}
              </p>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            <span>Téléchargez gratuitement ce {whitePaper.format} en renseignant votre email</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-semibold group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Envoi en cours..."
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Recevoir le {whitePaper.format} gratuit
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            🔒 Pas de spam. Vos données restent confidentielles.
          </p>
        </div>

        {/* Footer avec autres suggestions */}
        <div className="bg-muted/30 px-6 py-4 border-t">
          <p className="text-xs text-muted-foreground mb-2">Autres guides populaires :</p>
          <div className="flex flex-wrap gap-2">
            {whitePapers
              .filter(wp => wp.id !== whitePaper.id)
              .slice(0, 3)
              .map(wp => (
                <button
                  key={wp.id}
                  onClick={() => setWhitePaper(wp)}
                  className="px-2 py-1 bg-white rounded-full text-xs font-medium text-foreground hover:bg-primary hover:text-white transition-colors border shadow-sm"
                >
                  {wp.icon} {wp.title.split(":")[0]}
                </button>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhitePaperPopup;
