import Link from "next/link";

type Variant = "primary" | "secondary" | "inverse" | "inverse-outline";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-[0.95rem] font-medium transition-colors duration-150";

const variants: Record<Variant, string> = {
  /* CTA principal : encre pleine sur fond clair */
  primary: "bg-ink text-paper hover:bg-ink-2",
  /* CTA secondaire sur fond clair */
  secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
  /* CTA principal sur fond sombre */
  inverse: "bg-paper text-ink hover:bg-mist",
  /* CTA secondaire sur fond sombre */
  "inverse-outline":
    "border border-paper/60 text-paper hover:bg-paper hover:text-ink",
};

/** Classes d'un bouton — réutilisées par le `<button type="submit">` du formulaire. */
export function buttonClasses(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`.trim();
}

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
