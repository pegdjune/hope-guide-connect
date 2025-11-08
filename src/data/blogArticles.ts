export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: "traitements" | "temoignages" | "guides-pays" | "conseils";
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    id: "1",
    title: "FIV vs ICSI : Quelle différence et quel traitement choisir ?",
    slug: "fiv-vs-icsi-differences-traitement",
    category: "traitements",
    excerpt: "Comprendre les différences entre la FIV classique et l'ICSI pour faire le bon choix selon votre situation.",
    content: `
# FIV vs ICSI : Quelle différence et quel traitement choisir ?

La **Fécondation In Vitro (FIV)** et l'**Injection Intracytoplasmique de Spermatozoïde (ICSI)** sont deux techniques de procréation médicalement assistée. Bien que similaires, elles diffèrent dans leur approche de la fécondation.

## La FIV Classique

Dans la FIV classique, les ovocytes et les spermatozoïdes sont mis en contact dans une boîte de culture. Les spermatozoïdes doivent traverser naturellement la paroi de l'ovocyte pour le féconder.

### Avantages de la FIV :
- Processus plus naturel
- Moins invasif techniquement
- Coût généralement moins élevé
- Permet d'observer la capacité naturelle de fécondation

### Quand choisir la FIV ?
- Infertilité tubaire
- Endométriose légère à modérée
- Infertilité inexpliquée
- Problèmes d'ovulation

## L'ICSI

L'ICSI va plus loin : un embryologiste sélectionne un spermatozoïde et l'injecte directement dans l'ovocyte à l'aide d'une micro-pipette.

### Avantages de l'ICSI :
- Surmonte les problèmes de qualité du sperme
- Taux de fécondation plus élevés
- Indiqué en cas d'échec de FIV classique
- Permet l'utilisation de spermatozoïdes testiculaires

### Quand choisir l'ICSI ?
- Oligospermie sévère (faible nombre de spermatozoïdes)
- Asthénospermie (mobilité réduite)
- Tératospermie (morphologie anormale)
- Échec de fécondation en FIV classique
- Utilisation de sperme congelé

## Comparaison des Taux de Réussite

Les taux de réussite varient selon plusieurs facteurs :

- **FIV classique** : 30-40% par cycle (selon l'âge)
- **ICSI** : 35-45% par cycle (selon l'âge)

**Important** : La technique choisie dépend de votre situation spécifique. Votre médecin vous orientera vers la meilleure option.

## Coûts Comparatifs en Europe

| Pays | FIV Classique | ICSI |
|------|---------------|------|
| France | 4 000€ - 5 000€ | 4 500€ - 5 500€ |
| Espagne | 4 500€ - 6 000€ | 5 000€ - 6 500€ |
| République Tchèque | 2 800€ - 3 500€ | 3 200€ - 4 000€ |
| Grèce | 3 000€ - 4 000€ | 3 500€ - 4 500€ |

## Notre Recommandation

Ne choisissez pas uniquement sur le prix. Consultez un spécialiste qui analysera :
- Votre spermogramme
- Votre réserve ovarienne
- Vos antécédents médicaux
- Vos échecs précédents (le cas échéant)

Utilisez notre **diagnostic gratuit** pour identifier les cliniques spécialisées dans votre situation.
    `,
    author: "Dr. Sophie Martin",
    authorRole: "Gynécologue spécialisée en PMA",
    date: "2024-03-15",
    readTime: "8 min",
    image: "/placeholder.svg",
    tags: ["FIV", "ICSI", "Traitement", "Comparatif"]
  },
  {
    id: "2",
    title: "Notre parcours FIV en République Tchèque : 3 ans, 2 tentatives, 1 miracle",
    slug: "temoignage-fiv-republique-tcheque",
    category: "temoignages",
    excerpt: "Marie et Thomas partagent leur parcours émotionnel et leur expérience dans une clinique de Prague.",
    content: `
# Notre parcours FIV en République Tchèque : 3 ans, 2 tentatives, 1 miracle

**Par Marie, 36 ans, maman depuis 6 mois**

Je m'appelle Marie et je veux partager notre histoire pour donner de l'espoir à toutes celles qui traversent cette épreuve.

## Le Diagnostic

Après 3 ans d'essais infructueux, le verdict est tombé : endométriose sévère et faible réserve ovarienne. En France, les délais d'attente dépassaient 18 mois. Nous avons décidé de regarder ailleurs.

## Pourquoi la République Tchèque ?

Trois raisons principales :
1. **Les délais** : RDV obtenu en 6 semaines
2. **Le prix** : 4 500€ contre 7 000€ en France (hors prise en charge)
3. **Les taux de réussite** : 68% pour notre profil

## Notre Clinique à Prague

Nous avons choisi **FertiCare Prague** après avoir comparé 5 établissements. Points positifs :
- Équipe entièrement francophone
- Coordinatrice dédiée (Lucie, un ange !)
- Clinique ultramoderne
- Suivi post-transfert impeccable

## Le Protocole

### Premier voyage (5 jours)
- J1 : Rendez-vous initial et échographie
- J2-J4 : Stimulation ovarienne
- J5 : Ponction (12 ovocytes récupérés !)

### Attente (5 jours)
Retour en France. Contact quotidien avec la clinique :
- 10 ovocytes fécondés
- 7 embryons J3
- 4 blastocystes J5

### Deuxième voyage (3 jours)
- Transfert d'un blastocyste de grade AA
- Congélation de 3 embryons
- Repos à l'hôtel recommandé

## Le Verdict

**10 jours d'attente insoutenable.**

Le jour J : TEST POSITIF ! 🎉

Première écho à 7 SA : un petit cœur qui bat.

## Conseils aux Futures Mamans

1. **Faites vos recherches** : comparez vraiment les cliniques
2. **Préparez-vous mentalement** : c'est un marathon, pas un sprint
3. **Entourez-vous** : parlez-en, ne restez pas seule
4. **Prenez soin de vous** : alimentation, repos, positive attitude
5. **Ayez confiance** : la science fait des miracles

## Le Coût Total

- Traitement : 4 500€
- Vols (x2 personnes, x2 voyages) : 800€
- Hôtel (8 nuits) : 600€
- Médicaments : 400€
- **TOTAL : 6 300€**

Moitié prix de la France, deux fois moins d'attente.

## Six Mois Plus Tard

Je tiens mon bébé dans mes bras et je pleure de joie. Le parcours était difficile mais **ça valait chaque larme, chaque euro, chaque kilomètre**.

À toutes celles qui lisent ceci : **ne perdez pas espoir. Votre miracle viendra aussi.** ❤️

---

*Envie de partager votre histoire ? Contactez-nous à temoignages@fertilemap.fr*
    `,
    author: "Marie D.",
    authorRole: "Patiente",
    date: "2024-03-10",
    readTime: "6 min",
    image: "/placeholder.svg",
    tags: ["Témoignage", "République Tchèque", "FIV", "Réussite"]
  },
  {
    id: "3",
    title: "Guide Complet : Faire sa FIV en Espagne en 2024",
    slug: "guide-fiv-espagne-2024",
    category: "guides-pays",
    excerpt: "Tout ce qu'il faut savoir pour réaliser sa PMA en Espagne : prix, cliniques, législation et démarches.",
    content: `
# Guide Complet : Faire sa FIV en Espagne en 2024

L'Espagne est la **destination #1 en Europe** pour la PMA. Voici tout ce que vous devez savoir.

## Pourquoi l'Espagne ?

### Les Avantages
- ✅ **Législation permissive** : don d'ovocytes anonyme autorisé
- ✅ **Excellentes cliniques** : parmi les meilleures d'Europe
- ✅ **Accessibilité** : vols directs depuis toute la France
- ✅ **Expérience** : 20 000+ cycles/an pour les françaises
- ✅ **Résultats** : taux de réussite supérieurs à la moyenne européenne

### Les Inconvénients
- ❌ Prix légèrement plus élevés que l'Europe de l'Est
- ❌ Forte demande = parfois des délais
- ❌ Barrière de la langue dans certaines cliniques

## Législation Espagnole

### Ce qui est autorisé :
- FIV avec propres gamètes
- Don d'ovocytes (anonyme uniquement)
- Don de sperme (anonyme)
- Double don (ovocytes + sperme)
- FIV pour femmes seules
- FIV pour couples de femmes
- DPI (Diagnostic Pré-Implantatoire)

### Ce qui est interdit :
- GPA (Gestation Pour Autrui)
- Levée d'anonymat des donneurs
- Sélection du sexe (sauf raisons médicales)

## Les Meilleures Cliniques

### 1. IVI Barcelona (Barcelone)
- **Spécialité** : Don d'ovocytes
- **Taux de réussite** : 72%
- **Prix FIV** : 5 500€ - 6 500€
- **Prix Don ovocytes** : 8 500€ - 9 500€
- **Points forts** : Réputation mondiale, recherche de pointe

### 2. Eugin (Barcelone)
- **Spécialité** : Tous traitements
- **Taux de réussite** : 68%
- **Prix FIV** : 5 000€ - 6 000€
- **Points forts** : Équipe francophone, méthode personnalisée

### 3. Ginefiv (Madrid)
- **Spécialité** : FIV + ICSI
- **Taux de réussite** : 65%
- **Prix FIV** : 4 800€ - 5 800€
- **Points forts** : Excellent rapport qualité-prix

## Combien ça coûte ?

### Fourchette de prix (traitement seul)
- **FIV classique** : 4 500€ - 6 500€
- **FIV + ICSI** : 5 000€ - 7 000€
- **Don d'ovocytes** : 8 000€ - 10 000€
- **DPI** : +2 500€ - 3 500€

### Budget voyage complet
- Vols : 200€ - 400€ par personne
- Hôtel (7 nuits) : 400€ - 800€
- Location voiture : 200€ - 300€
- Repas : 300€ - 500€
- **TOTAL** : 6 000€ - 12 000€ selon traitement

## Le Process Étape par Étape

### Phase 1 : Pré-traitement (en France)
1. Bilan sanguin complet
2. Échographie pelvienne
3. Spermogramme du conjoint
4. Consultation vidéo avec la clinique espagnole

**Délai** : 2-4 semaines

### Phase 2 : Premier Séjour (5-7 jours)
1. Rendez-vous initial
2. Stimulation ovarienne (injections quotidiennes)
3. Échographies de contrôle
4. Ponction ovocytaire

**Hébergement** : près de la clinique recommandé

### Phase 3 : Attente (5 jours)
- Culture des embryons en laboratoire
- Suivi par email/téléphone
- Rapport d'évolution quotidien

### Phase 4 : Transfert (2-3 jours)
- Retour en Espagne
- Transfert embryonnaire (10 minutes, indolore)
- Repos 24-48h
- Retour en France

### Phase 5 : Test (14 jours)
- Prise de sang en France
- Résultat communiqué à la clinique
- Échographie de confirmation si positif

## Documents Nécessaires

- ✅ Passeport ou carte d'identité
- ✅ Carte Européenne d'Assurance Maladie
- ✅ Résultats d'analyses (traduits si possible)
- ✅ Certificat médical du gynécologue français

## Villes Principales

### Barcelone
**Pour** : + de cliniques, ville agréable, vols fréquents
**Contre** : + touristique = + cher

### Madrid  
**Pour** : Prix légèrement inférieurs, excellentes cliniques
**Contre** : Moins de vols directs depuis certaines villes

### Valence
**Pour** : Moins touristique, bon rapport qualité-prix
**Contre** : Moins de choix de cliniques

## Nos Conseils Pratiques

1. **Réservez 3 mois à l'avance** pour les périodes chargées
2. **Choisissez un hôtel avec cuisine** (régime spécial recommandé)
3. **Évitez juillet-août** (pics touristiques)
4. **Prenez une assurance voyage** couvrant les soins médicaux
5. **Prévoyez 2-3 jours de repos** post-transfert

## Questions Fréquentes

**Parle-t-on français dans les cliniques ?**
Les grandes cliniques (IVI, Eugin) ont des coordinatrices francophones.

**La Sécurité Sociale rembourse-t-elle ?**
Non pour les soins à l'étranger, mais certaines mutuelles proposent des forfaits.

**Peut-on voyager après le transfert ?**
Oui, le voyage en avion est autorisé 24h après le transfert.

**Combien de temps rester sur place ?**
10-14 jours au total (ou 2 séjours de 5-7 jours + 2-3 jours).

## Conclusion

L'Espagne reste un **excellent choix** pour votre PMA :
- Cadre légal favorable
- Expertise reconnue
- Accessibilité géographique
- Taux de réussite élevés

**Prochaine étape** : Faites notre diagnostic personnalisé pour identifier les cliniques espagnoles adaptées à votre profil !
    `,
    author: "Équipe FertileMap",
    authorRole: "Experts PMA",
    date: "2024-03-05",
    readTime: "12 min",
    image: "/placeholder.svg",
    tags: ["Espagne", "Guide", "PMA", "Cliniques"]
  },
  {
    id: "4",
    title: "Don d'ovocytes : 10 choses que personne ne vous dit",
    slug: "don-ovocytes-verites",
    category: "traitements",
    excerpt: "Les vérités cachées sur le don d'ovocytes que les cliniques ne mettent pas toujours en avant.",
    content: `
# Don d'ovocytes : 10 choses que personne ne vous dit

Le **don d'ovocytes** est une solution pour de nombreuses femmes. Voici les réalités qu'on ne vous dit pas toujours.

## 1. Les donneuses ne sont PAS anonymes partout

**En France et Espagne** : Anonymat total et réciproque

**Au Royaume-Uni** : L'enfant peut demander l'identité du donneur à 18 ans

**Aux USA** : Possibilité de choisir une donneuse "ouverte"

## 2. Vous ne choisirez pas votre donneuse

Contrairement à une idée reçue, vous ne verrez **jamais de photos** des donneuses en Europe.

La clinique apparie selon :
- Groupe sanguin
- Caractéristiques physiques (taille, couleur yeux/cheveux)
- Origine ethnique

## 3. Les taux de réussite sont MEILLEURS qu'avec vos propres ovocytes

**Don d'ovocytes** : 50-65% de réussite par cycle
**FIV classique (>40 ans)** : 15-25% de réussite par cycle

Pourquoi ? Les donneuses ont généralement moins de 30 ans.

## 4. Le coût varie ÉNORMÉMENT selon les pays

- **France** : Gratuit mais 2-3 ans d'attente
- **Espagne** : 8 000€ - 10 000€
- **République Tchèque** : 5 500€ - 7 000€  
- **Grèce** : 5 000€ - 6 500€
- **USA** : 25 000€ - 40 000€

## 5. Vous aurez un lien génétique avec votre bébé

Même sans lien génétique via l'ovocyte, **l'épigénétique** prouve que :
- Votre environnement utérin influence le fœtus
- Vos gènes s'expriment via la grossesse
- Le microbiote se transmet de mère à enfant

**Vous êtes et serez la mère à 100%.**

## 6. Le processus émotionnel est sous-estimé

De nombreuses femmes traversent :
- Le deuil du lien génétique
- La peur du jugement
- L'angoisse de "l'annonce"

**Solution** : Un accompagnement psychologique est fortement recommandé.

## 7. Vous pouvez avoir plusieurs enfants avec la même donneuse

Les embryons surnuméraires sont congelés. Vous pourrez avoir un 2ème enfant (ou plus) avec les mêmes ovocytes = **fratrie biologique complète**.

## 8. La loi française évolue

Depuis 2021, le don d'ovocytes est ouvert :
- Aux femmes seules
- Aux couples de femmes

Mais les délais restent problématiques (2-3 ans).

## 9. Votre entourage n'a PAS besoin de savoir

Le secret médical vous protège. **Vous décidez** :
- D'en parler ou non
- À qui et quand
- Comment l'expliquer à votre enfant

Il n'y a **pas de bonne ou mauvaise réponse**.

## 10. Les enfants issus de don vont très bien

**Études scientifiques** montrent que les enfants nés de don :
- Se développent normalement
- N'ont pas plus de problèmes psychologiques
- Acceptent bien leur origine (si annoncé tôt)

## Notre Recommandation

Le don d'ovocytes est une **magnifique solution** pour devenir parents. Les points clés :

✅ **Choisissez votre pays selon votre budget et vos valeurs**
✅ **Faites-vous accompagner psychologiquement**
✅ **Privilégiez les cliniques avec bon matching**
✅ **Préparez-vous mentalement et physiquement**
✅ **Entourez-vous de personnes bienveillantes**

**Prêt(e) à faire le grand pas ?** Notre diagnostic vous oriente vers les meilleures cliniques de don d'ovocytes en Europe.
    `,
    author: "Dr. Claire Dubois",
    authorRole: "Psychologue spécialisée PMA",
    date: "2024-02-28",
    readTime: "10 min",
    image: "/placeholder.svg",
    tags: ["Don d'ovocytes", "Traitement", "Conseils"]
  },
  {
    id: "5",
    title: "FIV en Grèce : Le guide 2024 (prix, cliniques, législation)",
    slug: "guide-fiv-grece-2024",
    category: "guides-pays",
    excerpt: "Athènes devient une destination prisée pour la PMA. Découvrez pourquoi et comment organiser votre séjour.",
    content: `
# FIV en Grèce : Le guide complet 2024

La **Grèce** émerge comme destination PMA de choix. Voici pourquoi elle séduit de plus en plus de couples français.

## Pourquoi choisir la Grèce ?

### ✅ Les Avantages

1. **Prix attractifs** : 30-40% moins cher que la France
2. **Cadre idyllique** : combiner soin et détente
3. **Excellentes cliniques** : équipements modernes
4. **Législation souple** : don anonyme autorisé
5. **Accessibilité** : vols directs 3h depuis Paris

### ❌ Les Inconvénients

- Barrière de la langue (peu de personnel francophone)
- Moins de retours d'expérience que l'Espagne
- Certification européenne parfois récente

## Législation Grecque

### ✅ Autorisé :
- FIV/ICSI tous types
- Don d'ovocytes (anonyme)
- Don de sperme (anonyme)
- FIV pour femmes seules
- Jusqu'à 50 ans pour la femme

### ❌ Interdit :
- GPA commerciale (seule GPA altruiste autorisée)
- Sélection du sexe

## Top 3 des Cliniques

### 1. Athens Fertility Center (Athènes)

**Spécialité** : FIV + Don d'ovocytes
**Taux de réussite** : 65%

**Tarifs** :
- FIV simple : 3 800€
- FIV + ICSI : 4 200€
- Don d'ovocytes : 6 500€

**Points forts** :
- Équipe internationale
- Coordinatrice française (Marie)
- Forfaits tout compris

### 2. Embryolab (Thessalonique)

**Spécialité** : Tous traitements
**Taux de réussite** : 68%

**Tarifs** :
- FIV simple : 3 500€
- FIV + ICSI : 4 000€
- Don d'ovocytes : 6 000€

**Points forts** :
- Prix très compétitifs
- Laboratoire ultramoderne
- Suivi personnalisé

### 3. Genesis Athens Clinic (Athènes)

**Spécialité** : Cas complexes
**Taux de réussite** : 70%

**Tarifs** :
- FIV simple : 4 000€
- FIV + ICSI : 4 500€
- Don d'ovocytes : 7 000€

**Points forts** :
- Forte expertise médicale
- Recherche et innovation
- Taux de réussite élevés

## Budget Complet

### Traitement Médical
- FIV : 3 500€ - 4 500€
- ICSI : +500€
- Don ovocytes : 6 000€ - 7 500€
- Médicaments : 800€ - 1 200€

### Séjour
- Vols A/R : 150€ - 350€/pers
- Hôtel (10 nuits) : 500€ - 900€
- Repas : 250€ - 400€
- Location voiture : 200€ (optionnel)

### 💰 TOTAL : 5 500€ - 9 000€

## Organisation du Séjour

### Avant de partir
1. Consultation vidéo avec la clinique
2. Envoi des bilans médicaux
3. Prescription du protocole
4. Réservation vol + hôtel

### Sur Place - Phase 1 (J1-J7)
- J1 : Arrivée + première consultation
- J2-J6 : Stimulation + échographies
- J7 : Ponction ovocytaire
- **Possibilité de rentrer** pendant la culture

### Sur Place - Phase 2 (J12-J14)
- J12 : Retour en Grèce
- J13 : Transfert embryonnaire
- J14 : Consignes et retour France

## Les Villes

### Athènes 🏛️
**Pour** : + de cliniques, vols fréquents, sites touristiques
**Contre** : Chaleur en été

**À faire** :
- Acropole et Parthénon
- Quartier de Plaka
- Coucher de soleil au Cap Sounion

### Thessalonique 🌊
**Pour** : Moins touristique, front de mer
**Contre** : Moins de vols directs

**À faire** :
- Tour Blanche
- Front de mer et restaurants
- Mont Olympe (2h en voiture)

## Quand partir ?

### 🌞 Meilleure période : Avril-Juin et Septembre-Octobre
- Températures agréables (20-28°C)
- Moins de touristes
- Prix plus bas

### ❄️ Éviter : Juillet-Août
- Très chaud (35-40°C)
- Pics touristiques
- Cliniques parfois fermées

## Conseils Pratiques

### Documents
- Carte d'identité ou passeport
- Carte Européenne Assurance Maladie
- Ordonnances et bilans (traduits en anglais)

### Hébergement
Privilégiez :
- Hôtels à proximité de la clinique (Uber économique)
- Appartements avec cuisine (régime conseillé)
- Quartiers calmes (repos important)

### Alimentation
Profitez du régime méditerranéen :
- Poisson frais
- Huile d'olive
- Légumes du soleil
- Yaourt grec

☝️ Excellent pour la fertilité !

### Budget Repas
- Taverne : 15€ - 25€/personne
- Restaurant : 25€ - 40€/personne
- Supermarché : très abordable

## Témoignage

> "Nous avons choisi Athènes après 2 échecs en France. Le Dr. Papadopoulos a été fantastique. L'accueil, le suivi, les résultats... tout était parfait. Et en plus on a pu visiter l'Acropole entre deux RDV ! Notre fille a aujourd'hui 1 an." 
> 
> **— Émilie, 38 ans, Paris**

## Questions Fréquentes

**La qualité des soins est-elle équivalente à la France ?**
Oui, les cliniques sont équipées des dernières technologies et les médecins formés internationalement.

**Y a-t-il des interprètes ?**
Les grandes cliniques ont du personnel anglophone, certaines ont des coordinatrices françaises.

**Puis-je combiner FIV et vacances ?**
Oui ! Beaucoup de patientes restent quelques jours supplémentaires. La Grèce s'y prête parfaitement.

## Conclusion

La Grèce offre un **excellent rapport qualité-prix** pour votre PMA :
- Prix 30-40% moins chers
- Cadre apaisant et ensoleillé
- Cliniques modernes et efficaces
- Possibilité de coupler soin et détente

**Prêt(e) à sauter le pas ?** Utilisez notre comparateur pour trouver LA clinique grecque faite pour vous !
    `,
    author: "Équipe FertileMap",
    authorRole: "Experts PMA",
    date: "2024-02-20",
    readTime: "11 min",
    image: "/placeholder.svg",
    tags: ["Grèce", "Guide", "PMA", "Prix"]
  },
  {
    id: "6",
    title: "5 erreurs à éviter avant votre première FIV",
    slug: "5-erreurs-eviter-premiere-fiv",
    category: "conseils",
    excerpt: "Les erreurs courantes qui peuvent compromettre vos chances de réussite et comment les éviter.",
    content: `
# 5 erreurs à éviter avant votre première FIV

Préparer sa première FIV est stressant. Voici les **5 erreurs classiques** à éviter absolument.

## ❌ Erreur #1 : Négliger la Préparation Physique

### Ce qu'il NE faut PAS faire :
- Continuer à fumer
- Boire de l'alcool régulièrement
- Maintenir un IMC très élevé ou très bas
- Ignorer les carences nutritionnelles

### ✅ Ce qu'il FAUT faire :

**3-6 mois avant :**
- Arrêter complètement le tabac
- Limiter l'alcool à zéro
- Perdre du poids si IMC > 30
- Prendre de l'acide folique (400μg/jour)
- Ajouter vitamine D, oméga-3, coenzyme Q10

**Alimentation recommandée :**
- Protéines de qualité (poisson, œufs, légumineuses)
- Fruits et légumes frais (antioxydants)
- Graisses saines (avocats, noix, huile d'olive)
- Hydratation (2L d'eau/jour)

## ❌ Erreur #2 : Choisir la Mauvaise Clinique

### Les pièges :
- Se fier uniquement au prix
- Ne pas vérifier les taux de réussite
- Choisir sans lire les avis
- Ignorer la barrière de la langue

### ✅ Comment bien choisir :

**Vérifiez :**
1. Taux de réussite par tranche d'âge
2. Nombre de cycles réalisés/an (expérience)
3. Protocoles utilisés (personnalisation ?)
4. Équipement du laboratoire
5. Support francophone ou interprète

**Posez ces questions :**
- Combien de rendez-vous avant le traitement ?
- Qui sera mon référent en cas de problème ?
- Puis-je congeler mes embryons surnuméraires ?
- Quels sont les frais cachés éventuels ?

## ❌ Erreur #3 : Sous-estimer l'Impact Mental

### Le piège :
Penser qu'on est "forte mentalement" et que ça ira.

**La réalité** : Les hormones + le stress + l'enjeu = tempête émotionnelle garantie.

### ✅ Solutions :

**Avant le traitement :**
- Consulter un(e) psychologue spécialisé(e) PMA
- Rejoindre un groupe de soutien (online ou IRL)
- Informer votre entourage proche
- Préparer votre conjoint aussi

**Pendant le traitement :**
- Méditation et yoga
- Sophrologie
- Acupuncture (prouvée pour réduire le stress)
- Éviter Dr. Google à 3h du matin !

## ❌ Erreur #4 : Mal Planifier le Séjour à l'Étranger

### Les oublis courants :
- Réserver trop tard (pas de dispos)
- Sous-estimer les temps de trajet
- Oublier l'assurance voyage
- Ne pas prévoir de repos post-transfert

### ✅ Check-list du séjour parfait :

**3 mois avant :**
- Réserver vols ET hôtel (annulation gratuite)
- Souscrire assurance voyage (soins médicaux)
- Commander traduction assermentée des documents
- Demander congés (10-15 jours conseillés)

**Sur place :**
- Hôtel à max 15 min de la clinique
- Prévoir chauffeur ou Uber (repos important)
- Réserver restaurants à l'avance (régime spécial)
- Activités légères (musées, promenades)

**Budget à prévoir :**
- Traitement : 4 000€ - 9 000€
- Voyage : 1 500€ - 2 500€
- Imprévu : 500€ - 1 000€

## ❌ Erreur #5 : Abandonner Après un Échec

### Le piège mental :
"Si ça ne marche pas du premier coup, c'est que ça ne marchera jamais."

**FAUX !**

### ✅ La vérité statistique :

- **1er essai** : 30-40% de réussite
- **2e essai** : +20% de chances cumulées
- **3e essai** : 60-70% de chances cumulées

**65% des femmes réussissent après 3 tentatives.**

### Pourquoi continuer :

1. **Le premier cycle est diagnostique** : on ajuste le protocole ensuite
2. **Chaque échec donne des infos** : qualité embryonnaire, réponse ovarienne, etc.
3. **La persévérance paie** : la majorité des grossesses FIV arrivent au 2e ou 3e cycle

### Quand s'inquiéter :

Consultez un nouveau spécialiste si :
- 3 échecs avec bons embryons
- Mauvaise réponse ovarienne répétée
- Échecs d'implantation inexpliqués

Des solutions existent :
- Changer de protocole
- Envisager le don d'ovocytes
- Tester la PGT-A (test génétique embryons)
- Examens complémentaires (hystéroscopie, etc.)

## Le Mot de la Fin

La FIV est un **marathon, pas un sprint**. Les clés du succès :

1. ✅ **Préparez votre corps** (nutrition, compléments, sport)
2. ✅ **Choisissez LA bonne clinique** (pas la moins chère)
3. ✅ **Protégez votre mental** (accompagnement psy)
4. ✅ **Planifiez parfaitement** (séjour, budget, congés)
5. ✅ **Persévérez** (3 tentatives = norme, pas exception)

**Vous n'êtes pas seule. Des milliers de femmes sont passées par là et ont réussi. Vous allez y arriver. ❤️**

---

**Besoin d'aide pour choisir votre clinique ?** Notre diagnostic gratuit analyse votre profil et vous recommande les 3 meilleurs établissements européens pour VOUS.
    `,
    author: "Dr. Isabelle Leroux",
    authorRole: "Gynécologue PMA, 15 ans d'expérience",
    date: "2024-02-15",
    readTime: "9 min",
    image: "/placeholder.svg",
    tags: ["Conseils", "FIV", "Préparation", "Erreurs"]
  }
];

export const categories = [
  { id: "all", name: "Tous les articles", icon: "📚" },
  { id: "traitements", name: "Traitements", icon: "💉" },
  { id: "temoignages", name: "Témoignages", icon: "❤️" },
  { id: "guides-pays", name: "Guides par Pays", icon: "🌍" },
  { id: "conseils", name: "Conseils", icon: "💡" }
];