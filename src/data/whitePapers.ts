export interface WhitePaper {
  id: string;
  title: string;
  format: "guide" | "article" | "faq";
  target: string;
  description: string;
  icon: string;
  downloadUrl?: string;
  category: "parcours" | "finances" | "etranger" | "don" | "couples" | "sante";
}

export const whitePapers: WhitePaper[] = [
  {
    id: "parcours-pma-france",
    title: "Guide du parcours PMA en France",
    format: "guide",
    target: "Couples hétéros, femmes et hommes en essai bébé",
    description: "Présentation pas-à-pas du parcours PMA en France : bilan initial, examens, insémination/FIV, transfert d'embryon, suivi post-TEC.",
    icon: "🇫🇷",
    category: "parcours"
  },
  {
    id: "remboursement-etranger",
    title: "Guide remboursement PMA à l'étranger",
    format: "guide",
    target: "Patient·es PMA à l'étranger",
    description: "Démarches et documents nécessaires (formulaires S3125, S2, S3140C) pour le remboursement CNSE d'un protocole PMA à l'étranger.",
    icon: "💶",
    category: "finances"
  },
  {
    id: "cout-aides-pma",
    title: "Coût et aides financières PMA",
    format: "article",
    target: "Tous patient·es PMA",
    description: "Bilan des coûts liés à la PMA en France et des aides possibles : mutuelle, allocations, aides CAF.",
    icon: "💰",
    category: "finances"
  },
  {
    id: "checklist-rdv",
    title: "Questions premier RDV PMA",
    format: "article",
    target: "Couples préparant la PMA",
    description: "Liste des questions essentielles à poser au gynécologue pour préparer votre premier rendez-vous PMA.",
    icon: "📋",
    category: "parcours"
  },
  {
    id: "examens-complementaires",
    title: "Examens complémentaires PMA",
    format: "guide",
    target: "Patient·es après échecs",
    description: "Synthèse des examens proposés : hystéroscopie, caryotype, ERA, ALICE/EMMA, bilan immunologique.",
    icon: "🔬",
    category: "sante"
  },
  {
    id: "stimulation-ovarienne",
    title: "Stimulation ovarienne : protocoles",
    format: "article",
    target: "Femmes en parcours de stimulation",
    description: "Explication des protocoles de stimulation (antagoniste, agoniste, clomid) et bonnes pratiques.",
    icon: "💉",
    category: "sante"
  },
  {
    id: "effets-secondaires",
    title: "Effets secondaires traitements PMA",
    format: "article",
    target: "Tous patient·es PMA",
    description: "Catalogue des effets indésirables courants et conseils pour les gérer (hyperstimulation, fatigue...).",
    icon: "⚠️",
    category: "sante"
  },
  {
    id: "nutrition-mode-vie",
    title: "Nutrition et mode de vie en PMA",
    format: "article",
    target: "Tous patient·es PMA",
    description: "Recommandations diététiques et conseils de mode de vie favorables à la fertilité.",
    icon: "🥗",
    category: "sante"
  },
  {
    id: "gestion-stress",
    title: "Gestion du stress en PMA",
    format: "article",
    target: "Tous patient·es PMA",
    description: "Conseils pour faire face au stress et à l'anxiété du parcours PMA : relaxation, soutien psy.",
    icon: "🧘",
    category: "sante"
  },
  {
    id: "suivi-grossesse",
    title: "Suivi grossesse après PMA",
    format: "article",
    target: "Femmes enceintes suite à PMA",
    description: "Informations sur le suivi de grossesse obtenu par PMA : échographies, suivi spécialisé.",
    icon: "🤰",
    category: "parcours"
  },
  {
    id: "don-ovocytes-sperme",
    title: "Don d'ovocytes et de sperme",
    format: "faq",
    target: "Couples infertiles et femmes seules",
    description: "Mode d'emploi complet du don d'ovocytes, de sperme et d'embryon en France et à l'étranger.",
    icon: "🎁",
    category: "don"
  },
  {
    id: "pma-couples-femmes",
    title: "PMA pour les couples de femmes",
    format: "guide",
    target: "Couples lesbiens",
    description: "Procédure et spécificités pour les couples de femmes : démarche CECOS, loi PMA pour toutes.",
    icon: "👩‍❤️‍👩",
    category: "couples"
  },
  {
    id: "pma-femme-seule",
    title: "PMA pour femme seule",
    format: "article",
    target: "Femme célibataire",
    description: "Options de PMA pour une femme seule : don de sperme, centres PMA, parcours France ou étranger.",
    icon: "👩",
    category: "couples"
  },
  {
    id: "pma-etranger-pays",
    title: "Guide PMA à l'étranger par pays",
    format: "guide",
    target: "Patient·es envisageant PMA hors France",
    description: "Dossiers pays par pays : Espagne, République tchèque, Portugal, Danemark. Législation, tarifs, cliniques.",
    icon: "🌍",
    category: "etranger"
  },
  {
    id: "comparatif-cliniques",
    title: "Comparatif des cliniques PMA",
    format: "article",
    target: "Tous patient·es PMA",
    description: "Tableau comparatif des cliniques avec spécialités, taux de réussite, tarifs et retours d'expérience.",
    icon: "📊",
    category: "etranger"
  }
];

// Fonction pour obtenir un livre blanc aléatoire par catégorie
export const getRandomWhitePaper = (excludeIds: string[] = []): WhitePaper => {
  const available = whitePapers.filter(wp => !excludeIds.includes(wp.id));
  return available[Math.floor(Math.random() * available.length)] || whitePapers[0];
};

// Fonction pour obtenir des livres blancs par catégorie
export const getWhitePapersByCategory = (category: WhitePaper["category"]): WhitePaper[] => {
  return whitePapers.filter(wp => wp.category === category);
};
