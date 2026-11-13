/**
 * Conteneur de page unique : en-tête, sections et pied de page l'utilisent,
 * pour que tout s'aligne sur les mêmes bords. Large (1680 px) avec des marges
 * qui grandissent avec l'écran, afin que le contenu occupe l'espace au lieu
 * de se tasser au centre.
 */
export default function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1680px] px-6 sm:px-10 lg:px-14 xl:px-20 ${className}`}
    >
      {children}
    </div>
  );
}
