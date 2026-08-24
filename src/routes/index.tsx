import { createFileRoute } from "@tanstack/react-router";

import logo from "@/assets/conesess-logo.png";
import { Footer } from "@/components/site/Footer";
import { GovernanceDiagram, GovernanceDiagramMobile } from "@/components/site/GovernanceDiagram";
import { Header } from "@/components/site/Header";
import { IanEssDiagram, IanEssDiagramMobile } from "@/components/site/IanEssDiagram";
import { MembershipForm } from "@/components/site/MembershipForm";
import { btn, Container, Eyebrow, EyebrowRule } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

const SITE_URL = "https://conesess.lovable.app";
const OG_IMAGE = `${SITE_URL}/og-conesess.png`;
const TITLE = "CONESESS — Économie sociale et solidaire au Sénégal";
const DESCRIPTION =
  "Le Conseil National des Entreprises de l'Économie Sociale et Solidaire du Sénégal : représentation patronale, incubateur IAN-ESS, observatoire et adhésion des coopératives, mutuelles et GIE.";

export const faq = [
  {
    q: "Qu'est-ce que le CONESESS ?",
    a: "Le CONESESS (Conseil National des Entreprises de l'Économie Sociale et Solidaire du Sénégal) est le cadre patronal qui fédère et représente les coopératives, mutuelles, GIE et entreprises sociales du Sénégal auprès des pouvoirs publics et des partenaires techniques et financiers.",
  },
  {
    q: "Qui peut devenir membre du CONESESS ?",
    a: "L'adhésion est ouverte à toute structure sénégalaise de l'économie sociale et solidaire : coopérative, mutuelle, groupement d'intérêt économique (GIE) ou entreprise sociale.",
  },
  {
    q: "Comment adhérer au CONESESS ?",
    a: "Remplissez le formulaire d'adhésion en ligne dans la section « Devenir membre ». La demande est instruite par le Bureau confédéral, qui revient vers vous sous quinze jours.",
  },
  {
    q: "Que sont l'IAN-ESS et l'Observatoire ?",
    a: "L'IAN-ESS est l'Incubateur et Accélérateur National de l'ESS : il décline cinq typologies d'incubateurs dans les régions pour accompagner les structures membres. L'Observatoire collecte, vérifie et publie les données du secteur — emplois, chiffre d'affaires, cartographie des structures.",
  },
  {
    q: "Comment est gouverné le CONESESS ?",
    a: "L'Assemblée des membres élit le Bureau confédéral. Trois organes techniques — l'Observatoire, l'Incubateur IAN-ESS et les Pôles sectoriels — instruisent ses décisions et remontent le terrain depuis les 14 régions.",
  },
  {
    q: "Quels services le CONESESS apporte-t-il à ses membres ?",
    a: "Représentation institutionnelle, formation et certification, accès au financement, mise en réseau, veille et données, appui juridique.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CONESESS",
  legalName: "Conseil National des Entreprises de l'Économie Sociale et Solidaire du Sénégal",
  alternateName: "Conseil National des Entreprises de l'ESS du Sénégal",
  url: SITE_URL,
  logo: OG_IMAGE,
  description: DESCRIPTION,
  areaServed: { "@type": "Country", name: "Sénégal" },
  address: { "@type": "PostalAddress", addressCountry: "SN", addressLocality: "Dakar" },
  knowsAbout: [
    "Économie sociale et solidaire",
    "Coopératives",
    "Mutuelles de santé",
    "Systèmes financiers décentralisés",
    "Agroécologie",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  }),
  component: Index,
});

const kpis = [
  { value: "14", label: "Régions représentées" },
  { value: "04", label: "Pôles sectoriels" },
  { value: "02", label: "Piliers stratégiques" },
  { value: "05", label: "Typologies d'incubateurs" },
];

