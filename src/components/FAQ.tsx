import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useFAQSchema } from "@/hooks/useOrganizationSchema";

const faqData = [
  {
    category: "Traitements",
    questions: [
      {
        question: "Quelle est la différence entre FIV et ICSI ?",
        answer: "La FIV (Fécondation In Vitro) consiste à mettre en contact ovocytes et spermatozoïdes dans une boîte de culture. L'ICSI (Injection Intracytoplasmique de Spermatozoïde) injecte directement un spermatozoïde dans l'ovocyte. L'ICSI est recommandée en cas d'infertilité masculine sévère."
      },
      {
        question: "Quel est le taux de réussite moyen d'une FIV ?",
        answer: "Le taux de réussite varie selon l'âge : 40-45% avant 35 ans, 30-35% entre 35-40 ans, et 15-20% après 40 ans. Les meilleures cliniques européennes affichent des taux supérieurs à ces moyennes."
      },
      {
        question: "Combien de tentatives sont nécessaires ?",
        answer: "En moyenne, 2-3 tentatives sont nécessaires pour obtenir une grossesse. Environ 65% des patientes réussissent après 3 cycles de FIV."
      },
      {
        question: "Qu'est-ce que le don d'ovocytes ?",
        answer: "Le don d'ovocytes utilise les ovules d'une donneuse anonyme. C'est recommandé pour les femmes de plus de 43 ans, en insuffisance ovarienne, ou après plusieurs échecs de FIV. Les taux de réussite sont généralement plus élevés (50-60%)."
      }
    ]
  },
  {
    category: "Prix et Budget",
    questions: [
      {
        question: "Pourquoi les prix varient-ils autant entre pays ?",
        answer: "Les coûts varient selon le niveau de vie, la réglementation, les charges salariales et la concurrence. Par exemple, la République Tchèque propose des tarifs 40-60% moins chers que la France tout en maintenant une qualité équivalente."
      },
      {
        question: "Que comprend le prix d'une FIV ?",
        answer: "Le tarif inclut généralement : consultations, analyses, médicaments de stimulation, prélèvement ovocytaire, fécondation en laboratoire, transfert d'embryon et suivi. Les examens préalables et la congélation d'embryons peuvent être en supplément."
      },
      {
        question: "Y a-t-il des aides financières ?",
        answer: "En France, l'Assurance Maladie prend en charge 4 tentatives de FIV jusqu'à 43 ans pour les femmes. À l'étranger, les frais sont à votre charge mais déductibles fiscalement dans certains cas. Certaines mutuelles remboursent partiellement."
      },
      {
        question: "Quel budget prévoir pour le séjour ?",
        answer: "Comptez environ 500-1000€ pour l'hébergement (5-7 jours), 200-500€ de vols selon la destination, et 200-300€ de frais divers. Prague et Athènes sont les destinations les plus économiques."
      }
    ]
  },
  {
    category: "Aspects Légaux",
    questions: [
      {
        question: "Est-ce légal de faire une FIV à l'étranger ?",
        answer: "Oui, c'est totalement légal. Chaque pays a sa propre législation. Certains autorisent le don d'ovocytes anonyme (Espagne, République Tchèque) quand d'autres ont des restrictions. Notre équipe vous guide sur les aspects légaux."
      },
      {
        question: "L'anonymat des donneurs est-il garanti ?",
        answer: "Oui, dans la plupart des pays européens (Espagne, République Tchèque, Grèce), le don est strictement anonyme. Au Royaume-Uni, les enfants peuvent accéder à l'identité du donneur à leur majorité."
      },
      {
        question: "Comment se passe la reconnaissance de l'enfant ?",
        answer: "L'enfant né d'une PMA à l'étranger est reconnu automatiquement s'il naît en France. Pour un accouchement à l'étranger, il faut faire une demande de transcription à l'état civil français."
      }
    ]
  },
  {
    category: "Voyage et Logistique",
    questions: [
      {
        question: "Combien de fois dois-je me déplacer ?",
        answer: "Généralement 1-2 déplacements : un séjour de 3-5 jours pour la stimulation et ponction, puis un séjour de 2-3 jours pour le transfert. Certaines cliniques proposent un protocole court en un seul voyage de 10-12 jours."
      },
      {
        question: "Puis-je venir accompagnée ?",
        answer: "Oui, absolument ! La présence de votre conjoint(e) est même requise pour les prélèvements de sperme frais. La plupart des cliniques disposent de chambres confortables pour les couples."
      },
      {
        question: "Les cliniques parlent-elles français ?",
        answer: "La plupart des grandes cliniques ont du personnel francophone ou des interprètes. Nous privilégions les établissements offrant un suivi en français pour votre confort."
      },
      {
        question: "Que se passe-t-il en cas de complication ?",
        answer: "Les cliniques partenaires sont équipées pour gérer les complications. Votre assurance voyage doit couvrir les soins médicaux à l'étranger. Nous vous accompagnons dans toutes les démarches."
      }
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Generate FAQ schema for SEO
  const allFAQs = faqData.flatMap(category => 
    category.questions.map(q => ({
      question: q.question,
      answer: q.answer,
    }))
  );
  useFAQSchema(allFAQs);

  const filteredFAQ = faqData
    .map(category => ({
      ...category,
      questions: category.questions.filter(
        q =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category => 
      (activeCategory === "all" || category.category === activeCategory) &&
      category.questions.length > 0
    );

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Trouvez des réponses à toutes vos questions sur la PMA à l'étranger
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-2 rounded-full transition-all ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Toutes
          </button>
          {faqData.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveCategory(category.category)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category.category
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQ.map((category, categoryIdx) => (
            <div key={categoryIdx} className="mb-8 animate-fade-in">
              <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full" />
                {category.category}
              </h3>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`${categoryIdx}-${idx}`}
                    className="bg-background border-2 border-border rounded-xl px-6 shadow-soft hover:shadow-large transition-all"
                  >
                    <AccordionTrigger className="text-left text-lg font-medium hover:text-primary py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {filteredFAQ.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Aucune question ne correspond à votre recherche.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;