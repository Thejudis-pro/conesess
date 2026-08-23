import { createFileRoute } from "@tanstack/react-router";
import {
  Banknote,
  BarChart3,
  Building2,
  Handshake,
  Landmark,
  Layers,
  Network,
  Store,
} from "lucide-react";

import logo from "@/assets/conesess-logo.png";
import { Footer } from "@/components/site/Footer";
import { GovernanceDiagram } from "@/components/site/GovernanceDiagram";
import { Header } from "@/components/site/Header";
import { MembershipForm } from "@/components/site/MembershipForm";
import { btn, Card, Chip, Eyebrow, Section, SectionHeading } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

const TITLE = "CONESESS — Fédérer l'économie sociale et solidaire du Sénégal";
const DESCRIPTION =
  "Le Conseil National des Entreprises de l'Économie Sociale et Solidaire du Sénégal : représentation patronale, incubateur IAN-ESS, observatoire ON-ESS et adhésion des structures ESS.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const constats = [
  {
    icon: Network,
    title: "Représentation fragmentée",
    text: "Aucun cadre patronal unifié ne porte aujourd'hui la voix des entreprises de l'ESS.",
  },
  {
    icon: Banknote,
    title: "Financements inadaptés",
    text: "Les offres bancaires ignorent les modèles économiques propres à l'ESS.",
  },
  {
    icon: Store,
    title: "Accès limité aux marchés",
    text: "Les structures restent en marge des marchés publics et des commandes privées.",
  },
  {
    icon: Layers,
    title: "Faible mutualisation",
    text: "Équipements et débouchés commerciaux sont rarement partagés entre acteurs.",
  },
  {
    icon: BarChart3,
    title: "Données insuffisantes",
    text: "Le poids réel de l'ESS dans l'économie nationale demeure mal mesuré.",
  },
  {
    icon: Landmark,
    title: "Coordination faible",
    text: "Le dialogue entre acteurs, État, collectivités et partenaires reste discontinu.",
  },
];

const vision = [
  {
    n: "01",
    title: "Représenter",
    text: "Représenter les entreprises de l'ESS et défendre leurs intérêts auprès des pouvoirs publics et des partenaires.",
  },
  {
    n: "02",
    title: "Structurer",
    text: "Structurer des filières et des chaînes de valeur inclusives, du producteur au marché final.",
  },
  {
    n: "03",
    title: "Renforcer",
    text: "Renforcer la performance économique et l'impact social des membres, avec des outils exigeants.",
  },
];

const typologies = [
  "Communal",
  "Départemental / Thématique",
  "Mobile — Hackathon 48h",
  "Confessionnel",
  "Universitaire",
];

const echelons = [
  {
    title: "Relais Communaux",
    text: "Collecte de terrain, veille locale et remontée des données d'activité des structures ESS.",
  },
  {
    title: "Antennes Départementales",
    text: "Consolidation, contrôle qualité des données et appui technique aux relais communaux.",
  },
  {
    title: "Bureau National",
    text: "Publication, production statistique nationale et régulation du Label ESS.",
  },
];

const instances = [
  {
    n: "1",
    title: "Assemblée Générale",
    text: "Organe souverain — « une entreprise = une voix ».",
  },
  {
    n: "2",
    title: "Conseil d'Administration",
    text: "Contrôle stratégique, 14 régions représentées.",
  },
  {
    n: "3",
    title: "Bureau Exécutif",
    text: "Présidence + Vice-présidence Incubateur + Vice-présidence Observatoire.",
  },
  {
    n: "4",
    title: "Secrétariat Général",
    text: "Exécution administrative permanente.",
  },
  {
    n: "5",
    title: "Collège des Membres Associés",
    text: "Comité des Sages, droit de veto moral.",
  },
];

