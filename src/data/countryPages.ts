// Mapping des noms de pays (slug -> nom DB et nom français)
export const countryMapping: Record<string, { dbName: string; frenchName: string; flag: string }> = {
  'algerie': { dbName: 'Algeria', frenchName: 'Algérie', flag: '🇩🇿' },
  'allemagne': { dbName: 'Allemagne', frenchName: 'Allemagne', flag: '🇩🇪' },
  'autriche': { dbName: 'Austria', frenchName: 'Autriche', flag: '🇦🇹' },
  'belgique': { dbName: 'Belgium', frenchName: 'Belgique', flag: '🇧🇪' },
  'bulgarie': { dbName: 'Bulgaria', frenchName: 'Bulgarie', flag: '🇧🇬' },
  'republique-tcheque': { dbName: 'Czech Republik', frenchName: 'République Tchèque', flag: '🇨🇿' },
  'danemark': { dbName: 'Denmark', frenchName: 'Danemark', flag: '🇩🇰' },
  'egypte': { dbName: 'Egypt', frenchName: 'Égypte', flag: '🇪🇬' },
  'espagne': { dbName: 'Espagne', frenchName: 'Espagne', flag: '🇪🇸' },
  'finlande': { dbName: 'Finlande', frenchName: 'Finlande', flag: '🇫🇮' },
  'france': { dbName: 'France', frenchName: 'France', flag: '🇫🇷' },
  'georgie': { dbName: 'Géorgie', frenchName: 'Géorgie', flag: '🇬🇪' },
  'grece': { dbName: 'Grèce', frenchName: 'Grèce', flag: '🇬🇷' },
  'hongrie': { dbName: 'Hongrie', frenchName: 'Hongrie', flag: '🇭🇺' },
  'irlande': { dbName: 'Irlande', frenchName: 'Irlande', flag: '🇮🇪' },
  'israel': { dbName: 'Israël', frenchName: 'Israël', flag: '🇮🇱' },
  'italie': { dbName: 'Italie', frenchName: 'Italie', flag: '🇮🇹' },
  'lettonie': { dbName: 'Lettonie', frenchName: 'Lettonie', flag: '🇱🇻' },
  'lituanie': { dbName: 'Lituanie', frenchName: 'Lituanie', flag: '🇱🇹' },
  'macedoine': { dbName: 'Macédoine du Nord', frenchName: 'Macédoine du Nord', flag: '🇲🇰' },
  'maroc': { dbName: 'Maroc', frenchName: 'Maroc', flag: '🇲🇦' },
  'norvege': { dbName: 'Norvège', frenchName: 'Norvège', flag: '🇳🇴' },
  'pays-bas': { dbName: 'Pays-Bas', frenchName: 'Pays-Bas', flag: '🇳🇱' },
  'pologne': { dbName: 'Pologne', frenchName: 'Pologne', flag: '🇵🇱' },
  'portugal': { dbName: 'Portugal', frenchName: 'Portugal', flag: '🇵🇹' },
  'roumanie': { dbName: 'Roumanie', frenchName: 'Roumanie', flag: '🇷🇴' },
  'royaume-uni': { dbName: 'Royaume-Uni', frenchName: 'Royaume-Uni', flag: '🇬🇧' },
  'russie': { dbName: 'Russie', frenchName: 'Russie', flag: '🇷🇺' },
  'serbie': { dbName: 'Serbie', frenchName: 'Serbie', flag: '🇷🇸' },
  'slovaquie': { dbName: 'Slovaquie', frenchName: 'Slovaquie', flag: '🇸🇰' },
  'slovenie': { dbName: 'Slovénie', frenchName: 'Slovénie', flag: '🇸🇮' },
  'suede': { dbName: 'Suède', frenchName: 'Suède', flag: '🇸🇪' },
  'suisse': { dbName: 'Suisse', frenchName: 'Suisse', flag: '🇨🇭' },
  'tunisie': { dbName: 'Tunisie', frenchName: 'Tunisie', flag: '🇹🇳' },
  'turquie': { dbName: 'Turquie', frenchName: 'Turquie', flag: '🇹🇷' },
  'ukraine': { dbName: 'Ukraine', frenchName: 'Ukraine', flag: '🇺🇦' },
};

// Contenu SEO des fiches pays
export interface CountryContent {
  intro: string;
  cadreLegal: string;
  couts: string;
  tauxReussite: string;
  pourquoiChoisir: string;
  logistique: string;
  faq: string;
}

// Données longue traîne SEO par pays
export interface LongTailContent {
  femmeSeule: { eligible: boolean; content: string };
  coupleFemmes: { eligible: boolean; content: string };
  apres40Ans: { eligible: boolean; content: string };
  donOvocytes: { eligible: boolean; content: string };
  apresEchec: { content: string };
}

// Données comparatives pour les tableaux
export interface ComparisonData {
  coutMoyen: string;
  donOvocytes: 'Oui' | 'Non' | 'Limité';
  accesFemmesSeules: 'Oui' | 'Non';
  delais: string;
  accompagnementFR: 'Excellent' | 'Bon' | 'Limité' | 'Faible';
}

