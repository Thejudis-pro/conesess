import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, LogOut } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import logo from "@/assets/conesess-logo.png";
import { btn, Card, Eyebrow } from "@/components/site/primitives";
import { supabase } from "@/integrations/supabase/client";
import { REGIONS, SECTEURS, STATUTS, type Inscription, type Statut } from "@/lib/ess-data";
import { cn } from "@/lib/utils";

const TITLE = "Espace administrateur — CONESESS";
const DESCRIPTION =
  "Tableau de bord privé du CONESESS : suivi des demandes d'adhésion des structures de l'économie sociale et solidaire.";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const fieldClass =
  "h-10 w-full rounded-md border border-input bg-card px-3 text-sm outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/25";

function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setEmail(data.session?.user.email ?? null);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
      setChecking(false);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo du CONESESS" width={44} height={44} className="h-10 w-10" />
            <span>
              <span className="block font-display text-sm font-extrabold">CONESESS</span>
              <span className="label-mono block text-[0.55rem] opacity-70">Espace administrateur</span>
            </span>
          </Link>
          {email ? (
            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-xs opacity-80 sm:inline">{email}</span>
              <button
                type="button"
                onClick={() => supabase.auth.signOut()}
                className={cn(btn({ variant: "ghostLight", size: "sm" }))}
              >
                <LogOut className="h-4 w-4" aria-hidden /> Déconnexion
              </button>
            </div>
          ) : null}
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        {checking ? (
          <p className="font-mono text-sm text-muted-foreground">Chargement de la session…</p>
        ) : email ? (
          <Dashboard />
        ) : (
          <LoginCard />
        )}
      </main>
    </div>
  );
}

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (signInError) setError("Identifiants invalides ou compte inexistant.");
  }

  return (
    <div className="mx-auto max-w-md">
      <Eyebrow>Accès réservé</Eyebrow>
      <h1 className="mt-3 text-2xl text-primary">Connexion administrateur</h1>
      <Card className="mt-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="label-mono text-primary">E-mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(fieldClass, "mt-2")}
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span className="label-mono text-primary">Mot de passe</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(fieldClass, "mt-2")}
              autoComplete="current-password"
            />
          </label>
          {error ? (
            <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <button type="submit" disabled={busy} className={cn(btn({ variant: "navy" }), "w-full")}>
            {busy ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </Card>
      <p className="mt-4 text-xs text-muted-foreground">
        Un seul compte administrateur est autorisé. Contactez le Secrétariat Général pour obtenir vos accès.
      </p>
    </div>
  );
}

function Dashboard() {
  const [rows, setRows] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [secteur, setSecteur] = useState("");
  const [region, setRegion] = useState("");
  const [statut, setStatut] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: queryError } = await supabase
      .from("inscriptions")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (queryError) {
      setError("Impossible de charger les inscriptions.");
      return;
    }
    setError(null);
    setRows((data ?? []) as Inscription[]);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (!secteur || r.secteur === secteur) &&
          (!region || r.region === region) &&
          (!statut || r.statut === statut) &&
          (!search.trim() || r.nom_structure.toLowerCase().includes(search.trim().toLowerCase())),
      ),
    [rows, secteur, region, statut, search],
  );

  const total = rows.length;
  const valides = rows.filter((r) => r.statut === "validé").length;
  const pctValides = total ? Math.round((valides / total) * 100) : 0;
  const topSecteur = useMemo(() => {
    const counts = new Map<string, number>();
    rows.forEach((r) => counts.set(r.secteur, (counts.get(r.secteur) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  }, [rows]);

  async function toggleStatut(row: Inscription) {
    const next: Statut = row.statut === "validé" ? "en_attente" : "validé";
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, statut: next } : r)));
    const { error: updateError } = await supabase
      .from("inscriptions")
      .update({ statut: next })
      .eq("id", row.id);
    if (updateError) {
      setError("La mise à jour du statut a échoué.");
      void load();
    }
  }

  function exportCsv() {
    const headers = [
      "nom_structure",
      "type_organisation",
      "secteur",
      "region",
      "nom_contact",
      "email",
      "telephone",
      "statut",
      "created_at",
    ] as const;
    const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const csv = [
      headers.join(","),
      ...filtered.map((r) => headers.map((h) => escape(r[h])).join(",")),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `inscriptions-conesess-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <Eyebrow>Tableau de bord</Eyebrow>
      <h1 className="mt-3 text-2xl text-primary sm:text-3xl">Demandes d'adhésion</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Total inscrits" value={String(total)} />
        <Stat
          label="Validés / en attente"
          value={`${pctValides}% / ${100 - pctValides}%`}
          hint={`${valides} validés · ${total - valides} en attente`}
        />
        <Stat
          label="Secteur le plus représenté"
          value={topSecteur ? String(topSecteur[1]) : "0"}
          hint={topSecteur ? topSecteur[0] : "Aucune donnée"}
        />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <input
          placeholder="Rechercher une structure…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn(fieldClass, "lg:col-span-2")}
        />
        <select value={secteur} onChange={(e) => setSecteur(e.target.value)} className={fieldClass}>
          <option value="">Tous les secteurs</option>
          {SECTEURS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={region} onChange={(e) => setRegion(e.target.value)} className={fieldClass}>
          <option value="">Toutes les régions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select value={statut} onChange={(e) => setStatut(e.target.value)} className={fieldClass}>
          <option value="">Tous les statuts</option>
          {STATUTS.map((s) => (
            <option key={s} value={s}>
              {s === "en_attente" ? "En attente" : "Validé"}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted-foreground">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </p>
        <button type="button" onClick={exportCsv} className={cn(btn({ variant: "green", size: "sm" }))}>
          <Download className="h-4 w-4" aria-hidden /> Exporter CSV
        </button>
      </div>

      {error ? (
        <p role="alert" className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-primary text-primary-foreground">
            <tr>
              {["Structure", "Type", "Secteur", "Région", "Contact", "Statut", "Date"].map((h) => (
                <th key={h} className="label-mono px-4 py-3 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center font-mono text-xs text-muted-foreground">
                  Chargement…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center font-mono text-xs text-muted-foreground">
                  Aucune inscription
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="px-4 py-3 font-display font-bold text-primary">{r.nom_structure}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.type_organisation}</td>
                  <td className="px-4 py-3 text-xs">{r.secteur}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.region}</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="block">{r.nom_contact}</span>
                    <span className="block font-mono text-muted-foreground">{r.email}</span>
                    <span className="block font-mono text-muted-foreground">{r.telephone}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleStatut(r)}
                      className={cn(
                        "label-mono rounded-full px-3 py-1.5",
                        r.statut === "validé"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-gold text-gold-foreground",
                      )}
                    >
                      {r.statut === "validé" ? "Validé" : "En attente"}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card>
      <p className="label-mono text-muted-foreground">{label}</p>
      <p className="mt-3 font-mono text-3xl font-semibold text-primary">{value}</p>
      {hint ? <p className="mt-2 text-xs text-muted-foreground">{hint}</p> : null}
    </Card>
  );
}
