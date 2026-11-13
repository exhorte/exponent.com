import type { Metadata } from "next";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { CTA, SITE, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Entreprise",
  description:
    "La mission d'ExponentValue : transformer les problèmes opérationnels en systèmes qui créent une valeur mesurable. Notre approche et notre vision à long terme.",
  path: "/entreprise/",
});

const approach = [
  {
    title: "Nous partons du problème",
    text: "Un système n'est utile que s'il résout quelque chose de réel. Nous commençons par la façon dont votre travail se passe vraiment, pas par une technologie.",
  },
  {
    title: "Nous construisons des systèmes utiles",
    text: "Applications, outils internes, tableaux de bord et intégrations qui s'adaptent à vos processus et complètent les logiciels que vous utilisez déjà.",
  },
  {
    title: "La technologie est un moyen",
    text: "IA, agents, API, flux de travail et modèles de langage sont utilisés quand ils sont pertinents. Ils ne sont jamais le but.",
  },
];

export default function EntreprisePage() {
  return (
    <>
      <Section labelledBy="company-title">
        <SectionHeader
          id="company-title"
          as="h1"
          size="display"
          eyebrow="Entreprise"
          title={SITE.tagline}
        >
          {SITE.statement}
        </SectionHeader>
      </Section>

      <Section tone="mist" labelledBy="mission-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <h2 id="mission-title" className="t-h2">
            Notre mission.
          </h2>
          <div className="max-w-2xl">
            <p className="lead">
              Transformer les problèmes opérationnels en systèmes qui créent
              une valeur mesurable.
            </p>
            <p className="mt-6 text-muted">
              Nous ne cherchons pas à devenir un ERP généraliste de plus. Nous
              construisons des systèmes qui complètent vos outils existants,
              résolvent des difficultés opérationnelles précises et relient
              les processus quand cela apporte une valeur réelle.
            </p>
          </div>
        </div>
      </Section>

      <Section labelledBy="approach-title">
        <SectionHeader
          id="approach-title"
          eyebrow="Notre approche"
          title="Le problème d'abord, le système ensuite, la technologie en dernier."
        />
        <ul className="mt-16 grid gap-12 md:grid-cols-3 lg:gap-20">
          {approach.map((item) => (
            <li key={item.title}>
              <h3 className="t-h3">{item.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-16">
          <ArrowLink href="/methode/">Découvrir notre méthode</ArrowLink>
        </div>
      </Section>

      <Section tone="dark" labelledBy="direction-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <SectionHeader
            id="direction-title"
            eyebrow="Vision à long terme"
            title="Partir du problème, grandir avec lui."
            dark
          />
          <div className="max-w-xl space-y-6 text-on-dark">
            <p>
              Nous commençons par servir les petites et moyennes entreprises,
              les entrepreneurs et les organisations confrontés à des
              difficultés opérationnelles concrètes.
            </p>
            <p>
              À terme, nous voulons servir des organisations plus grandes et
              développer des solutions spécialisées, notamment dans la
              finance, la fintech, la banque et l&rsquo;assurance.
            </p>
            <p className="text-faint">
              ExponentOS est le socle technologique vers lequel nous
              avançons.
            </p>
            <ArrowLink href="/exponentos/" dark>
              Lire la vision
            </ArrowLink>
          </div>
        </div>
      </Section>

      <Section labelledBy="company-cta-title">
        <div className="max-w-4xl">
          <h2 id="company-cta-title" className="t-h2">
            Votre prochaine amélioration commence par un problème.
          </h2>
          <p className="lead mt-6 max-w-2xl text-muted">
            Dites-nous ce qui ralentit votre entreprise. Nous vous aiderons à
            trouver une voie concrète pour avancer.
          </p>
          <Button href={CTA.talk.href} className="mt-10">
            {CTA.talk.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
