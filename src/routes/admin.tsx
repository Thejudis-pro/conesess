import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, LogOut } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import logo from "@/assets/conesess-logo.png";
import { btn, Container } from "@/components/site/primitives";
import { supabase } from "@/integrations/supabase/client";
import type { Inscription, Statut } from "@/lib/ess-data";
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
  "h-11 w-full border-2 border-primary bg-transparent px-3.5 text-sm text-foreground outline-none focus:border-secondary";

function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    async function resolve(sessionEmail: string | null, userId: string | null) {
      if (!userId) {
        if (!active) return;
        setEmail(null);
        setIsAdmin(false);
        setChecking(false);
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (!active) return;
      setEmail(sessionEmail);
      setIsAdmin(Boolean(data));
      setChecking(false);
    }

    supabase.auth.getSession().then(({ data }) => {
      void resolve(data.session?.user.email ?? null, data.session?.user.id ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setChecking(true);
      void resolve(session?.user.email ?? null, session?.user.id ?? null);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b-2 border-primary bg-primary text-primary-foreground">
        <Container className="flex flex-wrap items-center gap-5 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-background">
              <img src={logo} alt="CONESESS" className="block h-10 w-10 rounded-full" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[17px] font-extrabold leading-none">
                CONESESS
              </span>
              <span className="label-mono mt-1 block text-leaf">Espace admin</span>
            </span>
          </Link>
          <div className="ml-auto flex flex-wrap items-center gap-4">
            <span className="label-mono text-primary-foreground/60">
              Table <span className="text-leaf">inscriptions</span>
            </span>
            {email ? (
              <>
                <span className="hidden font-mono text-xs opacity-80 sm:inline">{email}</span>
                <button
                  type="button"
                  onClick={() => supabase.auth.signOut()}
                  className={cn(btn({ variant: "onDark", size: "sm" }))}
                >
                  <LogOut className="h-4 w-4" aria-hidden /> Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="label-mono border-b-2 border-leaf/50 pb-0.5 text-primary-foreground hover:text-gold"
              >
                ← Retour au site
              </Link>
            )}
          </div>
        </Container>
      </header>

      <Container className="w-full flex-1 py-10 sm:py-14">
        {checking ? (
          <p className="font-mono text-sm text-foreground/70">Chargement de la session…</p>
        ) : !email ? (
          <LoginCard />
        ) : isAdmin ? (
          <Dashboard />
        ) : (
          <div className="mx-auto max-w-md">
            <p className="label-mono mb-3 text-secondary">Accès refusé</p>
            <h1 className="text-2xl font-extrabold text-primary">Compte non autorisé</h1>
            <div className="mt-6 border-2 border-primary/30 p-6">
              <p className="text-sm text-foreground/80">
                Ce compte n'a pas le rôle administrateur. Contactez le Bureau confédéral du CONESESS
                pour obtenir les droits d'accès au tableau de bord.
              </p>
            </div>
          </div>
        )}
      </Container>

      <footer className="border-t-2 border-primary bg-ink text-ink-foreground/60">
        <Container className="py-[18px]">
          <p className="label-mono">CONESESS — Espace admin — Accès réservé au Bureau confédéral</p>
        </Container>
      </footer>
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
      <p className="label-mono mb-3 text-secondary">Accès réservé</p>
      <h1 className="text-2xl font-extrabold text-primary">Connexion administrateur</h1>
      <div className="mt-6 border-2 border-primary p-6 sm:p-8">
        <form onSubmit={onSubmit} className="space-y-5">
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
            <p
              role="alert"
              className="border-2 border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={busy}
            className={cn(btn({ variant: "navy" }), "w-full justify-center")}
          >
            {busy ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
      <p className="mt-4 text-xs text-foreground/60">
        Un seul compte administrateur est autorisé. Contactez le Bureau confédéral pour obtenir vos
        accès.
      </p>
    </div>
  );
}

function Dashboard() {
  const [rows, setRows] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState<"" | Statut>("");
  const [syncedAt] = useState(() => new Date());

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
          (!statut || r.statut === statut) &&
          (!search.trim() || r.nom_structure.toLowerCase().includes(search.trim().toLowerCase())),
      ),
    [rows, statut, search],
  );

  const total = rows.length;
  const nbAttente = rows.filter((r) => r.statut === "en_attente").length;
  const nbValides = rows.filter((r) => r.statut === "validé").length;
  const nbRegions = new Set(rows.map((r) => r.region).filter(Boolean)).size;

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
      "region",
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
    const bom = String.fromCharCode(0xfeff);
    const url = URL.createObjectURL(new Blob([bom + csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `inscriptions-conesess-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end gap-5 sm:mb-10">
        <div>
          <p className="label-mono mb-3 text-secondary">Demandes d'adhésion</p>
          <h1 className="text-[clamp(26px,3.4vw,42px)] font-extrabold leading-[1.06] tracking-[-0.025em] text-primary">
            Instruction des dossiers
          </h1>
        </div>
        <p className="label-mono ml-auto text-foreground/60">
          Dernière synchro — {syncedAt.toLocaleDateString("fr-FR")}{" "}
          {syncedAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-px border-2 border-primary bg-primary/16 sm:mb-10 sm:grid-cols-4">
        <Stat value={String(total)} label="Total dossiers" color="text-primary" />
        <Stat value={String(nbAttente)} label="En attente" color="text-gold" />
        <Stat value={String(nbValides)} label="Validés" color="text-secondary" />
        <Stat value={String(nbRegions)} label="Régions couvertes" color="text-primary" />
      </div>

      <div className="mb-[22px] flex flex-wrap items-stretch gap-px font-mono text-xs">
        <button
          type="button"
          onClick={() => setStatut("")}
          className={cn(
            "border-2 border-primary px-5 py-[11px] uppercase tracking-[0.06em]",
            statut === "" ? "bg-primary text-primary-foreground" : "bg-transparent text-primary",
          )}
        >
          Tous
        </button>
        <button
          type="button"
          onClick={() => setStatut("en_attente")}
          className={cn(
            "border-2 border-primary px-5 py-[11px] uppercase tracking-[0.06em]",
            statut === "en_attente"
              ? "bg-primary text-primary-foreground"
              : "bg-transparent text-primary",
          )}
        >
          En attente
        </button>
        <button
          type="button"
          onClick={() => setStatut("validé")}
          className={cn(
            "border-2 border-primary px-5 py-[11px] uppercase tracking-[0.06em]",
            statut === "validé"
              ? "bg-primary text-primary-foreground"
              : "bg-transparent text-primary",
          )}
        >
          Validés
        </button>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une structure…"
          className="min-w-[220px] flex-1 border-2 border-primary bg-transparent px-3.5 outline-none focus:border-secondary"
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="mb-4 border-2 border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto border-2 border-primary">
        <div className="min-w-[820px]">
          <div className="label-mono grid grid-cols-[2.2fr_1.1fr_1fr_1.6fr_1fr_1.1fr] bg-primary text-primary-foreground">
            {["Structure", "Type", "Région", "Contact", "Dépôt", "Statut"].map((h) => (
              <div key={h} className="px-4 py-3.5">
                {h}
              </div>
            ))}
          </div>
          {loading ? (
            <p className="px-4 py-8 text-center font-mono text-xs text-foreground/60">
              Chargement…
            </p>
          ) : filtered.length === 0 ? (
            <p className="px-4 py-8 text-center font-mono text-xs text-foreground/60">
              Aucune inscription
            </p>
          ) : (
            filtered.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-[2.2fr_1.1fr_1fr_1.6fr_1fr_1.1fr] border-t-2 border-primary/16 transition-colors hover:bg-secondary/[0.06]"
              >
                <div className="px-4 py-4 text-[15px] font-semibold text-primary">
                  {r.nom_structure}
                </div>
                <div className="px-4 py-4 text-[14.5px] opacity-85">{r.type_organisation}</div>
                <div className="px-4 py-4 text-[14.5px] opacity-85">{r.region}</div>
                <div className="break-all px-4 py-4 font-mono text-xs opacity-80">{r.email}</div>
                <div className="px-4 py-4 font-mono text-xs opacity-70">
                  {new Date(r.created_at).toLocaleDateString("fr-FR")}
                </div>
                <div className="px-4 py-4">
                  <button
                    type="button"
                    onClick={() => toggleStatut(r)}
                    style={{
                      background: r.statut === "validé" ? "#1E7A3C" : "#EFA83A",
                      color: r.statut === "validé" ? "#F7F5EE" : "#3A2606",
                    }}
                    className="label-mono px-2.5 py-1.5"
                  >
                    {r.statut === "validé" ? "Validé" : "En attente"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <span className="label-mono text-foreground/62">
          {filtered.length} dossier{filtered.length > 1 ? "s" : ""} affiché
          {filtered.length > 1 ? "s" : ""}
        </span>
        <span className="h-0.5 min-w-[20px] flex-1 bg-primary/14" aria-hidden />
        <button
          type="button"
          onClick={exportCsv}
          className={cn(btn({ variant: "outline", size: "sm" }))}
        >
          <Download className="h-4 w-4" aria-hidden /> Exporter CSV
        </button>
      </div>
    </div>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="bg-background p-5 sm:p-[22px]">
      <div
        className={cn(
          "font-display text-[clamp(26px,3vw,38px)] font-extrabold leading-none",
          color,
        )}
      >
        {value}
      </div>
      <div className="label-mono mt-2 text-secondary">{label}</div>
    </div>
  );
}
