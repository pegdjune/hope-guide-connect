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
    cadreLegal: "Le cadre légal suisse autorise la FIV avec ses propres gamètes. Le don d'ovocytes n'est pas autorisé, mais le don de sperme l'est.",
    couts: "Les tarifs en Suisse sont parmi les plus élevés d'Europe, reflétant la qualité des infrastructures.",
    tauxReussite: "Les cliniques suisses affichent d'excellents taux de réussite et une expertise de pointe.",
    pourquoiChoisir: "La Suisse offre excellence médicale et proximité pour les patientes françaises.",
    logistique: "La proximité avec la France facilite les déplacements. Le français est parlé dans les cliniques romandes.",
    faq: "Les questions portent souvent sur les restrictions concernant le don d'ovocytes."
  },
};

// Fonction pour obtenir le contenu d'un pays (avec fallback générique)
export const getCountryContent = (slug: string): CountryContent => {
  if (countryContent[slug]) {
    return countryContent[slug];
  }
  
  // Fallback générique
  const country = countryMapping[slug];
  const name = country?.frenchName || slug;
  
  return {
    intro: `${name} fait partie des destinations envisagées par de nombreuses patientes françaises souhaitant réaliser une fécondation in vitro (FIV) à l'étranger. Le recours à une FIV hors de France s'explique par plusieurs facteurs : accès aux traitements, délais d'attente, cadre légal plus souple ou encore spécialisation de certaines cliniques.`,
    cadreLegal: `Le cadre légal de la procréation médicalement assistée en ${name} diffère de celui appliqué en France. L'accès à la FIV peut dépendre du statut marital, de l'âge de la patiente ou du recours à un don de gamètes.`,
    couts: `Le coût d'une FIV en ${name} varie selon plusieurs paramètres : type de traitement, recours à un don d'ovocytes, techniques complémentaires comme l'ICSI ou le PGT-A, et politique tarifaire des cliniques.`,
    tauxReussite: `Les taux de réussite observés en ${name} dépendent de l'âge de la patiente, du diagnostic d'infertilité et de l'expertise des centres médicaux.`,
    pourquoiChoisir: `Choisir ${name} pour une FIV permet souvent de bénéficier de délais plus courts, d'un accompagnement adapté aux patientes étrangères et d'une organisation optimisée des parcours de soins.`,
    logistique: `Un parcours de FIV en ${name} nécessite une bonne préparation logistique. Les cliniques proposent généralement des parcours structurés permettant de limiter les déplacements.`,
    faq: `Les patientes françaises se posent fréquemment des questions sur la légalité, le budget, les délais et la sélection des cliniques lors d'un projet de FIV en ${name}.`
  };
};

// Liste de tous les pays disponibles
export const getAllCountrySlugs = (): string[] => {
  return Object.keys(countryMapping);
};