const poles = [
  {
    title: "Agroécologie & Souveraineté Alimentaire",
    text: "Coopératives agricoles, transformation locale, circuits courts et sécurité alimentaire.",
  },
  {
    title: "Mutuelles de Santé, Épargne et Crédit (SFD)",
    text: "Protection sociale de proximité, finance inclusive et systèmes financiers décentralisés.",
  },
  {
    title: "Artisanat, Énergie Renouvelable & Économie Circulaire",
    text: "Métiers d'art, valorisation des déchets et solutions énergétiques communautaires.",
  },
  {
    title: "Services, Numérique Social & Éducation",
    text: "Services de proximité, plateformes solidaires, formation et éducation populaire.",
  },
];

const services = [
  "Formalisation & agrément ESS",
  "Formation, incubation, accélération",
  "Montage de projets & financement",
  "Veille marchés & appels à projets",
  "Plaidoyer institutionnel",
  "Mutualisation achats / équipements",
  "Mise en relation investisseurs & acheteurs",
  "Appui à la digitalisation",
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* HERO */}
        <section id="hero" className="relative overflow-hidden border-b border-border bg-card">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
            <div>
              <Eyebrow>Comité d'Initiative — Mémorandum stratégique 2026</Eyebrow>
              <h1 className="mt-5 text-3xl leading-[1.08] text-primary sm:text-4xl lg:text-5xl">
                Fédérer l'économie sociale et solidaire du Sénégal
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Faire de l'ESS un levier de production, d'emplois durables et de souveraineté économique —
                pas seulement un filet social.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#adherer" className={cn(btn({ size: "lg" }))}>
                  Devenir membre
                </a>
                <a href="#constats" className={cn(btn({ variant: "outline", size: "lg" }))}>
                  Découvrir le CONESESS
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src={logo}
                alt="Emblème du CONESESS : des personnes réunies autour de la carte du Sénégal"
                width={420}
                height={420}
                className="w-56 max-w-full sm:w-72 lg:w-[22rem]"
              />
            </div>
          </div>
        </section>

        {/* CONSTATS */}
        <Section id="constats">
          <SectionHeading
            eyebrow="Constats"
            title="Six blocages structurels freinent l'ESS sénégalaise"
            intro="Le diagnostic partagé par les acteurs du secteur, base du mémorandum stratégique."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {constats.map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <Icon className="h-6 w-6 text-secondary" aria-hidden />
                <h3 className="mt-4 text-base">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* VISION */}
        <Section id="vision" tone="card">
          <SectionHeading eyebrow="Vision" title="Trois principes fondateurs" />
          <div className="mt-10 space-y-4">
            {vision.map((item) => (
              <Card key={item.n} variant="outline" className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
                <span className="label-mono text-lg text-gold">{item.n}</span>
                <div>
                  <h3 className="text-lg text-primary">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* PILIERS */}
        <div id="piliers" className="scroll-mt-24">
          <Section tone="navy">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <Eyebrow className="text-gold">Pilier 1 — Soubassement « Citoyenneté Bâtisseuse »</Eyebrow>
                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl">IAN-ESS</h2>
                <p className="mt-2 font-display text-sm font-bold opacity-80">
                  Incubateur-Accélérateur National de l'ESS
                </p>
                <p className="mt-6 text-sm leading-relaxed opacity-85">
                  Le modèle « Business Mentoring » cible l'entrepreneur lui-même, avec une redevabilité
                  hebdomadaire et mensuelle. L'animation territoriale repose sur une triade : citoyen
                  bâtisseur, politique-développeur et jeunes leaders.
                </p>
                <ul className="mt-6 space-y-2 text-sm opacity-85">
                  <li>— Cible : l'entrepreneur, pas seulement le projet</li>
                  <li>— Redevabilité hebdomadaire et mensuelle</li>
                  <li>— Triade d'animation territoriale</li>
                </ul>
              </div>
              <div>
                <p className="label-mono text-gold">5 typologies d'incubateurs</p>
                <div className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:mt-8">
                  {typologies.map((t, i) => (
                    <Chip
                      key={t}
                      className={cn(
                        "justify-center py-3",
                        i === 0 && "sm:col-span-2",
                        i === 4 && "sm:col-span-2",
                      )}
                    >
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section tone="green">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <Eyebrow className="text-gold">Pilier 2 — Soubassement scientifique</Eyebrow>
                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl">ON-ESS</h2>
                <p className="mt-2 font-display text-sm font-bold opacity-85">
                  Observatoire National de l'ESS
                </p>
                <ul className="mt-6 space-y-4 text-sm leading-relaxed opacity-90">
                  <li>
                    <span className="font-display font-bold">Preuve macroéconomique</span> — mesurer le poids
                    de l'ESS dans le PIB national.
                  </li>
                  <li>
                    <span className="font-display font-bold">Indicateurs d'impact social</span> — écart
                    salarial de 1 à 7, gouvernance « une personne, une voix ».
                  </li>
                  <li>
                    <span className="font-display font-bold">Régulation du Label ESS</span> — attribution,
                    contrôle et retrait.
                  </li>
                </ul>
              </div>
              <div>
                <p className="label-mono text-gold">3 échelons de collecte</p>
                <ol className="mt-6 space-y-0">
                  {echelons.map((e, i) => (
                    <li key={e.title} className="relative pb-8 pl-10 last:pb-0">
                      {i < echelons.length - 1 ? (
                        <span
                          aria-hidden
                          className="absolute left-[0.6875rem] top-6 h-full w-px bg-primary-foreground/30"
                        />
                      ) : null}
                      <span className="label-mono absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-primary-foreground/50 text-[0.6rem]">
                        {i + 1}
                      </span>
                      <h3 className="text-base">{e.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed opacity-85">{e.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Section>
        </div>

        {/* GOUVERNANCE */}
        <Section id="gouvernance">
          <SectionHeading
            eyebrow="Gouvernance"
            title="Cinq instances, une chaîne de décision lisible"
            intro="Une architecture démocratique qui articule souveraineté des membres, contrôle stratégique et exécution permanente."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <ol className="space-y-4">
              {instances.map((i) => (
                <li key={i.n} className="flex gap-5 border-b border-border pb-4 last:border-0">
                  <span className="label-mono text-base text-gold">{i.n.padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-base text-primary">{i.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{i.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Card variant="outline" className="bg-card">
              <p className="label-mono text-primary">Articulation opérationnelle</p>
              <div className="mt-6">
                <GovernanceDiagram />
              </div>
            </Card>
          </div>
        </Section>

        {/* POLES */}
        <Section id="poles" tone="card">
          <SectionHeading eyebrow="Pôles sectoriels" title="Quatre pôles pour structurer les filières" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {poles.map((p) => (
              <Card key={p.title} className="border-l-4 border-l-secondary">
                <Building2 className="h-5 w-5 text-secondary" aria-hidden />
                <h3 className="mt-4 text-base text-primary">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* SERVICES */}
        <Section id="services">
          <SectionHeading eyebrow="Services aux membres" title="Ce que le CONESESS apporte concrètement" />
          <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {services.map((s, i) => (
              <li key={s} className="flex items-start gap-4 border-b border-border py-3 text-sm">
                <span className="label-mono text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-foreground/90">{s}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ADHERER */}
        <Section id="adherer" tone="card">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeading
                eyebrow="Devenir membre"
                title="Rejoindre le CONESESS"
                intro="Remplissez ce formulaire : votre demande est instruite par le Secrétariat Général puis validée par le Bureau Exécutif."
              />
              <div className="mt-8 flex items-start gap-3 text-sm text-muted-foreground">
                <Handshake className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden />
                <p>Adhésion ouverte aux coopératives, mutuelles, GIE, associations économiques et entreprises sociales.</p>
              </div>
            </div>
            <MembershipForm />
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
