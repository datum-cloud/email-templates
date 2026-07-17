# Contributing

A React Email + Tailwind CSS system for building Datum's transactional emails. See the [README](./README.md) for what emails live here; this page covers how to work on them.

If you just need wording or content changed on an existing email and aren't comfortable opening a PR, open a "Content / Wording Change Request" issue instead (Issues → New issue). Need a brand-new email entirely? Use the "New Email Template Request" issue form instead — same idea, no coding required.

For either kind of request, Claude automatically attempts a draft PR as soon as the issue is opened (see `.github/workflows/claude-content-request.yml` and `.github/workflows/claude-new-template.yml`) — it's still a draft: someone reviews and merges it like any other PR. If that automated attempt fails or falls short, a maintainer can add the `ai-draft` label to the issue to retry it.

## Installation

```bash
pnpm install
```

### Zero-setup: GitHub Codespaces

If you don't want to install Node or pnpm locally, click "Code" → "Codespaces" → "Create codespace on main" on GitHub. This opens a browser-based VS Code with dependencies already installed and the dev server ready to run — just run `pnpm dev` once it loads. The same devcontainer config also works with VS Code's "Reopen in Container" if you have Docker locally but don't want to install Node/pnpm directly.

## Development

Start the development server to preview templates in real-time:

```bash
pnpm dev
```

