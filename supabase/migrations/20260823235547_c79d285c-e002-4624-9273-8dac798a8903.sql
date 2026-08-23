CREATE TYPE public.type_organisation AS ENUM ('Coopérative','Mutuelle de santé/épargne','GIE','Association économique','Entreprise sociale','Autre');
CREATE TYPE public.secteur_ess AS ENUM ('Agroécologie & Souveraineté Alimentaire','Mutuelles de Santé, Épargne et Crédit (SFD)','Artisanat, Énergie Renouvelable & Économie Circulaire','Services, Numérique Social & Éducation');
CREATE TYPE public.region_sn AS ENUM ('Dakar','Thiès','Diourbel','Fatick','Kaolack','Kaffrine','Kédougou','Kolda','Louga','Matam','Saint-Louis','Sédhiou','Tambacounda','Ziguinchor');
CREATE TYPE public.statut_inscription AS ENUM ('en_attente','validé');

CREATE TABLE public.inscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nom_structure TEXT NOT NULL,
  type_organisation public.type_organisation NOT NULL,
  secteur public.secteur_ess NOT NULL,
  region public.region_sn NOT NULL,
  nom_contact TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  message TEXT,
  statut public.statut_inscription NOT NULL DEFAULT 'en_attente'
);

GRANT INSERT ON public.inscriptions TO anon;
GRANT SELECT, INSERT, UPDATE ON public.inscriptions TO authenticated;
GRANT ALL ON public.inscriptions TO service_role;

ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a membership request" ON public.inscriptions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated admins can read requests" ON public.inscriptions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated admins can update requests" ON public.inscriptions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);