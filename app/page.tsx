import Link from "next/link";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import FlowDiagram from "@/components/FlowDiagram";
import OSDiagram from "@/components/OSDiagram";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { families, osConcepts, problems, workSteps } from "@/lib/content";
import { CTA, SITE } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* 1 — HERO : typographie et parcours en texte, aucun média, aucun cadre */}
      <section className="bg-ink text-paper">
        <Container className="grid gap-16 py-20 md:py-28 lg:grid-cols-[1.4fr_0.6fr] lg:items-center lg:gap-24 lg:py-32">
          <div>
            <Eyebrow dark>{SITE.slogan}</Eyebrow>
            <h1 className="t-hero mt-6 max-w-4xl">
              <span className="text-faint">
                Transformez vos problèmes d&rsquo;entreprise en
              </span>{" "}
              systèmes qui fonctionnent.
            </h1>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Button href={CTA.primary.href} variant="inverse">
                {CTA.primary.label}
              </Button>
              <Button href={CTA.secondary.href} variant="inverse-outline">
                {CTA.secondary.label}
              </Button>
            </div>
          </div>
          <FlowDiagram />
        </Container>
      </section>

      {/* 2 — PROBLÈMES : quatre frictions, chacune mène à une famille de solutions */}
      <Section labelledBy="problems-title">
        <SectionHeader
          id="problems-title"
          eyebrow="Le constat"
          title="Votre entreprise est pleine de frictions."
        >
          Le travail manuel, les outils déconnectés et l&rsquo;information
          éparpillée ralentissent les entreprises. Nous transformons ces
          difficultés en systèmes qui fonctionnent.
        </SectionHeader>
        <ul className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <li key={problem.title} className="group relative">
              <h3 className="t-h3">
                <Link
                  href={`/solutions/#${problem.familyId}`}
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
                className="mt-6 inline-block text-muted transition-transform duration-150 group-hover:text-ink motion-safe:group-hover:translate-x-1"
              >
                →
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3 — CE QUE NOUS CONSTRUISONS : six familles de systèmes */}
      <Section tone="mist" labelledBy="build-title">
        <SectionHeader
          id="build-title"
          eyebrow="Ce que nous construisons"
          title="Des systèmes métier conçus autour de vos besoins."
        >
          Six familles de systèmes que nous pouvons concevoir et développer.
          Ce sont des catégories de travail, pas des produits sur étagère.
        </SectionHeader>
        <ul className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {families.map((family) => (
            <li key={family.id} className="relative">
              <h3 className="t-h3">
                <Link
                  href={`/solutions/#${family.id}`}
                  className="underline decoration-transparent underline-offset-4 transition-colors duration-150 after:absolute after:inset-0 hover:decoration-ink"
                >
                  {family.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-sm leading-relaxed text-muted">
                {family.summary}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-16">
          <ArrowLink href="/solutions/">Voir toutes les solutions</ArrowLink>
        </div>
      </Section>

      {/* 4 — NOTRE MÉTHODE : trois temps */}
      <Section labelledBy="work-title">
        <SectionHeader
          id="work-title"
          eyebrow="Notre méthode"
          title="Du problème opérationnel à l'amélioration mesurable."
        />
        <ol className="mt-16 grid gap-12 md:grid-cols-3 lg:gap-20">
          {workSteps.map((step) => (
            <li key={step.number}>
              <span className="font-mono text-[0.85rem] text-accent-deep">
                {step.number}
              </span>
              <h3 className="t-h3 mt-4">{step.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-16">
          <ArrowLink href="/methode/">Découvrir notre méthode</ArrowLink>
        </div>
      </Section>

      {/* 5 — EXPONENTOS : vision technologique, pas un produit livré */}
      <Section tone="dark" labelledBy="os-title">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
          <div>
            <SectionHeader
              id="os-title"
              eyebrow="ExponentOS"
              title="Une couche intelligente. Des systèmes métier connectés."
              dark
            >
              ExponentOS est le socle technologique de notre vision : relier
              les données, les flux de travail et les capacités intelligentes
              de l&rsquo;entreprise pour rendre ses opérations plus
              efficaces.
            </SectionHeader>
            <dl className="mt-14 grid gap-x-12 gap-y-9 sm:grid-cols-2">
              {osConcepts.map((concept) => (
                <div key={concept.title}>
                  <dt className="font-medium text-paper">{concept.title}</dt>
                  <dd className="mt-2 max-w-sm leading-relaxed text-on-dark">
                    {concept.text}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-12 max-w-xl text-[0.95rem] leading-relaxed text-faint">
              C&rsquo;est la direction que nous prenons, pas un produit fini.
              Nous le construisons progressivement, à partir de problèmes
              métier réels.
            </p>
            <div className="mt-8">
              <ArrowLink href="/exponentos/" dark>
                Lire la vision ExponentOS
              </ArrowLink>
            </div>
          </div>
          <div className="lg:pt-6">
            <OSDiagram />
          </div>
        </div>
      </Section>

      {/* 6 — VALUE SCAN : parcours honnête, une conversation guidée */}
      <Section labelledBy="scan-title">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-24">
          <SectionHeader
            id="scan-title"
            eyebrow="Value Scan"
            title="Découvrez où votre entreprise perd du temps et de la valeur."
          >
            Repérez les frictions opérationnelles, hiérarchisez les
            améliorations possibles et découvrez ce que vous pourriez
            améliorer en premier.
          </SectionHeader>
          <div>
            <Button href={CTA.scan.href}>{CTA.scan.label}</Button>
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-muted">
              Aujourd&rsquo;hui, le Value Scan est une conversation guidée :
              vous décrivez le problème, nous l&rsquo;examinons ensemble.
            </p>
          </div>
        </div>
      </Section>

      {/* 7 — CTA FINAL */}
      <Section tone="dark" labelledBy="cta-title">
        <div className="max-w-4xl">
          <h2 id="cta-title" className="t-h2">
            Votre prochaine amélioration commence par un problème.
          </h2>
          <p className="lead mt-6 max-w-2xl text-on-dark">
            Dites-nous ce qui ralentit votre entreprise. Nous vous aiderons à
            trouver une voie concrète pour avancer.
          </p>
          <Button href={CTA.talk.href} variant="inverse" className="mt-10">
            {CTA.talk.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
