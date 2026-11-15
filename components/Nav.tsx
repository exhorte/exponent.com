"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Wordmark from "./Wordmark";
import { buttonClasses } from "./Button";
import { CTA, NAV_LINKS } from "@/lib/site";

/* `trailingSlash: true` : usePathname() renvoie "/entreprise/", les href aussi.
   On compare sans slash final pour que le lien actif soit bien repéré. */
const strip = (path: string) => path.replace(/\/+$/, "") || "/";

/* La barre flotte à 12 px du haut et mesure 64 px : on regarde ce qui passe
   sous son milieu (44 px) pour choisir le verre clair ou le verre sombre. */
const PROBE_Y = 44;

/**
 * Vrai quand la barre passe au-dessus d'une surface sombre (hero, sections
 * `tone="dark"`, pied de page : elles portent `data-nav-theme="dark"`).
 * Mesuré au défilement, une fois par image au plus.
 */
function useDarkSurfaceUnder(
  headerRef: RefObject<HTMLElement | null>,
  pathname: string,
) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const header = headerRef.current;
      const below = document
        .elementsFromPoint(window.innerWidth / 2, PROBE_Y)
        .find((element) => !header?.contains(element));
      setDark(below?.closest("[data-nav-theme='dark']") != null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    /* Une nouvelle page peut commencer par une autre surface : on remesure. */
  }, [headerRef, pathname]);

  return dark;
}

/* Liens de la barre : pas d'anneau de focus, un simple soulignement fin au
   clavier ; le lien de la page courante garde le même soulignement, en rouge. */
const linkBase =
  "py-2 text-[0.95rem] transition-colors duration-300 underline decoration-1 underline-offset-[10px] focus-visible:outline-none";

/* Verre clair sur les fonds clairs, verre sombre sur les fonds sombres. */
const glass = {
  light:
    "border-ink/10 bg-glass-light shadow-[0_12px_32px_-16px_rgb(18_19_22/0.35)]",
  dark: "border-paper/10 bg-glass-dark shadow-[0_12px_32px_-16px_rgb(0_0_0/0.75)]",
  /* Menu mobile ouvert : la barre prend le fond du menu, quel que soit le dessous */
  menu: "border-paper/10 bg-ink/95 shadow-[0_12px_32px_-16px_rgb(0_0_0/0.75)]",
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = strip(usePathname());
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overDark = useDarkSurfaceUnder(headerRef, pathname);
  /* Menu mobile ouvert : il est sombre, la barre aussi. */
  const dark = overDark || open;

  /* Menu mobile ouvert : Échap le ferme et rend le focus au bouton ; le
     défilement de la page derrière est bloqué. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    /* L'en-tête est fixe et ne capte pas les clics : seule la barre (et le
       menu mobile) les reçoivent, le contenu reste cliquable autour. */
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3"
    >
      <Container>
        <div
          className={`pointer-events-auto -mx-3 flex h-16 items-center justify-between rounded-xl border px-3 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300 sm:-mx-5 sm:px-5 ${
            open ? glass.menu : dark ? glass.dark : glass.light
          }`}
        >
          <Link
            href="/"
            aria-label="ExponentValue — accueil"
            className="relative block"
            onClick={() => setOpen(false)}
          >
            {/* Les deux logos sont chargés ; on passe de l'un à l'autre en fondu. */}
            <Wordmark
              className={`transition-opacity duration-300 ${dark ? "opacity-0" : "opacity-100"}`}
            />
            <Wordmark
              tone="dark"
              className={`absolute inset-0 transition-opacity duration-300 ${dark ? "opacity-100" : "opacity-0"}`}
            />
          </Link>

          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-9 lg:flex"
          >
            {NAV_LINKS.map((link) => {
              const active = strip(link.href) === pathname;
              const tone = dark
                ? active
                  ? "text-paper decoration-accent-soft"
                  : "text-on-dark decoration-transparent hover:text-paper focus-visible:decoration-paper"
                : active
                  ? "text-ink decoration-accent"
                  : "text-muted decoration-transparent hover:text-ink focus-visible:decoration-ink";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`${linkBase} ${tone}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={CTA.primary.href}
              className={buttonClasses(
                dark ? "inverse" : "primary",
                "min-h-11 px-5 py-2.5",
              )}
            >
              {CTA.primary.label}
            </Link>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className={`h-0.5 w-6 transition-[transform,background-color] duration-150 ${
                dark ? "bg-paper" : "bg-ink"
              } ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 transition-[transform,background-color] duration-150 ${
                dark ? "bg-paper" : "bg-ink"
              } ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="pointer-events-auto fixed inset-x-3 bottom-3 top-[5.25rem] overflow-y-auto rounded-xl border border-paper/10 bg-ink/95 px-6 py-8 backdrop-blur-xl sm:inset-x-5 sm:px-10 lg:hidden"
        >
          <nav aria-label="Navigation mobile" className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const active = strip(link.href) === pathname;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`t-h3 border-b border-line-dark py-5 ${
                    active ? "text-paper underline decoration-accent-soft decoration-1 underline-offset-8" : "text-on-dark"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href={CTA.primary.href}
            onClick={() => setOpen(false)}
            className={buttonClasses("inverse", "mt-8 w-full")}
          >
            {CTA.primary.label}
          </Link>
        </div>
      )}
    </header>
  );
}