// Pays similaires pour le maillage interne
export const similarCountries: Record<string, string[]> = {
  'espagne': ['portugal', 'grece', 'republique-tcheque'],
  'portugal': ['espagne', 'grece', 'belgique'],
  'grece': ['espagne', 'republique-tcheque', 'bulgarie'],
  'republique-tcheque': ['espagne', 'grece', 'pologne'],
  'belgique': ['france', 'pays-bas', 'espagne'],
  'danemark': ['suede', 'finlande', 'belgique'],
  'allemagne': ['autriche', 'suisse', 'belgique'],
  'autriche': ['allemagne', 'suisse', 'republique-tcheque'],
  'pologne': ['republique-tcheque', 'bulgarie', 'ukraine'],
  'bulgarie': ['grece', 'republique-tcheque', 'pologne'],
  'ukraine': ['pologne', 'republique-tcheque', 'georgie'],
  'tunisie': ['maroc', 'turquie', 'espagne'],
  'turquie': ['grece', 'tunisie', 'egypte'],
  'maroc': ['tunisie', 'espagne', 'portugal'],
  'suisse': ['allemagne', 'autriche', 'france'],
  'italie': ['espagne', 'grece', 'france'],
};

// Données de comparaison par pays (pour les tableaux)
export const comparisonData: Record<string, ComparisonData> = {
  'france': { coutMoyen: '0€ (SS)', donOvocytes: 'Oui', accesFemmesSeules: 'Oui', delais: '12-24 mois', accompagnementFR: 'Excellent' },
  'espagne': { coutMoyen: '5 000-10 000€', donOvocytes: 'Oui', accesFemmesSeules: 'Oui', delais: '1-3 mois', accompagnementFR: 'Excellent' },
  'republique-tcheque': { coutMoyen: '3 000-6 000€', donOvocytes: 'Oui', accesFemmesSeules: 'Non', delais: '1-2 mois', accompagnementFR: 'Bon' },
  'grece': { coutMoyen: '3 500-5 500€', donOvocytes: 'Oui', accesFemmesSeules: 'Oui', delais: '1-2 mois', accompagnementFR: 'Bon' },
  'belgique': { coutMoyen: '4 000-8 000€', donOvocytes: 'Oui', accesFemmesSeules: 'Oui', delais: '2-6 mois', accompagnementFR: 'Excellent' },
  'portugal': { coutMoyen: '5 000-7 000€', donOvocytes: 'Oui', accesFemmesSeules: 'Oui', delais: '2-4 mois', accompagnementFR: 'Bon' },
  'danemark': { coutMoyen: '6 000-10 000€', donOvocytes: 'Oui', accesFemmesSeules: 'Oui', delais: '1-3 mois', accompagnementFR: 'Limité' },
  'pologne': { coutMoyen: '2 500-4 500€', donOvocytes: 'Limité', accesFemmesSeules: 'Non', delais: '1-2 mois', accompagnementFR: 'Limité' },
  'bulgarie': { coutMoyen: '2 500-4 500€', donOvocytes: 'Oui', accesFemmesSeules: 'Non', delais: '1-2 mois', accompagnementFR: 'Limité' },
  'ukraine': { coutMoyen: '3 000-5 000€', donOvocytes: 'Oui', accesFemmesSeules: 'Non', delais: 'Variable', accompagnementFR: 'Bon' },
  'turquie': { coutMoyen: '2 500-4 000€', donOvocytes: 'Non', accesFemmesSeules: 'Non', delais: '1-2 mois', accompagnementFR: 'Bon' },
  'tunisie': { coutMoyen: '2 000-3 500€', donOvocytes: 'Limité', accesFemmesSeules: 'Non', delais: '1-2 mois', accompagnementFR: 'Excellent' },
  'allemagne': { coutMoyen: '4 000-7 000€', donOvocytes: 'Non', accesFemmesSeules: 'Oui', delais: '3-6 mois', accompagnementFR: 'Limité' },
  'autriche': { coutMoyen: '4 000-7 000€', donOvocytes: 'Oui', accesFemmesSeules: 'Oui', delais: '2-4 mois', accompagnementFR: 'Limité' },
  'suisse': { coutMoyen: '8 000-15 000€', donOvocytes: 'Oui', accesFemmesSeules: 'Oui', delais: '2-6 mois', accompagnementFR: 'Excellent' },
  'italie': { coutMoyen: '5 000-8 000€', donOvocytes: 'Oui', accesFemmesSeules: 'Oui', delais: '3-6 mois', accompagnementFR: 'Bon' },
  'maroc': { coutMoyen: '2 500-4 000€', donOvocytes: 'Limité', accesFemmesSeules: 'Non', delais: '1-2 mois', accompagnementFR: 'Excellent' },
};

