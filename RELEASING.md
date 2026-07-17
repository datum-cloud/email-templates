# Releasing

## How a change reaches production

1. Merge a PR to `main`. This automatically publishes a kustomize bundle to
   `ghcr.io/datum-cloud/email-templates-kustomize`.
2. **Staging** picks up new `main` builds automatically — nothing else to do.
3. When you're ready to promote to **preview** or **production**, run the
   [Publish New Version](.github/workflows/release.yml) workflow
   (`Actions → Publish New Version → Run workflow`). Pick how big the update
   is — `patch` (small fixes/content tweaks), `minor` (new templates,
   notable changes), or `major` (breaking changes to template variables) —
   `patch` is the default and covers most changes. The workflow figures out
   the actual version number for you.
4. Update the pinned tag for the environment you're promoting in
   [`datum-cloud/infra`](https://github.com/datum-cloud/infra) — see
   `apps/datum-control-plane-system/core-control-plane/{preview,production}/email-templates-oci-repository-patch.yaml`.

## Versioning

You don't need to know or pick a version number — just pick patch/minor/major
and the release workflow computes it from the latest tag. When in doubt,
`patch` is almost always the right choice for template content changes.

## What's deployed where

- **Staging**: always the latest `main` build.
- **Preview** / **Production**: pinned to a specific release tag, updated
  manually in `infra` when you're ready to promote.
