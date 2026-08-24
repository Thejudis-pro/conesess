# CONESESS site

Crée un site vitrine + espace admin pour le CONESESS (Conseil National des Entreprises de 

l'Économie Sociale et Solidaire du Sénégal) — React + TypeScript + Tailwind + Supabase.

IDENTITÉ VISUELLE (respecter strictement, j'ai un logo officiel déjà fourni) :

- Couleurs : navy #1B2A56 (primaire), vert #1E7A3C (secondaire), vert clair #5FB84C (accent), 

  or #EFA83A (accent CTA), papier #F7F5EE (fond), encre #1C2521 (texte)

- Typo : Poppins 700/800 pour les titres (écho au wordmark du logo), Inter pour le texte courant, 

  IBM Plex Mono pour les données/labels

- Le logo (cercle avec personnages autour de la carte du Sénégal, "CONESESS FONDATEURS") est utilisé 

  dans le header (petit, à gauche), en hero (grand, à droite du titre ou en watermark léger), et en footer

- Ton : institutionnel mais chaleureux/communautaire — pas de gradient, pas d'emoji, pas de style startup

STRUCTURE — one-page scroll avec header sticky (logo + nav ancrée + CTA "Adhérer") :

1. HERO

   Eyebrow (mono, uppercase) : "Comité d'Initiative — Mémorandum stratégique 2026"

   Titre (Poppins, grand) : "Fédérer l'économie sociale et solidaire du Sénégal"

   Sous-titre : Faire de l'ESS un levier de production, d'emplois durables et de souveraineté 

   économique — pas seulement un filet social.

   CTA primaire "Devenir membre" (scroll form) / secondaire "Découvrir le CONESESS"

   Logo en grand format à droite ou en fond léger (opacité faible)

2. CONSTATS (grille 6 cards, icône + titre court + 1 phrase)

   - Représentation fragmentée — pas de cadre patronal unifié pour l'ESS

   - Financements inadaptés aux modèles économiques de l'ESS

   - Accès limité aux marchés publics et privés

   - Faible mutualisation des équipements et débouchés commerciaux

   - Données insuffisantes sur le poids réel de l'ESS dans l'économie

   - Coordination faible entre acteurs, État, collectivités et partenaires

3. VISION — 3 principes (cards horizontales)

   - Représenter les entreprises de l'ESS et défendre leurs intérêts

   - Structurer des filières et chaînes de valeur inclusives

   - Renforcer la performance économique et l'impact social des membres

4. LES 2 PILIERS (deux blocs distincts — navy vs vert)

   Pilier 1 — IAN-ESS (Incubateur-Accélérateur National), soubassement "Citoyenneté Bâtisseuse" :

     Modèle "Business Mentoring" : cible l'entrepreneur, redevabilité hebdomadaire/mensuelle, 

     triade d'animation territoriale (citoyen bâtisseur + politique-développeur + jeunes leaders)

     5 typologies (chips, disposées en cercle en écho au logo) : Communal · Départemental/Thématique · 

     Mobile (Hackathon 48h) · Confessionnel · Universitaire

   Pilier 2 — ON-ESS (Observatoire National), soubassement scientifique :

     Missions : preuve macroéconomique (poids de l'ESS dans le PIB), indicateurs d'impact social 

     (écart salarial 1 à 7, gouvernance "une personne, une voix"), régulation du Label ESS

     3 échelons (timeline verticale) : Relais Communaux → Antennes Départementales → Bureau National

5. GOUVERNANCE

   Hiérarchie en 5 instances (liste numérotée, mono pour les numéros) :

   1. Assemblée Générale — organe souverain, "une entreprise = une voix"

   2. Conseil d'Administration — contrôle stratégique, 14 régions représentées

   3. Bureau Exécutif — Présidence + VP Incubateur + VP Observatoire

   4. Secrétariat Général — exécution administrative permanente

   5. Collège des Membres Associés — Comité des Sages, droit de veto moral

   Diagramme SVG triangle : nœuds "Observatoire" / "Incubateur" / "Pôles Sectoriels" reliés par 

   flèches pointillées labellisées : Observatoire→Incubateur "guidage scientifique", 

   Pôles→Incubateur "apport métier", Pôles→Observatoire "collecte technique"

6. 4 PÔLES SECTORIELS (grille 2x2) : Agroécologie & Souveraineté Alimentaire · Mutuelles de Santé, 

   Épargne et Crédit (SFD) · Artisanat, Énergie Renouvelable & Économie Circulaire · 

   Services, Numérique Social & Éducation

7. SERVICES AUX MEMBRES (liste compacte 8 items) : Formalisation & agrément ESS · Formation, 

   incubation, accélération · Montage de projets & financement · Veille marchés & appels à projets · 

   Plaidoyer institutionnel · Mutualisation achats/équipements · Mise en relation investisseurs/acheteurs · 

   Appui digitalisation

8. DEVENIR MEMBRE — formulaire connecté à Supabase (active l'intégration).

   Table `inscriptions` : id (uuid pk), created_at, nom_structure (text), type_organisation 

   (enum: Coopérative, Mutuelle de santé/épargne, GIE, Association économique, Entreprise sociale, Autre), 

   secteur (enum: les 4 pôles ci-dessus), region (enum: Dakar, Thiès, Diourbel, Fatick, Kaolack, 

   Kaffrine, Kédougou, Kolda, Louga, Matam, Saint-Louis, Sédhiou, Tambacounda, Ziguinchor), 

   nom_contact (text), email (text), telephone (text), message (text, optionnel), 

   statut (text, défaut "en_attente", enum: en_attente/validé)

   Validation client, état de succès explicite ("Demande envoyée, on vous recontacte sous 48h"), 

   erreurs visibles.

9. FOOTER — logo, contact, mentions

PAGE /admin (protégée par Supabase Auth email/password, un seul compte admin) :

   - 3 cards stats : total inscrits, % par statut, secteur le plus représenté

   - Table inscriptions : nom structure, type, secteur, région, contact, statut, date

   - Filtres : secteur, région, statut + recherche par nom

   - Toggle statut en_attente ↔ validé directement dans la table

   - Bouton "Exporter CSV"

   - Design identique (navy/or/vert), IBM Plex Mono pour les données

CONTRAINTES : responsive mobile-first, composants modulaires réutilisables (Section, Card, Eyebrow, 

Button), aucune sécurité par mot de passe en dur — vraie session Supabase pour /admin.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://conesess.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8d66813e-24cb-4559-9054-1add0566c4ef).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