// Contenu longue traîne par pays
export const longTailContent: Record<string, LongTailContent> = {
  'espagne': {
    femmeSeule: {
      eligible: true,
      content: "L'Espagne est l'une des destinations les plus accessibles pour les femmes seules souhaitant réaliser une FIV. La législation espagnole autorise pleinement l'accès à la PMA pour les femmes célibataires, sans distinction de statut marital. Les cliniques proposent un accompagnement adapté, avec accès au don de sperme anonyme et une prise en charge complète. Les taux de réussite sont excellents et l'accompagnement francophone est généralement disponible."
    },
    coupleFemmes: {
      eligible: true,
      content: "Les couples de femmes sont pleinement acceptés dans les cliniques espagnoles pour la FIV. L'Espagne autorise la méthode ROPA (Reception of Oocytes from Partner) permettant à une partenaire de porter l'enfant conçu avec les ovocytes de l'autre. Cette option est très prisée des couples lesbiens français. L'accompagnement est personnalisé et respectueux de toutes les configurations familiales."
    },
    apres40Ans: {
      eligible: true,
      content: "La FIV en Espagne après 40 ans est tout à fait possible, avec une limite généralement fixée à 50 ans pour les traitements avec don d'ovocytes. Les cliniques espagnoles ont une grande expertise dans l'accompagnement des patientes de plus de 40 ans, proposant des protocoles adaptés et un suivi renforcé. Le don d'ovocytes permet d'optimiser les chances de réussite à cet âge."
    },
    donOvocytes: {
      eligible: true,
      content: "L'Espagne est la première destination européenne pour la FIV avec don d'ovocytes. Le don est anonyme et strictement encadré. Les donneuses sont rigoureusement sélectionnées (âge 18-35 ans, tests génétiques, évaluation psychologique). Les délais d'attente sont courts (1-3 mois) grâce à une importante banque de donneuses. Le matching phénotypique permet de trouver une donneuse compatible."
    },
    apresEchec: {
      content: "Après un échec de FIV en France, l'Espagne offre une excellente alternative. Les cliniques espagnoles disposent de technologies avancées (DPI, PICSI, culture prolongée jusqu'à J5/J6) et peuvent proposer des protocoles différents. L'analyse approfondie des échecs précédents permet d'adapter la stratégie. Le changement de clinique apporte souvent un regard neuf et des techniques complémentaires."
    }
  },
  'belgique': {
    femmeSeule: {
      eligible: true,
      content: "La Belgique accueille les femmes seules pour la FIV depuis de nombreuses années. Le cadre légal belge est l'un des plus ouverts d'Europe, permettant un accès sans discrimination. La proximité avec la France et la langue française facilitent grandement le parcours. Les cliniques belges sont reconnues pour leur excellence et proposent un accompagnement complet."
    },
    coupleFemmes: {
      eligible: true,
      content: "Les couples de femmes bénéficient d'un accès complet à la PMA en Belgique. La législation belge est particulièrement favorable et les cliniques ont une longue expérience d'accompagnement de ces couples. La méthode ROPA est disponible. La proximité avec la France permet de limiter les déplacements et facilite le suivi."
    },
    apres40Ans: {
      eligible: true,
      content: "La FIV après 40 ans est accessible en Belgique avec un accompagnement médical adapté. Les cliniques belges évaluent chaque situation individuellement et peuvent proposer le don d'ovocytes pour optimiser les chances. L'expertise belge en PMA garantit une prise en charge de qualité avec des protocoles personnalisés."
    },
    donOvocytes: {
      eligible: true,
      content: "Le don d'ovocytes est autorisé en Belgique, avec un système semi-anonyme permettant à l'enfant d'accéder à certaines informations à sa majorité. Les cliniques belges sélectionnent rigoureusement les donneuses. Les délais peuvent être plus longs qu'en Espagne mais la qualité du suivi compense cette attente."
    },
    apresEchec: {
      content: "La Belgique est une excellente option après un échec de FIV en France. Les cliniques belges offrent un regard neuf et des techniques complémentaires. La proximité permet un suivi facilité et des échanges réguliers avec l'équipe médicale. L'analyse des échecs précédents guide la nouvelle stratégie thérapeutique."
    }
  },
  'republique-tcheque': {
    femmeSeule: {
      eligible: false,
      content: "La République Tchèque ne permet pas l'accès à la FIV pour les femmes seules. La législation exige que les patientes soient en couple (marié ou union stable). Les femmes seules souhaitant une FIV doivent se tourner vers d'autres destinations comme l'Espagne, la Belgique ou le Danemark qui autorisent cette possibilité."
    },
    coupleFemmes: {
      eligible: false,
      content: "L'accès à la FIV pour les couples de femmes n'est pas autorisé en République Tchèque. La législation limite la PMA aux couples hétérosexuels. Les couples de femmes peuvent considérer l'Espagne, la Belgique ou le Danemark qui offrent un cadre légal plus ouvert et une grande expertise dans l'accompagnement de tous les modèles familiaux."
    },
    apres40Ans: {
      eligible: true,
      content: "La FIV après 40 ans est possible en République Tchèque, avec une limite généralement fixée à 49 ans. Les cliniques tchèques ont une excellente expertise dans l'accompagnement des patientes de cet âge. Le don d'ovocytes anonyme permet d'optimiser considérablement les chances de réussite avec des tarifs très compétitifs."
    },
    donOvocytes: {
      eligible: true,
      content: "La République Tchèque est une destination majeure pour la FIV avec don d'ovocytes en Europe. Le don est strictement anonyme. Les cliniques tchèques disposent d'importantes banques de donneuses, permettant des délais courts et un excellent matching. Les tarifs sont parmi les plus compétitifs d'Europe pour une qualité médicale excellente."
    },
    apresEchec: {
      content: "Après un échec de FIV, la République Tchèque offre d'excellentes perspectives. Les cliniques utilisent des technologies de pointe (PGT-A, time-lapse, vitrification avancée) et analysent en détail les causes d'échec. Le rapport qualité-prix exceptionnel permet d'envisager plusieurs tentatives. L'expertise tchèque en FIV est reconnue internationalement."
    }
  },
  'grece': {
    femmeSeule: {
      eligible: true,
      content: "La Grèce autorise la FIV pour les femmes seules jusqu'à 50 ans. Le cadre légal grec est favorable et les cliniques ont l'habitude d'accompagner les femmes célibataires dans leur projet de maternité. Le don de sperme anonyme est accessible et les tarifs restent très compétitifs par rapport à d'autres destinations."
    },
    coupleFemmes: {
      eligible: false,
      content: "La législation grecque ne permet pas encore l'accès à la FIV pour les couples de femmes. Les couples lesbiens souhaitant une PMA doivent se tourner vers l'Espagne, la Belgique ou le Danemark qui offrent un cadre légal adapté. La Grèce reste cependant accessible pour les femmes seules."
    },
    apres40Ans: {
      eligible: true,
      content: "La Grèce est une excellente option pour la FIV après 40 ans, avec une limite à 50 ans. Les cliniques grecques sont expérimentées dans l'accompagnement des patientes de cet âge et proposent le don d'ovocytes à des tarifs très attractifs. Le climat méditerranéen et l'accueil chaleureux ajoutent au confort du parcours."
    },
    donOvocytes: {
      eligible: true,
      content: "Le don d'ovocytes en Grèce est anonyme et bien encadré. Les cliniques grecques disposent de donneuses sélectionnées avec soin. Les tarifs sont parmi les plus bas d'Europe (3 500-5 500€) pour une qualité de soins excellente. Le délai d'attente est généralement court et le matching phénotypique soigné."
    },
    apresEchec: {
      content: "La Grèce offre une alternative intéressante après un échec de FIV, combinant expertise médicale, tarifs attractifs et cadre agréable. Les cliniques grecques proposent des technologies modernes et une approche personnalisée. Le changement d'environnement peut aussi contribuer à réduire le stress associé aux traitements."
    }
  },
  'portugal': {
    femmeSeule: {
      eligible: true,
      content: "Depuis 2016, le Portugal autorise la FIV pour les femmes seules. Le cadre légal est clair et les cliniques portugaises accueillent les femmes célibataires avec professionnalisme. La proximité géographique et culturelle avec la France facilite le parcours. Le don de sperme est accessible et les tarifs sont modérés."
    },
    coupleFemmes: {
      eligible: true,
      content: "Les couples de femmes sont acceptés pour la FIV au Portugal depuis 2016. La législation est ouverte et les cliniques ont développé une expertise dans l'accompagnement de tous les modèles familiaux. La proximité avec la France et l'accessibilité linguistique sont des atouts majeurs."
    },
    apres40Ans: {
      eligible: true,
      content: "Le Portugal propose la FIV aux femmes de plus de 40 ans, avec des protocoles adaptés et un accès au don d'ovocytes. Les cliniques portugaises développent rapidement leur expertise et offrent un accompagnement personnalisé. Le climat agréable et l'accueil chaleureux participent au bien-être des patientes."
    },
    donOvocytes: {
      eligible: true,
      content: "Le don d'ovocytes est autorisé au Portugal depuis 2016, avec un système permettant à l'enfant d'accéder à certaines informations à sa majorité. Les cliniques développent leurs banques de donneuses. Les délais peuvent être un peu plus longs qu'en Espagne mais les tarifs restent compétitifs."
    },
    apresEchec: {
      content: "Le Portugal peut être une bonne option après un échec de FIV, offrant un cadre médical de qualité et une approche différente. Les cliniques portugaises sont en plein développement et investissent dans les dernières technologies. La proximité avec la France permet un suivi facilité."
    }
  },
  'danemark': {
    femmeSeule: {
      eligible: true,
      content: "Le Danemark est pionnier dans l'accès à la PMA pour les femmes seules, avec des décennies d'expérience. Les cliniques danoises sont mondialement reconnues pour leur expertise. Les banques de sperme danoises sont parmi les plus importantes au monde, offrant un large choix de donneurs identifiables ou anonymes."
    },
    coupleFemmes: {
      eligible: true,
      content: "Les couples de femmes bénéficient d'un accès complet à la FIV au Danemark. Le pays est un leader européen en matière d'ouverture et d'expertise. Les cliniques danoises proposent la méthode ROPA et un accompagnement respectueux de tous les modèles familiaux."
    },
    apres40Ans: {
      eligible: true,
      content: "La FIV après 40 ans est accessible au Danemark avec un accompagnement médical expert. Les cliniques danoises évaluent chaque situation individuellement et proposent des protocoles optimisés. Le don d'ovocytes est disponible pour maximiser les chances de réussite."
    },
    donOvocytes: {
      eligible: true,
      content: "Le don d'ovocytes au Danemark est possible avec un système flexible permettant de choisir entre don anonyme ou identifiable. Les cliniques danoises appliquent des standards élevés de sélection. Les tarifs sont plus élevés qu'en Europe de l'Est mais la qualité est excellente."
    },
    apresEchec: {
      content: "Le Danemark offre une expertise de premier plan après un échec de FIV. Les cliniques danoises utilisent les technologies les plus avancées et ont une longue expérience des cas complexes. L'approche scandinave, centrée sur le bien-être du patient, contribue à réduire le stress."
    }
  },
};

