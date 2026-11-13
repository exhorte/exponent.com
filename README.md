# exponentvalue.com

Site vitrine d'ExponentValue (V2, en français) : *Transformez vos problèmes d'entreprise en systèmes qui fonctionnent.*

Next.js 16 (App Router) + React 19 + Tailwind CSS 4, police Geist (locale, via `geist`).
Export **statique** (`output: "export"`), servi par Apache/LiteSpeed chez Hostinger.

## Commandes

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # génère out/ (le site complet, prêt à être envoyé)
```

## Structure

| Dossier | Rôle |
|---|---|
| `app/` | Pages : `/`, `/solutions`, `/methode`, `/exponentos`, `/entreprise`, `/contact`, 404, sitemap, robots, manifest |
| `components/` | Composants d'interface (Container, Nav, Footer, Section, Button, FlowDiagram/OSDiagram, ContactForm…) |
| `lib/site.ts` | URL, e-mail, slogan, navigation, CTA, helper de métadonnées |
| `lib/content.ts` | Contenu partagé : problèmes, familles de solutions, étapes, ExponentOS |
| `public/` | Logos (`logo-black.svg`, `logo-white.svg`), icônes PWA et `.htaccess` (HTTPS, cache, anciennes URL) |

## Logo et icônes

Source : le kit `06_assets/Exponentvalue branding assets/exports_v2` du vault. Les SVG du site n'en diffèrent que par le bloc de métadonnées C2PA retiré (tracé inchangé) ; les PNG et l'ICO sont des copies exactes.

| Usage | Fichier |
|---|---|
| Logo complet, en-tête (fond clair) | `public/logo-black.svg` |
| Logo complet, pied de page (fond sombre) | `public/logo-white.svg` |
| Symbole inline (schéma du hero) | `components/Logomark.tsx` |
| Favicon | `app/icon.svg`, `app/favicon.ico` |
| Icône iOS | `app/apple-icon.png` |
| Icônes PWA (manifeste) | `public/icon-192.png`, `public/icon-512.png` |
| Carte de partage | `app/opengraph-image.png` |

## Principes

- Aucune vidéo ni image décorative, aucun cadre autour des schémas : la hiérarchie vient de la typographie, de l'espace et de filets fins.
- Pas de marqueur rouge devant les titres. Le rouge `#ec3013` (hérité de l'ancienne carte sociale ; le nouveau logo est noir et blanc) reste discret : numéros, lien actif, messages d'erreur.
- Une seule largeur de page, `components/Container.tsx` : en-tête, sections et pied de page s'alignent sur les mêmes bords.
- Focus clavier discret : filet de 1 px (règle globale dans `app/globals.css`) et simple soulignement pour les liens de la navigation.
- Le contenu qui apparaît sur plusieurs pages vit dans `lib/content.ts`, une seule fois.
- Les familles de systèmes et ExponentOS sont présentés comme des **possibilités de conception** et une **vision**, jamais comme des produits disponibles. Les statuts de la page ExponentOS sont dans `app/exponentos/page.tsx` : à mettre à jour quand un composant change réellement d'état.
- Le slogan français (`SITE.slogan`) est une traduction de « Compress time. Expand value. » : à valider.

## Formulaire de contact

Le site est statique : aucun serveur n'envoie le message. `components/ContactForm.tsx` valide les champs puis prépare le message dans l'application e-mail du visiteur (`mailto:`). Il affiche « message prêt », jamais « envoyé ». Pour un envoi réel, brancher un service ou un script serveur, puis adapter ce composant.

## Déploiement

Le déploiement est **automatique** (depuis le 2026-11-13). Ne plus envoyer `out/` à la main dans `public_html`.

```
push sur main ──► GitHub Actions : npm ci + npm run build ──► out/ publié sur la branche `deploy`
                                                                   │
                              Hostinger (hPanel > Avancé > GIT) tire `deploy` dans public_html
```

1. Avant de pousser : `npm run lint` et `npm run build`.
2. `git push origin main` : le workflow `.github/workflows/deploy.yml` construit le site et pousse `out/` sur la branche `deploy` (suivi dans l'onglet Actions de GitHub, environ 1 minute 30).
3. Hostinger déploie `deploy` dans `public_html` quelques secondes plus tard (hPanel > Sites web > exponentvalue.com > Avancé > GIT, ligne « Dernier déploiement »).
4. Contrôler le site en ligne. Si une page ancienne reste servie : Tableau de bord > Cache > Vider le cache.

Règles :
- **`main` est la seule branche de travail.** `deploy` est écrite par le workflow : ne jamais y commiter. Hostinger ne doit suivre que `deploy` (suivre `main` déploierait le code source et casserait le site).
- Ne pas désactiver « Déploiement automatique » dans hPanel et ne plus modifier `public_html` à la main (Gestionnaire de fichiers, FTP).
- Si le build échoue sur GitHub, `deploy` ne bouge pas et le site reste sur sa dernière version : corriger, pousser de nouveau.
- Retour arrière : `git revert` du commit fautif sur `main`, puis push.

`public/.htaccess` (copié dans `out/` puis dans `public_html`) porte : HTTPS, page 404, 301 des anciennes URL (`/platform` → `/exponentos`, `/method` → `/methode`, `/sectors` → `/solutions`, `/company` → `/entreprise`), cache, blocage de `.git`, et la réécriture des fichiers de préchargement de Next (`__next.<page>.__PAGE__.txt`). Selon la plateforme, Next les écrit à plat (build Linux de GitHub) ou dans un dossier (build Windows) : la réécriture ne s'applique que si le fichier demandé n'existe pas.

Détail, preuves et points non vérifiés : `05_release/Fiche-deploiement.md` dans le vault.
