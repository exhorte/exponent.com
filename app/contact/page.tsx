import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { SITE, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Value Scan et contact",
  description:
    "Découvrez où votre entreprise perd du temps et de la valeur. Décrivez-nous un problème opérationnel, nous l'examinerons ensemble.",
  path: "/contact/",
});

const steps = [
  {
    title: "Décrivez le problème",
    text: "Quelques lignes sur ce qui vous ralentit, et où cela se voit.",
  },
  {
    title: "Nous l'examinons avec vous",
    text: "Une conversation pour comprendre comment le travail se passe vraiment aujourd'hui.",
  },
  {
    title: "Vous repartez avec une voie concrète",
    text: "Les premières améliorations qui valent la peine, et dans quel ordre.",
  },
];

export default function ContactPage() {
  return (
    <Section labelledBy="contact-title">
      <div className="grid gap-20 lg:grid-cols-[1fr_0.9fr] lg:gap-28">
        <div>
          <SectionHeader
            id="contact-title"
            as="h1"
            size="display"
            eyebrow="Value Scan"
            title="Découvrez où votre entreprise perd du temps et de la valeur."
          >
            Repérez les frictions opérationnelles, hiérarchisez les
            améliorations possibles et découvrez ce que vous pourriez
            améliorer en premier.
          </SectionHeader>

          <p className="mt-8 max-w-xl text-[0.95rem] leading-relaxed text-muted">
            Aujourd&rsquo;hui, le Value Scan est une conversation guidée, pas
            un diagnostic automatique. Vous décrivez un problème, nous
            l&rsquo;examinons ensemble.
          </p>

          <ol className="mt-14 space-y-9">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-6">
                <span className="font-mono text-[0.85rem] text-accent-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="t-h3">{step.title}</h2>
                  <p className="mt-2 max-w-md leading-relaxed text-muted">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-14 text-[0.95rem] text-muted">
            Vous préférez écrire directement ?{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-medium text-ink underline underline-offset-4"
            >
              {SITE.email}
            </a>
          </p>
        </div>

        <div className="lg:pt-2">
          <h2 className="t-h3">Dites-nous ce qui vous ralentit</h2>
          <p className="mt-2 text-[0.92rem] text-muted">
            Les champs marqués * sont obligatoires.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