// Contenu générique longue traîne pour les pays sans données spécifiques
export const getGenericLongTailContent = (countryName: string, eligible: boolean): LongTailContent => ({
  femmeSeule: {
    eligible,
    content: eligible 
      ? `${countryName} autorise l'accès à la FIV pour les femmes seules. Le cadre légal permet aux femmes célibataires de réaliser leur projet de maternité avec un accompagnement médical adapté. Les cliniques proposent un accès au don de sperme et un suivi personnalisé.`
      : `La législation en ${countryName} ne permet pas l'accès à la FIV pour les femmes seules. Les femmes célibataires doivent se tourner vers d'autres destinations comme l'Espagne, la Belgique ou le Danemark qui autorisent cette possibilité.`
  },
  coupleFemmes: {
    eligible,
    content: eligible
      ? `Les couples de femmes sont acceptés pour la FIV en ${countryName}. La législation permet l'accès à la PMA pour les couples lesbiens, avec des options comme la méthode ROPA dans certains cas. Les cliniques ont l'expérience de l'accompagnement de tous les modèles familiaux.`
      : `L'accès à la FIV pour les couples de femmes n'est pas autorisé en ${countryName}. Les couples lesbiens doivent considérer l'Espagne, la Belgique ou le Danemark pour réaliser leur projet de parentalité.`
  },
  apres40Ans: {
    eligible: true,
    content: `La FIV après 40 ans est possible en ${countryName}, généralement jusqu'à 45-50 ans selon les cliniques. Le don d'ovocytes permet d'optimiser les chances de réussite à cet âge. Les cliniques proposent des protocoles adaptés et un suivi renforcé pour les patientes de plus de 40 ans.`
  },
  donOvocytes: {
    eligible,
    content: eligible
      ? `Le don d'ovocytes est autorisé en ${countryName}. Les cliniques disposent de donneuses sélectionnées selon des critères stricts. Le matching phénotypique permet de trouver une donneuse compatible et les délais varient selon les cliniques.`
      : `Le don d'ovocytes n'est pas autorisé en ${countryName}. Les patientes ayant besoin d'un don d'ovocytes doivent se tourner vers des destinations comme l'Espagne, la Grèce ou la République Tchèque.`
  },
  apresEchec: {
    content: `${countryName} peut être une option intéressante après un échec de FIV. Un changement de clinique permet d'avoir un regard neuf sur le dossier et d'envisager des techniques différentes. Les cliniques analysent les échecs précédents pour adapter la stratégie thérapeutique.`
  }
});

