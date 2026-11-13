import Logomark from "./Logomark";

const sources = ["Tableurs", "Boîtes mail", "Papier et PDF", "Messageries"];
const outcomes = [
  "Temps gagné",
  "Trésorerie visible",
  "Relances plus rapides",
  "Moins d'erreurs",
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
 * Parcours du hero : outils dispersés → système connecté → résultats
 * mesurés. Du texte seul, sans cadre ni image. Les résultats sont des
 * catégories, jamais des chiffres : rien n'est inventé.
 */
export default function FlowDiagram() {
  return (
    <div
      role="img"
      aria-label="Schéma : des tableurs, des boîtes mail, des documents papier et des messageries éparpillés alimentent un système métier connecté, qui produit des résultats mesurables : temps gagné, trésorerie visible, relances plus rapides et moins d'erreurs."
    >
      <p className={label}>D&rsquo;où l&rsquo;on part</p>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[1.05rem] text-on-dark">
        {sources.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <Arrow />

      <div className="flex items-center gap-3 text-paper">
        <Logomark className="h-7 w-7 shrink-0" />
        <p className="text-xl font-semibold tracking-tight">
          Votre système métier
        </p>
      </div>
      <p className="mt-2 max-w-xs text-[0.95rem] leading-relaxed text-on-dark">
        Construit autour de votre processus et connecté à vos outils.
      </p>

      <Arrow />

      <p className={label}>Ce que vous mesurez</p>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[1.05rem] text-paper">
        {outcomes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