const embleme = [
  {
    n: "01",
    title: "Le cercle de personnages",
    text: "Coopératives, mutuelles, GIE et entreprises sociales : un réseau, pas une hiérarchie.",
  },
  {
    n: "02",
    title: "La carte du Sénégal",
    text: "L'ancrage national : les quatorze régions, sans centre unique.",
  },
  {
    n: "03",
    title: "Les feuilles",
    text: "Une économie de production durable, enracinée dans les territoires.",
  },
];

const constats = [
  {
    n: "01",
    title: "Une représentation dispersée",
    text: "Des milliers de coopératives et mutuelles négocient seules. Aucune structure ne porte leur position d'ensemble.",
  },
  {
    n: "02",
    title: "Un dialogue fragmenté avec l'État",
    text: "Les politiques publiques de l'ESS se décident sans canal permanent de concertation avec les acteurs concernés.",
  },
  {
    n: "03",
    title: "Un accès inégal au financement",
    text: "Les structures de terrain restent hors des circuits bancaires et des guichets de financement dédiés.",
  },
  {
    n: "04",
    title: "Des compétences non capitalisées",
    text: "Le savoir-faire existe dans les régions, mais il circule peu et n'est ni documenté ni transmis.",
  },
];

const piliers = [
  {
    n: "PILIER 01",
    title: "Représentation & plaidoyer",
    text: "Porter la position du secteur devant les ministères, l'Assemblée nationale et les partenaires techniques. Négocier un cadre fiscal et juridique adapté aux structures coopératives et mutualistes.",
  },
  {
    n: "PILIER 02",
    title: "Accompagnement & structuration",
    text: "Outiller les membres : incubation, formation, accès au financement, mise en conformité. Faire passer les initiatives locales à l'échelle d'une filière organisée.",
  },
];

const gouvernanceCards = [
  {
    title: "Observatoire",
    text: "Collecte, vérifie et publie les données du secteur : emplois, chiffre d'affaires, cartographie des structures.",
  },
  {
    title: "Incubateur IAN-ESS",
    text: "Cinq typologies d'incubateurs déployées dans les régions pour accompagner les structures membres.",
  },
  {
    title: "Pôles sectoriels",
    text: "Quatre pôles qui organisent les filières, fixent les priorités et désignent les porte-parole techniques.",
  },
];

const poles = [
  {
    n: "PÔLE 01",
    title: "Agriculture & agroalimentaire",
    text: "Coopératives de production, transformation locale, accès aux marchés et aux intrants.",
    bar: "#1E7A3C",
  },
  {
    n: "PÔLE 02",
    title: "Artisanat & industries créatives",
    text: "Ateliers, GIE d'artisans, filières textile et culture : qualité, label, export.",
    bar: "#5FB84C",
  },
  {
    n: "PÔLE 03",
    title: "Services & numérique",
    text: "Entreprises sociales de services, outils numériques mutualisés, formation aux usages.",
    bar: "#EFA83A",
  },
  {
    n: "PÔLE 04",
    title: "Finance solidaire & mutualité",
    text: "Mutuelles d'épargne et de crédit, garanties, protection sociale des membres.",
    bar: "#1B2A56",
  },
];

const services = [
  {
    n: "01",
    title: "Représentation institutionnelle",
    text: "Votre voix portée dans les instances nationales et les concertations sectorielles.",
  },
  {
    n: "02",
    title: "Formation & certification",
    text: "Gestion coopérative, comptabilité, conformité juridique — en présentiel et en région.",
  },
  {
    n: "03",
    title: "Accès au financement",
    text: "Montage de dossiers, orientation vers les guichets publics et la finance solidaire.",
  },
  {
    n: "04",
    title: "Mise en réseau",
    text: "Rencontres régionales, mise en relation entre filières, groupements d'achat.",
  },
  {
    n: "05",
    title: "Veille & données",
    text: "Publications de l'Observatoire, évolutions réglementaires, appels à projets.",
  },
  {
    n: "06",
    title: "Appui juridique",
    text: "Statuts, agréments, contentieux : un accompagnement adapté au droit coopératif.",
  },
];

