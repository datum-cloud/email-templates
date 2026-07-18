# Releasing

This is the step-by-step for getting a merged change live. No coding involved — just a few clicks in GitHub.

## Where changes go, and when

- **Staging** updates itself automatically every time a PR merges to `main`. There's nothing to do for this — if you just want to see your change on staging, you're already done.
- **Preview** and **Production** only update when someone runs the release steps below. Merging to `main` does *not* put anything in front of real users by itself.

## How to release to Preview or Production

1. Go to the **Actions** tab of this repo on GitHub.
2. In the left sidebar, click **Publish New Version**.
3. Click the **Run workflow** button (top right of the list).
4. Pick how big the change is:
   - **patch** — wording tweaks, a fixed typo, small visual fixes. Use this if you're not sure — it's the default and covers most changes.
   - **minor** — a brand-new email template, or a change noticeable enough to call out.
   - **major** — only if a template's variables changed in a way that would break something already using it (an engineer should confirm this one).
5. Click the green **Run workflow** button to confirm. This creates a new version tag (like `v1.4.0`) — you don't need to figure out the number yourself, the workflow does that from whatever the last version was.

That's it for this repo. One step remains, and it belongs to engineering:

6. **An engineer** updates which version is pinned for Preview or Production over in the [`datum-cloud/infra`](https://github.com/datum-cloud/infra) repo (the files under `apps/datum-control-plane-system/core-control-plane/{preview,production}/email-templates-oci-repository-patch.yaml`). This is the step that actually makes the new version show up for real users — flag your release to an engineer so they can do this part.

Once that pin is updated, it can take a few minutes for the change to actually roll out — don't panic if the old version is still showing up right away.

## What's deployed where, at a glance

| Environment | Updates when... |
|---|---|
| Staging | Automatically, on every merge to `main` |
| Preview | An engineer updates the pinned version in `infra` after a release |
| Production | Same, but for the production pin in `infra` |
