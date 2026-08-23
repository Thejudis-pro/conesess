export const TYPES_ORGANISATION = [
  "Coopérative",
  "Mutuelle de santé/épargne",
  "GIE",
  "Association économique",
  "Entreprise sociale",
  "Autre",
] as const;

export const SECTEURS = [
  "Agroécologie & Souveraineté Alimentaire",
  "Mutuelles de Santé, Épargne et Crédit (SFD)",
  "Artisanat, Énergie Renouvelable & Économie Circulaire",
  "Services, Numérique Social & Éducation",
] as const;

export const REGIONS = [
  "Dakar",
  "Thiès",
  "Diourbel",
  "Fatick",
  "Kaolack",
  "Kaffrine",
  "Kédougou",
  "Kolda",
  "Louga",
  "Matam",
  "Saint-Louis",
  "Sédhiou",
  "Tambacounda",
  "Ziguinchor",
] as const;

export const STATUTS = ["en_attente", "validé"] as const;

export type TypeOrganisation = (typeof TYPES_ORGANISATION)[number];
export type Secteur = (typeof SECTEURS)[number];
export type Region = (typeof REGIONS)[number];
export type Statut = (typeof STATUTS)[number];

export type Inscription = {
  id: string;
  created_at: string;
  nom_structure: string;
  type_organisation: TypeOrganisation;
  secteur: Secteur;
  region: Region;
  nom_contact: string;
  email: string;
  telephone: string;
  message: string | null;
  statut: Statut;
};
