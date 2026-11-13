import Link from "next/link";

/** Lien texte discret avec flèche, pour « en savoir plus » et les renvois. */
export default function ArrowLink({
  href,
  children,
  dark = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[0.95rem] font-medium underline underline-offset-[6px] transition-colors duration-150 ${
        dark
          ? "text-paper decoration-faint hover:decoration-paper"
          : "text-ink decoration-line hover:decoration-ink"
      } ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-150 motion-safe:group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}
