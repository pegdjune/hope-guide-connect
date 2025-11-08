import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, MessageCircle, Send, Loader2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour ! 👋 Je suis là pour répondre à vos questions sur la FIV en Europe. Comment puis-je vous aider ?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAutomaticResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Détection de mots-clés et réponses appropriées
    if (lowerMessage.includes("prix") || lowerMessage.includes("coût") || lowerMessage.includes("tarif")) {
      return "Les prix varient selon les pays : République Tchèque (3500-4500€), Espagne (4500-6500€), Grèce (3800-4500€). Souhaitez-vous recevoir des devis personnalisés gratuits ? 📋";
    }
    
    if (lowerMessage.includes("espagne") || lowerMessage.includes("barcelone") || lowerMessage.includes("madrid")) {
      return "L'Espagne est très populaire pour la PMA ! Législation permissive, excellentes cliniques, don d'ovocytes autorisé. Prix : 4500-6500€. Je peux vous mettre en relation avec une experte pour plus de détails. 📞";
    }
    
    if (lowerMessage.includes("tchèque") || lowerMessage.includes("prague") || lowerMessage.includes("république")) {
      return "La République Tchèque offre un excellent rapport qualité-prix (3500-4500€) avec des cliniques de très haut niveau. Voulez-vous un devis personnalisé ou parler à une experte ? 🏥";
    }
    
    if (lowerMessage.includes("grèce") || lowerMessage.includes("athènes")) {
      return "La Grèce combine qualité et prix attractifs (3800-4500€) dans un cadre idyllique. Parfait pour coupler soin et détente. Puis-je vous envoyer des recommandations de cliniques ? 🇬�";
    }
    
    if (lowerMessage.includes("devis") || lowerMessage.includes("gratuit") || lowerMessage.includes("estimation")) {
      return "Pour recevoir des devis personnalisés gratuits de plusieurs cliniques, il suffit de faire notre diagnostic en 2 minutes. Je vous envoie le lien ? 📋✨";
    }
    
    if (lowerMessage.includes("appel") || lowerMessage.includes("téléphone") || lowerMessage.includes("parler") || lowerMessage.includes("experte")) {
      return "Nos expertes PMA sont disponibles pour un appel gratuit ! Appelez le +33 1 23 45 67 89 ou laissez-moi votre numéro et nous vous rappelons sous 2h. 📞";
    }
    
    if (lowerMessage.includes("taux") || lowerMessage.includes("réussite") || lowerMessage.includes("chance")) {
      return "Les taux de réussite dépendent de votre âge et situation. En moyenne : <35 ans = 45-55%, 35-40 ans = 35-45%, >40 ans = 20-30%. Faites notre diagnostic pour une estimation personnalisée ! 📊";
    }
    
    if (lowerMessage.includes("don") || lowerMessage.includes("ovocyte") || lowerMessage.includes("donneuse")) {
      return "Le don d'ovocytes augmente significativement les chances de réussite (50-65%). Disponible en Espagne, Grèce, République Tchèque avec anonymat total. Prix : 6000-9000€. Des questions spécifiques ? 🥚";
    }
    
    if (lowerMessage.includes("délai") || lowerMessage.includes("attente") || lowerMessage.includes("combien de temps")) {
      return "En France : 12-24 mois d'attente. À l'étranger : rendez-vous en 4-8 semaines ! Nous pouvons vous mettre en contact rapidement avec nos cliniques partenaires. 🚀";
    }
    
    if (lowerMessage.includes("légal") || lowerMessage.includes("loi") || lowerMessage.includes("autorisé")) {
      return "C'est 100% légal ! Chaque pays a sa législation. L'Espagne, la Grèce et la République Tchèque autorisent le don d'ovocytes anonyme. Besoin de plus d'infos juridiques ? ⚖️";
    }
    
    if (lowerMessage.includes("merci") || lowerMessage.includes("ok") || lowerMessage.includes("d'accord")) {
      return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Nous sommes là pour vous accompagner dans votre projet ! 💙";
    }
    
    if (lowerMessage.includes("bonjour") || lowerMessage.includes("salut") || lowerMessage.includes("hey")) {
      return "Bonjour ! 😊 Je suis ravie de vous aider. Avez-vous des questions sur les prix, les pays, les traitements ou souhaitez-vous des devis gratuits ?";
    }

    // Réponse par défaut
    return "Je comprends votre question ! Pour vous donner la meilleure réponse personnalisée, je vous propose soit de recevoir des devis gratuits (2 min), soit de parler directement à une experte PMA (appel gratuit). Qu'est-ce qui vous conviendrait le mieux ? 😊";
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const responseText = getAutomaticResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const quickActions = [
    { text: "📋 Recevoir des devis", action: "devis" },
    { text: "📞 Appeler une experte", action: "appel" },
    { text: "💰 Comparer les prix", action: "prix" },
  ];

  const handleQuickAction = (action: string) => {
    const actionTexts: Record<string, string> = {
      devis: "Je veux recevoir des devis gratuits",
      appel: "Je veux parler à une experte",
      prix: "Quels sont les prix par pays ?",
    };
    
    setInputValue(actionTexts[action]);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-glow bg-primary hover:bg-primary-hover text-primary-foreground z-50 hover:scale-110 transition-all"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-glow z-50 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-4 text-white flex items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">FertileMap</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  En ligne
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-white text-foreground shadow-soft"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-foreground shadow-soft p-3 rounded-lg flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">En train d'écrire...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-background border-t">
              <p className="text-xs text-muted-foreground mb-2">Actions rapides :</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.action}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.action)}
                    className="text-xs"
                  >
                    {action.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-background rounded-b-lg">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Posez votre question..."
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              💬 Nous répondons généralement en moins de 2 minutes
            </p>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;