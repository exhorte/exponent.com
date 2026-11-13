type Status = "today" | "design" | "vision";

const labels: Record<Status, string> = {
  today: "Existe aujourd'hui",
  design: "En conception",
  vision: "Vision à long terme",
};

/** Étiquette d'état, en texte seul : distingue ce qui existe, ce qui se dessine, ce qui relève de la vision. */
export default function StatusBadge({ status }: { status: Status }) {
  return (
    <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-accent-deep">
      {labels[status]}
    </p>
  );
}