function Index() {
  return (
    <div className="max-w-full overflow-x-hidden bg-background text-foreground">
      <Header />
      <main>
        {/* HERO */}
        <section id="top" className="border-b-2 border-primary">
          <Container className="grid items-center gap-8 py-12 sm:gap-14 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-[104px]">
            <div>
              <EyebrowRule className="mb-6">
                Comité d'Initiative — Mémorandum stratégique 2026
              </EyebrowRule>
              <h1 className="text-[clamp(38px,5.6vw,68px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-primary text-balance">
                Fédérer l'économie sociale et solidaire du Sénégal
              </h1>
              <p className="mt-6 max-w-[46ch] text-[clamp(16px,1.4vw,19px)] leading-relaxed text-foreground">
                Faire de l'ESS un levier de production, d'emplois durables et de souveraineté
                économique — pas seulement un filet social.
              </p>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <a href="#adherer" className={cn(btn({ variant: "navy", size: "lg" }))}>
                  Devenir membre
                </a>
                <a href="#vision" className={cn(btn({ variant: "outline", size: "lg" }))}>
                  Découvrir le CONESESS
                </a>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 aspect-square w-[min(100%,470px)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-leaf opacity-35"
              />
              <img
                src={logo}
                alt="Logo CONESESS Fondateurs"
                className="relative block w-[min(84%,390px)] rounded-full"
              />
            </div>
          </Container>
        </section>

        {/* KPI STRIP */}
        <section className="border-b-2 border-primary bg-background">
          <Container>
            <div className="grid grid-cols-2 gap-px bg-primary/16 sm:grid-cols-4">
              {kpis.map((kpi, i) => (
                <div
                  key={kpi.label}
                  className={cn(
                    "bg-background py-7 px-7",
                    i === 0 && "pl-0",
                    i === kpis.length - 1 && "sm:pr-0",
                  )}
                >
                  <div className="font-display text-[clamp(30px,3.4vw,44px)] font-extrabold leading-none text-secondary">
                    {kpi.value}
                  </div>
                  <div className="label-mono mt-2 text-primary">{kpi.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* EMBLEME */}
        <section id="embleme" className="scroll-mt-[100px] border-b-2 border-primary">
          <Container className="grid items-start gap-8 py-12 sm:gap-16 sm:py-[88px] lg:grid-cols-2">
            <div>
              <Eyebrow className="mb-[18px]">Emblème</Eyebrow>
              <h2 className="max-w-[24ch] text-[clamp(26px,3.2vw,40px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-primary">
                Ce que dit l'emblème.
              </h2>
              <div className="mt-6 flex flex-col">
                {embleme.map((item, i) => (
                  <div
                    key={item.n}
                    className={cn(
                      "flex gap-4 border-t-2 border-primary/20 py-[18px]",
                      i === embleme.length - 1 && "border-b-2",
                    )}
                  >
                    <span className="pt-0.5 font-mono text-xs text-gold">{item.n}</span>
                    <div>
                      <h3 className="text-[17px] font-bold text-primary">{item.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed opacity-80">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-center border-2 border-primary p-6 sm:p-10">
                <img
                  src={logo}
                  alt="Emblème du CONESESS"
                  className="block w-[min(78%,300px)] rounded-full"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* CONSTATS */}
        <section id="constats" className="scroll-mt-[100px] border-b-2 border-primary">
          <Container className="py-14 sm:py-20 lg:py-[110px]">
            <div className="mb-9 max-w-[52ch] sm:mb-[60px]">
              <Eyebrow className="mb-[18px]">01 — Constats</Eyebrow>
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-primary">
                Un secteur qui fait vivre le pays, sans interlocuteur unique.
              </h2>
            </div>
            <div className="grid gap-0 sm:grid-cols-2">
              {constats.map((c) => (
                <div
                  key={c.n}
                  className="border-t-2 border-primary px-0 py-[26px] transition-colors hover:bg-secondary/[0.06] sm:px-[26px]"
                >
                  <div className="mb-3.5 font-mono text-xs tracking-[0.1em] text-gold">{c.n}</div>
                  <h3 className="mb-2.5 text-[19px] font-bold leading-[1.25] text-primary">
                    {c.title}
                  </h3>
                  <p className="text-[15.5px] leading-relaxed opacity-85">{c.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* VISION + PILIERS */}
        <section id="vision" className="border-b-2 border-primary">
          <Container className="grid gap-10 py-14 sm:gap-[72px] sm:py-20 lg:py-[110px]">
            <div className="grid gap-10 sm:gap-[72px] lg:grid-cols-2">
              <div>
                <Eyebrow className="mb-[18px]">02 — Vision</Eyebrow>
                <h2 className="text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-primary">
                  Faire de l'ESS un interlocuteur reconnu de l'État sénégalais.
                </h2>
                <p className="mt-[22px] max-w-[46ch] text-[16.5px] leading-[1.7]">
                  CONESESS rassemble les acteurs de l'économie sociale et solidaire dans une
                  confédération nationale unique. Représenter, structurer, professionnaliser : trois
                  responsabilités, une seule adresse.
                </p>
              </div>
              <div id="piliers" className="flex scroll-mt-[110px] flex-col">
                {piliers.map((p, i) => (
                  <div
                    key={p.n}
                    className={cn(
                      "border-t-2 border-primary py-[26px]",
                      i === piliers.length - 1 && "border-b-2",
                    )}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs tracking-[0.1em] text-gold">{p.n}</span>
                      <h3 className="text-[22px] font-bold text-primary">{p.title}</h3>
                    </div>
                    <p className="mt-3 text-[15.5px] leading-relaxed opacity-85">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* GOUVERNANCE */}
        <section
          id="gouvernance"
          className="border-b-2 border-primary bg-primary text-primary-foreground"
        >
          <Container className="py-14 sm:py-20 lg:py-[110px]">
            <div className="mb-9 max-w-[54ch] sm:mb-14">
              <Eyebrow tone="leaf" className="mb-[18px]">
                03 — Gouvernance
              </Eyebrow>
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-primary-foreground">
                Trois organes reliés, une décision commune.
              </h2>
              <p className="mt-5 text-[16.5px] leading-[1.7] text-primary-foreground/86">
                L'Assemblée des membres élit le Bureau confédéral. Trois organes techniques
                instruisent ses décisions et remontent le terrain.
              </p>
            </div>
            <div className="border-2 border-leaf/45 bg-ink/18 p-5 sm:p-10">
              <div className="hidden sm:block">
                <GovernanceDiagram />
              </div>
              <div className="sm:hidden">
                <GovernanceDiagramMobile />
              </div>
            </div>
            <div className="mt-7 grid gap-0 sm:mt-11 sm:grid-cols-3">
              {gouvernanceCards.map((c, i) => (
                <div
                  key={c.title}
                  className={cn(
                    "border-t-2 border-leaf/45 py-6",
                    i === 0 && "pr-0 sm:pr-6",
                    i > 0 && "px-0 sm:px-6",
                  )}
                >
                  <h3 className="mb-2.5 text-lg font-bold text-leaf">{c.title}</h3>
                  <p className="text-[15px] leading-relaxed text-primary-foreground/82">{c.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* IAN-ESS */}
        <section id="ianess" className="scroll-mt-[100px] border-b-2 border-primary">
          <Container className="py-14 sm:py-20 lg:py-[110px]">
            <div className="mb-7 max-w-[52ch] sm:mb-12">
              <Eyebrow className="mb-[18px]">04 — IAN-ESS</Eyebrow>
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-primary">
                Cinq typologies d'incubateurs, un même réseau.
              </h2>
              <p className="mt-5 text-[16.5px] leading-[1.7] opacity-88">
                L'Incubateur et Accélérateur National de l'ESS décline un dispositif unique en cinq
                portes d'entrée, selon le métier et le territoire.
              </p>
            </div>
            <div className="hidden sm:block">
              <IanEssDiagram />
            </div>
            <div className="border-2 border-primary sm:hidden">
              <IanEssDiagramMobile />
            </div>
          </Container>
        </section>

        {/* POLES */}
        <section id="poles" className="scroll-mt-[100px] border-b-2 border-primary">
          <Container className="py-14 sm:py-20 lg:py-[110px]">
            <div className="mb-8 max-w-[48ch] sm:mb-[52px]">
              <Eyebrow className="mb-[18px]">05 — Pôles sectoriels</Eyebrow>
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-primary">
                Quatre filières, quatre chantiers.
              </h2>
            </div>
            <div className="grid gap-px border-2 border-primary bg-primary sm:grid-cols-2">
              {poles.map((p) => (
                <div
                  key={p.n}
                  className="bg-background p-6 transition-colors hover:bg-[#FFFDF6] sm:p-9"
                >
                  <div style={{ background: p.bar }} className="mb-5 h-1 w-11" />
                  <div className="mb-2.5 font-mono text-[11.5px] tracking-[0.12em] text-secondary">
                    {p.n}
                  </div>
                  <h3 className="mb-3 text-[21px] font-bold leading-tight text-primary">
                    {p.title}
                  </h3>
                  <p className="text-[15.5px] leading-relaxed opacity-85">{p.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-[100px] border-b-2 border-primary">
          <Container className="grid gap-8 py-14 sm:gap-16 sm:py-20 lg:grid-cols-2 lg:py-[110px]">
            <div>
              <Eyebrow className="mb-[18px]">06 — Services aux membres</Eyebrow>
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-primary">
                Ce que l'adhésion apporte, concrètement.
              </h2>
              <p className="mt-5 max-w-[40ch] text-[16.5px] leading-[1.7] opacity-88">
                Six services ouverts à toute structure membre, dès la première année.
              </p>
            </div>
            <div className="flex flex-col">
              {services.map((s, i) => (
                <div
                  key={s.n}
                  className={cn(
                    "flex items-start gap-[18px] border-t-2 border-primary/20 py-5",
                    i === services.length - 1 && "border-b-2",
                  )}
                >
                  <span className="pt-1 font-mono text-xs text-gold">{s.n}</span>
                  <div>
                    <h3 className="text-[17px] font-bold text-primary">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.6] opacity-82">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ADHERER */}
        <section id="adherer" className="bg-primary text-primary-foreground">
          <Container className="grid items-start gap-9 py-14 sm:gap-[72px] sm:py-20 lg:grid-cols-2 lg:py-[110px]">
            <div>
              <Eyebrow tone="leaf" className="mb-[18px]">
                07 — Adhésion
              </Eyebrow>
              <h2 className="text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.025em] text-primary-foreground">
                Rejoignez la confédération.
              </h2>
              <p className="mt-[22px] max-w-[42ch] text-[16.5px] leading-[1.7] text-primary-foreground/86">
                Coopérative, mutuelle, GIE ou entreprise sociale : déposez votre demande d'adhésion.
                Le Bureau confédéral instruit chaque dossier et vous répond sous quinze jours.
              </p>
              <div className="mt-9 flex items-center gap-[18px]">
                <span className="flex h-[84px] w-[84px] flex-none items-center justify-center rounded-full border-2 border-leaf bg-background">
                  <img src={logo} alt="" className="block h-[74px] w-[74px] rounded-full" />
                </span>
                <div className="label-mono leading-[1.7] text-primary-foreground/72">
                  CONESESS FONDATEURS
                  <br />
                  DAKAR — SÉNÉGAL
                </div>
              </div>
            </div>
            <MembershipForm />
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
