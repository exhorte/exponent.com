const systems = [
  "Finance",
  "Opérations",
  "Ventes",
  "Documents",
  "Pilotage",
  "Sur mesure",
];
const tools = [
  "Tableurs",
  "Comptabilité",
  "CRM",
  "Mails et messageries",
  "Documents",
];

const label = "font-mono text-[0.75rem] uppercase tracking-[0.14em] text-faint";

function Arrow() {
  return (
    <span aria-hidden="true" className="block py-6 text-xl text-faint">
      ↓
    </span>
  );
}

/**
 * Architecture cible d'ExponentOS, en trois niveaux de texte : les systèmes
 * métier au-dessus, ExponentOS au milieu, vos outils et données existants
 * dessous. Elle représente la vision, pas un produit livré (le statut est
 * détaillé sur la page ExponentOS). Texte seul, sans cadre ni image.
 */
export default function OSDiagram() {
  return (
    <div
      role="img"
      aria-label="Schéma : les systèmes métier reposent sur ExponentOS, qui se connecte vers le bas à vos données et à vos outils existants."
    >
      <p className={label}>Systèmes métier</p>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[1.05rem] text-on-dark">
        {systems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <Arrow />

      <p className="text-3xl font-medium tracking-tight text-paper">
        ExponentOS
      </p>

      <Arrow />

      <p className={label}>Vos données et vos outils existants</p>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[1.05rem] text-on-dark">
        {tools.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
