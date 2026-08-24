import { useState } from "react";

import { btn } from "@/components/site/primitives";
import { supabase } from "@/integrations/supabase/client";
import { TYPES_ORGANISATION } from "@/lib/ess-data";
import { cn } from "@/lib/utils";

type FormState = {
  nom_structure: string;
  type_organisation: string;
  region: string;
  email: string;
  telephone: string;
  activite: string;
};

const empty: FormState = {
  nom_structure: "",
  type_organisation: TYPES_ORGANISATION[0],
  region: "",
  email: "",
  telephone: "",
  activite: "",
};

const underlineField =
  "border-0 border-b-2 border-primary bg-transparent px-0.5 py-2.5 text-base text-foreground outline-none focus:border-secondary";

export function MembershipForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormState) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    const { error } = await supabase.from("inscriptions").insert({
      nom_structure: values.nom_structure.trim(),
      type_organisation: values.type_organisation as never,
      region: values.region.trim(),
      email: values.email.trim(),
      telephone: values.telephone.trim(),
      message: values.activite.trim() ? values.activite.trim() : null,
    });
    setSubmitting(false);

    if (error) {
      setSubmitError("L'envoi a échoué. Vérifiez votre connexion puis réessayez.");
      return;
    }
    setValues(empty);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border-2 border-leaf bg-background p-6 text-left text-foreground sm:p-10">
        <p className="label-mono mb-3.5 text-secondary">Demande enregistrée</p>
        <h3 className="font-display text-2xl font-bold leading-tight text-primary">
          Merci. Votre dossier est transmis au Bureau confédéral.
        </h3>
        <p className="mt-3.5 text-[15.5px] leading-relaxed opacity-85">
          Vous recevrez une confirmation à l'adresse indiquée.
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 border-leaf bg-background p-6 text-foreground sm:p-10">
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <p className="label-mono text-secondary">Formulaire d'adhésion</p>

        <label className="flex flex-col gap-2">
          <span className="label-mono text-primary">Nom de la structure</span>
          <input
            required
            className={underlineField}
            value={values.nom_structure}
            onChange={(e) => set("nom_structure")(e.target.value)}
            autoComplete="organization"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="label-mono text-primary">Type</span>
            <select
              className={underlineField}
              value={values.type_organisation}
              onChange={(e) => set("type_organisation")(e.target.value)}
            >
              {TYPES_ORGANISATION.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="label-mono text-primary">Région</span>
            <input
              placeholder="Kolda"
              className={underlineField}
              value={values.region}
              onChange={(e) => set("region")(e.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="label-mono text-primary">Email</span>
            <input
              type="email"
              required
              className={underlineField}
              value={values.email}
              onChange={(e) => set("email")(e.target.value)}
              autoComplete="email"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label-mono text-primary">Téléphone</span>
            <input
              className={underlineField}
              value={values.telephone}
              onChange={(e) => set("telephone")(e.target.value)}
              autoComplete="tel"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="label-mono text-primary">Activité principale</span>
          <textarea
            rows={3}
            className="resize-y border-2 border-primary bg-transparent p-3 text-base text-foreground outline-none focus:border-secondary"
            value={values.activite}
            onChange={(e) => set("activite")(e.target.value)}
          />
        </label>

        {submitError ? (
          <p
            role="alert"
            className="border-2 border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className={cn(btn({ variant: "navy" }), "self-start")}
        >
          {submitting ? "Envoi en cours…" : "Envoyer la demande"}
        </button>

        <p className="label-mono leading-relaxed text-foreground/60">
          Données transmises à la table <span className="text-secondary">inscriptions</span> —
          traitées par le Bureau confédéral.
        </p>
      </form>
    </div>
  );
}
