export const TYPES_ORGANISATION = ["Coopérative", "Mutuelle", "GIE", "Entreprise sociale"] as const;

export const STATUTS = ["en_attente", "validé"] as const;

export type TypeOrganisation = (typeof TYPES_ORGANISATION)[number];
export type Statut = (typeof STATUTS)[number];

export type Inscription = {
  id: string;
  created_at: string;
  nom_structure: string;
  type_organisation: TypeOrganisation;
  region: string;
  email: string;
  telephone: string;
  message: string | null;
  statut: Statut;
};
