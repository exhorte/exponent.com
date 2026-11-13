/**
 * Petit label monospace au-dessus d'un titre. Texte seul : aucun marqueur
 * coloré. `dark` pour les sections sombres.
 */
export default function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`font-mono text-[0.75rem] uppercase tracking-[0.14em] ${
        dark ? "text-faint" : "text-muted"
      }`}
    >
      {children}
    </p>
  );
}
