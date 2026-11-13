import type { Metadata } from "next";
import Button from "@/components/Button";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { frameworkSteps, workSteps } from "@/lib/content";
import { CTA, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Méthode",
  description:
    "Du problème opérationnel à l'amélioration mesurable : identifier, construire, améliorer, avec les huit étapes du framework EXPONENT.",
  path: "/methode/",
});

const practice = [
  {
    title: "Un problème à la fois",
    text: "Nous partons de ce qui coûte le plus, montrons un résultat mesuré, puis passons au suivant.",
  },
  {
    title: "Vos outils restent",
    text: "Les systèmes sont conçus pour s'adapter à vos processus et à vos logiciels existants.",
  },
  {
    title: "Les personnes gardent la main",
    text: "Les décisions importantes restent aux personnes. Le système prépare, suit et signale.",
  },
  {
    title: "Les résultats sont mesurés",
    text: "Nous convenons de ce que « s'améliorer » veut dire avant de construire, puis nous le vérifions.",
  },
];

export default function MethodePage() {
  return (
    <>
      <Section labelledBy="work-title">
        <SectionHeader
          id="work-title"
          as="h1"
          size="display"
          eyebrow="Méthode"
          title="Du problème opérationnel à l'amélioration mesurable."
        >
          Nous comprenons le problème avant de construire la solution, puis
          nous mesurons si elle a fonctionné. Trois temps, appuyés par le
          framework EXPONENT.
        </SectionHeader>
      </Section>

      {/* Les trois temps, et les huit étapes EXPONENT qui les composent */}
      <Section tone="mist" labelledBy="framework-title">
        <SectionHeader
          id="framework-title"
          eyebrow="Le framework EXPONENT"
          title="Huit étapes, trois temps."
        >
          Le framework décrit comment passer d&rsquo;un problème opérationnel
          à un système qui fonctionne, puis à une amélioration mesurable. Il
          reste léger : chaque étape a un seul but.
        </SectionHeader>
        <p className="mt-6 max-w-2xl text-[0.92rem] leading-relaxed text-muted">
          EXPONENT reprend les initiales anglaises des huit étapes : Examine,
          Extract, Prioritize, Orchestrate, Normalize, Execute, Navigate,
          Transform.
        </p>

        <div className="mt-20 space-y-20">
          {workSteps.map((stage) => {
            const steps = frameworkSteps.filter(
              (step) => step.stage === stage.title,
            );
            return (
              <div
                key={stage.title}
                className="grid gap-10 lg:grid-cols-[0.8fr_2.2fr] lg:gap-20"
              >
                <div>
                  <span className="font-mono text-[0.85rem] text-accent-deep">
                    {stage.number}
                  </span>
                  <h3 className="t-h3-lg mt-3">{stage.title}</h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-muted">
                    {stage.text}
                  </p>
                </div>
                <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-3">
                  {steps.map((step) => (
                    <li key={step.title}>
                      <h4 className="t-h3">{step.title}</h4>
                      <p className="mt-3 leading-relaxed text-muted">
                        {step.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </Section>

      <Section labelledBy="practice-title">
        <SectionHeader
          id="practice-title"
          eyebrow="Concrètement"
          title="Ce que cela change pour vous."
        />
        <ul className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {practice.map((item) => (
            <li key={item.title}>
              <h3 className="t-h3">{item.title}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-muted">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark" labelledBy="work-cta-title">
        <div className="max-w-4xl">
          <h2 id="work-cta-title" className="t-h2">
            La première étape, c&rsquo;est de comprendre votre problème.
          </h2>
          <p className="lead mt-6 max-w-2xl text-on-dark">
            Dites-nous ce qui ralentit votre entreprise. Nous commencerons
            par là.
          </p>
          <Button href={CTA.scan.href} variant="inverse" className="mt-10">
            {CTA.scan.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
