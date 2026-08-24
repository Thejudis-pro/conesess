ALTER TABLE public.inscriptions ALTER COLUMN secteur DROP NOT NULL;
ALTER TABLE public.inscriptions ALTER COLUMN nom_contact DROP NOT NULL;
ALTER TABLE public.inscriptions ALTER COLUMN region TYPE text USING region::text;