// Helper pour obtenir le contenu longue traîne d'un pays
export const getLongTailContent = (slug: string): LongTailContent => {
  if (longTailContent[slug]) {
    return longTailContent[slug];
  }
  
  const countryInfo = countryMapping[slug];
  if (!countryInfo) {
    return getGenericLongTailContent('ce pays', false);
  }
  
  // Déterminer l'éligibilité en fonction du pays
  const openCountries = ['espagne', 'belgique', 'portugal', 'danemark', 'grece', 'suede', 'finlande', 'pays-bas', 'autriche', 'allemagne', 'suisse', 'irlande', 'royaume-uni'];
  const eligible = openCountries.includes(slug);
  
  return getGenericLongTailContent(countryInfo.frenchName, eligible);
};

// Helper pour obtenir les données de comparaison d'un pays
export const getComparisonData = (slug: string): ComparisonData | null => {
  return comparisonData[slug] || null;
};

// Helper pour obtenir les pays similaires
export const getSimilarCountries = (slug: string): string[] => {
  return similarCountries[slug] || ['espagne', 'grece', 'republique-tcheque'];
};

export const countryContent: Record<string, CountryContent> = {
  'algerie': {
    intro: "L'Algérie fait partie des destinations envisagées par de nombreuses patientes françaises souhaitant réaliser une fécondation in vitro (FIV) à l'étranger. Le recours à une FIV hors de France s'explique par plusieurs facteurs : accès aux traitements, délais d'attente, cadre légal plus souple ou encore spécialisation de certaines cliniques.",
    cadreLegal: "Le cadre légal de la procréation médicalement assistée en Algérie diffère de celui appliqué en France. L'accès à la FIV peut dépendre du statut marital, de l'âge de la patiente ou du recours à un don de gamètes. Certaines législations autorisent la FIV avec don d'ovocytes, le diagnostic génétique préimplantatoire (PGT) ou l'accès aux femmes seules et aux couples de femmes.",
    couts: "Le coût d'une FIV en Algérie varie selon plusieurs paramètres : type de traitement, recours à un don d'ovocytes, techniques complémentaires comme l'ICSI ou le PGT-A, et politique tarifaire des cliniques. Il est indispensable d'anticiper l'ensemble des frais, y compris les médicaments et les déplacements.",
    tauxReussite: "Les taux de réussite observés en Algérie dépendent de l'âge de la patiente, du diagnostic d'infertilité et de l'expertise des centres médicaux. De nombreuses cliniques répondent aux standards européens les plus exigeants et publient des indicateurs de performance.",
    pourquoiChoisir: "Choisir l'Algérie pour une FIV permet souvent de bénéficier de délais plus courts, d'un accompagnement adapté aux patientes étrangères et d'une organisation optimisée des parcours de soins.",
    logistique: "Un parcours de FIV en Algérie nécessite une bonne préparation logistique. Les cliniques proposent généralement des parcours structurés permettant de limiter les déplacements tout en garantissant la qualité du suivi médical.",
    faq: "Les patientes françaises se posent fréquemment des questions sur la légalité, le budget, les délais et la sélection des cliniques lors d'un projet de FIV en Algérie. Ces éléments doivent être clarifiés avant de s'engager."
  },
  'autriche': {
    intro: "L'Autriche fait partie des destinations envisagées par de nombreuses patientes françaises souhaitant réaliser une fécondation in vitro (FIV) à l'étranger. Le recours à une FIV hors de France s'explique par plusieurs facteurs : accès aux traitements, délais d'attente, cadre légal plus souple ou encore spécialisation de certaines cliniques.",
    cadreLegal: "Le cadre légal de la procréation médicalement assistée en Autriche diffère de celui appliqué en France. L'accès à la FIV peut dépendre du statut marital, de l'âge de la patiente ou du recours à un don de gamètes. Certaines législations autorisent la FIV avec don d'ovocytes, le diagnostic génétique préimplantatoire (PGT) ou l'accès aux femmes seules et aux couples de femmes.",
    couts: "Le coût d'une FIV en Autriche varie selon plusieurs paramètres : type de traitement, recours à un don d'ovocytes, techniques complémentaires comme l'ICSI ou le PGT-A, et politique tarifaire des cliniques. Il est indispensable d'anticiper l'ensemble des frais, y compris les médicaments et les déplacements.",
    tauxReussite: "Les taux de réussite observés en Autriche dépendent de l'âge de la patiente, du diagnostic d'infertilité et de l'expertise des centres médicaux. De nombreuses cliniques répondent aux standards européens les plus exigeants et publient des indicateurs de performance.",
    pourquoiChoisir: "Choisir l'Autriche pour une FIV permet souvent de bénéficier de délais plus courts, d'un accompagnement adapté aux patientes étrangères et d'une organisation optimisée des parcours de soins.",
    logistique: "Un parcours de FIV en Autriche nécessite une bonne préparation logistique. Les cliniques proposent généralement des parcours structurés permettant de limiter les déplacements tout en garantissant la qualité du suivi médical.",
    faq: "Les patientes françaises se posent fréquemment des questions sur la légalité, le budget, les délais et la sélection des cliniques lors d'un projet de FIV en Autriche. Ces éléments doivent être clarifiés avant de s'engager."
  },
  'belgique': {
    intro: "La Belgique fait partie des destinations privilégiées par de nombreuses patientes françaises souhaitant réaliser une fécondation in vitro (FIV) à l'étranger. Proximité géographique, cadre légal ouvert et excellence médicale en font une destination de choix.",
    cadreLegal: "Le cadre légal de la procréation médicalement assistée en Belgique est l'un des plus ouverts d'Europe. L'accès à la FIV est possible pour les femmes seules et les couples de femmes. Le don d'ovocytes et le diagnostic préimplantatoire (DPI) sont autorisés.",
    couts: "Le coût d'une FIV en Belgique varie selon plusieurs paramètres : type de traitement, recours à un don d'ovocytes, techniques complémentaires comme l'ICSI ou le PGT-A. Comptez entre 4 000€ et 9 000€ selon le traitement.",
    tauxReussite: "Les taux de réussite observés en Belgique sont parmi les meilleurs d'Europe, grâce à l'expertise reconnue des centres belges et leur longue expérience en PMA.",
    pourquoiChoisir: "Choisir la Belgique pour une FIV permet de bénéficier d'une proximité avec la France, d'un cadre légal ouvert et d'une expertise médicale de haut niveau.",
    logistique: "La proximité avec la France facilite grandement le parcours. Les trajets sont courts et les cliniques proposent un accompagnement en français.",
    faq: "Les patientes françaises se posent fréquemment des questions sur la légalité, le budget, les délais et la sélection des cliniques lors d'un projet de FIV en Belgique."
  },
  'bulgarie': {
    intro: "La Bulgarie fait partie des destinations émergentes pour la FIV en Europe, attirant de nombreuses patientes grâce à ses tarifs compétitifs et ses cliniques modernes.",
    cadreLegal: "Le cadre légal bulgare autorise la FIV, le don d'ovocytes et de sperme. L'accès est généralement ouvert aux couples hétérosexuels mariés ou en union stable.",
    couts: "Les tarifs en Bulgarie sont parmi les plus attractifs d'Europe, avec des FIV à partir de 2 500€. Le don d'ovocytes reste également très accessible.",
    tauxReussite: "Les cliniques bulgares affichent des taux de réussite compétitifs et investissent dans des équipements de dernière génération.",
    pourquoiChoisir: "La Bulgarie offre un excellent rapport qualité-prix, des cliniques modernes et une destination facilement accessible depuis la France.",
    logistique: "Les vols directs depuis Paris facilitent l'accès. Les cliniques proposent des packages tout compris incluant hébergement.",
    faq: "Les patientes s'interrogent souvent sur la qualité des soins et les tarifs. Les retours sont généralement positifs."
  },
  'republique-tcheque': {
    intro: "La République Tchèque est l'une des destinations les plus populaires pour la FIV en Europe, reconnue pour ses cliniques de renommée internationale et ses tarifs compétitifs.",
    cadreLegal: "Le cadre légal tchèque est favorable à la PMA. Le don d'ovocytes anonyme est autorisé, ainsi que le DPI. L'âge limite pour les traitements est généralement de 49 ans.",
    couts: "Les tarifs en République Tchèque sont très compétitifs : comptez 3 000€ à 5 000€ pour une FIV classique et 5 000€ à 8 000€ avec don d'ovocytes.",
    tauxReussite: "Les cliniques tchèques affichent d'excellents taux de réussite, parmi les meilleurs d'Europe, grâce à leur expertise et leurs technologies avancées.",
    pourquoiChoisir: "La République Tchèque combine excellence médicale, tarifs attractifs et facilité d'accès depuis la France.",
    logistique: "Prague est facilement accessible en avion. Les cliniques proposent un accompagnement francophone et des packages incluant hébergement.",
    faq: "Les questions portent souvent sur l'anonymat du don et les délais d'attente, généralement courts."
  },
  'danemark': {
    intro: "Le Danemark est reconnu comme un leader mondial de la fertilité, notamment pour le don de sperme et les traitements de PMA pour les femmes seules.",
    cadreLegal: "Le cadre légal danois est très ouvert : accès aux femmes seules, couples lesbiens, don de sperme identifiable ou anonyme selon le choix.",
    couts: "Les tarifs au Danemark sont plus élevés que dans certains pays d'Europe de l'Est, mais la qualité des soins justifie l'investissement.",
    tauxReussite: "Les cliniques danoises affichent d'excellents taux de réussite et une expertise reconnue internationalement.",
    pourquoiChoisir: "Le Danemark est idéal pour les femmes seules et les couples de femmes grâce à sa législation ouverte.",
    logistique: "Copenhague est bien desservie depuis la France. L'anglais est largement parlé dans les cliniques.",
    faq: "Les questions portent souvent sur l'accès aux femmes seules et les banques de sperme réputées."
  },
  'espagne': {
    intro: "L'Espagne est la première destination européenne pour la FIV, avec plus de 500 cliniques et une expertise reconnue mondialement, notamment pour le don d'ovocytes.",
    cadreLegal: "Le cadre légal espagnol est très favorable : don d'ovocytes anonyme, accès aux femmes seules et couples lesbiens, DPI autorisé. L'âge limite est généralement de 50 ans.",
    couts: "Les tarifs en Espagne varient de 5 000€ à 10 000€ pour une FIV avec don d'ovocytes. Les cliniques proposent souvent des packages tout compris.",
    tauxReussite: "L'Espagne affiche les meilleurs taux de réussite d'Europe pour le don d'ovocytes, grâce à une base de donneuses importante et une expertise de pointe.",
    pourquoiChoisir: "L'Espagne combine excellence médicale, cadre légal ouvert, proximité géographique et accompagnement en français dans de nombreuses cliniques.",
    logistique: "Barcelone et Madrid sont facilement accessibles. De nombreuses cliniques proposent un accompagnement francophone dédié.",
    faq: "Les questions portent souvent sur le choix de la clinique parmi l'offre importante et les délais pour trouver une donneuse."
  },
  'grece': {
    intro: "La Grèce est une destination de plus en plus prisée pour la FIV, offrant un excellent rapport qualité-prix et des cliniques modernes.",
    cadreLegal: "Le cadre légal grec autorise le don d'ovocytes anonyme, le don de sperme et le DPI. L'accès est ouvert aux femmes jusqu'à 50 ans.",
    couts: "Les tarifs en Grèce sont très compétitifs : 3 500€ à 5 500€ pour une FIV avec don d'ovocytes, parmi les plus bas d'Europe.",
    tauxReussite: "Les cliniques grecques affichent de bons taux de réussite et investissent dans des équipements modernes.",
    pourquoiChoisir: "La Grèce offre un excellent rapport qualité-prix, un climat agréable et une destination touristique pour réduire le stress.",
    logistique: "Athènes et Thessalonique sont bien desservies. Les cliniques proposent un accompagnement anglophone et parfois francophone.",
    faq: "Les patientes apprécient le cadre et les tarifs. Les questions portent sur la qualité des donneuses."
  },
  'portugal': {
    intro: "Le Portugal est une destination émergente pour la FIV, offrant un cadre légal récemment modernisé et des cliniques de qualité.",
    cadreLegal: "Depuis 2016, le Portugal autorise le don d'ovocytes, le don de sperme et l'accès à la PMA pour les femmes seules et couples de femmes.",
    couts: "Les tarifs au Portugal sont modérés : comptez 5 000€ à 7 000€ pour une FIV avec don d'ovocytes.",
    tauxReussite: "Les cliniques portugaises développent rapidement leur expertise et affichent des taux de réussite en progression.",
    pourquoiChoisir: "Le Portugal offre proximité, climat agréable, francophonie partielle et cadre légal ouvert.",
    logistique: "Lisbonne et Porto sont facilement accessibles. Le portugais est proche du français et l'anglais est courant.",
    faq: "Les questions portent sur la disponibilité des donneuses et les délais d'attente."
  },
  'pologne': {
    intro: "La Pologne offre des traitements de FIV à des tarifs compétitifs avec des cliniques bien équipées.",
    cadreLegal: "Le cadre légal polonais autorise la FIV pour les couples hétérosexuels. Le don de gamètes est possible sous certaines conditions.",
    couts: "Les tarifs en Pologne sont attractifs : comptez 2 500€ à 4 500€ pour une FIV classique.",
    tauxReussite: "Les cliniques polonaises affichent de bons résultats et une expertise croissante.",
    pourquoiChoisir: "La Pologne offre un bon rapport qualité-prix et une facilité d'accès depuis la France.",
    logistique: "Varsovie et Cracovie sont bien desservies. L'anglais est courant dans les cliniques.",
    faq: "Les questions portent souvent sur le cadre légal et les restrictions pour certaines situations."
  },
  'ukraine': {
    intro: "L'Ukraine était une destination majeure pour la FIV et la GPA avant 2022. La situation actuelle nécessite une attention particulière.",
    cadreLegal: "Le cadre légal ukrainien est très ouvert, autorisant la FIV, le don de gamètes et la GPA pour les couples hétérosexuels mariés.",
    couts: "Les tarifs en Ukraine étaient parmi les plus bas d'Europe, mais la situation actuelle impacte les parcours.",
    tauxReussite: "Les cliniques ukrainiennes avaient développé une expertise reconnue, notamment en GPA.",
    pourquoiChoisir: "La situation géopolitique actuelle nécessite une évaluation prudente des options.",
    logistique: "La situation actuelle rend les déplacements complexes. Il est recommandé de consulter les dernières recommandations officielles.",
    faq: "Les questions portent principalement sur la sécurité et l'accessibilité des cliniques."
  },
  'turquie': {
    intro: "La Turquie offre des traitements de FIV à des tarifs compétitifs dans des cliniques modernes.",
    cadreLegal: "Le cadre légal turc autorise la FIV pour les couples mariés hétérosexuels. Le don de gamètes n'est pas autorisé.",
    couts: "Les tarifs en Turquie sont attractifs pour la FIV classique, à partir de 2 500€.",
    tauxReussite: "Les cliniques turques investissent dans des équipements modernes et affichent de bons taux de réussite.",
    pourquoiChoisir: "La Turquie offre un bon rapport qualité-prix pour la FIV avec ses propres ovocytes.",
    logistique: "Istanbul est facilement accessible. De nombreuses cliniques proposent des packages tourisme médical.",
    faq: "Les restrictions sur le don de gamètes orientent certaines patientes vers d'autres destinations."
  },
  'tunisie': {
    intro: "La Tunisie est une destination accessible pour les patientes francophones cherchant une FIV à tarifs modérés.",
    cadreLegal: "Le cadre légal tunisien autorise la FIV pour les couples mariés. Le don de gamètes est possible sous certaines conditions.",
    couts: "Les tarifs en Tunisie sont compétitifs, avec des FIV à partir de 2 000€.",
    tauxReussite: "Les cliniques tunisiennes offrent un bon niveau de soins à des tarifs accessibles.",
    pourquoiChoisir: "La Tunisie offre proximité, francophonie et tarifs attractifs.",
    logistique: "Tunis est facilement accessible depuis la France. Le français est largement parlé.",
    faq: "Les questions portent sur la qualité des soins et les comparaisons avec d'autres destinations."
  },
  'suisse': {
    intro: "La Suisse offre des traitements de FIV de haute qualité dans un environnement médical de premier plan.",
    cadreLegal: "Le cadre légal suisse autorise la FIV et récemment le don de sperme. Le don d'ovocytes n'est pas encore autorisé mais en discussion.",
    couts: "Les tarifs en Suisse sont parmi les plus élevés d'Europe, reflétant le niveau de vie et la qualité des soins.",
    tauxReussite: "Les cliniques suisses affichent d'excellents taux de réussite et une qualité médicale irréprochable.",
    pourquoiChoisir: "La Suisse offre excellence médicale, proximité et environnement sécurisant.",
    logistique: "Genève et Zurich sont facilement accessibles. Le français est parlé dans la partie romande.",
    faq: "Les questions portent sur les tarifs élevés et les restrictions sur le don d'ovocytes."
  },
  'italie': {
    intro: "L'Italie a récemment assoupli sa législation sur la PMA, devenant une option intéressante pour certaines patientes.",
    cadreLegal: "Le cadre légal italien a évolué et autorise désormais le don de gamètes et l'accès à la PMA pour les couples hétérosexuels.",
    couts: "Les tarifs en Italie sont comparables à ceux de l'Europe occidentale, entre 5 000€ et 8 000€.",
    tauxReussite: "Les cliniques italiennes affichent de bons taux de réussite avec une expertise en croissance.",
    pourquoiChoisir: "L'Italie offre proximité, qualité médicale et un environnement culturel agréable.",
    logistique: "Rome, Milan et les grandes villes sont facilement accessibles. L'italien est proche du français.",
    faq: "Les questions portent sur les évolutions législatives récentes et les options disponibles."
  },
  'maroc': {
    intro: "Le Maroc est une destination accessible pour les patientes francophones cherchant une FIV à tarifs modérés.",
    cadreLegal: "Le cadre légal marocain autorise la FIV pour les couples mariés. Le don de gamètes est encadré.",
    couts: "Les tarifs au Maroc sont compétitifs, avec des FIV à partir de 2 500€.",
    tauxReussite: "Les cliniques marocaines offrent un bon niveau de soins avec une expertise croissante.",
    pourquoiChoisir: "Le Maroc offre proximité, francophonie complète et tarifs attractifs.",
    logistique: "Casablanca et Rabat sont facilement accessibles. Le français est la langue courante.",
    faq: "Les questions portent sur la qualité des soins et les comparaisons avec d'autres destinations francophones."
  },
};

