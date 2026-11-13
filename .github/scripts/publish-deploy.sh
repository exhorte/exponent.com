#!/usr/bin/env bash
# Publie le contenu de out/ (export statique Next.js) sur la branche `deploy`.
#
# - L'historique de `deploy` est conservé et jamais réécrit (pas de force-push) :
#   le `git pull` de Hostinger reste un simple avance-rapide.
# - Rien n'est poussé si le site construit est identique à celui déjà publié.
# - Prérequis : `git config user.name` et `user.email` définis par l'appelant,
#   et un accès en écriture au remote.
#
# Variables : BUILD_DIR (out), TARGET_BRANCH (deploy), REMOTE (origin), SOURCE_SHA.
set -euo pipefail

BUILD_DIR="${BUILD_DIR:-out}"
TARGET_BRANCH="${TARGET_BRANCH:-deploy}"
REMOTE="${REMOTE:-origin}"
SOURCE_SHA="${SOURCE_SHA:-$(git rev-parse HEAD)}"

[ -f "$BUILD_DIR/index.html" ] || { echo "ERREUR : $BUILD_DIR/index.html introuvable, rien à publier." >&2; exit 1; }
[ -n "$(git config user.email)" ] && [ -n "$(git config user.name)" ] \
  || { echo "ERREUR : git user.name / user.email non définis." >&2; exit 1; }

BUILD_DIR="$(cd "$BUILD_DIR" && pwd)"
WORK="$(mktemp -d)"
TREE="$WORK/tree"
cleanup() { git worktree remove --force "$TREE" >/dev/null 2>&1 || true; git worktree prune; rm -rf "$WORK"; }
trap cleanup EXIT

if git ls-remote --exit-code --heads "$REMOTE" "$TARGET_BRANCH" >/dev/null 2>&1; then
  git fetch --quiet "$REMOTE" "$TARGET_BRANCH"
  git worktree add --quiet --detach "$TREE" FETCH_HEAD
  git -C "$TREE" checkout --quiet -B "$TARGET_BRANCH"
else
  echo "La branche $TARGET_BRANCH n'existe pas encore : création (racine sans historique)."
  git worktree add --quiet --detach "$TREE"
  git -C "$TREE" checkout --quiet --orphan "$TARGET_BRANCH"
fi

# Remplace tout le contenu (sauf .git) par le site construit, fichiers cachés
# compris (.htaccess).
find "$TREE" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -a "$BUILD_DIR"/. "$TREE"/

git -C "$TREE" add -A
if git -C "$TREE" diff --cached --quiet; then
  echo "Le site construit est identique à $TARGET_BRANCH : rien à publier."
  exit 0
fi

git -C "$TREE" commit --quiet -m "build: site statique de ${SOURCE_SHA:0:7}" -m "Source : ${SOURCE_SHA}"
git -C "$TREE" push --quiet "$REMOTE" "HEAD:refs/heads/$TARGET_BRANCH"
echo "Publié sur $TARGET_BRANCH : $(git -C "$TREE" rev-parse --short HEAD) (source ${SOURCE_SHA:0:7})."
