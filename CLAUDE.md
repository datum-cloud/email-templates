# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A React Email + Tailwind CSS system for Datum's transactional emails (waitlist confirmations, invitations, sign-in alerts, etc.). The `.tsx` templates in `emails/` are the source of truth; everything else is a pipeline that turns them into the `EmailTemplate` CRD YAML consumed by production (`config/email-templates/`).

## Commands

```bash
pnpm install          # setup
pnpm dev              # live-reload preview server at localhost:3000

pnpm generate:all     # export:custom + generate:yaml — the one to run before committing template changes
pnpm export:custom    # render emails/*.tsx with placeholder tokens -> out-html/, out-text/
pnpm generate:yaml    # turn out-html/out-text into config/email-templates/*.yaml (requires export:custom first)

pnpm lint / lint:fix / format / format:fix / check / check:fix   # Biome, scoped to ./emails

pnpm screenshot       # render-preview-html + screenshot-templates — literal-prop PNGs into screenshots/
```

`pnpm build` is currently broken on a clean install (ReadableStream polyfill conflict under Next.js 16/Turbopack prerendering `/preview/user-rejected`). Not used by CI or the publish pipeline — don't rely on it.

There is no test suite; CI's correctness check is the bundle-verification step below.

## Architecture

**The generation pipeline is the core thing to understand**, since it's the reason templates can't just be edited and committed:

1. `scripts/export-emails.ts` imports each top-level `emails/*.tsx`, renders it with its `PreviewProps`, but replaces every prop value with a deterministic placeholder token (`__placeholder_action_url__`) before rendering. This produces `out-html/*.html` and `out-text/*.txt` with the token embedded in place of real content.
2. `scripts/generate-yaml.js` re-parses the source `.tsx` for the literal `PreviewProps` object, uses it to find-and-replace the placeholder tokens back into Go template syntax (`{{.actionUrl}}`), derives a subject line (explicit `.Subject` static, else first `<h1>`/`<h2>` text), and writes an `EmailTemplate` CRD YAML per template plus a `kustomization.yaml` into `config/email-templates/`.

The two-step, placeholder-then-replace design exists so arbitrary prop content (URLs, names, HTML) can be safely swapped for `{{.field}}` without a templating engine understanding JSX — whatever the placeholder touches in the rendered output becomes a variable.

`scripts/render-preview-html.ts` and `scripts/screenshot-templates.js` are a **separate, parallel path** used only for screenshots: they render with literal `PreviewProps` (not placeholders, since a real name screenshots better than a token) into `out-html-preview/`, then Playwright screenshots each into `screenshots/*.png`. Don't confuse this path's output with `out-html/` — they're for humans looking at diffs, not for the CRD bundle.

**Screenshots are committed source, not CI artifacts**: `screenshots/*.png` is tracked in git (not gitignored) and embedded directly in `README.md` via collapsible `<details>` blocks per template, so `main`'s README always shows what's actually deployed. `.github/workflows/screenshot-templates.yml` keeps them current: on any PR touching `emails/**`, it renders the PR head and the merge-base, diffs which templates changed, screenshots only those, and commits the updated PNGs **straight onto the PR branch** (via `git-auto-commit-action`) — not to a side branch or a bot comment. This means a PR that changes a template will grow an extra "update template screenshots" commit pushed by `github-actions[bot]`; pull before pushing again, and expect `screenshots/*.png` diffs to show up in your own PR's "Files changed" tab, not a separate mechanism. Run the same rendering locally with `pnpm screenshot`.

**CI enforces the pipeline stays in sync with source**: `.github/workflows/verify-bundle.yml` reruns `pnpm generate:all` on every PR touching `emails/**` or `scripts/**` and fails if `config/email-templates/` changes — meaning `config/email-templates/**` must never be hand-edited, and any template change requires running `pnpm generate:all` and committing the regenerated output alongside it.

**Template structure**: each email in `emails/*.tsx` composes `MainLayout` (from `emails/layouts/`) with shared components from `emails/components/` (`CustomButton`, `EmailSupport`, `EmailSignoff`). Styling goes through the centralized Tailwind config in `emails/config/tailwind.config.ts` (brand color palette, spacing/font scale) rather than ad hoc classes, and brand constants (name, URLs, support email) live in `emails/config/brand.config.ts`. New templates need `import 'web-streams-polyfill/polyfill';` at the top and must export a default component plus `.PreviewProps` (used by both the export pipeline and dev preview) — see the template skeleton in `CONTRIBUTING.md`.

**Shared components & layouts**: `emails/components/` (`CustomButton`, `EmailSignoff`, `EmailSupport`) and `emails/layouts/` (`MainLayout`, plus its internal `header.tsx`/`footer.tsx`) are shared across every template — a change here affects every email that uses it, not just one. Prefer reusing what exists: `CustomButton` already has `variant`/`size` props and `EmailSignoff` has `greetingText`/`signatureText`/`titleText` overrides, so most per-template needs are a prop, not a new component. Reach for a genuinely new shared component/layout only when no existing one (with new props) can do the job — and when you add one, export it from `emails/components/index.ts` or `emails/layouts/index.ts` (the single import point every template uses) and give it the same shape as its neighbors: a typed `*Props` interface with JSDoc comments and sensible defaults, not a one-off. Never fork an existing component into a near-duplicate (e.g. `CustomButton2`) to avoid touching the shared one — extend it instead.

**Versioning**: `.github/workflows/release.yml` is a manual `workflow_dispatch` that tags `vMAJOR.MINOR.PATCH` off `main` based on a selected patch/minor/major bump — there's no automatic semver inference from commits.

**RELEASING.md**: README and CONTRIBUTING.md both link to `RELEASING.md` for the release process, but it doesn't exist on `main` yet — it currently lives only on the unmerged `docs/releasing` branch. Don't treat its absence as a broken link to fix; it's pending merge.

**Ownership**: `.github/CODEOWNERS` routes all paths to `@datum-cloud/gtm` — that team is the default reviewer for any PR in this repo.
