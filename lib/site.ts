import type { Metadata } from "next";

/* Constantes du site : une seule source pour l'URL, le contact, la
   navigation et les CTA. Les routes portent un slash final
   (`trailingSlash: true` dans next.config.ts). */
export const SITE = {
  name: "ExponentValue",
  url: "https://exponentvalue.com",
  email: "contact@exponentvalue.com",
  /* Version française du slogan « Compress time. Expand value. » :
     à valider par Exhorte. */
  slogan: "Compressez le temps. Amplifiez la valeur.",
  statement:
    "ExponentValue transforme les problèmes opérationnels des entreprises en systèmes intelligents qui créent une valeur mesurable.",
  tagline: "Nous transformons les problèmes d'entreprise en systèmes métier.",
} as const;

export const NAV_LINKS = [
  { href: "/solutions/", label: "Solutions" },
  { href: "/methode/", label: "Méthode" },
  { href: "/exponentos/", label: "ExponentOS" },
  { href: "/entreprise/", label: "Entreprise" },
] as const;

export const CTA = {
  primary: { label: "Trouver mon opportunité", href: "/contact/" },
  secondary: { label: "Découvrir nos solutions", href: "/solutions/" },
  scan: { label: "Lancer mon Value Scan", href: "/contact/" },
  talk: { label: "Parlons-en", href: "/contact/" },
} as const;

/* Métadonnées d'une page : titre, description, canonique et Open Graph.
   Next.js ne fusionne pas `openGraph` en profondeur entre le layout et la
   page : on le reconstruit ici pour qu'aucun champ ne se perde. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "fr_FR",
      url: path,
      title: `${title} — ${SITE.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE.name}`,
      description,
    },
  };
}
