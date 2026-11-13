import Link from "next/link";
import Container from "./Container";
import Wordmark from "./Wordmark";
import { CTA, NAV_LINKS, SITE } from "@/lib/site";

const exploreLinks = [...NAV_LINKS, { href: "/contact/", label: "Contact" }];

const heading = "font-mono text-[0.75rem] uppercase tracking-[0.14em] text-faint";

export default function Footer() {
  return (
    <footer className="bg-ink text-on-dark">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Wordmark tone="dark" alt="ExponentValue" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed">
              Des systèmes métier intelligents qui transforment les problèmes
              opérationnels en valeur mesurable.
            </p>
            <p className={`mt-5 ${heading}`}>{SITE.slogan}</p>
          </div>

          <nav aria-label="Pied de page">
            <p className={heading}>Explorer</p>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.95rem] transition-colors duration-150 hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={heading}>Contact</p>
            <ul className="mt-4 space-y-3 text-[0.95rem]">
              <li>
                <Link
                  href={CTA.primary.href}
                  className="transition-colors duration-150 hover:text-paper"
                >
                  {CTA.primary.label}
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors duration-150 hover:text-paper"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line-dark pt-7 text-[0.85rem] text-faint">
          © {new Date().getFullYear()} ExponentValue. Tous droits réservés.
        </div>
      </Container>
    </footer>
  );
}
