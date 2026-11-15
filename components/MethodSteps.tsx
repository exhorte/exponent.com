"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { workSteps } from "@/lib/content";

/* ————————————————————————————————————————————————
   Formes au trait des trois temps de la méthode. Chaque tracé porte
   pathLength = 1 et son rang (`--i`) : il se dessine à son tour quand
   `--draw` (posé sur la carte) passe de 0 à 1. Le style est dans
   globals.css (.step-shape .trace).
   ———————————————————————————————————————————————— */

const trace = (i: number, n: number) =>
  ({ "--i": i, "--n": n }) as CSSProperties;

/** Identifier : une cible qui repère l'opportunité (le point rouge). */
function IdentifyShape() {
  const n = 6;
  return (
    <>
      <path className="trace" pathLength={1} style={trace(0, n)} d="M8 80H152" />
      <path className="trace" pathLength={1} style={trace(1, n)} d="M80 8V152" />
      <circle className="trace" pathLength={1} style={trace(2, n)} cx="80" cy="80" r="62" />
      <circle className="trace" pathLength={1} style={trace(3, n)} cx="80" cy="80" r="42" />
      <circle className="trace" pathLength={1} style={trace(4, n)} cx="80" cy="80" r="22" />
      <circle className="trace accent" pathLength={1} style={trace(5, n)} cx="110" cy="51" r="7" />
    </>
  );
}

/** Construire : un cube en fil de fer, assemblé de huit petits cubes. */
function BuildShape() {
  const n = 8;
  const lines = [
    "M107 33.5L53 64.5", // face du dessus
    "M53 33.5L107 64.5",
    "M53 64.5V126.5", // face gauche
    "M26 80L80 111",
    "M107 64.5V126.5", // face droite
    "M134 80L80 111",
  ];
  return (
    <>
      <path
        className="trace"
        pathLength={1}
        style={trace(0, n)}
        d="M80 18L134 49V111L80 142L26 111V49Z"
      />
      <path
        className="trace accent"
        pathLength={1}
        style={trace(1, n)}
        d="M26 49L80 80L134 49M80 80V142"
      />
      {lines.map((d, index) => (
        <path
          key={d}
          className="trace"
          pathLength={1}
          style={trace(index + 2, n)}
          d={d}
        />
      ))}
    </>
  );
}

/* Courbe exponentielle : x de 22 à 142, y de 138 à 26 (e^(3,2 t)). */
const K = 3.2;
const curvePoints = Array.from({ length: 25 }, (_, step) => {
  const t = step / 24;
  const x = 22 + 120 * t;
  const y = 138 - (112 * (Math.exp(K * t) - 1)) / (Math.exp(K) - 1);
  return `${x.toFixed(1)} ${y.toFixed(1)}`;
});
const curve = `M${curvePoints.join("L")}`;
const pointAt = (t: number) => ({
  cx: (22 + 120 * t).toFixed(1),
  cy: (138 - (112 * (Math.exp(K * t) - 1)) / (Math.exp(K) - 1)).toFixed(1),
});

/** Améliorer : une courbe exponentielle et les résultats mesurés. */
function ImproveShape() {
  const n = 6;
  return (
    <>
      <path className="trace" pathLength={1} style={trace(0, n)} d="M22 22V138H146" />
      <path className="trace accent" pathLength={1} style={trace(1, n)} d={curve} />
      <circle className="trace" pathLength={1} style={trace(2, n)} r="4.5" {...pointAt(0.5)} />
      <circle className="trace" pathLength={1} style={trace(3, n)} r="4.5" {...pointAt(0.78)} />
      <circle className="trace" pathLength={1} style={trace(4, n)} r="4.5" {...pointAt(1)} />
      <path className="trace" pathLength={1} style={trace(5, n)} d="M106 26H134M122 14L134 26L122 38" />
    </>
  );
}

const shapes = [IdentifyShape, BuildShape, ImproveShape];

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const easeOut = (value: number) => 1 - (1 - value) ** 3;

/**
 * Les trois temps de la méthode, en cartes animées au défilement :
 * la carte glisse en entrant, sa forme se trace quand elle arrive au milieu
 * de l'écran et se retire quand elle sort par le haut. Sans JavaScript, ou
 * avec « réduire les animations », tout reste visible et immobile.
 */
export default function MethodSteps() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const cards = Array.from(
      list.querySelectorAll<HTMLElement>("[data-step]"),
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      for (const card of cards) {
        if (reduce.matches) {
          card.style.setProperty("--enter", "1");
          card.style.setProperty("--draw", "1");
          continue;
        }
        const box = card.getBoundingClientRect();
        /* 0 : le haut de la carte touche le bas de l'écran ;
           1 : son bas touche le haut de l'écran. */
        const progress = clamp((viewport - box.top) / (viewport + box.height));
        const enter = easeOut(clamp(progress / 0.32));
        const form = clamp((progress - 0.06) / 0.34);
        const retract = clamp((progress - 0.74) / 0.2);
        card.style.setProperty("--enter", enter.toFixed(3));
        card.style.setProperty("--draw", (form * (1 - retract)).toFixed(3));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <ol ref={listRef} className="grid gap-6 md:gap-8">
      {workSteps.map((step, index) => {
        const Shape = shapes[index];
        return (
          <li key={step.number} data-step className="step-card relative">
            <div aria-hidden="true" className="step-ghost" />
            <article className="relative grid gap-8 border border-line bg-mist p-7 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:items-center sm:gap-10 md:p-10 xl:grid-cols-[10.5rem_minmax(0,1fr)] xl:gap-14 xl:p-12">
              <svg
                aria-hidden="true"
                viewBox="0 0 160 160"
                className="step-shape h-28 w-28 text-ink sm:h-auto sm:w-full"
              >
                {Shape ? <Shape /> : null}
              </svg>
              <div>
                <span className="font-mono text-[0.85rem] text-accent-deep">
                  {step.number}
                </span>
                <h3 className="t-h3-lg mt-3">{step.title}</h3>
                <p className="mt-4 max-w-xl leading-relaxed text-muted">
                  {step.text}
                </p>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
