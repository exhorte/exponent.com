import Container from "./Container";

type Tone = "paper" | "mist" | "dark";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  dark: "bg-ink text-paper",
};

/**
 * Section de page : conteneur large, rythme vertical unique, trois fonds
 * (clair, gris très pâle, sombre).
 */
export default function Section({
  id,
  tone = "paper",
  className = "",
  labelledBy,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  /** id du titre de la section, pour l'accessibilité */
  labelledBy?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${tones[tone]} ${className}`}
    >
      <Container className="py-20 md:py-28 lg:py-32">{children}</Container>
    </section>
  );
}
