import { useState, useEffect } from "react";
import { X, Mail, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { whitePapers, WhitePaper, getRandomWhitePaper } from "@/data/whitePapers";
import { toast } from "@/hooks/use-toast";

interface WhitePaperPopupProps {
  trigger?: "scroll" | "exit" | "time" | "manual";
  delay?: number;
  scrollThreshold?: number;
  specificPaperId?: string;
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

  useEffect(() => {
    if (specificPaperId) {
      const found = whitePapers.find(wp => wp.id === specificPaperId);
      setWhitePaper(found || getRandomWhitePaper());
    } else {
      const shown = JSON.parse(localStorage.getItem("shownWhitePapers") || "[]");
      setWhitePaper(getRandomWhitePaper(shown));
    }
  }, [specificPaperId]);

  useEffect(() => {
    if (trigger !== "time" || hasShown) return;
    
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
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const shown = JSON.parse(localStorage.getItem("shownWhitePapers") || "[]");
    if (!shown.includes(whitePaper.id)) {
      shown.push(whitePaper.id);
      localStorage.setItem("shownWhitePapers", JSON.stringify(shown));
    }

    toast({
      title: "🎉 C'est envoyé !",
      description: `Vérifiez votre boîte mail pour télécharger votre guide.`,
    });

    setIsSubmitting(false);
    handleClose();
  };

  if (!whitePaper) return null;

  const categoryLabels: Record<WhitePaper["category"], string> = {
    parcours: "Parcours PMA",
    finances: "Budget & Aides",
    etranger: "À l'étranger",
    don: "Don",
    couples: "Situations",
    sante: "Bien-être"
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl rounded-3xl bg-[#FDF8F4]">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
        >
          <X className="w-4 h-4 text-[#8B7355]" />
        </button>

        {/* Decorative header */}
        <div className="relative pt-8 pb-4 px-6">
          {/* Soft decorative shapes */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-[#F5E6D8] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60" />
          <div className="absolute top-4 right-8 w-16 h-16 bg-[#E8D4C4] rounded-full opacity-40" />
          <div className="absolute top-12 right-4">
            <Sparkles className="w-5 h-5 text-[#D4A574] opacity-60" />
          </div>
          
          {/* Category pill */}
          <div className="relative flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-[#8B7355] shadow-sm border border-[#E8D4C4]">
              <Heart className="w-3 h-3 text-[#D4A574]" />
              {categoryLabels[whitePaper.category]}
            </span>
          </div>

          {/* Icon */}
          <div className="relative flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center text-4xl border-2 border-[#F5E6D8]">
              {whitePaper.icon}
            </div>
          </div>

          {/* Title */}
          <h3 className="relative text-center text-xl font-semibold text-[#5C4A3D] leading-tight mb-2 font-serif">
            {whitePaper.title}
          </h3>
          
          {/* Description */}
          <p className="relative text-center text-sm text-[#8B7355] leading-relaxed max-w-xs mx-auto">
            {whitePaper.description}
          </p>
        </div>

        {/* Form section */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F5E6D8]">
            <p className="text-center text-xs text-[#A08B76] mb-4 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Recevez ce guide gratuitement par email
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-[#E8D4C4] focus:border-[#D4A574] focus:ring-[#D4A574] bg-[#FDFBF9] text-center placeholder:text-[#C4B5A5]"
              />
              
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#D4A574] to-[#C49666] hover:from-[#C49666] hover:to-[#B38856] text-white font-medium shadow-md hover:shadow-lg transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours...
                  </span>
                ) : (
                  "Recevoir mon guide gratuit"
                )}
              </Button>
            </form>

            <p className="text-center text-[10px] text-[#C4B5A5] mt-3">
              Pas de spam, juste des ressources utiles pour votre parcours 💛
            </p>
          </div>
        </div>

        {/* Other guides */}
        <div className="bg-white/50 px-6 py-4 border-t border-[#F5E6D8]">
          <p className="text-[10px] text-[#A08B76] text-center mb-3">Autres guides qui pourraient vous aider</p>
          <div className="flex justify-center gap-2 flex-wrap">
            {whitePapers
              .filter(wp => wp.id !== whitePaper.id)
              .slice(0, 3)
              .map(wp => (
                <button
                  key={wp.id}
                  onClick={() => setWhitePaper(wp)}
                  className="px-3 py-1.5 bg-white rounded-full text-xs text-[#8B7355] hover:bg-[#F5E6D8] transition-colors border border-[#E8D4C4] shadow-sm"
                >
                  {wp.icon}
                </button>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhitePaperPopup;
