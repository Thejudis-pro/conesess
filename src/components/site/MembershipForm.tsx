import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { btn, Card } from "@/components/site/primitives";
import { supabase } from "@/integrations/supabase/client";
import { REGIONS, SECTEURS, TYPES_ORGANISATION } from "@/lib/ess-data";
import { cn } from "@/lib/utils";

type FormState = {
  nom_structure: string;
  type_organisation: string;
  secteur: string;
  region: string;
  nom_contact: string;
  email: string;
  telephone: string;
  message: string;
};

const empty: FormState = {
  nom_structure: "",
  type_organisation: "",
  secteur: "",
  region: "",
  nom_contact: "",
  email: "",
  telephone: "",
  message: "",
};

const fieldClass =
  "mt-2 h-11 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/25";

function validate(values: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (values.nom_structure.trim().length < 2) errors.nom_structure = "Indiquez le nom de la structure.";
  if (!values.type_organisation) errors.type_organisation = "Choisissez un type d'organisation.";
  if (!values.secteur) errors.secteur = "Choisissez un secteur.";
  if (!values.region) errors.region = "Choisissez une région.";
  if (values.nom_contact.trim().length < 2) errors.nom_contact = "Indiquez le nom du contact.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = "Adresse e-mail invalide.";
  if (values.telephone.replace(/[^0-9]/g, "").length < 7) errors.telephone = "Numéro de téléphone invalide.";
  return errors;
}

export function MembershipForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const set = (key: keyof FormState) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const { error } = await supabase.from("inscriptions").insert({
      nom_structure: values.nom_structure.trim(),
      type_organisation: values.type_organisation as never,
      secteur: values.secteur as never,
      region: values.region as never,
      nom_contact: values.nom_contact.trim(),
      email: values.email.trim(),
      telephone: values.telephone.trim(),
      message: values.message.trim() ? values.message.trim() : null,
    });
    setSubmitting(false);

    if (error) {
      setSubmitError("L'envoi a échoué. Vérifiez votre connexion puis réessayez.");
      return;
    }
    setValues(empty);
    setDone(true);
  }

  if (done) {
    return (
      <Card variant="gold" className="flex items-start gap-4">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-secondary" aria-hidden />
        <div>
          <h3 className="text-lg">Demande envoyée, on vous recontacte sous 48h</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Votre demande d'adhésion est enregistrée avec le statut « en attente ». Le Secrétariat Général
            revient vers vous pour la suite de l'instruction.
          </p>
          <button type="button" onClick={() => setDone(false)} className={cn(btn({ variant: "navy", size: "sm" }), "mt-4")}>
            Envoyer une autre demande
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-card">
      <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom de la structure" error={errors.nom_structure} className="sm:col-span-2">
          <input
            className={fieldClass}
            value={values.nom_structure}
            onChange={(e) => set("nom_structure")(e.target.value)}
            autoComplete="organization"
          />
        </Field>

        <Field label="Type d'organisation" error={errors.type_organisation}>
          <select
            className={fieldClass}
            value={values.type_organisation}
            onChange={(e) => set("type_organisation")(e.target.value)}
          >
            <option value="">Sélectionner…</option>
            {TYPES_ORGANISATION.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Secteur / pôle" error={errors.secteur}>
          <select className={fieldClass} value={values.secteur} onChange={(e) => set("secteur")(e.target.value)}>
            <option value="">Sélectionner…</option>
            {SECTEURS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Région" error={errors.region}>
          <select className={fieldClass} value={values.region} onChange={(e) => set("region")(e.target.value)}>
            <option value="">Sélectionner…</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Nom du contact" error={errors.nom_contact}>
          <input
            className={fieldClass}
            value={values.nom_contact}
            onChange={(e) => set("nom_contact")(e.target.value)}
            autoComplete="name"
          />
        </Field>

        <Field label="E-mail" error={errors.email}>
          <input
            type="email"
            className={fieldClass}
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            autoComplete="email"
          />
        </Field>

        <Field label="Téléphone" error={errors.telephone}>
          <input
            type="tel"
            className={cn(fieldClass, "font-mono")}
            value={values.telephone}
            onChange={(e) => set("telephone")(e.target.value)}
            autoComplete="tel"
          />
        </Field>

        <Field label="Message (optionnel)" className="sm:col-span-2">
          <textarea
            rows={4}
            className={cn(fieldClass, "h-auto py-3")}
            value={values.message}
            onChange={(e) => set("message")(e.target.value)}
          />
        </Field>

        {submitError ? (
          <p role="alert" className="sm:col-span-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {submitError}
          </p>
        ) : null}

        <div className="sm:col-span-2">
          <button type="submit" disabled={submitting} className={cn(btn({ size: "lg" }), "w-full sm:w-auto")}>
            {submitting ? "Envoi en cours…" : "Envoyer ma demande d'adhésion"}
          </button>
        </div>
      </form>
    </Card>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string | undefined;
  className?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="label-mono text-primary">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs text-destructive">{error}</span>
      ) : null}
    </label>
  );
}
