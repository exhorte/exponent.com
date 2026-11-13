/* Contenu éditorial partagé entre plusieurs pages (accueil, Solutions,
   Méthode, ExponentOS, Contact). Un texte réutilisé vit ici, une seule
   fois. Le contenu propre à une seule page reste dans la page. */

export type Family = {
  id: string;
  title: string;
  /* une phrase : cartes de l'accueil et en-tête de chaque famille */
  summary: string;
  problem: string;
  build: string;
};

/* Les six familles de systèmes : des catégories que nous pouvons concevoir
   et développer, pas des produits disponibles. */
export const families: Family[] = [
  {
    id: "finance",
    title: "Systèmes financiers",
    summary:
      "Une vision claire de vos opérations financières et de votre trésorerie.",
    problem:
      "Trésorerie, coûts et créances sont dispersés dans des tableurs et des exports bancaires.",
    build:
      "Tableaux de bord, rapprochements et outils de suivi autour de vos transactions et de votre trésorerie.",
  },
  {
    id: "operations",
    title: "Systèmes opérationnels",
    summary:
      "Des processus répétitifs simplifiés et moins de frictions au quotidien.",
    problem:
      "Le travail récurrent repose sur des personnes qui recopient l'information d'un outil à l'autre.",
    build:
      "Outils de flux de travail, applications internes et intégrations qui coordonnent le travail récurrent.",
  },
  {
    id: "sales",
    title: "Ventes et relation client",
    summary:
      "Un meilleur suivi des clients, des opportunités et des demandes.",
    problem:
      "Prospects, devis et demandes clients se perdent entre les boîtes mail et les messageries.",
    build:
      "Suivi du pipeline, rappels de relance et traitement des demandes, adaptés à votre routine commerciale.",
  },
  {
    id: "documents",
    title: "Gestion documentaire",
    summary:
      "Vos documents transformés en informations structurées et exploitables.",
    problem:
      "Contrats, factures et rapports dorment dans des dossiers où personne ne retrouve rien.",
    build:
      "Réception des documents, extraction des données et archives consultables, reliées à vos processus.",
  },
  {
    id: "intelligence",
    title: "Pilotage et décision",
    summary: "Une information plus claire pour décider plus vite.",
    problem:
      "Les chiffres existent, mais personne ne les lit à temps ni ne s'accorde sur ce qu'ils disent.",
    build: "Tableaux de bord et analyses construits sur vos propres données.",
  },
  {
    id: "custom",
    title: "Applications sur mesure",
    summary:
      "Des applications spécialisées pour les besoins que vos outils ne couvrent pas.",
    problem:
      "Certains besoins ne sont couverts correctement par aucun outil du marché.",
    build:
      "Une application spécialisée, conçue autour d'un besoin opérationnel précis.",
  },
];

export type Problem = {
  title: string;
  text: string;
  /* id de la famille de solutions la plus pertinente */
  familyId: string;
};

export const problems: Problem[] = [
  {
    title: "Trop de travail manuel",
    text: "Des saisies et des relances répétitives qui devraient se faire toutes seules.",
    familyId: "operations",
  },
  {
    title: "Des angles morts financiers",
    text: "Trésorerie, coûts et créances se voient trop tard pour agir.",
    familyId: "finance",
  },
  {
    title: "Une information éparpillée",
    text: "Les réponses sont dans des tableurs, des boîtes mail et des documents introuvables.",
    familyId: "documents",
  },
  {
    title: "Des opportunités manquées",
    text: "Des prospects et des relances qui passent entre les mailles.",
    familyId: "sales",
  },
];

export const workSteps = [
  {
    number: "01",
    title: "Identifier",
    text: "Comprendre comment votre entreprise fonctionne et repérer les opportunités qui comptent.",
  },
  {
    number: "02",
    title: "Construire",
    text: "Concevoir et développer des systèmes adaptés à vos processus et à vos outils existants.",
  },
  {
    number: "03",
    title: "Améliorer",
    text: "Mesurer les résultats, affiner la solution et étendre ce qui fonctionne.",
  },
] as const;

/* Le framework EXPONENT : huit étapes, rattachées aux trois temps.
   `stage` reprend le titre du temps correspondant dans `workSteps`. */
export const frameworkSteps = [
  {
    title: "Examiner",
    stage: "Identifier",
    text: "Observer comment le travail se passe vraiment et où le temps et l'argent se perdent.",
  },
  {
    title: "Extraire",
    stage: "Identifier",
    text: "Rassembler les données, les documents et le savoir-faire dont le système aura besoin.",
  },
  {
    title: "Prioriser",
    stage: "Identifier",
    text: "Classer les opportunités selon leur impact et l'effort requis, puis commencer par une seule.",
  },
  {
    title: "Orchestrer",
    stage: "Construire",
    text: "Concevoir comment les personnes, les outils et l'automatisation travaillent ensemble sur ce processus.",
  },
  {
    title: "Normaliser",
    stage: "Construire",
    text: "Donner aux données et aux termes une structure commune pour que les systèmes se connectent et restent fiables.",
  },
  {
    title: "Exécuter",
    stage: "Construire",
    text: "Mettre le système en service par étapes, les personnes gardant la main sur les décisions importantes.",
  },
  {
    title: "Naviguer",
    stage: "Améliorer",
    text: "Suivre les résultats sur une vue claire : temps gagné, erreurs évitées, argent récupéré.",
  },
  {
    title: "Transformer",
    stage: "Améliorer",
    text: "Affiner ce qui fonctionne, abandonner le reste et étendre au problème suivant.",
  },
] as const;

/* ExponentOS : les quatre concepts de la vue d'ensemble. Ce sont des
   capacités de la vision technologique, pas des fonctionnalités livrées. */
export const osConcepts = [
  {
    title: "Contexte métier",
    text: "Une compréhension partagée des clients, des commandes, des factures et des documents.",
  },
  {
    title: "Intégrations",
    text: "Des connexions avec les applications et les données que vous utilisez déjà.",
  },
  {
    title: "Orchestration des flux",
    text: "Coordonner les étapes entre les personnes, les outils et les systèmes.",
  },
  {
    title: "Intelligence et contrôle",
    text: "Des capacités intelligentes là où elles aident, avec des permissions et une supervision autour.",
  },
] as const;

/* Ce que la vision ExponentOS cherche à relier, progressivement. */
export const osVision = [
  {
    title: "Données métier",
    text: "Une vue fiable des informations dont vos opérations dépendent.",
  },
  {
    title: "Applications existantes",
    text: "Votre comptabilité, votre CRM, vos mails et vos tableurs restent en place et sont reliés.",
  },
  {
    title: "Flux de travail",
    text: "Des étapes qui font passer le travail d'une personne ou d'un système au suivant.",
  },
  {
    title: "Capacités intelligentes",
    text: "Analyse, extraction et prédiction, utilisées quand elles résolvent le problème posé.",
  },
  {
    title: "Permissions et contrôles",
    text: "Des règles claires sur qui peut voir, modifier et approuver quoi.",
  },
  {
    title: "Suivi et traçabilité",
    text: "Une trace de ce qui s'est passé, pour vérifier les résultats et leur faire confiance.",
  },
] as const;
