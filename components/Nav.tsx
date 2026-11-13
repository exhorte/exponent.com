"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Wordmark from "./Wordmark";
import { buttonClasses } from "./Button";
import { CTA, NAV_LINKS } from "@/lib/site";

/* `trailingSlash: true` : usePathname() renvoie "/entreprise/", les href aussi.
   On compare sans slash final pour que le lien actif soit bien repéré. */
const strip = (path: string) => path.replace(/\/+$/, "") || "/";

/* Liens de la barre : pas d'anneau de focus, un simple soulignement fin au
   clavier ; le lien de la page courante garde le même soulignement, en rouge. */
const linkBase =
  "py-2 text-[0.95rem] transition-colors duration-150 underline decoration-1 underline-offset-[10px] focus-visible:outline-none focus-visible:decoration-ink";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = strip(usePathname());
  const toggleRef = useRef<HTMLButtonElement>(null);

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
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label="ExponentValue — accueil"
          className="text-ink"
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-9 lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const active = strip(link.href) === pathname;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`${linkBase} ${
                  active
                    ? "text-ink decoration-accent"
                    : "text-muted decoration-transparent hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={CTA.primary.href}
            className={buttonClasses("primary", "min-h-11 px-5 py-2.5")}
          >
            {CTA.primary.label}
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={`h-0.5 w-6 bg-ink transition-transform duration-150 ${
              open ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-ink transition-transform duration-150 ${
              open ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-ink px-6 py-8 sm:px-10 lg:hidden"
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
