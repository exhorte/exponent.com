import type { Metadata } from "next";
import Link from "next/link";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { families, problems } from "@/lib/content";
import { CTA, SITE, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description:
    "Finance, opérations, ventes, documents, pilotage et applications sur mesure : des systèmes métier conçus autour de vos problèmes opérationnels.",
  path: "/solutions/",
});

const principles = [
  {
    title: "Compléter, pas remplacer",
    text: "Nous partons des outils que vous utilisez déjà et construisons ce qui manque autour.",
  },
  {
    title: "Relier là où c'est utile",
    text: "Nous connectons les processus et les données quand cela supprime du travail ou un risque réels.",
  },
  {
    title: "Un problème à la fois",
    text: "Nous visons une difficulté précise, mesurons le résultat, puis étendons ce qui fonctionne.",
  },
];

const label = "font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted";

export default function SolutionsPage() {
  return (
    <>
      <Section labelledBy="solutions-title">
        <SectionHeader
          id="solutions-title"
          as="h1"
          size="display"
          eyebrow="Solutions"
          title="Des systèmes métier pour de vrais problèmes opérationnels."
        >
          {SITE.tagline} Nous partons du problème, puis nous concevons le
          système qui s&rsquo;insère autour des outils que vous utilisez
          déjà.
        </SectionHeader>
      </Section>

      {/* Les problèmes : point d'entrée de chaque famille */}
      <Section tone="mist" labelledBy="problems-title">
        <SectionHeader
          id="problems-title"
          eyebrow="Le point de départ"
          title="Lequel de ces problèmes vous parle ?"
        />
        <ul className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <li key={problem.title} className="group relative">
              <h3 className="t-h3">
                <Link
                  href={`#${problem.familyId}`}
                  className="after:absolute after:inset-0"
                >
                  {problem.title}
                </Link>
              </h3>
              <p className="mt-4 max-w-xs leading-relaxed text-muted">
                {problem.text}
              </p>
              <span
                aria-hidden="true"
                className="mt-6 inline-block text-muted transition-transform duration-150 group-hover:text-ink motion-safe:group-hover:translate-y-1"
              >
                ↓
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Les familles de systèmes */}
      <Section labelledBy="families-title">
        <SectionHeader
          id="families-title"
          eyebrow="Ce que nous construisons"
          title="Six familles de systèmes."
        >
          Tout ce qui suit décrit ce que nous pouvons concevoir et développer
          autour de vos besoins. Il ne s&rsquo;agit pas de produits prêts à
          l&rsquo;emploi.
        </SectionHeader>

        <div className="mt-16">
          {families.map((family, index) => (
            <article
              key={family.id}
              id={family.id}
              className="grid gap-8 border-t border-line py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24"
            >
              <div>
                <span className="font-mono text-[0.85rem] text-accent-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3-lg mt-3">{family.title}</h3>
                <p className="mt-4 max-w-sm leading-relaxed text-muted">
                  {family.summary}
                </p>
              </div>
              <dl className="grid gap-8">
                <div>
                  <dt className={label}>Le problème</dt>
                  <dd className="mt-2 max-w-xl">{family.problem}</dd>
                </div>
                <div>
                  <dt className={label}>Ce que nous construisons</dt>
                  <dd className="mt-2 max-w-xl">{family.build}</dd>
                </div>
                <div>
                  <ArrowLink href={CTA.primary.href}>
                    En parler avec nous
                  </ArrowLink>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Section>

      {/* Approche : compléter les outils existants, pas un nouvel ERP */}
      <Section tone="dark" labelledBy="approach-title">
        <SectionHeader
          id="approach-title"
          eyebrow="Notre approche"
          title="Pas un énième ERP."
          dark
        >
          Nous ne cherchons pas à remplacer les logiciels qui font tourner
          votre entreprise. Nous construisons des systèmes qui les complètent,
          résolvent des difficultés opérationnelles précises et relient les
          processus là où cela crée de la valeur.
        </SectionHeader>
        <ul className="mt-16 grid gap-12 md:grid-cols-3 lg:gap-20">
          {principles.map((principle) => (
            <li key={principle.title}>
              <h3 className="t-h3 text-paper">{principle.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-on-dark">
                {principle.text}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="solutions-cta-title">
        <div className="max-w-4xl">
          <h2 id="solutions-cta-title" className="t-h2">
            Commencez par le problème qui vous coûte le plus.
          </h2>
          <p className="lead mt-6 max-w-2xl text-muted">
            Dites-nous ce qui ralentit votre entreprise : nous vous aiderons à
            voir quel système changerait d&rsquo;abord la situation.
          </p>
          <Button href={CTA.scan.href} className="mt-10">
            {CTA.scan.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