The development server will be available at [http://localhost:3000](http://localhost:3000).

> **Note:** The very first template you open in a freshly started `pnpm dev` session may show a `ReadableStream.prototype.pipeTo` error page (the same underlying Next.js/Turbopack polyfill conflict noted below for `pnpm build`). Just refresh the page — it only happens once per `pnpm dev` session, on whichever route is compiled first, and works normally afterward.

## Build and Export

> **Note:** `pnpm build` currently fails on a clean install — a `ReadableStream` polyfill conflict under Next.js 16/Turbopack when statically prerendering the preview app (fails on `/preview/user-rejected`). It isn't used by CI or the publish pipeline (those only use `pnpm generate:all`), so it's not blocking day-to-day template work — just don't reach for it expecting production output.

```bash
# Build all email templates
pnpm build

# Export templates to static HTML & Text via React Email CLI (no props)
pnpm export:all

# Export HTML & Text using custom exporter (uses deterministic placeholders)
pnpm export:custom

# One-shot: export HTML/TXT and generate YAML with placeholders
pnpm generate:all
```

## Project Structure

```text
emails/
├── config/
│   ├── tailwind.config.ts          # Centralized Tailwind configuration
│   └── brand.config.ts             # Brand settings and constants
├── components/                     # Reusable email components
│   ├── CustomButton.tsx            # Styled button component
│   ├── EmailSupport.tsx            # Support information section
│   └── index.ts                    # Component exports
├── layouts/                        # Email layout components
│   ├── main.layout.tsx             # Base email layout wrapper
│   ├── header.tsx                  # Standard header layout
│   ├── footer.tsx                  # Standard footer layout
│   └── index.ts                    # Layout exports
└── user-invitation.tsx             # User invitation email template
```

## Creating Email Templates

To create a new email template, follow this structure:

```tsx
import 'web-streams-polyfill/polyfill';

import { Heading, Row, Section, Text } from 'react-email';
import { CustomButton, EmailSupport } from './components';
import { MainLayout } from './layouts';

interface MyEmailProps {
  name: string;
  actionUrl: string;
}

export const MyEmail = ({ name, actionUrl }: MyEmailProps) => {
  const previewText = `Welcome to the platform, ${name}`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-8">
        <Row className="mb-8">
          <Heading as="h2" className="text-2xl mt-0 font-medium mb-4">
            Welcome, {name}
          </Heading>
          <Text className="text-sm m-0 font-light">
            Thank you for joining our platform. We're excited to have you on board.
          </Text>
          <CustomButton href={actionUrl} className="my-6 block font-semibold">
            Get Started
          </CustomButton>
        </Row>
        <EmailSupport />
      </Section>
    </MainLayout>
  );
};

MyEmail.PreviewProps = {
  name: 'John Doe',
  actionUrl: 'https://example.com/onboarding',
} as MyEmailProps;

export default MyEmail;
```

## YAML Generation Details

- Subject: Derived from the first `<h1>` (fallback to first `<h2>`) in the rendered HTML with tags stripped, unless the component sets `.Subject` explicitly.
- Placeholders: The custom exporter renders with deterministic tokens for each PreviewProps key (e.g., `name` → `__placeholder_name__`). The YAML generator replaces those tokens in HTML/TXT with Go-style placeholders `{{.name}}`.
- Variables: The generator creates a `variables` section by taking all keys from `.PreviewProps` and marking them as `required: true` with `type: "string"` by default.
- Pretty HTML: The custom exporter formats HTML using `pretty()` from `@react-email/render` for readability.

If you need to override props for a preview/export, pass JSON to the custom exporter:

```bash
pnpm export:custom -- --props '{"name":"Jane","actionUrl":"https://example.com"}'
```

## Available Commands

### Development Commands

```bash
pnpm dev              # Start development server with live reload
pnpm build            # Build all email templates
pnpm export           # Export templates to static HTML files
pnpm export:html      # Export HTML via CLI (pretty)
pnpm export:text      # Export Text via CLI (pretty)
pnpm export:custom    # Export HTML/TXT using @react-email/render with placeholders
pnpm generate:yaml    # Generate YAML from exported HTML/TXT, replacing placeholders with {{.key}}
pnpm generate:all     # Run export:custom then generate:yaml
```

### Code Quality Commands

```bash
pnpm lint             # Run linting checks
pnpm lint:fix         # Automatically fix linting issues
pnpm format           # Check code formatting
pnpm format:fix       # Automatically format code
pnpm check            # Run all quality checks
pnpm check:fix        # Automatically fix all quality issues
```

## Technology Stack

- **[React Email](https://react.email)** - React-based email template framework
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework for consistent styling
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe superset of JavaScript
- **[Biome](https://biomejs.dev)** - Fast, unified toolchain for linting and formatting
- **[pnpm](https://pnpm.io)** - Efficient package management system

## Submitting changes

Open a PR against `main`. CI regenerates the deployable bundle and, if anything changed, commits it straight onto your PR branch automatically (see `.github/workflows/verify-bundle.yml`) — pull before pushing again. You don't have to run `pnpm generate:all` locally before committing a template change, though you still can, e.g. to preview the diff.

If your change affects what a template renders, CI also commits updated screenshots straight onto your PR branch (see `.github/workflows/screenshot-templates.yml`) — pull before pushing again, and check the "Files changed" tab for a visual diff. Run it locally with `pnpm screenshot`.

### If a CI check goes red

Most PR checks here are self-healing — CI regenerates files and pushes the result to your branch rather than just failing. Here's what each one actually does and what, if anything, you need to do:

| Check | What it does | Red usually means | What to do |
|---|---|---|---|
| `verify-bundle-up-to-date` | Regenerates `config/email-templates/` from your template changes and auto-commits the result to your PR branch | The auto-commit itself hasn't landed yet, or `pnpm generate:all` genuinely errored (e.g. broken template code) | Pull the latest commit on your branch and re-check. Still red after pulling? Open the log — it'll show the real error from the generation step. |
| `validate-kustomize` | Structurally validates the generated kustomize/CRD output | The generated YAML itself is malformed | Open the log; it names the specific file/field that's invalid. This points at a real bug, not staleness. |
| `screenshot` (Screenshot Changed Templates) | Renders your changed templates and commits updated PNGs to your PR branch | Rendering the template itself failed | Open the log for the render error. If it succeeded, there's nothing to do — pull the auto-commit and check the "Files changed" tab for the visual diff. |

Nothing in CI currently runs Biome (`pnpm check`) — lint/format issues won't show up as a PR check today. Run `pnpm check` locally if you want to catch them before you push; if you do see a Biome error locally, it names the offending file and line directly.

See [RELEASING.md](./RELEASING.md) for how a merged change reaches production.
