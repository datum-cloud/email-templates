# Contributing

A React Email + Tailwind CSS system for building Datum's transactional emails. See the [README](./README.md) for what emails live here; this page covers how to work on them.

## Installation

```bash
pnpm install
```

## Development

Start the development server to preview templates in real-time:

```bash
pnpm dev
```

The development server will be available at [http://localhost:3000](http://localhost:3000).

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

Open a PR against `main`. CI regenerates the deployable bundle and fails if it doesn't match what you committed (see `.github/workflows/verify-bundle.yml`) — run `pnpm generate:all` before committing if you changed a template.

If your change affects what a template renders, CI also commits updated screenshots straight onto your PR branch (see `.github/workflows/screenshot-templates.yml`) — pull before pushing again, and check the "Files changed" tab for a visual diff. Run it locally with `pnpm screenshot`.

See [RELEASING.md](./RELEASING.md) for how a merged change reaches production.
