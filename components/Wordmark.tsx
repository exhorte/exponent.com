import Image from "next/image";

/**
 * Logo officiel complet (symbole + nom), kit « exports_v2 ». Deux fichiers
 * de même tracé : noir pour les fonds clairs, blanc pour les fonds sombres.
 * Ratio d'origine 1295,9 × 157 : on fixe la hauteur, la largeur suit.
 */
export default function Wordmark({
  tone = "light",
  alt = "",
  className = "",
}: {
  /** fond sur lequel le logo est posé : `light` = logo noir, `dark` = logo blanc */
  tone?: "light" | "dark";
  /** vide quand le logo est dans un lien qui porte déjà son propre libellé */
  alt?: string;
  className?: string;
}) {
  return (
    <Image
      src={tone === "dark" ? "/logo-white.svg" : "/logo-black.svg"}
      alt={alt}
      width={232}
      height={28}
      priority
      className={`h-7 w-auto ${className}`}
    />
  );
}
