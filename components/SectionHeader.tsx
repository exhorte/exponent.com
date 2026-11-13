import Eyebrow from "./Eyebrow";

/**
 * En-tête de section : label, titre, chapeau. `as="h1"` + `size="display"`
 * pour le titre principal d'une page ; h2 partout ailleurs.
 */
export default function SectionHeader({
  eyebrow,
  title,
  id,
  as: Tag = "h2",
  size = "h2",
  dark = false,
  children,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  id?: string;
  as?: "h1" | "h2";
  size?: "display" | "h2";
  dark?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-4xl ${className}`}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <Tag
        id={id}
        className={`${size === "display" ? "t-display" : "t-h2"} mt-5 ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </Tag>
      {children ? (
        <p
          className={`lead mt-6 max-w-2xl ${dark ? "text-on-dark" : "text-muted"}`}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}
