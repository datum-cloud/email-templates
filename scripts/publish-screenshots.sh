#!/usr/bin/env bash
# Publishes ./screenshots/*.png to a subpath on the email-template-screenshots
# branch. Retries on push failure since PR runs and main-merge runs can race
# on that branch.
#
# Usage: GH_TOKEN=... GITHUB_REPOSITORY=owner/repo scripts/publish-screenshots.sh <dest-path> <commit-message>
set -euo pipefail

DEST_PATH="$1"
COMMIT_MESSAGE="$2"

REMOTE="https://x-access-token:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
WORKDIR=$(mktemp -d)

clone_or_init() {
  rm -rf "${WORKDIR:?}"
  if git clone --depth 1 --branch email-template-screenshots "${REMOTE}" "${WORKDIR}" 2>/dev/null; then
    return 0
  fi
  mkdir -p "${WORKDIR}"
  git -C "${WORKDIR}" init -q
  git -C "${WORKDIR}" checkout -q --orphan email-template-screenshots
  git -C "${WORKDIR}" commit -q --allow-empty -m "init"
  git -C "${WORKDIR}" remote add origin "${REMOTE}"
}

for attempt in 1 2 3 4 5; do
  clone_or_init

  rm -rf "${WORKDIR:?}/${DEST_PATH}"
  mkdir -p "${WORKDIR}/${DEST_PATH}"
  cp screenshots/*.png "${WORKDIR}/${DEST_PATH}/"

  git -C "${WORKDIR}" config user.name "github-actions[bot]"
  git -C "${WORKDIR}" config user.email "github-actions[bot]@users.noreply.github.com"
  git -C "${WORKDIR}" add "${DEST_PATH}"
  git -C "${WORKDIR}" commit -q -m "${COMMIT_MESSAGE}" --allow-empty

  if git -C "${WORKDIR}" push -q origin email-template-screenshots; then
    echo "Published to ${DEST_PATH}"
    exit 0
  fi

  echo "Push attempt ${attempt} failed (likely racing another run), retrying..."
  sleep $((attempt * 3))
done

echo "::error::Failed to publish screenshots after multiple attempts"
exit 1