// Fonction pour obtenir le contenu d'un pays
export const getCountryContent = (slug: string): CountryContent => {
  if (countryContent[slug]) {
    return countryContent[slug];
  }
  
  // Contenu générique si le pays n'a pas de contenu spécifique
  const countryInfo = countryMapping[slug];
  if (!countryInfo) {
    return {
      intro: "Information non disponible pour ce pays.",
      cadreLegal: "Information non disponible.",
      couts: "Information non disponible.",
      tauxReussite: "Information non disponible.",
      pourquoiChoisir: "Information non disponible.",
      logistique: "Information non disponible.",
      faq: "Information non disponible."
    };
  }
  
  return {
    intro: `${countryInfo.frenchName} fait partie des destinations envisagées par les patientes françaises pour réaliser une FIV à l'étranger. Le recours à une FIV hors de France s'explique par plusieurs facteurs : accès aux traitements, délais d'attente, cadre légal ou spécialisation de certaines cliniques.`,
    cadreLegal: `Le cadre légal de la procréation médicalement assistée en ${countryInfo.frenchName} peut différer de celui appliqué en France. Il est important de se renseigner sur les conditions d'accès spécifiques.`,
    couts: `Le coût d'une FIV en ${countryInfo.frenchName} varie selon le type de traitement et les techniques complémentaires utilisées. Une demande de devis permet d'obtenir des informations précises.`,
    tauxReussite: `Les taux de réussite en ${countryInfo.frenchName} dépendent de nombreux facteurs : âge de la patiente, diagnostic et expertise des cliniques.`,
    pourquoiChoisir: `Choisir ${countryInfo.frenchName} pour une FIV peut présenter des avantages en termes de délais, de tarifs ou d'accessibilité selon votre situation.`,
    logistique: `Un parcours de FIV en ${countryInfo.frenchName} nécessite une préparation logistique adaptée. Les cliniques peuvent vous accompagner dans l'organisation de votre séjour.`,
    faq: `N'hésitez pas à nous contacter pour toute question sur la FIV en ${countryInfo.frenchName}.`
  };
};

// Fonction pour obtenir tous les slugs de pays
export const getAllCountrySlugs = (): string[] => {
  return Object.keys(countryMapping);
};
