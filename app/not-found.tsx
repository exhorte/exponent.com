import Button from "@/components/Button";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

export default function NotFound() {
  return (
    <Section labelledBy="notfound-title">
      <SectionHeader
        id="notfound-title"
        as="h1"
        size="display"
        eyebrow="404"
        title="Cette page n'existe pas."
      >
        Le lien est peut-être périmé, ou la page a changé d&rsquo;adresse.
        Repartez de l&rsquo;accueil.
      </SectionHeader>
      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        <Button href="/">Retour à l&rsquo;accueil</Button>
        <Button href="/solutions/" variant="secondary">
          Découvrir nos solutions
        </Button>
      </div>
    </Section>
  );
}
