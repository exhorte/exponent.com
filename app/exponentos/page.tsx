import type { Metadata } from "next";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import OSDiagram from "@/components/OSDiagram";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import { osVision } from "@/lib/content";
import { CTA, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "ExponentOS",
  description:
    "ExponentOS est le socle technologique des systèmes métier intelligents et connectés : ce qui existe, ce qui se conçoit, et la direction à long terme.",
  path: "/exponentos/",
});

/* Statuts : à ajuster ici dès qu'un composant change réellement d'état. */
const status = [
  {
    status: "today" as const,
    title: "Des systèmes métier, un problème à la fois",
    text: "Nous concevons et développons des systèmes métier autour d'un problème opérationnel précis. Nous utilisons aussi un calculateur interne qui transforme une idée d'amélioration en business case chiffré.",
  },
  {
    status: "design" as const,
    title: "Des briques réutilisables",
    text: "Un modèle de données commun, des intégrations simples, des flux de travail, des permissions et des journaux d'activité, tirés des systèmes que nous construisons plutôt que dessinés dans l'abstrait. Non proposés comme produit.",
  },
  {
    status: "vision" as const,
    title: "Des systèmes connectés à grande échelle",
    text: "Données métier, applications existantes, flux de travail et capacités intelligentes qui fonctionnent ensemble sous contrôle. C'est la direction, pas la réalité d'aujourd'hui.",
  },
];

export default function ExponentOSPage() {
  return (
    <>
      <Section labelledBy="os-title">
        <SectionHeader
          id="os-title"
          as="h1"
          size="display"
          eyebrow="Technologie"
          title="ExponentOS."
        >
          ExponentOS est le socle technologique des systèmes métier
          intelligents et connectés.
        </SectionHeader>
      </Section>

      {/* La vision : ce qu'ExponentOS cherche à relier */}
      <Section tone="dark" labelledBy="vision-title">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
          <div>
            <SectionHeader
              id="vision-title"
              eyebrow="La vision"
              title="Une couche intelligente. Des systèmes métier connectés."
              dark
            >
              Avec le temps, ExponentOS relie ce que l&rsquo;entreprise
              possède déjà, pour que les systèmes que nous construisons
              partagent les mêmes fondations.
            </SectionHeader>
            <ul className="mt-14 grid gap-x-12 gap-y-9 sm:grid-cols-2">
              {osVision.map((item) => (
                <li key={item.title}>
                  <h3 className="font-medium text-paper">{item.title}</h3>
                  <p className="mt-2 max-w-sm leading-relaxed text-on-dark">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:pt-6">
            <OSDiagram />
          </div>
        </div>
      </Section>

      {/* Où en sont les choses : trois états clairement distincts */}
      <Section labelledBy="status-title">
        <SectionHeader
          id="status-title"
          eyebrow="Où en sont les choses"
          title="Ce qui existe, ce qui se dessine, ce qui relève de la vision."
        >
          Aucun composant d&rsquo;ExponentOS n&rsquo;est encore proposé comme
          produit. Nous séparons les trois niveaux pour que rien ne soit pris
          pour ce qu&rsquo;il n&rsquo;est pas.
        </SectionHeader>
        <ul className="mt-16 grid gap-12 md:grid-cols-3 lg:gap-20">
          {status.map((item) => (
            <li key={item.title}>
              <StatusBadge status={item.status} />
              <h3 className="t-h3 mt-5">{item.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" labelledBy="means-title">
        <div className="max-w-4xl">
          <h2 id="means-title" className="t-h2">
            L&rsquo;intelligence est un moyen, pas un but.
          </h2>
          <p className="lead mt-6 max-w-2xl text-muted">
            Les API, les flux de travail, les modèles de langage, la
            recherche documentaire et les modèles prédictifs sont utilisés
            quand ils conviennent au problème. Une règle simple ou un bon
            tableur est parfois la meilleure réponse.
          </p>
          <div className="mt-10">
            <ArrowLink href="/methode/">
              Voir comment nous choisissons ce que nous construisons
            </ArrowLink>
          </div>
        </div>
      </Section>

      <Section tone="dark" labelledBy="os-cta-title">
        <div className="max-w-4xl">
          <h2 id="os-cta-title" className="t-h2">
            Votre prochaine amélioration commence par un problème.
          </h2>
          <p className="lead mt-6 max-w-2xl text-on-dark">
            Dites-nous ce qui ralentit votre entreprise. La technologie suit.
          </p>
          <Button href={CTA.talk.href} variant="inverse" className="mt-10">
            {CTA.talk.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
